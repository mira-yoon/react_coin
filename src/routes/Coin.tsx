import { Switch, Route, Link, useParams, useLocation, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from 'react';
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from 'react-query';
import { fetchCoinInfo, fetchCoinTickers } from "../api";


const Container = styled.div`
  padding: 20px 40px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-item : center;
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;


//isActive라는 prop을 가진다.
const Tab = styled.span<{ isActive: boolean }>` 
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteParams {
  coinId : string;
}

interface RouteState {
  name: string;
}

interface InfoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string;
  logo : string;
  description : string;
  message : string;
  open_source : boolean;
  started_at : string;
  development_status : string;
  hardware_wallet : boolean;
  proof_type : string;
  org_structure : string;
  hash_algorithm : string;
  links : object;
  first_data_at : string;
  last_data_at : string;
}




interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    }
  }
}


function Coin(){

  // const [loading, setLoading] = useState(true);
  const {coinId} = useParams<RouteParams>();
  const { state } = useLocation<RouteState>();

  // const [info, setInfo] = useState<InfoData>();
  // const [priceInfo, setPriceInfo] = useState<PriceData>();
  const priceMatch = useRouteMatch("/:coinId/price");
  const chartMatch = useRouteMatch("/:coinId/chart");

  const {isLoading:infoLoading, data:infoData} = useQuery<InfoData>(["info",coinId], ()=> fetchCoinInfo(coinId));
  const {isLoading:tickersLoading, data:tickersData} = useQuery<PriceData>(["tickers",coinId], ()=> fetchCoinTickers(coinId));
  //useQuery를 구분하는 "키"는 고유한 값이어야 하므로 coinId를 "키"로 사용했다. 
  //그리고 useQuery가 두 개이기 때문에 구분짓기 위해서 "키" 부분을 배열로 만들어서 작명한 string값과 coinId 둘 다 넣어준 것이다.
  //argument가 필요하기 때문에 함수명이 아니라 ()=>{} 이렇게 화살표 함수 형식으로 넣었다.
  //그리고 타입스크립트에게 무엇이 data:infoData 이고, 무엇이 data:tickersData인지 설명해줘야 한다. 그래서 <InfoData>, <PriceData> 이런거 넣은 것이다.

  const loading = infoLoading || tickersLoading;


  /* react-query를 사용하지 않은 예전 방식 */
  // useEffect(()=>{
  //   (async()=>{
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();

  //     console.log(infoData)

  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();

  //     console.log(priceData)

  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);

  //   })();
  // },[coinId])
  



  return (
    <Container>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          {/* 메인페이지에서 코인목록 하나를 클릭해서 이 페이지로 들어오면 useLocation을 통해 메인페이지에서 이미 한 번 불러왔던 데이터에서 state.name을 불러오게 된다. 그런데 메인페이지가 아니라 url을 통해 이 페이지에 들어오게 되면, 메인페이지를 거치지 않기 때문에 이 페이지에서 새롭게 불러온 데이터를 통해서 info.name을 불러오게 된다. */}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source ? "Yes" : "No"}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Switch>
            <Route path={`/${coinId}/price`}>
              <Price />
            </Route>
            <Route path={`/${coinId}/chart`}>
              <Chart />
            </Route>
          </Switch>
        </>
      )}
    </Container>
  )
}
export default Coin;