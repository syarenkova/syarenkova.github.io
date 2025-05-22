function updateCountdown() {
    const date = new Date('2025-05-23T23:59:59');
    const now = new Date();
    const difference = date - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    const countdownElement = document.querySelector('.countdown-display');
    if (countdownElement) {
        if (difference > 0) {
            countdownElement.innerHTML = `
                <div class="countdown-numbers">
                    <div class="countdown-item">
                        <span>${days}</span>
                        <div class="countdown-label">дней</div>
                    </div>
                    <div class="countdown-item">
                        <span>${hours}</span>
                        <div class="countdown-label">часов</div>
                    </div>
                    <div class="countdown-item">
                        <span>${minutes}</span>
                        <div class="countdown-label">минут</div>
                    </div>
                    <div class="countdown-item">
                        <span>${seconds}</span>
                        <div class="countdown-label">секунд</div>
                    </div>
                </div>
            `;
        } else {
            countdownElement.innerHTML = '<span>поминки</span>';
        }
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();