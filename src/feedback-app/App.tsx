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
    title: 'Main Street Bridge Reconstruction',
    description: 'Complete replacement of aging bridge infrastructure with modern design and improved pedestrian access.',
    location: 'Main St & River Rd',
    distance: '0.8 mi',
    status: 'in-progress' as const,
    startDate: 'Jan 2026',
    endDate: 'Dec 2026',
    riskCount: 2,
    feedbackCount: 23,
    detailedDescription: 'This project involves the complete replacement of the Main Street Bridge, originally constructed in 1952. The new bridge will feature wider lanes, dedicated bike lanes, improved pedestrian walkways, and updated safety features. Work includes demolition of the existing structure, foundation reinforcement, and construction of a modern steel and concrete bridge designed to last 75+ years.',
    budget: '$12.5M',
    contractor: 'Metropolitan Construction Corp',
    x: 45,
    y: 35,
  },
  {
    id: '2',
    title: 'Central Park Drainage Upgrade',
    description: 'Installation of new stormwater management system to prevent flooding in surrounding neighborhoods.',
    location: 'Central Park',
    distance: '1.2 mi',
    status: 'planned' as const,
    startDate: 'Jul 2026',
    endDate: 'Oct 2026',
    riskCount: 0,
    feedbackCount: 15,
    detailedDescription: 'To address recurring flooding issues in the Central Park area and adjacent residential neighborhoods, this project will install a comprehensive stormwater drainage system. The work includes underground detention basins, improved drainage pipes, new catch basins, and naturalized rain gardens to manage excess water sustainably.',
    budget: '$3.8M',
    contractor: 'EcoWater Solutions LLC',
    x: 60,
    y: 55,
  },
  {
    id: '3',
    title: 'Downtown Transit Hub Expansion',
    description: 'Modernization and expansion of central transit facility with new platforms and accessibility features.',
    location: '5th Ave Transit Center',
    distance: '2.1 mi',
    status: 'planned' as const,
    startDate: 'Sep 2026',
    endDate: 'Jun 2027',
    riskCount: 0,
    feedbackCount: 47,
    detailedDescription: 'The Downtown Transit Hub will undergo a major expansion to accommodate growing ridership and improve accessibility. Plans include three new bus platforms, elevator installation for ADA compliance, upgraded waiting areas with climate control, digital wayfinding systems, and improved lighting throughout the facility.',
    budget: '$8.2M',
    contractor: 'Urban Transit Builders Inc',
    x: 35,
    y: 65,
  },
  {
    id: '4',
    title: 'Riverside Park Trail Extension',
    description: 'New 2-mile multi-use trail connecting existing park system to waterfront recreation areas.',
    location: 'Riverside Park',
    distance: '1.5 mi',
    status: 'in-progress' as const,
    startDate: 'Mar 2026',
    endDate: 'Aug 2026',
    riskCount: 1,
    feedbackCount: 31,
    detailedDescription: 'This project extends the popular Riverside Park trail system by 2 miles, creating a continuous connection to the waterfront district. The paved multi-use trail will accommodate cyclists, runners, and pedestrians, with new benches, lighting, native plantings, and interpretive signage highlighting local ecology and history.',
    budget: '$1.9M',
    contractor: 'GreenPath Landscape & Construction',
    x: 70,
    y: 40,
  },
  {
    id: '5',
    title: 'Oak Street Water Main Replacement',
    description: 'Replacement of deteriorating water infrastructure serving 2,400 homes and businesses.',
    location: 'Oak St (12th-24th Ave)',
    distance: '3.2 mi',
    status: 'planned' as const,
    startDate: 'May 2026',
    endDate: 'Nov 2026',
    riskCount: 0,
    feedbackCount: 12,
    detailedDescription: 'The aging water main along Oak Street, installed in the 1960s, will be completely replaced with modern materials to ensure reliable water service and reduce the risk of breaks. The project includes replacement of service connections, coordination with property owners, temporary water service arrangements, and full street restoration upon completion.',
    budget: '$5.6M',
    contractor: 'Aqua Infrastructure Services',
    x: 25,
    y: 45,
  },
];

const mockCompletedProjects = [
  {
    id: 'c1',
    title: 'Highway 12 Resurfacing Project',
    description: 'Complete resurfacing of 8 miles of Highway 12 with new asphalt and improved road markings.',
    location: 'Highway 12 (Mile 5-13)',
    completedDate: 'March 2026',
    averageRating: 4.5,
    totalRatings: 67,
    budget: '$4.2M',
    contractor: 'RoadWorks Paving Inc',
    userRating: 5,
    detailedDescription: 'This project completed a comprehensive resurfacing of an 8-mile stretch of Highway 12, addressing years of deterioration and improving driver safety. The work included milling the old surface, applying new asphalt, repainting all lane markings and signage, and upgrading reflectors for better nighttime visibility.',
    x: 80,
    y: 25,
  },
  {
    id: 'c2',
    title: 'Lincoln Elementary School Modernization',
    description: 'Complete renovation of school facilities including HVAC, electrical systems, and accessibility upgrades.',
    location: 'Lincoln Elementary School',
    completedDate: 'January 2026',
    averageRating: 4.8,
    totalRatings: 92,
    budget: '$6.7M',
    contractor: 'Educational Facilities Group',
    detailedDescription: 'A comprehensive modernization of Lincoln Elementary School brought the 60-year-old facility up to current standards. Improvements included a new HVAC system, complete electrical system replacement, ADA accessibility upgrades with ramps and elevators, fresh paint throughout, modernized classrooms, and an expanded library.',
    x: 20,
    y: 70,
  },
  {
    id: 'c3',
    title: 'Sunset Boulevard Streetlight Installation',
    description: 'Installation of 150 LED streetlights along 3-mile corridor to improve safety and visibility.',
    location: 'Sunset Blvd',
    completedDate: 'December 2025',
    averageRating: 4.2,
    totalRatings: 43,
    budget: '$890K',
    contractor: 'BrightPath Electrical Services',
    userRating: 4,
    detailedDescription: 'This safety-focused project installed 150 energy-efficient LED streetlights along a previously dim 3-mile section of Sunset Boulevard. The new lighting improves visibility for drivers and pedestrians, reduces energy consumption by 60% compared to traditional lights, and includes smart controls for adaptive brightness.',
    x: 65,
    y: 20,
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