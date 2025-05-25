
import { useState } from 'react';
import { Data } from './Datacards/TemplateData';

export default function Template() {
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    
    // Create the "All" category by combining all templates
    const getAllTemplates = () => [
        ...Data.Blog,
        ...Data.Social,
        ...Data.Email,
        ...Data.Adcopy
    ];
    
    const getCurrentTemplates = () => {
        if (selectedNav === "All") {
            return getAllTemplates();
        }
        return Data[selectedNav] || [];
    };

    const currentTemplates = getCurrentTemplates();

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-2 text-black">Templates</h1>
            <p className="text-gray-600 mb-6">Choose from our professionally crafted templates to jumpstart your content creation.</p>
            
            <div className="gap-2 flex mb-6 flex-wrap">
                {Navs.map((Nav) => (
                    <button
                        key={Nav}
                        className={`px-4 py-2 rounded transition-colors ${
                            selectedNav === Nav 
                                ? "bg-orange-600 text-white font-medium" 
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                        onClick={() => setSelectedNav(Nav)}
                    >
                        {Nav}
                    </button>
                ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {currentTemplates.map((item, idx) => {
                    const IconComponent = item.icon;
                    return (
                        <div
                            className="flex flex-col gap-3 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 hover:border-orange-200"
                            key={idx}
                        >
                            <div className="flex items-center gap-2">
                                <IconComponent className="text-orange-600" size={20} />
                                <span className="text-orange-600 text-sm font-medium">{item.subtitle}</span>
                            </div>
                            <h2 className="text-black font-semibold text-lg">{item.Title}</h2>
                            <p className="text-gray-600 text-sm flex-grow">{item.Subtext}</p>
                            
                            {/* Tags */}
                            <div className="flex flex-wrap gap-1 mb-2">
                                {item.tags.map((tag, tagIdx) => (
                                    <span 
                                        key={tagIdx}
                                        className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            
                            <button className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded font-medium text-white transition-colors mt-auto">
                                {item.ButtonText}
                            </button>
                        </div>
                    );
                })}
            </div>
            
            {/* Template count indicator */}
            <div className="mt-8 text-center">
                <p className="text-gray-500 text-sm">
                    Showing {currentTemplates.length} template{currentTemplates.length !== 1 ? 's' : ''} 
                    {selectedNav !== "All" && ` in ${selectedNav}`}
                </p>
            </div>
        </div>
    );
}