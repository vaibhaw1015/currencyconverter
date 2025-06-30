
const dropdown=document.querySelectorAll(".dropdown select");
 const btn=document.querySelector("form button");
 const fromcurr=document.querySelector(".from select");
 const tocurr=document.querySelector(".to select");

 let currencyData = {};  // This will store the fetched currency exchange rates

 // Fetch the exchange rates from the API
 async function fetchCurrencyData() {
     const apiUrl = "https://api.currencyapi.com/v3/latest?apikey=cur_live_Aoav5BwZ0gXpMtriJjC5YfbdgOcHVvKUaZMmGiUZ";
     try {
         const response = await fetch(apiUrl);
         const data = await response.json();
         currencyData = data.data;  // Assuming the data is in a 'data' property
         populateDropdowns();  // Once data is fetched, populate the dropdowns
     } catch (error) {
         console.error("Error fetching currency data:", error);
     }
 }

function populateDropdowns(){
for(let select of dropdown){
    for(currcode in countryName){
    let newoption=document.createElement("option");
    newoption.innerText=currcode;
    newoption.value=currcode;
    if(select.name==="from" && currcode==="USD"){
        newoption.selected="selected";
    }else if(select.name==="to" && currcode==="INR"){
        newoption.selected="selected";
    }
    select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    }); 
}
}
const updateflag=(element)=>{
let currcode=element.value;
let countrycode=countryName[currcode];
let newsrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
let img=element.parentElement.querySelector("img");
img.src=newsrc;
};

btn.addEventListener("click",async(evt)=>{
    // to get do as a default
evt.preventDefault();
let amount=document.querySelector(".amount input");

let amtval= amount.value;
if(amtval==="" || amtval<1){
    amtval=1;
    amount.value="1";
};
let fromCurrency = fromcurr.value;
    let toCurrency = tocurr.value;

    // Fetch the conversion rate
    let fromRate = currencyData[fromCurrency].value;
    let toRate = currencyData[toCurrency].value;

    // Perform the conversion (amount * target_rate / base_rate)
    let convertedAmount = (amtval * toRate) / fromRate;
    let msgElement = document.querySelector(".msg");
    if (msgElement) {
        msgElement.innerText = `${amtval} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;
    } else {
        console.error(".msg element not found.");
    }
});

// Fetch the currency data when the page loads
fetchCurrencyData();