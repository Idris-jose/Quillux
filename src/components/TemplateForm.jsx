import React, { useState } from 'react';

const TemplateForm = ({ template, fields, onGenerate, isGenerating }) => {
    const [formData, setFormData] = useState({});

    const handleInputChange = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = () => {
        onGenerate(formData);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">{template.title}</h2>
                <div className="space-y-6">
                    {fields.map((field, index) => (
                        <div key={index} className={field.grid ? "grid grid-cols-1 md:grid-cols-2 gap-6" : ""}>
                            {field.grid ? (
                                field.items.map((item, itemIndex) => (
                                    <div key={itemIndex}>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            {item.label}
                                        </label>
                                        {item.type === 'select' ? (
                                            <select
                                                className="w-full p-3 border border-gray-300 rounded-lg"
                                                value={formData[item.name] || ''}
                                                onChange={(e) => handleInputChange(item.name, e.target.value)}
                                            >
                                                {item.options.map((option, optIndex) => (
                                                    <option key={optIndex} value={option}>{option}</option>
                                                ))}
                                            </select>
                                        ) : (
                                            <input
                                                type={item.type || 'text'}
                                                className="w-full p-3 border border-gray-300 rounded-lg"
                                                placeholder={item.placeholder}
                                                value={formData[item.name] || ''}
                                                onChange={(e) => handleInputChange(item.name, e.target.value)}
                                            />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        {field.label}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                                            rows={field.rows || 4}
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        >
                                            {field.options.map((option, optIndex) => (
                                                <option key={optIndex} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type={field.type || 'text'}
                                            className="w-full p-3 border border-gray-300 rounded-lg"
                                            placeholder={field.placeholder}
                                            value={formData[field.name] || ''}
                                            onChange={(e) => handleInputChange(field.name, e.target.value)}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={handleSubmit}
                            disabled={isGenerating}
                            className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-orange-400 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
                        >
                            {isGenerating ? "Generating..." : "Generate Content"}
                        </button>
                        <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors">
                            Save Draft
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateForm;
