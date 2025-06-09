import React, { useState } from 'react';
import { Menu, X, Home, FileText, Layers, BarChart2, Book } from 'lucide-react';

const navItems = [
     { title: 'Home', route: '/Home', icon: <Home size={18} /> },
    { title: 'Templates', route: '/create', icon: <Layers size={18} /> },
    { title: 'Create', route: '/templates', icon: <FileText size={18} />  },
    { title: 'Analytics', route: '/analytics', icon: <BarChart2 size={18} /> },
    { title: 'Library', route: '/library', icon: <Book size={18} /> },
];

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeRoute, setActiveRoute] = useState(window.location.pathname);

    const handleNavClick = (route) => {
        setActiveRoute(route);
        setIsOpen(false); // Optionally close sidebar on mobile
    };

    return (
        <>
            {/* Hamburger Menu Button for Mobile */}
            <button
                className="md:hidden p-2 bg-gray-100 rounded fixed top-4 left-4 z-50"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <div
                className={`${
                    isOpen ? 'block' : 'hidden'
                } md:block w-64 h-screen bg-gray-100 fixed p-4 transition-all duration-300 z-40`}
            >
                <h2 className="text-xl font-bold mb-4 text-orange-600">Quillux</h2>
                <nav>
                    {navItems.map((item) => (
                        <a
                            key={item.title}
                            href={item.route}
                            onClick={() => handleNavClick(item.route)}
                            className={`block p-2 text-gray-800 hover:bg-gray-300 rounded mb-2 ${
                                activeRoute === item.route ? 'bg-gray-200 font-semibold' : ''
                            }`}
                        >
                            <div className='flex items-center gap-2'>
                                {item.icon}
                                <span className="ml-2 font-medium">{item.title}</span>
                            </div>
                            
                        </a>
                    ))}
                </nav>
            </div>

            {/* Overlay for mobile when sidebar is open */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black opacity-50 z-30"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default Sidebar;