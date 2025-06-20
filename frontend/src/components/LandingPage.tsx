import React from 'react';

const LandingPage = () => {
    return (
        <main className="bg-gradient-to-br from-orange-50 to-yellow-50 min-h-screen py-10">
            <div className="max-w-2xl mx-auto px-4 flex flex-col gap-8">
                <section className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
                    <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 mb-4 text-center">Get Started with Your String Art Kit!</h1>
                    <p className="text-lg text-gray-700 mb-6 text-center">
                        Watch the video below and follow the steps to create beautiful string art. Explore the FAQ and Gallery for more inspiration!
                    </p>
                    <div className="w-full aspect-video mb-6">
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
                    <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                        <a href="/faq" className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold text-lg text-center hover:bg-orange-700 transition-colors flex-1">FAQ</a>
                        <a href="/gallery" className="border-2 border-orange-600 text-orange-600 px-6 py-3 rounded-lg font-semibold text-lg text-center hover:bg-orange-50 transition-colors flex-1">Gallery</a>
                    </div>
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