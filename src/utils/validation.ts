import type { Participant, ValidationErrors } from '../types';

export const validateParticipant = (participant: Participant, prefix: string): ValidationErrors => {
    const errors: ValidationErrors = {};

    if (!participant.fullName.trim()) {
        errors[`${prefix}.fullName`] = 'Full name is required';
    }

    if (!participant.registrationNumber.trim()) {
        errors[`${prefix}.registrationNumber`] = 'Registration number is required';
    }

    if (!participant.gender) {
        errors[`${prefix}.gender`] = 'Gender is required';
    }

    if (!participant.section.trim()) {
        errors[`${prefix}.section`] = 'Section is required';
    }

    if (!participant.whatsappNumber.trim()) {
        errors[`${prefix}.whatsappNumber`] = 'WhatsApp number is required';
    } else if (!/^[6-9]\d{9}$/.test(participant.whatsappNumber.replace(/\D/g, ''))) {
        errors[`${prefix}.whatsappNumber`] = 'Invalid phone number (10 digits starting with 6-9)';
    }

    if (!participant.hostelName.trim()) {
        errors[`${prefix}.hostelName`] = 'Hostel name is required';
    }

    if (!participant.roomNumber.trim()) {
        errors[`${prefix}.roomNumber`] = 'Room number is required';
    }

    return errors;
};

export const validateTeam = (team: {
    leader: Participant;
    member1: Participant;
    member2: Participant;
    member3: Participant;
}): ValidationErrors => {
    return {
        ...validateParticipant(team.leader, 'leader'),
        ...validateParticipant(team.member1, 'member1'),
        ...validateParticipant(team.member2, 'member2'),
        ...validateParticipant(team.member3, 'member3'),
    };
};
