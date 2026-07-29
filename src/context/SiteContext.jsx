import React, { createContext, useContext, useState } from 'react';
import { churchInfo, interactiveStudies, downloadableResources, sermonSeries, sermonLibrary, testimonies } from '../data/churchData';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  // Admin Auth State & Custom Password
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(true);
  const [adminPassword, setAdminPassword] = useState('pastor123'); // Default password, editable in Admin Panel

  // Editable Hero Section Data
  const [heroData, setHeroData] = useState({
    title: "PROFUNDIZA TU FE",
    subtitle: "Explora materiales descargables, guías de devoción diaria y estudios bíblicos interactivos diseñados para transformar tu vida espiritual.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    badge: "PREDICANDO LA PALABRA DE DIOS"
  });

  // Editable Evangelist / Minister Bio
  const [ministerBioData, setMinisterBioData] = useState({
    title: "BIENVENIDOS AL MINISTERIO EVANGÉLICO",
    authorName: churchInfo.pastors.names,
    message: "Bienvenidos a esta plataforma de evangelización. Nuestra misión es llevar la verdad de la Palabra de Dios a cada rincón, edificar vidas a través del estudio bíblico interactivo y proclamar la esperanza de Jesucristo.",
    avatarUrl: churchInfo.pastors.avatarUrl
  });

  // Interactive Studies List (Add, Edit, Delete)
  const [studiesList, setStudiesList] = useState(interactiveStudies);

  // News List (Add, Edit, Delete)
  const [newsList, setNewsList] = useState([
    {
      id: "news-1",
      title: "Gran Conferencia de Familias y Matrimonios este Fin de Semana",
      category: "Locales",
      date: "28 de Julio, 2026",
      summary: "Nos preparamos para un tiempo glorioso de restauración familiar. ¡Inscripciones abiertas!",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      content: "Invitamos a todos los creyentes y familias a participar de tres días de enseñanza bíblica, talleres prácticos y ministración.",
      googleDriveUrl: ""
    },
    {
      id: "news-2",
      title: "Avance del Evangelio y Misiones en el Continente Africano",
      category: "Mundiales",
      date: "25 de Julio, 2026",
      summary: "Miles de vidas entregan su corazón a Jesucristo en las campañas misioneras internacionales.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      content: "Reporte misionero internacional: Dios está haciendo grandes maravillas en la plantación de nuevas obras y apoyo alimentario.",
      googleDriveUrl: ""
    }
  ]);

  // Sermons List (Add, Edit, Delete)
  const [sermonsList, setSermonsList] = useState(sermonLibrary);

  // Testimonies List (Add, Edit, Delete)
  const [testimoniesList, setTestimoniesList] = useState(testimonies);

  // Section Visibilities
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    actionCards: true,
    studies: true,
    news: true,
    sermons: true,
    testimonies: true,
    comments: true
  });

  // Actions
  const updateHero = (data) => setHeroData(prev => ({ ...prev, ...data }));
  const updateMinisterBio = (data) => setMinisterBioData(prev => ({ ...prev, ...data }));

  const addStudy = (newStudy) => setStudiesList([newStudy, ...studiesList]);
  const deleteStudy = (id) => setStudiesList(studiesList.filter(s => s.id !== id));

  const addSermon = (newSermon) => setSermonsList([newSermon, ...sermonsList]);
  const deleteSermon = (id) => setSermonsList(sermonsList.filter(s => s.id !== id));

  const addNews = (newNews) => setNewsList([newNews, ...newsList]);
  const deleteNews = (id) => setNewsList(newsList.filter(n => n.id !== id));

  const addTestimony = (newT) => setTestimoniesList([newT, ...testimoniesList]);
  const deleteTestimony = (id) => setTestimoniesList(testimoniesList.filter(t => t.id !== id));

  const updateAdminPassword = (newPass) => setAdminPassword(newPass);

  const toggleSection = (sectionKey) => {
    setSectionVisibility(prev => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  return (
    <SiteContext.Provider value={{
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      isEditModeActive,
      setIsEditModeActive,
      adminPassword,
      updateAdminPassword,
      heroData,
      updateHero,
      ministerBioData,
      updateMinisterBio,
      studiesList,
      addStudy,
      deleteStudy,
      newsList,
      addNews,
      deleteNews,
      sermonsList,
      addSermon,
      deleteSermon,
      testimoniesList,
      addTestimony,
      deleteTestimony,
      sectionVisibility,
      toggleSection
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
