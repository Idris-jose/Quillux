import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function SocialCampaignTemplate() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);

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
Create a comprehensive social media campaign with the following specifications:

Campaign Name: ${formData.campaignName || 'Unnamed Campaign'}
Campaign Goal: ${formData.campaignGoal || 'Brand Awareness'}
Target Audience: ${formData.audience || 'General audience'}
Platforms: ${formData.platforms || 'All major platforms'}
Campaign Duration: ${formData.duration || '1 month'}
Budget Range: ${formData.budget || 'Not specified'}
Key Message/Theme: ${formData.keyMessage || 'No specific message provided'}
Call-to-Action: ${formData.cta || 'Visit website'}

Please create a detailed social media campaign plan that includes:

1. CAMPAIGN OVERVIEW
   - Campaign objectives and KPIs
   - Target audience analysis
   - Key messaging strategy

2. CONTENT CALENDAR (Week-by-week breakdown)
   - Post types and formats
   - Posting schedule
   - Content themes

3. PLATFORM-SPECIFIC STRATEGY
   - Tailored content for each platform
   - Optimal posting times
   - Platform-specific features to utilize

4. CONTENT IDEAS (At least 10 specific post ideas)
   - Headlines/captions
   - Visual concepts
   - Hashtag suggestions

5. ENGAGEMENT STRATEGY
   - Community management approach
   - Response templates
   - User-generated content ideas

6. TRACKING & ANALYTICS
   - Key metrics to monitor
   - Reporting schedule
   - Success benchmarks

Make it actionable and ready to implement.
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
                throw new Error(`API request failed with status ${response.status}: ${response.status}`);
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
            let errorMessage = "Error generating campaign. ";
            
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
                    name: 'campaignName', 
                    label: 'Campaign Name', 
                    placeholder: 'Enter your campaign name...',
                    type: 'text'
                },
                {
                    name: 'campaignGoal', 
                    label: 'Campaign Goal', 
                    type: 'select',
                    options: ['Brand Awareness', 'Lead Generation', 'Sales/Conversions', 'Engagement', 'Website Traffic', 'Product Launch', 'Community Building']
                }
            ]
        },
        {
            grid: true,
            items: [
                { 
                    name: 'audience', 
                    label: 'Target Audience', 
                    placeholder: 'Describe your target audience (age, interests, demographics)',
                    type: 'text'
                },
                {
                    name: 'duration', 
                    label: 'Campaign Duration', 
                    type: 'select',
                    options: ['1 week', '2 weeks', '1 month', '2 months', '3 months', 'Ongoing']
                }
            ]
        },
        {
            name: 'platforms',
            label: 'Social Media Platforms',
            type: 'select',
            options: ['Facebook & Instagram', 'LinkedIn', 'Twitter/X', 'TikTok', 'YouTube', 'Pinterest', 'All Major Platforms', 'Custom Selection']
        },
        {
            name: 'keyMessage',
            label: 'Key Message/Theme',
            type: 'textarea',
            rows: 3,
            placeholder: 'What is the main message or theme of your campaign?'
        },
        {
            grid: true,
            items: [
                {
                    name: 'budget', 
                    label: 'Budget Range', 
                    type: 'select',
                    options: ['Under $500', '$500-$1,000', '$1,000-$5,000', '$5,000-$10,000', '$10,000+', 'Organic Only']
                },
                { 
                    name: 'cta', 
                    label: 'Primary Call-to-Action', 
                    placeholder: 'What action do you want people to take?',
                    type: 'text'
                }
            ]
        }
    ];

    return (
        <>
            <TemplateForm
                template={{ title: "Social Media Campaign Planner" }}
                fields={fields}
                onGenerate={generateContent}
                isGenerating={isGenerating}
            />
            {showPreview && (
                <GeneratedContentPreview
                    content={generatedContent}
                    onClose={() => setShowPreview(false)}
                    templateType="social-campaign"
                />
            )}
        </>
    );
}