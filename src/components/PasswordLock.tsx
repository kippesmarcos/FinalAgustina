import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';
import confetti from 'canvas-confetti';

interface PasswordLockProps {
  onUnlock: () => void;
  correctPassword: string;
}

const PasswordLock: React.FC<PasswordLockProps> = ({ onUnlock, correctPassword }) => {
  const [password, setPassword] = useState('');
  const [isWrong, setIsWrong] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    lock: THREE.Group;
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

    const lockGroup = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(0.8, 1.0, 0.2);
    const bodyMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 100,
      specular: 0x444444
    });
    const lockBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    lockBody.position.y = -0.2;
    lockGroup.add(lockBody);

    const shackleGeometry = new THREE.TorusGeometry(0.4, 0.08, 8, 16, Math.PI);
    const shackleMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffd700,
      shininess: 100,
      specular: 0x444444
    });
    const shackle = new THREE.Mesh(shackleGeometry, shackleMaterial);
    shackle.position.y = 0.3;
    shackle.rotation.z = Math.PI;
    lockGroup.add(shackle);

    const keyholeGeometry = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 8);
    const keyholeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
    const keyhole = new THREE.Mesh(keyholeGeometry, keyholeMaterial);
    keyhole.position.set(0, -0.15, 0.11);
    keyhole.rotation.x = Math.PI / 2;
    lockGroup.add(keyhole);

    scene.add(lockGroup);

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
      
      if (!isUnlocking) {
        lockGroup.rotation.y += 0.01;
        lockGroup.rotation.x = Math.sin(Date.now() * 0.001) * 0.1;
      }
      
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
      lock: lockGroup,
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
  }, [isUnlocking]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword.toLowerCase()) {
      setIsUnlocking(true);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa']
      });
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa']
        });
      }, 250);
      
      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff4444', '#ff6666', '#ff8888', '#ffaaaa']
        });
      }, 400);
      
      if (sceneRef.current) {
        const { lock } = sceneRef.current;
        
        let animationProgress = 0;
        const animationDuration = 600;
        const startTime = performance.now();
        
        const unlockAnimation = () => {
          const currentTime = performance.now();
          const elapsed = currentTime - startTime;
          animationProgress = Math.min(elapsed / animationDuration, 1);
          
          const easeOut = 1 - Math.pow(1 - animationProgress, 3);
          
          lock.rotation.y = easeOut * Math.PI * 4;
          lock.scale.setScalar(1 - easeOut * 0.9);
          lock.position.y = easeOut * 2;
          
          if (animationProgress < 1) {
            requestAnimationFrame(unlockAnimation);
          }
        };
        
        unlockAnimation();
      }
      
      setTimeout(() => {
        onUnlock();
      }, 800);
    } else {
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 500);
    }
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
            animate={isWrong ? { 
              x: [-8, 8, -8, 8, 0],
              rotate: [-2, 2, -2, 2, 0]
            } : {}}
            transition={{ duration: 0.5 }}
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
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Página Protegida
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
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            ¿En qué mes nos conocimos?
          </motion.p>
          
          <form onSubmit={handleSubmit}>
            <motion.input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Escribí el mes..."
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: `2px solid ${isWrong ? '#ff6b6b' : 'rgba(255, 68, 68, 0.6)'}`,
                borderRadius: '8px',
                padding: '8px 10px',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.75rem',
                textAlign: 'center',
                width: '100%',
                marginBottom: '12px',
                outline: 'none',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                borderColor: isWrong ? '#ff6b6b' : 'rgba(255, 68, 68, 0.6)'
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
              autoFocus
            />
            
            <motion.button
              type="submit"
              style={{
                background: 'linear-gradient(135deg, #ff4444 0%, #330000 100%)',
                border: '2px solid rgba(255, 68, 68, 0.8)',
                borderRadius: '8px',
                padding: '8px 16px',
                color: '#fff',
                fontFamily: 'Poppins, sans-serif',
                fontSize: '0.75rem',
                cursor: 'pointer',
                fontWeight: '600',
                textShadow: '0 0 10px rgba(255, 255, 255, 0.8)',
                boxShadow: '0 4px 15px rgba(255, 68, 68, 0.4)',
                width: '100%'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 6px 20px rgba(255, 68, 68, 0.6)'
              }}
              whileTap={{ scale: 0.98 }}
            >
              Abrir
            </motion.button>
          </form>
          
          {isWrong && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                color: '#ff6b6b',
                fontSize: '0.7rem',
                marginTop: '6px',
                fontFamily: 'Poppins, sans-serif'
              }}
            >
              Mes incorrecto, intentá de nuevo
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PasswordLock;