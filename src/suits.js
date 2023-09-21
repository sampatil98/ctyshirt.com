let main=document.getElementById("product_div");
const baseUrl="https://ctshirt.onrender.com";

const loader=document.getElementById("loader");
const loadercontent=document.getElementById("loadercontent");

window.addEventListener("load",()=>{
    let endpoint=`${baseUrl}/product/?q=suit`
    fetchdata(endpoint);
});

function fetchdata(target){
    loader.style.display = 'block';
    fetch(target)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data.data);
        loader.style.display = 'none';
        loadercontent.classList.remove('hidden');
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
    let endpoint=`${baseUrl}/product/?q=suit&sort=${sortoption.value}`;
   fetchdata(endpoint);
});