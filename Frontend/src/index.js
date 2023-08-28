var coll = document.getElementsByClassName("colaps1");

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var usersection = this.nextElementSibling;
      if (usersection.style.display === "block") {
        usersection.style.display = "none";
      } else {
        usersection.style.display = "block";
      }
    });
  }

// coll[0].addEventListener("click",()=>{
   
//     coll[0].classList.toggle("active");
//     console.log(this.classList)
//     if (usersection.style.display === "block") {
//         usersection.style.display = "none";
//     } else {
//         usersection.style.display = "block";
//     }
// })