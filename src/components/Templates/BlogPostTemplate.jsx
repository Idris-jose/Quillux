import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function BlogPostTemplate() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);

  // State variables for error and success messages
        const [error, setError] = useState(null);
        const [success, setSuccess] = useState(null);

    const GEMINI_API_KEY = import.meta.env?.VITE_GEMINI_API_KEY;

    const generateContent = async (formData) => {
        setIsGenerating(true);
        
        // Check if API key is available
        if (!GEMINI_API_KEY) {
            setGeneratedContent("Error: Gemini API key not found. Please check your environment variables.");
            setShowPreview(true);
            setIsGenerating(false);
            return;
        }

        try {
            const prompt = `
Create a comprehensive blog post with the following specifications:

Title: ${formData.title || 'Untitled Blog Post'}
Target Audience: ${formData.audience || 'General audience'}
Tone: ${formData.tone || 'Professional'}
Main Points to Cover: ${formData.mainPoints || 'No specific points provided'}
SEO Keywords: ${formData.keywords || 'No keywords provided'}
Word Count: ${formData.wordCount || '500-800 words'}

Please structure the blog post with:
1. An engaging introduction
2. Clear headings and subheadings
3. Well-organized content covering the main points
4. A compelling conclusion
5. Natural integration of the provided keywords

Make sure the content matches the specified tone and is appropriate for the target audience.
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
            let errorMessage = "Error generating content. ";
            
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
                    name: 'title', 
                    label: 'Blog Title', 
                    placeholder: 'Enter your blog title...',
                    type: 'text'
                },
                { 
                    name: 'audience', 
                    label: 'Target Audience', 
                    placeholder: 'Who is this for? (e.g., beginners, professionals)',
                    type: 'text'
                }
            ]
        },
        {
            name: 'mainPoints',
            label: 'Main Points to Cover',
            type: 'textarea',
            rows: 4,
            placeholder: 'List the main points you want to cover:\n• Point 1\n• Point 2\n• Point 3'
        },
        {
            grid: true,
            items: [
                { 
                    name: 'keywords', 
                    label: 'SEO Keywords', 
                    placeholder: 'keyword1, keyword2, keyword3',
                    type: 'text'
                },
                {
                    name: 'wordCount', 
                    label: 'Word Count', 
                    type: 'select',
                    options: ['500-800 words', '800-1200 words', '1200-1500 words', '1500+ words']
                }
            ]
        },
        {
            name: 'tone',
            label: 'Writing Tone',
            type: 'select',
            options: ['Professional', 'Casual', 'Friendly', 'Authoritative', 'Conversational']
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
                      template={{ title: "Blog Post Generator" }}
                    fields={fields}
                    onGenerate={generateContent}
                    isGenerating={isGenerating}
                />
                 
                    <GeneratedContentPreview
                        content={generatedContent}
                        onClose={() => setShowPreview(false)}
                        templateType="blog-post"
                    />
              
            
            </div>
               
               
            </>
        );
}