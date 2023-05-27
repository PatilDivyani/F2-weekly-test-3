let container = document.getElementById("container")[0];
let table = document.getElementById("table");

function addData(dataList) {
    
     table.innerHTML = '';
    
    for(let i = 0; i < dataList.length; i++){
       
        let row = dataList[i];
        let rowData = `
            <td class="img"><img src="${row.image}" alt="${row.name}" width="50"></td>
            <td>${row.name}</td>
            <td>${row.symbol.toUpperCase()}</td>
            <td>$${row.current_price.toFixed(2)}</td>
            <td>$${row.market_cap_change_24h.toFixed(2)}</td>
            <td>${row.price_change_percentage_24h.toFixed(2)}%</td>
            <td>Mkt Cap: $${row.market_cap}</td>  `;

        let tr = document.createElement("tr");
        tr.innerHTML = rowData;
        table.appendChild(tr);

    }
    container.appendChild(table);
}
let url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";
async function fetchData() {
    
    try{
    let response = await fetch(url);
        return response.json();
    }
    catch(error){
        throw error;
    }   
}
        
let arrData = [];
let result = fetchData();
result.then((data)=>{
    arrData = data;
    addData(data);
})
    
function search() {
    let searchValue = document.getElementsByTagName("input").value;
    if(searchValue){
        const searchValueData = arrData.filter((searchData)=>{
            searchData[0].name.toLowerCase().includes(searchValue.toLowerCase()) ||
            searchData[0].symbol.toLowerCase().includes(searchValue.toLowerCase())
        })
          addSortedData(searchValueData)
           
    }
}

function addSortedData(dataList) {
    
    table.innerHTML = '';
   
   for(let i = 0; i < dataList.length; i++){
      
       let row = dataList[i];
       let rowData = `
           <td class="img"><img src="${row.image}" alt="${row.name}" width="50"></td>
           <td>${row.name}</td>
           <td>${row.symbol.toUpperCase()}</td>
           <td>$${row.current_price}</td>
           <td>$${row.market_cap_change_24h}</td>
           <td>${row.price_change_percentage_24h}%</td>
           <td>Mkt Cap: $${row.market_cap}</td>  `;

       let tr = document.createElement("tr");
       tr.innerHTML = rowData;
       table.append(tr);

   }
   container.append(table);
}
function mktCap() {
    arrData.sort((a,b)=>{
        b[0].market_cap_change_24h - a[0].market_cap_change_24h
    });
    addSortedData(arrData);
}

function percentage() {
   url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_asc&per_page=10&page=1&sparkline=false"
   arrData.sort((a,b)=>{
    b[0].price_change_percentage_24h - a[0].price_change_percentage_24h
});
addSortedData(arrData);
}


