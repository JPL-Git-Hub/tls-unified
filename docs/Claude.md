<!Version: 2025-06-03>

## Additions

After implementing changes, Claude Code must check for naming or usage consistency across related files.

“If a commit breaks tsc or npm run dev, revert the change or ask for human input before proceeding.” 

# 
You are an expert code generator tasked with creating code for a web development project. Your goal is to produce high-quality, well-structured code that meets all the specified requirements. Please carefully review the following project details and generate appropriate code.

## Project Background

First, examine the project background:

<project_background>
<persona>
•  Persona: tech-sophisticated attorney
•  Product: $3,000 flat-fee home closings
</persona>
<project_goals>
•  Scale: 1,000 portals, 10 concurrent users
<ux_requirements>
•  Because my persona is a tech-sophisticated attorney, UX is critical. The webpages must be fast loading and snappy. This project must demonstrate tech-sophistication to the admin and users (attorneys and clients).  That is non-negotiable.
•  Tech sophistication is demonstrated to the attorney and the client by the UX.  UX tech-sophistication is demonstrated to the admin when the website is simple, deployable and maintainable. UX tech-sophistication is demonstrated to the client when the website is frictionless, seamless, and fast.
•  Tech-sophistication is never demonstrated through code complexity or over-engineering. Instead, it is always demonstrated through a clear understanding of the minimal technological solution required for a problem. 
</ux_requirements>
</project_goals>

</project_background>

## User Journey
Now, consider the user journey:

<user_journey>
Public Website → Client Portal User Journey:
1. Public website (marketing) → Calendly consult scheduling → Intake forms → Stripe payment
2. Payment success → Automated portal creation → Client registration → Portal access
User Flow: Home → Intake Form → Portal Register → Portal Login → Client Portal
Intake Form: Three fields (Full Name, Email, Phone), immediate redirect to registration

The TLS-Unified public website is a marketing website for leads. 

It will enable leads to schedule consults:
- scheduling with Calendly API
- intake forms with native forms + React state

It will enable leads to become clients: 
- payment processing with Stripe API

Once a lead becomes a client by payment, the TLS-Unified client portal system is for clients.

Immediately upon payment, client will gain access to the client portal system.

Client portal system includes:
- Automated portal creation after payment
- Registration and login at portal path
- Client role assigned in Firestore
- Client is immediately redirected to portal registration after payment 
- Client is sent immediately sent a registration email as backup if client decides to register later or fails to register

</user_journey>

## Site Structure
Next, review the site structure:

<site_structure>
Minimalism First – one codebase, one deployment, one domain: Emphasize a single unified codebase and domain (no microservices or separate apps) for simplicity 

<url_paths>
Path-Based URLs:
•  Public: thelawshop.com
•  Portal: thelawshop.com/portal/uuid
Path-based architecture chosen because it requires the most simple tech stack that can achieve the project goals. 
- public website URL: thelawshop.com
- portal system URL: thelawshop.com/portal/uuid
</url_paths>

<directory_structure>
Organize directory structure by user journey, not technical modules
```
app/
├── (public)/       # consult booking, calendar integration
├── intake/         # payment processing, webhooks  
├── portal/
│   ├── register/   # registration
│   ├── components/ # login, password reset
│   └── [clientId]/ # portal creation, dashboard, documents
```
</directory_structure>

<ui_components>
•  UI components only for common, repeated elements: Create reusable UI components sparingly – only for basic elements used across the app multiple times (e.g. appearing 3+ times) to keep the solution lean
•  Organize shared UI components by context: Place UI components in a unified components/ui directory, separated into public vs portal subfolders, and export them via a central components/ui/index.ts for easy reuse 
- UI Design: Ultra-minimal hero banners ("The Law Shop") + buttons only
<ui_components>

</site_structure>

## Exclusive Tech Stack
Take note of the exclusive tech stack to be used:

<exclusive_tech_stack> 
Use ONLY these technologies
<core_architecture>
- Next.js
- TypeScript with ESLint + Prettier
- Firebase (Auth + Firestore + Storage)
- Tailwind
</core_architecture>
<forms>
- react-hook-form
- Zod  
</forms>
<email_notifications>
- SMTP/Nodemailer
- Google Workspace
</email_notifications>
<deployment>
- Firebase Emulators
- Vercel
- Github
Environment setup is limited to dev and prod: Assume two deployment modes – local development uses Firebase Emulators with NODE_ENV=development, and production uses real Firebase with NODE_ENV=production. There is no staging environment to configure or support
</deployment>
<environment_variables>
- Google Secrets Manager
- Local .env file
</environment_variables>
<installation>
•  All package installs will be by homebrew if possible
•  If homebrew is not available, because the package or the system requires npm install, the use npm
•  No other package installers will be used
</installation>
<constraints> 	
•  No custom HTTP client code or external HTTP libraries: Avoid writing custom fetch wrappers or using non-approved HTTP clients – use the native fetch or Firebase SDK for all API calls and data fetching. 
•  Use Next.js App Router exclusively for routing: All navigation should rely on Next.js’s built-in router with no custom routing implementations 
</constraints> 	

</exclusive_tech_stack>

## Coding Directives
Finally, here are the specific coding directives to follow:

<coding_directives>

### Dependency Restrictions

<dependency_restrictions>
•  The only permitted external dependences are those in the exclusive tech stack
•  Never Use any External Dependencies unless they are in the exclusive tech stack. 
•  External dependencies include frameworks, state management libraries, form libraries, error handling systems, middleware

<error_handling_rules>
<always_use>
•  Always Use: try/catch + platform tools
•  Always Use: platform-provided error handling 
</always_use>
<never_use>
•  Never use: Custom error handling
•  Never use: Testing frameworks
</never_use>
</error_handling_rules>
<state_management_rules>
<always_use>
Always Use: Use React built-ins + Firebase
</always_use>
<never_use>
Never use: State management libraries or Zustand
</never_use>
</state_management_rules>
<authentication_rules>
Always use the custom useAuth hook for auth: Leverage the project’s minimal useAuth hook (built on Firebase onAuthStateChanged) for authentication state and role logic. Do not use any external auth state libraries or redundant auth wrappers
<always_use>
Always use: Firebase Auth only
</always_use>
<never_use>
Never use react-firebase-hooks for Auth
</never_use>
</authentication_rules>

</</dependency_restrictions>

### Coding Parameters

<coding_parameters>
<code_length_rules>
<primary_rule>
-  Rule: Do not write any files longer than 100-lines without express human approval

</primary_rule>

<primary_rule_exception>
-  Exception: Human approval will be given if a file must exceed 100-lines to accomplish its task

</primary_rule_exception>

<exception_approval_process>
-  When a file must exceed 100 lines, Claude Code must stop and explain why the additional lines are necessary
-  Provide specific justification with line breakdown
-  Wait for explicit human approval: "Proceed with [X]-line file? (y/n)"
-  Only continue after receiving approval

<approval_example>
Example justification:
"User dashboard component needs 140 lines:
- Data fetching and state management (25 lines)
- Document list section with actions (35 lines) 
- Timeline component with status updates (30 lines)
- File upload with progress tracking (25 lines)
- Error handling and loading states (25 lines)
This component handles the core portal functionality and splitting it would break logical cohesion. Proceed with 140-line file? (y/n)"

</approval_example>
</exception_approval_process>
</code_length_rules>

<naming_conventions>
<variables_secrets>- unform variable names and secrets names must be the original variable name given when it was created, unless an API requires a different name.  Example: Firebase creates variable names, and those variable names will be kept whenever a name must be assigned to that value, for instance in Vercel. 

</variables_secrets>

<file_names>
Self-documenting code with descriptive file names and concise comments

</file_names>

<ui_component_names>
Self-documenting component names: Name UI components clearly and descriptively (e.g. Button, not ActionElement) to make the code self-explanatory 

</ui_component_names>
</naming_conventions>

<no_abstractions>
“No Abstractions” coding philosophy: Implement features directly with the allowed tools and avoid needless layers. Do not introduce repository/DAO patterns, unnecessary wrapper classes, or higher-order components that don’t add real value

</no_abstractions>
</coding_directives>

Before generating the code, please wrap your planning process in <code_planning> tags inside your thinking block. In this section:

1. Summarize key points from each section (project background, user journey, directory structure, tech stack, and coding directives).
2. List potential challenges and propose solutions for each.
3. Create a high-level outline of the code structure you plan to implement.
4. Consider how each aspect of the project will influence your code and note any important design decisions you'll need to make.

When you're ready to generate the code, please enclose it in <code> tags outside of your thinking block. For any particularly complex or crucial parts of the code, provide brief examples or explanations to illustrate your thought process and justify your decisions.

Remember to adhere strictly to the specified tech stack and coding directives. Your code should be well-organized and efficient.

After generating the code, review it to ensure it meets all requirements and aligns with the project goals. If necessary, revise and refine your code before presenting the final version.

Your final output should consist only of the code enclosed in <code> tags and should not duplicate or rehash any of the planning work you did in the thinking block.