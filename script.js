function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()


function CartSlide(){
  var main =document.querySelector(".main")
  var cartDiv = document.querySelector(".cart")
  var shoppingCart = document.querySelector(".navBar .navBar-2 #ShoppingCart")
  var close = document.querySelector(".cart .cart-Nav i")

  shoppingCart.addEventListener("click",function(){
    gsap.to(cartDiv,{
      right:0,
      duration:0.6,
    })
    gsap.to(main,{
      filter:'blur(5px)'
    })
    gsap.to(".navBar",{
      filter:"blur(5px)"
    })
  })
  close.addEventListener("click",function(){
    gsap.to(cartDiv,{
      right:"-50%",
      duration:0.6,
    })
    gsap.to(main,{
      filter:'blur(0px)'
    })
    gsap.to(".navBar",{
      filter:"blur(0px)"
    })
  })
}
CartSlide()

function mouseFollower(){
  var crsr = document.querySelector(".cursor")
  // var crsr2= document.querySelector(".cursor2")
  document.addEventListener("mousemove",function(dets){
    gsap.to(crsr,{
      x:dets.x,
      y:dets.y
    })
  })
}
mouseFollower()


function cursorEffect(){
  var circle = document.querySelector(".swiper .circle")
  var swipper = document.querySelector(".swiper")
   swipper.addEventListener("mouseenter",function(){
      gsap.to(circle,{
        opacity:1,
        scale:1
      })
      gsap.to(".cursor",{
        opacity:0,
        scale:0
      })
    })
   swipper.addEventListener("mouseleave",function(){
      gsap.to(circle,{
        opacity:0,
        scale:0
      })
      gsap.to(".cursor",{
        opacity:1,
        scale:1
      })
    })
  swipper.addEventListener("mousemove",function(dets){
    gsap.to(circle,{
      x:dets.x - swipper.getBoundingClientRect().x,
      y:dets.y - swipper.getBoundingClientRect().y
    })
    gsap.to(".cursor",{
      opacity:0,
      scale:0
    })
  })
}
cursorEffect()


var tl=gsap.timeline()
function Page(){
  var h1=document.querySelector(".loading h1").textContent
  var splittedText=h1.split("")
  document.querySelector(".loading h1").innerHTML=""

  splittedText.forEach(function(char,index){
    const span = document.createElement('span');
      span.textContent = char;
      span.style.display = 'inline-block';
      document.querySelector(".loading h1").appendChild(span);
        
    // Animate the color change with GSAP
    tl.to(span, {
        color: 'transparent',
        duration: 0.5,
        delay: index * 0.3,
        onComplete: () => {
            gsap.to(span, 
              { color: 'white',
                 duration: 0.5}
            );
        }
    });
});
tl.to(".loading h1",{
  delay:1.5,
  opacity:0,
})
tl.to(".loading container",{
  opacity:0,
},"Sam")
tl.to(".loading .container .box",{
  height:0,
  duration:1,
  stagger:{
    amount:0.6,
  }
},"Sam")
tl.to(".loading",{
  y:"-100%",
  opacity:0
})
tl.from(".navBar",{
  y:-100,
  duration:0.5,
})
}
Page()


function page1TextAnimation(){
  var h1Text=document.querySelector(".page1 h1").textContent
  var splittedText2=h1Text.split("")
  var clutter=""
  splittedText2.forEach(function(elem){
    clutter += `<span>${elem}</span>`
  })
  
  document.querySelector(".page1 h1").innerHTML=clutter
  
  tl.from(".page1 h1",{
    y:500,
    duration:1,
    stagger:0.3,
  },"page1Text")
  tl.from(".page1 .text-1 h4",{
    y:500,
    duration:0.6
  },"page1Text")
  tl.from(".page1>h5",{
    opacity:0,
  },"texth5")
  tl.from(".page1 .text-container",{
    opacity:0
  },"texth5")
  tl.from(".page1 .swiper",{
    opacity:0
  },"texth5")
}
page1TextAnimation()


function swipper(){
  var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    // pagination: {
    //   el: ".swiper-pagination",
    //   clickable:true,
    // },
  navigation: 
  {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

});
}
swipper()



function imageAnimationPage2(){
  var tl=gsap.timeline({
    scrollTrigger:{
      scroller:".main",
      trigger:".page2 .container",
      start:"top 80%",
      // end:"top 100%",
      scrub:2,
      // markers:true,
    }
  })
  tl.to(".page2 .container .box .image img",{
    y:-70,
  })
}
imageAnimationPage2()


function TextAnimationPage3(){
  var tl = gsap.timeline({
    scrollTrigger:{
      scroller:".main",
      trigger:".page3",
      start:"top 70%",
      // markers:true,
    }
  })
  tl.from(".page3 .text-container h1",{
    y:700,
    duration:1,
  })
  tl.from(".page3 .container",{
    opacity:0,
    duration:1,
  })
}
TextAnimationPage3()


var arr=[{
  image:"./images/json1-nikeAir.webp",
  name:"Nike Air",
  Gender:"Men's  Shoe's",
  price:"RS - 15,799",
  added:false,
},{
  image:"./images/json-2.png",
  name:"Nike Jacket",
  Gender:"Men's Clothing",
  price:"RS - 14,599",
  added:false,
},{
  image:"./images/Json1-4.jpg",
  name:"Sports Wear",
  Gender:"women's Clothing",
  price:"RS - 12,999",
  added:false,
},{
  image:"./images/json1-nikeSatan.webp",
  name:"Nike Satan",
  Gender:"Men's Shoe's",
  price:"RS - 18,999",
  added:false,
},{
  image:"./images/json1-womensHead.png",
  name:"Head Wear",
  Gender:"Women's Hat",
  price:"RS - 4,599",
  added:false
},
{
  image:"./images/json1-hadWear.png",
  name:"Hat's",
  Gender:"Men's Hat",
  price:"RS - 4,999",
  added:false
}]

var menArray=[{
  image:"./images/men-item1.jpg",
  name:"Nike Air",
  Gender:"Men's Shoe's",
  Price:"RS - 10,999",
  added:false,
},{
  image:"./images/men-item2.jpg",
  name:"Nike Air",
  Gender:"Men's Shoe's",
  Price:"RS - 12,599",
  added:false
},{
  image:"./images/men-tem7.jpg",
  name:"Nike Dunk Retro",
  Gender:"Men's Shoe's",
  Price:"RS - 11,999",
  added:false
},{
  image:"./images/men-item8.jpg",
  name:"Nike Dunk",
  Gender:"Men's Shoe's",
  Price:"RS - 8,999",
  added:false
},{
  image:"./images/men-item3.jpg",
  name:"Therma FIT",
  Gender:"Men's Clothing",
  Price:"RS - 14,599",
  added:false
},{
  image:"./images/men-item4.jpg",
  name:"Hats & Visors",
  Gender:"Men's Cap",
  Price:"RS - 4,599",
  added:false
},{
  image:"./images/men-item5.jpg",
  name:"Therma FIT",
  Gender:"Men's Clothing",
  Price:"RS - 7,599",
  added:false
},{
  image:"./images/men-item6.jpg",
  name:"Therma FIT Jacket",
  Gender:"Men's Clothing",
  Price:"RS - 9,999",
  added:false
},{
  image:"./images/men-item9.jpg",
  name:"Nike Joyride",
  Gender:"Men's Shoe's",
  Price:"RS - 15,999",
  added:false
}]

var womenArray=[{
  image:"./images/women-1.jpg",
  name:"Nike Air",
  Gender:"Women's Shoe's",
  Price:"RS - 10,999",
  added:false
},{
  image:"./images/women-2.jpg",
  name:"Nike Air",
  Gender:"Women's Shoe's",
  Price:"RS - 12,599",
  added:false
},{
  image:"./images/women-3.jpg",
  name:"Nike Dunk Retro",
  Gender:"Women's Shoe's",
  Price:"RS - 11,999",
  added:false
},{
  image:"./images/women-4.jpg",
  name:"Therma FIT",
  Gender:"Women's Clothing",
  Price:"RS - 8,999",
  added:false
},{
  image:"./images/women-5.jpg",
  name:"Therma FIT Jacket",
  Gender:"Women's Clothing",
  Price:"RS - 14,599",
  added:false
},{
  image:"./images/women-6.jpg",
  name:"Nike Dunk",
  Gender:"Women's Shoe's",
  Price:"RS - 4,599",
  added:false
},{
  image:"./images/women-7.png",
  name:"Hat's & Visor's",
  Gender:"Women's Cap",
  Price:"RS - 7,599",
  added:false
},{
  image:"./images/women-8.png",
  name:"Therma FIT Jacket",
  Gender:"Women's Clothing",
  Price:"RS - 9,999",
  added:false
},{
  image:"./images/women-9.png",
  name:"Therma FIT",
  Gender:"Women's Clothing",
  Price:"RS - 15,999",
  added:false
}]

function JSONDATA(){

  var clutter1=""
  arr.forEach(function(elem,index){
   clutter1+=`
     <div class="swiper-slide">
            <div class="shoes-image">
                <img src="${elem.image}" alt="">
            </div>
            <div class="details">
                 <div class="information1">
                  <h4>${elem.name}</h4>
                  <h5>${elem.Gender}</h5>
                  </div>
                  <h3>${elem.price}</h3>
            </div>
            <button data-value = ${index} class="add">Add</button>
        </div>
   `
  })
  document.querySelector(".page1 .mySwiper .swiper-wrapper").innerHTML=clutter1

  var clutter2=""
  menArray.forEach(function(elem,index){
    clutter2+=`
      <div class="box">
          <div class="picture">
               <img src="${elem.image}" alt="">
          </div>
          <div class="details">
            <div class="infor">
               <h3>${elem.name}</h3>
               <h5>${elem.Gender}</h5>
            </div>
            <h4>${elem.Price}</h4>
          </div>
          <button data-value = ${index} class="add">Add</button>
      </div>
    `
  })
  document.querySelector(".page3 .container").innerHTML = clutter2

  var clutter3=""
  womenArray.forEach(function(elem,index){
    clutter3+=`
       <div class="box">
          <div class="picture">
               <img src="${elem.image}" alt="">
          </div>
          <div class="details">
            <div class="infor">
               <h3>${elem.name}</h3>
               <h5>${elem.Gender}</h5>
             </div>
             <h4>${elem.Price}</h4>
          </div>
          <button data-value = ${index} class="add">Add</button>
      </div>
    `
  })
  document.querySelector(".page4 .container").innerHTML = clutter3
}
JSONDATA()


function showCart(){

var added1 = menArray.filter(function(elem){
    return elem.added===true
})
var MenClutter=""
added1.forEach(function(elem,index){
  MenClutter+=`
    <div class="cart-box">
      <div class="cart-box-image">
         <img src="${elem.image}" alt="">
        </div>
      <div class="cart-box-text">
        <h4>${elem.name}</h4>
         <h6>${elem.Gender}</h6>
         <h3>${elem.Price}</h3>
        </div>
      <div class="cart-box-quantity">
         <h4>Quantity</h4>
        <h6>1</h6>
      </div>
      <i data-value = ${index} class="ri-close-fill remove"></i>
    </div>
  `
})

///>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
var added = womenArray.filter(function(elem){
  return elem.added === true
})
var WomenClutter=""
added.forEach(function(elem,index){
  WomenClutter+=`
<div class="cart-box">
    <div class="cart-box-image">
       <img src="${elem.image}" alt="">
      </div>
    <div class="cart-box-text">
      <h4>${elem.name}</h4>
       <h6>${elem.Gender}</h6>
       <h3>${elem.Price}</h3>
      </div>
    <div class="cart-box-quantity">
       <h4>Quantity</h4>
      <h6>1</h6>
    </div>
    <i data-value = ${index} class="ri-close-fill  remove"></i>
  </div>
  `
})

var added2 = arr.filter(function(elem){
  return elem.added === true
})

var SliderClutter=""
added2.forEach(function(elem,index){
  SliderClutter+=`
  <div class="cart-box">
    <div class="cart-box-image">
       <img src="${elem.image}" alt="">
      </div>
    <div class="cart-box-text">
      <h4>${elem.name}</h4>
       <h6>${elem.Gender}</h6>
       <h3>${elem.price}</h3>
      </div>
    <div class="cart-box-quantity">
       <h4>Quantity</h4>
      <h6>1</h6>
    </div>
    <i data-value = ${index} class="ri-close-fill  remove"></i>
  </div>
  `
})

var TotalItems = added.length+added1.length+added2.length;
document.querySelector(".navBar .navBar-2 .navBar-2-Shopping h5").textContent = TotalItems


var combinedClutter = MenClutter + WomenClutter + SliderClutter;
document.querySelector(".cart .cart-container").innerHTML = combinedClutter;

}
showCart()


function BringProductsToCart(){
  document.querySelector(".page1 .swiper .swiper-wrapper").addEventListener("click",function(elem){
    if(elem.target.classList.contains("add")){
     arr[elem.target.dataset.value].added = true;
     showCart();
    }

 })

  document.querySelector(".page3 .container").addEventListener("click",function(elem){
     if(elem.target.classList.contains("add")){
      menArray[elem.target.dataset.value].added = true;
      showCart();
     }
  })

  document.querySelector(".page4 .container")
  .addEventListener("click",function(elem){
     if(elem.target.classList.contains("add")){
      womenArray[elem.target.dataset.value].added = true;
      showCart();
     }
  })

}
BringProductsToCart()


function RemoveProductsFromCart(){
  document.querySelector(".cart .cart-container").addEventListener("click",function(elem){
    if(elem.target.classList.contains("remove")){
     menArray[elem.target.dataset.value].added = false;
     showCart();
    }
 })


 document.querySelector(".cart .cart-container").addEventListener("click",function(elem){
  if(elem.target.classList.contains("remove")){
   womenArray[elem.target.dataset.value].added = false;
   showCart();
  }
})

document.querySelector(".cart .cart-container").addEventListener("click",function(elem){
  if(elem.target.classList.contains("remove")){
   arr[elem.target.dataset.value].added = false;
   showCart();
  }
 console.log("hello");

})


}
RemoveProductsFromCart()


function TextAnimationPage4(){
  var tl = gsap.timeline({
    scrollTrigger:{
      scroller:".main",
      trigger:".page4",
      start:"top 70%",
      // markers:true,
    }
  })
  tl.from(".page4 .text-container h1",{
    y:700,
    duration:1,
  })
  tl.from(".page4 .container",{
    opacity:0,
    duration:1,
  })
}
TextAnimationPage4()


function animatespan(){
  document.querySelectorAll(".animate")
.forEach(function(elem){
  var parent  = document.createElement("span");
  var child =  document.createElement("span");

   parent.classList.add("parent");
   child.classList.add("child");

   child.innerHTML = elem.innerHTML;
   parent.appendChild(child)

   elem.innerHTML  = "";
   elem.appendChild(parent); 

})
}
animatespan();


function animatespan(){
  document.querySelectorAll(".animate")
.forEach(function(elem){
  var parent  = document.createElement("span");
  var child =  document.createElement("span");

   parent.classList.add("parent");
   child.classList.add("child");

   child.innerHTML = elem.innerHTML;
   parent.appendChild(child)

   elem.innerHTML  = "";
   elem.appendChild(parent); 

})
}
animatespan();


function footerAnimation(){
  var tl2 =  gsap.timeline({});

  tl2.from(".front span .child" ,{
    y:100,
    opacity:1,
    duration:.2,
    scrollTrigger:{
      trigger:".front",
      scroller: ".main",
      start:"top 100%",
      end:" top 70%",
      scrub:.2,
    }
  })
  tl2.to("#back .loga",{
    top:"120%",
    duration:1,
    opacity: 0,
    backgroundColor: "253B39",
    scrollTrigger:{
      trigger:"#back",
      scroller: ".main",
      start:"top 95%",
      end:"bottom 40%",
      scrub:.3,
    }
  })
}
footerAnimation()


