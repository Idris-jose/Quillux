import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function AdCopyTemplate() {

            const [isGenerating, setIsGenerating] = useState(false);
            const [generatedContent, setGeneratedContent] = useState('');
            const [showPreview, setShowPreview] = useState(false);

            const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

            const generateContent = async (formData) => {
                setIsGenerating(true);

                try {
                    const prompt = `
Create compelling ad copy with the following specifications:

Product/Service: ${formData.product || 'Not specified'}
Target Audience: ${formData.audience || 'General audience'}
Key Benefits: ${formData.benefits || 'Not specified'}
Unique Selling Proposition: ${formData.usp || 'Not specified'}
Ad Platform: ${formData.platform || 'Google Ads'}
Campaign Goal: ${formData.goal || 'Drive Sales'}
Tone: ${formData.tone || 'Persuasive'}
Call to Action: ${formData.cta || 'Take action now'}

Please create:
1. A compelling headline
2. Engaging ad copy body
3. Strong call to action
4. Multiple variations for A/B testing

Make it persuasive, benefit-focused, and optimized for ${formData.platform || 'the platform'}.
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
                        { name: 'product', label: 'Product/Service', placeholder: 'What are you advertising?' },
                        { name: 'audience', label: 'Target Audience', placeholder: 'Who is your ideal customer?' }
                    ]
                },
                {
                    name: 'benefits',
                    label: 'Key Benefits',
                    type: 'textarea',
                    rows: 3,
                    placeholder: 'What are the main benefits of your product/service?'
                },
                {
                    name: 'usp',
                    label: 'Unique Selling Proposition',
                    type: 'textarea',
                    rows: 2,
                    placeholder: 'What makes you different from competitors?'
                },
                {
                    grid: true,
                    items: [
                        { 
                            name: 'platform', 
                            label: 'Ad Platform', 
                            type: 'select',
                            options: ['Google Ads', 'Facebook Ads', 'Instagram Ads', 'LinkedIn Ads', 'Twitter Ads']
                        },
                        { 
                            name: 'goal', 
                            label: 'Campaign Goal', 
                            type: 'select',
                            options: ['Drive Sales', 'Generate Leads', 'Increase Awareness', 'App Downloads', 'Website Traffic']
                        }
                    ]
                },
                {
                    grid: true,
                    items: [
                        { name: 'cta', label: 'Call to Action', placeholder: 'What action do you want people to take?' },
                        { 
                            name: 'tone', 
                            label: 'Tone', 
                            type: 'select',
                            options: ['Persuasive', 'Urgent', 'Professional', 'Friendly', 'Bold', 'Trustworthy']
                        }
                    ]
                }
            ];

            return (
                <>
                    <TemplateForm 
                        template={{ title: "Ad Copy Generator" }}
                        fields={fields}
                        onGenerate={generateContent}
                        isGenerating={isGenerating}
                    />
                    {showPreview && (
                        <GeneratedContentPreview
                            content={generatedContent}
                            onClose={() => setShowPreview(false)}
                            templateType="ad-copy"
                        />
                    )}
                </>
            );
        
    }