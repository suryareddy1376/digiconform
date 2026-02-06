import React from 'react';

interface SuccessMessageProps {
    onReset: () => void;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReset }) => {
    return (
        <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 mb-6 animate-bounce-slow">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mb-4">
                🎉 Registration Successful!
            </h2>

            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Your team has been successfully registered for <span className="font-semibold text-indigo-600">DIGICON 4.0</span>.
                You will receive further details soon.
            </p>

            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-6 max-w-md mx-auto mb-8">
                <h3 className="font-semibold text-gray-800 mb-2">📋 What's Next?</h3>
                <ul className="text-sm text-gray-600 space-y-2 text-left">
                    <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">1</span>
                        Check your WhatsApp for confirmation
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">2</span>
                        Prepare your team for the hackathon
                    </li>
                    <li className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-500 text-white text-xs flex items-center justify-center">3</span>
                        Report to the venue on 13 Mar 2026
                    </li>
                </ul>
            </div>

            <button
                onClick={onReset}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Register Another Team
            </button>
        </div>
    );
};

export default SuccessMessage;
