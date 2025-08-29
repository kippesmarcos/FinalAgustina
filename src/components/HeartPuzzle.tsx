import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, RotateCcw, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import * as THREE from 'three';

interface HeartPuzzleProps {
  onComplete: () => void;
}

const HeartPuzzle: React.FC<HeartPuzzleProps> = ({ onComplete }) => {
  const [numbers, setNumbers] = useState([3, 7, 1, 5, 8, 2, 6, 4]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [showError, setShowError] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    hearts: THREE.Mesh[];
    animationId: number;
  } | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(60, 60);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    const hearts: THREE.Mesh[] = [];
    const heartShape = new THREE.Shape();
    
    const x = 0, y = 0;
    heartShape.moveTo(x + 25, y + 25);
    heartShape.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y);
    heartShape.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35);
    heartShape.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95);
    heartShape.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35);
    heartShape.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y);
    heartShape.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

    const extrudeSettings = {
      depth: 8,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 2,
      bevelSize: 1,
      bevelThickness: 1
    };

    const heartGeometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    heartGeometry.scale(0.002, 0.002, 0.002);

    for (let i = 0; i < 3; i++) {
      const heartMaterial = new THREE.MeshPhongMaterial({ 
        color: new THREE.Color().setHSL(0, 0.8, 0.4 + i * 0.2),
        shininess: 100
      });
      const heart = new THREE.Mesh(heartGeometry, heartMaterial);
      
      heart.position.set(
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 2,
        (Math.random() - 0.5) * 0.5
      );
      
      hearts.push(heart);
      scene.add(heart);
    }

    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 2, 2);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xff4444, 0.8, 10);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    camera.position.z = 3;

    const animate = () => {
      const animationId = requestAnimationFrame(animate);
      
      hearts.forEach((heart, index) => {
        heart.rotation.x += 0.008 * (index + 1);
        heart.rotation.y += 0.012 * (index + 1);
        heart.position.y += Math.sin(Date.now() * 0.001 + index) * 0.001;
        heart.position.x += Math.cos(Date.now() * 0.0008 + index) * 0.0008;
      });
      
      renderer.render(scene, camera);
      
      if (sceneRef.current) {
        sceneRef.current.animationId = animationId;
      }
    };

    animate();

    sceneRef.current = {
      scene,
      camera,
      renderer,
      hearts,
      animationId: 0
    };

    return () => {
      if (sceneRef.current) {
        cancelAnimationFrame(sceneRef.current.animationId);
        renderer.dispose();
        if (mountRef.current && renderer.domElement) {
          mountRef.current.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  const handleNumberClick = (index: number) => {
    if (isComplete || isUnlocking) return;
    
    if (selectedIndex === null) {
      setSelectedIndex(index);
    } else if (selectedIndex === index) {
      setSelectedIndex(null);
    } else {
      const newNumbers = [...numbers];
      [newNumbers[selectedIndex], newNumbers[index]] = [newNumbers[index], newNumbers[selectedIndex]];
      setNumbers(newNumbers);
      setSelectedIndex(null);
    }
  };

  const checkCompletion = () => {
    if (isUnlocking || isComplete) return;
    
    const isCorrect = numbers.every((num, index) => num === index + 1);
    
    if (isCorrect) {
      setIsComplete(true);
      setIsUnlocking(true);
      
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: any = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa', '#ffd700']
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa', '#ffd700']
        });
      }, 250);
      
      setTimeout(() => {
        onComplete();
      }, 1200);
    } else {
      setAttempts(prev => prev + 1);
      setShowError(true);
      setTimeout(() => setShowError(false), 1500);
    }
  };

  const resetPuzzle = () => {
    setNumbers([3, 7, 1, 5, 8, 2, 6, 4]);
    setSelectedIndex(null);
    setIsComplete(false);
    setAttempts(0);
    setIsUnlocking(false);
    setShowError(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 20,
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            background: 'linear-gradient(135deg, rgba(255, 68, 68, 0.15), rgba(51, 0, 0, 0.25))',
            border: '2px solid rgba(255, 68, 68, 0.6)',
            borderRadius: '12px',
            padding: '15px',
            textAlign: 'center',
            backdropFilter: 'blur(5px)',
            boxShadow: '0 0 30px rgba(255, 68, 68, 0.4)',
            maxWidth: '250px',
            width: '90%'
          }}
        >
          <motion.div
            ref={mountRef}
            style={{ 
              margin: '0 auto 10px',
              width: '60px',
              height: '60px'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />

          <motion.h3
            style={{
              fontFamily: 'Dancing Script, cursive',
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#fff',
              margin: '0 0 8px 0',
              textShadow: '0 0 15px rgba(255, 68, 68, 0.8)'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Puzzle del Corazón
          </motion.h3>
          
          <motion.p
            style={{
              color: '#f0f0f0',
              fontFamily: 'Poppins, sans-serif',
              fontSize: '0.75rem',
              marginBottom: '12px',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.6)'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            Ordena los números del 1 al 8
          </motion.p>

          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              gap: '6px',
              width: '160px',
              height: '80px',
              margin: '0 auto 12px'
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            {numbers.map((number, index) => {
              const isSelected = selectedIndex === index;
              
              return (
                <motion.button
                  key={index}
                  onClick={() => handleNumberClick(index)}
                  disabled={isComplete || isUnlocking}
                  style={{
                    width: '35px',
                    height: '35px',
                    background: isSelected 
                      ? 'linear-gradient(135deg, #ffd700 0%, #ff8c00 100%)'
                      : 'linear-gradient(135deg, #ff4444 0%, #330000 50%, #000 100%)',
                    border: `2px solid ${isSelected ? '#ffd700' : 'rgba(255, 68, 68, 0.6)'}`,
                    borderRadius: '6px',
                    cursor: (isComplete || isUnlocking) ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: isSelected 
                      ? '0 0 12px rgba(255, 215, 0, 0.8)' 
                      : '0 2px 6px rgba(0, 0, 0, 0.3)',
                    color: '#fff',
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    textShadow: '0 0 8px rgba(0, 0, 0, 0.9)',
                    opacity: (isComplete || isUnlocking) ? 0.5 : 1
                  }}
                  whileHover={!(isComplete || isUnlocking) ? { scale: 1.05 } : {}}
                  whileTap={!(isComplete || isUnlocking) ? { scale: 0.95 } : {}}
                  animate={isSelected ? { scale: 1.1 } : { scale: 1 }}
                >
                  {number}
                </motion.button>
              );
            })}
          </motion.div>

          <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginBottom: '8px' }}>
            <motion.button
              onClick={checkCompletion}
              disabled={isUnlocking || isComplete}
              style={{
                background: 'linear-gradient(135deg, #ff4444 0%, #330000 100%)',
                border: '2px solid rgba(255, 68, 68, 0.8)',
                borderRadius: '6px',
                padding: '6px 12px',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.7rem',
                cursor: (isUnlocking || isComplete) ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(255, 68, 68, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                opacity: (isUnlocking || isComplete) ? 0.5 : 1
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: (isUnlocking || isComplete) ? 0.5 : 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={!(isUnlocking || isComplete) ? { 
                scale: 1.02,
                boxShadow: '0 6px 16px rgba(255, 68, 68, 0.6)'
              } : {}}
              whileTap={!(isUnlocking || isComplete) ? { scale: 0.98 } : {}}
            >
              <CheckCircle style={{ width: '12px', height: '12px' }} />
              {isComplete ? '¡Completado!' : 'Verificar'}
            </motion.button>

            <motion.button
              onClick={resetPuzzle}
              disabled={isUnlocking || isComplete}
              style={{
                background: 'linear-gradient(135deg, #666 0%, #333 100%)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '6px',
                padding: '6px 12px',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.7rem',
                cursor: (isUnlocking || isComplete) ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.4)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                opacity: (isUnlocking || isComplete) ? 0.5 : 1
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: (isUnlocking || isComplete) ? 0.5 : 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              whileHover={!(isUnlocking || isComplete) ? { 
                scale: 1.02,
                boxShadow: '0 6px 16px rgba(255, 255, 255, 0.3)'
              } : {}}
              whileTap={!(isUnlocking || isComplete) ? { scale: 0.98 } : {}}
            >
              <RotateCcw style={{ width: '12px', height: '12px' }} />
              Reset
            </motion.button>
          </div>

          {attempts > 0 && !isComplete && (
            <motion.p
              style={{
                color: '#aaa',
                fontSize: '0.65rem',
                marginTop: '4px',
                fontFamily: 'Poppins, sans-serif'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Intentos: {attempts}
            </motion.p>
          )}
          
          {showError && (
            <motion.p
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                color: '#ff6b6b',
                fontSize: '0.7rem',
                marginTop: '6px',
                fontFamily: 'Poppins, sans-serif',
                fontWeight: '500'
              }}
            >
              ¡Orden incorrecto! Intenta de nuevo
            </motion.p>
          )}

          <motion.p
            style={{
              color: '#ccc',
              fontSize: '0.65rem',
              marginTop: '6px',
              fontFamily: 'Poppins, sans-serif'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.6 }}
          >
            {isComplete 
              ? '¡Puzzle completado!' 
              : selectedIndex !== null 
                ? 'Toca otro número para intercambiar' 
                : 'Toca un número para seleccionar'
            }
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default HeartPuzzle;