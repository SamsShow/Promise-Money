'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header= document.querySelector('.header')
const btnScrollTo=document.querySelector('.btn--scroll-to')
const section1=document.querySelector('#section--1')
const tabs=document.querySelectorAll('.operations__tab')
const tabsContainer=document.querySelector('.operations__tab-container')
const tabsContent=document.querySelectorAll('.operations__content')
const nav=document.querySelector('.nav')
const initialCoords=section1.getBoundingClientRect()
const slides=document.querySelectorAll('.slide')
const slider=document.querySelector('.slider')
const slider__left = document.querySelector('.slider__btn--left')
const slider__right= document.querySelector('.slider__btn--right')
const maxSlide=slides.length

//--------CREATE FUNCTION TO OPEN MODAL----------
const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};
//--------CREATE FUNCTION TO CLOSE MODAL----------

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//--------CREATE FUNCTION TO SCROLL TO SEC-1----------
btnScrollTo.addEventListener('click', function(e){
  const s1coords=section1.getBoundingClientRect()
  window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top +window.pageYOffset,
    behavior : 'smooth'})  
})

//---------CREATE FUNCTION TO SCROLL ON NAV CLICK EVENT-------------
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault()
  if(e.target.classList.contains('nav__link')){
    const id=e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }
})



//--------------CREATE FUNCTION TO DISPLAY OPERATIONS----------------
tabsContainer.addEventListener('click', function(e){
  const clicked=e.target.closest('.operations__tab')

  if(!clicked) return 

  // remove active classes
  tabs.forEach(t=>t.classList.remove('operations__tab--active'))
  tabsContent.forEach(t=>t.classList.remove('operations__content--active'))

  //activete button
  clicked.classList.add('operations__tab--active')

  //acivate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active')
})

//------------MENU FADE ANIMATION------------

nav.addEventListener('mouseover', function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target

    const siblings=link.closest('.nav')
    .querySelectorAll('.nav__link')

    const logo=link.closest('.nav')
    .querySelector('img')
    
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity=0.5
    })
    logo.style.opacity=0.5
  }
})
const handleHover= function(e){
  nav.addEventListener('mouseover', function(e){
    if(e.target.classList.contains('nav__link')){
      const link=e.target
  
      const siblings=link.closest('.nav')
      .querySelectorAll('.nav__link')
  
      const logo=link.closest('.nav')
      .querySelector('img')
      
      siblings.forEach(el=>{
        if(el !== link) el.style.opacity=0.1
      })
      logo.style.opacity=0.1
    }
  })
}

nav.addEventListener('mouseout', function(e){
  if(e.target.classList.contains('nav__link')){
    const link=e.target

    const siblings=link.closest('.nav')
    .querySelectorAll('.nav__link')

    const logo=link.closest('.nav')
    .querySelector('img')
    
    siblings.forEach(el=>{
      if(el !== link) el.style.opacity=1
    })
    logo.style.opacity=1
  }
})

// ----------STICKY NAV BAR--------------

// window.addEventListener('scroll', function(){

//   if(window.scrollY>initialCoords.top) nav.classList.add('sticky')    
  
//   else nav.classList.remove('sticky')
// })

const navHeight=nav.getBoundingClientRect().height
const stickyNav= function (entries){
  const [entry]=entries;
  if(!entry.isIntersecting) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}
const headerObserver= new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0, 
  rootMargin:`-${navHeight}px`,
})
headerObserver.observe(header)

//-------FUNCTION THAT SHOW LAZY CONTENT-----------
const allSections=document.querySelectorAll('.section')
const revealSection= function(entries, observer){
  const [entry]=entries
  if(!entry.isIntersecting) return
  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver=new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15
})

allSections.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})
//----------FUNCTION TO LOAD LAZY IMAGES------------
const imgTargets= document.querySelectorAll('img[data-src]')

const loadImg= function(entries, observer){
  const [entry]= entries
  if(!entry.isIntersecting) return
  entry.target.src=entry.target.dataset.src
  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  })
  observer.unobserve(entry.target)

}
const imgObserver= new IntersectionObserver(loadImg, 
{
  root : null,
  threshold : 0,
  rootMargin : '-200px'  
})

imgTargets.forEach(img=>imgObserver.observe(img))

//----------FUNCTION TO CREATE SLIDER---------------
let currSlide=0

slider.style.transform='scale(1)'
slider.style.overflow='visible'
slides.forEach(( s, i )=>{s.style.transform=`translateX(${100 * i}%)`})

const goToSlide = function(slide){
  slides.forEach(( s, i )=>{s.style.transform=`translateX(${100 * (i-slide) }%)`})
}

const nextSlide= function(){
  if(currSlide==maxSlide-1){
    currSlide=0
  }
  else{ currSlide++ }
  goToSlide(currSlide)
}

const prevSlide= function(){
  if(currSlide==0){
    currSlide=maxSlide-1
  }
  else{ currSlide-- }
  goToSlide(currSlide)
}

slider__left.addEventListener('click', prevSlide)
slider__right.addEventListener('click', nextSlide)
