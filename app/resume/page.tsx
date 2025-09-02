import PdfViewer from '../components/PdfViewer'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

export default function ResumePage() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Resume
      </h1>
      
      <div className="w-full relative pt-4 pr-4">
        <div className="absolute top-6 right-6 z-10">
          <a
            href="/pportfolio/Ben Chau Resume 2025 Final.pdf"
            download="Ben_Chau_Resume_2025.pdf"
            className="inline-flex items-center px-4 py-2 bg-gray-800/70 text-white rounded-md hover:bg-gray-700/90 transition-colors shadow-lg backdrop-blur-sm"
          >
            ↗ Download PDF
          </a>
        </div>
        <div className="w-full">
          <PdfViewer url="/pportfolio/Ben Chau Resume 2025 Final.pdf" />
        </div>
      </div>
    </section>
  )
}
