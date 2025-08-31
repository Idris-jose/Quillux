import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function PromotionalEmailTemplate() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);

          const [error, setError] = useState(null);
                         const [success, setSuccess] = useState(null);
     

    const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

    const generateContent = async (formData) => {
        setIsGenerating(true);
        
        if (!GEMINI_API_KEY) {
            setGeneratedContent("Error: Gemini API key not found. Please check your environment variables.");
            setShowPreview(true);
            setIsGenerating(false);
            return;
        }

        try {
            const prompt = `
Create a compelling promotional email with the following specifications:

Email Type: ${formData.emailType || 'Product Promotion'}
Subject Line Style: ${formData.subjectStyle || 'Urgency-driven'}
Target Audience: ${formData.audience || 'General customers'}
Product/Service: ${formData.productService || 'Not specified'}
Offer/Promotion: ${formData.offer || 'Special discount'}
Call-to-Action: ${formData.cta || 'Shop Now'}
Tone: ${formData.tone || 'Friendly'}
Email Length: ${formData.emailLength || 'Medium (150-250 words)'}

Please create a complete promotional email that includes:

1. SUBJECT LINE OPTIONS (Provide 3 variations)
   - Main subject line with urgency/benefit
   - Alternative options for A/B testing

2. EMAIL CONTENT
   - Compelling opening hook
   - Clear value proposition
   - Benefits-focused content
   - Social proof elements (if applicable)
   - Strong call-to-action
   - Professional closing

3. TECHNICAL ELEMENTS
   - Preheader text suggestion
   - Recommended send time
   - Mobile optimization notes

4. ADDITIONAL ELEMENTS
   - Follow-up email suggestions
   - Segmentation recommendations
   - A/B testing ideas

Make the email persuasive, action-oriented, and optimized for conversions while maintaining the specified tone.
            `;

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`,
                {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        contents: [{ 
                            parts: [{ text: prompt }] 
                        }]
                    })
                }
            );

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
            }

            const data = await response.json();
            
            if (data.error) {
                throw new Error(`API Error: ${data.error.message || 'Unknown error'}`);
            }

            const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            
            if (!content) {
                throw new Error('No content generated from API response');
            }

            setGeneratedContent(content);
            setShowPreview(true);

        } catch (error) {
            console.error('Content generation error:', error);
            let errorMessage = "Error generating email. ";
            
            if (error.message.includes('API request failed')) {
                errorMessage += "Please check your API key and try again.";
            } else if (error.message.includes('fetch')) {
                errorMessage += "Network error. Please check your internet connection.";
            } else {
                errorMessage += error.message || "Unknown error occurred.";
            }
            
            setGeneratedContent(errorMessage);
            setShowPreview(true);
        } finally {
            setIsGenerating(false);
        }
    };

    const fields = [
        {
            grid: true,
            items: [
                {
                    name: 'emailType', 
                    label: 'Email Type', 
                    type: 'select',
                    options: ['Product Promotion', 'Service Announcement', 'Sale/Discount', 'New Launch', 'Limited Time Offer', 'Seasonal Campaign']
                },
                {
                    name: 'subjectStyle', 
                    label: 'Subject Line Style', 
                    type: 'select',
                    options: ['Urgency-driven', 'Benefit-focused', 'Curiosity-driven', 'Personal/Direct', 'Question-based', 'Number/Statistic']
                }
            ]
        },
        {
            grid: true,
            items: [
                { 
                    name: 'productService', 
                    label: 'Product/Service', 
                    placeholder: 'What are you promoting?',
                    type: 'text'
                },
                { 
                    name: 'audience', 
                    label: 'Target Audience', 
                    placeholder: 'Who is receiving this email?',
                    type: 'text'
                }
            ]
        },
        {
            name: 'offer',
            label: 'Offer/Promotion Details',
            type: 'textarea',
            rows: 3,
            placeholder: 'Describe the offer, discount, or promotion details...'
        },
        {
            grid: true,
            items: [
                { 
                    name: 'cta', 
                    label: 'Call-to-Action', 
                    placeholder: 'Shop Now, Learn More, Get Started...',
                    type: 'text'
                },
                {
                    name: 'tone', 
                    label: 'Email Tone', 
                    type: 'select',
                    options: ['Friendly', 'Professional', 'Urgent', 'Casual', 'Luxury/Premium', 'Helpful']
                }
            ]
        },
        {
            name: 'emailLength',
            label: 'Email Length',
            type: 'select',
            options: ['Short (50-100 words)', 'Medium (150-250 words)', 'Long (300-400 words)']
        }
    ];

    return (
        <>
            <TemplateForm
                template={{ title: "Promotional Email Generator" }}
                fields={fields}
                onGenerate={generateContent}
                isGenerating={isGenerating}
            />
            {showPreview && (
                <GeneratedContentPreview
                    content={generatedContent}
                    onClose={() => setShowPreview(false)}
                    templateType="promotional-email"
                />
            )}
        </>
    );
}