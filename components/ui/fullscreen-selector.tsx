import { useEffect, useRef } from "react";
import { useFullscreen } from "react-haiku";
import { Button } from "./button";
import { Fullscreen } from "lucide-react";

export const FullscreenToggle = () => {
  const documentRef = useRef<HTMLElement>(null);

  useEffect(() => {
    documentRef.current = document.documentElement;
  }, []);

  const { toggleFullscreen } = useFullscreen(documentRef);

  return (
    <div>
      <Button onClick={toggleFullscreen} variant="outline" size="icon">
        <Fullscreen className="w-3 h-3" />
      </Button>
    </div>
  );
};
