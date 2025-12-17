import { motion } from 'motion/react';
import { useEffect, useRef, useState, useMemo } from 'react';

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35
}) => {
  // Parse HTML and split into segments
  const parsedSegments = useMemo(() => {
    return parseHTMLText(text, animateBy);
  }, [text, animateBy]);

  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top' ? { filter: 'blur(10px)', opacity: 0, y: -50 } : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo = useMemo(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 }
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) => (stepCount === 1 ? 0 : i / (stepCount - 1)));

  // Track animation completion
  const completedCountRef = useRef(0);
  const textSegmentsCount = parsedSegments.filter(s => s.type === 'text').length;
  
  const handleSegmentComplete = () => {
    completedCountRef.current += 1;
    if (completedCountRef.current === textSegmentsCount && onAnimationComplete) {
      onAnimationComplete();
    }
  };
  
  // Reset counter when text changes
  useEffect(() => {
    completedCountRef.current = 0;
  }, [text]);

  return (
    <p ref={ref} className={`blur-text ${className} block w-full`}>
      {parsedSegments.map((segment, index) => {
        // Handle HTML elements (br, etc.)
        if (segment.type === 'html') {
          if (segment.tag === 'br') {
            return <br key={`html-${index}`} />;
          }
          // For opening/closing tags, we'll handle them in the text segments
          return null;
        }

        // Regular text segment with animation
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);
        const textSegments = parsedSegments.filter(s => s.type === 'text');
        const segmentIndex = textSegments.findIndex(s => s === segment);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (segmentIndex * delay) / 1000
        };
        spanTransition.ease = easing;

        const isLastTextSegment = segmentIndex === textSegments.length - 1;
        const textContent = segment.text === ' ' ? '\u00A0' : segment.text;
        const needsSpace = segment.needsSpace && animateBy === 'words';

        const animatedSpan = (
          <motion.span
            className="inline-block will-change-[transform,filter,opacity] whitespace-pre-wrap"
            key={`text-${index}`}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={isLastTextSegment ? handleSegmentComplete : undefined}
          >
            {textContent}
            {needsSpace && '\u00A0'}
          </motion.span>
        );

        // Wrap in HTML tag if needed (e.g., <b>, <strong>, etc.)
        if (segment.wrapInTag) {
          const TagName = segment.wrapInTag;
          return (
            <TagName key={`wrapped-${index}`}>
              {animatedSpan}
            </TagName>
          );
        }

        return animatedSpan;
      })}
    </p>
  );
};

export default BlurText;

// Helper Functions
const buildKeyframes = (from, steps) => {
  const keys = new Set([...Object.keys(from), ...steps.flatMap(s => Object.keys(s))]);

  const keyframes = {};
  keys.forEach(k => {
    keyframes[k] = [from[k], ...steps.map(s => s[k])];
  });
  return keyframes;
};

// Parse HTML text and split into segments for animation
const parseHTMLText = (text, animateBy) => {
  if (!text) return [];

  const segments = [];
  
  // Simple regex to find HTML tags
  const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9]*)\b[^>]*>/g;
  const tags = [];
  let match;
  
  // Find all tags
  while ((match = tagRegex.exec(text)) !== null) {
    const tagName = match[1].toLowerCase();
    const fullMatch = match[0];
    // Self-closing tags: <br/>, <br />, or void elements like <br>
    const isSelfClosing = fullMatch.endsWith('/>') || 
                         (tagName === 'br' && !fullMatch.startsWith('</'));
    
    tags.push({
      index: match.index,
      endIndex: match.index + match[0].length,
      fullMatch: match[0],
      tagName: tagName,
      isClosing: match[0].startsWith('</'),
      isSelfClosing: isSelfClosing
    });
  }

  // If no HTML tags, split normally
  if (tags.length === 0) {
    const elements = animateBy === 'words' ? text.split(' ') : text.split('');
    return elements.map((el, idx) => ({
      type: 'text',
      text: el,
      needsSpace: animateBy === 'words' && idx < elements.length - 1,
      wrapInTag: null
    }));
  }

  // Process text with HTML tags
  let currentIndex = 0;
  let openTagStack = [];

  tags.forEach((tag, tagIdx) => {
    // Add text before this tag
    if (tag.index > currentIndex) {
      const textBefore = text.substring(currentIndex, tag.index);
      if (textBefore.trim() || textBefore === ' ') {
        const words = animateBy === 'words' 
          ? textBefore.split(/(\s+)/).filter(w => w.length > 0)
          : textBefore.split('');
        
        words.forEach((word, wordIdx) => {
          if (word.trim() || word === ' ') {
            segments.push({
              type: 'text',
              text: word,
              needsSpace: false,
              wrapInTag: openTagStack.length > 0 ? openTagStack[openTagStack.length - 1] : null
            });
          }
        });
      }
    }

    // Handle the tag
    if (tag.isSelfClosing || tag.tagName === 'br') {
      // Self-closing tags like <br/> or <br>
      segments.push({
        type: 'html',
        tag: tag.tagName,
        isSelfClosing: true
      });
    } else if (tag.isClosing) {
      // Closing tag - remove matching opening tag from stack
      const tagIndex = openTagStack.lastIndexOf(tag.tagName);
      if (tagIndex !== -1) {
        openTagStack.splice(tagIndex, 1);
      }
    } else {
      // Opening tag - add to stack
      openTagStack.push(tag.tagName);
    }

    currentIndex = tag.endIndex;
  });

  // Add remaining text after last tag
  if (currentIndex < text.length) {
    const remainingText = text.substring(currentIndex);
    if (remainingText.trim() || remainingText === ' ') {
      const words = animateBy === 'words'
        ? remainingText.split(/(\s+)/).filter(w => w.length > 0)
        : remainingText.split('');
      
      words.forEach((word, wordIdx) => {
        if (word.trim() || word === ' ') {
          segments.push({
            type: 'text',
            text: word,
            needsSpace: false,
            wrapInTag: openTagStack.length > 0 ? openTagStack[openTagStack.length - 1] : null
          });
        }
      });
    }
  }

  // Add spaces between words if needed
  if (animateBy === 'words') {
    const processedSegments = [];
    segments.forEach((segment, idx) => {
      processedSegments.push(segment);
      if (segment.type === 'text' && idx < segments.length - 1) {
        const nextSegment = segments[idx + 1];
        if (nextSegment && nextSegment.type === 'text' && segment.text !== ' ' && nextSegment.text !== ' ') {
          segment.needsSpace = true;
        }
      }
    });
    return processedSegments;
  }

  return segments;
};
