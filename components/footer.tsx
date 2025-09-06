import Link from "next/link"
import { SiX, SiFacebook, SiInstagram, SiLinkedin } from "react-icons/si";

export function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t dark:border-slate-800">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-900 dark:text-white">
              Legal<span className="text-teal-600 dark:text-teal-400">Ease</span>
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Simplifying legal access for all Indians through AI-powered tools and plain language explanations.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
              >
                <SiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
              >
                <SiX className="h-5 w-5" />
                <span className="sr-only">X(formerly Twitter)</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
              >
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="text-slate-500 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
              >
                <SiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/chat"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  AI Legal Chatbot
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Case Tracker
                </Link>
              </li>
              <li>
                <Link
                  href="/rights"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Rights Visualizer
                </Link>
              </li>
              <li>
                <Link
                  href="/simplify"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Document Simplifier
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Find Legal Help
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Legal Guides
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Document Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-navy-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-sm text-slate-600 hover:text-teal-600 dark:text-slate-400 dark:hover:text-teal-400"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t dark:border-slate-800 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} LegalEase. All rights reserved.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
            Disclaimer: The information provided on this platform is for general informational purposes only and does
            not constitute legal advice.
          </p>
        </div>
      </div>
    </footer>
  )
}
