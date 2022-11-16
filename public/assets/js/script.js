// nav bar start 
let root = document.documentElement;
const section1 = document.querySelector('.header')

window.addEventListener('scroll', () => {
  const y = 1 + (window.scrollY || window.pageYOffset); 
   root.style.setProperty('--gradient-percent', y * 4 + "px");
  console.log(y)
})


let myInterval;

function openlist(){
    // document.getElementById("content2").style.left = "7%";
    myInterval = setInterval(rotateImg, 5);
    document.getElementById("content2").style.left = "0";
    document.getElementById("content2").style.opacity = "1";
    setTimeout(stopRotateImg,500);
    setTimeout(closelist,7800);
}
function closelist(){
    document.getElementById("content2").style.left = "-100%";
    document.getElementById("content2").style.opacity = "0";
}
  let rotation = 0;
  function rotateImg() {
    rotation += 10; // add 90 degrees, you can change this as you want
    if (rotation === 360) { 
      // 360 means rotate back to 0
      rotation = 0;
    }
    document.querySelector("#img").style.transform = `rotate(${rotation}deg)`;
  }
  function stopRotateImg()
  {

    let rotat = 0;
    document.querySelector("#img").style.transform = `rotate(${rotat}deg)`;
    clearInterval(myInterval);

  }

// nav bar end

// Enquery Form
let email,mobile,query;

function bodyload()
{
  openlist();
  document.getElementById("note").style.display = "none";
  document.getElementById("thankyou1").style.display = "none";
  return;
  document.getElementById("email").style.display = "none";
  document.getElementById("mobile").style.display = "none";
  document.getElementById("query").style.display = "none";
  document.getElementById("sbmt-btn").style.display = "none";
}
function showFormField()
{
 
  return;
  var name = document.getElementById("name").value;

  if(name != "" && document.getElementById("email").style.display == "none")
  {
    document.getElementById("email").style.display = "block";
  }

  else if(document.getElementById("email").value != "" && document.getElementById("mobile").style.display == "none")
  {
    document.getElementById("mobile").style.display = "block";
  }
  else if(document.getElementById("mobile").value != "" && document.getElementById("query").style.display == "none")
  {
    document.getElementById("query").style.display = "block";
  }
  else if(document.getElementById("query").value != "" && document.getElementById("sbmt-btn").style.display == "none")
  {
    document.getElementById("sbmt-btn").style.display = "block";
    document.getElementById("note").style.display = "none";
  }
}

function readMore() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = `Read more <img src="assets/img/Icon arrow.svg" alt="btn aro">`; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less"; 
    moreText.style.display = "inline";
  }
}