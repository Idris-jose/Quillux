import React, { useState } from 'react'
import { Rocket, PenTool, Share2, Mail, Megaphone, FileText, Zap, MessageSquare, Send, Target } from "lucide-react";

export default function Create(){
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    
    // Example data for each nav type
    const data = {
        Blog: [
            {
                icon: FileText,
                subtitle: "Template",
                Title: "Blog Post",
                Subtext: "Use a guided template to structure your blog.",
                ButtonText: "Use template",
            },
            {
                icon: PenTool,
                subtitle: "Quick Start",
                Title: "AI Blog Writer",
                Subtext: "Let AI help you draft a new blog post.",
                ButtonText: "Start writing",
            }
        ],
        Social: [
            {
                icon: Share2,
                subtitle: "Template",
                Title: "Social Post",
                Subtext: "Use a guided template to structure your social post.",
                ButtonText: "Use template",
            },
            {
                icon: MessageSquare,
                subtitle: "Quick Start",
                Title: "AI Post Writer",
                Subtext: "Let AI help you draft engaging social content.",
                ButtonText: "Start writing",
            }
        ],
        Email: [
            {
                icon: Mail,
                subtitle: "Template",
                Title: "Newsletter",
                Subtext: "Engage your audience with a professional newsletter.",
                ButtonText: "Use template",
            },
            {
                icon: Send,
                subtitle: "Template",
                Title: "Promotional Email",
                Subtext: "Drive sales with a targeted promo email.",
                ButtonText: "Use template",
            },
            {
                icon: Zap,
                subtitle: "Quick Start",
                Title: "AI Email Writer",
                Subtext: "Let AI help you write effective emails.",
                ButtonText: "Start writing",
            }
        ],
        Adcopy: [
            {
                icon: Megaphone,
                subtitle: "Template",
                Title: "Ad Copy Template",
                Subtext: "Use a guided template to create compelling ad copy.",
                ButtonText: "Use template",
            },
            {
                icon: Target,
                subtitle: "Quick Start",
                Title: "AI Ad Copy Writer",
                Subtext: "Let AI help you draft high-converting ad copy.",
                ButtonText: "Start writing",
            }
        ]
    };

    // Combine all items from other categories for "All"
    data.All = [
        ...data.Blog,
        ...data.Social,
        ...data.Email,
        ...data.Adcopy
    ];

    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-4 text-black">
                Create Pieces that Captivate
            </h1>
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
                {data[selectedNav].map((item, idx) => {
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
            {data[selectedNav].length === 0 && (
                <div className="text-gray-500 text-center mt-10">No items available.</div>
            )}
        </div>
    );
}