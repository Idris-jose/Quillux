import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';
import toast, { Toaster } from 'react-hot-toast';

export default function BlogOutlineTemplate() {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedContent, setGeneratedContent] = useState('');
    const [showPreview, setShowPreview] = useState(false);

      // State variables for error and success messages
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
Create a comprehensive blog outline with the following specifications:

Topic/Title: ${formData.topic || 'Untitled Blog Topic'}
Target Audience: ${formData.audience || 'General audience'}
Content Type: ${formData.contentType || 'Informational'}
Blog Length: ${formData.blogLength || 'Medium (800-1200 words)'}
Key Points to Cover: ${formData.keyPoints || 'No specific points provided'}
SEO Focus Keywords: ${formData.keywords || 'No keywords provided'}

Please create a detailed blog outline that includes:
1. A compelling title (provide 3 alternative options)
2. Introduction hook and overview
3. Main sections with clear H2 headings
4. Subsections with H3 headings where appropriate
5. Key points to cover in each section
6. Suggested word count for each section
7. Call-to-action ideas for the conclusion
8. Meta description suggestion (150-160 characters)

Structure the outline in a clear, hierarchical format that's easy to follow when writing the actual blog post.
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
            let errorMessage = "Error generating outline. ";
            
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
            setSuccess('Appointment booked successfully!');
    toast.success('Appointment booked successfully!');
        }
    };

    const fields = [
        {
            grid: true,
            items: [
                { 
                    name: 'topic', 
                    label: 'Blog Topic/Title', 
                    placeholder: 'Enter your blog topic or working title...',
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
            name: 'keyPoints',
            label: 'Key Points to Cover',
            type: 'textarea',
            rows: 4,
            placeholder: 'List the main points you want to cover:\n• Point 1\n• Point 2\n• Point 3'
        },
        {
            grid: true,
            items: [
                {
                    name: 'contentType', 
                    label: 'Content Type', 
                    type: 'select',
                    options: ['Informational', 'How-to Guide', 'Listicle', 'Case Study', 'Opinion/Editorial', 'Product Review']
                },
                {
                    name: 'blogLength', 
                    label: 'Target Blog Length', 
                    type: 'select',
                    options: ['Short (500-800 words)', 'Medium (800-1200 words)', 'Long (1200-1800 words)', 'Comprehensive (1800+ words)']
                }
            ]
        },
        {
            name: 'keywords',
            label: 'SEO Focus Keywords',
            type: 'text',
            placeholder: 'keyword1, keyword2, keyword3'
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
                template={{ title: "Blog Outline Generator" }}
                fields={fields}
                onGenerate={generateContent}
                isGenerating={isGenerating}
            />
             
                <GeneratedContentPreview
                    content={generatedContent}
                    onClose={() => setShowPreview(false)}
                    templateType="blog-outline"
                />
          
        
        </div>
           
           
        </>
    );
}