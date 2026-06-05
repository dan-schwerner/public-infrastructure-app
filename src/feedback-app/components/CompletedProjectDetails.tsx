import { ArrowLeft, MapPin, Calendar } from 'lucide-react';
import { useState } from 'react';
import { useFormatter, useLocale, useTranslations } from 'next-intl';
import { RatingStars } from './RatingStars';
import { mockData, type CompletedProject } from '../data/mockData';
import type { Locale } from '@/i18n/config';

interface CompletedProjectDetailsProps {
  project: CompletedProject;
  onClose: () => void;
}

export function CompletedProjectDetails({ project, onClose }: CompletedProjectDetailsProps) {
  const t = useTranslations('feedback');
  const format = useFormatter();
  const locale = useLocale() as Locale;
  const recentReviews = mockData.sampleReviews[locale];

  const [userRating, setUserRating] = useState(project.userRating || 0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<'details' | 'ratings'>('details');

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setReviewText('');
      setSubmitted(false);
    }, 2000);
  };

  const ratingDistribution = [
    { stars: 5, count: 45, percentage: 60 },
    { stars: 4, count: 20, percentage: 27 },
    { stars: 3, count: 7, percentage: 9 },
    { stars: 2, count: 2, percentage: 3 },
    { stars: 1, count: 1, percentage: 1 },
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-auto">
      <div className="sticky top-0 bg-background border-b border-border z-10">
        <div className="flex items-center gap-3 p-4">
          <button onClick={onClose} className="p-2 hover:bg-accent rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h2 className="flex-1">{project.title}</h2>
        </div>

        <div className="flex border-t border-border">
          <button
            onClick={() => setActiveTab('details')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'details'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {t('completedDetails.tabs.details')}
          </button>
          <button
            onClick={() => setActiveTab('ratings')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'ratings'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {t('completedDetails.tabs.ratings')}
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                {t('completedDetails.completedBadge')}
              </span>
            </div>

            <div>
              <h4 className="mb-2">{t('details.description')}</h4>
              <p className="text-muted-foreground">{project.detailedDescription}</p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('details.location')}</div>
                  <div>{project.location}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('completedDetails.completedLabel')}</div>
                  <div>{project.completedDate}</div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('details.budget')}</span>
                <span>{project.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('details.contractor')}</span>
                <span>{project.contractor}</span>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">{t('completedDetails.overallRating')}</div>
                  <div className="flex items-center gap-2">
                    <RatingStars rating={project.averageRating} size="lg" />
                    <span className="text-xl">
                      {format.number(project.averageRating, { minimumFractionDigits: 1, maximumFractionDigits: 1 })}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">{t('completedDetails.totalRatings')}</div>
                  <div className="text-xl">{format.number(project.totalRatings)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ratings' && (
          <div className="space-y-6">
            {/* Rate this project */}
            <div>
              <h4 className="mb-3">{t('completedDetails.rateThis')}</h4>
              <form onSubmit={handleRatingSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">{t('completedDetails.yourRating')}</label>
                  <div className="flex items-center gap-3">
                    <RatingStars
                      rating={userRating}
                      size="lg"
                      interactive
                      onRate={setUserRating}
                    />
                    {userRating > 0 && (
                      <span className="text-sm text-muted-foreground">
                        {t('completedDetails.outOfStars', { rating: userRating })}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="review" className="block mb-2">
                    {t('completedDetails.yourReview')}
                  </label>
                  <textarea
                    id="review"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background min-h-24 resize-none"
                    placeholder={t('completedDetails.reviewPlaceholder')}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={userRating === 0 || submitted}
                >
                  {submitted ? t('completedDetails.ratingSubmitted') : t('completedDetails.submitRating')}
                </button>
              </form>
            </div>

            {/* Rating distribution */}
            <div className="pt-6 border-t border-border">
              <h4 className="mb-4">{t('completedDetails.ratingDistribution')}</h4>
              <div className="space-y-2">
                {ratingDistribution.map((dist) => (
                  <div key={dist.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm">{dist.stars}</span>
                      <span className="text-amber-400">★</span>
                    </div>
                    <div className="flex-1 h-6 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 transition-all"
                        style={{ width: `${dist.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground w-12 text-right">
                      {format.number(dist.count)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent reviews */}
            <div className="pt-6 border-t border-border">
              <h4 className="mb-4">{t('completedDetails.recentReviews')}</h4>
              <div className="space-y-4">
                {recentReviews.map((review, i) => (
                  <div key={i} className="bg-muted rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <RatingStars rating={review.rating} size="sm" />
                        <div className="text-xs text-muted-foreground mt-1">{review.timeAgo}</div>
                      </div>
                    </div>
                    <p className="text-sm">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
