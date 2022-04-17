//выполняем скрипт только после загрузки DOM, иначе мы можем повесить анимацию не на все нужные нам элементы
// (часть из них может быть не загружена в момент начала выполнения скрипта)

document.addEventListener('DOMContentLoaded', () => {


// функция ниже добавит всем элементам "скрытый" класс. нужно сначала скрыть все элементы,
// а потом показать их по мере скролла

  const hideItems = (items) => {
    items.forEach(item => {
      item.classList.add('hidden');
    });
  };

// создаем NodeList из элементов для каждого из типов анимаций, поиск ведем через data-атрибут

  const itemsAnimatedFromLeft = document.querySelectorAll('[data-animation="from-left"]'),
       itemsAnimatedFromRight = document.querySelectorAll('[data-animation="from-right"]');

  // функция добавляет класс с анимацией элементам. Принимает аргументами NodeList и название класса с анимацией.
  // Класс добавляется когда элемент при скроле пересекает область в 25% от нижней части экрана (скролл по Y + высота экрана * 0.70)
  // позиция элемента вычисляется: скролл по Y + смещение по Y элемента относительно верха окна браузера.

  const startAminationByScroll = function(items, animationClass) {
    let startPoint = window.scrollY + (window.innerHeight * 0.75);
    items.forEach(item => {
      let itemPositionY = item.getBoundingClientRect().top + window.scrollY;
      if (startPoint >= itemPositionY) {
        item.classList.add(animationClass);
      }
    });
  };

  //функция заменяющая хидер при скроле
  const header = document.querySelector('.header'),
        headerTop = header.querySelector('.header__top');

  const changeHeader = function() {
    if (window.scrollY >= header.offsetHeight) {
      headerTop.classList.add('header__top_fixed');
    } else {
      headerTop.classList.remove('header__top_fixed');
    }
  };

  //скрываем все элементы, вызываем функцию

  hideItems(itemsAnimatedFromLeft);
  hideItems(itemsAnimatedFromRight);

  // вызываем функцию, добавляющую анимацию, чтобы показать элементы на первом экране

  startAminationByScroll(itemsAnimatedFromLeft, 'animation-left');
  startAminationByScroll(itemsAnimatedFromRight, 'animation-right');
  changeHeader();

  // вызываем функцию, добавляющую анимацию при событии скролла

  document.addEventListener('scroll', () => {
    startAminationByScroll(itemsAnimatedFromLeft, 'animation-left');
    startAminationByScroll(itemsAnimatedFromRight, 'animation-right');
    changeHeader();
    console.log(header.offsetHeight);
    console.log(window.scrollY);
  });




});
