# Loading Utilities

This directory contains reusable loading components and utilities for the portfolio application.

## Components

### LoadingSpinner

A flexible loading spinner component with multiple variants and sizes.

```tsx
import { LoadingSpinner } from './loading';

// Basic usage
<LoadingSpinner />

// With custom size and variant
<LoadingSpinner size="lg" variant="skeleton" />

// With text
<LoadingSpinner size="xl" text="Loading Portfolio..." />
```

**Props:**

- `size`: 'sm' | 'md' | 'lg' | 'xl' (default: 'md')
- `variant`: 'spinner' | 'skeleton' | 'pulse' (default: 'spinner')
- `className`: Additional CSS classes
- `text`: Optional loading text

### withLoading HOC

A higher-order component that wraps any component with loading functionality.

```tsx
import { withLoading } from './loading';

const MyComponent = () => <div>Content</div>;
const MyComponentWithLoading = withLoading(MyComponent);

// Usage
<MyComponentWithLoading
  isLoading={true}
  loadingSize="lg"
  loadingVariant="skeleton"
/>;
```

### useLoading Hook

A custom hook for managing loading states with timing controls.

```tsx
import { useLoading } from './loading';

const MyComponent = () => {
  const { isLoading, setLoading } = useLoading({
    initialDelay: 500,
    minLoadingTime: 1000,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return <div>Content</div>;
};
```

**Options:**

- `initialDelay`: Delay before starting loading (default: 0)
- `minLoadingTime`: Minimum time to show loading (default: 500ms)

## Usage in Dynamic Imports

```tsx
import dynamic from 'next/dynamic';
import { LoadingSpinner } from './components/loading';

const MyComponent = dynamic(() => import('./MyComponent'), {
  loading: () => <LoadingSpinner size="lg" variant="skeleton" />,
});
```

## Variants

- **spinner**: Animated spinning circle (best for initial page loads)
- **skeleton**: Gray placeholder blocks (best for content areas)
- **pulse**: Animated lines (best for text-heavy sections)

## Sizes

- **sm**: Small (h-32, spinner: h-8 w-8)
- **md**: Medium (h-64, spinner: h-16 w-16)
- **lg**: Large (h-96, spinner: h-24 w-24)
- **xl**: Extra large (min-h-screen, spinner: h-32 w-32)
