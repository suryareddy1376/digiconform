import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import * as XLSX from 'xlsx';

interface TeamRegistration {
    id: string;
    event_name: string;
    department: string;
    team_name: string;
    leader_full_name: string;
    leader_registration_number: string;
    leader_gender: string;
    leader_section: string;
    leader_whatsapp_number: string;
    leader_hostel_name: string;
    leader_room_number: string;
    member1_full_name: string;
    member1_registration_number: string;
    member1_gender: string;
    member1_section: string;
    member1_whatsapp_number: string;
    member1_hostel_name: string;
    member1_room_number: string;
    member2_full_name: string;
    member2_registration_number: string;
    member2_gender: string;
    member2_section: string;
    member2_whatsapp_number: string;
    member2_hostel_name: string;
    member2_room_number: string;
    member3_full_name: string;
    member3_registration_number: string;
    member3_gender: string;
    member3_section: string;
    member3_whatsapp_number: string;
    member3_hostel_name: string;
    member3_room_number: string;
    submitted_at: string;
}

export default function Dashboard() {
    const [registrations, setRegistrations] = useState<TeamRegistration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchRegistrations();
    }, []);

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('team_registrations')
                .select('*')
                .order('submitted_at', { ascending: false });

            if (error) throw error;
            setRegistrations(data || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    // Reset list state and handler
    const [showResetConfirm, setShowResetConfirm] = useState(false);
    const [resetting, setResetting] = useState(false);

    const handleResetList = async () => {
        try {
            setResetting(true);
            const { error } = await supabase
                .from('team_registrations')
                .delete()
                .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all rows

            if (error) throw error;
            setRegistrations([]);
            setShowResetConfirm(false);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to reset list');
        } finally {
            setResetting(false);
        }
    };

    const handleSignOut = async () => {
        await signOut();
        navigate('/admin/login');
    };

    const exportToExcel = () => {
        // Transform data for Excel export
        const excelData = registrations.map((reg, index) => ({
            'S.No': index + 1,
            'Team Name': reg.team_name || '',
            'Submitted At': new Date(reg.submitted_at).toLocaleString(),
            'Leader Name': reg.leader_full_name,
            'Leader Reg No': reg.leader_registration_number,
            'Leader Gender': reg.leader_gender,
            'Leader Section': reg.leader_section,
            'Leader WhatsApp': reg.leader_whatsapp_number,
            'Leader Hostel': reg.leader_hostel_name,
            'Leader Room': reg.leader_room_number,
            'Member 1 Name': reg.member1_full_name,
            'Member 1 Reg No': reg.member1_registration_number,
            'Member 1 Gender': reg.member1_gender,
            'Member 1 Section': reg.member1_section,
            'Member 1 WhatsApp': reg.member1_whatsapp_number,
            'Member 1 Hostel': reg.member1_hostel_name,
            'Member 1 Room': reg.member1_room_number,
            'Member 2 Name': reg.member2_full_name,
            'Member 2 Reg No': reg.member2_registration_number,
            'Member 2 Gender': reg.member2_gender,
            'Member 2 Section': reg.member2_section,
            'Member 2 WhatsApp': reg.member2_whatsapp_number,
            'Member 2 Hostel': reg.member2_hostel_name,
            'Member 2 Room': reg.member2_room_number,
            'Member 3 Name': reg.member3_full_name,
            'Member 3 Reg No': reg.member3_registration_number,
            'Member 3 Gender': reg.member3_gender,
            'Member 3 Section': reg.member3_section,
            'Member 3 WhatsApp': reg.member3_whatsapp_number,
            'Member 3 Hostel': reg.member3_hostel_name,
            'Member 3 Room': reg.member3_room_number,
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Registrations');

        // Auto-size columns
        const colWidths = Object.keys(excelData[0] || {}).map(key => ({ wch: Math.max(key.length, 15) }));
        worksheet['!cols'] = colWidths;

        XLSX.writeFile(workbook, `DIGICON_4.0_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="min-h-screen bg-slate-100">
            {/* Header */}
            <header className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">DIGICON 4.0 Dashboard</h1>
                            <p className="text-sm text-gray-300">Team Registrations</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-300">{user?.email}</span>
                        <button
                            onClick={handleSignOut}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-sm transition-colors"
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {/* Stats and Actions */}
                <div className="flex flex-col md:flex-row gap-4 mb-8">
                    {/* Stats Card */}
                    <div className="bg-white rounded-2xl shadow-lg p-6 flex-1">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total Teams Registered</p>
                                <p className="text-3xl font-bold text-gray-800">{registrations.length}</p>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-4">
                        <button
                            onClick={fetchRegistrations}
                            className="px-6 py-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 text-gray-700"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                            Refresh
                        </button>
                        <button
                            onClick={exportToExcel}
                            disabled={registrations.length === 0}
                            className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Export to Excel
                        </button>
                        <button
                            onClick={() => setShowResetConfirm(true)}
                            disabled={registrations.length === 0}
                            className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            Reset List
                        </button>
                    </div>
                </div>

                {/* Reset Confirmation Dialog */}
                {showResetConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4">
                            <div className="text-center">
                                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Reset All Registrations?</h3>
                                <p className="text-gray-600 mb-6">This will permanently delete all {registrations.length} team registrations. This action cannot be undone.</p>
                                <div className="flex gap-4 justify-center">
                                    <button
                                        onClick={() => setShowResetConfirm(false)}
                                        disabled={resetting}
                                        className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleResetList}
                                        disabled={resetting}
                                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-rose-500 text-white rounded-xl transition-all flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {resetting ? (
                                            <>
                                                <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                                                Deleting...
                                            </>
                                        ) : (
                                            'Yes, Reset All'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Loading State */}
                {loading ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-500">Loading registrations...</p>
                    </div>
                ) : registrations.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <p className="text-gray-500">No registrations yet</p>
                    </div>
                ) : (
                    /* Registrations Table */
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">S.No</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Team Leader</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member 1</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member 2</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Member 3</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Submitted</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {registrations.map((reg, index) => (
                                        <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{index + 1}</td>
                                            <td className="px-6 py-4 text-sm text-gray-900 font-medium">{reg.team_name || '-'}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{reg.leader_full_name}</div>
                                                <div className="text-xs text-gray-500">{reg.leader_registration_number}</div>
                                                <div className="text-xs text-gray-400">{reg.leader_whatsapp_number}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{reg.member1_full_name}</div>
                                                <div className="text-xs text-gray-500">{reg.member1_registration_number}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{reg.member2_full_name}</div>
                                                <div className="text-xs text-gray-500">{reg.member2_registration_number}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-medium text-gray-900">{reg.member3_full_name}</div>
                                                <div className="text-xs text-gray-500">{reg.member3_registration_number}</div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(reg.submitted_at).toLocaleDateString()}
                                                <br />
                                                <span className="text-xs">{new Date(reg.submitted_at).toLocaleTimeString()}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
