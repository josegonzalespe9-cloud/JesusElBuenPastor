import React, { createContext, useContext, useState } from 'react';
import { churchInfo, interactiveStudies, downloadableResources, sermonSeries, sermonLibrary, testimonies } from '../data/churchData';

const SiteContext = createContext();

export function SiteProvider({ children }) {
  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isEditModeActive, setIsEditModeActive] = useState(true); // Active when admin logged in

  // Editable Site Content State
  const [heroData, setHeroData] = useState({
    title: "PROFUNDIZA TU FE",
    subtitle: "Explora materiales descargables, guías de devoción diaria y estudios bíblicos interactivos diseñados para transformar tu vida espiritual.",
    imageUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
    badge: "CRECIENDO JUNTOS EN LA PALABRA"
  });

  const [pastorWelcomeData, setPastorWelcomeData] = useState({
    title: churchInfo.pastors.welcomeTitle,
    pastorsName: churchInfo.pastors.names,
    message: churchInfo.pastors.message,
    avatarUrl: churchInfo.pastors.avatarUrl
  });

  // News Module Data (Locales y Mundiales)
  const [newsList, setNewsList] = useState([
    {
      id: "news-1",
      title: "Gran Conferencia de Familias y Matrimonios este Fin de Semana",
      category: "Locales",
      date: "28 de Julio, 2026",
      summary: "Nos preparamos para un tiempo glorioso de restauración familiar en nuestra sede principal. ¡Inscripciones abiertas para todas las familias!",
      imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=600&q=80",
      content: "Invitamos a todas las familias de la comunidad a participar de tres días de enseñanza bíblica, talleres prácticos y ministración para matrimonios y jóvenes.",
      googleDriveUrl: ""
    },
    {
      id: "news-2",
      title: "Avance del Evangelio y Misiones en el Continente Africano",
      category: "Mundiales",
      date: "25 de Julio, 2026",
      summary: "Miles de vidas entregan su corazón a Jesucristo en las campañas misioneras internacionales. Oremos por nuestros misioneros en el campo.",
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80",
      content: "Reporte misionero internacional: Dios está haciendo grandes maravillas en la plantación de nuevas iglesias y apoyo alimentario a comunidades vulnerables.",
      googleDriveUrl: ""
    },
    {
      id: "news-3",
      title: "Lanzamiento de la Escuela Bíblica de Niños para el Nuevo Semestre",
      category: "Eventos",
      date: "20 de Julio, 2026",
      summary: "Iniciamos el nuevo ciclo de discipulado infantil con nuevos materiales ilustrados y clases dinámicas.",
      imageUrl: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80",
      content: "La educación cristiana de nuestros niños es prioridad. Este domingo iniciamos la nueva serie temáticas 'Héroes de la Fe' para edades de 4 a 12 años.",
      googleDriveUrl: ""
    }
  ]);

  // Studies, Sermons, PDFs
  const [studies, setStudies] = useState(interactiveStudies);
  const [sermons, setSermons] = useState(sermonLibrary);
  const [pdfResources, setPdfResources] = useState(downloadableResources);

  // Handlers for updating state dynamically from CMS Editor
  const updateHero = (newData) => setHeroData(prev => ({ ...prev, ...newData }));
  const updatePastorWelcome = (newData) => setPastorWelcomeData(prev => ({ ...prev, ...newData }));

  const addNewsItem = (item) => setNewsList([item, ...newsList]);
  const addSermonItem = (sermon) => setSermons([sermon, ...sermons]);
  const addPdfResource = (resource) => setPdfResources([resource, ...pdfResources]);

  return (
    <SiteContext.Provider value={{
      isAdminLoggedIn,
      setIsAdminLoggedIn,
      isEditModeActive,
      setIsEditModeActive,
      heroData,
      updateHero,
      pastorWelcomeData,
      updatePastorWelcome,
      newsList,
      addNewsItem,
      studies,
      sermons,
      addSermonItem,
      pdfResources,
      addPdfResource
    }}>
      {children}
    </SiteContext.Provider>
  );
}

export function useSite() {
  return useContext(SiteContext);
}
