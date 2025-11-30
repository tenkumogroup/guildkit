<!--
Sync Impact Report:
- Version: NEW → 1.0.0
- Initial constitution creation
- Added principles: Code Quality, Testing Standards, User Experience Consistency, Performance Requirements
- Templates status:
  ✅ plan-template.md - Constitution Check section aligns with principles
  ✅ spec-template.md - User scenarios and requirements align with UX/testing principles
  ✅ tasks-template.md - Test-first approach and story-based organization align with principles
  ✅ AGENTS.md - Architecture notes align with tech stack principle
- Follow-up: None - all placeholders filled
-->

# Searcha Constitution

## Core Principles

### I. Code Quality First

All code MUST meet quality standards before merging:
- Type safety: TypeScript strict mode enabled, no `any` types without explicit justification
- Linting: ESLint configurations (`@phanect/lint`, `@phanect/lint-react`) MUST pass with zero warnings
- Code review: All changes require review focusing on maintainability, readability, and adherence to Next.js best practices
- Documentation: Public APIs, complex logic, and non-obvious decisions MUST be documented inline
- Consistent patterns: Follow established patterns (Drizzle ORM for data, Server Actions for mutations, React Server Components by default)

**Rationale**: Technical debt compounds rapidly in web applications. Enforcing quality at commit time prevents accumulation of maintenance burden and ensures long-term project health.

### II. Testing Standards

Testing MUST follow these requirements:
- **Critical paths**: User authentication, data mutations, payment flows MUST have automated tests before production deployment
- **Test types**: Unit tests for utilities/helpers, integration tests for database operations, E2E tests for critical user journeys
- **Test coverage**: New features MUST include tests for happy path and error scenarios
- **Test-first encouraged**: For complex features, write tests before implementation to clarify requirements
- **No broken tests**: CI MUST pass before merge; failing tests block deployment

**Rationale**: While not enforcing strict TDD, we require tests for critical functionality to prevent regressions and ensure reliability. The job search platform handles sensitive user data and career decisions requiring high confidence.

### III. User Experience Consistency

User-facing features MUST maintain consistency:
- **Design system**: Use established Tailwind CSS patterns and components defined in `src/components/`
- **Responsive design**: All pages MUST be mobile-responsive (test at 375px, 768px, 1024px, 1920px)
- **Accessibility**: WCAG 2.1 Level AA compliance for interactive elements (keyboard navigation, ARIA labels, color contrast)
- **Loading states**: Display loading indicators for async operations >300ms
- **Error handling**: User-friendly error messages, never expose stack traces or technical details to end users
- **Performance**: Pages MUST be interactive within 2 seconds on 3G networks (measured via Lighthouse)

### IV. Performance Requirements

Application MUST meet performance baselines:
- **Initial page load**: First Contentful Paint (FCP) <0.5s, Largest Contentful Paint (LCP) <1s
- **Interactivity**: Time to Interactive (TTI) <1s, First Input Delay (FID) <100ms
- **Database queries**: N+1 queries forbidden; use Drizzle's relational queries and eager loading
- **Image optimization**: Use Next.js Image component with appropriate sizes and formats (WebP/AVIF).
- **Caching**: Static pages cached at CDN, dynamic data cached with appropriate staleness (ISR/SSG where applicable)

**Rationale**: Performance is a feature. Slow applications lose users, hurt SEO, and waste infrastructure costs. Next.js provides tools for optimization—we MUST use them.

### V. Security by Default

Security MUST be built-in, not bolted-on:
- **Authentication**: Use Better Auth for all user authentication (already integrated)
- **Authorization**: Server-side validation for all mutations; never trust client input
- **Data validation**: Zod schemas for all user inputs (forms, API endpoints)
- **Secrets management**: No secrets in code; use environment variables, never commit `.env`
- **SQL injection prevention**: Parameterized queries only (Drizzle ORM provides this)
- **XSS prevention**: React escapes by default; use `dangerouslySetInnerHTML` only with sanitization
- **HTTPS only**: Production MUST enforce HTTPS for all connections

**Rationale**: Security breaches destroy trust and expose legal liability. Defense-in-depth with secure defaults prevents most vulnerabilities.

## Technology Standards

### Stack Consistency

- **Framework**: Next.js 16.x (App Router only, no Pages Router)
- **Language**: TypeScript 5.x with strict mode
- **Database**: PostgreSQL via Drizzle ORM
- **Storage**: S3-compatible object storage via `@aws-sdk/client-s3`
- **Authentication**: Better Auth 1.x
- **Styling**: Tailwind CSS 4.x
- **Linting**: ESLint with `@phanect/lint` and `@phanect/lint-react`
- **Package manager**: pnpm (defined in `packageManager` field)
- **Task runner**: mise-en-place (no npm scripts)

New technology additions MUST be justified by clear need and approved through constitution amendment process.

**Rationale**: Consistency reduces cognitive load, simplifies onboarding, and leverages existing expertise. Technology sprawl increases maintenance burden.

### Development Environment

- **Node.js**: v24.x
- **Container runtime**: Podman Compose for local development (PostgreSQL + MinIO)
- **Code style**: Enforced via ESLint
- **IDE support**: Configuration provided for VS Code and compatible editors

## Development Workflow

### Feature Development Process

1. **Specification**: Create feature spec in `.specify/specs/[###-feature-name]/spec.md` with user stories and acceptance criteria
2. **Planning**: Generate implementation plan via `/speckit.plan` command
3. **Constitution check**: Verify alignment with principles before implementation
4. **Implementation**: Follow task-based workflow from generated `tasks.md`
5. **Testing**: Implement tests for critical paths and edge cases
6. **Review**: Code review verifying quality, performance, security, and UX standards
7. **Deployment**: Merge to main triggers automated deployment (CI/CD)

### Quality Gates

Before merging to main:
- ✅ ESLint passes with zero errors/warnings
- ✅ TypeScript compiles with zero errors
- ✅ All tests pass (if feature includes tests)
- ✅ Performance budgets met (Lighthouse CI)
- ✅ Code review approved by maintainer
- ✅ No security vulnerabilities in dependencies

### Naming Conventions

- **Branches**: `###-feature-name` format (e.g., `001-user-authentication`)
- **Commits**: Conventional Commits format (`feat:`, `fix:`, `chore:`, etc.)
- **Files/directories**: kebab-case for routes, PascalCase for React components, camelCase for utilities

## Governance

### Amendment Process

1. Propose change with rationale and impact analysis
2. Document affected code/processes
3. Gain approval from project maintainer
4. Update constitution with version bump (semantic versioning)
5. Propagate changes to templates and documentation
6. Communicate changes to all contributors

### Compliance

- Constitution supersedes ad-hoc practices
- All PRs MUST reference constitution compliance
- Violations require explicit justification and approval
- `AGENTS.md` provides runtime development guidance aligned with this constitution

**Version**: 1.0.0 | **Ratified**: 2025-12-01 | **Last Amended**: 2025-12-01
