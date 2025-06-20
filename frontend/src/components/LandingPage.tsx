import React from 'react';

const LandingPage = () => {
    return (
        <main className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen py-10">
            <div className="max-w-2xl mx-auto px-4 flex flex-col gap-8">
                <section className="relative rounded-2xl shadow-xl p-8 flex flex-col items-center mb-0 overflow-hidden" style={{ background: '#f5e1c5', backgroundImage: 'url(/brown-sheet.png)', backgroundRepeat: 'repeat', backgroundSize: 'cover' }}>
                    {/* White overlay to lighten the background */}
                    <div className="absolute inset-0 bg-white opacity-40 pointer-events-none" style={{ zIndex: 0 }}></div>
                    <div className="w-full flex flex-col md:flex-row items-center justify-center gap-8" style={{ position: 'relative', zIndex: 1 }}>
                        <div className="flex-shrink-0 flex items-center justify-center">
                            <img src="/stringart-logo.png" alt="String Art Kit" className="w-40 h-40 object-contain" />
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <h1 className="leading-tight">
                                <span className="block text-5xl sm:text-6xl font-extrabold text-orange-600">String Art</span>
                                <span className="block text-5xl sm:text-6xl font-normal text-gray-700">Starter Kit</span>
                            </h1>
                        </div>
                    </div>
                </section>
                <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mt-0">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Get Started</h2>
                    <p className="text-lg text-gray-700 mb-4 text-center">
                        Watch the video below and follow the steps to create beautiful string art.
                    </p>
                    <div className="w-full aspect-video mb-0">
                        {/* Replace the src with your actual tutorial video URL */}
                        <iframe
                            className="w-full h-full rounded-lg shadow"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                            title="String Art Tutorial"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
                <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mt-0">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-4 text-center">Get Inspired</h2>
                    <div className="grid grid-cols-3 gap-4 mb-6 w-full">
                        <img src="/stringart-logo.png" alt="Design 1" className="w-full aspect-square object-contain" />
                        <img src="/images/boat.png" alt="Design 2" className="w-full aspect-square object-contain" />
                        <img src="/images/dewdrop.png" alt="Design 3" className="w-full aspect-square object-contain" />
                        <img src="/images/kichimu-by-varsha.png" alt="Design 4" className="w-full aspect-square object-contain" />
                        <img src="/images/12point-mystic-rose-by-vihari.png" alt="Design 5" className="w-full aspect-square object-contain" />
                        <img src="/images/square.png" alt="Design 6" className="w-full aspect-square object-contain" />
                    </div>
                    <a href="/gallery" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg text-center hover:bg-orange-700 transition-colors">See More Designs</a>
                </section>
                <section className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Share Your Creations!</h2>
                    <p className="text-gray-700 mb-2 text-center">Tag your art with <span className="font-bold text-orange-600">#StringArtStudio</span> on Instagram or join our community to inspire others.</p>
                    {/* Replace with actual community link if available */}
                    <a href="#" className="text-orange-600 hover:underline font-medium">Join our WhatsApp group</a>
                </section>
            </div>
        </main>
    );
};

export default LandingPage; 