import { MapPin, Calendar, ThumbsUp } from 'lucide-react';
import { useFormatter, useTranslations } from 'next-intl';
import { RatingStars } from './RatingStars';
import type { CompletedProject } from '../data/mockData';

interface CompletedProjectCardProps {
  project: CompletedProject;
  onClick: () => void;
}

export function CompletedProjectCard({ project, onClick }: CompletedProjectCardProps) {
  const t = useTranslations('feedback');
  const format = useFormatter();

  return (
    <div
      onClick={onClick}
      className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="flex-1 pr-2">{project.title}</h3>
        <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800 flex items-center gap-1">
          <ThumbsUp className="w-3 h-3" />
          {t('card.completedBadge')}
        </span>
      </div>

      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
        {project.description}
      </p>

      <div className="space-y-2 text-sm text-muted-foreground mb-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          <span>{project.location}</span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{t('card.completedOn', { date: project.completedDate })}</span>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RatingStars rating={project.averageRating} size="md" />
            <span className="text-sm">
              {format.number(project.averageRating, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}{' '}
              ({t('card.ratings', { count: project.totalRatings })})
            </span>
          </div>
          {project.userRating && (
            <span className="text-xs text-muted-foreground">
              {t('card.youRated', { rating: project.userRating })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
