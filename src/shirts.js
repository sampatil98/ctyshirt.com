let main=document.getElementById("product_div");

let slimfit=document.getElementById("slim_fit");
let regularfit=document.getElementById("regular_fit");
let extraslimfit=document.getElementById("extra_slim_fit");

// let filtercheckboxes=document.querySelector("input");
// console.log(filtercheckboxes);
var filterCheckboxes = document.querySelectorAll('input[type="checkbox"]');
// console.log(filterCheckboxes);
const baseUrl="https://ctshirt.onrender.com";

const loader=document.getElementById("loader");
const loadercontent=document.getElementById("loadercontent");



let actualdata;

window.addEventListener("load",()=>{
    fetchdata();
});

function fetchdata(){
  loader.style.display = 'block';
    fetch(`${baseUrl}/product/?q=shirt`)
    .then((res)=>{
        return res.json();
    })
    .then((data)=>{
        actualdata=data.data;
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
// var $filterCheckboxes = $('input[type="checkbox"]');
var filterFunc = function() {
  
  var selectedFilters = {};

  filterCheckboxes.filter(':checked').each(function() {

    if (!selectedFilters.hasOwnProperty(this.name)) {
      selectedFilters[this.name] = [];
    }

    selectedFilters[this.name].push(this.value);
  });

  // create a collection containing all of the filterable elements
  var $filteredResults = $('.flower');

  // loop over the selected filter name -> (array) values pairs
  $.each(selectedFilters, function(name, filterValues) {

    // filter each .flower element
    $filteredResults = $filteredResults.filter(function() {

      var matched = false,
        currentFilterValues = $(this).data('category').split(' ');

      // loop over each category value in the current .flower's data-category
      $.each(currentFilterValues, function(_, currentFilterValue) {

        // if the current category exists in the selected filters array
        // set matched to true, and stop looping. as we're ORing in each
        // set of filters, we only need to match once

        if ($.inArray(currentFilterValue, filterValues) != -1) {
          matched = true;
          return false;
        }
      });

      // if matched is true the current .flower element is returned
      return matched;

    });
  });

  $('.flower').hide().filter($filteredResults).show();
}

$filterCheckboxes.on('change', filterFunc);  

// filterCheckboxes.addEventListener("change",()=>{
//     let arr=[];
//     filterCheckboxes.forEach((ele,i)=>{
//         if(ele.checked){
//             actualdata.filter((item)=>{
//                 if(ele.value==item.fit){
//                    arr.push(item);
//                 }
//             });
//         }
//         // if(arr.length==0){
//         //     showdata(actualdata)
//         // }else{
//         //     showdata(arr);
//         //     arr=[]
//         // }
        
//     })
// })


filterCheckboxes.forEach((ele,index)=>{
    // let data=actualdata;
    ele.addEventListener("change",()=>{
        filterFunc();
    })
})