import React, { useState, useEffect } from 'react';
import Link from 'next/link';


const COOKIE_CONSENT_KEY = 'opsimateCookieConsent';

const CookieConsentBanner: React.FC = () => {
  const [showBanner, setShowBanner] = useState<boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const consentGiven = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (consentGiven === null) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    setShowBanner(false);
    console.log("Cookies accepted - analytics should be enabled now");
  };

  const handleReject = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'rejected');
    setShowBanner(false);
    console.log("Cookies rejected - analytics disabled");
  };

  if (!isMounted || !showBanner) {
    return null;
  }

  const baseButtonStyles = "px-6 py-3 rounded-md font-semibold cursor-pointer transition-all duration-300 ease-in-out text-sm min-w-[120px] lg:text-[0.9rem] lg:px-[1.5rem] lg:py-[0.75rem]";
  const responsiveButtonStyles = "w-full max-w-[200px] md:w-auto md:max-w-none";

  return (
    <div
        className="fixed bottom-0 left-0 right-0 bg-[#1a1a1a] text-white p-4 md:p-6 shadow-[0_-4px_20px_rgba(0,0,0,0.3)] z-[1000] border-t border-[#333]"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8 text-center lg:text-left">
        <div className="flex-grow">
          <h4 className="m-0 mb-2 text-[#bbdefb] text-base md:text-[1.1rem] font-semibold">
            🍪 We use cookies
          </h4>
          <p className="m-0 text-[0.85rem] md:text-[0.9rem] leading-normal md:leading-relaxed text-[#e3f2fd]">
            We, our service providers and third-party partners use cookies and other
            technologies to personalize content, measure usage, support marketing efforts
            (including cross-contextual and behavioral targeting advertising efforts) and
            provide an optimal experience as permitted by applicable law. Some cookies
            are required for the site to function and cannot be turned off. Update your
            preferences any time by selecting the "Privacy Choices" link. By accepting,
            you agree to the OpsiMate{" "}
            <Link href="https://opsimate.vercel.app/docs/legal/privacy" legacyBehavior>
              <a target="_blank" rel="noopener noreferrer" className="text-[#bbdefb] underline hover:text-[#90caf9] transition-colors duration-200 ease-in-out">
                Cookie Policy
              </a>
            </Link>.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 w-full lg:w-auto justify-center">
          <button
            className={`bg-transparent text-[#bbdefb] border border-[#bbdefb] hover:bg-[rgba(187,222,251,0.1)] hover:-translate-y-px ${baseButtonStyles} ${responsiveButtonStyles}`}
            onClick={handleReject}
          >
            Reject All
          </button>
          <button
            className={`bg-[#3949ab] text-white border border-[#3949ab] hover:bg-[#303f9f] hover:border-[#303f9f] hover:-translate-y-px ${baseButtonStyles} ${responsiveButtonStyles}`}
            onClick={handleAccept}
          >
            Accept All Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsentBanner;