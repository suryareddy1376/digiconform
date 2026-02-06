import React from 'react';
import type { Participant, ValidationErrors, MemberType } from '../types';

interface ParticipantCardProps {
    participant: Participant;
    memberType: MemberType;
    errors: ValidationErrors;
    onChange: (memberType: MemberType, field: keyof Participant, value: string) => void;
    onBlur: (memberType: MemberType, field: keyof Participant) => void;
}

const ParticipantCard: React.FC<ParticipantCardProps> = ({
    participant,
    memberType,
    errors,
    onChange,
    onBlur,
}) => {
    const getFieldError = (field: keyof Participant) => errors[`${memberType}.${field}`];

    const inputClasses = (field: keyof Participant) => `
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 outline-none
    ${getFieldError(field)
            ? 'border-red-400 bg-red-50 focus:border-red-500 focus:ring-4 focus:ring-red-500/20'
            : 'border-gray-200 bg-gray-50 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/20'
        }
  `;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={participant.fullName}
                    onChange={(e) => onChange(memberType, 'fullName', e.target.value)}
                    onBlur={() => onBlur(memberType, 'fullName')}
                    className={inputClasses('fullName')}
                    placeholder="Enter full name"
                />
                {getFieldError('fullName') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('fullName')}
                    </p>
                )}
            </div>

            {/* Registration Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={participant.registrationNumber}
                    onChange={(e) => onChange(memberType, 'registrationNumber', e.target.value)}
                    onBlur={() => onBlur(memberType, 'registrationNumber')}
                    className={inputClasses('registrationNumber')}
                    placeholder="e.g., 9912324501001"
                />
                {getFieldError('registrationNumber') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('registrationNumber')}
                    </p>
                )}
            </div>

            {/* Gender */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                </label>
                <select
                    value={participant.gender}
                    onChange={(e) => onChange(memberType, 'gender', e.target.value)}
                    onBlur={() => onBlur(memberType, 'gender')}
                    className={inputClasses('gender')}
                >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                {getFieldError('gender') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('gender')}
                    </p>
                )}
            </div>

            {/* Section */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Section <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={participant.section}
                    onChange={(e) => onChange(memberType, 'section', e.target.value)}
                    onBlur={() => onBlur(memberType, 'section')}
                    className={inputClasses('section')}
                    placeholder="e.g., 24S01"
                />
                {getFieldError('section') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('section')}
                    </p>
                )}
            </div>

            {/* WhatsApp Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    value={participant.whatsappNumber}
                    onChange={(e) => onChange(memberType, 'whatsappNumber', e.target.value)}
                    onBlur={() => onBlur(memberType, 'whatsappNumber')}
                    className={inputClasses('whatsappNumber')}
                    placeholder="e.g., 9876543210"
                />
                {getFieldError('whatsappNumber') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('whatsappNumber')}
                    </p>
                )}
            </div>

            {/* Hostel Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hostel Name <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={participant.hostelName}
                    onChange={(e) => onChange(memberType, 'hostelName', e.target.value)}
                    onBlur={() => onBlur(memberType, 'hostelName')}
                    className={inputClasses('hostelName')}
                    placeholder="e.g., Block A"
                />
                {getFieldError('hostelName') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('hostelName')}
                    </p>
                )}
            </div>

            {/* Room Number */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Room Number <span className="text-red-500">*</span>
                </label>
                <input
                    type="text"
                    value={participant.roomNumber}
                    onChange={(e) => onChange(memberType, 'roomNumber', e.target.value)}
                    onBlur={() => onBlur(memberType, 'roomNumber')}
                    className={inputClasses('roomNumber')}
                    placeholder="e.g., 101"
                />
                {getFieldError('roomNumber') && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {getFieldError('roomNumber')}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ParticipantCard;
