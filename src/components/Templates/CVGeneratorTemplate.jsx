import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function CVGeneratorTemplate() {
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
Create a professional CV/resume with the following specifications:

Personal Information:
- Full Name: ${formData.fullName || 'John Doe'}
- Job Title/Position: ${formData.jobTitle || 'Professional'}
- Email: ${formData.email || 'email@example.com'}
- Phone: ${formData.phone || '+1 (555) 123-4567'}
- Location: ${formData.location || 'City, Country'}
- LinkedIn/Portfolio: ${formData.links || 'Not provided'}

Professional Summary: ${formData.professionalSummary || 'Experienced professional seeking new opportunities'}

Work Experience: ${formData.workExperience || 'Previous roles and responsibilities'}

Education: ${formData.education || 'Educational background'}

Skills: ${formData.skills || 'Technical and soft skills'}

CV Style: ${formData.cvStyle || 'Modern Professional'}
Industry: ${formData.industry || 'General'}
Experience Level: ${formData.experienceLevel || 'Mid-level'}

Please create a comprehensive CV that includes:

1. HEADER SECTION
   - Professional contact information layout
   - Clear job title/professional brand
   - Modern formatting suggestions

2. PROFESSIONAL SUMMARY
   - Compelling 3-4 sentence summary
   - Key value propositions
   - Industry-specific keywords

3. WORK EXPERIENCE
   - Chronological format with clear job titles
   - Company names and employment dates
   - Achievement-focused bullet points
   - Quantified results where possible

4. EDUCATION SECTION
   - Degree, institution, and graduation year
   - Relevant coursework or honors (if applicable)
   - Professional certifications

5. SKILLS SECTION
   - Technical skills organized by category
   - Soft skills relevant to the role
   - Proficiency levels where appropriate

6. ADDITIONAL SECTIONS (if applicable)
   - Projects or portfolio highlights
   - Languages spoken
   - Professional associations
   - Volunteer experience

7. FORMATTING GUIDELINES
   - ATS-friendly structure
   - Professional typography suggestions
   - Section organization tips
   - Length recommendations

Make the CV professional, achievement-focused, and tailored to the specified industry and experience level.
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
            let errorMessage = "Error generating CV. ";
            
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
                    name: 'fullName', 
                    label: 'Full Name', 
                    placeholder: 'Enter your full name...',
                    type: 'text'
                },
                { 
                    name: 'jobTitle', 
                    label: 'Target Job Title', 
                    placeholder: 'Software Engineer, Marketing Manager, etc.',
                    type: 'text'
                }
            ]
        },
        {
            grid: true,
            items: [
                { 
                    name: 'email', 
                    label: 'Email Address', 
                    placeholder: 'your.email@example.com',
                    type: 'email'
                },
                { 
                    name: 'phone', 
                    label: 'Phone Number', 
                    placeholder: '+1 (555) 123-4567',
                    type: 'text'
                }
            ]
        },
        {
            grid: true,
            items: [
                { 
                    name: 'location', 
                    label: 'Location', 
                    placeholder: 'City, State/Country',
                    type: 'text'
                },
                { 
                    name: 'links', 
                    label: 'LinkedIn/Portfolio Links', 
                    placeholder: 'linkedin.com/in/yourname, portfolio.com',
                    type: 'text'
                }
            ]
        },
        {
            name: 'professionalSummary',
            label: 'Professional Summary',
            type: 'textarea',
            rows: 4,
            placeholder: 'Write a brief summary of your professional background, key achievements, and career objectives...'
        },
        {
            name: 'workExperience',
            label: 'Work Experience',
            type: 'textarea',
            rows: 6,
            placeholder: 'List your work experience including:\n• Job Title - Company Name (Start Date - End Date)\n• Key responsibilities and achievements\n• Quantified results where possible'
        },
        {
            grid: true,
            items: [
                {
                    name: 'industry', 
                    label: 'Industry/Field', 
                    type: 'select',
                    options: ['Technology/IT', 'Healthcare', 'Finance/Banking', 'Marketing/Advertising', 'Education', 'Engineering', 'Sales', 'Human Resources', 'Legal', 'Creative/Design', 'Consulting', 'General/Other']
                },
                {
                    name: 'experienceLevel', 
                    label: 'Experience Level', 
                    type: 'select',
                    options: ['Entry Level (0-2 years)', 'Mid-Level (3-5 years)', 'Senior Level (6-10 years)', 'Executive Level (10+ years)', 'Career Change']
                }
            ]
        },
        {
            name: 'education',
            label: 'Education',
            type: 'textarea',
            rows: 3,
            placeholder: 'List your educational background:\n• Degree - University Name (Graduation Year)\n• Relevant coursework, honors, GPA (if recent graduate)'
        },
        {
            name: 'skills',
            label: 'Skills',
            type: 'textarea',
            rows: 4,
            placeholder: 'List your technical and soft skills:\n• Technical Skills: Programming languages, software, tools\n• Soft Skills: Leadership, communication, problem-solving\n• Languages: English (Native), Spanish (Fluent)'
        },
        {
            name: 'cvStyle',
            label: 'CV Style',
            type: 'select',
            options: ['Modern Professional', 'Traditional/Conservative', 'Creative/Design-focused', 'ATS-Optimized', 'Academic/Research', 'Executive/Leadership']
        }
    ];

    return (
        <>
            <TemplateForm
                template={{ title: "Professional CV Generator" }}
                fields={fields}
                onGenerate={generateContent}
                isGenerating={isGenerating}
            />
            {showPreview && (
                <GeneratedContentPreview
                    content={generatedContent}
                    onClose={() => setShowPreview(false)}
                    templateType="cv-resume"
                />
            )}
        </>
    );
}