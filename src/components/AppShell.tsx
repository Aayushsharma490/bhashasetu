import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Mic,
  MessageSquare,
  BookOpen,
  FileSpreadsheet,
  Layers,
  Globe2,
  History,
  Settings,
  Info,
  ShieldCheck,
  Menu,
  X,
  ExternalLink
} from 'lucide-react';
import OfflineStatusModal from './OfflineStatusModal';
import OlChikiText from './OlChikiText';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [isOfflineModalOpen, setIsOfflineModalOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/translator', label: 'Live Translator', icon: Mic },
    { to: '/conversation', label: 'Conversation', icon: MessageSquare },
    { to: '/lessons', label: 'Lessons', icon: BookOpen },
    { to: '/worksheets', label: 'Worksheets', icon: FileSpreadsheet },
    { to: '/flashcards', label: 'Flashcards', icon: Layers },
    { to: '/language-packs', label: 'Language Packs', icon: Globe2 },
    { to: '/history', label: 'History', icon: History },
    { to: '/settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row text-slate-900 font-sans">
      {/* Top Header on Mobile */}
      <header className="md:hidden flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-button min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <Link to="/" className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-md bg-blue-900 text-white font-bold flex items-center justify-center text-sm">
              BS
            </span>
            <span className="font-bold tracking-tight text-slate-900">BHASHASETU</span>
          </Link>
        </div>

        <button
          onClick={() => setIsOfflineModalOpen(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold"
        >
          <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
          <span>OFFLINE</span>
        </button>
      </header>

      {/* Sidebar for Tablet / Desktop */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-white border-r border-slate-200 flex flex-col z-40 transition-transform duration-200 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="p-5 border-b border-slate-100">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="flex items-center gap-2.5 group"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="w-8 h-8 rounded-md bg-blue-900 text-white font-bold flex items-center justify-center text-base shadow-sm">
                BS
              </div>
              <div>
                <h1 className="text-base font-bold tracking-tight text-slate-900 leading-tight">
                  BHASHASETU
                </h1>
                <p className="text-[11px] text-slate-500 font-medium leading-none">
                  Offline Classroom Assistant
                </p>
              </div>
            </Link>

            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="md:hidden p-1.5 text-slate-400 hover:text-slate-600 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-3 py-1.5 px-2.5 bg-slate-50 border border-slate-100 rounded-md text-[11px] text-slate-600 flex items-center justify-between">
            <span>Govt. of Jharkhand</span>
            <span className="font-semibold text-blue-900">SIH26042</span>
          </div>
        </div>

        {/* Navigation Links (min 44px touch targets) */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-button text-sm font-medium transition-colors min-h-[44px] ${
                    isActive
                      ? 'bg-blue-50 text-blue-900 font-semibold border-l-4 border-blue-900 rounded-l-none'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-slate-500" />
                  <span>{item.label}</span>
                </div>
              </NavLink>
            );
          })}

          {/* Offline Demo route */}
          <div className="pt-2">
            <NavLink
              to="/offline-demo"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-button text-xs font-semibold uppercase tracking-wider transition-colors min-h-[44px] border ${
                  isActive
                    ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                    : 'bg-emerald-50/70 text-emerald-800 border-emerald-200 hover:bg-emerald-100/60'
                }`
              }
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Offline Demo</span>
            </NavLink>
          </div>

          <div className="pt-2">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-between px-3 py-2 text-xs text-slate-500 hover:text-slate-700 transition-colors"
            >
              <span>View Landing Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* Compact Offline Indicator at Sidebar Bottom */}
        <div className="p-3 border-t border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setIsOfflineModalOpen(true)}
            className="w-full text-left p-2.5 rounded-button border border-emerald-200 bg-white hover:bg-emerald-50/40 transition-colors flex items-center justify-between group"
            title="Click to inspect offline subsystem status"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <div>
                <span className="text-xs font-bold text-slate-800 block">● OFFLINE</span>
                <span className="text-[11px] text-slate-500 flex items-center gap-1">
                  Santali / <OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>
                </span>
              </div>
            </div>
            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
              Prototype Engine Active
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Desktop top context header */}
        <div className="hidden md:flex items-center justify-between px-8 py-3.5 bg-white border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Mother-Tongue Classroom Pedagogy
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-slate-600">
              Jharkhand Primary Schools (Grade 1–5)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-500">
              Target Latency: <strong className="text-slate-700">&lt; 3.0s</strong>
            </span>
            <button
              onClick={() => setIsOfflineModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full text-xs font-semibold hover:bg-emerald-100 transition-colors"
            >
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>● OFFLINE</span>
            </button>
          </div>
        </div>

        {/* Content child container */}
        <div className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </div>
      </main>

      {/* Offline Status Modal */}
      <OfflineStatusModal
        isOpen={isOfflineModalOpen}
        onClose={() => setIsOfflineModalOpen(false)}
      />
    </div>
  );
};

export default AppShell;
