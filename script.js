document.addEventListener('DOMContentLoaded', () => {

    const starContainer = document.getElementById('universe-container');
    const fillerStarContainer = document.getElementById('filler-stars-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeButton = document.querySelector('.close-button');
    const introMessage = document.getElementById('intro-message');
    const finalMessage = document.getElementById('final-message');
    const finalMusic = document.getElementById('final-music');

    let clickedStarCount = 0;
    const totalStars = 5;

    // --- NEW COORDINATES FOR SHAPES (percentages: {x, y}) ---
    const heartCoords = [
        {x: 50, y: 35}, {x: 55, y: 30}, {x: 63, y: 30}, {x: 70, y: 35}, {x: 75, y: 42}, 
        {x: 75, y: 50}, {x: 70, y: 60}, {x: 60, y: 70}, {x: 50, y: 80}, {x: 40, y: 70}, 
        {x: 30, y: 60}, {x: 25, y: 50}, {x: 25, y: 42}, {x: 30, y: 35}, {x: 37, y: 30}, 
        {x: 45, y: 30}
    ];

    const initialsCoords = {
        A1: [ {x: 25, y: 70}, {x: 30, y: 50}, {x: 35, y: 70}, {x: 28, y: 60}, {x: 32, y: 60} ],
        plus: [ {x: 50, y: 60}, {x: 47, y: 60}, {x: 53, y: 60}, {x: 50, y: 57}, {x: 50, y: 63} ],
        A2: [ {x: 65, y: 70}, {x: 70, y: 50}, {x: 75, y: 70}, {x: 68, y: 60}, {x: 72, y: 60} ]
    };

    // Data for the 5 INTERACTIVE stars with new initial positions
    const starsData = [
        { id: 'star1', msg: "This one remembers your laugh.", img: "laugh.jpg", 
          initialPos: { x: 20, y: 80 }, heartPos: heartCoords[8], initialsPos: initialsCoords.A1[0] },
        { id: 'star2', msg: "This one remembers your touch.", img: "touch.jpg", 
          initialPos: { x: 35, y: 85 }, heartPos: heartCoords[11], initialsPos: initialsCoords.A1[1] },
        { id: 'star3', msg: "This one remembers our first date.", img: "date.jpg", 
          initialPos: { x: 50, y: 88 }, heartPos: heartCoords[0], initialsPos: initialsCoords.plus[0] },
        { id: 'star4', msg: "This one remembers anniversary.", img: "anniversary.jpg", 
          initialPos: { x: 65, y: 85 }, heartPos: heartCoords[3], initialsPos: initialsCoords.A2[1] },
        { id: 'star5', msg: "This one holds all my secrets.", img: "secrets.jpg", 
          initialPos: { x: 80, y: 80 }, heartPos: heartCoords[6], initialsPos: initialsCoords.A2[2] }
    ];

    // Create and place the 5 main stars
    starsData.forEach(data => {
        const star = document.createElement('div');
        star.className = 'star';
        star.id = data.id;
        star.style.left = `${data.initialPos.x}%`; 
        star.style.top = `${data.initialPos.y}%`; 
        star.addEventListener('click', () => onStarClick(star, data));
        starContainer.appendChild(star);
    });

    function onStarClick(starElement, data) {
        if (starElement.classList.contains('clicked')) return;
        starElement.classList.add('clicked');
        clickedStarCount++;
        
        modalImage.src = data.img;
        modalCaption.innerText = data.msg;
        modal.classList.add('visible');

        if (clickedStarCount === totalStars) {
            setTimeout(runFinalAnimation, 2000); 
        }
    }

    function closeModal() {
        modal.classList.remove('visible');
    }
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => e.target.id === 'modal' && closeModal());

    function runFinalAnimation() {
        closeModal();
        introMessage.classList.add('hidden');
        finalMusic.play();

        // 1. Animate to HEART shape
        starsData.forEach(data => {
            const star = document.getElementById(data.id);
            star.style.left = `${data.heartPos.x}vw`;
            star.style.top = `${data.heartPos.y}vh`;
            star.style.transform = `translate(-50%, -50%) scale(1.3)`;
        });
        createFillerStars(heartCoords);

        // 2. Animate to INITIALS shape
        setTimeout(() => {
            fillerStarContainer.innerHTML = ''; 
            
            starsData.forEach(data => {
                const star = document.getElementById(data.id);
                star.style.left = `${data.initialsPos.x}vw`;
                star.style.top = `${data.initialsPos.y}vh`;
            });

            createFillerStars(initialsCoords.A1);
            createFillerStars(initialsCoords.plus);
            createFillerStars(initialsCoords.A2);

        }, 4000);

        // 3. Show final message
        setTimeout(() => {
            finalMessage.classList.remove('hidden');
        }, 7000);
    }

    function createFillerStars(coordinates) {
        coordinates.forEach(coord => {
            const filler = document.createElement('div');
            filler.className = 'filler-star';
            filler.style.left = `${coord.x}vw`;
            filler.style.top = `${coord.y}vh`;
            fillerStarContainer.appendChild(filler);
            setTimeout(() => filler.style.opacity = '0.7', 100);
        });
    }
});
