document.addEventListener('DOMContentLoaded', () => {
    const personnage = document.querySelector('.personnage');

    // Liste des points à parcourir
    const points = [
        { top: 62, left: 80 }, // Point de départ (flèche rouge)
        { top: 63, left: 79 }, // Trajet intermédiaire
        { top: 63, left: 78 }, // Trajet intermédiaire
        { top: 63, left: 76 }, // Trajet intermédiaire
        { top: 63, left: 74 },
        { top: 63, left: 72 },
        { top: 63, left: 70 },
        { top: 63, left: 68 },
        { top: 65, left: 62 }, // Flèche noire (point 2)
        { top: 79, left: 69 }, // Trajet intermédiaire
        { top: 81, left: 71 }, // Trajet intermédiaire
        { top: 83, left: 73 }, // Trajet intermédiaire
        { top: 85, left: 75 }, // Trajet intermédiaire
        { top: 87, left: 77 }  // Sortie (flèche verte, point 3)
    ];

    let currentPoint = 0;

    // Fonction pour déplacer le personnage de manière fluide entre deux points
    function deplacerPersonnage(current, target) {
        // Récupérer les coordonnées actuelles du personnage
        let posY = parseFloat(personnage.style.top);
        let posX = parseFloat(personnage.style.left);

        // Coordonnées du point cible
        const targetY = target.top;
        const targetX = target.left;

        // Vitesse de déplacement (plus la valeur est petite, plus c'est lent)
        const speed = 0.01;

        // Calculer la direction de déplacement
        const deltaX = targetX - posX;
        const deltaY = targetY - posY;

        // Calculer la distance à parcourir
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Si le personnage n'est pas encore arrivé au point cible
        if (distance > 0.5) {  // Marge pour arrêter l'animation près du point
            // Calculer les nouvelles positions
            posX += deltaX * speed;
            posY += deltaY * speed;

            // Appliquer les nouvelles positions avec des backticks
            personnage.style.left = `${posX}%`;
            personnage.style.top = `${posY}%`;

            // Appeler la fonction pour la prochaine image
            requestAnimationFrame(() => deplacerPersonnage(current, target));
        } else {
            // Une fois le point atteint, passer au point suivant
            currentPoint++;
            if (currentPoint < points.length) {
                deplacerPersonnage(points[currentPoint - 1], points[currentPoint]);
            } else {
                console.log("Le personnage a atteint le dernier point !");

                window.location.href = 'Labyrinthe.html';
            }
        }
    }

    // Initialisation du déplacement du personnage vers le premier point
    setTimeout(() => {
        personnage.style.top = `${points[0].top}%`;
        personnage.style.left = `${points[0].left}%`;
        deplacerPersonnage(points[currentPoint], points[currentPoint + 1]);
    }, 1000); // Démarrer après 1 seconde
});
