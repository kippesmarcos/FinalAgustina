import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const CoverPage: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Sparkles className="header-icon" />
        <h2 className="page-title">Portada</h2>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-content">
          <motion.h1
            className="main-text"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(1.8rem, 5vw, 2.2rem)',
              fontWeight: 700,
              color: '#fff',
              textShadow: '0 0 20px rgba(220, 20, 60, 0.8)',
              marginBottom: '20px'
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
          >
            Querida Agustina
          </motion.h1>
          
          <motion.p
            className="secondary-text"
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: 'clamp(1.2rem, 3.5vw, 1.5rem)',
              fontStyle: 'italic',
              fontWeight: 500
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Cómo me enamoré de Vos
          </motion.p>

          <motion.div
            style={{
              height: '2px',
              background: 'linear-gradient(90deg, transparent 0%, rgba(220, 20, 60, 0.8) 20%, rgba(220, 20, 60, 1) 50%, rgba(220, 20, 60, 0.8) 80%, transparent 100%)',
              margin: '20px auto',
              borderRadius: '1px',
              boxShadow: '0 0 10px rgba(220, 20, 60, 0.6)',
              width: '70%'
            }}
            initial={{ width: 0 }}
            animate={{ width: "70%" }}
            transition={{ duration: 2, delay: 1.2 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default CoverPage;