// табы

function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
   const tabs = document.querySelectorAll(tabsSelector), //('.tabheader__item')
      tabsContent = document.querySelectorAll(tabsContentSelector), //('.tabcontent')
      tabsParent = document.querySelector(tabsParentSelector); //('.tabheader__items')

      function hideTabContent(params) {
        tabsContent.forEach(item => {
          item.classList.add('hide');
          item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
          item.classList.remove(activeClass);//('tabheader__item_active')
        });
      } 
      
      function showTabcontent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add(activeClass);//('tabheader__item_active')
      }

    hideTabContent();
    showTabcontent();

    tabsParent.addEventListener('click', (event) => {
    const target = event.target;

    if(target && target.classList.contains(tabsSelector.slice(1))) {
      //target.classList.contains('.tabheader__item')) замена на target.classList.contains(tabsSelector.slice(1))). Слайс для того, чтобы убрать точку т.к. использую .classList.contains, а точка даст ошибку

      tabs.forEach((item, i) => {
        if (target == item) {
            hideTabContent();
            showTabcontent(i);
        }
      });
    }
  });
}

export default tabs;