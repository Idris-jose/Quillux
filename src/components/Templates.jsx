
import { useState } from 'react';
import { Data } from './Datacards/TemplateData';
import { ArrowLeft, Sparkles, FileText, Send, Download, Copy, RefreshCw } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

// Content Generation Interface Component
const ContentGenerator = ({ template, onBack }) => {
       const [error, setError] = useState(null);
          const [success, setSuccess] = useState(null);
    const [formData, setFormData] = useState({
        topic: '',
        audience: '',
        tone: 'professional',
        length: 'medium',
        additionalInfo: ''
    });
    const [generatedContent, setGeneratedContent] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const toneOptions = [
        { value: 'professional', label: 'Professional' },
        { value: 'casual', label: 'Casual' },
        { value: 'friendly', label: 'Friendly' },
        { value: 'persuasive', label: 'Persuasive' },
        { value: 'informative', label: 'Informative' },
        { value: 'creative', label: 'Creative' }
    ];

    const lengthOptions = [
        { value: 'short', label: 'Short (100-300 words)' },
        { value: 'medium', label: 'Medium (300-600 words)' },
        { value: 'long', label: 'Long (600+ words)' }
    ];

    // Mock content generation - replace with actual Gemini API call
    import.meta.env; // Ensure Vite env import for context (if using Vite)

    const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

    const generateContent = async () => {
        setIsGenerating(true);

        try {
            
            const prompt = `
    Template: ${template.Title}
    Topic: ${formData.topic}
    Audience: ${formData.audience}
    Tone: ${formData.tone}
    Length: ${formData.length}
    Additional Info: ${formData.additionalInfo}
    Generate content based on the above.
            `.trim();

           const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Failed to generate content.";
            setGeneratedContent(text);
            setShowPreview(true);
        } catch (error) {
            console.error('Generation failed:', error);
            setGeneratedContent("An error occurred while generating content.");
            setError('Failed to generate content. Please try again.');
            toast.error('Failed to generate content. Please try again.')
        } finally {
            setIsGenerating(false);
             setSuccess('Content generated successfully!');
    toast.success('Content generated successfully!');
        }
    };

   

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedContent);
            toast.success('Content copied to clipboard!');
        } catch (error) {
            console.error('Failed to copy:', error);
            toast.error('Failed to copy content');
        }
    };

    const downloadAsFile = () => {
        const blob = new Blob([generatedContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${template.Title.replace(/\s+/g, '-').toLowerCase()}-content.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            {/* Header */}
            <div className="bg-white border-b border-gray-200 p-6">
                <div className="flex items-center gap-4 mb-4">
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                        <ArrowLeft size={20} />
                        Back to Templates
                    </button>
                    <div className="h-6 w-px bg-gray-300"></div>
                    <div className="flex items-center gap-2">
                        <template.icon className="text-orange-600" size={20} />
                        <span className="text-orange-600 text-sm font-medium">{template.subtitle}</span>
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-gray-900">{template.Title}</h1>
                <p className="text-gray-600 mt-1">{template.Subtext}</p>
                
                {/* Template Tags */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {template.tags.map((tag, idx) => (
                        <span 
                            key={idx}
                            className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
                {/* Content Generation Form */}
                <div className="lg:w-1/2 p-6 bg-white border-r border-gray-200">
                    <div className="flex items-center gap-2 mb-6">
                        <Sparkles className="text-orange-600" size={20} />
                        <h2 className="text-lg font-semibold text-gray-900">Generate Content</h2>
                    </div>

                    <div className="space-y-6">
                        {/* Topic/Subject */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Topic/Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.topic}
                                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                                placeholder="What do you want to write about?"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            />
                        </div>

                        {/* Target Audience */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Target Audience
                            </label>
                            <input
                                type="text"
                                value={formData.audience}
                                onChange={(e) => setFormData({...formData, audience: e.target.value})}
                                placeholder="Who is your target audience?"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            />
                        </div>

                        {/* Tone */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Tone & Style
                            </label>
                            <select
                                value={formData.tone}
                                onChange={(e) => setFormData({...formData, tone: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            >
                                {toneOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Length */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Content Length
                            </label>
                            <select
                                value={formData.length}
                                onChange={(e) => setFormData({...formData, length: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                            >
                                {lengthOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                                Additional Information (Optional)
                            </label>
                            <textarea
                                value={formData.additionalInfo}
                                onChange={(e) => setFormData({...formData, additionalInfo: e.target.value})}
                                placeholder="Any specific requirements, keywords, or additional context..."
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                            />
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateContent}
                            disabled={!formData.topic || isGenerating}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isGenerating ? (
                                <>
                                    <RefreshCw size={20} className="animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    Generate Content
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Preview Panel */}
                <div className="lg:w-1/2 p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-2">
                            <FileText className="text-gray-600" size={20} />
                            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                        </div>
                        
                        {generatedContent && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <Copy size={16} />
                                    Copy
                                </button>
                                <button
                                    onClick={downloadAsFile}
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <Download size={16} />
                                    Download
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-white rounded-lg border border-gray-200 h-[calc(100vh-280px)] overflow-hidden">
                        {generatedContent ? (
                            <div className="h-full overflow-y-auto">
                                <div className="p-6">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                                        {generatedContent}
                                    </pre>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center text-center p-6">
                                <div>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FileText className="text-gray-400" size={24} />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No content generated yet</h3>
                                    <p className="text-gray-600 text-sm">
                                        Fill out the form and click "Generate Content" to see your AI-powered content here.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Updated Template Component
export default function Template() {
    const Navs = ["All", "Blog", "Social", "Email", "Adcopy"];
    const [selectedNav, setSelectedNav] = useState("All");
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showGenerator, setShowGenerator] = useState(false);
   
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

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        setShowGenerator(true);
    };

    const handleBackToTemplates = () => {
        setShowGenerator(false);
        setSelectedTemplate(null);
    };

    const currentTemplates = getCurrentTemplates();

    // Show content generator if template is selected
    if (showGenerator && selectedTemplate) {
        return (
            <ContentGenerator 
                template={selectedTemplate} 
                onBack={handleBackToTemplates}
            />
        );
    }

    // Show template selection interface
    return (
        <div className="p-6 bg-white min-h-screen">
            <h1 className="text-3xl font-bold mb-2 text-black">Create Pieces that Captivate</h1>
            <p className="text-gray-600 mb-6">Choose from our professionally crafted Genres to jumpstart your content creation.</p>
            
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
                            
                            <button 
                                onClick={() => handleTemplateSelect(item)}
                                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded font-medium text-white transition-colors mt-auto"
                            >
                                Create
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