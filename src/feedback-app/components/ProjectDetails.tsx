import { MapPin, Calendar, MessageSquare, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { mockData, type Project } from '../data/mockData';
import type { Locale } from '@/i18n/config';

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

// Severity-based styling for the (demo) active-risk cards.
const riskStyles: Record<'low' | 'medium' | 'high', { box: string; icon: string }> = {
  high: { box: 'bg-destructive/10 border-destructive/20', icon: 'text-destructive' },
  medium: { box: 'bg-amber-50 border-amber-200', icon: 'text-amber-600' },
  low: { box: 'bg-green-50 border-green-200', icon: 'text-green-600' },
};

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
  const t = useTranslations('feedback');
  const locale = useLocale() as Locale;
  const recentFeedback = mockData.sampleFeedback[locale];
  const activeRisks = mockData.sampleRisks[locale];

  const [activeTab, setActiveTab] = useState<'details' | 'feedback' | 'risks'>('details');
  const [feedbackType, setFeedbackType] = useState<'concern' | 'suggestion' | 'opinion'>('concern');
  const [feedbackText, setFeedbackText] = useState('');
  const [riskDescription, setRiskDescription] = useState('');
  const [riskSeverity, setRiskSeverity] = useState<'low' | 'medium' | 'high'>('medium');
  const [submitted, setSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFeedbackText('');
      setSubmitted(false);
    }, 2000);
  };

  const handleRiskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setRiskDescription('');
      setSubmitted(false);
    }, 2000);
  };

  const statusColors = {
    planned: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-amber-100 text-amber-800',
    completed: 'bg-green-100 text-green-800',
  };

  const kindLabel = t(`kinds.${feedbackType}`);

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
            {t('details.tabs.details')}
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'feedback'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {t('details.tabs.feedback')}
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'risks'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            {t('details.tabs.risks')}
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[project.status]}`}>
                {t(`status.${project.status}`)}
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
                  <div className="text-sm text-muted-foreground">{t('details.distanceFromYou', { distance: project.distance })}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">{t('details.timeline')}</div>
                  <div>{project.startDate} - {project.endDate}</div>
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
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-3">{t('details.submitFeedbackHeading')}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {t('details.feedbackIntro')}
              </p>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">{t('details.feedbackType')}</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedbackType('concern')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        feedbackType === 'concern'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('kinds.concern')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('suggestion')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        feedbackType === 'suggestion'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('kinds.suggestion')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setFeedbackType('opinion')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        feedbackType === 'opinion'
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('kinds.opinion')}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback" className="block mb-2">
                    {t('details.yourFeedbackLabel', { kind: kindLabel })}
                  </label>
                  <textarea
                    id="feedback"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background min-h-32 resize-none"
                    placeholder={t('details.describePlaceholder', { kind: kindLabel })}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  disabled={submitted}
                >
                  {submitted ? t('details.submitted') : t('details.submitFeedback')}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="mb-3">{t('details.recentFeedback', { count: project.feedbackCount })}</h4>
              <div className="space-y-3">
                {recentFeedback.map((item, i) => (
                  <div key={i} className="bg-muted rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <MessageSquare className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{t(`kinds.${item.kind}`)}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{item.timeAgo}</span>
                    </div>
                    <p className="text-sm">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-3">{t('details.reportRiskHeading')}</h4>
              <p className="text-muted-foreground text-sm mb-4">
                {t('details.riskIntro')}
              </p>

              <form onSubmit={handleRiskSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">{t('details.riskSeverity')}</label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setRiskSeverity('low')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        riskSeverity === 'low'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('severity.low')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRiskSeverity('medium')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        riskSeverity === 'medium'
                          ? 'bg-amber-600 text-white border-amber-600'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('severity.medium')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setRiskSeverity('high')}
                      className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                        riskSeverity === 'high'
                          ? 'bg-destructive text-white border-destructive'
                          : 'bg-card border-border'
                      }`}
                    >
                      {t('severity.high')}
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="risk" className="block mb-2">
                    {t('details.riskDescription')}
                  </label>
                  <textarea
                    id="risk"
                    value={riskDescription}
                    onChange={(e) => setRiskDescription(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background min-h-32 resize-none"
                    placeholder={t('details.riskPlaceholder')}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  disabled={submitted}
                >
                  {submitted ? t('details.riskReported') : t('details.reportRisk')}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="mb-3">{t('details.activeRisks', { count: project.riskCount })}</h4>
              <div className="space-y-3">
                {activeRisks.map((risk, i) => (
                  <div key={i} className={`border rounded-lg p-3 ${riskStyles[risk.severity].box}`}>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className={`w-4 h-4 ${riskStyles[risk.severity].icon}`} />
                      <span className="text-sm">{t(`severity.${risk.severity}Label`)}</span>
                      <span className="text-xs text-muted-foreground ml-auto">{risk.timeAgo}</span>
                    </div>
                    <p className="text-sm">{risk.text}</p>
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
