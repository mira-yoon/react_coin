import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from 'react';

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

interface RouteParams {
  coinId : string;
}

interface RouteState {
  name: string;
}


interface infoData {
  id : string;
  name : string;
  symbol : string;
  rank : number;
  is_new : boolean;
  is_active : boolean;
  type : string;
  logo : string;
  tags : object;
  team : object;
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
  links_extended : object;
  whitepaper : object;
  first_data_at : string;
  last_data_at : string;
}

interface priceData {
  
}


function Coin(){

  const [Loading, setLoading] = useState(true);

  // 코인파프리카 api에서 코인명을 불러오는 방식
  const {coinId} = useParams<RouteParams>();
  // const {coinId} = useParams<{coinId:string}>(); // 이렇게 쓸 수도 있다.

  const { state } = useLocation<RouteState>();
  // 이렇게 하면 코인파프리카 api에서 코인명을 불러오는게 아니라 Coins.tsx에서 이미 한 번 가지고 왔던 데이터에서 코인명을 가지고 온 것이다.
  // 이 방식으로 하는게 더 빠르다.
  // 그런데 메인페이지에서 코인목록 눌렀을 때는 잘 되는데
  // http://localhost:3000/btc-bitcoin 이렇게 바로 이 주소로 가면 에러가 뜨고 빈 화면만 뜬다.
  // 왜냐하면 메인페이지를 열어야지, 메인페이지에서 state를 생성해서 가지고 올 수 있기 때문이다.

  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});

  useEffect(()=>{
    (async()=>{
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();

      console.log(infoData)

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();

      console.log(priceData)

      setInfo(infoData);
      setPriceInfo(priceData);

    })();
  },[])
  

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title> 
        {/* state가 존재하면 name을 가져오고 없으면 "Loading"을 가져와라 */}
        {/* <Title>{coinId}</Title>  */}
      </Header>
      {Loading ? <Loader>"Loading..."</Loader> : <span></span> }
    </Container>
  )
}
export default Coin;