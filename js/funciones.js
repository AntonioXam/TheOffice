// Inicialización de animaciones al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

// Reproducción de audio/video sincronizada
function syncMediaWithAnimation(mediaElement, animationElement) {
    mediaElement.addEventListener('timeupdate', () => {
        // Aquí irá la lógica de sincronización
    });
}

// Animación para reproducción de video
const videoPlayer = document.querySelector('video');
if (videoPlayer) {
    videoPlayer.addEventListener('play', () => {
        const nearbyElements = videoPlayer.parentElement.querySelectorAll('.animate-on-scroll');
        nearbyElements.forEach(element => {
            element.classList.add('slide-in');
        });
    });
}

// Animación para audio
const audioPlayers = document.querySelectorAll('audio');
audioPlayers.forEach(audio => {
    audio.addEventListener('play', () => {
        const playerContainer = audio.closest('.audio-player');
        playerContainer.style.transform = 'scale(1.02)';
    });
    
    audio.addEventListener('pause', () => {
        const playerContainer = audio.closest('.audio-player');
        playerContainer.style.transform = 'scale(1)';
    });
});

// Mejorar el detector de scroll con nuevas animaciones
const scrollAnimations = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            // Alternar entre diferentes animaciones
            if (index % 3 === 0) {
                element.classList.add('bounce-in');
            } else if (index % 3 === 1) {
                element.classList.add('rotate-in');
            } else {
                element.classList.add('slide-in');
            }
        }
    });
};

window.addEventListener('scroll', scrollAnimations);

// Funcionalidad del modal de imágenes
document.querySelectorAll('.gallery-item img').forEach(image => {
    image.addEventListener('click', () => {
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImage');
        modalImg.src = image.src;
        new bootstrap.Modal(modal).show();
    });
});

// Filtros de galería
document.querySelectorAll('[data-filter]').forEach(button => {
    button.addEventListener('click', e => {
        const filter = e.target.dataset.filter;
        const items = document.querySelectorAll('.gallery-item');
        
        document.querySelector('.btn-group .active').classList.remove('active');
        e.target.classList.add('active');

        items.forEach(item => {
            if (filter === 'all' || item.dataset.category === filter) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Lazy loading de imágenes
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// Datos de las temporadas
const seasons = [
    {
        number: 1,
        episodes: "6 episodios",
        year: "2005",
        description: "La primera temporada introduce a Michael Scott y el equipo de Dunder Mifflin Scranton.",
        image: "assets/images/T1.jpg"
    },
    {
        number: 2,
        episodes: "22 episodios",
        year: "2005-2006",
        description: "La tensión romántica entre Jim y Pam crece mientras ella planea su boda con Roy. Michael comienza una relación con su jefa Jan Levinson.",
        image: "assets/images/T2.jpg"
    },
    {
        number: 3,
        episodes: "25 episodios",
        year: "2006-2007",
        description: "Jim regresa de Stamford junto con nuevos personajes como Andy Bernard. Pam explora su independencia después de cancelar su boda.",
        image: "assets/images/T3.jpg"
    },
    {
        number: 4,
        episodes: "19 episodios",
        year: "2007-2008",
        description: "Jim y Pam finalmente están juntos, Ryan asciende a ejecutivo corporativo, y la relación entre Michael y Jan alcanza nuevos niveles de disfunción.",
        image: "assets/images/T4.jpg"
    },
    {
        number: 5,
        episodes: "28 episodios",
        year: "2008-2009",
        description: "Michael forma su propia compañía de papel antes de regresar a Dunder Mifflin. Jim y Pam se comprometen.",
        image: "assets/images/T5.jpg"
    },
    {
        number: 6,
        episodes: "26 episodios",
        year: "2009-2010",
        description: "Jim y Pam celebran su boda y esperan su primer hijo. Dunder Mifflin es comprada por Sabre.",
        image: "assets/images/T6.jpg"
    },
    {
        number: 7,
        episodes: "26 episodios",
        year: "2010-2011",
        description: "La última temporada de Michael Scott como gerente regional. Michael encuentra el amor verdadero con Holly y decide mudarse a Colorado.",
        image: "assets/images/T7.jpg"
    },
    {
        number: 8,
        episodes: "24 episodios",
        year: "2011-2012",
        description: "Andy Bernard asume el papel de gerente regional, mientras que Robert California se convierte en el nuevo CEO.",
        image: "assets/images/T8.jpg"
    },
    {
        number: 9,
        episodes: "25 episodios",
        year: "2012-2013",
        description: "La temporada final revela al equipo documental. Dwight finalmente logra su sueño de ser gerente y se casa con Angela.",
        image: "assets/images/T9.jpg"
    }
];

// Configuración del carrusel
class SeasonWheel {
    constructor() {
        this.container = document.querySelector('.season-wheel');
        this.currentIndex = 0;
        this.totalSeasons = seasons.length;
        this.init();
    }

    init() {
        this.createSeasons();
        this.setupControls();
        this.updatePositions();
    }

    createSeasons() {
        seasons.forEach((season, index) => {
            const div = document.createElement('div');
            div.className = `season-item ${index === 0 ? 'active' : ''}`;
            div.innerHTML = `
                <div class="season-content">
                    <img src="${season.image}" alt="Temporada ${season.number}">
                    <h3>Temporada ${season.number}</h3>
                    <p class="text-muted">${season.episodes} - ${season.year}</p>
                    <p>${season.description}</p>
                </div>
            `;
            this.container.appendChild(div);
        });
    }

    setupControls() {
        document.getElementById('prevSeason').addEventListener('click', () => this.rotate(-1));
        document.getElementById('nextSeason').addEventListener('click', () => this.rotate(1));
    }

    rotate(direction) {
        this.currentIndex = (this.currentIndex + direction + this.totalSeasons) % this.totalSeasons;
        this.updatePositions();
    }

    updatePositions() {
        const items = document.querySelectorAll('.season-item');
        items.forEach((item, index) => {
            const diff = (index - this.currentIndex + this.totalSeasons) % this.totalSeasons;
            const angle = (360 / this.totalSeasons) * diff;
            const scale = index === this.currentIndex ? 1 : 0.7;
            const zIndex = index === this.currentIndex ? 2 : 1;
            
            item.style.transform = `
                translate(-50%, -50%) 
                rotate(${angle}deg) 
                translateY(-250px) 
                rotate(-${angle}deg)
                scale(${scale})
            `;
            item.style.zIndex = zIndex;
            item.classList.toggle('active', index === this.currentIndex);
        });
    }
}

// Inicializar el carrusel cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new SeasonWheel();
});

// Animación de aparición para las temporadas
const observerOptions = {
    threshold: 0.2
};

const seasonObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.season-container').forEach(season => {
    seasonObserver.observe(season);
});

/* Animación de aparición para las tarjetas de temporada */
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // Animar elementos del hero
    setTimeout(() => {
        document.querySelectorAll('.hero-section h1, .hero-section p').forEach(el => {
            el.classList.add('active');
        });
    }, 100);

    // Función para animar elementos cuando son visibles
    function animateOnScroll() {
        const elements = document.querySelectorAll(`
            .animate-fade-up, 
            .animate-fade-scale, 
            .seasons .card,
            .synopsis,
            .synopsis img,
            .synopsis-content,
            .stat-box,
            .seasons h2
        `);
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 50 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }

    // Animar elementos iniciales
    function animateInitialElements() {
        const synopsis = document.querySelector('.synopsis');
        const synopsisImg = document.querySelector('.synopsis img');
        const synopsisContent = document.querySelector('.synopsis-content');
        const statBoxes = document.querySelectorAll('.stat-box');
        const seasonsTitle = document.querySelector('.seasons h2');

        if (synopsis) synopsis.classList.add('active');
        if (synopsisImg) synopsisImg.classList.add('active');
        if (synopsisContent) synopsisContent.classList.add('active');
        if (seasonsTitle) seasonsTitle.classList.add('active');
        
        statBoxes.forEach((box, index) => {
            setTimeout(() => {
                box.classList.add('active');
            }, 600 + (index * 200));
        });
    }

    // Animar cards de temporadas en secuencia
    function animateSeasonCards() {
        const cards = document.querySelectorAll('.seasons .card');
        
        // Primero ocultamos todas las cards
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'perspective(1000px) rotateY(45deg) scale(0.8)';
        });

        // Luego las animamos en secuencia
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                card.classList.add('active');
            }, 100 + (index * 200)); // Más tiempo entre cada card
        });
    }

    // Función para reiniciar animaciones cuando las cards vuelven a estar en vista
    function checkSeasonCardsVisibility() {
        const cards = document.querySelectorAll('.seasons .card');
        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight && rect.bottom >= 0);
            
            if (isVisible && !card.classList.contains('active')) {
                setTimeout(() => {
                    card.classList.add('active');
                }, index * 200);
            }
        });
    }

    // Asegurar que las imágenes estén cargadas antes de animar
    window.addEventListener('load', () => {
        animateInitialElements();
        animateSeasonCards();
        animateOnScroll();
    });

    // Animar elementos al hacer scroll
    window.addEventListener('scroll', () => {
        animateOnScroll();
    });

    // Añadir el listener para el scroll
    window.addEventListener('scroll', checkSeasonCardsVisibility);
});

// Función para animar el hero
function animateHero() {
    const heroTitle = document.querySelector('.hero-section h1');
    const heroText = document.querySelector('.hero-section p');
    
    // Primero removemos las clases active
    heroTitle.classList.remove('active');
    heroText.classList.remove('active');
    
    // Forzamos un reflow para reiniciar las animaciones
    void heroTitle.offsetWidth;
    void heroText.offsetWidth;
    
    // Volvemos a añadir las clases active
    heroTitle.classList.add('active');
    heroText.classList.add('active');
}

// Añadir el evento click al hero
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.addEventListener('click', animateHero);
        // Animación inicial
        animateHero();
    }
});

// Manejo del scroll de la barra de navegación
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    const heroSection = document.querySelector('.hero-section');
    const heroHeight = heroSection.offsetHeight;

    if (scrollPosition > 50) { // Reducido el umbral para una respuesta más rápida
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Asegurar que el evento scroll se maneje correctamente
document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', handleNavbarScroll, { passive: true }); // Añadido passive para mejor rendimiento
    handleNavbarScroll(); // Comprobar estado inicial
});

// Inicialización de las animaciones de la barra de navegación
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    const navItems = document.querySelectorAll('.nav-item');
    const navBrand = document.querySelector('.navbar-brand');

    // Resetear las animaciones
    navbar.style.animation = 'none';
    navBrand.style.animation = 'none';
    navItems.forEach(item => {
        item.style.animation = 'none';
    });

    // Forzar reflow
    void navbar.offsetWidth;

    // Reiniciar animaciones
    navbar.style.animation = '';
    navBrand.style.animation = '';
    navItems.forEach(item => {
        item.style.animation = '';
    });
}

// Añadir al DOMContentLoaded existente
document.addEventListener('DOMContentLoaded', function() {
    initNavbarAnimations();
    // ... resto del código existente
});

// Lazy loading y animación de las tarjetas de personajes
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.character-card');
    const imageContainers = document.querySelectorAll('.image-flip');
    
    // Observador para las tarjetas
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Cargar las imágenes cuando la tarjeta sea visible
                const frontImage = entry.target.querySelector('.front-image');
                const backImage = entry.target.querySelector('.back-image');
                
                if (frontImage.dataset.src) {
                    frontImage.src = frontImage.dataset.src;
                    frontImage.addEventListener('load', () => {
                        frontImage.classList.add('loaded');
                        frontImage.removeAttribute('data-src');
                    });
                }
                
                if (backImage.dataset.src) {
                    backImage.src = backImage.dataset.src;
                    backImage.addEventListener('load', () => {
                        backImage.classList.add('loaded');
                        backImage.removeAttribute('data-src');
                    });
                }
                
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    // Añadir clase loading y observar cada tarjeta
    cards.forEach(card => {
        const imageContainer = card.querySelector('.image-flip');
        imageContainer.classList.add('loading');
        cardObserver.observe(card);
    });
});

// Añadir al código existente
document.addEventListener('DOMContentLoaded', function() {
    // Animación para las tarjetas de recomendación
    const recommendationCards = document.querySelectorAll('.recommendation-card');
    
    const recommendationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                recommendationObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });
    
    recommendationCards.forEach(card => {
        recommendationObserver.observe(card);
    });
});

// Añadir al código existente
document.addEventListener('DOMContentLoaded', function() {
    const heroVideo = document.getElementById('heroVideo');
    
    if (heroVideo) {
        heroVideo.addEventListener('error', function(e) {
            console.error('Error loading video:', e);
            // Fallback a una imagen si el video falla
            heroVideo.parentElement.style.backgroundImage = "url('assets/images/galeria-hero.jpg')";
        });

        // Verificar si el video se está reproduciendo
        heroVideo.addEventListener('playing', function() {
            console.log('Video is playing');
        });
    }
});

// Control del audio tema - Versión mejorada
document.addEventListener('DOMContentLoaded', function() {
    const themeButton = document.getElementById('themeButton');
    const themeAudio = document.getElementById('themeAudio');
    
    if (themeButton && themeAudio) {
        const icon = themeButton.querySelector('i');
        const buttonText = themeButton.querySelector('.button-text');

        // Precargar el audio
        themeAudio.load();

        // Manejar el clic en el botón
        themeButton.addEventListener('click', function() {
            // Promesa para reproducir el audio
            const playPromise = themeAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // Reproducción exitosa
                    if (themeAudio.paused) {
                        themeAudio.play();
                        icon.classList.remove('fa-play');
                        icon.classList.add('fa-pause');
                        buttonText.textContent = 'Pausar tema musical';
                        themeButton.classList.add('playing');
                    } else {
                        themeAudio.pause();
                        icon.classList.remove('fa-pause');
                        icon.classList.add('fa-play');
                        buttonText.textContent = 'Iniciar tema musical';
                        themeButton.classList.remove('playing');
                    }
                })
                .catch(error => {
                    // Error en la reproducción
                    console.error('Error al reproducir el audio:', error);
                    // Mostrar mensaje al usuario
                    alert('No se pudo reproducir el audio. Por favor, inténtalo de nuevo.');
                });
            }
        });

        // Manejar cuando el audio termina
        themeAudio.addEventListener('ended', function() {
            icon.classList.remove('fa-pause');
            icon.classList.add('fa-play');
            buttonText.textContent = 'Iniciar tema musical';
            themeButton.classList.remove('playing');
        });

        // Manejar errores de carga del audio
        themeAudio.addEventListener('error', function(e) {
            console.error('Error al cargar el audio:', e);
            themeButton.disabled = true;
            buttonText.textContent = 'Audio no disponible';
            icon.classList.remove('fa-play', 'fa-pause');
            icon.classList.add('fa-exclamation-triangle');
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Configuración del observador
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Crear el observador
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const delay = element.dataset.delay || 0;
                
                setTimeout(() => {
                    element.classList.add('active');
                }, delay);

                // Dejar de observar después de la animación
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observar todos los elementos con la clase animate-fade-up
    document.querySelectorAll('.animate-fade-up').forEach(element => {
        observer.observe(element);
    });
});

// Observador de intersección para animaciones al hacer scroll
const observer = new IntersectionObserver((entries) => {
    /* ... */
});
