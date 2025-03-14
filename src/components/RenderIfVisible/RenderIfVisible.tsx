"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface Props {
  defaultHeight?: number;
  visibleOffset?: number;
  root?: HTMLElement;
  children: ReactNode;
}

export default function RenderIfVisible(props: Props) {
  const {
    defaultHeight = 300,
    visibleOffset = 1000,
    root = null,
    children,
  } = props;

  const [isVisible, setIsVisible] = useState(true);
  const [placeholderHeight, setPlaceholderHeight] = useState(defaultHeight);

  const refWrapper = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodeWrapper = refWrapper.current;
    if (!nodeWrapper) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (typeof window !== undefined && window.requestIdleCallback) {
          window.requestIdleCallback(
            () => setIsVisible(entries[0].isIntersecting),
            {
              timeout: 600,
            }
          );
        } else {
          setIsVisible(entries[0].isIntersecting);
        }
      },
      { root, rootMargin: `${visibleOffset}px 0px ${visibleOffset}px 0px` }
    );

    observer.observe(nodeWrapper);

    return () => {
      if (!nodeWrapper) return;
      observer.unobserve(nodeWrapper);
    };
  }, [root, visibleOffset]);

  // Set height after render
  useEffect(() => {
    if (refWrapper.current && isVisible) {
      setPlaceholderHeight(refWrapper.current.offsetHeight);
    }
  }, [isVisible]);

  return (
    <div ref={refWrapper}>
      {isVisible ? (
        <>{children}</>
      ) : (
        <div style={{ height: placeholderHeight }} />
      )}
    </div>
  );
}
