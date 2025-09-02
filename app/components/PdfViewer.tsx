"use client";

import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import react-pdf components to avoid SSR issues
const Document = dynamic(() => import('react-pdf').then(mod => mod.Document), {
  ssr: false,
  loading: () => <div className="text-center py-8">Loading PDF viewer...</div>
});

const Page = dynamic(() => import('react-pdf').then(mod => mod.Page), {
  ssr: false
});

const PdfViewer = ({ url }: { url: string }) => {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(undefined);
  const [containerHeight, setContainerHeight] = useState<number | undefined>(undefined);
  const [pageAspect, setPageAspect] = useState<number | undefined>(undefined); // width / height

  useEffect(() => {
    setIsClient(true);
    // Set the worker source for react-pdf using local file
    import('react-pdf').then(({ pdfjs }) => {
      pdfjs.GlobalWorkerOptions.workerSrc = '/pportfolio/pdfjs/pdf.worker.min.js';
    });
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const update = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const availableHeight = window.innerHeight - rect.top - 24; // leave small padding at bottom
      if (width && width !== containerWidth) setContainerWidth(width);
      if (availableHeight && availableHeight !== containerHeight) setContainerHeight(availableHeight);
    };

    update();

    const ro = new ResizeObserver(() => update());
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, [isClient, containerWidth, containerHeight]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const onPageLoadSuccess = (page: any) => {
    try {
      const vp = typeof page?.getViewport === 'function' ? page.getViewport({ scale: 1 }) : undefined;
      const w = vp?.width ?? page?.view?.[2];
      const h = vp?.height ?? page?.view?.[3];
      if (w && h && h !== 0) setPageAspect(w / h);
    } catch (_) {}
  };

  if (!isClient) {
    return <div className="text-center py-8">Loading PDF viewer...</div>;
  }

  // Compute a width that fits both the container width and height (keeping aspect)
  let computedWidth: number | undefined = containerWidth;
  if (pageAspect && containerHeight && containerWidth) {
    const widthByHeight = containerHeight * pageAspect; // width we can have if constrained by height
    computedWidth = Math.min(containerWidth, widthByHeight);
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div ref={containerRef} className="w-full border border-gray-300 rounded-lg shadow-lg relative">
        <Document
          file={url}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex justify-center"
        >
          <Page
            pageNumber={pageNumber}
            className="w-full"
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={computedWidth}
            onLoadSuccess={onPageLoadSuccess}
          />
        </Document>
      </div>
    </div>
  );
};

export default PdfViewer;
