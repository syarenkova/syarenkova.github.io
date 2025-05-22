class WelcomePopup {
    constructor() {
        if (!localStorage.getItem('welcomePopupClosed')) {
            setTimeout(() => this.showPopup(), 3000);
        }
    }

    showPopup() {
        if (localStorage.getItem('welcomePopupClosed')) return;

        const popup = document.createElement('div');
        popup.className = 'welcome-popup';
        popup.innerHTML = `
            <div class="welcome-popup-content">
                <button class="welcome-close">&times;</button>
                <h2>Welcome to my portfolio!</h2>
                <p>I want to present project in time so bad &#128546;</p>
            </div>
        `;

        document.body.appendChild(popup);

        const closeBtn = popup.querySelector('.welcome-close');
        
        closeBtn.addEventListener('click', () => this.closePopup(popup));


        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                this.closePopup(popup);
            }
        });

        setTimeout(() => popup.classList.add('active'), 100);
    }

    closePopup(popup) {
        popup.remove();
        localStorage.setItem('welcomePopupClosed', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WelcomePopup();
});