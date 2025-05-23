class WelcomePopup {
    constructor() {
        if (!this.getCookie('welcomePopupClosed')) {
            setTimeout(() => this.showPopup(), 30000);
        }
    }

    showPopup() {
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
        this.setCookie('welcomePopupClosed', 'true', 2);
    }

    setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }

    getCookie(name) {
        const name = name + "=";
        const cookies_array = document.cookie.split(';');
        for (let i = 0; i < cookies_array.length; i++) {
            let cookie = cookies_array[i];
            while (cookie.charAt(0) === ' ') cookie = cookie.substring(1);
            if (cookie.indexOf(name) === 0) return cookie.substring(name.length);
        }
        return null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new WelcomePopup();
});