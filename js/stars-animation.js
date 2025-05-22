class StarsAnimation {
    constructor() {
      this.stars = [];
      this.createStars();
      this.initAnimation();
    }
  
    createStars() {
      const profileWrapper = document.querySelector('.profile-wrapper');
      const starCount = 8;
      const starsContainer = document.createElement('div');
      starsContainer.className = 'stars-container';
      profileWrapper.appendChild(starsContainer);
  
      const centerOffsetX = -1.8;
      const centerOffsetY = -2.2;
  
      for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'animated-star';
        
        star.innerHTML = `
          <svg viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.5 0L31.4 18.4L50.4 18.4L35 29.8L40.9 48.1L25.5 36.7L10.1 48.1L16 29.8L0.6 18.4L19.6 18.4L25.5 0Z" 
                  fill="currentColor"/>
          </svg>
        `;
        
        const angle = (i / starCount) * Math.PI * 2;
        const radius = profileWrapper.offsetWidth * 0.55;
  
        star.style.left = `${50 + centerOffsetX + (Math.cos(angle) * 50)}%`;
        star.style.top = `${50 + centerOffsetY + (Math.sin(angle) * 50)}%`;
        
        starsContainer.appendChild(star);
        this.stars.push({
          element: star,
          direction: i % 2 === 0 ? 1 : -1
        });
      }
    }
  
    initAnimation() {
        const profileWrapper = document.querySelector('.profile-wrapper');
        const self = this;
        
        function handleMouseEnter() {
          for (let i = 0; i < self.stars.length; i++) {
            const star = self.stars[i];
            star.element.style.transform = 'rotate(' + (360 * star.direction) + 'deg)';
          }
        }
        
        function handleMouseLeave() {
          for (let i = 0; i < self.stars.length; i++) {
            const star = self.stars[i];
            star.element.style.transform = 'rotate(0deg)';
          }
        }
        
        profileWrapper.addEventListener('mouseenter', handleMouseEnter);
        profileWrapper.addEventListener('mouseleave', handleMouseLeave);
      }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    new StarsAnimation();
  });