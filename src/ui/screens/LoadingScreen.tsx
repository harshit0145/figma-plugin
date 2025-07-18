import React, { useState, useEffect } from 'react';
import lottie from 'lottie-web';
import clockLoader from '../assets/animation/Clock_Loader.json'; 

type Props = {
  onComplete: () => void;
};

const LoadingScreen = ({ onComplete }: Props) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Animate dots with 800ms delay
    const interval = setInterval(() => {
      setDots((prev) => {
        if (prev.length < 3) return prev + '.';
        return '';
      });
    }, 800);

    // Simulate 5-second loading
    const timeout = setTimeout(() => {
      onComplete();
    }, 5000);

    // Load Lottie animation
    const anim = lottie.loadAnimation({
      container: document.getElementById('lottie-container') || document.createElement('div'),
      renderer: 'svg',
      loop: true, // Continuous loop as per client
      autoplay: true,
      animationData: clockLoader,
    });

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
      anim.destroy(); // Cleanup Lottie animation
    };
  }, [onComplete]);

  return (
    <div
      style={{
        width: '100%',
        height: '95vh',
        background: '#FFFFFF',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        boxSizing: 'border-box',
        margin: '0 auto',
      }}
    >
      <h2
        style={{
          fontWeight: 500,
          fontSize: '16px',
          lineHeight: '100%',
          color: '#212325',
          marginBottom: '20px',
        }}
      >
        Generating Recommendations{dots} {/* Updated per client request */}
      </h2>
      <div
        id="lottie-container"
        style={{ width: '225px', height: '225px', marginBottom: '0px' }}
      />
    </div>
  );
};

export default LoadingScreen;