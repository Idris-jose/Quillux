import React, { useState } from 'react'
import { FileText, PenTool, Share2, Mail, Megaphone, MessageSquare, Send, Zap, Target, Layout, Newspaper, Heart, TrendingUp, Users, Star, Calendar } from "lucide-react";

export default function Template(){
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    
    // Template data for each category
    const data = {
        Blog: [
            {
                icon: FileText,
                subtitle: "Blog Template",
                Title: "How-To Guide",
                Subtext: "Step-by-step instructional blog post template.",
                ButtonText: "Use template",
                tags: ["Tutorial", "Educational"]
            },
            {
                icon: PenTool,
                subtitle: "Blog Template",
                Title: "Product Review",
                Subtext: "Comprehensive product review template with pros/cons.",
                ButtonText: "Use template",
                tags: ["Review", "Product"]
            },
            {
                icon: Newspaper,
                subtitle: "Blog Template",
                Title: "News Article",
                Subtext: "Professional news article structure and format.",
                ButtonText: "Use template",
                tags: ["News", "Journalism"]
            },
            {
                icon: TrendingUp,
                subtitle: "Blog Template",
                Title: "Case Study",
                Subtext: "In-depth case study template with data analysis.",
                ButtonText: "Use template",
                tags: ["Business", "Analysis"]
            }
        ],
        Social: [
            {
                icon: Share2,
                subtitle: "Social Template",
                Title: "Engagement Post",
                Subtext: "Drive likes and comments with proven engagement formats.",
                ButtonText: "Use template",
                tags: ["Engagement", "Community"]
            },
            {
                icon: MessageSquare,
                subtitle: "Social Template",
                Title: "Story Series",
                Subtext: "Multi-part story template for Instagram and LinkedIn.",
                ButtonText: "Use template",
                tags: ["Storytelling", "Series"]
            },
            {
                icon: Heart,
                subtitle: "Social Template",
                Title: "Behind the Scenes",
                Subtext: "Show your authentic side with BTS content templates.",
                ButtonText: "Use template",
                tags: ["Authentic", "Personal"]
            },
            {
                icon: Users,
                subtitle: "Social Template",
                Title: "User Generated Content",
                Subtext: "Templates for featuring customer content and testimonials.",
                ButtonText: "Use template",
                tags: ["UGC", "Community"]
            }
        ],
        Email: [
            {
                icon: Mail,
                subtitle: "Email Template",
                Title: "Welcome Series",
                Subtext: "Multi-email welcome sequence for new subscribers.",
                ButtonText: "Use template",
                tags: ["Onboarding", "Series"]
            },
            {
                icon: Send,
                subtitle: "Email Template",
                Title: "Product Launch",
                Subtext: "Announce new products with compelling launch emails.",
                ButtonText: "Use template",
                tags: ["Launch", "Product"]
            },
            {
                icon: Zap,
                subtitle: "Email Template",
                Title: "Re-engagement",
                Subtext: "Win back inactive subscribers with targeted emails.",
                ButtonText: "Use template",
                tags: ["Retention", "Reactivation"]
            },
            {
                icon: Star,
                subtitle: "Email Template",
                Title: "Customer Success",
                Subtext: "Celebrate wins and build loyalty with success stories.",
                ButtonText: "Use template",
                tags: ["Success", "Loyalty"]
            }
        ],
        Adcopy: [
            {
                icon: Megaphone,
                subtitle: "Ad Template",
                Title: "Facebook Ad Copy",
                Subtext: "High-converting Facebook and Instagram ad templates.",
                ButtonText: "Use template",
                tags: ["Facebook", "Instagram"]
            },
            {
                icon: Target,
                subtitle: "Ad Template",
                Title: "Google Ads Copy",
                Subtext: "Search and display ad copy that drives clicks.",
                ButtonText: "Use template",
                tags: ["Google", "Search"]
            },
            {
                icon: Layout,
                subtitle: "Ad Template",
                Title: "Landing Page Copy",
                Subtext: "Convert visitors with persuasive landing page templates.",
                ButtonText: "Use template",
                tags: ["Landing", "Conversion"]
            },
            {
                icon: Calendar,
                subtitle: "Ad Template",
                Title: "Seasonal Campaigns",
                Subtext: "Holiday and seasonal marketing campaign templates.",
                ButtonText: "Use template",
                tags: ["Seasonal", "Holiday"]
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
            <h1 className="text-3xl font-bold mb-2 text-black">Templates</h1>
            <p className="text-gray-600 mb-6">Choose from our professionally crafted templates to jumpstart your content creation.</p>
            
            <div className="gap-2 flex mb-6">
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
                {data[selectedNav].map((item, idx) => {
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
                    Showing {data[selectedNav].length} template{data[selectedNav].length !== 1 ? 's' : ''} 
                    {selectedNav !== "All" && ` in ${selectedNav}`}
                </p>
            </div>
        </div>
    )
}