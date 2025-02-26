import React, { useEffect, useState } from "react";
import "@google/model-viewer";

const LampARmv = ({ modelPath }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [arSupported, setArSupported] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    document.body.style.overflow = "hidden";

    const modelViewer = document.getElementById("model-viewer");

    if (modelViewer) {
      // Verificar compatibilidad con AR
      if (modelViewer.canActivateAR) {
        setArSupported(true);
      }

      modelViewer.addEventListener("ar-status", (event) => {
        if (event.detail.status === "failed") {
          console.warn("AR no es compatible en este dispositivo.");
          setArSupported(false);
        }
      });
    }

    return () => {
      document.body.style.overflow = "auto";
      setIsMounted(false);
    };
  }, []);

  if (!isMounted) return null;

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
        id="model-viewer"
        src={modelPath}
        alt="Lámpara en 3D"
        ar
        ar-scale="fixed"
        ar-modes="webxr scene-viewer quick-look"
        ar-hit-test
        camera-controls
        auto-rotate
        shadow-intensity="1"
        scale="0.5 0.5 0.5"
        style={{ width: "100%", height: "80vh" }}
        decoding="async"
      >
        {arSupported && (
          <button
            slot="ar-button"
            style={{
              position: "absolute",
              bottom: "10px",
              left: "50%",
              transform: "translateX(-50%)",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007BFF",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Ver en AR
          </button>
        )}
      </model-viewer>
    </div>
  );
};

export default LampARmv;
