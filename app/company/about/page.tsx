export default function AboutPage() {
  return (
    <div className="min-h-screen px-6 py-20 bg-white dark:bg-slate-900 text-slate-800 dark:text-white transition-all duration-300">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-teal-600 dark:text-teal-400 animate-fadeIn">
          About Us
        </h1>
        <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300 animate-slideUp">
          We’re on a mission to simplify legal access for all Indians using AI. LegalEase bridges the gap
          between law and people through intuitive tools and clear language.
        </p>
      </div>
    </div>
  );
}
