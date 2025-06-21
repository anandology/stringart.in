import Header from './Header';
import Footer from './Footer';

const ContactPage = () => (
    <>
        <Header />
        <main className="min-h-screen bg-white py-16">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
                <p className="text-xl text-gray-600">
                    For any queries, please email us at <a href="mailto:hello@stringart.in" className="text-orange-600 underline">hello@stringart.in</a>.
                </p>
            </div>
        </main>
        <Footer />
    </>
);

export default ContactPage; 