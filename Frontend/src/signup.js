let form=document.getElementById("signup_form");
let container=document.getElementById("popup");
const baseUrl=`https://ctshirt.onrender.com`;

function closepopup(){
    if(!data.isError){
        popup.classList.remove("open-popup");
        window.location.href="../login_signip.html";
    }
    
};

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    popup.classList.add("open-popup");
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
    popup.innerHTML=`
    <h1>${data.message}</h1>
    <button onclick="closepopup(data.isError)>close</button>
    `
    // alert(data.message);
    
    
    
   })
})