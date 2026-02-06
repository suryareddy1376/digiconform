import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="relative overflow-hidden bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white">
            {/* Animated background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
            </div>

            <div className="relative z-10 container mx-auto px-4 py-8">
                {/* Logos Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                    <img
                        src="/college-logo.png"
                        alt="Kalasalingam Academy of Research and Education"
                        className="h-20 md:h-24 object-contain bg-white rounded-lg p-2"
                    />
                    <img
                        src="/event-banner.png"
                        alt="Euphoria - A Techno Management Meet"
                        className="h-24 md:h-32 object-contain"
                    />
                </div>

                {/* Event Title */}
                <div className="text-center mb-8">
                    <div className="inline-block px-4 py-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full text-sm font-semibold mb-4 animate-pulse">
                        🔥 24-Hour Hackathon
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 bg-gradient-to-r from-cyan-300 via-white to-purple-300 bg-clip-text text-transparent">
                        DIGICON 4.0
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 mt-2">
                        Department of Electronics and Communication Engineering
                    </p>
                </div>

                {/* Event Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto mb-6">
                    {/* Venue */}
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                📍
                            </div>
                            <div>
                                <p className="text-sm text-cyan-200 uppercase tracking-wider font-bold mb-1">Venue</p>
                                <p className="text-lg font-bold text-white">8th Block Seminar Hall</p>
                                <p className="text-base text-cyan-100 font-medium">VLSI Lab – 8201</p>
                            </div>
                        </div>
                    </div>

                    {/* Date & Time */}
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                📅
                            </div>
                            <div>
                                <p className="text-sm text-pink-200 uppercase tracking-wider font-bold mb-1">Date & Time</p>
                                <p className="text-lg font-bold text-white">13 Mar 2026, 10:00 AM</p>
                                <p className="text-base text-pink-100 font-medium">→ 14 Mar 2026, 10:00 AM</p>
                            </div>
                        </div>
                    </div>

                    {/* Faculty Incharge */}
                    <div className="bg-white/20 backdrop-blur-md rounded-xl p-5 border border-white/30 shadow-lg">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0">
                                👨‍🏫
                            </div>
                            <div>
                                <p className="text-sm text-emerald-200 uppercase tracking-wider font-bold mb-1">Faculty Incharge</p>
                                <p className="text-base font-bold text-white">Dr. V. Muneeswaran</p>
                                <p className="text-base font-bold text-white">Dr. P. Manikandan</p>
                                <div className="flex flex-col gap-1 mt-2">
                                    <a href="tel:+919994712481" className="text-sm text-yellow-300 hover:text-yellow-200 transition-colors font-semibold">
                                        📞 +91-9994712481
                                    </a>
                                    <a href="tel:+919047017589" className="text-sm text-yellow-300 hover:text-yellow-200 transition-colors font-semibold">
                                        📞 +91-9047017589
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom wave decoration */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        fill="#f8fafc"
                    />
                </svg>
            </div>
        </header>
    );
};

export default Header;
