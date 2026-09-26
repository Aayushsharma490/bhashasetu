import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';

export const LandingNav: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 py-3 shadow-sm'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-900 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            BS
          </div>
          <div>
            <span className="text-base font-extrabold tracking-tight text-slate-900 block leading-tight">
              BHASHASETU
            </span>
            <span className="text-[10px] text-slate-500 font-medium leading-none block">
              SIH26042 · Govt. of Jharkhand
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <button
            onClick={() => scrollTo('problem')}
            className="hover:text-slate-900 transition-colors"
          >
            The Problem
          </button>
          <button
            onClick={() => scrollTo('solution')}
            className="hover:text-slate-900 transition-colors"
          >
            Offline Pipeline
          </button>
          <button
            onClick={() => scrollTo('ol-chiki')}
            className="hover:text-slate-900 transition-colors"
          >
            Santali &amp; Ol Chiki
          </button>
          <button
            onClick={() => scrollTo('offline-proof')}
            className="hover:text-slate-900 transition-colors"
          >
            Offline Proof
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="hover:text-slate-900 transition-colors"
          >
            Classroom Tools
          </button>
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold rounded-button shadow-sm flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            <span>Open App</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <Link
            to="/dashboard"
            className="px-3 py-1.5 bg-blue-900 text-white text-xs font-semibold rounded-button"
          >
            App
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
            className="p-2 text-slate-700 hover:bg-slate-100 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3">
          <button
            onClick={() => scrollTo('problem')}
            className="block w-full text-left text-sm font-medium text-slate-700 py-2"
          >
            The Problem
          </button>
          <button
            onClick={() => scrollTo('solution')}
            className="block w-full text-left text-sm font-medium text-slate-700 py-2"
          >
            Offline Pipeline
          </button>
          <button
            onClick={() => scrollTo('ol-chiki')}
            className="block w-full text-left text-sm font-medium text-slate-700 py-2"
          >
            Santali &amp; Ol Chiki
          </button>
          <button
            onClick={() => scrollTo('offline-proof')}
            className="block w-full text-left text-sm font-medium text-slate-700 py-2"
          >
            Offline Proof
          </button>
          <button
            onClick={() => scrollTo('features')}
            className="block w-full text-left text-sm font-medium text-slate-700 py-2"
          >
            Classroom Tools
          </button>
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/dashboard"
              className="w-full py-2.5 bg-blue-900 text-white text-xs font-semibold rounded-button flex items-center justify-center gap-2"
            >
              <span>Launch Classroom App</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingNav;
