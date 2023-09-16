let form=document.getElementById("signup_form");
let container=document.getElementById("popup");
const baseUrl=`https://ctshirt.onrender.com`;

const loader=document.getElementById("loader");
const loadercontent=document.getElementById("loadercontent");
const feedbackElement = document.getElementById('popup-message');



loader.style.display = 'none';


// function closepopup(){
//     if(!data.isError){
//         popup.classList.remove("open-popup");
//         window.location.href="../login_signip.html";
//     }
    
// };

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    loader.style.display = 'block';

    
    let obj={
        firstname:form.firstname.value,
        lastname:form.lastname.value,
        email:form.email.value,
        password:form.password.value,
        phone:form.phone.value
    }
    fetch(`${baseUrl}/user/register`,{
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
            
              window.location.href="../login_signip.html";
            
          })
      }
    
    
    
    
   })
})