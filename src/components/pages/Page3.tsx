import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Heart } from 'lucide-react';

const Page3: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <MessageCircle className="header-icon" />
        <h2 className="page-title">¿Por qué me quedo con vos?</h2>
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
              <Heart className="list-icon" />
              <p>Por tu forma de ser conmigo</p>
            </div>

            <div className="list-item">
              <Heart className="list-icon" />
              <p>Porque con vos puedo ser yo mismo sin preocuparme</p>
            </div>

            <div className="list-item">
              <Heart className="list-icon" />
              <p>Porque cada gesto tuyo me hace enamorarme más</p>
            </div>

            <div className="list-item">
              <Heart className="list-icon" />
              <p>Porque tenés una familia muy buena, y me gusta mucho como los amás y cuidás siempre</p>
            </div>
          </motion.div>

          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Heart className="special-icon" />
            <p className="special-text">
              "Con vos encontré todo lo que siempre busqué"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page3;