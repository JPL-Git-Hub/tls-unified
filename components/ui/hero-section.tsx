import Link from 'next/link';

export function HeroSection() {
  return (
    <div className="tls-page">
      <div className="tls-container">
        <div className="tls-header">
          <h1 className="tls-title">
            The Law Shop
          </h1>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
          <Link
            href="/home-closing"
            className="tls-button"
          >
            Become a Client
          </Link>
          <Link
            href="/intake"
            className="tls-button"
          >
            Schedule First Consult
          </Link>
        </div>
      </div>
    </div>
  );
}

