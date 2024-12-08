  // slider - пример #2 Ивана. Тпа карусели, как в СликСлайдере

  function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}) {
    // тут нет разницы какой порядок т.к. я их буду помещать в виде свойств объекта и значений к нему  в вызове slider({}) script.js это, как в slick slider 
    const slides = document.querySelectorAll(slide), // slide = '.offer__slide'
        slider = document.querySelector(container), // container = '.offer__slider'
        prev = document.querySelector(prevArrow), // prevArrow '.offer__slider-prev'
        next = document.querySelector(nextArrow), // nextArrow = '.offer__slider-next'
        total = document.querySelector(totalCounter), // totalCounter = '#total'
        current = document.querySelector(currentCounter), // currentCounter ='#current'
        slidesWrapper = document.querySelector(wrapper), // wrapper = '.offer__slider-wrapper'
        slidesField = document.querySelector(field), //field = '.offer__slider-inner'
        width = window.getComputedStyle(slidesWrapper).width;

        function widthValue(str) {
          return  +width.replace(/\D/g, '');
        }
      let slideIndex = 1;

      let offset = 0;

      function sliderCountControl() {

        if(slides.length < 10) {
          total.textContent = `0${slides.length}`;
        current.textContent = `0${slideIndex}`;
        } else {
          total.textContent = slides.length;
          current.textContent = slideIndex;
        }
      }
        
      slidesField.style.width = 100 * slides.length + '%';
      slidesField.style.display = 'flex'; 
      slidesField.style.transition = '0.5s all';

      slidesWrapper.style.overflow = 'hidden';

      slides.forEach(slide => {
        slide.style.width = width;
      });

      slider.style.position = 'relative'; 
      const indicators = document.createElement('ol'), 
            dots = []; 
      indicators.classList.add('carousel-indicators'); 
      indicators.style.cssText = `
          position: absolute;
          right: 0;
          bottom: 0;
          left: 0;
          z-index: 15;
          display: flex;
          justify-content: center;
          margin-right: 15%;
          margin-left: 15%;
          list-style: none;
      `;
      slider.append(indicators); 

      for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1); 
        dot.style.cssText = `
          box-sizing: content-box;
          flex: 0 1 auto;
          width: 30px;
          height: 6px;
          margin-right: 3px;
          margin-left: 3px;
          cursor: pointer;
          background-color: #fff;
          background-clip: padding-box;
          border-top: 10px solid transparent;
          border-bottom: 10px solid transparent;
          opacity: .5;
          transition: opacity .6s ease;
        `;

        if( i == 0) {
          dot.style.opacity = 1;
        }
        indicators.append(dot); 
        dots.push(dot);
      }

      function activeDots() {
        dots.forEach(dot => {
          dot.style.opacity = '.5';
        });
        dots[slideIndex - 1].style.opacity = '1';
      }

      next.addEventListener('click', () => {
        if (offset == widthValue(width) * (slides.length - 1)){

        } else {

          offset += widthValue(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
          slideIndex = 1;
        } else {
          slideIndex ++;
        }

        sliderCountControl(slideIndex);
        activeDots(dots);
      });


      prev.addEventListener('click', () => {

        if (offset == 0){

          offset = widthValue(width) * (slides.length - 1); 
        } else {

          offset -= widthValue(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
          slideIndex = slides.length;
        } else {
          slideIndex --;
        }
        
        sliderCountControl(slideIndex);
        activeDots(dots);
      });

      dots.forEach(dot => {
        dot.addEventListener('click', (e)=>{
          const slideTo = e.target.getAttribute('data-slide-to');

          slideIndex = slideTo; 

          offset = widthValue(width) * (slideTo - 1);
          slidesField.style.transform = `translateX(-${offset}px)`; 
        sliderCountControl(slideIndex);
        activeDots(dots);

        });

      });

      sliderCountControl(); 

  }
  export default slider;
