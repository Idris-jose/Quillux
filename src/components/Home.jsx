
import { useState } from 'react';
import { BarChart3, PenTool, FileText, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState('home');

  const features = [
   
    {
      icon: PenTool,
      title: "Create",
      description: "Build new content",
      route: "/templates"
    },
    {
      icon: FileText,
      title: "Templates",
      description: "Browse template library",
      route: "/create"
    }
  ];

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">Quillux</h1>
      <p className="text-gray-600 mb-6">Your AI-powered Content Writing Assistant.</p>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-orange-600">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.route}
                className="group flex flex-col items-start p-5 border-2 border-orange-200 rounded-lg bg-orange-50 hover:bg-orange-100 transition"
                onClick={() => {
                  setCurrentSection(feature.route);
                  navigate(feature.route);
                }}
                type="button"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="text-orange-600 w-6 h-6" />
                  <span className="font-semibold text-lg">{feature.title}</span>
                </div>
                <p className="text-gray-600 mb-4">{feature.description}</p>
                <ArrowRight className="text-orange-400 opacity-0 group-hover:opacity-100 transition" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}