   // modal

   function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

    function openModal(modalSelector, modalTimerId) {
      //modalTimerId буду передавать во всех функция где применяется openModal, потому будет запускться очистка таймера, чтобы он не срабывал кажый интервал времени и так же нужно его передать в form.js чтобы там при вызове мобадьного окна со статусом успешно или не успешно отрпавлено сообзение обнуляло таймер, чтобы он не начл работать
      const modal = document.querySelector(modalSelector);

      modal.classList.add('show');
      modal.classList.remove('hide');
      document.body.style.overflow = 'hidden';

      console.log(modalTimerId);
      // проверяю, а установден ли вообще таймер т.е. он в себе должен содержать что он запускает и через какое время
      if (modalTimerId) {
        clearInterval(modalTimerId);
      }
      
    }

// чтобы жёстко не привязывать классы и дата атрбибуты, бо иначе из-за модульности вылазят ошибки в консоли, чтобы это исправить я их буду передавать в качестве аргументов triggerSelector = '[data-modal]', modalSelector = '.modal'

   function modal(triggerSelector, modalSelector, modalTimerId) {
    //const button =  document.querySelectorAll('[data-modal]');
    const button =  document.querySelectorAll(triggerSelector); // быьло так const button =  document.querySelectorAll('[data-modal]');
   

    
     //openModal и colseModalWindow будут ориентироваться на то модальное окно, которое попало в переменную с '.modal'
     modal = document.querySelector(modalSelector); // было так const modalWindow = document.querySelector('.modal'); подальное окно я буду передавать в script.js  modal ('[data-modal]', '.modal'); И жу переменную вставлю в function openModal(modalSelector) и  function colseModalWindow(modalSelector), чтобы они риантровались на текущее модальное окно, что попало в переменную. Так же аргумент modalSelector надо предать во все случаи где я вызываю открытие и закрытие окна 


      button.forEach(function(element) {
        element.addEventListener('click', () => openModal(modalSelector, modalTimerId)); // чтобы функция колбэка работало кореектно т.е. после клика, а не сразу после загруки страницы надо прописать её так () => openModal(modalSelector). Т.е я таким обзаом внутрь функции коллбеэ помещаю функцию вызова модального окна. Тут написан сокращенны вид
      });

      modal.addEventListener('click', (e)=>{
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
          closeModal(modalSelector);
        }
      });


      document.addEventListener('keydown', (e) => {
        if (e.code === 'Escape' && modal.classList.contains('show')) {
        
          closeModal(modalSelector);
        }
      });

   
      // const modalTimerId = setTimeout(openModal, 50000); это мне уже не надо т.к. запускай таймер буду в script.js где и буду назначать емё время

      function showModalByScroll(params) {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1 ) { 
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll',showModalByScroll); 
        }
      }
      window.addEventListener('scroll',showModalByScroll)

   }

export default modal;

// а вызов модального окна экспортирую в forms.js таи их импртирую
export{closeModal}; // можно и так  export {colseModalWindow , openModal}
export{openModal};
    