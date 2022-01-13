import { useEffect } from "react";


function  OverlaySpinner () {
  useEffect(() => {
    const overlay = document.getElementById("overlay")
    overlay.style.display = "unset";

    return () => {
      overlay.style.display = "none";
    };
  }, []);

  return <div className="spin overlay-spin" />;
};

export default OverlaySpinner;
