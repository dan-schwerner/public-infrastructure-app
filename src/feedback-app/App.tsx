import { useMemo, useState } from 'react';
import { MapPin, Search, Map, List, Award } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetails } from './components/ProjectDetails';
import { MapView } from './components/MapView';
import { CompletedProjectCard } from './components/CompletedProjectCard';
import { CompletedProjectDetails } from './components/CompletedProjectDetails';
import { mockData, type Project, type CompletedProject } from './data/mockData';
import type { Locale } from '@/i18n/config';

export default function App() {
  const locale = useLocale() as Locale;
  const t = useTranslations('feedback');

  // Demo data is keyed by locale; switching language re-selects the dataset
  // (ids/coordinates are identical, so map markers and selection don't move).
  const mockProjects = useMemo(() => mockData.projects[locale], [locale]);
  const mockCompletedProjects = useMemo(() => mockData.completed[locale], [locale]);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCompletedProject, setSelectedCompletedProject] = useState<CompletedProject | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'planned' | 'in-progress'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [mainTab, setMainTab] = useState<'active' | 'completed'>('active');

  const filteredProjects = filterStatus === 'all'
    ? mockProjects
    : mockProjects.filter(p => p.status === filterStatus);

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
              <h1 className="mb-4">{t('headerTitle')}</h1>

              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={t('searchPlaceholder')}
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
                  {t('tabs.active')}
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
                  {t('tabs.completed')}
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
                      {t('filters.all')}
                    </button>
                    <button
                      onClick={() => setFilterStatus('planned')}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        filterStatus === 'planned'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {t('filters.planned')}
                    </button>
                    <button
                      onClick={() => setFilterStatus('in-progress')}
                      className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
                        filterStatus === 'in-progress'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {t('filters.inProgress')}
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
                      {t('view.list')}
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
                      {t('view.map')}
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="px-4 py-3 bg-muted/50 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              {mainTab === 'active' ? (
                <span>{t('nearYou', { count: filteredProjects.length })}</span>
              ) : (
                <span>{t('completedCount', { count: mockCompletedProjects.length })}</span>
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
