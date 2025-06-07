import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { Data } from './Datacards/CreateData.js';
import { TemplatePages } from './TemplatePages.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function Create() {
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    const [currentTemplate, setCurrentTemplate] = useState(null);
      const [error, setError] = useState(null);
      const [success, setSuccess] = useState(null);
    
    // Combine all items from other categories for "All"
    const allData = {
        ...Data,
        All: [
            ...Data.Blog,
            ...Data.Social,
            ...Data.Email,
            ...Data.Adcopy,
            ...Data.CV
        ]
    };

    const handleTemplateClick = (templateId) => {
        setCurrentTemplate(templateId);
    };

    const handleBackToTemplates = () => {
        setCurrentTemplate(null);
    };

    // If a template is selected, show the template page
    if (currentTemplate && TemplatePages[currentTemplate]) {
        const template = TemplatePages[currentTemplate];
        const IconComponent = template.icon;
        
        return (
            <div className="p-6 bg-gray-50 min-h-screen">
                <div className="mb-6">
                    <button
                        onClick={handleBackToTemplates}
                        className="flex items-center gap-2 text-black hover:text-orange-700 font-medium transition-colors mb-4"
                    >
                        <ArrowLeft size={20} />
                        Back to Templates
                    </button>
                    <div className="flex items-center gap-3">
                        <IconComponent className="text-orange-600" size={28} />
                        <h1 className="text-3xl font-semibold text-orange-600">{template.title}</h1>
                    </div>
                </div>
                {template.content}
            </div>
        );
    }

    // Default templates view
    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-black">
                Templates
            </h1>
            <p className="text-gray-600 mb-6">Choose from our professionally crafted templates to jumpstart your content creation.</p>
            
            <nav className="gap-2 flex mb-6 flex-wrap" aria-label="Content type navigation">
                {Navs.map((Nav) => (
                    <button
                        key={Nav}
                        className={`px-4 py-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                            selectedNav === Nav
                                ? "bg-orange-600 text-white font-semibold shadow"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        aria-pressed={selectedNav === Nav}
                        onClick={() => setSelectedNav(Nav)}
                    >
                        {Nav}
                    </button>
                ))}
            </nav>
            
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {allData[selectedNav].map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <article
                            className="flex flex-col gap-3 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-orange-200"
                            key={idx}
                            tabIndex={0}
                            aria-label={item.Title}
                        >
                            <div className="flex items-center gap-2">
                                <IconComponent className="text-orange-600" size={22} aria-hidden="true" />
                                <span className="text-orange-600 text-sm font-medium">{item.subtitle}</span>
                            </div>
                            <h2 className="text-black font-semibold text-lg">{item.Title}</h2>
                            <p className="text-gray-600 text-sm flex-grow">{item.Subtext}</p>
                            <button
                                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded font-medium text-white transition-colors mt-auto focus:outline-none focus:ring-2 focus:ring-orange-400"
                                tabIndex={0}
                                onClick={() => handleTemplateClick(item.id)}
                            >
                                {item.ButtonText}
                            </button>
                        </article>
                    );
                })}
            </section>
            
            {allData[selectedNav].length === 0 && (
                <div className="text-gray-500 text-center mt-10">No items available.</div>
            )}
        </div>
    );
}