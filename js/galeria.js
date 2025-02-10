// Animación de carga progresiva para las tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.moment-card, .video-card');
    const heroVideo = document.getElementById('heroVideo');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => observer.observe(card));

    // Control de audio del video del hero
    const heroAudioButton = document.getElementById('heroAudioButton');
    if (heroAudioButton && heroVideo) {
        const audioIcon = heroAudioButton.querySelector('i');
        const audioText = heroAudioButton.querySelector('.button-text');

        heroAudioButton.addEventListener('click', () => {
            if (heroVideo.muted) {
                heroVideo.muted = false;
                audioIcon.classList.remove('fa-volume-mute');
                audioIcon.classList.add('fa-volume-up');
                audioText.textContent = 'Silenciar audio';
                heroAudioButton.classList.add('playing');
            } else {
                heroVideo.muted = true;
                audioIcon.classList.remove('fa-volume-up');
                audioIcon.classList.add('fa-volume-mute');
                audioText.textContent = 'Activar audio del intro';
                heroAudioButton.classList.remove('playing');
            }
        });
    }
}); 