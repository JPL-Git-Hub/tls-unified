# TLS Development Guide

## System Requirements

Client portal system at `thelawshop.com` with path-based portals (`/portal/client-id`).

**Scale:** Maximum 5,000 portals, 10-15 concurrent users
**Quality:** Frictionless, seamless, fast user experience
**Development:** Java 11+ (required for Firebase Firestore emulator)

## Technology Stack

Core technologies for lightweight client portal development. Path-based architecture (`portal.thelawshop.com/client-id`) chosen over subdomains to allow a more minimal stack by eliminating DNS complexity and wildcard certificate management.

**Frontend & Framework**

- **Next.js (App Router)** - Fullstack framework, eliminates separate backend
- **TypeScript** - Type safety across frontend and backend
- **Tailwind CSS** - Utility-first styling, minimal configuration
- **Native forms** - Standard HTML forms, avoids form library dependencies

**Data & Backend**

- **Zod** - Schema validation shared between client and server
- **Firebase** (Auth + Firestore + Storage) - Unified backend services

**Development & Deployment**

- **npm** - Package management
- **Vercel** - Next.js-optimized hosting
- **ESLint + Prettier** - Code consistency
- **SMTP/Nodemailer** - Email notifications via Google Workspace

## Technical Constraints

- **Solo development** - No team collaboration tools needed
- **No testing frameworks** - Manual testing only for MVP
- **Personal GitHub** - Simple git workflow
- **Google Secrets Manager** - Environment variable management
- **macOS Exclusive** - All development happens on macOS, no cross-platform concerns
- **Production-ready MVP** - Build for immediate deployment, not prototyping
- **Self-explanatory naming** - Generate files and folders with clear, obvious names

## Key Features

1. **Marketing website** - Lead capture with Calendly integration
2. **Payment processing** - Stripe API for lead-to-client conversion
3. **Client portal provisioning** - Automated portal creation after payment
4. **Document management** - Initial portal functionality
5. **Authentication flow** - Registration and login at portal subdomain
