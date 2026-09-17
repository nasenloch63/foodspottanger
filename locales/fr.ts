export const fr = {
  nav: [
    "Accueil",
    "Notre concept",
    "Menu",
    "Galerie",
    "Localisation",
    "Contact",
  ],
  order: "Commander",
  orderNow: "Commander maintenant",
  instagram: "Voir notre Instagram",
  language: "Choisir la langue",
  openMenu: "Ouvrir le menu",
  close: "Fermer",
  skip: "Aller au contenu",
  eyebrow: "DE BRUXELLES À TANGER",
  hero1: "Le goût qui",
  heroBrand: "",
  hero2: "rassemble.",
  heroText:
    "Des burgers généreux, une ambiance conviviale et la qualité The Food Spot, maintenant à Tanger.",
  halal: "100% halal",
  open: "Ouvert 7j/7",
  late: "Jusqu’à 05h00",
  scroll: "LE SPOT DE VOS ENVIES",
  illustration: "Illustration de démo · photo à remplacer",
  sticker: "GÉNÉREUX PAR NATURE",
  direct: "Par téléphone ou WhatsApp",
  conceptLabel: "01 / L’ESPRIT FOOD SPOT",
  conceptTitle: "Plus qu’un burger,\nune vraie expérience.",
  conceptText:
    "Né à Bruxelles et installé à Tanger, The Food Spot propose une cuisine généreuse, halal et accessible, pensée pour les repas entre amis, les sorties en famille et les envies de fin de soirée.",
  values: ["Généreux", "Halal", "Convivial"],
  valueTexts: [
    "De la gourmandise, sans demi-mesure.",
    "Le goût, en accord avec vos valeurs.",
    "Les bonnes choses se partagent.",
  ],
  menuLabel: "02 / FAITES PLACE À LA GOURMANDISE",
  menuTitle: "À chacun son envie.",
  menuText:
    "Un petit creux ou une grande faim ? Retrouvez bientôt ici notre carte officielle.",
  all: "Tout voir",
  categories: {
    burgers: "Burgers",
    menus: "Menus",
    chicken: "Chicken",
    sides: "Accompagnements",
    drinks: "Boissons",
  },
  pending: "Menu à confirmer — remplacez ce contenu par la carte officielle.",
  product: "Sélection à venir",
  productText: "Recette et disponibilité à confirmer auprès du restaurant.",
  price: "Prix à confirmer",
  askMenu: "Demander la carte",
  galleryLabel: "03 / LA VIE AU SPOT",
  galleryTitle: "Du goût. De la vie. Du partage.",
  galleryText:
    "Un aperçu à imaginer. Les vraies photos arrivent ici prochainement.",
  photo: "Photo à ajouter",
  galleryNames: {
    burger: "Nos burgers",
    restaurant: "Le restaurant",
    team: "L’équipe",
    packaging: "Le packaging",
    order: "Vos commandes",
    night: "Les soirées au spot",
    sides: "À partager",
    drinks: "Une pause fraîcheur",
  },
  zoom: "Agrandir",
  previous: "Image précédente",
  next: "Image suivante",
  moreInstagram: "Voir plus sur Instagram",
  storyLabel: "DEUX VILLES. UN MÊME ESPRIT.",
  brussels: "Bruxelles",
  tangier: "Tanger",
  origin: "L’origine de la marque.",
  destination:
    "La nouvelle adresse pour retrouver l’esprit The Food Spot au Maroc.",
  locationLabel: "04 / ON SE RETROUVE ICI",
  locationTitle: "Votre prochain spot,\nc’est ici.",
  landmark: "En face de la Poste Kebira.",
  address: "NOTRE ADRESSE",
  hours: "LES HORAIRES",
  call: "Appeler",
  maps: "Ouvrir dans Google Maps",
  whatsapp: "Commander sur WhatsApp",
  mapNote: "Repère illustré · plan non géographique",
  contactNote:
    "Contactez directement le restaurant pour confirmer la carte, les disponibilités et votre commande.",
  socialTitle: "La suite se passe\nsur Instagram.",
  socialText:
    "Burgers, nouveautés, coulisses et offres : retrouvez The Food Spot Tanger sur Instagram.",
  follow: "Suivre sur Instagram",
  footerText: "De Bruxelles à Tanger. Généreux, halal et toujours convivial.",
  legal: "Mentions légales",
  privacy: "Politique de confidentialité",
  legalText:
    "Démo — informations légales à compléter avant publication : identité de l’exploitant, coordonnées, immatriculation, responsable de publication et hébergeur.",
  privacyText:
    "Démo — politique à compléter et valider avant publication. Aucun formulaire, paiement ou outil de mesure d’audience n’est intégré. Les liens externes ouvrent des services tiers soumis à leurs propres politiques.",
  demo: "Site de démonstration",
  top: "Retour en haut",
  rights: "Tous droits réservés.",
} as const;
export type Dictionary = {
  [K in keyof typeof fr]: (typeof fr)[K] extends readonly string[]
    ? readonly string[]
    : (typeof fr)[K] extends object
      ? { [P in keyof (typeof fr)[K]]: string }
      : string;
};
