import { Instagram, Mail } from 'lucide-react';
import { useAppData } from './AppDataContext';

const Footer = () => {
  const { appData } = useAppData();
  const homeData = appData?.home;

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <h4 className="text-2xl font-bold text-orange-400 mb-4">String Art Studio</h4>
            <p className="text-gray-300 mb-6 max-w-md">
              String Art Studio makes precision-cut kits for creating beautiful geometric patterns.
              Discover the joy of exploring mathematical patterns and symmetry through art.
            </p>
            <div className="flex space-x-4">
              {homeData?.instagram_url && (
                <a
                  href={homeData.instagram_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
              )}
              {homeData?.contact_email && (
                <a
                  href={`mailto:${homeData.contact_email}`}
                  className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center hover:bg-orange-700 transition-colors"
                >
                  <Mail className="w-5 h-5 text-white" />
                </a>
              )}
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/about" className="hover:text-orange-400">About Us</a></li>
              <li><a href="/gallery" className="hover:text-orange-400">Gallery</a></li>
              <li><a href="/products" className="hover:text-orange-400">Products</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold mb-4">Support</h5>
            <ul className="space-y-2 text-gray-300">
              <li><a href="/shipping" className="hover:text-orange-400">Shipping</a></li>
              <li><a href="/faq" className="hover:text-orange-400">FAQ</a></li>
              <li><a href="/contact" className="hover:text-orange-400">Contact</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2025 String Art Studio. All rights reserved. Made with ❤️ in Bengaluru.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
