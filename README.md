# Portfolio-stakyra
# Portfolio-stakyra


Voici le shema du projet :

portfolio-stakyra/

├── index.html # Page d'accueil

├── about.html # Page "À Propos"

├── hobbies.html # Page "Hobbies/Activités"

├── skills.html # Page "Compétences"

├── projects.html # Page "Projets"

├── contact.html # Page "Contact"

├── css/

│ ├── common.css # Styles CSS communs à toutes les pages

│ ├── index.css # Styles CSS spécifiques à la page d'accueil

│ ├── about.css # Styles CSS spécifiques à la page "À Propos"

│ ├── hobbies.css # Styles CSS spécifiques à la page "Hobbies/Activités"

│ ├── skills.css # Styles CSS spécifiques à la page "Compétences"

│ ├── projects.css # Styles CSS spécifiques à la page "Projets"

│ └── contact.css # Styles CSS spécifiques à la page "Contact"

├── media/

│ ├── images/

│ │ ├── projets/

│ │ │ ├── projet-1/

│ │ │ │ ├── capture-1.jpg

│ │ │ │ ├── capture-2.png

│ │ │ │ └── ...

│ │ │ ├── projet-2/

│ │ │ │ ├── demo.gif

│ │ │ │ └── ...

│ │ │ └── ...

│ │ ├── portraits/

│ │ │ └── ma-photo-profil.jpg

│ │ └── hobbies/ # Images spécifiques aux hobbies et activités

│ │ ├── lecture.jpg

│ │ ├── sport.jpg

│ │ └── musique.jpg

│ │ └── general/ # Autres images générales (icônes, etc.)

│ │ └── logo.png

│ ├── videos/

│ │ ├── projets/

│ │ │ └── demo-projet-3.mp4

│ │ └── hobbies/ # Vidéos spécifiques aux hobbies et activités (optionnel)

│ │ └── presentation-hobby.mp4

│ ├── fichiers/

│ │ └── mon-cv.pdf

│ └── audios/ # Dossier pour les fichiers audio (optionnel)

│ └── theme-song.mp3

├── js/

│ ├── common.js # Scripts JavaScript communs à toutes les pages (navigation, etc.)

│ ├── index.js # Scripts JavaScript spécifiques à la page d'accueil

│ ├── hobbies.js # Scripts JavaScript spécifiques à la page "Hobbies/Activités" (galerie, animations)

│ ├── skills.js # Scripts JavaScript spécifiques à la page "Compétences" (animations de barres)

│ ├── projects.js # Scripts JavaScript spécifiques à la page "Projets" (galerie, filtres)

│ └── contact.js # Scripts JavaScript spécifiques à la page "Contact" (validation de formulaire)

└── README.md



voici la fonction prevue pour chaque fichier dans cette arborescence :

Racine du Projet (mon-portfolio/) :

    index.html : La page d'accueil du portfolio. Elle servira d'introduction, présentant brièvement l'étudiante, ses aspirations et offrant des points d'accès aux autres sections du site.
    about.html : La page "À Propos". Elle fournira une présentation plus détaillée de l'étudiante, son parcours, ses motivations, et potentiellement ses objectifs futurs dans le domaine du développement web.
    hobbies.html : La page "Hobbies/Activités". Elle mettra en lumière les centres d'intérêt et les activités extra-scolaires de l'étudiante, offrant une perspective plus personnelle.
    skills.html : La page "Compétences". Elle listera et potentiellement visualisera les compétences techniques (HTML, CSS, JavaScript) et non techniques de l'étudiante.
    projects.html : La page "Projets". Elle présentera les différents projets réalisés par l'étudiante, avec des descriptions, des captures d'écran et des liens vers les démos ou le code source.
    contact.html : La page "Contact". Elle fournira un moyen pour les visiteurs de contacter l'étudiante, généralement via un formulaire ou des informations de contact directes.
    README.md : (Facultatif mais recommandé) Un fichier de documentation au format Markdown décrivant le projet, son objectif, les technologies utilisées et potentiellement des instructions pour l'exécution (bien que moins pertinent pour un portfolio statique).

Dossier css/ :

    common.css : Contient les styles CSS partagés par toutes les pages du portfolio. Cela inclut les styles de base (typographie, couleurs primaires, mise en page générale), la navigation principale et le pied de page.
    index.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page d'accueil.
    about.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page "À Propos".
    hobbies.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page "Hobbies/Activités".
    skills.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page "Compétences" (y compris les styles pour les visualisations de compétences).
    projects.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page "Projets" (y compris la présentation des projets et des galeries).
    contact.css : Styles CSS spécifiques à la mise en page et à l'apparence de la page "Contact" (y compris le formulaire).

Dossier media/ :

    images/projets/projet-nom-du-projet/ : Contient les fichiers images (captures d'écran, aperçus) spécifiques à chaque projet présenté dans la page projects.html. L'organisation par sous-dossier permet de garder les images de chaque projet bien regroupées.
    images/portraits/ : Contient la ou les photos de profil de l'étudiante, utilisées sur la page d'accueil ou la page "À Propos".
    images/hobbies/ : Contient les images illustrant les différents hobbies et activités présentés sur la page hobbies.html.
    images/general/ : Contient les images d'usage général pour le site, comme le logo, les icônes ou d'autres éléments visuels récurrents.
    videos/projets/ : Contient les fichiers vidéos de démonstration des projets, qui peuvent être intégrés dans la page projects.html.
    videos/hobbies/ : (Optionnel) Contient les fichiers vidéos liés aux hobbies et activités, qui pourraient être intégrés dans la page hobbies.html.
    fichiers/ : Contient d'autres types de fichiers téléchargeables, comme le CV de l'étudiante au format PDF, qui pourrait être lié depuis la page "À Propos" ou "Contact".
    audios/ : (Optionnel) Contient les fichiers audio, comme une musique de fond ou des effets sonores (leur utilisation dans un portfolio doit être réfléchie pour ne pas distraire).

Dossier js/ :

    common.js : Contient les scripts JavaScript qui sont utilisés sur plusieurs pages du portfolio. Cela peut inclure la gestion de la navigation (par exemple, ajouter une classe "active" au lien de la page courante), des fonctions d'animation de base ou d'autres comportements partagés.
    index.js : Contient les scripts JavaScript spécifiques à l'interactivité de la page d'accueil (animations de l'introduction, etc.).
    hobbies.js : Contient les scripts JavaScript spécifiques à la page "Hobbies/Activités", comme la gestion d'une galerie d'images ou des animations liées à la présentation des hobbies.
    skills.js : Contient les scripts JavaScript spécifiques à la page "Compétences", comme l'animation des barres de progression ou d'autres visualisations de compétences.
    projects.js : Contient les scripts JavaScript spécifiques à la page "Projets", comme la gestion d'une galerie d'images pour chaque projet ou l'implémentation de filtres de projets.
    contact.js : Contient les scripts JavaScript spécifiques à la page "Contact", principalement pour la validation du formulaire avant soumission (si un formulaire est inclus).