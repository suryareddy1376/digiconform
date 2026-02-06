export interface Participant {
    fullName: string;
    registrationNumber: string;
    gender: 'Male' | 'Female' | '';
    section: string;
    whatsappNumber: string;
    hostelName: string;
    roomNumber: string;
}

export interface TeamData {
    leader: Participant;
    member1: Participant;
    member2: Participant;
    member3: Participant;
}

export interface FormPayload {
    event: string;
    department: string;
    team: TeamData;
    submittedAt: string;
}

export interface ValidationErrors {
    [key: string]: string;
}

export type MemberType = 'leader' | 'member1' | 'member2' | 'member3';

export const createEmptyParticipant = (): Participant => ({
    fullName: '',
    registrationNumber: '',
    gender: '',
    section: '',
    whatsappNumber: '',
    hostelName: '',
    roomNumber: '',
});
