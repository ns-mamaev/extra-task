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
       itemsAnimatedFromRight = document.querySelectorAll('[data-animation="from-right"]'),
       itemsAnimatedFromBottom = document.querySelectorAll('[data-animation="from-bottom"]');

  // функция добавляет класс с анимацией элементам. Принимает аргументами NodeList и название класса с анимацией.
  // Класс добавляется когда элемент при скроле пересекает область в 20% от нижней части экрана (скролл по Y + высота экрана * 0.70)
  // позиция элемента вычисляется: скролл по Y + смещение по Y элемента относительно верха окна браузера.

  const startAminationByScroll = function(items, animationClass) {
    let startPoint = window.scrollY + (window.innerHeight * 0.8);
    items.forEach(item => {
      let itemPositionY = item.getBoundingClientRect().top + window.scrollY;
      if (startPoint >= itemPositionY) {
        item.classList.add(animationClass);
      }
    });
  };

  //функция заменяющая хидер при скроле
  const titleScreen = document.querySelector('.title-screen'),
        header = document.querySelector('.header');

  const changeHeader = function() {
    if (window.scrollY >= titleScreen.offsetHeight) {
      header.classList.add('header_fixed');
    } else {
      header.classList.remove('header_fixed');
    }
  };

  // оживляем меню в хидере:
  //1 стандартные якоря через html не подходят, при переходе хидер будет накладываться на заголовок секции, нужен сдвиг
  //2 нужна подсветка того пункта где мы сейчас находимся
  //3 скрипт должен работать корректно с разным количеством пунктов меню

  const anchors = {};

  document.querySelectorAll('[data-nav]').forEach(el => {
    anchors[el.dataset.nav] = el.offsetTop;
  });


  const navLinks = document.querySelectorAll('.main-nav__link');

  navLinks.forEach(link => {
    link.addEventListener('click', evt => {
      evt.preventDefault();
      const anchorOffsetY = anchors[link.hash.slice(1,)];
      window.scrollTo(0, anchorOffsetY - header.offsetHeight);
    });
  });


  //скрываем все элементы, вызываем функцию

  hideItems(itemsAnimatedFromLeft);
  hideItems(itemsAnimatedFromRight);
  hideItems(itemsAnimatedFromBottom);

  // вызываем функцию, добавляющую анимацию, чтобы показать элементы на первом экране

  startAminationByScroll(itemsAnimatedFromLeft, 'animation-left');
  startAminationByScroll(itemsAnimatedFromRight, 'animation-right');
  startAminationByScroll(itemsAnimatedFromBottom, 'animation-bottom');
  changeHeader();

  document.addEventListener('scroll', () => {
    startAminationByScroll(itemsAnimatedFromLeft, 'animation-left');
    startAminationByScroll(itemsAnimatedFromRight, 'animation-right');
    startAminationByScroll(itemsAnimatedFromBottom, 'animation-bottom');
    changeHeader();
  });

});

