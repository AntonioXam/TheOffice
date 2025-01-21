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

    // Reproductor de video mejorado con controles personalizados
    const videos = document.querySelectorAll('.video-wrapper video');
    videos.forEach(video => {
        const wrapper = video.parentElement;
        
        // Añadir overlay con controles personalizados
        const overlay = document.createElement('div');
        overlay.className = 'video-overlay';
        overlay.innerHTML = `
            <button class="play-btn">
                <i class="fas fa-play"></i>
            </button>
            <div class="video-progress">
                <div class="progress-bar"></div>
            </div>
        `;
        wrapper.appendChild(overlay);

        // Manejar reproducción
        const playBtn = overlay.querySelector('.play-btn');
        const progressBar = overlay.querySelector('.progress-bar');

        playBtn.addEventListener('click', () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        // Actualización de la barra de progreso del video
        video.addEventListener('timeupdate', () => {
            const progress = (video.currentTime / video.duration) * 100;
            progressBar.style.width = `${progress}%`;
        });
    });

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