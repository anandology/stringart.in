import Header from './Header';
import Footer from './Footer';

const AboutPage = () => (
    <>
        <Header />
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">About</h1>
                <p className="text-xl text-gray-600">Coming soon..</p>
            </div>
        </main>
        <Footer />
    </>
);

export default AboutPage; 