import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Star } from 'lucide-react';

const Page2: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Coffee className="header-icon" />
        <h2 className="page-title">¿Cómo te conocí?</h2>
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            La verdad fue muy raro cómo nos conocimos, y muy al límite de todo. Si pasaba un minuto más, no sé qué sería de nosotros hoy en día.
          </motion.p>

          <motion.p
            className="secondary-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Lo más seguro es que estaríamos viviendo vidas muy distintas, pero gracias a un minuto de diferencia y a un milagro te conocí, y gracias a eso, hoy en día disfruto mucho tenerte a mi lado.
          </motion.p>

          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Star className="special-icon" />
            <p className="special-text">
              "Un minuto cambió nuestras vidas para siempre"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page2;