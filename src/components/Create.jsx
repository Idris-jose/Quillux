import React, { useState } from 'react'
import { Rocket, PenTool, Share2, Mail, Megaphone, FileText, Zap, MessageSquare, Send, Target } from "lucide-react";
import { Data } from './Datacards/CreateData';
export default function Create(){
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    
    // Example data for each nav type
   
    // Combine all items from other categories for "All"
    Data.All = [
        ...Data.Blog,
        ...Data.Social,
        ...Data.Email,
        ...Data.Adcopy
    ];

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-black">
                Templates
            </h1>
             <p className="text-gray-600 mb-6">Choose from our professionally crafted templates to jumpstart your content creation.</p>
            <nav className="flex gap-2 mb-6" aria-label="Content type navigation">
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
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Data[selectedNav].map((item, idx) => {
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
                            >
                                {item.ButtonText}
                            </button>
                        </article>
                    );
                })}
            </section>
            {Data[selectedNav].length === 0 && (
                <div className="text-gray-500 text-center mt-10">No items available.</div>
            )}
        </div>
    );
}