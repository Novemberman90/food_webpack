    import {closeModal, openModal} from "./modal";
    import {postData} from "../servises/servises";
    
    // Forms
    function forms(formsSelector,modalTimerId) {
    const  forms = document.querySelectorAll(formsSelector);

    const message = {
      loading: 'img/spinner.svg',
      success: 'Спасибо! Скоро мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
      bindPostData(item); 
    });

  /*   вынесено в servises
  const postData = async (url, data) => { 
      let res = await fetch(url, { 
          method: "POST",  
          headers: { 
          'Content-type': 'application/json'
          },
          body: data, 
      });

      return await res.json(); 

    }; */


    function bindPostData(form) { 
      form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('img'); 
        statusMessage.src = message.loading; 
        statusMessage.style.cssText = `
        display: block;
        margin: 0 auto `;
        form.insertAdjacentElement('afterend', statusMessage);

        const formData = new FormData(form);
    
        const json = JSON.stringify(Object.fromEntries(formData.entries())); 
        postData('http://localhost:3000/requests', json).then(data => {
            console.log(data); 
            showThanksModal(message.success);
            statusMessage.remove(); 
        }).catch(()=>{
          showThanksModal(message.failure);
        }).finally(()=>{
          form.reset();
        });
      });
    }

    // Создаю дополнительное окно типа благорадности за отправку формы 

    function showThanksModal(message) { // в аргументы передаю объект message где находятся сообщения и мне нужно всеголишь выбрать нужное
      const prevModalDialog = document.querySelector('.modal__dialog');

      /* Прячу текущее */
       prevModalDialog.classList.add('hide'); // этот клас есть у меня в стилх
      openModal('.modal', modalTimerId);// передаю класс окна которе нужно ткрыть

      /* Создаю новое и присваеваю ему класс  modal__dialog */
      const thanksModal =  document.createElement('div');
      thanksModal.classList.add('modal__dialog');

      /* Тперь надо сформировать вёрстку */
      thanksModal.innerHTML = `
          <div class="modal__content">
              <div class="modal__close" data-close>×</div>
              <div class="modal__title">${message}</div>
          </div>
        `;

      // и указываю куда его добавляю
      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
        thanksModal.remove();
        prevModalDialog.classList.add('show');
        prevModalDialog.classList.remove('hide');
        closeModal('.modal'); // передаю текущее окно с классом кторые нужно закрыть
      }, 4000);
    }

  }
   
    export default forms;