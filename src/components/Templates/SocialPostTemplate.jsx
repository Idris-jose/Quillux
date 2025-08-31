import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function SocialPostTemplate () {
            const [isGenerating, setIsGenerating] = useState(false);
            const [generatedContent, setGeneratedContent] = useState('');
            const [showPreview, setShowPreview] = useState(false);

             const [error, setError] = useState(null);
                    const [success, setSuccess] = useState(null);

            const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

            const generateContent = async (formData) => {
                setIsGenerating(true);

                try {
                    const prompt = `
Create an engaging social media post with the following specifications:

Platform: ${formData.platform || 'Instagram'}
Post Type: ${formData.postType || 'General'}
Topic/Message: ${formData.topic || 'Not specified'}
Target Audience: ${formData.audience || 'General audience'}
Tone: ${formData.tone || 'Engaging'}
Call to Action: ${formData.cta || 'Engage with the post'}
Hashtags: ${formData.hashtags || 'Include relevant hashtags'}

Please create:
1. An engaging caption appropriate for ${formData.platform || 'the platform'}
2. Relevant hashtags
3. A clear call to action

Make it platform-optimized, engaging, and likely to generate interaction.
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
                        { 
                            name: 'platform', 
                            label: 'Platform', 
                            type: 'select',
                            options: ['Instagram', 'Twitter/X', 'Facebook', 'LinkedIn', 'TikTok']
                        },
                        { 
                            name: 'postType', 
                            label: 'Post Type', 
                            type: 'select',
                            options: ['Promotional', 'Educational', 'Entertainment', 'Behind-the-scenes', 'User-generated content']
                        }
                    ]
                },
                {
                    name: 'topic',
                    label: 'Topic/Message',
                    type: 'textarea',
                    rows: 3,
                    placeholder: 'What do you want to share?'
                },
                {
                    grid: true,
                    items: [
                        { name: 'audience', label: 'Target Audience', placeholder: 'Who is your target audience?' },
                        { 
                            name: 'tone', 
                            label: 'Tone', 
                            type: 'select',
                            options: ['Engaging', 'Professional', 'Casual', 'Funny', 'Inspirational', 'Educational']
                        }
                    ]
                },
                {
                    name: 'cta',
                    label: 'Call to Action',
                    placeholder: 'What do you want your audience to do?'
                },
                {
                    name: 'hashtags',
                    label: 'Hashtag Preferences',
                    placeholder: 'Any specific hashtags or topics to include?'
                }
            ];


            return (
            <> 
            <div className="flex flex-col lg:flex-row min-h-[calc(100vh-140px)]">
                     {/* Status messages */}
                           {error && (
                             <div
                               className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 my-4"
                               role="alert"
                             >
                               <div className="flex items-center">
                                 <AlertCircle className="mr-2" size={20} />
                                 <p>{error}</p>
                               </div>
                             </div>
                           )}
                     
                           {/* Success message */}
                           {success && (
                             <div
                               className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 my-4"
                               role="alert"
                             >
                               <div className="flex items-center">
                                 <CheckCircle className="mr-2" size={20} />
                                 <p>{success}</p>
                               </div>
                             </div>
                           )}
                     
    
                 <TemplateForm
                    template={{ title: "Social Media Post Generator" }}
                    fields={fields}
                    onGenerate={generateContent}
                    isGenerating={isGenerating}
                />
                 
                    <GeneratedContentPreview
                        content={generatedContent}
                        onClose={() => setShowPreview(false)}
                         templateType="social-post"
                    />
              
            
            </div>
               
               
            </>
        );
        }