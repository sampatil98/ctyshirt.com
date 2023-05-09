 let form=document.getElementById("login_form");
 

 form.addEventListener("submit",(e)=>{
    e.preventDefault();
   let obj={
    email:form.email.value,
    password:form.Password.value
   }
   fetch("http://localhost:8080/user/login",{
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
     console.log(data.token);
    alert(data.msg);
    
    if(data.token){
      localStorage.setItem("user",JSON.stringify(data.user));
      localStorage.setItem("token",JSON.stringify(data.token));
      window.location.href="/index.html";
    }
    
    
   })
 })

