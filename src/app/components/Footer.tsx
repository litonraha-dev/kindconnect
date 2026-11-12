import Link from 'next/link';
import React from 'react';

const Footer = () => {
    return (
     <footer className="bg-gray-900 text-gray-300 py-12 border-t border-gray-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* লোগো এবং সংক্ষিপ্ত বিবরণ */}
        <div className="text-center md:text-left space-y-2">
          <Link href={"/"}>
          <span className="text-2xl font-extrabold">
            Kind<span className="text-green-600">Connect</span>
          </span>
        </Link>
          <p className="text-sm text-gray-400">
            Making communities stronger, together.
          </p>
        </div>

        {/* নেভিগেশন লিংকসমূহ */}
        <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-green-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-400 transition-colors">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-green-400 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* কপিরাইট সেকশন */}
        <div className="text-sm text-gray-500 text-center md:text-right">
          <p>© {new Date().getFullYear()} KindConnect. All rights reserved.</p>
        </div>

      </div>
    </footer>
    );
};

export default Footer;