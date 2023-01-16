const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextBtn = document.querySelector('.carousel__button--right');
const prevBtn = document.querySelector('.carousel__button--left');
const navIndicate = document.querySelector('.carousel__nav');
const dots = Array(navIndicate.children);

const slideWidth = slides[0].getBoundingClientRect().width;

//расположить слайды рядом друг к другу

const setSlidePosition = (slide,index) => {
    slide.style.left = slideWidth * index + 'px' 
}
slides.forEach(setSlidePosition);

const moveToSlide = (track,currentSlide,targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')'; 
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

//клик влево - переход слайда влево

prevBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    
    moveToSlide(track,currentSlide,prevSlide)
})

//клик вправо - переход слайда вправо

nextBtn.addEventListener('click', e => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    
    moveToSlide(track,currentSlide,nextSlide)
})

//клик на индикатор, переход к слайду