import { useState, useCallback } from 'react';
import Header from '../components/Header';
import Accordion from '../components/Accordion';
import ParticipantCard from '../components/ParticipantCard';
import LoadingSpinner from '../components/LoadingSpinner';
import SuccessMessage from '../components/SuccessMessage';
import type {
  Participant,
  TeamData,
  ValidationErrors,
  MemberType,
} from '../types';
import { createEmptyParticipant } from '../types';
import { validateTeam, validateParticipant } from '../utils/validation';



type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface OpenAccordions {
  leader: boolean;
  member1: boolean;
  member2: boolean;
  member3: boolean;
}

function Registration() {
  // Form state
  const [team, setTeam] = useState<TeamData>({
    leader: createEmptyParticipant(),
    member1: createEmptyParticipant(),
    member2: createEmptyParticipant(),
    member3: createEmptyParticipant(),
  });

  // UI state
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [openAccordions, setOpenAccordions] = useState<OpenAccordions>({
    leader: true,
    member1: false,
    member2: false,
    member3: false,
  });

  // Handle field change
  const handleFieldChange = useCallback((
    memberType: MemberType,
    field: keyof Participant,
    value: string
  ) => {
    setTeam(prev => ({
      ...prev,
      [memberType]: {
        ...prev[memberType],
        [field]: value,
      },
    }));

    // Clear error when user starts typing
    const fieldKey = `${memberType}.${field}`;
    if (errors[fieldKey]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  }, [errors]);

  // Handle field blur (validate on blur)
  const handleFieldBlur = useCallback((memberType: MemberType, _field: keyof Participant) => {
    // Validate just this participant
    const participantErrors = validateParticipant(team[memberType], memberType);
    const fieldKey = `${memberType}.${_field}`;

    if (participantErrors[fieldKey]) {
      setErrors(prev => ({
        ...prev,
        [fieldKey]: participantErrors[fieldKey],
      }));
    }
  }, [team]);

  // Toggle accordion
  const toggleAccordion = useCallback((memberType: MemberType) => {
    setOpenAccordions(prev => ({
      ...prev,
      [memberType]: !prev[memberType],
    }));
  }, []);

  // Check if member has errors
  const memberHasErrors = useCallback((memberType: MemberType): boolean => {
    return Object.keys(errors).some(key => key.startsWith(`${memberType}.`));
  }, [errors]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const allErrors = validateTeam(team);

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);

      // Open all accordions with errors
      const accordionsWithErrors: Partial<OpenAccordions> = {};
      (['leader', 'member1', 'member2', 'member3'] as MemberType[]).forEach(member => {
        if (Object.keys(allErrors).some(key => key.startsWith(`${member}.`))) {
          accordionsWithErrors[member] = true;
        }
      });
      setOpenAccordions(prev => ({ ...prev, ...accordionsWithErrors }));

      return;
    }

    // Submit form
    setStatus('loading');
    setErrorMessage('');

    try {
      console.log('Submitting to Supabase...');

      // Import supabase client
      const { supabase } = await import('../lib/supabase');

      // Insert into team_registrations table (using the simplified single-table design)
      const { data, error } = await supabase
        .from('team_registrations')
        .insert({
          event_name: 'DIGICON 4.0',
          department: 'ECE',

          // Team Leader
          leader_full_name: team.leader.fullName,
          leader_registration_number: team.leader.registrationNumber,
          leader_gender: team.leader.gender,
          leader_section: team.leader.section,
          leader_whatsapp_number: team.leader.whatsappNumber,
          leader_hostel_name: team.leader.hostelName,
          leader_room_number: team.leader.roomNumber,

          // Member 1
          member1_full_name: team.member1.fullName,
          member1_registration_number: team.member1.registrationNumber,
          member1_gender: team.member1.gender,
          member1_section: team.member1.section,
          member1_whatsapp_number: team.member1.whatsappNumber,
          member1_hostel_name: team.member1.hostelName,
          member1_room_number: team.member1.roomNumber,

          // Member 2
          member2_full_name: team.member2.fullName,
          member2_registration_number: team.member2.registrationNumber,
          member2_gender: team.member2.gender,
          member2_section: team.member2.section,
          member2_whatsapp_number: team.member2.whatsappNumber,
          member2_hostel_name: team.member2.hostelName,
          member2_room_number: team.member2.roomNumber,

          // Member 3
          member3_full_name: team.member3.fullName,
          member3_registration_number: team.member3.registrationNumber,
          member3_gender: team.member3.gender,
          member3_section: team.member3.section,
          member3_whatsapp_number: team.member3.whatsappNumber,
          member3_hostel_name: team.member3.hostelName,
          member3_room_number: team.member3.roomNumber,
        })
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message);
      }

      console.log('Successfully inserted:', data);
      setStatus('success');
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
      setErrorMessage(
        error instanceof Error
          ? `Failed to submit: ${error.message}`
          : 'An unexpected error occurred. Please try again.'
      );
    }
  };

  // Reset form
  const handleReset = useCallback(() => {
    setTeam({
      leader: createEmptyParticipant(),
      member1: createEmptyParticipant(),
      member2: createEmptyParticipant(),
      member3: createEmptyParticipant(),
    });
    setErrors({});
    setStatus('idle');
    setErrorMessage('');

    setOpenAccordions({
      leader: true,
      member1: false,
      member2: false,
      member3: false,
    });
  }, []);

  // Fill mock data for testing
  const fillMockData = useCallback(() => {
    const mockData: TeamData = {
      leader: {
        fullName: 'Rajesh Kumar',
        registrationNumber: '9912324501001',
        gender: 'Male',
        section: '24S01',
        whatsappNumber: '9876543210',
        hostelName: 'Block A',
        roomNumber: '101',
      },
      member1: {
        fullName: 'Priya Sharma',
        registrationNumber: '9912324501002',
        gender: 'Female',
        section: '24S01',
        whatsappNumber: '9876543211',
        hostelName: 'Block B',
        roomNumber: '202',
      },
      member2: {
        fullName: 'Arun Patel',
        registrationNumber: '9912324501003',
        gender: 'Male',
        section: '24S01',
        whatsappNumber: '9876543212',
        hostelName: 'Block A',
        roomNumber: '103',
      },
      member3: {
        fullName: 'Sneha Reddy',
        registrationNumber: '9912324501004',
        gender: 'Female',
        section: '24S01',
        whatsappNumber: '9876543213',
        hostelName: 'Block C',
        roomNumber: '304',
      },
    };
    setTeam(mockData);
    setErrors({});
    setOpenAccordions({
      leader: true,
      member1: true,
      member2: true,
      member3: true,
    });
  }, []);

  const memberConfig: Array<{ type: MemberType; title: string; icon: string }> = [
    { type: 'leader', title: 'Team Leader', icon: '👑' },
    { type: 'member1', title: 'Team Member 1', icon: '👤' },
    { type: 'member2', title: 'Team Member 2', icon: '👤' },
    { type: 'member3', title: 'Team Member 3', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {status === 'success' ? (
          <div className="card animate-fade-in">
            <SuccessMessage onReset={handleReset} />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in">
            {/* Form Title */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gradient mb-2">
                Team Registration
              </h2>
              <p className="text-gray-600">
                Fill in the details for all 4 team members to complete registration
              </p>
            </div>

            {/* Team Members Accordions */}
            {memberConfig.map(({ type, title, icon }) => (
              <Accordion
                key={type}
                title={title}
                icon={icon}
                isOpen={openAccordions[type]}
                onToggle={() => toggleAccordion(type)}
                hasErrors={memberHasErrors(type)}
              >
                <ParticipantCard
                  participant={team[type]}
                  memberType={type}
                  errors={errors}
                  onChange={handleFieldChange}
                  onBlur={handleFieldBlur}
                />
              </Accordion>
            ))}

            {/* Error Message */}
            {status === 'error' && errorMessage && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 flex items-center gap-3 animate-shake">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-red-800">Submission Failed</p>
                  <p className="text-sm text-red-600">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Validation Message */}
            {Object.keys(errors).length > 0 && (
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="font-medium text-blue-800">Please fill in all required fields to continue</p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              {status === 'loading' ? (
                <LoadingSpinner />
              ) : (
                <button
                  type="submit"
                  disabled={false}
                  className="btn-primary flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Register Team</span>
                </button>
              )}
            </div>
          </form>
        )}

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-500 text-sm pb-8">
          <p>© 2026 Department of ECE, Kalasalingam Academy of Research and Education</p>
          <p className="mt-1">DIGICON 4.0 — 24hr Hackathon</p>
        </footer>
      </main>
    </div>
  );
}

export default Registration;
