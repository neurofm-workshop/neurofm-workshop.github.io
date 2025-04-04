document.addEventListener('DOMContentLoaded', function () {
    // First modify all existing data-src attributes in the HTML
    const videoElements = document.querySelectorAll('.video-item');

    videoElements.forEach(item => {
        let currentSrc = item.getAttribute('data-src');
        // Check if the URL already has parameters
        if (currentSrc.includes('?')) {
            currentSrc += '&rel=0&modestbranding=1';
        } else {
            currentSrc += '?rel=0&modestbranding=1';
        }
        item.setAttribute('data-src', currentSrc);

        // Also update any already loaded iframe src attributes
        const iframe = item.querySelector('iframe');
        if (iframe.src && iframe.src !== '') {
            if (iframe.src.includes('?')) {
                iframe.src = iframe.src + '&rel=0&modestbranding=1';
            } else {
                iframe.src = iframe.src + '?rel=0&modestbranding=1';
            }
        }
    });

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Randomize organizers
    const organizersRow = document.getElementById('organizers-row');
    const organizerCards = Array.from(organizersRow.children);

    const evaDyerCard = organizerCards.find(card => card.querySelector('.card-title').textContent === 'Eva Dyer');
    const blakeRichardsCard = organizerCards.find(card => card.querySelector('.card-title').textContent === 'Blake Richards');

    const otherCards = organizerCards.filter(card => {
        const name = card.querySelector('.card-title').textContent;
        return name !== 'Eva Dyer' && name !== 'Blake Richards';
    });

    const shuffledOthers = shuffleArray(otherCards);

    organizersRow.innerHTML = '';
    shuffledOthers.forEach(card => {
        organizersRow.appendChild(card);
    });
    organizersRow.appendChild(evaDyerCard);
    organizersRow.appendChild(blakeRichardsCard);

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Video carousel functionality
    const videoContainer = document.getElementById('videoContainer');
    const videoItems = Array.from(document.querySelectorAll('.video-item'));
    const prevBtn = document.getElementById('prevVideo');
    const nextBtn = document.getElementById('nextVideo');
    const indicatorsContainer = document.querySelector('.video-indicators');

    let currentIndex = 0;

    // Create indicators
    videoItems.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('indicator');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => navigateTo(index));
        indicatorsContainer.appendChild(dot);
    });

    // Initialize the carousel
    function updateCarousel() {
        videoItems.forEach((item, index) => {
            item.classList.remove('active', 'prev', 'next');

            // Load iframe source only when needed
            const iframe = item.querySelector('iframe');
            const src = item.getAttribute('data-src');

            if (index === currentIndex) {
                item.classList.add('active');
                if (iframe.src !== src) iframe.src = src;
            } else if (index === currentIndex - 1 || (currentIndex === 0 && index === videoItems.length - 1)) {
                item.classList.add('prev');
                if (iframe.src !== src && videoItems.length > 2) iframe.src = src;
            } else if (index === currentIndex + 1 || (currentIndex === videoItems.length - 1 && index === 0)) {
                item.classList.add('next');
                if (iframe.src !== src && videoItems.length > 2) iframe.src = src;
            } else {
                iframe.src = '';
            }
        });

        // Update indicators
        document.querySelectorAll('.indicator').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function navigateNext() {
        currentIndex = (currentIndex + 1) % videoItems.length;
        updateCarousel();
    }

    function navigatePrev() {
        currentIndex = (currentIndex - 1 + videoItems.length) % videoItems.length;
        updateCarousel();
    }

    function navigateTo(index) {
        currentIndex = index;
        updateCarousel();
    }

    prevBtn.addEventListener('click', navigatePrev);
    nextBtn.addEventListener('click', navigateNext);

    // Initialize carousel
    updateCarousel();
}); 