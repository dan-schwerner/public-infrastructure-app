import { useState } from 'react';
import { MapPin, Search, Map, List, Award } from 'lucide-react';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetails } from './components/ProjectDetails';
import { MapView } from './components/MapView';
import { CompletedProjectCard } from './components/CompletedProjectCard';
import { CompletedProjectDetails } from './components/CompletedProjectDetails';

const mockProjects = [
  {
    id: '1',
    title: "Rikostruzzjoni tal-Pont ta' Triq il-Wied",
    description: "Sostituzzjoni sħiħa tal-pont qadim b'disinn modern u aċċess aħjar għall-mixjin.",
    location: "Triq il-Wied, l-Iklin",
    distance: "0.4 km",
    status: 'in-progress' as const,
    startDate: "Jan 2026",
    endDate: "Diċ 2026",
    riskCount: 2,
    feedbackCount: 23,
    detailedDescription: "Dan il-proġett jinvolvi s-sostituzzjoni sħiħa tal-pont fuq Triq il-Wied, li nbena fis-snin sebgħin. Il-pont il-ġdid se jkollu korsiji usa', mogħdijiet għar-roti, u titjib fl-aċċessibbiltà għall-mixjin. Ix-xogħol jinkludi t-twaqqigħ tal-istruttura eżistenti, it-tisħiħ tal-pedamenti, u l-bini ta' pont modern iddisinjat biex idum aktar minn 75 sena.",
    budget: "€12.5M",
    contractor: "Mediterranea Construction Ltd",
    lat: 35.9069,
    lng: 14.4561,
  },
  {
    id: '2',
    title: "Titjib tas-Sistema tad-Drenaġġ tal-Ilma tax-Xita",
    description: "Installazzjoni ta' sistema ġdida għall-immaniġġjar tal-ilma tax-xita biex tipprevjeni l-għargħar fl-inħawi tal-madwar.",
    location: "Birkirkara",
    distance: "1.5 km",
    status: 'planned' as const,
    startDate: "Lul 2026",
    endDate: "Ott 2026",
    riskCount: 0,
    feedbackCount: 15,
    detailedDescription: "Biex jiġu indirizzati l-problemi rikorrenti ta' għargħar f'Birkirkara u l-inħawi residenzjali tal-madwar, dan il-proġett se jinstalla sistema komprensiva ta' drenaġġ tal-ilma tax-xita. Ix-xogħol jinkludi bażini ta' detenzjoni taħt l-art, pajpijiet ta' drenaġġ imtejba, u ġonna tax-xita naturali biex jimmaniġġjaw l-ilma żejjed b'mod sostenibbli.",
    budget: "€3.8M",
    contractor: "AquaMalta Services Ltd",
    lat: 35.8972,
    lng: 14.4611,
  },
  {
    id: '3',
    title: "Espansjoni taċ-Ċentru tat-Trasport f'Valletta",
    description: "Modernizzazzjoni u espansjoni tal-faċilità ċentrali tat-trasport b'pjattaformi ġodda u aċċessibbiltà aħjar.",
    location: "Pjazza tal-Belt, Valletta",
    distance: "6.0 km",
    status: 'planned' as const,
    startDate: "Set 2026",
    endDate: "Ġun 2027",
    riskCount: 0,
    feedbackCount: 47,
    detailedDescription: "Iċ-ċentru tat-trasport f'Valletta se jgħaddi minn espansjoni kbira biex jakkomoda aktar passiġġieri u jtejjeb l-aċċessibbiltà. Il-pjanijiet jinkludu tliet pjattaformi ġodda tax-xarabank, installazzjoni ta' liftijiet, żoni tal-istennija aġġornati, sistemi diġitali ta' direzzjoni, u dawl imtejjeb mal-faċilità kollha.",
    budget: "€8.2M",
    contractor: "Urban Transit Malta",
    lat: 35.8989,
    lng: 14.5146,
  },
  {
    id: '4',
    title: "Estensjoni tal-Mogħdija f'Wied il-Għasel",
    description: "Mogħdija ġdida ta' 2 km li tgħaqqad is-sistema ta' parks eżistenti maż-żoni ta' rikreazzjoni.",
    location: "Wied il-Għasel, il-Mosta",
    distance: "2.5 km",
    status: 'in-progress' as const,
    startDate: "Mar 2026",
    endDate: "Aww 2026",
    riskCount: 1,
    feedbackCount: 31,
    detailedDescription: "Dan il-proġett jestendi s-sistema ta' mogħdijiet ta' Wied il-Għasel b'2 km, u joħloq konnessjoni kontinwa maż-żoni ta' rikreazzjoni. Il-mogħdija multi-użu se takkomoda ċiklisti, ġirjien u mixjin, b'bankijiet ġodda, dawl, pjanti indiġeni u sinjali interpretattivi dwar l-ekoloġija u l-istorja lokali.",
    budget: "€1.9M",
    contractor: "GreenPath Malta",
    lat: 35.9094,
    lng: 14.4256,
  },
  {
    id: '5',
    title: "Sostituzzjoni tal-Pajpijiet tal-Ilma Ewlenin",
    description: "Sostituzzjoni tal-infrastruttura tal-ilma li qed tiddeterjora u sservi 2,400 dar u negozju.",
    location: "Triq il-Kbira, in-Naxxar",
    distance: "1.8 km",
    status: 'planned' as const,
    startDate: "Mej 2026",
    endDate: "Nov 2026",
    riskCount: 0,
    feedbackCount: 12,
    detailedDescription: "Il-pajp ewlieni tal-ilma fi Triq il-Kbira, li nbena fis-snin sittin, se jiġi sostitwit kompletament b'materjali moderni biex jiżgura servizz tal-ilma affidabbli u jnaqqas ir-riskju ta' ksur. Il-proġett jinkludi s-sostituzzjoni tal-konnessjonijiet, koordinazzjoni mas-sidien tal-proprjetà, arranġamenti temporanji għall-ilma, u restawr sħiħ tat-triq.",
    budget: "€5.6M",
    contractor: "AquaMalta Services Ltd",
    lat: 35.9136,
    lng: 14.4439,
  },
];

const mockCompletedProjects = [
  {
    id: 'c1',
    title: "Tiswija tat-Triq Reġjonali",
    description: "Tiswija sħiħa ta' 8 km tat-triq reġjonali b'asfalt ġdid u marki tat-triq imtejba.",
    location: "Triq Reġjonali, Santa Venera",
    completedDate: "Marzu 2026",
    averageRating: 4.5,
    totalRatings: 67,
    budget: "€4.2M",
    contractor: "RoadWorks Malta Ltd",
    userRating: 5,
    detailedDescription: "Dan il-proġett lesta tiswija komprensiva ta' medda ta' 8 km tat-Triq Reġjonali, u indirizza snin ta' deterjorament filwaqt li tejjeb is-sigurtà tas-sewwieqa. Ix-xogħol inkluda t-tneħħija tal-wiċċ il-qadim, l-applikazzjoni ta' asfalt ġdid, it-tpittir mill-ġdid tal-marki tal-korsiji u s-sinjali, u titjib fir-rifletturi għal viżibbiltà aħjar bil-lejl.",
    lat: 35.8889,
    lng: 14.4736,
  },
  {
    id: 'c2',
    title: "Modernizzazzjoni tal-Iskola Primarja",
    description: "Rinnovazzjoni sħiħa tal-faċilitajiet tal-iskola inkluż HVAC, sistemi elettriċi, u titjib fl-aċċessibbiltà.",
    location: "Skola Primarja, il-Ħamrun",
    completedDate: "Jannar 2026",
    averageRating: 4.8,
    totalRatings: 92,
    budget: "€6.7M",
    contractor: "Educational Facilities Malta",
    detailedDescription: "Modernizzazzjoni komprensiva tal-iskola primarja tal-Ħamrun ġabet il-faċilità ta' 60 sena għall-istandards tal-lum. It-titjib inkluda sistema ġdida ta' HVAC, sostituzzjoni sħiħa tas-sistema elettrika, titjib fl-aċċessibbiltà b'rampi u liftijiet, klassijiet immodernizzati, u librerija mkabbra.",
    lat: 35.8856,
    lng: 14.4889,
  },
  {
    id: 'c3',
    title: "Installazzjoni ta' Dawl LED fit-Toroq",
    description: "Installazzjoni ta' 150 lampa LED tul kuritur ta' 3 km biex itejbu s-sigurtà u l-viżibbiltà.",
    location: "Ix-Xatt ta' Tas-Sliema",
    completedDate: "Diċembru 2025",
    averageRating: 4.2,
    totalRatings: 43,
    budget: "€890K",
    contractor: "BrightPath Malta",
    userRating: 4,
    detailedDescription: "Dan il-proġett iffokat fuq is-sigurtà installa 150 lampa LED effiċjenti fl-enerġija tul medda ta' 3 km li qabel kienet dgħajfa fid-dawl. Id-dawl il-ġdid itejjeb il-viżibbiltà għas-sewwieqa u l-mixjin, inaqqas il-konsum tal-enerġija b'60% meta mqabbel mad-dwal tradizzjonali, u jinkludi kontrolli intelliġenti għal tabella adattiva.",
    lat: 35.9117,
    lng: 14.5019,
  },
];

export default function App() {
  const [selectedProject, setSelectedProject] = useState<typeof mockProjects[0] | null>(null);
  const [selectedCompletedProject, setSelectedCompletedProject] = useState<typeof mockCompletedProjects[0] | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'planned' | 'in-progress'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mainTab, setMainTab] = useState<'active' | 'completed'>('active');

  const filteredProjects = filterStatus === 'all'
    ? mockProjects
    : mockProjects.filter(p => p.status === filterStatus);

  const allProjects = [...mockProjects, ...mockCompletedProjects.map(p => ({ ...p, status: 'completed' as const }))];

  return (
    <div className="size-full bg-background flex flex-col">
      {selectedProject ? (
        <ProjectDetails
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      ) : selectedCompletedProject ? (
        <CompletedProjectDetails
          project={selectedCompletedProject}
          onClose={() => setSelectedCompletedProject(null)}
        />
      ) : (
        <>
          <header className="sticky top-0 bg-background border-b border-border z-10">
            <div className="p-4">
              <h1 className="mb-4">Infrastructure Projects</h1>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search projects by location..."
                  className="w-full pl-10 pr-4 py-3 border border-border rounded-lg bg-input-background"
                />
              </div>

              {/* Main tabs */}
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => setMainTab('active')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                    mainTab === 'active'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  Active Projects
                </button>
                <button
                  onClick={() => setMainTab('completed')}
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                    mainTab === 'completed'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  Completed
                </button>
              </div>

              {mainTab === 'active' && (
                <>
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
                    <button
                      onClick={() => setFilterStatus('all')}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        filterStatus === 'all'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      All
                    </button>
                    <button
                      onClick={() => setFilterStatus('planned')}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        filterStatus === 'planned'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      Planned
                    </button>
                    <button
                      onClick={() => setFilterStatus('in-progress')}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        filterStatus === 'in-progress'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      In Progress
                    </button>
                  </div>

                  {/* View mode toggle */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        viewMode === 'list'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <List className="w-4 h-4" />
                      List View
                    </button>
                    <button
                      onClick={() => setViewMode('map')}
                      className={`flex-1 py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 ${
                        viewMode === 'map'
                          ? 'bg-accent text-accent-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      <Map className="w-4 h-4" />
                      Map View
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="px-4 py-3 bg-muted/50 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {mainTab === 'active' ? (
                <span>{filteredProjects.length} active project{filteredProjects.length !== 1 ? 's' : ''} near you</span>
              ) : (
                <span>{mockCompletedProjects.length} completed project{mockCompletedProjects.length !== 1 ? 's' : ''}</span>
              )}
            </div>
          </header>

          <main className="flex-1 overflow-auto">
            {mainTab === 'active' ? (
              viewMode === 'list' ? (
                <div className="p-4 space-y-4 pb-20">
                  {filteredProjects.map((project) => (
                    <ProjectCard
                      key={project.id}
                      project={project}
                      onClick={() => setSelectedProject(project)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-4 h-[calc(100vh-280px)]">
                  <MapView
                    projects={filteredProjects}
                    onProjectClick={(project) => setSelectedProject(project)}
                  />
                </div>
              )
            ) : (
              <div className="p-4 space-y-4 pb-20">
                {mockCompletedProjects.map((project) => (
                  <CompletedProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedCompletedProject(project)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}
    </div>
  );
}
