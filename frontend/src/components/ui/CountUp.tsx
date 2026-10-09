import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useSpring } from 'motion/react';

export default function CountUp({
  to,
  from = 0,
  duration = 2,
  className = '',
}: {
  to: number;
  from?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [currentValue, setCurrentValue] = useState(from);

  const springValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(to);
    }
  }, [isInView, to, springValue]);

  useEffect(() => {
    return springValue.on('change', (latest) => {
      setCurrentValue(Math.floor(latest));
    });
  }, [springValue]);

  return (
    <motion.span ref={ref} className={className}>
      {currentValue}
    </motion.span>
  );
}
