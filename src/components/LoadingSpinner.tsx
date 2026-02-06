import React from 'react';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex items-center justify-center gap-3">
            <div className="relative">
                <div className="w-12 h-12 rounded-full border-4 border-indigo-200"></div>
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-4 border-transparent border-t-indigo-600 animate-spin"></div>
            </div>
            <span className="text-lg font-medium text-indigo-600">Submitting...</span>
        </div>
    );
};

export default LoadingSpinner;
