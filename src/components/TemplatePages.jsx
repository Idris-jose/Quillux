import React, { useState } from 'react';
import { Rocket, PenTool, Share2, Mail, Megaphone, FileText, Zap, MessageSquare, Send, Target, ArrowLeft, Loader2, Copy, Check } from "lucide-react";
import BlogPostTemplate from './Templates/BlogPostTemplate.jsx';
import SocialPostTemplate from './Templates/SocialPostTemplate';
import NewsletterTemplate from './Templates/NewsletterTemplate';
import AdCopyTemplate from './Templates/AdCopyTemplate';
import AdHeadlineTemplate from './Templates/AdHeadlineTemplate';

// Helper component for copy functionality
const CopyButton = ({ text, className = "" }) => {
    const [copied, setCopied] = useState(false);
    
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text:', err);
        }
    };
    
    return (
        <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors ${className}`}
        >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
};

// Generated Content Preview Component


export const TemplatePages = {
    "blog-post": {
        title: "Blog Post Template",
        icon: FileText,
        content: <BlogPostTemplate />
    },
    "social-post": {
        title: "Social Post Template",
        icon: Share2,
        content: <SocialPostTemplate/>
    
    }
        ,

    "newsletter": {
        title: "Newsletter Template",
        icon: Mail,
        content: < NewsletterTemplate/>
    },

    "ad-copy": {
        title: "Ad Copy Template",
        icon: Megaphone,
        content: < AdCopyTemplate />
    },

    // Add other templates following the same pattern...
    "blog-outline": {
        title: "Blog Outline Template",
        icon: PenTool,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Blog Outline Builder</h2>
                    <p className="text-gray-600 mb-4">This template will be enhanced with Gemini API integration soon!</p>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Topic/Title</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter your blog topic..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Who are you writing for?"
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Outline (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    "social-campaign": {
        title: "Social Campaign Template", 
        icon: Rocket,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Social Media Campaign Planner</h2>
                    <p className="text-gray-600 mb-4">This template will be enhanced with Gemini API integration soon!</p>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Name</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter campaign name..."
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Campaign (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    "promotional-email": {
        title: "Promotional Email Template",
        icon: Send,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Promotional Email Builder</h2>
                    <p className="text-gray-600 mb-4">This template will be enhanced with Gemini API integration soon!</p>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Email Subject</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Create urgency with your subject line..."
                                />
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Email (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

    "followup-email": {
        title: "Follow-up Email Template",
        icon: FileText,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Follow-up Email Builder</h2>
                    <p className="text-gray-600 mb-4">This template will be enhanced with Gemini API integration soon!</p>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Type</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Post-Purchase</option>
                                    <option>Abandoned Cart</option>
                                    <option>Meeting Follow-up</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Follow-up (Coming Soon)
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },

  "ad-headline": {
    title: "Ad Headline Template",
    icon: PenTool,
    content: < AdHeadlineTemplate/>
  }
};

export default TemplatePages;
