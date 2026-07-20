import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      // 100ms delay to accommodate lazy-loaded components and rendering schedules
      const timer = setTimeout(() => {
        const id = hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          // Precise offset calculation to prevent header occlusion
          const yOffset = -80; 
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Standard route transitions scroll to absolute top
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [pathname, hash]);

  return null;
}
