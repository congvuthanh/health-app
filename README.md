# Health-App

A responsive health tracking web application built with React and TypeScript, featuring authentication, health metrics visualization, and meal tracking.

## 🚀 Technology Stack

- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **Data Fetching:** React Query (TanStack Query)
- **Styling:** styled-components
- **Testing:** Vitest (80%+ coverage target)
- **State Management:** React Query + React Context (if needed)
- **API Integration:** REST API with OpenAPI schema
- **Code Quality:**
  - ESLint for linting
  - Prettier for code formatting
  - TypeScript for type safety

## 📁 Project Structure

```
health-app/
├── src/
│   ├── api/                            # API layer
│   │   ├── client.ts                   # API client configuration
│   │   ├── endpoints.ts                # API endpoint definitions
│   │   └── types.ts                    # API response types
│   │
│   ├── assets/                         # Static assets (SVG icons, images)
│   │   ├── icons/
│   │   └── images/
│   │
│   ├── components/                     # Reusable components
│   │   ├── common/                     # Generic shared components
│   │   ├── layout/                     # Layout components
│   │   └── features/                   # Feature-specific components
│   │
│   ├── hooks/                          # Custom hooks
│   │   ├── useAuth.ts
│   │   ├── useAchievement.ts
│   │   ├── useHealthRecord.ts
│   │   └── useMealRecord.ts
│   │
│   ├── pages/                          # Page components
│   │   ├── TopPage/                    # Login page
│   │   ├── MyPage/                     # Dashboard
│   │   ├── AuthFailedPage/            # Auth error page
│   │   └── NotFoundPage/              # 404 page
│   │
│   ├── routes/                         # Routing configuration
│   ├── services/                       # Business logic layer
│   ├── store/                          # State management
│   ├── styles/                         # Global styles and theme
│   ├── types/                          # TypeScript type definitions
│   └── utils/                          # Utility functions
```

## 🔑 Key Features

- User authentication with password protection
- Health metrics tracking and visualization
- Meal record management with infinite scrolling
- Responsive design (415px - 1024px+)
- Achievement tracking with visual indicators
- Real-time notifications system
- Accessibility-focused components

## 🏃‍♂️ Getting Started

1. **Prerequisites**
   - Node.js (v20 or higher)
   - pnpm (v8 or higher)

2. **Installation**

   ```bash
   # Clone the repository
   git clone [repository-url]
   cd health-app

   # Install dependencies
   pnpm install
   ```

3. **Development**

   ```bash
   # Start development server
   pnpm dev

   # Run tests
   pnpm test

   # Run tests with coverage
   pnpm test:coverage

   # Lint code
   pnpm lint

   # Format code
   pnpm format
   ```

## 🌐 API Integration

- Base URL: https://health_app_api.dev-arent.workers.dev
- OpenAPI Schema: https://health_app_api.dev-arent.workers.dev/openapi
- Authentication: Password-based with JWT token

## 📱 Responsive Design

- Mobile: 415px minimum
- Desktop: 1024px maximum
- Flexible breakpoints for optimal UX
- No horizontal scrolling
- Touch-friendly interface

## 🎨 Design System

### Typography

#### Fonts

- Japanese: Noto Sans JP (Regular 400, Bold 700)
- Latin/Numbers: Inter (Regular 400, Bold 700)

#### Base Font Size

- Root font size is set to 62.5% (10px base)
- All typography uses rem units (1rem = 10px)

#### Type Scale

All sizes are in rem units for better accessibility and responsive design.

##### Headings

- **H1**: 5.6rem/6.4rem (56px/64px)
- **H2**: 4.8rem/5.6rem (48px/56px)
- **H3**: 4.0rem/4.8rem (40px/48px)
- **H4**: 3.2rem/4.0rem (32px/40px)
- **H5**: 2.4rem/3.2rem (24px/32px)

##### Paragraphs

- **P1**: 2.0rem/2.4rem (20px/24px)
- **P2**: 1.8rem/2.6rem (18px/26px)
- **P3**: 1.6rem/2.4rem (16px/24px)
- **P4**: 1.4rem/2.0rem (14px/20px)
- **P5**: 1.2rem/1.8rem (12px/18px)
- **P6**: 1.0rem/1.4rem (10px/14px)
- **P7**: 0.8rem/1.2rem (8px/12px)

#### Usage Example

```typescript
import styled from 'styled-components';

const Title = styled.h1`
  ${({ theme }) => theme.typography.h1.bold}
  font-family: ${({ theme }) => theme.fonts.alphanumeric};
`;

const JapaneseText = styled.p`
  ${({ theme }) => theme.typography.p2.regular}
  font-family: ${({ theme }) => theme.fonts.japanese};
`;
```

### Assets

- SVG format for project assets
- URL-based images from API responses

## 🧪 Testing Strategy

- Unit tests for utilities and hooks
- Component tests with React Testing Library
- Integration tests for pages
- 80%+ code coverage requirement

## 📦 Build and Deployment

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 🔒 Security Considerations

- Secure authentication flow
- Protected routes
- API token management
- Input validation and sanitization

## 📝 Development Guidelines

1. Follow TypeScript best practices
2. Write tests for new features
3. Maintain responsive design principles
4. Keep accessibility in mind
5. Document new components and utilities
6. Follow ESLint and Prettier rules

## 🤝 Contributing

1. Branch naming: `feature/`, `bugfix/`, `hotfix/`
2. Commit messages: Follow conventional commits
3. PR template: Include description, testing steps, and screenshots
4. Code review: Required before merge
