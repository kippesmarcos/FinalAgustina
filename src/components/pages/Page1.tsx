import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Page1: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Heart className="header-icon" />
        <h2 className="page-title">Gracias</h2>
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
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Mi China, ¿sabés por qué te agradezco? Porque gracias a vos mis días empezaron a ser mucho más felices. Antes de conocerte, siempre tenía en mi cabeza tener a una persona como vos a mi lado.
          </motion.p>

          <motion.p
            className="secondary-text"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Y de un día para el otro, todo cambió. Así que gracias, gracias por aparecer, gracias por mejorar mis días, mis tardes y mis noches con cualquier gesto tuyo.
          </motion.p>

          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Heart className="special-icon" />
            <p className="special-text">
              "Espero que sigamos adelante como estamos y seamos muy felices"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page1;