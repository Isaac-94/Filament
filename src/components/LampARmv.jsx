import React, { useEffect, useRef, useState } from "react";
import "@google/model-viewer";

const LampARmv = ({ modelPath }) => {
  const modelViewerRef = useRef(null);
  const [arSupported, setArSupported] = useState(null); // null = sin determinar

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const mv = modelViewerRef.current;

    if (!mv) return;

    const handleLoad = () => {
      setArSupported(mv.canActivateAR);
    };

    const handleArStatus = (event) => {
      if (event.detail.status === "failed") {
        setArSupported(false);
      }
    };

    mv.addEventListener("load", handleLoad);
    mv.addEventListener("ar-status", handleArStatus);

    return () => {
      document.body.style.overflow = "auto";
      mv.removeEventListener("load", handleLoad);
      mv.removeEventListener("ar-status", handleArStatus);
    };
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <model-viewer
        ref={modelViewerRef}
        src={modelPath}
        alt="Lámpara en 3D"
        ar
        ar-scale="auto" // ← el fix principal para iOS
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        auto-rotate
        shadow-intensity="1"
        style={{ width: "100%", height: "80vh" }}
      ></model-viewer>

      {arSupported === false && (
        <p style={{ color: "red", textAlign: "center" }}>
          AR no disponible en este dispositivo.
        </p>
      )}
    </div>
  );
};

export default LampARmv;
