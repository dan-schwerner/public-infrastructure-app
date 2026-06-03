import { MapPin, Calendar, AlertTriangle } from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    description: string;
    location: string;
    distance: string;
    status: 'planned' | 'in-progress' | 'completed';
    startDate: string;
    endDate: string;
    riskCount: number;
    feedbackCount: number;
  };
  onClick: () => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-800',
  };

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="flex-1 pr-2">{project.title}</h3>
        <span className={`px-2 py-1 rounded-full text-xs ${statusColors[project.status]}`}>
          {project.status.replace('-', ' ')}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{project.location} • {project.distance}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{project.startDate} - {project.endDate}</span>
        </div>

        {project.riskCount > 0 && (
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-4 h-4" />
            <span>{project.riskCount} active risk{project.riskCount !== 1 ? 's' : ''} reported</span>
          </div>
        )}
      </div>

      <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
        {project.feedbackCount} community feedback submission{project.feedbackCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}
