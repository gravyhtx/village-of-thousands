///////////////////
// PRODUCTS PAGE //
///////////////////

// PRODUCT CARD
const coin_name = ["ETH", "BTC"] // "VOT" will show "BTC" pricing for now
const coin_usd = ["ethusd","btcusd"] // 
let price = 45  // Grab from product Liquid tag
const sizesArr = ["xs", "sm", "md", "lg", "xl", "2xl"]
let sizeSelectCount = 0;

const product_modalTrigger = document.getElementById('product-trigger')


function productCard() {

    // Sizes Box //
    const renderSizeBox = (s) => {
        let sizebox = "";
        for(let i = 0; i < s.length; i++) {
            sizebox += `<a href="#${s[i]}"><div onclick="selectSize('${s[i]}')" class="sizes-box col s1 size-${s[i]}" id="size-${s[i]}"><code class="box-size disable-highlight">${s[i].toUpperCase()}</code></div></a>`;
            document.getElementById("display-sizes").innerHTML=sizebox;
        }
        
    }
    
    const selectSize = (s) => {
        
        const id = "#size-"+s;
        const q = document.querySelector(id).classList;
        const sel = q.contains('selected');
        if(!sel){

            q.add("selected");
            sizeSelectCount++
        }
        else{
            q.remove("selected");
        }
    }
    renderSizeBox(sizesArr)
    
    // Product Price [USD]
    document.getElementById("item-price").innerHTML = "$"+price;
    // Crypto Currency Converter //
    const ethUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[0];
    const btcUrl = "https://api.gemini.com/v1/pubticker/"+coin_usd[1];
    // let ping = 0     // Remove all "ping" comments to test 
    async function storeGemeniApi(coin, api_url, price) {
        const cost = Number(price)
        let response = await fetch(api_url)
        const data = await response.json()
        const c_price = parseFloat(data.last)
        const c_usd = Number(1/c_price)
        const total = Number(c_usd*cost)
        let c_display = total.toFixed(6) + " " + coin
        // document.getElementById(coin).innerHTML = c_display;
        localStorage.setItem(coin+'_bank', c_display);
        return (localStorage.getItem(coin+'_bank'));
    }

    const updateCoin = (name, url, cost) => {
        setInterval(() => {storeGemeniApi(name, url, cost)}, 15000) // Update coing prices
    }

    storeGemeniApi(coin_name[0], ethUrl, price, 0)
    storeGemeniApi(coin_name[1], btcUrl, price, 0)
    updateCoin(coin_name[0], ethUrl, price)
    updateCoin(coin_name[1], btcUrl, price)

}


// MODAL
// Get the modal
var product_modal = document.getElementById("product-card");
var product_modal_container = document.getElementsByClassName("container product-container");

// Get the button that opens the modal
var product_btn = document.getElementById("product-trigger");

// Get the <span> element that closes the modal
// var product_span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
product_btn.addEventListener('click', function(e) {
    product_modal.style.display = "block";
})


// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
window.addEventListener('click', function(e) {
    if (e.target == product_modal) {
        product_modal.style.display = "none";
      console.log("bloop")
    }
})
// window.onclick = function(e) {
//   if (e.target == product_modal) {
//     product_modal.style.display = "none";
//   }
// }

productCard();