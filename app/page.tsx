import Image from 'next/image';
import Link from 'next/link';
import { Header } from '../components/ui/header';
import { FeatureCard } from '../components/ui/feature-card';

export default function Home() {
  return (
    <>
      <Header />
      
      <div className="tls-page">
        <div className="tls-container-narrow mx-auto">
          {/* Hero Section */}
          <div className="tls-py-xl md:tls-py-2xl flex flex-col items-center justify-center text-center">
            <h1 className="tls-title mb-6">
              Legal Services <span className="bg-gradient-to-r from-black to-gray-600 dark:from-white dark:to-gray-400 text-transparent bg-clip-text">Redefined</span>
            </h1>
            <p className="tls-subtitle mb-12 max-w-2xl mx-auto">
              Professional legal expertise delivered with modern convenience and clarity
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md mx-auto">
              <Link
                href="/home-closing"
                className="tls-button tls-button-lg"
              >
                Become a Client
              </Link>
              <Link
                href="/intake"
                className="tls-button tls-button-outline tls-button-lg"
              >
                Schedule Consultation
              </Link>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="tls-section">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 tracking-tight">
              Why Choose The Law Shop
            </h2>
            <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
              We combine traditional legal expertise with modern conveniences
            </p>
            
            <div className="tls-grid tls-grid-3 gap-8">
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                }
                title="Fast Response Times"
                description="Get legal answers when you need them most, with our commitment to prompt communication."
                iconBgColor="bg-blue-50 dark:bg-blue-900"
                iconTextColor="text-blue-600 dark:text-blue-300"
                featured={true}
              />
              
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                  </svg>
                }
                title="Transparent Pricing"
                description="Clear, upfront pricing with no hidden fees, so you always know what to expect."
                iconBgColor="bg-green-50 dark:bg-green-900"
                iconTextColor="text-green-600 dark:text-green-300"
              />
              
              <FeatureCard
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                }
                title="Expert Guidance"
                description="Access to skilled attorneys with deep experience in their practice areas."
                iconBgColor="bg-purple-50 dark:bg-purple-900"
                iconTextColor="text-purple-600 dark:text-purple-300"
              />
            </div>
          </div>
          
          {/* Process Section */}
          <div className="tls-section-alt tls-py-xl">
            <div className="tls-container-narrow">
              <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 tracking-tight">
                Our Simple Process
              </h2>
              <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12">
                We&apos;ve streamlined the legal process to make it easier for you
              </p>
              
              <div className="tls-stack tls-stack-lg relative">
                {/* Vertical line for desktop */}
                <div className="hidden md:block absolute left-[calc(50%-1px)] top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700 z-0"></div>
                
                {/* Steps */}
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <h3 className="text-xl font-semibold mb-2">Initial Consultation</h3>
                    <p className="text-gray-600">Schedule a meeting to discuss your legal needs and goals.</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md">1</div>
                  <div className="md:w-1/2 md:hidden"></div>
                </div>
                
                <div className="flex flex-col md:flex-row-reverse items-center gap-8 relative z-10">
                  <div className="md:w-1/2 md:text-left md:pl-12">
                    <h3 className="text-xl font-semibold mb-2">Personalized Plan</h3>
                    <p className="text-gray-600">We develop a customized legal strategy tailored to your situation.</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md">2</div>
                  <div className="md:w-1/2 md:hidden"></div>
                </div>
                
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                  <div className="md:w-1/2 md:text-right md:pr-12">
                    <h3 className="text-xl font-semibold mb-2">Expert Execution</h3>
                    <p className="text-gray-600">Our team handles the details while keeping you informed every step.</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center shadow-md">3</div>
                  <div className="md:w-1/2 md:hidden"></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="tls-section">
            <div className="tls-card tls-card-lg text-center max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                Take the first step toward resolving your legal matters with expert guidance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/home-closing" className="tls-button">
                  Become a Client
                </Link>
                <Link href="/intake" className="tls-button-outline tls-button">
                  Schedule Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
          <div className="tls-container py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-black dark:bg-white rounded-md flex items-center justify-center">
                  <span className="text-white dark:text-black font-bold text-xs">TLS</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">The Law Shop</span>
              </div>
              
              <div className="flex gap-8 flex-wrap items-center justify-center">
                <Link
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  href="/home-closing"
                >
                  <Image aria-hidden src="/file.svg" alt="File icon" width={16} height={16} />
                  Home Closing
                </Link>
                <Link
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  href="/portal"
                >
                  <Image aria-hidden src="/window.svg" alt="Window icon" width={16} height={16} />
                  Client Portal
                </Link>
                <Link
                  className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  href="/intake"
                >
                  <Image aria-hidden src="/globe.svg" alt="Globe icon" width={16} height={16} />
                  Schedule Consultation
                </Link>
              </div>
            </div>
            
            <div className="text-center text-sm text-gray-500 mt-8">
              © {new Date().getFullYear()} The Law Shop. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}