import React from 'react';

interface AccordionProps {
    title: string;
    icon: string;
    isOpen: boolean;
    onToggle: () => void;
    children: React.ReactNode;
    hasErrors?: boolean;
}

const Accordion: React.FC<AccordionProps> = ({
    title,
    icon,
    isOpen,
    onToggle,
    children,
    hasErrors = false
}) => {
    return (
        <div className={`rounded-2xl overflow-hidden transition-all duration-300 ${isOpen
            ? 'bg-white shadow-xl shadow-indigo-500/10 ring-2 ring-indigo-500/20'
            : 'bg-white shadow-md hover:shadow-lg'
            } ${hasErrors ? 'ring-2 ring-red-500/50' : ''}`}>
            {/* Header */}
            <button
                type="button"
                onClick={onToggle}
                className={`w-full px-6 py-4 flex items-center justify-between transition-all duration-300 ${isOpen
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                    }`}
            >
                <div className="flex items-center gap-3">
                    <span className="text-2xl">{icon}</span>
                    <span className="font-semibold text-lg">{title}</span>

                </div>
                <div className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Content */}
            <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <div className="p-6">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Accordion;
