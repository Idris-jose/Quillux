import React, { useState } from 'react';
import { Copy, Check,FileText } from 'lucide-react';


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

export default function GeneratedContentPreview({ content, onClose, templateType }) {
    return (
        <div className=" p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-6">
               
                    <div className="flex items-center gap-2">
                            <FileText className="text-gray-600" size={20} />
                            <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                        </div>
                 
                        {content && (
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={CopyButton}
                                    className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                >
                                    <Copy size={16} />
                                    Copy
                                </button>
                              
                            </div>
                        )}
                </div>
              
                    <div className="bg-white rounded-lg border border-gray-200 h-[calc(100vh-280px)] overflow-hidden">
                        {content ? (
                            <div className="h-full overflow-y-auto">
                                <div className="p-6">
                                    <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans leading-relaxed">
                                        {content}
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
    );
}