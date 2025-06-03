# Agentic Coding Methodology

## Agentic Coding Principles

### Core Directives

1. **Default to "no"** for new dependencies or abstractions
2. **Use existing patterns** - examine codebase for established solutions
3. **Inline business logic solutions over abstractions** - solve directly, don't create frameworks
4. **Self-documenting code** - clear, minimal, lightweight
5. **<100 lines per component** - break down if larger

### The Three Pillars

1. **Lightweight Simplicity** - Complexity is the enemy
2. **Use What Exists** - New tools create new problems
3. **Immediate Understanding** - Code should explain itself

### Core Values

- **Proven Technology** - Established tools that just work
- **YAGNI** - Build only what's needed now
- **Single Responsibility** - Each code piece does one thing well

### Immediate Indicators of Success

- `npm run dev` starts without errors
- TypeScript compiles clean
- Feature works as specified
- Code is self-explanatory
- Requires zero additional documentation
- Uses only existing dependencies
- Follows established patterns from the codebase
- Solves the immediate problem without anticipating future needs
- Use semantic component names - Clear interface structure
- Keep business logic explicit - Direct implementations without hidden abstractions

### Failure Indicators Requiring Correction

- New dependencies added
- TypeScript errors multiply
- Code exceeds 100 lines without clear boundaries
- Purpose unclear from reading code

### Key Principles Violated by Over-Engineering

1. **YAGNI Violation**: Building features before they're needed
2. **Premature Abstraction**: Creating layers that don't add value
3. **Technology Overreach**: Adding tools when simpler solutions exist
4. **Complexity Creep**: Each abstraction adds cognitive load
5. **Maintenance Burden**: More code means more places for bugs

**Remember**: The best code is often the code you don't write. CC succeeds through lightweight simplicity, not sophistication.

## Session Startup

1. Begin each terminal session by reviewing `/Users/josephleon/repos/tls-unified/docs`.
2. Have CC read 01-coding_methodology.md and 00-project_overview.md first.
3. Then provide focused task prompts without duplicating context.

## Debugging Approach

Use console.log only when actively debugging. Remove after fixing. Let platform tools handle production logging.

## Decision Trees

### Component Creation

1. Does this solve an immediate pain point? (No → Stop)
2. Can existing components handle this? (Yes → Use existing)
3. Would this be under 100 lines? (No → Break down)
4. → Create lightweight component

### Feature Implementation

1. Does existing codebase have similar pattern? (Yes → Follow pattern)
2. Can this be implemented without new dependencies? (No → Stop)
3. → Implement clear solution

### Dependency Check

1. Does Next.js provide this? (Yes → Use Next.js)
2. Does Firebase SDK handle this? (Yes → Use Firebase)
3. Does Tailwind solve this? (Yes → Use Tailwind)
4. → Stop. No new dependencies.

### Scenario: "We need better error handling"

❌ **Wrong**: Create an error handling framework with custom error classes
✅ **Right**: Use lightweight try/catch with clear error messages and toast notifications

### Scenario: "Need state management"

❌ **Wrong**: Add Redux or complex state management library
✅ **Right**: Use React Context for auth, local state for components, Firebase for persistence

## Pattern Recognition

| Need          | Use                                  | Location                   |
| ------------- | ------------------------------------ | -------------------------- |
| Auth checking | Firebase Auth direct                 | Import from @/lib/firebase |
| Data fetching | Firebase SDK direct                  | Custom hooks in @/hooks    |
| Forms         | Native forms + React state           | @/components/forms         |
| Styling       | Tailwind wrapper components          | @/components/ui            |
| State         | useState (local) or Context (global) | In component or @/contexts |

## Anti-Pattern Detection

**Automatically reject code containing:**

- "abstract class" → Stop
- "interface Factory" → Stop
- "export \* from" → Stop
- Custom HTTP clients → Use Firebase SDK
- Multiple state management → Use React built-ins
- Custom routing → Use Next.js App Router

## Preferred AI Responses

**Use these patterns:**

- "Use existing pattern from [specific file]"
- "Follow [pattern] from existing codebase"
- "Keep lightweight - under 100 lines"
- "Use Tailwind wrapper components"
- "No new dependencies needed"

**Avoid these responses:**

- "Implement comprehensive testing strategy"
- "Create robust error handling framework"
- "Set up complex deployment pipeline"
- "Refactor into abstraction layer"

## Violation Phrases to Avoid

**Never suggest responses containing:**

- "comprehensive testing strategy"
- "robust error handling"
- "enterprise-grade"
- "complex deployment pipeline"
- "monitoring and observability framework"
- "microservices architecture"
- "distributed services"
- "best practices" (when adding complexity)
- "database migrations" (Firestore is schemaless)
- "API layer abstraction"

## Consistency Check

After implementing changes, review related files for consistency and update any that reference the modified code or patterns.

## CC Execution Principles

### Interactive Environment Default

CC runs on local macOS development machine with full interactive capabilities:

- **Execute commands directly** - don't create scripts/guides
- **Open browser windows** - gcloud auth login, Firebase console access
- **Interactive prompts** - handle confirmations, selections, user input
- **Install software** - brew install, npm install, gcloud commands
- **File operations** - create, edit, move files directly

### When CC Creates Scripts vs Executes

**Execute directly:**

- Authentication (gcloud auth login)
- Package installation (brew install)
- Firebase setup commands
- File creation/editing
- Testing and verification

**Create scripts only when:**

- Complex multi-step processes user will repeat
- User specifically requests a reusable script
- Process requires manual review between steps

### Anti-Pattern: Documentation Over Action

❌ **Wrong**: "Since we're in non-interactive environment, here's a guide..."
✅ **Right**: "I'll authenticate you now" → executes gcloud auth login

❌ **Wrong**: "Here's a script to install Firebase CLI"
✅ **Right**: Executes brew install firebase-cli directly

### Default Assumption

CC should assume full local machine access unless explicitly told otherwise.
