import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from './components/AppShell';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import TranslatorPage from './pages/TranslatorPage';
import ConversationPage from './pages/ConversationPage';
import LessonsPage from './pages/LessonsPage';
import LessonDetailPage from './pages/LessonDetailPage';
import WorksheetsPage from './pages/WorksheetsPage';
import FlashcardsPage from './pages/FlashcardsPage';
import LanguagePacksPage from './pages/LanguagePacksPage';
import HistoryPage from './pages/HistoryPage';
import SettingsPage from './pages/SettingsPage';
import AboutPage from './pages/AboutPage';
import OfflineDemoPage from './pages/OfflineDemoPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Scroll-Driven Marketing & Judge-Facing Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Application Core Routes wrapped in AppShell */}
        <Route
          path="/dashboard"
          element={
            <AppShell>
              <DashboardPage />
            </AppShell>
          }
        />

        <Route
          path="/translator"
          element={
            <AppShell>
              <TranslatorPage />
            </AppShell>
          }
        />

        <Route
          path="/conversation"
          element={
            <AppShell>
              <ConversationPage />
            </AppShell>
          }
        />

        <Route
          path="/lessons"
          element={
            <AppShell>
              <LessonsPage />
            </AppShell>
          }
        />

        <Route
          path="/lessons/:id"
          element={
            <AppShell>
              <LessonDetailPage />
            </AppShell>
          }
        />

        <Route
          path="/worksheets"
          element={
            <AppShell>
              <WorksheetsPage />
            </AppShell>
          }
        />

        <Route
          path="/flashcards"
          element={
            <AppShell>
              <FlashcardsPage />
            </AppShell>
          }
        />

        <Route
          path="/language-packs"
          element={
            <AppShell>
              <LanguagePacksPage />
            </AppShell>
          }
        />

        <Route
          path="/history"
          element={
            <AppShell>
              <HistoryPage />
            </AppShell>
          }
        />

        <Route
          path="/settings"
          element={
            <AppShell>
              <SettingsPage />
            </AppShell>
          }
        />

        <Route
          path="/about"
          element={
            <AppShell>
              <AboutPage />
            </AppShell>
          }
        />

        <Route
          path="/offline-demo"
          element={
            <AppShell>
              <OfflineDemoPage />
            </AppShell>
          }
        />

        {/* Fallback to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
