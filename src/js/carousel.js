const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right');
const prevBtn = document.querySelector('.carousel__button--left');
const navIndicate = document.querySelector('.carousel__nav');
const dots = Array.from(navIndicate.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//расположить слайды рядом друг к другу

const setSlidePosition = (slide,index) => {                 
    slide.style.left = slideWidth * index + 'px' 
}
slides.forEach(setSlidePosition);

const moveToSlide = (track,currentSlide,targetSlide,currentDot, targetDot) => {

    if (currentSlide == slides[0] && targetSlide == null){
        targetSlide = slides.at(-1)
        targetDot = dots.at(-1)
        
    }
    if (currentSlide == slides.at(-1) && targetSlide == null)
    {
        targetSlide = slides[0];
        targetDot = dots[0];   
    }

    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
    currentSlide.classList.remove('active');
    targetSlide.classList.add('active');
    currentDot.classList.remove('active'); 
    targetDot.classList.add('active');   
}

//клик влево - переход слайда влево

prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navIndicate.querySelector('.active'); //переключение активного инкатора при нажатии на стрелку влево
    const prevDot = currentDot.previousElementSibling;
    
    console.log(prevSlide);
    moveToSlide(track,currentSlide,prevSlide,currentDot,prevDot);
})

//клик вправо - переход слайда вправо

nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navIndicate.querySelector('.active'); //переключение активного инкатора при нажатии на стрелку вправо
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track,currentSlide,nextSlide,currentDot,nextDot);
})

//клик на индикатор, переход к слайду

navIndicate.addEventListener('click', e =>{
    targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.active');
    const currentDot = navIndicate.querySelector('.active');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide, currentDot,targetDot);

    console.log(currentSlide);
})