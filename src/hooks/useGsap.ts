import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let isRegistered = false;

export function useGsap() {
  useEffect(() => {
    if (!isRegistered && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      isRegistered = true;
    }
  }, []);

  return { gsap, ScrollTrigger };
}

export default useGsap;
