 
 /*-------------- NAV ---------------*/
  (() => {
    const hamburgerBtn = document.querySelector(".hamburger-btn"),
    navMenu = document.querySelector(".menu"), 
    closeNavBtn = navMenu.querySelector(".close");
   

    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu() {
      navMenu.classList.add("open");
      bodyScrollingToggle();
    }

    function hideNavMenu(){
      navMenu.classList.remove("open");
      fadeOutEffect()
      bodyScrollingToggle();
    }

    function fadeOutEffect(){
      document.querySelector(".fade-out-effect").classList.add("active");
      setTimeout(() =>{
        document.querySelector(".fade-out-effect").classList.remove("active")
      },300)
    }

    // Controlador de eventos

    document.addEventListener(("click"), (event) =>{
      if(event.target.classList.contains("link-item")){

        // Me aseguro que event.target antes del default
        if(event.target.hash !== ""){
          // prevengo el default
          event.preventDefault();
          const hash = event.target.hash;

          // Desativo la sección activa
          document.querySelector(".section.active").classList.add("hide");
          document.querySelector(".section.active").classList.remove("active");
          
          // Activo una nueva sección 

          document.querySelector(hash).classList.add("active");
          document.querySelector(hash).classList.remove("hide");

          // Desativo el Nav luego de selecionar que quiero ver
          navMenu.querySelector(".active").classList.add("outer-shadow");
          navMenu.querySelector(".active").classList.remove("active");
         if(navMenu.classList.contains("open")){
              // Activo un Nuevo Nav
               event.target.classList.add("active");
               event.target.classList.remove("outer-shadow");
         
              // Oculto el Nav
               hideNavMenu();
         }
          else {
            let navItems = navMenu.querySelectorAll(".link-item");
            navItems.forEach((item) => {
              if(hash === item.hash){
                item.classList.add("active");
                item.classList.remove("outer-shadow");
              }
            })
            fadeOutEffect();
          }

             //agrego el # a la URL

             window.location.hash = hash;
        }
      }
    })

  })();

 
 
 /*------------ sobre mi --------------*/
  (()=>{
    const sobreMi = document.querySelector(".sobreMi"),
    pestContainer = document.querySelector(".pestañas");

    pestContainer.addEventListener("click", (event) =>{
       if(event.target.classList.contains("item1") &&
         !event.target.classList.contains("active")){
         const target = event.target.getAttribute("data-target");
         pestContainer.querySelector(".active").classList.remove("active");
         event.target.classList.add("active", "button");

         sobreMi.querySelector(".contenido.active").classList.remove("active");
         sobreMi.querySelector(target).classList.add("active")

        }  
    })
})();

function bodyScrollingToggle(){
  document.body.classList.toggle("hidden-scrolling");
}




/*--------------- Porfolio filter and popup----------------- */

(() => {

  const filterContainer = document.querySelector(".porfolio-filter"),
  porfolioItemContainer = document.querySelector(".porfolio-items"),
  porfolioItems = document.querySelectorAll(".porfolio-item"),
  popup = document.querySelector(".porfolio-popup"),
  prevBtn = popup.querySelector(".pp-prev"),
  nextBtn = popup.querySelector(".pp-next"),
  clouseBtn = popup.querySelector(".pp-close"),
  projectDetailsContainer = popup.querySelector(".pp-details"),
  projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
  let itemIndex, slideIndex, screenshots;

  /*---------- Filter porfolio items -----------*/

  filterContainer.addEventListener("click", (event)=>{
    if(event.target.classList.contains("filter-item") &&
    !event.target.classList.contains("active")){
      filterContainer.querySelector(".active").classList.remove("active")
      event.target.classList.add("active");
      const target = event.target.getAttribute("data-target");
      porfolioItems.forEach((item) =>{
        if(target === item.getAttribute("data-category") || target === "all"){
          item.classList.remove("hide");
          item.classList.add("show");
        }
        else {
          item.classList.remove("show");
          item.classList.add("hide");
        }
      })
    }
  })

  porfolioItemContainer.addEventListener("click", (event) =>{
    if (event.target.closest(".porfolio-item1")){
      const porfolioItem = event.target.closest(".porfolio-item1").parentElement;

      itemIndex = Array.from(porfolioItem.parentElement.children).indexOf(porfolioItem);
      screenshots = porfolioItems[itemIndex].querySelector(".porfolio-item-img img").getAttribute("data-screenshots");

      screenshots = screenshots.split(",");
      if (screenshots === 1) {
        prevBtn.style.display = "block";
        nextBtn.style.display = "block";
      } else {

      }
      slideIndex = 0;
      popupToggle();
      popupSlideshow();
      popupDetails();
    }
  })

   clouseBtn.addEventListener("click", () => {
    popupToggle()
    if(projectDetailsContainer.classList.contains("active")){
      popupDetailsToggle();
    }
   }) 

   function popupToggle() {
     popup.classList.toggle("open");
     bodyScrollingToggle();
   }

   function popupSlideshow() {
     const imgSrc = screenshots[slideIndex];
     const popupImg = popup.querySelector(".pp-img");
     // activo el loader

     popup.querySelector(".pp-loader").classList.add("active");
     popupImg.src = imgSrc; 
     popupImg.onload = () => {
       // desactivo el loader despues de la carga de las imagenes
       popup.querySelector(".pp-loader").classList.remove("active")
      }

      popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
   }

  //  flecha derecha

   nextBtn.addEventListener ("click", () => {
     if (slideIndex === screenshots.length -1) {
       slideIndex = 0;
     } else{
       slideIndex ++;
     }
     popupSlideshow();
   })

  //  Flecha izquierda 

  prevBtn.addEventListener ("click", () => {
    if (slideIndex === 0) {
      slideIndex = screenshots.length -1
    } else {
      slideIndex --;
    }
    popupSlideshow();
  })


  function popupDetails() {
    //Si no existen detalles
    if(!porfolioItems[itemIndex].querySelector(".porfolio-item-details")){
      projectDetailsBtn.style.display = "none";
     return;
    }

    projectDetailsBtn.style.display = "block";
    // Obtengo los detalles 
    const details = porfolioItems[itemIndex].querySelector(".porfolio-item-details").innerHTML;
    // Guardo los detalles
    popup.querySelector(".pp-project-details").innerHTML = details;
    //Obtengo el titulo
    const title = porfolioItems[itemIndex].querySelector(".porfolio-item-title").innerHTML;
    // Guardo el titulo
    popup.querySelector(".pp-title h2").innerHTML = title;
    // Obtengo la categoria
    const category = porfolioItems[itemIndex].getAttribute("data-category");
    // Guardo la categoria
    popup.querySelector(".pp-project-category").innerHTML = category.split("-").join("  ");

  }

  projectDetailsBtn.addEventListener("click", () => {
    popupDetailsToggle();
  })


  function popupDetailsToggle(){
    if (projectDetailsContainer.classList.contains("active")){
      projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
      projectDetailsBtn.querySelector("i").classList.add("fa-plus");
      projectDetailsContainer.classList.remove("active");
      projectDetailsContainer.style.maxHeight = 0 +"px";
    } else {
      projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
      projectDetailsBtn.querySelector("i").classList.add("fa-minus");
      projectDetailsContainer.classList.add("active");
      projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
      popup.scrollTo(0, projectDetailsContainer.offsetTop);
    }
  }

})();


/*---------- Oculto todas las secciones menos la activa -----------*/

(()=> {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if(!section.classList.contains("active")){
      section.classList.add("hide");
    }
  })
})();


         