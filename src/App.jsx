import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ActionCards from './components/ActionCards';
import InteractiveStudies from './components/InteractiveStudies';
import FeaturedResources from './components/FeaturedResources';
import SermonModule from './components/SermonModule';
import NewsSection from './components/NewsSection';
import CommentsSection from './components/CommentsSection';
import Footer from './components/Footer';

// Modals
import YouTubeModal from './components/YouTubeModal';
import StudyModuleModal from './components/StudyModuleModal';
import PdfGuideModal from './components/PdfGuideModal';
import ShareStoryModal from './components/ShareStoryModal';
import DonateModal from './components/DonateModal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminPanelModal from './components/AdminPanelModal';
import AddNewsModal from './components/AddNewsModal';

import { useSite } from './context/SiteContext';

export default function App() {
  const { isAdminLoggedIn, setIsAdminLoggedIn } = useSite();
  const [activeTab, setActiveTab] = useState('inicio');

  // Admin & Auth States
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminPanelOpen, setIsAdminPanelOpen] = useState(false);
  const [isAddNewsOpen, setIsAddNewsOpen] = useState(false);

  // Modal States
  const [selectedStudyModule, setSelectedStudyModule] = useState(null);
  const [selectedPdfResource, setSelectedPdfResource] = useState(null);
  const [activeYoutubeVideo, setActiveYoutubeVideo] = useState(null);
  const [isShareStoryOpen, setIsShareStoryOpen] = useState(false);
  const [isDonateOpen, setIsDonateOpen] = useState(false);

  const handleOpenYoutube = (youtubeId, title) => {
    setActiveYoutubeVideo({ youtubeId, title });
  };

  const handleNavigateTab = (tab) => {
    setActiveTab(tab);
    const element = document.getElementById(tab);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="app-main-layout">
      {/* Navbar Header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={handleNavigateTab} 
        onOpenDonate={() => setIsDonateOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Main Content Area */}
      <main>
        {/* Render Main Landing Page (Image 1 Style) */}
        {(activeTab === 'inicio' || activeTab === 'estudios' || activeTab === 'recursos') && (
          <>
            <HeroSection 
              onExploreResources={() => handleNavigateTab('recursos')}
              onStartStudy={() => handleNavigateTab('estudios')}
            />

            <ActionCards 
              onOpenPdfs={() => handleNavigateTab('recursos')}
              onOpenStudies={() => handleNavigateTab('estudios')}
              onOpenPathways={() => handleNavigateTab('estudios')}
            />

            <InteractiveStudies 
              onSelectModule={(study) => setSelectedStudyModule(study)}
            />

            <FeaturedResources 
              onSelectPdf={(pdf) => setSelectedPdfResource(pdf)}
            />
          </>
        )}

        {/* Render News Section (Locales y Mundiales) */}
        {(activeTab === 'inicio' || activeTab === 'noticias') && (
          <NewsSection 
            onOpenAddNewsModal={() => setIsAddNewsOpen(true)}
          />
        )}

        {/* Render Sermon Module (Image 2 Style) */}
        {(activeTab === 'inicio' || activeTab === 'sermones' || activeTab === 'testimonios') && (
          <SermonModule 
            onWatchYoutube={(youtubeId, title) => handleOpenYoutube(youtubeId, title)}
            onShareStory={() => setIsShareStoryOpen(true)}
          />
        )}

        {/* Render Community & Comments Section */}
        {(activeTab === 'inicio' || activeTab === 'comentarios') && (
          <CommentsSection />
        )}
      </main>

      {/* Footer */}
      <Footer 
        onNavigate={handleNavigateTab}
        onOpenDonate={() => setIsDonateOpen(true)}
        isAdminLoggedIn={isAdminLoggedIn}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenAdminPanel={() => setIsAdminPanelOpen(true)}
      />

      {/* Modals & Dialogs */}
      <YouTubeModal 
        video={activeYoutubeVideo} 
        onClose={() => setActiveYoutubeVideo(null)} 
      />

      <StudyModuleModal 
        studyModule={selectedStudyModule} 
        onClose={() => setSelectedStudyModule(null)} 
      />

      <PdfGuideModal 
        resource={selectedPdfResource} 
        onClose={() => setSelectedPdfResource(null)} 
      />

      <ShareStoryModal 
        isOpen={isShareStoryOpen} 
        onClose={() => setIsShareStoryOpen(false)} 
      />

      <DonateModal 
        isOpen={isDonateOpen} 
        onClose={() => setIsDonateOpen(false)} 
      />

      {/* Admin Modals */}
      <AdminLoginModal 
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdminLoggedIn(true);
          setIsAdminPanelOpen(true);
        }}
      />

      <AdminPanelModal 
        isOpen={isAdminPanelOpen}
        onClose={() => setIsAdminPanelOpen(false)}
        onLogout={() => setIsAdminLoggedIn(false)}
        onAddSermon={(newSermon) => {
          console.log("Nuevo sermón publicado:", newSermon);
        }}
        onTestYoutube={(youtubeId, title) => handleOpenYoutube(youtubeId, title)}
      />

      <AddNewsModal 
        isOpen={isAddNewsOpen}
        onClose={() => setIsAddNewsOpen(false)}
      />
    </div>
  );
}
