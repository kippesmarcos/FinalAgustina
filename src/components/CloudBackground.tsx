import React from 'react';

const CloudBackground: React.FC = () => {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {/* Nube 1 */}
      <div style={{
        position: 'absolute',
        top: '15%',
        left: '-120px',
        animation: 'float-right 25s infinite linear'
      }}>
        <div style={{
          position: 'relative',
          width: '120px',
          height: '60px'
        }}>
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: '#DC143C',
            borderRadius: '50%',
            top: '0',
            left: '0'
          }} />
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '50px',
            background: '#B22222',
            borderRadius: '50%',
            top: '15px',
            left: '40px'
          }} />
          <div style={{
            position: 'absolute',
            width: '50px',
            height: '50px',
            background: '#8B0000',
            borderRadius: '50%',
            top: '5px',
            left: '80px'
          }} />
        </div>
      </div>

      {/* Nube 2 */}
      <div style={{
        position: 'absolute',
        top: '35%',
        right: '-140px',
        animation: 'float-left 30s infinite linear'
      }}>
        <div style={{
          position: 'relative',
          width: '140px',
          height: '70px'
        }}>
          <div style={{
            position: 'absolute',
            width: '70px',
            height: '70px',
            background: '#CD5C5C',
            borderRadius: '50%',
            top: '0',
            left: '0'
          }} />
          <div style={{
            position: 'absolute',
            width: '90px',
            height: '60px',
            background: '#DC143C',
            borderRadius: '50%',
            top: '20px',
            left: '50px'
          }} />
          <div style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            background: '#B22222',
            borderRadius: '50%',
            top: '10px',
            left: '100px'
          }} />
        </div>
      </div>

      {/* Nube 3 */}
      <div style={{
        position: 'absolute',
        top: '60%',
        left: '-160px',
        animation: 'float-right 35s infinite linear'
      }}>
        <div style={{
          position: 'relative',
          width: '160px',
          height: '80px'
        }}>
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            background: '#8B0000',
            borderRadius: '50%',
            top: '0',
            left: '0'
          }} />
          <div style={{
            position: 'absolute',
            width: '100px',
            height: '70px',
            background: '#DC143C',
            borderRadius: '50%',
            top: '25px',
            left: '60px'
          }} />
          <div style={{
            position: 'absolute',
            width: '70px',
            height: '70px',
            background: '#CD5C5C',
            borderRadius: '50%',
            top: '15px',
            left: '120px'
          }} />
        </div>
      </div>

      <style>{`
        @keyframes float-right {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(100vw + 200px));
          }
        }

        @keyframes float-left {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100vw - 200px));
          }
        }
      `}</style>
    </div>
  );
};

export default CloudBackground;