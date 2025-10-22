import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
      <Head>
        <title>Privacy Policy - OpsiMate</title>
        <meta name="description" content="OpsiMate Privacy Policy - Learn how we collect, use, and protect your information." />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors duration-200"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-gray-600 text-lg">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Information We Collect</h2>
              <p className="text-gray-700 mb-6">
                We collect information you provide directly to us, such as when you create an account, 
                use our services, or contact us for support. This may include your name, email address, 
                and any other information you choose to provide.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-700 mb-6">
                We use the information we collect to provide, maintain, and improve our services, 
                communicate with you, and ensure the security of our platform.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Information Sharing</h2>
              <p className="text-gray-700 mb-6">
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except as described in this privacy policy or as required by law.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Data Security</h2>
              <p className="text-gray-700 mb-6">
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Cookies and Tracking</h2>
              <p className="text-gray-700 mb-6">
                We use cookies and similar tracking technologies to enhance your experience on our website 
                and to analyze how our services are used.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-700 mb-6">
                You have the right to access, update, or delete your personal information. You may also 
                opt out of certain communications from us.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Changes to This Policy</h2>
              <p className="text-gray-700 mb-6">
                We may update this privacy policy from time to time. We will notify you of any changes 
                by posting the new privacy policy on this page.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Contact Us</h2>
              <p className="text-gray-700 mb-6">
                If you have any questions about this privacy policy, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> privacy@opsimate.com<br />
                  <strong>Address:</strong> OpsiMate Privacy Team<br />
                  [Company Address]
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
