# Converting HTML to Next.js: FIRMS Code Search Application

## What is Next.js?
Next.js is a React framework that provides features like server-side rendering, static site generation, and automatic routing. It's built on top of React and provides a more structured way to build web applications.

## Conversion Process

### 1. Project Setup
```bash
npx create-next-app@latest firms-code-nextjs --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```
This command created a new Next.js project with:
- TypeScript for type safety
- Tailwind CSS for styling
- ESLint for code quality
- App Router (new Next.js routing system)
- Source directory structure
- Custom import aliases

### 2. Component Structure
The original HTML was split into React components:

#### a. Main Page (`src/app/page.tsx`)
- The main entry point of the application
- Handles data loading and state management
- Contains the header layout with logo and title
- Uses the `'use client'` directive to enable client-side interactivity

#### b. Search Options (`src/components/SearchOptions.tsx`)
- Handles all search functionality
- Manages search mode (general/specific)
- Contains form inputs and search logic
- Uses React state for form management

#### c. Results Table (`src/components/ResultsTable.tsx`)
- Displays search results
- Handles CSV export functionality
- Uses dynamic rendering for table rows

#### d. Disclaimer (`src/components/Disclaimer.tsx`)
- Simple component for the legal disclaimer
- Reusable across the application

### 3. Configuration Files

#### a. Next.js Config (`next.config.js`)
```javascript
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['fonts.cdnfonts.com'],
    unoptimized: true,
  },
}
```
- Enables strict mode for better development
- Configures image optimization
- Allows loading images from external domains

#### b. Tailwind Config (`tailwind.config.js`)
```javascript
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#AC162C',
      },
    },
  },
}
```
- Configures which files Tailwind should scan
- Defines custom colors and theme extensions

#### c. PostCSS Config (`postcss.config.js`)
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```
- Sets up PostCSS plugins for Tailwind and autoprefixer

### 4. Layout and Styling

#### a. Global Styles (`src/app/globals.css`)
- Contains Tailwind directives
- Defines custom component classes
- Sets up responsive design rules

#### b. Layout Component (`src/app/layout.tsx`)
- Defines the root layout
- Includes global fonts and metadata
- Wraps all pages

### 5. Key Improvements

1. **Component-Based Architecture**
   - Better code organization
   - Reusable components
   - Easier maintenance

2. **TypeScript Integration**
   - Type safety
   - Better IDE support
   - Reduced runtime errors

3. **Modern Styling**
   - Utility-first CSS with Tailwind
   - Responsive design
   - Consistent styling

4. **Performance**
   - Image optimization
   - Code splitting
   - Better loading strategies

5. **Development Experience**
   - Hot reloading
   - Better error messages
   - Type checking

### 6. Running the Application

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

4. Start production server:
```bash
npm start
```

### 7. Key Differences from Original HTML

1. **State Management**
   - React hooks instead of global variables
   - Component-level state
   - Better data flow

2. **Event Handling**
   - React event system
   - Controlled components
   - Better form handling

3. **Styling**
   - Tailwind classes instead of custom CSS
   - Responsive design utilities
   - Better maintainability

4. **Performance**
   - Optimized image loading
   - Better code splitting
   - Improved loading times

### 8. Common Issues and Solutions

1. **Image Loading**
   - Use Next.js Image component
   - Configure domains in next.config.js
   - Handle image optimization

2. **Layout Issues**
   - Use Tailwind's flexbox and grid utilities
   - Responsive design classes
   - Container queries

3. **State Management**
   - Use React hooks
   - Component-level state
   - Props for data flow

### 9. Best Practices

1. **Component Organization**
   - Keep components small and focused
   - Use TypeScript interfaces
   - Follow naming conventions

2. **Styling**
   - Use Tailwind utilities
   - Create custom components
   - Maintain consistency

3. **Performance**
   - Optimize images
   - Use proper loading strategies
   - Implement error boundaries

4. **Code Quality**
   - Use TypeScript
   - Follow ESLint rules
   - Write clean, maintainable code

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
