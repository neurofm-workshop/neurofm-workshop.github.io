document.addEventListener('DOMContentLoaded', function () {
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
}); 