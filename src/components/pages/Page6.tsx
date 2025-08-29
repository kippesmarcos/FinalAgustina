import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Sparkles } from 'lucide-react';

const Page6: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heart className="header-icon" />
        <h2 className="page-title">Mi Corazón es Tuyo</h2>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-content">
          <motion.h3
            className="main-text"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(1.5rem, 4vw, 1.8rem)',
              color: '#DC143C',
              marginBottom: '15px',
              textShadow: '0 0 15px rgba(220, 20, 60, 0.8)',
              fontWeight: 600
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Agustina, mi china
          </motion.h3>
          
          <motion.p
            className="main-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Te amo y mucho. Tal vez no soy la persona más demostrativa, pero vos sacás mi lado cariñoso y no me arrepiento de sacarlo con vos. Cada abrazo, caricia, beso o lo que sea que venga de parte tuya me encanta. Agradezco mucho tenerte a mi lado y compartir cosas con vos, y como te dije antes, hiciste que una parte de mi vida vuelva a tener brillo.
          </motion.p>
          
          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <Star className="special-icon" style={{ marginBottom: 0 }} />
              <Sparkles className="special-icon" style={{ marginBottom: 0 }} />
              <Star className="special-icon" style={{ marginBottom: 0 }} />
            </div>
            <p className="special-text">
              Gracias ❤️
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page6;