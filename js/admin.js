// Admin JavaScript - Gestion du contenu du site

// ========== CARROUSEL D'ACTUALITÉS ==========
function saveCarousel() {
    const carouselData = [];

    // Récupérer les données des 3 images
    for (let i = 1; i <= 3; i++) {
        const image = document.getElementById(`carousel${i}_image`).value;
        const title = document.getElementById(`carousel${i}_title`).value;
        const description = document.getElementById(`carousel${i}_description`).value;

        // Ajouter seulement si au moins l'image est renseignée
        if (image.trim() !== '') {
            carouselData.push({
                image: image,
                title: title,
                description: description
            });
        }
    }

    // Sauvegarder dans le localStorage
    localStorage.setItem('carouselData', JSON.stringify(carouselData));
    showSuccessMessage();
}

function loadCarouselData() {
    const carouselData = JSON.parse(localStorage.getItem('carouselData') || '[]');

    carouselData.forEach((item, index) => {
        const i = index + 1;
        if (i <= 3) {
            document.getElementById(`carousel${i}_image`).value = item.image || '';
            document.getElementById(`carousel${i}_title`).value = item.title || '';
            document.getElementById(`carousel${i}_description`).value = item.description || '';
        }
    });
}

// ========== HORAIRES D'ENTRAÎNEMENT ==========
function saveTrainingSchedule() {
    const schedule = document.getElementById('training_schedule').value;
    localStorage.setItem('trainingSchedule', schedule);
    showSuccessMessage();
}

function loadTrainingSchedule() {
    const schedule = localStorage.getItem('trainingSchedule') || '';
    document.getElementById('training_schedule').value = schedule;
}

// ========== COORDONNÉES DE CONTACT ==========
function saveContact() {
    const contactData = {
        email: document.getElementById('contact_email').value,
        phone: document.getElementById('contact_phone').value,
        address: document.getElementById('contact_address').value
    };

    localStorage.setItem('contactData', JSON.stringify(contactData));
    showSuccessMessage();
}

function loadContact() {
    const contactData = JSON.parse(localStorage.getItem('contactData') || '{}');

    document.getElementById('contact_email').value = contactData.email || '';
    document.getElementById('contact_phone').value = contactData.phone || '';
    document.getElementById('contact_address').value = contactData.address || '';
}

// ========== ACTUALITÉS/ANNONCES ==========
function saveNews() {
    const announcement = document.getElementById('news_announcement').value;
    localStorage.setItem('newsAnnouncement', announcement);
    showSuccessMessage();
}

function loadNews() {
    const announcement = localStorage.getItem('newsAnnouncement') || '';
    document.getElementById('news_announcement').value = announcement;
}

// ========== RÉSULTATS DE COMPÉTITIONS ==========
function saveCompetitionResults() {
    const results = document.getElementById('competition_results').value;
    localStorage.setItem('competitionResults', results);
    showSuccessMessage();
}

function loadCompetitionResults() {
    const results = localStorage.getItem('competitionResults') || '';
    document.getElementById('competition_results').value = results;
}

// ========== UTILITAIRES ==========
function showSuccessMessage() {
    const message = document.getElementById('successMessage');
    message.style.display = 'block';

    // Faire défiler vers le haut pour voir le message
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Masquer après 3 secondes
    setTimeout(() => {
        message.style.display = 'none';
    }, 3000);
}

function loadAllData() {
    loadCarouselData();
    loadTrainingSchedule();
    loadContact();
    loadNews();
    loadCompetitionResults();
}

function resetAllData() {
    if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser toutes les données ? Cette action est irréversible.')) {
        localStorage.clear();
        location.reload();
    }
}
