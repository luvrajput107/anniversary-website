import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ShakeDetector = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let lastAcceleration = { x: 0, y: 0, z: 0 };
    let shakeThreshold = 15; // Adjust sensitivity
    let shakeTimeout;

    const handleMotion = (event) => {
      const acceleration = event.acceleration || event.accelerationIncludingGravity;
      
      if (!acceleration) return;

      const deltaX = Math.abs(acceleration.x - lastAcceleration.x);
      const deltaY = Math.abs(acceleration.y - lastAcceleration.y);
      const deltaZ = Math.abs(acceleration.z - lastAcceleration.z);

      if (deltaX > shakeThreshold || deltaY > shakeThreshold || deltaZ > shakeThreshold) {
        clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          // Show message and redirect
          if (window.confirm('You\'ve unlocked something special…')) {
            navigate('/for-my-babyji');
          }
        }, 500);
      }

      lastAcceleration = {
        x: acceleration.x || 0,
        y: acceleration.y || 0,
        z: acceleration.z || 0
      };
    };

    // Request permission for device motion (iOS 13+)
    if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response === 'granted') {
            window.addEventListener('devicemotion', handleMotion);
          }
        })
        .catch(console.error);
    } else if (typeof window.DeviceMotionEvent !== 'undefined') {
      // For browsers that support it without permission
      window.addEventListener('devicemotion', handleMotion);
    }

    return () => {
      window.removeEventListener('devicemotion', handleMotion);
      clearTimeout(shakeTimeout);
    };
  }, [navigate]);

  return null;
};

export default ShakeDetector;

