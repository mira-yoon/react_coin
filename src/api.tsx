
const BASE_URL = `https://api.coinpaprika.com/v1`;

// fetcher 함수
export async function fetchCoins(){
  // 방법1
  // const response = await fetch("https://api.coinpaprika.com/v1/coins");
  // const json = await response.json();
  // return json;

  // 방법2
  // const json = await(await fetch("https://api.coinpaprika.com/v1/coins")).json();
  // return json;

  // 방법3
  return fetch(`${BASE_URL}/coins`).then(
    response=> response.json()
  );
  
}

export async function fetchCoinInfo(coinId:string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then(
    response=> response.json()
  );
}

export async function fetchCoinTickers(coinId:string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then(
    response=> response.json()
  );
}
