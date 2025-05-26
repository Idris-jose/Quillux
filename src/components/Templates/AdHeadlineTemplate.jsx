import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function AdHeadlineTemplate() {

        const [isGenerating, setIsGenerating] = useState(false);
        const [generatedContent, setGeneratedContent] = useState('');
        const [showPreview, setShowPreview] = useState(false);

        const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

        const generateContent = async (formData) => {
            setIsGenerating(true);

            try {
                const prompt = `
Generate 10 compelling ad headlines with the following specifications:

Product/Service: ${formData.product || 'Not specified'}
Target Audience: ${formData.audience || 'General audience'}
Key Benefit: ${formData.benefit || 'Not specified'}
Emotion to Evoke: ${formData.emotion || 'Not specified'}
Headline Style: ${formData.style || 'Various'}

Please create:
1. A variety of headline styles (questions, statements, how-tos, etc.)
2. Headlines optimized for ${formData.platform || 'general'} advertising
3. Headlines that incorporate the key benefit
4. Headlines that evoke ${formData.emotion || 'the desired emotion'}
5. Headlines between 5-10 words each

Format the output as a numbered list with brief explanations for each headline.
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
                    { name: 'product', label: 'Product/Service', placeholder: 'What are you promoting?' },
                    { name: 'audience', label: 'Target Audience', placeholder: 'Who is your ideal customer?' }
                ]
            },
            {
                name: 'benefit',
                label: 'Key Benefit',
                type: 'textarea',
                rows: 2,
                placeholder: "What's the main benefit you want to highlight?"
            },
            {
                grid: true,
                items: [
                    { 
                        name: 'emotion', 
                        label: 'Emotion to Evoke', 
                        type: 'select',
                        options: ['Urgency', 'Curiosity', 'Excitement', 'Trust', 'Fear of Missing Out', 'Exclusivity']
                    },
                    { 
                        name: 'platform', 
                        label: 'Platform', 
                        type: 'select',
                        options: ['Google Ads', 'Facebook/Instagram', 'LinkedIn', 'Twitter/X', 'General']
                    }
                ]
            },
            {
                name: 'style',
                label: 'Headline Style Preference',
                type: 'select',
                options: ['Various', 'Questions', 'How-To', 'List', 'Direct', 'Testimonial-style']
            }
        ];

        return (
            <>
                <TemplateForm 
                    template={{ title: "Ad Headline Generator" }}
                    fields={fields}
                    onGenerate={generateContent}
                    isGenerating={isGenerating}
                />
                {showPreview && (
                    <GeneratedContentPreview
                        content={generatedContent}
                        onClose={() => setShowPreview(false)}
                        templateType="ad-headline"
                    />
                )}
            </>
        );
 
}