let main=document.getElementById("product_div");

let slimfit=document.getElementById("slim_fit");
let regularfit=document.getElementById("regular_fit");
let extraslimfit=document.getElementById("extra_slim_fit");


const baseUrl="https://ctshirt.onrender.com";

const loader=document.getElementById("loader");
const loadercontent=document.getElementById("loadercontent");

let allproducts;

let actualdata;

window.addEventListener("load",()=>{
  let endpoint=`${baseUrl}/product/?q=shirt`
    fetchdata(endpoint);
});

function fetchdata(target){
  loader.style.display = 'block';
    fetch(target)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        actualdata=data.data;
        loader.style.display = 'none';
        loadercontent.classList.remove('hidden');
        allproducts=data.data;
        showdata(data.data);
    })
    .catch((err)=>{
        console.log(err)
    });
};

function showdata(data){
    main.innerHTML=null;

    data.forEach((element,index) => {

        let card=document.createElement("div");
        card.setAttribute("class","card");

        let img=document.createElement("img");
        img.setAttribute("class","product_img");
        img.src=element.img;

        let div=document.createElement("div");
        div.setAttribute("class","title_div");

        let title=document.createElement("p");
        title.innerText=element.title;

        title.addEventListener("click",()=>{
            localStorage.setItem("product",JSON.stringify(element));
            window.location.href="/product.html";
        });

        let fav=document.createElement("img");
        fav.setAttribute("class","fav_icon");
        fav.src="../img/favourite.png";

        div.append(title,fav);

        let price=document.createElement("h4");
        price.innerText=`$${element.price}`;

        let multibuy=document.createElement("p");
        multibuy.setAttribute("class","multibuy");
        let discount=(element.price*20)/100;
        multibuy.innerText= `$${Math.ceil(element.price-discount)} MULTIBUY`;

        card.append(img,div,price,multibuy);
        main.append(card);

        
    });
}


// sort functionality

const sortoption=document.getElementById("sort-option");

sortoption.addEventListener("change",()=>{
    let endpoint=`${baseUrl}/product/?q=shirt&sort=${sortoption.value}`;
   fetchdata(endpoint);
});

// Function to handle checkbox changes
function handleFilter() {

    const checkedFilters = Array.from(document.querySelectorAll('.filter-checkbox:checked')).map(checkbox => checkbox.value);
    // console.log(checkedFilters);
    const productItems = allproducts;
    let filtereddata=[];
    productItems.forEach(item => {
        checkedFilters.every((filter) =>{
           if(item.fit === filter || item.color === filter || item.size == filter) {
            filtereddata.push(item);
           }
            
        
        })
    });
    
    console.log("filterdata",filtereddata);
    if(filtereddata.length==0){
        fetchdata(`${baseUrl}/product/?q=shirt`)
    }else{
        showdata(filtereddata);
    }
    
}

// Attach event listener to checkboxes
const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
filterCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', handleFilter);
});

