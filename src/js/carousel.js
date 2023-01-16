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

const moveToSlide = (track,currentSlide,targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
    currentSlide.classList.remove('active');
    targetSlide.classList.add('active');
}

const updateToDots = (currentDot,targetDot) => {
    currentDot.classList.remove('active'); 
    targetDot.classList.add('active');       //активный индикатор меняет цвет                 
}  

//клик влево - переход слайда влево

prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = navIndicate.querySelector('.active'); //переключение активного инкатора при нажатии на стрелку влево
    const prevDot = currentDot.previousElementSibling;
    
    moveToSlide(track,currentSlide,prevSlide);
    updateToDots(currentDot,prevDot);
})

//клик вправо - переход слайда вправо

nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.active');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = navIndicate.querySelector('.active'); //переключение активного инкатора при нажатии на стрелку вправо
    const nextDot = currentDot.nextElementSibling;

    moveToSlide(track,currentSlide,nextSlide)
    updateToDots(currentDot,nextDot);
})

//клик на индикатор, переход к слайду

navIndicate.addEventListener('click', e =>{
    targetDot = e.target.closest('button');

    if(!targetDot) return;

    const currentSlide = track.querySelector('.active');
    const currentDot = navIndicate.querySelector('.active');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track,currentSlide,targetSlide);
    updateToDots(currentDot,targetDot);

    // if(targetIndex === 0){
    //     prevBtn.classList.add('hidden');
    //     nextBtn.classList.remove('hidden');
    // } else if (targetIndex === slides.length-1){
    //     prevBtn.classList.remove('hidden');
    //     nextBtn.classList.add('hidden');
    // } else {
    //     prevBtn.classList.remove('hidden');
    //     nextBtn.classList.remove('hidden');     //это пока не получается сделать...
    // }
})