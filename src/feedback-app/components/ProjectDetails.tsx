import { X, MapPin, Calendar, MessageSquare, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useState } from 'react';

interface Project {
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
  detailedDescription: string;
  budget: string;
  contractor: string;
}

interface ProjectDetailsProps {
  project: Project;
  onClose: () => void;
}

export function ProjectDetails({ project, onClose }: ProjectDetailsProps) {
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
            Details
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'feedback'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('risks')}
            className={`flex-1 py-3 px-4 transition-colors ${
              activeTab === 'risks'
                ? 'border-b-2 border-primary text-foreground'
                : 'text-muted-foreground'
            }`}
          >
            Risks
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'details' && (
          <div className="space-y-4">
            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[project.status]}`}>
                {project.status.replace('-', ' ')}
              </span>
            </div>

            <div>
              <h4 className="mb-2">Description</h4>
              <p className="text-muted-foreground">{project.detailedDescription}</p>
            </div>

            <div className="grid gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Location</div>
                  <div>{project.location}</div>
                  <div className="text-sm text-muted-foreground">{project.distance} from you</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="w-5 h-5 text-muted-foreground mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Timeline</div>
                  <div>{project.startDate} - {project.endDate}</div>
                </div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Budget</span>
                <span>{project.budget}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Contractor</span>
                <span>{project.contractor}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'feedback' && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-3">Submit Your Feedback</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Share your concerns, suggestions, or opinions about this project.
              </p>

              <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Feedback Type</label>
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
                      Concern
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
                      Suggestion
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
                      Opinion
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="feedback" className="block mb-2">
                    Your {feedbackType}
                  </label>
                  <textarea
                    id="feedback"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background min-h-32 resize-none"
                    placeholder={`Describe your ${feedbackType}...`}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  disabled={submitted}
                >
                  {submitted ? '✓ Submitted!' : 'Submit Feedback'}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="mb-3">Recent Feedback ({project.feedbackCount})</h4>
              <div className="space-y-3">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Concern</span>
                    <span className="text-xs text-muted-foreground ml-auto">2 days ago</span>
                  </div>
                  <p className="text-sm">The proposed timeline seems rushed. More time needed for environmental assessment.</p>
                </div>
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Suggestion</span>
                    <span className="text-xs text-muted-foreground ml-auto">5 days ago</span>
                  </div>
                  <p className="text-sm">Consider adding bike lanes as part of the road expansion project.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risks' && (
          <div className="space-y-4">
            <div>
              <h4 className="mb-3">Report an Active Risk</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Flag any safety concerns or risks you observe at the project site.
              </p>

              <form onSubmit={handleRiskSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2">Risk Severity</label>
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
                      Low
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
                      Medium
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
                      High
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="risk" className="block mb-2">
                    Risk Description
                  </label>
                  <textarea
                    id="risk"
                    value={riskDescription}
                    onChange={(e) => setRiskDescription(e.target.value)}
                    className="w-full p-3 border border-border rounded-lg bg-input-background min-h-32 resize-none"
                    placeholder="Describe the risk or safety concern..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-destructive text-destructive-foreground py-3 rounded-lg hover:opacity-90 transition-opacity"
                  disabled={submitted}
                >
                  {submitted ? '✓ Risk Reported!' : 'Report Risk'}
                </button>
              </form>
            </div>

            <div className="pt-4 border-t border-border">
              <h4 className="mb-3">Active Risks ({project.riskCount})</h4>
              <div className="space-y-3">
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-destructive" />
                    <span className="text-sm">High Severity</span>
                    <span className="text-xs text-muted-foreground ml-auto">1 day ago</span>
                  </div>
                  <p className="text-sm">Exposed electrical wiring near pedestrian walkway.</p>
                </div>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span className="text-sm">Medium Severity</span>
                    <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                  </div>
                  <p className="text-sm">Missing safety barriers on western perimeter.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
