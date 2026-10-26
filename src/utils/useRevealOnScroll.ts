import { useEffect, useRef, useState } from "react";

// Becomes true the first time the element scrolls into view and stays true
const useRevealOnScroll = <T extends Element>() => {
  const ref = useRef<T>(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element || !("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
};

export default useRevealOnScroll;
