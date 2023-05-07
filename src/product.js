const main=document.getElementById("main");
let popup=document.getElementById("popup");
let bagtitle=document.getElementById("title_bag");
let bagprice=document.getElementById("price_bag");
let bagimg=document.getElementById("bag_img");
let data=JSON.parse(localStorage.getItem("product"));


window.addEventListener("load",()=>{
    showdata(data);
});
function closepopup(){
    popup.classList.remove("open-popup");
};
function gotobag(){
    window.location.href="/cart.html"
}
function showdata(data){
    main.innerHTML=null;

    let card=document.createElement("div");
    card.setAttribute("class","card");

    let div1=document.createElement("div");
    div1.setAttribute("id","img_div");

    let img=document.createElement("img");
    img.src=data.img;

    div1.append(img);

    let div2=document.createElement("div");
    div2.setAttribute("id","right_div");

    let title=document.createElement("h4");
    title.innerText=data.title;

    let price=document.createElement("h4");
    price.innerText=`$${data.price}`;

    let div0=document.createElement("div");
    div0.setAttribute("id","multibuy_div");

    let multibuy=document.createElement("p");
    multibuy.setAttribute("id","multibuy");
    let discount=(data.price*20)/100;
    multibuy.innerText=`$${data.price-discount} MULTIBUY`;

    let rating=document.createElement("p");
    rating.innerText=`⭐ (${data.rating}/5)`;
    rating.setAttribute("id","rating");

    div0.append(multibuy,rating);

    let middlediv=document.createElement("div");
    middlediv.setAttribute("id","middle_div");

    let p1=document.createElement("h5");
    p1.innerText="1. COLOR";

    let btn1=document.createElement("button");
    let str1=data.color;
    btn1.innerText=str1.toUpperCase();
    btn1.setAttribute("id","color_btn");

    let p2=document.createElement("h5");
    p2.innerText="2. FIT";

    let btn2=document.createElement("button");
    let str2=(data.fit)|| "slim fit";
    btn2.innerText=str2.toUpperCase();
    btn2.setAttribute("id","fit_btn");

    let p3=document.createElement("h5");
    p3.innerText="3. SIZE";

    let btn3=document.createElement("button");
    btn3.innerText=data.size;
    btn3.setAttribute("id","size_btn");

    

    middlediv.append(p1,btn1,p2,btn2,p3,btn3);


    let btn4=document.createElement("button");
    btn4.innerText="ADD TO BAG";
    btn4.setAttribute("id","add_to_bag_btn");

    btn4.addEventListener("click",()=>{
        bagtitle.innerText=data.title;
        bagprice.innerText=`$${data.price}`;
        bagimg.src=data.img;
        popup.classList.add("open-popup");
        
    })

    

    let p4=document.createElement("h5");
    p4.innerText="PRODUCT DETAILS";

    let add=document.createElement("div");
    add.setAttribute("id","product_detail");

    let logo=document.createElement("img");
    logo.src="https://www.charlestyrwhitt.com/on/demandware.static/Sites-CTShirts-US-Site/-/default/dwf50ccab3/images/svg-icons/guarantee.svg";
    logo.setAttribute("id","quality_logo");

    let p6=document.createElement("h4");
    p6.innerText="6 MONTH QUALITY GUARANTEE";

    add.append(logo,p6);


    let p5=document.createElement("p");
    p5.innerText=data.desc;
    p5.setAttribute("id","desc");


    div2.append(title,price,div0,middlediv,btn4,p4,add,p5);

    card.append(div1,div2);
    main.append(card);

}