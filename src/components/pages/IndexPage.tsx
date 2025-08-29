import React from 'react';
import { motion } from 'framer-motion';
import { List } from 'lucide-react';

const IndexPage: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <List className="header-icon" />
        <h2 className="page-title">Índice</h2>
      </motion.div>

      <motion.div
        className="page-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="text-content">
          <motion.div
            className="content-list"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>Gracias</p>
            </div>
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>¿Cómo te conocí?</p>
            </div>
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>¿Por qué me quedo con vos?</p>
            </div>
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>Perdón</p>
            </div>
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>Problemas</p>
            </div>
            <div className="list-item">
              <span style={{ color: '#ff4444', fontSize: '1.4em', fontWeight: 'bold' }}>•</span>
              <p>Mi Corazón es Tuyo</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default IndexPage;