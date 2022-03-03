import { useEffect } from "react";

const tokens = () => {
  const data = [
    { name: "Ethereum",  abbv: "ETH",   ref:  "ethusd" },
    { name: "Bitcoin",   abbv: "BTC",   ref:  "ethusd" },
    { name: "Solana",    abbv: "SOL",   ref:  "ethusd" },
    { name: "Loopring",  abbv: "LRC",   ref:  "ethusd" },
    { name: "Maker",     abbv: "MKR",   ref:  "ethusd" },
    { name: "API3",      abbv: "API3",  ref:  "ethusd" }
  ];
  return data;
}

export const gemini = () => {
  const map = tokens.map(token => {
    "https://api.gemini.com/v1/pubticker/"+token.ref;
  });
  console.log(map);
}
const ethUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[0];
const btcUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[1];

export const cryptoConverter = ( price ) => {

  const coin_name = [tokens.eth.name, tokens.eth.name];
  const coin_usd = ["ethusd","btcusd"];

  // let ping = 0     // Remove all "ping" comments to test 
  async function convert(coin, api_url, price) {
    // useEffect(() => {
      const cost = Number(price);
      let response = await fetch(api_url);
      const data = await response.json();
      const c_price = parseFloat(data.last);
      const c_usd = Number(1/c_price);
      const total = Number(c_usd*cost);
      let c_display = total.toFixed(6) + " " + coin;
      localStorage.setItem(coin+'_bank', c_display);
    // })
    return localStorage.getItem(coin+'_bank');
  }

  // const updateCoin = (name, url, cost) => {
  //     setInterval(() => {convert(name, url, cost)}, 15000); // Update coin prices
  // }

  // updateCoin(coin_name[0], ethUrl, price);
  // updateCoin(coin_name[1], btcUrl, price);

  let eth = convert(coin_name[0], ethUrl, price, 0);
  let btc = convert(coin_name[1], btcUrl, price, 0);
  eth=eth?eth:"";
  btc=btc?btc:"";

  console.log(eth)
  console.log(btc)

  return ([eth, btc])
}