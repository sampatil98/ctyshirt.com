 let form=document.getElementById("login_form");
 const baseUrl="https://ctshirt.onrender.com";

const loader=document.getElementById("loader");
const loadercontent=document.getElementById("loadercontent");
const feedbackElement = document.getElementById('popup-message');



loader.style.display = 'none';



 form.addEventListener("submit",(e)=>{
    e.preventDefault();
    loader.style.display = 'block';
   let obj={
    email:form.email.value,
    password:form.Password.value
   }
   fetch(`${baseUrl}/user/login`,{
    method:"POST",
    headers:{
        "Content-type":"application/json"
    },
    body:JSON.stringify(obj)
   })
   .then((res)=>{
    return res.json();
   })
   .then((data)=>{
    loader.style.display = 'none';
    loadercontent.classList.remove('hidden');

    if(data.isError){
      feedbackElement.style.display = 'block';
        feedbackElement.innerHTML=`
        <img src="../img/cancel.png" alt="error">
          <h3>${data.message}</h3>
          <button id="opoup-btn">ok</button>
        `;

        const opoupbtn=document.getElementById("opoup-btn");
        opoupbtn.addEventListener("click",()=>{
          feedbackElement.style.display = 'none';
        })
         
        
    }else{
      feedbackElement.style.display = 'block';
        feedbackElement.innerHTML=`
        <img src="../img/ok.png" alt="success">
          <h3>${data.message}</h3>
          <button id="opoup-btn">ok</button>
        `
        const opoupbtn=document.getElementById("opoup-btn");
        opoupbtn.addEventListener("click",()=>{
          feedbackElement.style.display = 'none';
          if(data.token){
            localStorage.setItem("user",JSON.stringify(data.user));
            localStorage.setItem("token",JSON.stringify(data.token));
            window.location.href="/index.html";
          }
        })
    }
    
    
    
   })
 })

