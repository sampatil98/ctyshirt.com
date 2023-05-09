let form=document.getElementById("signup_form");

form.addEventListener("submit",(e)=>{
    e.preventDefault();
    let obj={
        firstname:form.firstname.value,
        lastname:form.lastname.value,
        email:form.email.value,
        password:form.password.value,
        phone:form.phone.value
    }
    fetch("http://localhost:8080/user/register",{
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
    // localStorage.setItem("user",json.stringify(data.user));
    // localStorage.setItem("token",json.stringify(data.token));
    alert(data.msg);
    window.location.href="/login_signip.html";
    
   })
})