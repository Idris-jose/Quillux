import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function NewsletterTemplate() {
            const [isGenerating, setIsGenerating] = useState(false);
            const [generatedContent, setGeneratedContent] = useState('');
            const [showPreview, setShowPreview] = useState(false);

            const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

            const generateContent = async (formData) => {
                setIsGenerating(true);

                try {
                    const prompt = `
Create a professional newsletter with the following details:

Newsletter Topic: ${formData.topic || 'Not specified'}
Target Audience: ${formData.audience || 'General subscribers'}
Tone: ${formData.tone || 'Professional'}
Main Content: ${formData.content || 'Not specified'}
Call to Action: ${formData.cta || 'Engage with our content'}
Company/Brand: ${formData.brand || 'Not specified'}

Please create:
1. A compelling subject line
2. A preheader text
3. An engaging opening
4. Well-structured main content
5. A clear call to action
6. Professional closing

Make it engaging, valuable to readers, and formatted for email.
                    `.trim();

                    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`, {
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
                    setGeneratedContent("An error occurred while generating content. Please check your API key and try again.");
                    setShowPreview(true);
                } finally {
                    setIsGenerating(false);
                }
            };

            const fields = [
                {
                    grid: true,
                    items: [
                        { name: 'topic', label: 'Newsletter Topic', placeholder: 'Main topic or theme' },
                        { name: 'brand', label: 'Company/Brand', placeholder: 'Your company name' }
                    ]
                },
                {
                    name: 'audience',
                    label: 'Target Audience',
                    placeholder: 'Who are your subscribers?'
                },
                {
                    name: 'content',
                    label: 'Main Content Points',
                    type: 'textarea',
                    rows: 6,
                    placeholder: 'Key points, updates, or articles to include...'
                },
                {
                    grid: true,
                    items: [
                        { name: 'cta', label: 'Call to Action', placeholder: 'What action do you want readers to take?' },
                        { 
                            name: 'tone', 
                            label: 'Tone', 
                            type: 'select',
                            options: ['Professional', 'Friendly', 'Casual', 'Formal', 'Conversational']
                        }
                    ]
                }
            ];

            return (
                <>
                    <TemplateForm 
                        template={{ title: "Newsletter Generator" }}
                        fields={fields}
                        onGenerate={generateContent}
                        isGenerating={isGenerating}
                    />
                    {showPreview && (
                        <GeneratedContentPreview
                            content={generatedContent}
                            onClose={() => setShowPreview(false)}
                            templateType="newsletter"
                        />
                    )}
                </>
            );
        
    }