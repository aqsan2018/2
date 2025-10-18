document.addEventListener('DOMContentLoaded', () => {

    const starContainer = document.getElementById('universe-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const closeButton = document.querySelector('.close-button');
    const introMessage = document.getElementById('intro-message');
    const finalMessage = document.getElementById('final-message');
    const finalMusic = document.getElementById('final-music');

    let clickedStarCount = 0;
    const totalStars = 5;

    // Define the 5 main stars with their data and final positions
    // Positions are in {x, y} percentages for the screen
    const starsData = [
        // A + A initials (left A)
        { id: 'star1', message: "This one remembers your laugh.", image: "laugh.jpg", heartPos: { x: 50, y: 80 }, initialsPos: { x: 25, y: 70 } },
        { id: 'star2', message: "This one remembers your touch.", image: "touch.jpg", heartPos: { x: 30, y: 50 }, initialsPos: { x: 35, y: 70 } },
        { id: 'star3', message: "This one remembers our first date.", image: "date.jpg", heartPos: { x: 50, y: 35 }, initialsPos: { x: 30, y: 50 } },
        // A + A initials (right A)
        { id: 'star4', message: "This one remembers anniversary.", image: "anniversary.jpg", heartPos: { x: 70, y: 50 }, initialsPos: { x: 65, y: 70 } },
        { id: 'star5', message: "This one holds all my secrets.", image: "secrets.jpg", heartPos: { x: 50, y: 55 }, initialsPos: { x: 75, y: 70 } },
    ];

    // Create and place the 5 main stars randomly
    starsData.forEach(starData => {
        const star = document.createElement('div');
        star.className = 'star';
        star.id = starData.id;
        // Place stars more centrally to avoid edges
        star.style.left = `${Math.random() * 70 + 15}%`; 
        star.style.top = `${Math.random() * 60 + 20}%`; 
        
        star.addEventListener('click', () => onStarClick(star, starData));
        starContainer.appendChild(star);
    });

    // Function to handle clicking a star
    function onStarClick(starElement, starData) {
        // This 'if' statement prevents already clicked stars from doing anything
        if (starElement.classList.contains('clicked')) {
            return; 
        }

        starElement.classList.add('clicked');
        clickedStarCount++;
        
        // Show the modal with the correct image and message
        modalImage.src = starData.image;
        modalCaption.innerText = starData.message;
        modal.classList.add('visible');

        // Check if all stars have been clicked
        if (clickedStarCount === totalStars) {
            // Hide the modal after a short delay and then start the final animation
            setTimeout(runFinalAnimation, 2000); 
        }
    }

    // Function to close the modal
    function closeModal() {
        modal.classList.remove('visible');
    }

    // Event listeners to close the modal
    closeButton.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        // Closes if you click on the dark background, but not on the content
        if (e.target.id === 'modal') {
            closeModal();
        }
    });

    // The Final Animation Sequence
    function runFinalAnimation() {
        closeModal();
        introMessage.classList.add('hidden');

        // 1. Animate stars to HEART shape
        starsData.forEach(starData => {
            const star = document.getElementById(starData.id);
            const newX = starData.heartPos.x;
            const newY = starData.heartPos.y;
            star.style.left = `${newX}vw`;
            star.style.top = `${newY}vh`;
            star.style.transform = `translate(-50%, -50%) scale(1.5)`; // Make them bigger
        });
        
        // Play music on loop
        finalMusic.play();

        // 2. After a delay, animate from HEART to A + A
        setTimeout(() => {
            starsData.forEach(starData => {
                const star = document.getElementById(starData.id);
                const newX = starData.initialsPos.x;
                const newY = starData.initialsPos.y;
                star.style.left = `${newX}vw`;
                star.style.top = `${newY}vh`;
            });
        }, 4000); // Wait 4 seconds

        // 3. After another delay, show the final message
        setTimeout(() => {
            finalMessage.classList.remove('hidden');
        }, 7000); // Wait 7 seconds total
    }
});
