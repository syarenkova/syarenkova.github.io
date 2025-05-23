class WelcomePopup {
    // пришлось убрать проверку, не был ли попап закрыт пользователем, потому что проверять работоспособность таким образом тяжко
    // ну и не 30 секунд, а 10
    constructor() {
        setTimeout(() => this.showPopup(), 10000);

        /*if (!localStorage.getItem('welcomePopupClosed')) {
            setTimeout(() => this.showPopup(), 30000);
        }*/
    }

    showPopup() {
        //if (localStorage.getItem('welcomePopupClosed')) return;

        const popup = document.createElement('div');
        popup.className = 'welcome-popup';
        popup.innerHTML = `
            <div class="welcome-popup-content">
                <button class="welcome-close">&times;</button>
                <h2>welcome to my portfolio!</h2>
                <p>i really really want to present the project on time. &#128546 hope you like it!</p>
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
        // localStorage.setItem('welcomePopupClosed', 'true');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WelcomePopup();
});