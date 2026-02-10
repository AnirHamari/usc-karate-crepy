// Carousel JavaScript - Gestion du carrousel d'actualités sur la page d'accueil

document.addEventListener('DOMContentLoaded', function () {
    initCarousel();
});

function initCarousel() {
    const carouselContainer = document.getElementById('news-carousel');
    if (!carouselContainer) return;

    // Récupérer les données du carrousel depuis le localStorage
    const carouselData = JSON.parse(localStorage.getItem('carouselData') || '[]');

    // Si pas de données, afficher un message par défaut
    if (carouselData.length === 0) {
        carouselContainer.innerHTML = `
            <div class="carousel-slide active">
                <div class="carousel-content">
                    <div class="carousel-text">
                        <h3>Bienvenue sur le site de l'USC Karaté Crépy</h3>
                        <p>Configurez vos actualités depuis la page d'administration</p>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // Créer les slides du carrousel
    let slidesHTML = '';
    carouselData.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        slidesHTML += `
            <div class="carousel-slide ${activeClass}" style="background: linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('${item.image}'); background-size: cover; background-position: center;">
                <div class="carousel-content">
                    <div class="carousel-text">
                        <h3>${item.title}</h3>
                        <p>${item.description}</p>
                    </div>
                </div>
            </div>
        `;
    });

    // Ajouter les indicateurs
    let indicatorsHTML = '<div class="carousel-indicators">';
    carouselData.forEach((item, index) => {
        const activeClass = index === 0 ? 'active' : '';
        indicatorsHTML += `<span class="indicator ${activeClass}" data-slide="${index}"></span>`;
    });
    indicatorsHTML += '</div>';

    // Ajouter les boutons de navigation
    const navigationHTML = `
        <button class="carousel-nav prev" onclick="changeSlide(-1)">❮</button>
        <button class="carousel-nav next" onclick="changeSlide(1)">❯</button>
    `;

    carouselContainer.innerHTML = slidesHTML + indicatorsHTML + navigationHTML;

    // Démarrer le défilement automatique (6 secondes)
    startAutoSlide();

    // Ajouter les événements aux indicateurs
    document.querySelectorAll('.indicator').forEach(indicator => {
        indicator.addEventListener('click', function () {
            const slideIndex = parseInt(this.getAttribute('data-slide'));
            goToSlide(slideIndex);
        });
    });
}

let currentSlide = 0;
let autoSlideInterval;

function changeSlide(direction) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Retirer la classe active de la slide actuelle
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Calculer la nouvelle slide
    currentSlide = (currentSlide + direction + slides.length) % slides.length;

    // Ajouter la classe active à la nouvelle slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Réinitialiser le timer auto
    resetAutoSlide();
}

function goToSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll('.indicator');

    if (slides.length === 0) return;

    // Retirer la classe active
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Aller à la slide demandée
    currentSlide = index;

    // Ajouter la classe active
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Réinitialiser le timer auto
    resetAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        changeSlide(1);
    }, 6000); // 6 secondes
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Arrêter le défilement automatique quand l'utilisateur survole le carrousel
document.addEventListener('DOMContentLoaded', function () {
    const carousel = document.getElementById('news-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoSlideInterval);
        });

        carousel.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});
