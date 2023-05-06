let main=document.getElementById("product_div");


window.addEventListener("load",()=>{
    fetchdata();
});

function fetchdata(){
    fetch("http://localhost:8080/product/?q=pant")
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        console.log(data.data);
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