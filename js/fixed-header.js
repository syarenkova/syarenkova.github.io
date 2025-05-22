function checkScroll() {
    var header = document.querySelector('header');
    var mainScreen = document.querySelector('.main-screen');
    var mainScreenHeight = mainScreen.offsetHeight;
    
    if (window.scrollY > mainScreenHeight) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }
  }

window.addEventListener('scroll', checkScroll);