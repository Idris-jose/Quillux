import React, { useState } from 'react';
import TemplateForm from '../TemplateForm.jsx';
import GeneratedContentPreview from '../GeneratedContentPreview.jsx';

export default function FollowupEmailTemplate() {
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
Create a professional follow-up email with the following specifications:

Follow-up Type: ${formData.followupType || 'General Follow-up'}
Context/Background: ${formData.context || 'Previous interaction'}
Recipient: ${formData.recipient || 'Client/Customer'}
Primary Goal: ${formData.primaryGoal || 'Maintain engagement'}
Tone: ${formData.tone || 'Professional'}
Timeline: ${formData.timeline || 'Within a week'}
Next Steps: ${formData.nextSteps || 'Schedule next meeting'}
Additional Information: ${formData.additionalInfo || 'None specified'}

Please create a complete follow-up email that includes:

1. SUBJECT LINE OPTIONS (Provide 3 variations)
   - Professional and clear subject lines
   - Reference to previous interaction
   - Action-oriented where appropriate

2. EMAIL CONTENT
   - Personalized opening
   - Reference to previous interaction/meeting
   - Clear purpose of follow-up
   - Value-added information or resources
   - Specific next steps or call-to-action
   - Professional closing

3. TIMING & APPROACH
   - Recommended send timing
   - Follow-up sequence suggestions
   - Personalization tips

4. ADDITIONAL ELEMENTS
   - Suggested attachments or resources
   - Meeting scheduling options
   - Alternative communication methods

Make the email professional, helpful, and action-oriented while maintaining the appropriate tone for the relationship and context.
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
            let errorMessage = "Error generating follow-up email. ";
            
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
                    name: 'followupType', 
                    label: 'Follow-up Type', 
                    type: 'select',
                    options: ['Post-Purchase', 'Abandoned Cart Recovery', 'Meeting Follow-up', 'Proposal Follow-up', 'Event Follow-up', 'Customer Check-in', 'Sales Follow-up', 'Support Follow-up']
                },
                {
                    name: 'recipient', 
                    label: 'Recipient Type', 
                    type: 'select',
                    options: ['Client/Customer', 'Prospect', 'Business Partner', 'Team Member', 'Vendor/Supplier', 'Event Attendee']
                }
            ]
        },
        {
            name: 'context',
            label: 'Context/Background',
            type: 'textarea',
            rows: 3,
            placeholder: 'Describe the previous interaction, meeting, or context that requires follow-up...'
        },
        {
            grid: true,
            items: [
                {
                    name: 'primaryGoal', 
                    label: 'Primary Goal', 
                    type: 'select',
                    options: ['Maintain Engagement', 'Schedule Next Meeting', 'Close Sale', 'Gather Feedback', 'Provide Updates', 'Resolve Issues', 'Nurture Relationship']
                },
                {
                    name: 'timeline', 
                    label: 'Response Timeline', 
                    type: 'select',
                    options: ['ASAP', 'Within 24 hours', 'Within a week', 'Within 2 weeks', 'Flexible', 'End of month']
                }
            ]
        },
        {
            name: 'nextSteps',
            label: 'Desired Next Steps',
            type: 'textarea',
            rows: 2,
            placeholder: 'What specific actions do you want the recipient to take?'
        },
        {
            grid: true,
            items: [
                {
                    name: 'tone', 
                    label: 'Email Tone', 
                    type: 'select',
                    options: ['Professional', 'Friendly', 'Formal', 'Casual', 'Helpful', 'Urgent']
                },
                { 
                    name: 'additionalInfo', 
                    label: 'Additional Context', 
                    placeholder: 'Any other relevant information...',
                    type: 'text'
                }
            ]
        }
    ];

    return (
        <>
            <TemplateForm
                template={{ title: "Follow-up Email Generator" }}
                fields={fields}
                onGenerate={generateContent}
                isGenerating={isGenerating}
            />
            {showPreview && (
                <GeneratedContentPreview
                    content={generatedContent}
                    onClose={() => setShowPreview(false)}
                    templateType="followup-email"
                />
            )}
        </>
    );
}