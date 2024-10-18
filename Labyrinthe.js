// Configuration du labyrinthe
const labyrintheConfig = [
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 0, 1, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
];

const labyrinthe = document.getElementById('labyrinthe');
const rows = labyrintheConfig.length;
const cols = labyrintheConfig[0].length;

let posX = 0, posY = 0; // Position de départ du personnage
let pointRecupere = false; // Indique si le point a été récupéré

// Fonction pour générer une position aléatoire sur le chemin
function genererPositionPoint() {
    let availableSpaces = [];
    
    // Parcourir les cases du labyrinthe pour trouver les espaces valides (cases vides)
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (labyrintheConfig[y][x] === 0) {
                availableSpaces.push({ x: x, y: y });
            }
        }
    }

    // Choisir une case vide aléatoire
    const randomIndex = Math.floor(Math.random() * availableSpaces.length);
    return availableSpaces[randomIndex];
}

// Position du point à récupérer (généré sur une case vide)
const pointPosition = genererPositionPoint();
const pointX = pointPosition.x;
const pointY = pointPosition.y;

// Position de la sortie (colonne 20, ligne 15)
const sortieX = 19;  // Index 19 correspond à la colonne 20
const sortieY = 14;  // Index 14 correspond à la ligne 15

// Fonction pour ajouter un délai dans l'exécution
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Création du labyrinthe visuel
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        const div = document.createElement('div');
        div.classList.add('case');
        if (labyrintheConfig[y][x] === 1) {
            div.classList.add('mur');
        }
        div.setAttribute('data-x', x);
        div.setAttribute('data-y', y);
        labyrinthe.appendChild(div);
    }
}

// Ajouter l'image de l'entrée au point (0,0)
const entree = document.createElement('div');
entree.classList.add('entree');
const entreeCase = document.querySelector(`.case[data-x="0"][data-y="0"]`);
entreeCase.appendChild(entree);

// Ajouter l'image de la sortie au point (19,14)
const sortie = document.createElement('div');
sortie.classList.add('sortie');
const sortieCase = document.querySelector(`.case[data-x="19"][data-y="14"]`);
sortieCase.appendChild(sortie);

// Création du personnage
const personnage = document.createElement('div');
personnage.classList.add('personnage');
labyrinthe.appendChild(personnage);

// Création du point à récupérer
const point = document.createElement('div');
point.classList.add('point');
const pointCase = document.querySelector(`.case[data-x="${pointX}"][data-y="${pointY}"]`);
pointCase.appendChild(point);

// Mise à jour de la position du personnage dans le DOM
function updatePersonnagePosition(x, y) {
    const currentCase = document.querySelector(`.case[data-x="${x}"][data-y="${y}"]`);
    currentCase.classList.add('trace');
    personnage.style.left = `${x * 27}px`; // 25px de taille de case + 2px de gap
    personnage.style.top = `${y * 27}px`;

    // Vérification si le personnage a atteint le point
    if (!pointRecupere && x === pointX && y === pointY) {
        pointRecupere = true;
        point.remove(); // Supprime visuellement le point
    }
}

// Fonction pour vérifier si une position est valide et non encore visitée
function estValide(x, y, visited) {
    return x >= 0 && x < cols && y >= 0 && y < rows && labyrintheConfig[y][x] === 0 && !visited.some(v => v[0] === x && v[1] === y);
}

// Fonction pour reconstruire le chemin à partir du tableau des parents
async function suivreChemin(chemin) {
    for (const [x, y] of chemin) {
        updatePersonnagePosition(x, y);
        await delay(200); // Un délai pour visualiser le déplacement
    }
}

// Fonction pour trouver le chemin vers un objectif spécifique avec BFS et garder les parents
async function trouverCheminBFS(x, y, objectifX, objectifY) {
    const visited = [];
    const queue = [[x, y]]; // Utilisation d'une file pour la recherche en largeur (BFS)
    const parents = {}; // Pour garder trace des parents de chaque case
    parents[`${x},${y}`] = null; // Le point de départ n'a pas de parent
    
    const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // Droite, Bas, Gauche, Haut

    while (queue.length > 0) {
        const [currX, currY] = queue.shift(); // Prend le premier élément de la file
        visited.push([currX, currY]);

        // Vérifie si le personnage a atteint l'objectif (le point ou la sortie)
        if (currX === objectifX && currY === objectifY) {
            // Si l'objectif est atteint, reconstruire le chemin
            let chemin = [];
            let current = [objectifX, objectifY];
            while (current) {
                chemin.push(current);
                current = parents[`${current[0]},${current[1]}`];
            }
            chemin.reverse(); // Inverse pour avoir le chemin dans le bon ordre
            return chemin;
        }

        // Explorer les directions
        for (const [dx, dy] of directions) {
            const newX = currX + dx;
            const newY = currY + dy;
            if (estValide(newX, newY, visited)) {
                queue.push([newX, newY]);
                parents[`${newX},${newY}`] = [currX, currY]; // Enregistre le parent
                visited.push([newX, newY]); // Marque comme visité
            }
        }
    }

    return []; // Retourne un chemin vide si aucun chemin n'a été trouvé
}

// Fonction principale qui d'abord trouve le point puis la sortie
async function deplacerAutomatiquement() {
    // Phase 1: Trouver et suivre le chemin vers le point
    let cheminVersPoint = await trouverCheminBFS(0, 0, pointX, pointY);
    if (cheminVersPoint.length > 0) {
        await suivreChemin(cheminVersPoint);
        alert("MON PRECIIIIEUX");
    }

    // Phase 2: Trouver et suivre le chemin vers la sortie
    let cheminVersSortie = await trouverCheminBFS(pointX, pointY, sortieX, sortieY); // Nouvelle sortie en colonne 20 et ligne 15
    if (cheminVersSortie.length > 0) {
        await suivreChemin(cheminVersSortie);
        alert("Vite avant que les Hobbit ne reviennent");
    }
}

// Initialisation du jeu
updatePersonnagePosition(posX, posY);
deplacerAutomatiquement();
