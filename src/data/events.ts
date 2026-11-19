export interface CampusEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  city: string;
  remaining: number;
  total: number;
  organizer: string;
  description: string;
  image?: string;
  imageAlt: string;
  full?: boolean;
}

export const events: CampusEvent[] = [
  {
    id: "atelier-ia",
    title: "Atelier IA générative",
    category: "Atelier",
    date: "Jeu. 12 nov.",
    time: "14 h",
    venue: "Salle 3",
    city: "Khouribga",
    remaining: 18,
    total: 40,
    organizer: "Club IA",
    description: "Initiation pratique aux modèles génératifs : prompts, cas d’usage et limites. Aucun prérequis.",
    image: "/images/campus-card.jpg",
    imageAlt: "Allée fleurie du campus et salle de l’atelier",
  },
  {
    id: "conference-cybersecurite",
    title: "Conférence cybersécurité",
    category: "Conférence",
    date: "Mar. 17 nov.",
    time: "16 h",
    venue: "Amphi A",
    city: "Khouribga",
    remaining: 42,
    total: 80,
    organizer: "Département Informatique",
    description: "Une rencontre consacrée aux enjeux de la cybersécurité et aux bonnes pratiques numériques.",
    image: "/images/campus-conference.jpg",
    imageAlt: "Campus de la Faculté Polydisciplinaire de Khouribga",
  },
  {
    id: "hackathon-campus",
    title: "Hackathon campus 24 h",
    category: "Compétition",
    date: "Sam. 21 nov.",
    time: "9 h",
    venue: "Bibliothèque",
    city: "Khouribga",
    remaining: 0,
    total: 80,
    organizer: "Club Informatique",
    description: "Un défi collectif de 24 heures pour imaginer et réaliser un projet en équipe.",
    image: "/images/campus-card.jpg",
    imageAlt: "Bâtiments et allée du campus",
    full: true,
  },
  {
    id: "festival-abidat",
    title: "Festival Abidat Rma",
    category: "Culture",
    date: "Jeu. 26 nov.",
    time: "18 h",
    venue: "Khouribga",
    city: "Khouribga",
    remaining: 75,
    total: 100,
    organizer: "Vie culturelle du campus",
    description: "Découvrez et célébrez les traditions musicales d’Abidat Rma lors d’une soirée culturelle.",
    imageAlt: "Illustration culturelle de l’événement Festival Abidat Rma",
  },
  {
    id: "atelier-cv",
    title: "Atelier CV et entretien",
    category: "Atelier",
    date: "Lun. 30 nov.",
    time: "14 h",
    venue: "Salle 1",
    city: "Khouribga",
    remaining: 9,
    total: 40,
    organizer: "Bureau des stages",
    description: "Préparez votre candidature : CV, présentation et conseils pour réussir un entretien.",
    image: "/images/campus-card.jpg",
    imageAlt: "Bâtiments de la faculté sur le campus",
  },
  {
    id: "mine-art",
    title: "Mine d’Art · exposition",
    category: "Culture",
    date: "Mer. 2 déc.",
    time: "10 h",
    venue: "Khouribga",
    city: "Khouribga",
    remaining: 20,
    total: 40,
    organizer: "Club artistique",
    description: "Une exposition consacrée aux œuvres et aux talents artistiques de la communauté étudiante.",
    imageAlt: "Illustration artistique de l’exposition Mine d’Art",
  },
];