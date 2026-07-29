import React, { createContext, useContext, useState } from 'react';
import { churchInfo, interactiveStudies, downloadableResources, sermonSeries, sermonLibrary, testimonies } from '../data/churchData';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  // Admin Auth State & Custom Password
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(true);
  const [adminPassword, setAdminPassword] = useState('pastor123');

  // 1. Hero Section Data
  const [heroData, setHeroData] = useState({
    title: "PROFUNDIZA TU FE",
    subtitle: "Explora materiales descargables, guías de devoción diaria y estudios bíblicos interactivos diseñados para transformar tu vida espiritual.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    badge: "PREDICANDO LA PALABRA DE DIOS"
  });

  // 2. Action Cards Data (Editable)
  const [actionCardsData, setActionCardsData] = useState([
    {
      id: "card-1",
      title: "GUÍAS DESCARGABLES",
      desc: "Notas de estudio en formato PDF, guías de discusión para células o grupos pequeños.",
      buttonText: "EXPLORAR RECURSOS",
      type: "recursos"
    },
    {
      id: "card-2",
      title: "ESTUDIO BÍBLICO INTERACTIVO",
      desc: "Estudios guiados por módulos interactivos con lecciones en vídeo de YouTube y cuestionarios.",
      buttonText: "VER MÓDULOS",
      type: "estudios"
    },
    {
      id: "card-3",
      title: "RUTAS DE APRENDIZAJE",
      desc: "Secuencias estructuradas paso a paso, desde nivel principiante hasta estudios avanzados.",
      buttonText: "COMENZAR RUTA",
      type: "estudios"
    }
  ]);

  // 3. Evangelist / Minister Bio
  const [ministerBioData, setMinisterBioData] = useState({
    title: "BIENVENIDOS AL MINISTERIO EVANGÉLICO",
    authorName: churchInfo.pastors.names,
    message: "Bienvenidos a esta plataforma de evangelización. Nuestra misión es llevar la verdad de la Palabra de Dios a cada rincón, edificar vidas a través del estudio bíblico interactivo y proclamar la esperanza de Jesucristo.",
    avatarUrl: churchInfo.pastors.avatarUrl
  });

  // 4. Interactive Studies List (CRUD)
  const [studiesList, setStudiesList] = useState(interactiveStudies);

  // 5. News List (CRUD)
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

  // 6. Sermons List (CRUD)
  const [sermonsList, setSermonsList] = useState(sermonLibrary);

  // 7. PDF Resources List (CRUD)
  const [pdfList, setPdfList] = useState(downloadableResources);

  // 8. Testimonies List (CRUD)
  const [testimoniesList, setTestimoniesList] = useState(testimonies);

  // 9. Comments List (CRUD)
  const [commentsList, setCommentsList] = useState([
    {
      id: 1,
      author: "Hermano Carlos R.",
      date: "Hace 2 horas",
      category: "Petición de Oración",
      content: "Pido oración por la salud de mi madre María y la restauración de nuestra familia. Dios los bendiga grandemente por este ministerio.",
      likes: 8
    },
    {
      id: 2,
      author: "Hermana Ana M.",
      date: "Hace 5 horas",
      category: "Testimonio",
      content: "Doy gracias a Dios porque el estudio del libro de Romanos ha transformado mi manera de comprender la fe y la gracia.",
      likes: 15
    }
  ]);

  // Section Visibilities Toggle
  const [sectionVisibility, setSectionVisibility] = useState({
    hero: true,
    actionCards: true,
    studies: true,
    news: true,
    sermons: true,
    resources: true,
    testimonies: true,
    comments: true
  });

  // State Updaters & Handlers
  const updateHero = (data) => setHeroData(prev => ({ ...prev, ...data }));
  const updateMinisterBio = (data) => setMinisterBioData(prev => ({ ...prev, ...data }));

  // Studies CRUD
  const addStudy = (item) => setStudiesList([item, ...studiesList]);
  const updateStudy = (id, updated) => setStudiesList(studiesList.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteStudy = (id) => setStudiesList(studiesList.filter(s => s.id !== id));

  // News CRUD
  const addNews = (item) => setNewsList([item, ...newsList]);
  const updateNews = (id, updated) => setNewsList(newsList.map(n => n.id === id ? { ...n, ...updated } : n));
  const deleteNews = (id) => setNewsList(newsList.filter(n => n.id !== id));

  // Sermons CRUD
  const addSermon = (item) => setSermonsList([item, ...sermonsList]);
  const updateSermon = (id, updated) => setSermonsList(sermonsList.map(s => s.id === id ? { ...s, ...updated } : s));
  const deleteSermon = (id) => setSermonsList(sermonsList.filter(s => s.id !== id));

  // PDF Resources CRUD
  const addPdf = (item) => setPdfList([item, ...pdfList]);
  const updatePdf = (id, updated) => setPdfList(pdfList.map(p => p.id === id ? { ...p, ...updated } : p));
  const deletePdf = (id) => setPdfList(pdfList.filter(p => p.id !== id));

  // Testimonies CRUD
  const addTestimony = (item) => setTestimoniesList([item, ...testimoniesList]);
  const deleteTestimony = (id) => setTestimoniesList(testimoniesList.filter(t => t.id !== id));

  // Comments CRUD
  const addComment = (item) => setCommentsList([item, ...commentsList]);
  const deleteComment = (id) => setCommentsList(commentsList.filter(c => c.id !== id));

  // Action Cards CRUD
  const updateActionCard = (id, updated) => setActionCardsData(actionCardsData.map(c => c.id === id ? { ...c, ...updated } : c));

  // Admin Password
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
      actionCardsData,
      updateActionCard,
      ministerBioData,
      updateMinisterBio,
      studiesList,
      addStudy,
      updateStudy,
      deleteStudy,
      newsList,
      addNews,
      updateNews,
      deleteNews,
      sermonsList,
      addSermon,
      updateSermon,
      deleteSermon,
      pdfList,
      addPdf,
      updatePdf,
      deletePdf,
      testimoniesList,
      addTestimony,
      deleteTestimony,
      commentsList,
      addComment,
      deleteComment,
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
