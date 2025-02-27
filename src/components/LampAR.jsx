import React, { useEffect, useState } from "react";

const LampAR = ({ modelPath, scale = "0.5 0.5 0.5", color = "#FFFFFF" }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Obtener las dimensiones del dispositivo
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Calcular la resolución de la cámara en función del dispositivo
  const sourceWidth = Math.min(width, height) * window.devicePixelRatio;
  const sourceHeight = Math.max(width, height) * window.devicePixelRatio;

  useEffect(() => {
    // Activa el montaje cuando el usuario entra a la página
    setIsMounted(true);

    // Bloquea el scroll mientras se usa AR
    document.body.style.overflow = "hidden";

    return () => {
      // Restaura el scroll al salir de la página
      document.body.style.overflow = "auto";

      // Detiene la cámara completamente
      const videoElement = document.querySelector("video");
      if (videoElement) {
        const stream = videoElement.srcObject;
        if (stream) {
          stream.getTracks().forEach((track) => track.stop()); // Apaga la cámara
        }
        videoElement.srcObject = null;
        videoElement.remove(); // Elimina el elemento de video del DOM
      }

      // Desmonta la escena AR para evitar que la cámara siga activa
      const arScene = document.querySelector("a-scene");
      if (arScene) {
        arScene.parentNode.removeChild(arScene);
      }

      // Limpia cualquier referencia residual de AR.js o A-Frame
      const arjsScripts = document.querySelectorAll('script[src*="ar.js"]');
      arjsScripts.forEach((script) => script.remove());

      const aframeScripts = document.querySelectorAll('script[src*="aframe"]');
      aframeScripts.forEach((script) => script.remove());

      // Se desmonta completamente la escena AR al salir
      setIsMounted(false);
    };
  }, []);

  // Si el componente no está montado, no renderiza nada
  if (!isMounted) return null;

  return (
    <a-scene
      vr-mode-ui="enabled: false"
      arjs={`sourceWidth: ${sourceWidth}; sourceHeight: ${sourceHeight}; trackingMethod: best; debugUIEnabled: false;`}
      renderer="logarithmicDepthBuffer: true; precision: high;"
    >
      {/* Modelo 3D correctamente posicionado y más alejado */}
      <a-entity
        gltf-model={modelPath}
        scale={scale}
        position="0 0 -3" // Alejamos el modelo en el eje Z
        material={`color: ${color};`}
      ></a-entity>

      {/* Cámara ajustada */}
      <a-camera position="0 1 0" rotation="-10 0 0" rotation-reader></a-camera>

      {/* Luces para mejorar la visibilidad */}
      <a-entity light="type: ambient; color: #FFF; intensity: 0.8"></a-entity>
      <a-entity light="type: directional; color: #FFF; intensity: 0.5; position: 1 1 1"></a-entity>
    </a-scene>
  );
};

export default LampAR;
