import type { Gallery4Item } from '@/components/ui/gallery4';

export type GalleryFeature = {
  id: number;
  icon: 'Trophy' | 'Medal' | 'BookOpen' | 'CalendarDays' | 'Users' | 'Lightbulb' | 'Presentation' | 'GraduationCap';
  title: string;
  description: string;
  image: string;
};

export type GalleryPage = {
  slug: string;
  label: string;
  eyebrow: string;
  title: string;
  description: string;
  galleryTitle: string;
  galleryDescription: string;
  items: Gallery4Item[];
  featuresTitle: string;
  featuresEyebrow: string;
  features: GalleryFeature[];
};

export const galleryPages: GalleryPage[] = [
  {
    slug: 'about-me',
    label: 'About me',
    eyebrow: 'Profil personal',
    title: 'Deonise Costin Alexandru',
    description:
      'O pagina despre cine sunt, cum gandesc invatarea si ce directii ma intereseaza: programare, algoritmi, inteligenta artificiala si pregatire cu sens.',
    galleryTitle: 'Repere despre mine',
    galleryDescription:
      'Sectiuni pe care le poti completa cu fotografii personale, imagini de la activitati, proiecte si momente importante din parcursul tau.',
    items: [
      {
        id: 'about-profil',
        title: 'Cine sunt',
        description: 'Profesor si mentor interesat de felul in care elevii inteleg concepte dificile.',
        href: '#cine-sunt',
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'about-programare',
        title: 'Programare',
        description: 'Limbaje, algoritmi, structuri de date si gandire clara prin exercitiu.',
        href: '#programare',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'about-predare',
        title: 'Predare',
        description: 'Explicatii calme, exemple aplicate si progres construit pas cu pas.',
        href: '#predare',
        image:
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'about-interese',
        title: 'Interese',
        description: 'AI, invatare automata, programare functionala si calcul distribuit.',
        href: '#interese',
        image:
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1080',
      },
    ],
    featuresEyebrow: 'Ce ma defineste',
    featuresTitle: 'Directii personale',
    features: [
      {
        id: 1,
        icon: 'BookOpen',
        title: 'Explic clar',
        description: 'Imi place sa transform conceptele dificile in pasi simpli si verificabili.',
        image:
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 2,
        icon: 'Lightbulb',
        title: 'Construiesc curiozitate',
        description: 'Invatarea devine mai buna cand elevul intelege de ce conteaza ce face.',
        image:
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 3,
        icon: 'GraduationCap',
        title: 'Ghidez progresul',
        description: 'Lucrez cu obiective clare, feedback constant si ritm adaptat.',
        image:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1080',
      },
    ],
  },
  {
    slug: 'concursuri',
    label: 'Concursuri',
    eyebrow: 'Pregatire si rezultate',
    title: 'Concursuri pentru elevi curiosi',
    description:
      'O pagina dedicata etapelor de concurs: anunturi, pregatire, lucru pe echipe, rezultate si momente pe care le poti documenta cu fotografii.',
    galleryTitle: 'Etape concursuri',
    galleryDescription:
      'Inlocuieste imaginile si textele de mai jos cu poze de la fiecare etapa: inscriere, pregatire, proba, premiere si feedback.',
    featuresEyebrow: 'De la idee la rezultate',
    featuresTitle: 'Cum organizam concursurile',
    items: [
      {
        id: 'concursuri-inscriere',
        title: 'Inscriere si selectie',
        description: 'Elevii aleg probele potrivite si isi stabilesc obiectivele pentru concurs.',
        href: '#inscriere',
        image:
          'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'concursuri-pregatire',
        title: 'Pregatire intensiva',
        description: 'Sesiuni aplicate cu probleme, simulari si discutii dupa fiecare exercitiu.',
        href: '#pregatire',
        image:
          'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'concursuri-proba',
        title: 'Ziua probei',
        description: 'Momentul in care elevii isi testeaza ritmul, atentia si increderea.',
        href: '#proba',
        image:
          'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'concursuri-premiere',
        title: 'Premiere',
        description: 'Rezultatele devin motivatie pentru urmatoarea provocare.',
        href: '#premiere',
        image:
          'https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1080',
      },
    ],
    features: [
      {
        id: 1,
        icon: 'CalendarDays',
        title: 'Planificare clara',
        description: 'Stabilim calendarul, regulamentul si obiectivele pentru fiecare etapa.',
        image:
          'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 2,
        icon: 'Users',
        title: 'Pregatire cu feedback',
        description: 'Elevii lucreaza pe seturi de probleme si primesc explicatii dupa fiecare runda.',
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 3,
        icon: 'Trophy',
        title: 'Rezultate si premiere',
        description: 'Documentam rezultatele, pozele si concluziile pentru urmatoarea editie.',
        image:
          'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&q=80&w=1080',
      },
    ],
  },
  {
    slug: 'olimpiade',
    label: 'Olimpiade',
    eyebrow: 'Performanta academica',
    title: 'Olimpiade construite pas cu pas',
    description:
      'Un spatiu pentru calendar, etape, pregatire si galerii foto din parcursul elevilor catre performanta.',
    galleryTitle: 'Etape olimpiade',
    galleryDescription:
      'Adauga imagini pentru fiecare etapa: selectie, pregatire pe capitole, simulare, etapa locala, judeteana sau nationala.',
    featuresEyebrow: 'Performanta pas cu pas',
    featuresTitle: 'Cum pregatim olimpiadele',
    items: [
      {
        id: 'olimpiade-selectie',
        title: 'Selectia initiala',
        description: 'Identificarea elevilor motivati si a capitolelor care trebuie consolidate.',
        href: '#selectie',
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'olimpiade-capitole',
        title: 'Lucru pe capitole',
        description: 'Pregatire structurata, cu probleme alese pe niveluri de dificultate.',
        href: '#capitole',
        image:
          'https://images.unsplash.com/photo-1509869175650-a1d97972541a?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'olimpiade-simulare',
        title: 'Simulari',
        description: 'Teste cronometrate si feedback rapid pentru strategie si claritate.',
        href: '#simulari',
        image:
          'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'olimpiade-rezultate',
        title: 'Rezultate',
        description: 'Analiza rezultatelor si planul pentru etapa urmatoare.',
        href: '#rezultate',
        image:
          'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1080',
      },
    ],
    features: [
      {
        id: 1,
        icon: 'Medal',
        title: 'Selectie si nivel',
        description: 'Identificam nivelul elevilor si alegem obiective realiste pentru fiecare etapa.',
        image:
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 2,
        icon: 'BookOpen',
        title: 'Aprofundare pe capitole',
        description: 'Construim progres prin capitole, probleme grele si discutii de strategie.',
        image:
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 3,
        icon: 'Lightbulb',
        title: 'Simulari si analiza',
        description: 'Cronometram probele, analizam greselile si ajustam planul de pregatire.',
        image:
          'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&q=80&w=1080',
      },
    ],
  },
  {
    slug: 'scoli-de-vara',
    label: 'Scoli de vara',
    eyebrow: 'Invatare relaxata',
    title: 'Scoli de vara cu proiecte si energie buna',
    description:
      'O pagina pentru programe intensive, ateliere, activitati practice si poze din fiecare zi sau etapa.',
    galleryTitle: 'Etape scoli de vara',
    galleryDescription:
      'Foloseste galeria pentru zile tematice, workshopuri, lucru pe echipe, iesiri educationale si prezentari finale.',
    featuresEyebrow: 'Ateliere vii',
    featuresTitle: 'Cum arata o scoala de vara',
    items: [
      {
        id: 'vara-deschidere',
        title: 'Deschidere',
        description: 'Introducere, reguli, obiective si formarea echipelor.',
        href: '#deschidere',
        image:
          'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'vara-workshop',
        title: 'Workshop practic',
        description: 'Activitati concrete in care elevii invata prin incercare si colaborare.',
        href: '#workshop',
        image:
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'vara-proiecte',
        title: 'Proiecte pe echipe',
        description: 'Idei dezvoltate in grup, cu roluri clare si prezentari intermediare.',
        href: '#proiecte',
        image:
          'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'vara-final',
        title: 'Prezentarea finala',
        description: 'Elevii arata ce au construit si primesc feedback de la colegi.',
        href: '#final',
        image:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1080',
      },
    ],
    features: [
      {
        id: 1,
        icon: 'Users',
        title: 'Echipe si roluri',
        description: 'Elevii lucreaza in grupuri mici, cu roluri clare si colaborare reala.',
        image:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 2,
        icon: 'Lightbulb',
        title: 'Proiecte aplicate',
        description: 'Fiecare atelier produce ceva concret: o idee, o prezentare sau un prototip.',
        image:
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 3,
        icon: 'Presentation',
        title: 'Prezentari finale',
        description: 'La final, elevii isi prezinta munca si invata sa primeasca feedback.',
        image:
          'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=1080',
      },
    ],
  },
  {
    slug: 'materii',
    label: 'Materii',
    eyebrow: 'Ce predau',
    title: 'Materiile pe care le predau',
    description:
      'O pagina pentru discipline, module si tipuri de lectii, cu imagini reprezentative pentru fiecare directie.',
    galleryTitle: 'Materii si module',
    galleryDescription:
      'Adauga poze pentru fiecare materie sau modul: lectii, laboratoare, proiecte, recapitulare si evaluare.',
    featuresEyebrow: 'Lectii structurate',
    featuresTitle: 'Cum predau materiile',
    items: [
      {
        id: 'materii-matematica',
        title: 'Matematica',
        description: 'Explicatii clare, probleme gradate si legaturi intre concepte.',
        href: '#matematica',
        image:
          'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'materii-informatica',
        title: 'Informatica',
        description: 'Algoritmi, gandire logica, proiecte si exercitii de programare.',
        href: '#informatica',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'materii-stiinte',
        title: 'Stiinte',
        description: 'Observatie, experiment, argumentare si curiozitate antrenata.',
        href: '#stiinte',
        image:
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 'materii-consultatii',
        title: 'Consultatii',
        description: 'Recuperare, aprofundare si planuri personalizate pentru fiecare elev.',
        href: '#consultatii',
        image:
          'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1080',
      },
    ],
    features: [
      {
        id: 1,
        icon: 'BookOpen',
        title: 'Explicatii clare',
        description: 'Pornim de la concepte de baza si construim treptat intelegerea.',
        image:
          'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 2,
        icon: 'GraduationCap',
        title: 'Exercitii ghidate',
        description: 'Elevii rezolva exercitii cu sprijin, apoi trec spre autonomie.',
        image:
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1080',
      },
      {
        id: 3,
        icon: 'Lightbulb',
        title: 'Aplicatii practice',
        description: 'Legam teoria de exemple concrete, proiecte si situatii usor de recunoscut.',
        image:
          'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&q=80&w=1080',
      },
    ],
  },
];

export function getGalleryPage(slug: string) {
  return galleryPages.find((page) => page.slug === slug);
}
