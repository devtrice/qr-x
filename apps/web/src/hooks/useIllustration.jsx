import { useRef } from 'react';
import { useInView } from 'framer-motion';


export default function useIllustration() {
    const ref = useRef(null);
    const isInView = useInView(ref);

    const fadeAnimation = ({ x = 0, y = 0, ...options }= {}) => ({
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: { hidden: { x, y, opacity: 0 }, visible: { x: 0, y: 0, opacity: 1 } },
        transition: { duration: 0.25, ease: 'linear', ...options },
    });

    const drawAnimation = (options = {}) => ({
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: { hidden: { pathLength: 0 }, visible: { pathLength: 1 } },
        transition: { duration: 1.5, ease: 'linear', ...options },
    });

    const eraseAnimation = (options = {}) => ({
        initial: 'hidden',
        animate: isInView ? 'visible' : 'hidden',
        variants: { hidden: { pathLength: 1 }, visible: { pathLength: 0 } },
        transition: { duration: 1.5, ease: 'linear', ...options },
    });

    return { ref, fadeAnimation, drawAnimation, eraseAnimation };
}
