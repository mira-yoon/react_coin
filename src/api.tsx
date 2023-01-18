
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
  return fetch("https://api.coinpaprika.com/v1/coins").then(
    response=> response.json()
  );
  
}
