const CryptoConverter = ( price ) => {

    const coin_name = ["ETH", "BTC"];
    const coin_usd = ["ethusd","btcusd"];

    const ethUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[0];
    const btcUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[1];
    // let ping = 0     // Remove all "ping" comments to test 
    async function convert(coin, api_url, price) {
        const cost = Number(price);
        let response = await fetch(api_url);
        const data = await response.json();
        const c_price = parseFloat(data.last);
        const c_usd = Number(1/c_price);
        const total = Number(c_usd*cost);
        let c_display = total.toFixed(6) + " " + coin;
        localStorage.setItem(coin+'_bank', c_display);
        return (localStorage.getItem(coin+'_bank'));
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

export default CryptoConverter;