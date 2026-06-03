import { MapPin, Navigation } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: 'planned' | 'in-progress' | 'completed';
  riskCount: number;
  x: number; // percentage position
  y: number; // percentage position
}

interface MapViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export function MapView({ projects, onProjectClick }: MapViewProps) {
  const statusColors = {
    planned: '#3b82f6',
    'in-progress': '#f59e0b',
    completed: '#10b981',
  };

  return (
    <div className="relative w-full h-full bg-muted/30 rounded-lg overflow-hidden">
      {/* Map background with grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(to right, var(--border) 1px, transparent 1px),
          linear-gradient(to bottom, var(--border) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }}>
        {/* Simulated streets */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <line x1="0" y1="30%" x2="100%" y2="30%" stroke="currentColor" strokeWidth="2" />
          <line x1="0" y1="60%" x2="100%" y2="60%" stroke="currentColor" strokeWidth="2" />
          <line x1="25%" y1="0" x2="25%" y2="100%" stroke="currentColor" strokeWidth="2" />
          <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="3" />
          <line x1="75%" y1="0" x2="75%" y2="100%" stroke="currentColor" strokeWidth="2" />
        </svg>
      </div>

      {/* User location */}
      <div
        className="absolute"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative">
          <div className="w-16 h-16 rounded-full bg-blue-500/20 animate-ping absolute -inset-4" />
          <div className="relative w-8 h-8 rounded-full bg-blue-600 border-4 border-background flex items-center justify-center shadow-lg">
            <Navigation className="w-4 h-4 text-white" />
          </div>
        </div>
        <div className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap bg-background border border-border px-2 py-1 rounded text-xs shadow-md">
          You are here
        </div>
      </div>

      {/* Project markers */}
      {projects.map((project) => (
        <div
          key={project.id}
          className="absolute cursor-pointer group"
          style={{
            left: `${project.x}%`,
            top: `${project.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
          onClick={() => onProjectClick(project)}
        >
          <div className="relative">
            {/* Risk indicator pulse */}
            {project.riskCount > 0 && (
              <div className="absolute -inset-2 rounded-full bg-destructive/30 animate-ping" />
            )}

            {/* Main marker */}
            <div
              className="relative w-10 h-10 rounded-full border-4 border-background flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
              style={{ backgroundColor: statusColors[project.status] }}
            >
              <MapPin className="w-5 h-5 text-white" />
            </div>

            {/* Project label */}
            <div className="absolute top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-background border border-border px-3 py-2 rounded-lg shadow-lg whitespace-nowrap max-w-[200px]">
                <div className="text-xs mb-1 truncate">{project.title}</div>
                <div className="text-xs text-muted-foreground">{project.distance}</div>
              </div>
            </div>

            {/* Risk count badge */}
            {project.riskCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs border-2 border-background">
                {project.riskCount}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Map legend */}
      <div className="absolute bottom-4 left-4 bg-background border border-border rounded-lg p-3 shadow-lg text-xs space-y-2">
        <div className="font-medium mb-2">Legend</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.planned }} />
          <span>Planned</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors['in-progress'] }} />
          <span>In Progress</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.completed }} />
          <span>Completed</span>
        </div>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-background border border-border rounded-lg shadow-lg flex items-center justify-center hover:bg-accent">
          <span className="text-xl">+</span>
        </button>
        <button className="w-10 h-10 bg-background border border-border rounded-lg shadow-lg flex items-center justify-center hover:bg-accent">
          <span className="text-xl">−</span>
        </button>
      </div>
    </div>
  );
}
