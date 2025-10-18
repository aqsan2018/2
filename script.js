document.addEventListener('DOMContentLoaded', () => {

    const starContainer = document.getElementById('universe-container');
    const modal = document.getElementById('modal');
    const modalImage = document.getElementById('modal-image');
    const modalCaption = document.getElementById('modal-caption');
    const introMessage = document.getElementById('intro-message');
    const finalMessage = document.getElementById('final-message');
    const finalMusic = document.getElementById('final-music');

    let clickedStarCount = 0;
    const totalStars = 5;

    // Define the 5 main stars with their data and final positions
    // Positions are in {x, y} percentages for the screen
    const starsData = [
        {
            id: 'star1',
            message: "This one remembers your laugh.",
            image: "laugh.jpg",
            heartPos: { x: 50, y: 80 }, // Heart Point
            initialsPos: { x: 25, y: 70 } // A - bottom left
        },
        {
            id: 'star2',
            message: "This one remembers your touch.",
            image: "touch.jpg",
            heartPos: { x: 30, y: 50 }, // Heart Left curve
            initialsPos: { x: 35, y: 70 } // A - bottom right
        },
        {
            id: 'star3',
            message: "This one remembers our first date.",
            image: "date.jpg",
            heartPos: { x: 50, y: 40 }, // Heart Top dip
            initialsPos: { x: 30, y: 50 } // A - Top point
        },
        {
            id: 'star4',
            message: "This one remembers anniversary.",
            image: "anniversary.jpg",
            heartPos: { x: 70, y: 50 }, // Heart Right curve
            initialsPos: { x: 65, y: 70 } // Second A - bottom left
        },
        {
            id: 'star5',
            message: "This one holds all my secrets.",
            image: "secrets.jpg",
            heartPos: { x: 50, y: 60 }, // Heart center (part of A+)
            initialsPos: { x: 75, y: 70 } // Second A - bottom right
        }
    ];

    // Create and place the 5 main stars randomly
    starsData.forEach(starData => {
        const star = document.createElement('div');
        star.className = 'star';
        star.id = starData.id;
        star.style.left = `${Math.random() * 80 + 10}%`; // Random horizontal
        star.style.top = `${Math.random() * 60 + 20}%`; // Random vertical
        
        star.addEventListener('click', () => onStarClick(star, starData));
        starContainer.appendChild(star);
    });
    
    // Create the "Secret Star"
    const secretStar = document.createElement('div');
    secretStar.className = 'star secret-star';
    secretStar.style.left = `${Math.random() * 80 + 10}%`;
    secretStar.style.top = `${Math.random() * 60 + 20}%`;
    secretStar.addEventListener('click', () => {
        alert("Nice — you found the secret one. That’s my favorite star.");
    });
    starContainer.appendChild(secretStar);


    // Function to handle clicking a star
    function onStarClick(starElement, starData) {
        if (starElement.classList.contains('clicked')) return; // Don't re-click

        starElement.classList.add('clicked');
        clickedStarCount++;
        
        // Show the modal with the star's info
        modalImage.src = starData.image;
        modalCaption.innerText = starData.message;
        modal.classList.remove('hidden');

        // Check if all stars are clicked
        if (clickedStarCount === totalStars) {
            // Hide the modal (it will close automatically after last click)
            // and start the final animation
            setTimeout(runFinalAnimation, 1500); 
        }
    }

    // Function to close the modal when clicking outside the content
    modal.addEventListener('click', (e) => {
        if (e.target.id === 'modal') {
            modal.classList.add('hidden');
        }
    });

    // The Final Animation Sequence
    function runFinalAnimation() {
        modal.classList.add('hidden'); // Ensure modal is hidden
        introMessage.classList.add('hidden'); // Fade out intro message

        // 1. Animate stars to HEART shape
        starsData.forEach(starData => {
            const star = document.getElementById(starData.id);
            star.style.transform = `translate(${starData.heartPos.x}vw - 50%, ${starData.heartPos.y}vh - 50%)`;
            // This complex transform moves the star relative to its new position
            // We use vw/vh to make it relative to the viewport
            const newX = starData.heartPos.x;
            const newY = starData.heartPos.y;
            star.style.left = `${newX}vw`;
            star.style.top = `${newY}vh`;
            star.style.transform = `translate(-50%, -50%)`;
        });
        
        // Play music
        finalMusic.play();

        // 2. After a delay, animate from HEART to A+A
        setTimeout(() => {
            starsData.forEach(starData => {
                const star = document.getElementById(starData.id);
                const newX = starData.initialsPos.x;
                const newY = starData.initialsPos.y;
                star.style.left = `${newX}vw`;
                star.style.top = `${newY}vh`;
                star.style.transform = `translate(-50%, -50%)`;
            });
        }, 4000); // Wait 4 seconds (2.5s for anim + 1.5s pause)

        // 3. After another delay, show the final message
        setTimeout(() => {
            finalMessage.classList.remove('hidden');
        }, 7000); // Wait 7 seconds total
    }
});
