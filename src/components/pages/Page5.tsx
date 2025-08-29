import React from 'react';
import { motion } from 'framer-motion';
import { Infinity, Sparkles, Heart } from 'lucide-react';

const Page5: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Infinity className="header-icon" />
        <h2 className="page-title">Problemas</h2>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-content">
          <motion.p
            className="main-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Sé que no estuvimos en nuestros mejores momentos este último tiempo, pero entendí que cada charla cuando nos vemos nos va a hacer mejorar a futuro para evitar más problemas.
          </motion.p>

          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Sparkles className="special-icon" />
            <p className="special-text">
              "Juntos somos más fuertes que cualquier problema"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page5;