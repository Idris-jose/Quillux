
import { useState } from 'react';
import { BarChart3, PenTool, FileText, ArrowRight } from 'lucide-react';

export default function Homepage() {
  const [currentSection, setCurrentSection] = useState('home');

  const features = [
    {
      icon: BarChart3,
      title: "Analytics",
      description: "View your content performance",
      route: "analytics"
    },
    {
      icon: PenTool,
      title: "Create",
      description: "Build new content",
      route: "create"
    },
    {
      icon: FileText,
      title: "Templates",
      description: "Browse template library",
      route: "templates"
    }
  ];

  const renderHome = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Content Creator</h1>
        <p className="text-gray-600 text-lg">Create, analyze, and optimize your content</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {features.map((feature, idx) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={idx} 
              className="bg-white rounded-lg p-6 border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCurrentSection(feature.route)}
            >
              <IconComponent className="text-orange-600 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <div className="flex items-center text-orange-600 font-medium">
                Open <ArrowRight className="ml-2" size={16} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      <div className="bg-white rounded-lg p-8 border">
        <div className="text-center text-gray-500">
          <BarChart3 size={48} className="mx-auto mb-4" />
          <p>Analytics dashboard coming soon</p>
        </div>
      </div>
    </div>
  );

  const renderCreate = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Create Content</h1>
      <div className="bg-white rounded-lg p-8 border">
        <div className="text-center text-gray-500">
          <PenTool size={48} className="mx-auto mb-4" />
          <p>Content creation tools coming soon</p>
        </div>
      </div>
    </div>
  );

  const renderTemplates = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Templates</h1>
      <div className="bg-white rounded-lg p-8 border">
        <div className="text-center text-gray-500">
          <FileText size={48} className="mx-auto mb-4" />
          <p>Template library goes here</p>
          <p className="text-sm mt-2">This would connect to your existing Template component</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Navigation */}
      <nav className="bg-white border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">ContentCraft</h2>
          <div className="flex gap-4">
            {[
              { id: 'home', label: 'Home' },
              { id: 'analytics', label: 'Analytics' },
              { id: 'create', label: 'Create' },
              { id: 'templates', label: 'Templates' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id)}
                className={`px-4 py-2 rounded ${
                  currentSection === item.id 
                    ? 'bg-orange-600 text-white' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {currentSection === 'home' && renderHome()}
        {currentSection === 'analytics' && renderAnalytics()}
        {currentSection === 'create' && renderCreate()}
        {currentSection === 'templates' && renderTemplates()}
      </main>
    </div>
  );
}