
import React, { useState } from 'react';
import { Rocket, PenTool, Share2, Mail, Megaphone, FileText, Zap, MessageSquare, Send, Target, ArrowLeft } from "lucide-react";




export const TemplatePages = {
    "blog-post": {
        title: "Blog Post Template",
        icon: FileText,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Blog Post Structure</h2>
                    <div className="space-y-6">
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-semibold text-lg mb-2">1. Compelling Headline</h3>
                            <p className="text-gray-600 mb-3">Create a headline that grabs attention and includes your main keyword.</p>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="2"
                                placeholder="Enter your blog post headline..."
                            />
                        </div>
                        
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-semibold text-lg mb-2">2. Introduction</h3>
                            <p className="text-gray-600 mb-3">Hook your readers and introduce the main topic.</p>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="4"
                                placeholder="Write your introduction..."
                            />
                        </div>
                        
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-semibold text-lg mb-2">3. Main Content</h3>
                            <p className="text-gray-600 mb-3">Break down your content into digestible sections.</p>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="8"
                                placeholder="Write your main content here..."
                            />
                        </div>
                        
                        <div className="border-l-4 border-orange-500 pl-4">
                            <h3 className="font-semibold text-lg mb-2">4. Conclusion & Call to Action</h3>
                            <p className="text-gray-600 mb-3">Summarize key points and encourage reader action.</p>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="4"
                                placeholder="Write your conclusion and CTA..."
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Content
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Save Draft
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    
    "blog-outline": {
        title: "Blog Outline Template",
        icon: PenTool,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Blog Outline Builder</h2>
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
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Key Points to Cover</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="6"
                                placeholder="• Point 1&#10;• Point 2&#10;• Point 3"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">SEO Keywords</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="keyword1, keyword2, keyword3"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Estimated Word Count</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>500-800 words</option>
                                    <option>800-1200 words</option>
                                    <option>1200+ words</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Outline
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Save Outline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    
    "social-post": {
        title: "Social Post Template",
        icon: Share2,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Social Media Post Creator</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Platform</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Instagram</option>
                                    <option>Twitter/X</option>
                                    <option>Facebook</option>
                                    <option>LinkedIn</option>
                                    <option>TikTok</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Post Type</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Promotional</option>
                                    <option>Educational</option>
                                    <option>Entertainment</option>
                                    <option>Behind-the-scenes</option>
                                    <option>User-generated content</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Caption</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="5"
                                placeholder="Write your engaging caption here..."
                            />
                            <p className="text-sm text-gray-500 mt-1">Character count: 0/280</p>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Hashtags</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="#hashtag1 #hashtag2 #hashtag3"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="What do you want your audience to do?"
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Post
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Schedule Post
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Duration</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>1 Week</option>
                                    <option>2 Weeks</option>
                                    <option>1 Month</option>
                                    <option>3 Months</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Objective</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="3"
                                placeholder="What do you want to achieve with this campaign?"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target Platforms</label>
                            <div className="flex flex-wrap gap-2">
                                {['Instagram', 'Facebook', 'Twitter/X', 'LinkedIn', 'TikTok', 'YouTube'].map(platform => (
                                    <label key={platform} className="flex items-center gap-2">
                                        <input type="checkbox" className="rounded" />
                                        <span className="text-sm">{platform}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Content Themes</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="4"
                                placeholder="List the main themes/topics for your campaign content..."
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Campaign
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Save Campaign
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    
    "newsletter": {
        title: "Newsletter Template",
        icon: Mail,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Newsletter Builder</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Enter compelling subject line..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Preheader Text</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Preview text that appears after subject..."
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Opening Message</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="3"
                                placeholder="Welcome message or greeting..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Main Content</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="8"
                                placeholder="Your newsletter content, updates, articles..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Call to Action</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="What action do you want readers to take?"
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Newsletter
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Preview & Send
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
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Promotion Type</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Discount/Sale</option>
                                    <option>New Product Launch</option>
                                    <option>Limited Time Offer</option>
                                    <option>Flash Sale</option>
                                    <option>Bundle Deal</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Offer Details</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="3"
                                placeholder="Describe your offer (discount %, product details, etc.)..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Body</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="6"
                                placeholder="Write your promotional message..."
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Call-to-Action Button</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Shop Now, Get Offer, Buy Today..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Element</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Limited Time</option>
                                    <option>Limited Quantity</option>
                                    <option>Countdown Timer</option>
                                    <option>While Supplies Last</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Email
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                A/B Test Version
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
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Type</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Post-Purchase</option>
                                    <option>Abandoned Cart</option>
                                    <option>Meeting Follow-up</option>
                                    <option>Lead Nurturing</option>
                                    <option>Customer Check-in</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Days Since Last Contact</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>1-2 days</option>
                                    <option>3-5 days</option>
                                    <option>1 week</option>
                                    <option>2 weeks</option>
                                    <option>1 month</option>
                                </select>
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Subject Line</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Following up on..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Interaction Context</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="3"
                                placeholder="Briefly describe the previous interaction or purchase..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Follow-up Message</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="6"
                                placeholder="Write your follow-up message..."
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Next Steps/Call to Action</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="What do you want them to do next?"
                            />
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Follow-up
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                Schedule Send
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    
    "ad-copy": {
        title: "Ad Copy Template",
        icon: Megaphone,
        content: (
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg border border-gray-200 p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Ad Copy Generator</h2>
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="What are you advertising?"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                                <input 
                                    type="text"
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    placeholder="Who is your ideal customer?"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Key Benefits</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="3"
                                placeholder="What are the main benefits of your product/service?"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Unique Selling Proposition</label>
                            <textarea 
                                className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                rows="2"
                                placeholder="What makes you different from competitors?"
                            />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Ad Platform</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Google Ads</option>
                                    <option>Facebook Ads</option>
                                    <option>Instagram Ads</option>
                                    <option>LinkedIn Ads</option>
                                    <option>Twitter Ads</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Goal</label>
                                <select className="w-full p-3 border border-gray-300 rounded-lg">
                                    <option>Drive Sales</option>
                                    <option>Generate Leads</option>
                                    <option>Increase Awareness</option>
                                    <option>App Downloads</option>
                                    <option>Website Traffic</option>
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex gap-3 pt-4">
                            <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                                Generate Ad Copy
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                                A/B Test Variants
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
    content: (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">Ad Headline Generator</h2>
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Product/Service</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="What are you promoting?"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Target Audience</label>
                            <input 
                                type="text"
                                className="w-full p-3 border border-gray-300 rounded-lg"
                                placeholder="Who is your ideal customer?"
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Key Benefit</label>
                        <textarea 
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            rows="2"
                            placeholder="What's the main benefit you want to highlight?"
                        />
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emotion to Evoke</label>
                        <select className="w-full p-3 border border-gray-300 rounded-lg">
                            <option>Urgency</option>
                            <option>Curiosity</option>
                            <option>Excitement</option>
                            <option>Trust</option>
                            <option>Fear of Missing Out</option>
                            <option>Exclusivity</option>
                        </select>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Headline Examples</label>
                        <div className="space-y-3">
                            {[
                                "Get [Benefit] Without [Pain Point]",
                                "The Secret to [Desired Outcome]",
                                "[Number] Ways to [Achieve Result]",
                                "Stop [Problem] Now With [Solution]",
                                "The [Adjective] Way to [Get Result]"
                            ].map((example, index) => (
                                <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                                    <p className="text-gray-700">{example}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="flex gap-3 pt-4">
                        <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg font-medium transition-colors">
                            Generate Headlines
                        </button>
                        <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                            Save Headlines
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
}