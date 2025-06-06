import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header mb-12">
          <h1 className="tls-title text-5xl lg:text-6xl mb-6">
            The Law Shop
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Professional legal services tailored to your needs
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center max-w-lg mx-auto mt-8">
          <Link
            href="/home-closing"
            className="tls-button sm:w-auto py-4 px-8 text-lg"
          >
            Become a Client
          </Link>
          <Link
            href="/intake"
            className="tls-button sm:w-auto py-4 px-8 text-lg"
          >
            Schedule First Consult
          </Link>
        </div>
      </div>
    </div>
  );
}

