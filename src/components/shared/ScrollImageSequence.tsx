import React, { useEffect, useRef, useState } from "react";

interface ScrollImageSequenceProps {
  frameCount: number;
  baseUrl: string; // e.g., "/frames/ezgif-frame-"
  extension: string; // e.g., ".jpg"
  className?: string;
  trackRef?: React.RefObject<HTMLElement>;
  onFrameChange?: (frame: number) => void;
}

const ScrollImageSequence: React.FC<ScrollImageSequenceProps> = ({
  frameCount,
  baseUrl,
  extension,
  className = "",
  trackRef,
  onFrameChange,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentFrame = useRef(0);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, "0");
      img.src = `${baseUrl}${frameIndex}${extension}`;

      const onImageLoad = () => {
        count++;
        if (count === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onload = onImageLoad;
      img.onerror = () => {
        console.error(`Failed to load image: ${img.src}`);
        onImageLoad(); // Still count it to avoid blocking the whole sequence
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, [frameCount, baseUrl, extension]);

  const drawImage = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index];

    // Scale image to cover canvas
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Increase crop to 20px to hide black lines in source images
    const cropAmount = 40;

    const sX = 0;
    const sY = cropAmount;
    const sWidth = img.width;
    const sHeight = img.height - (cropAmount * 2);

    const scale = Math.max(canvasWidth / sWidth, canvasHeight / sHeight);
    const x = (canvasWidth / 2) - (sWidth / 2) * scale;
    const y = (canvasHeight / 2) - (sHeight / 2) * scale;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, sX, sY, sWidth, sHeight, x, y, sWidth * scale, sHeight * scale);
  };

  useEffect(() => {
    const handleScroll = () => {
      let progress = 0;

      if (trackRef?.current) {
        const track = trackRef.current;
        const rect = track.getBoundingClientRect();
        // The track is taller than the viewport (e.g. 300vh)
        // Progress is 0 when the top of the track matches top of viewport
        // Progress is 1 when the bottom of the track matches bottom of viewport
        const scrollDistance = track.offsetHeight - window.innerHeight;
        const scrolled = -rect.top;
        progress = Math.min(1, Math.max(0, scrolled / scrollDistance));
      } else {
        // Fallback to section-based logic
        const heroSection = canvasRef.current?.closest('section');
        if (!heroSection) return;
        const rect = heroSection.getBoundingClientRect();
        const sectionHeight = rect.height;
        const scrollPos = window.scrollY;
        const scrollThreshold = sectionHeight + 500;
        progress = Math.min(1, Math.max(0, scrollPos / scrollThreshold));
      }

      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );

      if (currentFrame.current !== frameIndex) {
        currentFrame.current = frameIndex;
        onFrameChange?.(frameIndex);
        requestAnimationFrame(() => drawImage(frameIndex));
      }
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      const parent = canvas?.parentElement;
      if (canvas && parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        drawImage(currentFrame.current);
      }
    };

    if (isLoaded) {
      handleResize();
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      drawImage(0);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded, images, frameCount, onFrameChange]);

  return (
    <div className={`absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none ${className}`}>
      <canvas
        ref={canvasRef}
        className="block w-full h-full object-cover"
        style={{
          opacity: isLoaded ? 1 : 0,
          background: "transparent",
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/20">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      )}
      {/* Subtle overlay to improve content legibility */}
      <div className="absolute inset-0 bg-background/20 backdrop-blur-[1px]" />
    </div>
  );
};

export default ScrollImageSequence;
