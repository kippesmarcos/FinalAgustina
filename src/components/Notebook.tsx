import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import PasswordLock from './PasswordLock';
import HeartPuzzle from './HeartPuzzle';
import './Notebook.css';

import CoverPage from './pages/CoverPage';
import IndexPage from './pages/IndexPage';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page4 from './pages/Page4';
import Page5 from './pages/Page5';
import Page6 from './pages/Page6';

const Notebook: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [isPuzzleLocked, setIsPuzzleLocked] = useState(false);
  const [textAnimationComplete, setTextAnimationComplete] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isDisintegrating, setIsDisintegrating] = useState(false);
  const [photosVisible, setPhotosVisible] = useState(false);

  const pages = [
    { component: CoverPage, title: 'Portada' },
    { component: IndexPage, title: 'Índice' },
    { component: Page1, title: 'Gracias' },
    { component: Page2, title: '¿Cómo te conocí?' },
    { component: Page3, title: 'Por qué me quedo con vos' },
    { component: Page4, title: 'Perdón' },
    { component: Page5, title: 'Problemas' },
    { component: Page6, title: 'Mi Corazón es Tuyo' }
  ];

  const nextPage = () => {
    const targetPage = currentPage + 1;
    if (targetPage < pages.length && !isAnimating && !isFlipping) {
      if (targetPage === 3) {
        setIsLocked(true);
        return;
      }
      if (targetPage === pages.length - 1) {
        setIsPuzzleLocked(true);
        return;
      }
      setIsDisintegrating(true);
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentPage(targetPage);
        setIsDisintegrating(false);
      }, 800);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isAnimating && !isFlipping) {
      // Si estamos en la última página con fotos visibles, primero las desvanecemos
      if (currentPage === pages.length - 1 && photosVisible) {
        setPhotosVisible(false);
        setTimeout(() => {
          setIsDisintegrating(true);
          setIsAnimating(true);
          
          setTimeout(() => {
            setCurrentPage(prev => prev - 1);
            setIsDisintegrating(false);
          }, 800);
        }, 1500); // Esperar a que las fotos se desvanezcan completamente
        return;
      }
      
      setIsDisintegrating(true);
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsDisintegrating(false);
      }, 800);
    }
  };

  const handleUnlock = () => {
    setIsLocked(false);
    setIsDisintegrating(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentPage(3);
      setIsDisintegrating(false);
    }, 800);
  };

  const handlePuzzleComplete = () => {
    setIsPuzzleLocked(false);
    setIsDisintegrating(true);
    setIsAnimating(true);
    
    setTimeout(() => {
      setCurrentPage(pages.length - 1);
      setIsDisintegrating(false);
    }, 800);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, [currentPage]);

  useEffect(() => {
    if (currentPage === pages.length - 1) {
      const timer = setTimeout(() => {
        setTextAnimationComplete(true);
        // Después de que aparezcan los textos, mostrar las fotos
        setTimeout(() => {
          setPhotosVisible(true);
        }, 100);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setTextAnimationComplete(false);
      setPhotosVisible(false);
    }
  }, [currentPage, pages.length]);
  const CurrentPageComponent = pages[currentPage].component;

  return (
    <div className="notebook-container">
      {currentPage === pages.length - 1 && textAnimationComplete && !isPuzzleLocked && (
        <div className="external-floating-photos">
          <motion.img 
            src="/photo1.png" 
            alt="Recuerdo 1" 
            className="external-photo external-photo-1"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.3, rotate: -45, y: 50 }}
            animate={{ 
              opacity: photosVisible ? 0.8 : 0, 
              scale: photosVisible ? 1 : 0.3, 
              rotate: photosVisible ? 0 : -45, 
              y: photosVisible ? 0 : 50 
            }}
            transition={{ 
              duration: photosVisible ? 1.2 : 1.5, 
              delay: photosVisible ? 0.2 : 0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          />
          <motion.img 
            src="/photo2.png" 
            alt="Recuerdo 2" 
            className="external-photo external-photo-2"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.3, rotate: 45, y: -50 }}
            animate={{ 
              opacity: photosVisible ? 0.8 : 0, 
              scale: photosVisible ? 1 : 0.3, 
              rotate: photosVisible ? 0 : 45, 
              y: photosVisible ? 0 : -50 
            }}
            transition={{ 
              duration: photosVisible ? 1.2 : 1.5, 
              delay: photosVisible ? 0.6 : 0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          />
          <motion.img 
            src="/photo3.png" 
            alt="Recuerdo 3" 
            className="external-photo external-photo-3"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.3, rotate: -30, x: -50 }}
            animate={{ 
              opacity: photosVisible ? 0.8 : 0, 
              scale: photosVisible ? 1 : 0.3, 
              rotate: photosVisible ? 0 : -30, 
              x: photosVisible ? 0 : -50 
            }}
            transition={{ 
              duration: photosVisible ? 1.2 : 1.5, 
              delay: photosVisible ? 1.0 : 0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          />
          <motion.img 
            src="/photo4.png" 
            alt="Recuerdo 4" 
            className="external-photo external-photo-4"
            loading="lazy"
            decoding="async"
            initial={{ opacity: 0, scale: 0.3, rotate: 30, x: 50 }}
            animate={{ 
              opacity: photosVisible ? 0.8 : 0, 
              scale: photosVisible ? 1 : 0.3, 
              rotate: photosVisible ? 0 : 30, 
              x: photosVisible ? 0 : 50 
            }}
            transition={{ 
              duration: photosVisible ? 1.2 : 1.5, 
              delay: photosVisible ? 1.4 : 0,
              ease: "easeOut",
              type: "spring",
              stiffness: 100,
              damping: 15
            }}
          />
        </div>
      )}
      
      <button
        className={`nav-button prev-button ${currentPage === 0 ? 'disabled' : ''}`}
        onClick={prevPage}
        disabled={currentPage === 0 || isAnimating}
      >
        <div className="heart-container">
          <FaHeart className="heart-icon" />
          <IoChevronBack className="arrow-icon" />
        </div>
      </button>

      <div className={`notebook ${isLocked || isPuzzleLocked ? 'blurred' : ''}`}>
        <div className="notebook-spine"></div>
        
        <div className="page-container">
          <motion.div
            className="page-wrapper"
            animate={{
              opacity: isDisintegrating ? 0 : 1,
              scale: isDisintegrating ? 0.9 : 1,
              filter: isDisintegrating ? 'blur(10px)' : 'blur(0px)'
            }}
            transition={{
              duration: 0.8,
              ease: "easeInOut"
            }}
          >
            <CurrentPageComponent />
          </motion.div>
        </div>
      </div>
      
      <button
        className={`nav-button next-button ${currentPage === pages.length - 1 ? 'disabled' : ''}`}
        onClick={nextPage}
        disabled={currentPage === pages.length - 1 || isAnimating}
      >
        <div className="heart-container">
          <FaHeart className="heart-icon" />
          <IoChevronForward className="arrow-icon" />
        </div>
      </button>

      {isLocked && (
        <PasswordLock 
          onUnlock={handleUnlock}
          correctPassword="marzo"
        />
      )}

      {isPuzzleLocked && (
        <HeartPuzzle onComplete={handlePuzzleComplete} />
      )}
    </div>
  );
};

export default Notebook;