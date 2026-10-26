import React, { useState, useEffect } from "react";
import "./FloatingActions.css";

export default function FloatingActions() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show Back to Top button only after scrolling
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 100);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent background scrolling while contact popup is open
  useEffect(() => {
    if (!isContactOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsContactOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isContactOpen]);

  // Share website
  const handleShare = async () => {
    const shareData = {
      title: document.title,
      text: "Check out Adil Architects",
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        console.error("Sharing failed:", error);
      }
    }
  };

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* FLOATING ACTION BUTTONS */}
      <div className="floating-actions">
        {/* SHARE BUTTON */}
        <button
          type="button"
          className="floating-action-btn"
          onClick={handleShare}
          title="Share website"
          aria-label="Share website"
        >
          <svg
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 16V3" />
            <path d="m7 8 5-5 5 5" />
            <path d="M4 13v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
          </svg>
        </button>

        {/* BACK TO TOP - HIDDEN AT PAGE TOP */}
        {showScrollTop && (
          <button
            type="button"
            className="floating-action-btn"
            onClick={scrollToTop}
            title="Back to top"
            aria-label="Back to top"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </button>
        )}

        {/* MESSAGE BUTTON */}
        <button
          type="button"
          className="floating-message-btn"
          onClick={() => setIsContactOpen(true)}
          title="Contact us"
          aria-label="Open contact information"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 3h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9l-5 4v-4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
            <circle cx="7.5" cy="11" r="1.2" fill="#fff" />
            <circle cx="12" cy="11" r="1.2" fill="#fff" />
            <circle cx="16.5" cy="11" r="1.2" fill="#fff" />
          </svg>
        </button>

        {/* LINK COPIED NOTIFICATION */}
        {copied && <div className="floating-copy-toast">Link copied!</div>}
      </div>

      {/* CONTACT POPUP */}
      {isContactOpen && (
        <div
          className="contact-modal-overlay"
          onClick={() => setIsContactOpen(false)}
        >
          <div
            className="contact-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Contact information"
            onClick={(event) => event.stopPropagation()}
          >
            {/* CLOSE BUTTON */}
            <button
              type="button"
              className="contact-modal-close"
              onClick={() => setIsContactOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            {/* STUDIO AVATAR */}
            <div className="contact-modal-avatar">AA</div>

            {/* STUDIO DETAILS */}
            <h2>Adil Architects</h2>

            <p className="contact-modal-subtitle">
              Architecture & Interior Design Studio
            </p>

            {/* CONTACT LINKS */}
            <div className="contact-modal-links">
              <a
                href="https://www.instagram.com/adil_architects/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>

              {/* Replace with your actual Telegram URL */}
              <a href="https://t.me/" target="_blank" rel="noopener noreferrer">
                Telegram
              </a>

              {/* Replace with your actual WhatsApp URL */}
              <a
                href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
            </div>

            {/* CLOSE CONTACT POPUP */}
            <button
              type="button"
              className="contact-modal-save"
              onClick={() => setIsContactOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
