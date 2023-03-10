import styled from "styled-components";
import {Link} from "react-router-dom";
import { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { fetchCoins } from "../api";


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

const CoinList = styled.ul``;

const Coin = styled.li`
  background-color : white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color: 0.35s ease-in;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
`;

const Loader = styled.span`
  display: block;
  text-align: center;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}  


function Coins(){

  const {isLoading, data} = useQuery<CoinInterface[]>("allCoins", fetchCoins);
  // 타입스크립트에게 무엇이 data인지 설명해줘야 하기 때문에 <CoinInterface[]>를 넣었다.


  /* react-query를 사용하지 않은 예전 방식 */
  // const [coins, setCoins] = useState<CoinInterface[]>([]); 
  // const [Loading, setLoading] = useState(true);
  // useEffect(() => {
  //   (async()=>{
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0,100));
  //     setLoading(false)
  //   })();
  // }, [])


  return (
    <Container>
      <Header>
        <Title>Coin</Title>
      </Header>
      {isLoading ? <Loader>"Loading..."</Loader> : (
        <CoinList>
          {data?.slice(0,100).map(coin => // data는 array 또는 undefined이다. 그래서 이 문제를 해결하려면 data 뒤에 ?를 붙인다.
            <Coin key={coin.id}>
              {/* <Link to={`/${coin.id}`}> */}
              <Link to={{
                pathname: `/${coin.id}`,
                state: { name : coin.name }
              }}>
                <Img src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr; 
              </Link>
              {/* 이 때 url은 바뀌는데 랜더링이 안되는 이슈가 있어서 index.tsx에서 React.StrictMode 지웠다. */}
            </Coin>
          )}
        </CoinList>
      )}
    </Container>
  )
}
export default Coins;