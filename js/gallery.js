class Gallery {
    constructor() {
        this.galleryItems = document.querySelectorAll('.gallery-item img');
        this.popup = document.querySelector('.gallery-popup');
        this.popupImage = document.querySelector('.popup-image');
        this.closeBtn = document.querySelector('.gallery-close');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        
        this.imageUrls = Array.from(this.galleryItems).map(img => img.src);
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                this.currentIndex = index;
                this.updatePopupImage();
                this.popup.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });

        this.closeBtn.addEventListener('click', () => this.closePopup());
        this.prevBtn.addEventListener('click', () => this.showPrevImage());
        this.nextBtn.addEventListener('click', () => this.showNextImage());
        
        this.popup.addEventListener('click', (e) => {
            if (e.target === this.popup) {
                this.closePopup();
            }
        });
    }

    updatePopupImage() {
        this.popupImage.src = this.imageUrls[this.currentIndex];
        this.popupImage.alt = this.galleryItems[this.currentIndex].alt;

        this.prevBtn.disabled = this.currentIndex === 0;
        this.nextBtn.disabled = this.currentIndex === this.imageUrls.length - 1;
    }

    showPrevImage() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updatePopupImage();
        }
    }

    showNextImage() {
        if (this.currentIndex < this.imageUrls.length - 1) {
            this.currentIndex++;
            this.updatePopupImage();
        }
    }

    closePopup() {
        this.popup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Gallery();
}); 