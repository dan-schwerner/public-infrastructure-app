import type { Locale } from '@/i18n/config';

// Bilingual demo data for the feedback app. IDs, coordinates and all numeric
// fields are identical across locales — only the human-readable text differs —
// so map markers, selection and filtering behave the same in either language.
// Place names (Triq il-Wied, Birkirkara…) and contractor names are proper nouns
// and are intentionally kept the same in both locales.

export type ProjectStatus = 'planned' | 'in-progress' | 'completed';

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  distance: string;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  riskCount: number;
  feedbackCount: number;
  detailedDescription: string;
  budget: string;
  contractor: string;
  lat: number;
  lng: number;
}

export interface CompletedProject {
  id: string;
  title: string;
  description: string;
  location: string;
  completedDate: string;
  averageRating: number;
  totalRatings: number;
  budget: string;
  contractor: string;
  userRating?: number;
  detailedDescription: string;
  lat: number;
  lng: number;
}

export interface SampleFeedback {
  kind: 'concern' | 'suggestion' | 'opinion';
  timeAgo: string;
  text: string;
}

export interface SampleRisk {
  severity: 'low' | 'medium' | 'high';
  timeAgo: string;
  text: string;
}

export interface SampleReview {
  rating: number;
  timeAgo: string;
  text: string;
}

const projects: Record<Locale, Project[]> = {
  mt: [
    {
      id: '1',
      title: "Rikostruzzjoni tal-Pont ta' Triq il-Wied",
      description: "Sostituzzjoni sħiħa tal-pont qadim b'disinn modern u aċċess aħjar għall-mixjin.",
      location: 'Triq il-Wied, l-Iklin',
      distance: '0.4 km',
      status: 'in-progress',
      startDate: 'Jan 2026',
      endDate: 'Diċ 2026',
      riskCount: 2,
      feedbackCount: 23,
      detailedDescription:
        "Dan il-proġett jinvolvi s-sostituzzjoni sħiħa tal-pont fuq Triq il-Wied, li nbena fis-snin sebgħin. Il-pont il-ġdid se jkollu korsiji usa', mogħdijiet għar-roti, u titjib fl-aċċessibbiltà għall-mixjin. Ix-xogħol jinkludi t-twaqqigħ tal-istruttura eżistenti, it-tisħiħ tal-pedamenti, u l-bini ta' pont modern iddisinjat biex idum aktar minn 75 sena.",
      budget: '€12.5M',
      contractor: 'Mediterranea Construction Ltd',
      lat: 35.9069,
      lng: 14.4561,
    },
    {
      id: '2',
      title: 'Titjib tas-Sistema tad-Drenaġġ tal-Ilma tax-Xita',
      description:
        "Installazzjoni ta' sistema ġdida għall-immaniġġjar tal-ilma tax-xita biex tipprevjeni l-għargħar fl-inħawi tal-madwar.",
      location: 'Birkirkara',
      distance: '1.5 km',
      status: 'planned',
      startDate: 'Lul 2026',
      endDate: 'Ott 2026',
      riskCount: 0,
      feedbackCount: 15,
      detailedDescription:
        "Biex jiġu indirizzati l-problemi rikorrenti ta' għargħar f'Birkirkara u l-inħawi residenzjali tal-madwar, dan il-proġett se jinstalla sistema komprensiva ta' drenaġġ tal-ilma tax-xita. Ix-xogħol jinkludi bażini ta' detenzjoni taħt l-art, pajpijiet ta' drenaġġ imtejba, u ġonna tax-xita naturali biex jimmaniġġjaw l-ilma żejjed b'mod sostenibbli.",
      budget: '€3.8M',
      contractor: 'AquaMalta Services Ltd',
      lat: 35.8972,
      lng: 14.4611,
    },
    {
      id: '3',
      title: "Espansjoni taċ-Ċentru tat-Trasport f'Valletta",
      description:
        "Modernizzazzjoni u espansjoni tal-faċilità ċentrali tat-trasport b'pjattaformi ġodda u aċċessibbiltà aħjar.",
      location: 'Pjazza tal-Belt, Valletta',
      distance: '6.0 km',
      status: 'planned',
      startDate: 'Set 2026',
      endDate: 'Ġun 2027',
      riskCount: 0,
      feedbackCount: 47,
      detailedDescription:
        "Iċ-ċentru tat-trasport f'Valletta se jgħaddi minn espansjoni kbira biex jakkomoda aktar passiġġieri u jtejjeb l-aċċessibbiltà. Il-pjanijiet jinkludu tliet pjattaformi ġodda tax-xarabank, installazzjoni ta' liftijiet, żoni tal-istennija aġġornati, sistemi diġitali ta' direzzjoni, u dawl imtejjeb mal-faċilità kollha.",
      budget: '€8.2M',
      contractor: 'Urban Transit Malta',
      lat: 35.8989,
      lng: 14.5146,
    },
    {
      id: '4',
      title: "Estensjoni tal-Mogħdija f'Wied il-Għasel",
      description: "Mogħdija ġdida ta' 2 km li tgħaqqad is-sistema ta' parks eżistenti maż-żoni ta' rikreazzjoni.",
      location: 'Wied il-Għasel, il-Mosta',
      distance: '2.5 km',
      status: 'in-progress',
      startDate: 'Mar 2026',
      endDate: 'Aww 2026',
      riskCount: 1,
      feedbackCount: 31,
      detailedDescription:
        "Dan il-proġett jestendi s-sistema ta' mogħdijiet ta' Wied il-Għasel b'2 km, u joħloq konnessjoni kontinwa maż-żoni ta' rikreazzjoni. Il-mogħdija multi-użu se takkomoda ċiklisti, ġirjien u mixjin, b'bankijiet ġodda, dawl, pjanti indiġeni u sinjali interpretattivi dwar l-ekoloġija u l-istorja lokali.",
      budget: '€1.9M',
      contractor: 'GreenPath Malta',
      lat: 35.9094,
      lng: 14.4256,
    },
    {
      id: '5',
      title: 'Sostituzzjoni tal-Pajpijiet tal-Ilma Ewlenin',
      description: "Sostituzzjoni tal-infrastruttura tal-ilma li qed tiddeterjora u sservi 2,400 dar u negozju.",
      location: 'Triq il-Kbira, in-Naxxar',
      distance: '1.8 km',
      status: 'planned',
      startDate: 'Mej 2026',
      endDate: 'Nov 2026',
      riskCount: 0,
      feedbackCount: 12,
      detailedDescription:
        "Il-pajp ewlieni tal-ilma fi Triq il-Kbira, li nbena fis-snin sittin, se jiġi sostitwit kompletament b'materjali moderni biex jiżgura servizz tal-ilma affidabbli u jnaqqas ir-riskju ta' ksur. Il-proġett jinkludi s-sostituzzjoni tal-konnessjonijiet, koordinazzjoni mas-sidien tal-proprjetà, arranġamenti temporanji għall-ilma, u restawr sħiħ tat-triq.",
      budget: '€5.6M',
      contractor: 'AquaMalta Services Ltd',
      lat: 35.9136,
      lng: 14.4439,
    },
  ],
  en: [
    {
      id: '1',
      title: 'Valley Road Bridge Reconstruction',
      description: 'Complete replacement of the old bridge with a modern design and better pedestrian access.',
      location: 'Triq il-Wied, l-Iklin',
      distance: '0.4 km',
      status: 'in-progress',
      startDate: 'Jan 2026',
      endDate: 'Dec 2026',
      riskCount: 2,
      feedbackCount: 23,
      detailedDescription:
        'This project involves the complete replacement of the bridge on Triq il-Wied, built in the 1970s. The new bridge will have wider lanes, cycle paths, and improved accessibility for pedestrians. The work includes demolishing the existing structure, reinforcing the foundations, and building a modern bridge designed to last more than 75 years.',
      budget: '€12.5M',
      contractor: 'Mediterranea Construction Ltd',
      lat: 35.9069,
      lng: 14.4561,
    },
    {
      id: '2',
      title: 'Stormwater Drainage System Upgrade',
      description: 'Installation of a new stormwater management system to prevent flooding in the surrounding areas.',
      location: 'Birkirkara',
      distance: '1.5 km',
      status: 'planned',
      startDate: 'Jul 2026',
      endDate: 'Oct 2026',
      riskCount: 0,
      feedbackCount: 15,
      detailedDescription:
        'To address recurring flooding problems in Birkirkara and the surrounding residential areas, this project will install a comprehensive stormwater drainage system. The work includes underground detention basins, improved drainage pipes, and natural rain gardens to manage excess water sustainably.',
      budget: '€3.8M',
      contractor: 'AquaMalta Services Ltd',
      lat: 35.8972,
      lng: 14.4611,
    },
    {
      id: '3',
      title: 'Valletta Transport Hub Expansion',
      description: 'Modernisation and expansion of the central transport facility with new platforms and better accessibility.',
      location: 'Pjazza tal-Belt, Valletta',
      distance: '6.0 km',
      status: 'planned',
      startDate: 'Sep 2026',
      endDate: 'Jun 2027',
      riskCount: 0,
      feedbackCount: 47,
      detailedDescription:
        'The Valletta transport hub will undergo a major expansion to accommodate more passengers and improve accessibility. Plans include three new bus platforms, the installation of lifts, upgraded waiting areas, digital wayfinding systems, and improved lighting throughout the facility.',
      budget: '€8.2M',
      contractor: 'Urban Transit Malta',
      lat: 35.8989,
      lng: 14.5146,
    },
    {
      id: '4',
      title: 'Wied il-Għasel Pathway Extension',
      description: 'A new 2 km pathway connecting the existing park network to the recreation areas.',
      location: 'Wied il-Għasel, il-Mosta',
      distance: '2.5 km',
      status: 'in-progress',
      startDate: 'Mar 2026',
      endDate: 'Aug 2026',
      riskCount: 1,
      feedbackCount: 31,
      detailedDescription:
        'This project extends the Wied il-Għasel pathway network by 2 km, creating a continuous connection to the recreation areas. The multi-use path will accommodate cyclists, runners and walkers, with new benches, lighting, native plants and interpretive signage about local ecology and history.',
      budget: '€1.9M',
      contractor: 'GreenPath Malta',
      lat: 35.9094,
      lng: 14.4256,
    },
    {
      id: '5',
      title: 'Water Mains Replacement',
      description: 'Replacement of deteriorating water infrastructure serving 2,400 homes and businesses.',
      location: 'Triq il-Kbira, in-Naxxar',
      distance: '1.8 km',
      status: 'planned',
      startDate: 'May 2026',
      endDate: 'Nov 2026',
      riskCount: 0,
      feedbackCount: 12,
      detailedDescription:
        'The water main on Triq il-Kbira, built in the 1960s, will be completely replaced with modern materials to ensure a reliable water service and reduce the risk of bursts. The project includes replacing connections, coordinating with property owners, temporary water arrangements, and full road restoration.',
      budget: '€5.6M',
      contractor: 'AquaMalta Services Ltd',
      lat: 35.9136,
      lng: 14.4439,
    },
  ],
};

const completed: Record<Locale, CompletedProject[]> = {
  mt: [
    {
      id: 'c1',
      title: 'Tiswija tat-Triq Reġjonali',
      description: "Tiswija sħiħa ta' 8 km tat-triq reġjonali b'asfalt ġdid u marki tat-triq imtejba.",
      location: 'Triq Reġjonali, Santa Venera',
      completedDate: 'Marzu 2026',
      averageRating: 4.5,
      totalRatings: 67,
      budget: '€4.2M',
      contractor: 'RoadWorks Malta Ltd',
      userRating: 5,
      detailedDescription:
        "Dan il-proġett lesta tiswija komprensiva ta' medda ta' 8 km tat-Triq Reġjonali, u indirizza snin ta' deterjorament filwaqt li tejjeb is-sigurtà tas-sewwieqa. Ix-xogħol inkluda t-tneħħija tal-wiċċ il-qadim, l-applikazzjoni ta' asfalt ġdid, it-tpittir mill-ġdid tal-marki tal-korsiji u s-sinjali, u titjib fir-rifletturi għal viżibbiltà aħjar bil-lejl.",
      lat: 35.8889,
      lng: 14.4736,
    },
    {
      id: 'c2',
      title: 'Modernizzazzjoni tal-Iskola Primarja',
      description:
        "Rinnovazzjoni sħiħa tal-faċilitajiet tal-iskola inkluż HVAC, sistemi elettriċi, u titjib fl-aċċessibbiltà.",
      location: 'Skola Primarja, il-Ħamrun',
      completedDate: 'Jannar 2026',
      averageRating: 4.8,
      totalRatings: 92,
      budget: '€6.7M',
      contractor: 'Educational Facilities Malta',
      detailedDescription:
        "Modernizzazzjoni komprensiva tal-iskola primarja tal-Ħamrun ġabet il-faċilità ta' 60 sena għall-istandards tal-lum. It-titjib inkluda sistema ġdida ta' HVAC, sostituzzjoni sħiħa tas-sistema elettrika, titjib fl-aċċessibbiltà b'rampi u liftijiet, klassijiet immodernizzati, u librerija mkabbra.",
      lat: 35.8856,
      lng: 14.4889,
    },
    {
      id: 'c3',
      title: "Installazzjoni ta' Dawl LED fit-Toroq",
      description:
        "Installazzjoni ta' 150 lampa LED tul kuritur ta' 3 km biex itejbu s-sigurtà u l-viżibbiltà.",
      location: "Ix-Xatt ta' Tas-Sliema",
      completedDate: 'Diċembru 2025',
      averageRating: 4.2,
      totalRatings: 43,
      budget: '€890K',
      contractor: 'BrightPath Malta',
      userRating: 4,
      detailedDescription:
        "Dan il-proġett iffokat fuq is-sigurtà installa 150 lampa LED effiċjenti fl-enerġija tul medda ta' 3 km li qabel kienet dgħajfa fid-dawl. Id-dawl il-ġdid itejjeb il-viżibbiltà għas-sewwieqa u l-mixjin, inaqqas il-konsum tal-enerġija b'60% meta mqabbel mad-dwal tradizzjonali, u jinkludi kontrolli intelliġenti għal tabella adattiva.",
      lat: 35.9117,
      lng: 14.5019,
    },
  ],
  en: [
    {
      id: 'c1',
      title: 'Regional Road Resurfacing',
      description: 'Complete resurfacing of 8 km of the regional road with new asphalt and improved road markings.',
      location: 'Triq Reġjonali, Santa Venera',
      completedDate: 'March 2026',
      averageRating: 4.5,
      totalRatings: 67,
      budget: '€4.2M',
      contractor: 'RoadWorks Malta Ltd',
      userRating: 5,
      detailedDescription:
        'This project completed a comprehensive resurfacing of an 8 km stretch of the Regional Road, addressing years of deterioration while improving driver safety. The work included removing the old surface, applying new asphalt, repainting lane markings and signage, and improving reflectors for better night-time visibility.',
      lat: 35.8889,
      lng: 14.4736,
    },
    {
      id: 'c2',
      title: 'Primary School Modernisation',
      description: 'Complete renovation of school facilities including HVAC, electrical systems, and accessibility improvements.',
      location: 'Skola Primarja, il-Ħamrun',
      completedDate: 'January 2026',
      averageRating: 4.8,
      totalRatings: 92,
      budget: '€6.7M',
      contractor: 'Educational Facilities Malta',
      detailedDescription:
        "A comprehensive modernisation of the Ħamrun primary school brought the 60-year-old facility up to today's standards. The improvements included a new HVAC system, a complete replacement of the electrical system, accessibility upgrades with ramps and lifts, modernised classrooms, and an enlarged library.",
      lat: 35.8856,
      lng: 14.4889,
    },
    {
      id: 'c3',
      title: 'LED Street Lighting Installation',
      description: 'Installation of 150 LED lamps along a 3 km corridor to improve safety and visibility.',
      location: "Ix-Xatt ta' Tas-Sliema",
      completedDate: 'December 2025',
      averageRating: 4.2,
      totalRatings: 43,
      budget: '€890K',
      contractor: 'BrightPath Malta',
      userRating: 4,
      detailedDescription:
        'This safety-focused project installed 150 energy-efficient LED lamps along a 3 km stretch that was previously poorly lit. The new lighting improves visibility for drivers and pedestrians, reduces energy consumption by 60% compared to traditional lights, and includes smart controls for adaptive dimming.',
      lat: 35.9117,
      lng: 14.5019,
    },
  ],
};

const sampleFeedback: Record<Locale, SampleFeedback[]> = {
  mt: [
    {
      kind: 'concern',
      timeAgo: 'jumejn ilu',
      text: "L-iskeda proposta tidher mgħaġġla wisq. Hemm bżonn aktar żmien għall-valutazzjoni ambjentali.",
    },
    {
      kind: 'suggestion',
      timeAgo: '5 ijiem ilu',
      text: "Ikkunsidra żżid korsiji għar-roti bħala parti mill-proġett ta' tkabbir tat-triq.",
    },
  ],
  en: [
    {
      kind: 'concern',
      timeAgo: '2 days ago',
      text: 'The proposed timeline seems rushed. More time needed for environmental assessment.',
    },
    {
      kind: 'suggestion',
      timeAgo: '5 days ago',
      text: 'Consider adding bike lanes as part of the road expansion project.',
    },
  ],
};

const sampleRisks: Record<Locale, SampleRisk[]> = {
  mt: [
    { severity: 'high', timeAgo: 'ġurnata ilu', text: "Wajering elettriku espost ħdejn il-mogħdija tal-mixjin." },
    { severity: 'medium', timeAgo: '3 ijiem ilu', text: "Nieqsa l-ħitan tas-sigurtà mal-perimetru tal-punent." },
  ],
  en: [
    { severity: 'high', timeAgo: '1 day ago', text: 'Exposed electrical wiring near pedestrian walkway.' },
    { severity: 'medium', timeAgo: '3 days ago', text: 'Missing safety barriers on western perimeter.' },
  ],
};

const sampleReviews: Record<Locale, SampleReview[]> = {
  mt: [
    {
      rating: 5,
      timeAgo: 'ġimagħtejn ilu',
      text: "Xogħol eċċellenti! Il-pont il-ġdid jidher tajjeb ħafna u l-korsiji għar-roti huma żieda fantastika. Tassew tejjeb il-fluss tat-traffiku.",
    },
    {
      rating: 4,
      timeAgo: '3 ġimgħat ilu',
      text: "Kostruzzjoni ta' kwalità tajba. L-unika problema żgħira hi li l-proġett ħa aktar żmien milli mistenni, imma r-riżultat finali huwa sod.",
    },
    {
      rating: 5,
      timeAgo: 'xahar ilu',
      text: "Kuntent ħafna b'kif ħareġ dan. Il-mogħdijiet tal-mixjin issa huma ħafna aktar siguri.",
    },
  ],
  en: [
    {
      rating: 5,
      timeAgo: '2 weeks ago',
      text: 'Excellent work! The new bridge looks great and the bike lanes are a fantastic addition. Really improved traffic flow.',
    },
    {
      rating: 4,
      timeAgo: '3 weeks ago',
      text: 'Good quality construction. Only minor issue is the project took longer than expected, but the end result is solid.',
    },
    {
      rating: 5,
      timeAgo: '1 month ago',
      text: 'Very pleased with how this turned out. The pedestrian walkways are much safer now.',
    },
  ],
};

export const mockData = {
  projects,
  completed,
  sampleFeedback,
  sampleRisks,
  sampleReviews,
};
