import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

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

export default function GeneratedContentPreview({ content, onClose, templateType }) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex justify-between items-center">
                    <h3 className="text-xl font-bold">Generated Content</h3>
                    <div className="flex gap-2">
                        <CopyButton text={content} />
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
                <div className="p-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="whitespace-pre-wrap text-sm text-gray-800 font-mono">
                            {content}
                        </pre>
                    </div>
                </div>
            </div>
        </div>
    );
}