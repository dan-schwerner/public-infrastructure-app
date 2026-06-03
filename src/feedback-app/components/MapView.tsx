import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Tooltip, CircleMarker } from 'react-leaflet';

interface Project {
  id: string;
  title: string;
  location: string;
  distance: string;
  status: 'planned' | 'in-progress' | 'completed';
  riskCount: number;
  lat: number;
  lng: number;
}

interface MapViewProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const statusColors: Record<Project['status'], string> = {
  planned: '#3b82f6',
  'in-progress': '#f59e0b',
  completed: '#10b981',
};

// Central Malta — frames the main island where the projects sit.
const MALTA_CENTER: [number, number] = [35.905, 14.47];
// "You are here" — l-Iklin, tying the demo to the home page's locality.
const USER_LOCATION: [number, number] = [35.9069, 14.4561];

// A teardrop pin as an HTML divIcon, coloured by status, with an optional risk
// badge. Using a divIcon avoids Leaflet's default marker-image assets (which
// break under bundlers) and lets us reuse the app's status colours.
function pinIcon(color: string, riskCount: number) {
  const badge =
    riskCount > 0
      ? `<div style="position:absolute;top:-6px;right:-8px;width:16px;height:16px;border-radius:50%;background:#d4183d;color:#fff;font-size:10px;font-weight:600;display:flex;align-items:center;justify-content:center;border:2px solid #fff;">${riskCount}</div>`
      : '';
  return L.divIcon({
    className: 'project-pin',
    html: `<div style="position:relative;width:26px;height:26px;">
        <div style="width:26px;height:26px;border-radius:50% 50% 50% 0;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,0.35);transform:rotate(-45deg);"></div>
        ${badge}
      </div>`,
    iconSize: [26, 26],
    iconAnchor: [13, 26],
  });
}

export function MapView({ projects, onProjectClick }: MapViewProps) {
  return (
    <div className="relative w-full h-full rounded-lg overflow-hidden border border-border">
      <MapContainer
        center={MALTA_CENTER}
        zoom={12}
        scrollWheelZoom
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location */}
        <CircleMarker
          center={USER_LOCATION}
          radius={8}
          pathOptions={{ color: '#ffffff', weight: 3, fillColor: '#2563eb', fillOpacity: 1 }}
        >
          <Tooltip>Inti hawn</Tooltip>
        </CircleMarker>

        {/* Project markers */}
        {projects.map((project) => (
          <Marker
            key={project.id}
            position={[project.lat, project.lng] as [number, number]}
            icon={pinIcon(statusColors[project.status], project.riskCount)}
            eventHandlers={{ click: () => onProjectClick(project) }}
          >
            <Tooltip>{project.title}</Tooltip>
          </Marker>
        ))}
      </MapContainer>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-background border border-border rounded-lg p-3 shadow-lg text-xs space-y-2">
        <div className="font-medium mb-1">Leġġenda</div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.planned }} />
          <span>Ippjanat</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors['in-progress'] }} />
          <span>Għaddej</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColors.completed }} />
          <span>Lest</span>
        </div>
      </div>
    </div>
  );
}
