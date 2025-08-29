import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Flower } from 'lucide-react';

const Page4: React.FC = () => {
  return (
    <div className="page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AlertCircle className="header-icon" />
        <h2 className="page-title">Perdón</h2>
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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Perdón por si en ocasiones fui complicado y difícil de entender. No siempre sé expresarme, pero no significa que te deje de amar.
          </motion.p>

          <motion.p
            className="secondary-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Y sé que a veces no puedo estar cuando me necesitás, pero quiero que sepas que mataría y moriría por vos, y nunca dejaría que nadie te haga algo.
          </motion.p>

          <motion.div
            className="special-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <Flower className="special-icon" />
            <p className="special-text">
              "Mi amor por vos es más fuerte que cualquier error"
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Page4;