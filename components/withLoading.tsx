import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface WithLoadingProps {
  isLoading?: boolean;
  loadingSize?: 'sm' | 'md' | 'lg' | 'xl';
  loadingVariant?: 'spinner' | 'skeleton' | 'pulse';
  loadingText?: string;
  loadingClassName?: string;
}

const withLoading = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  defaultLoadingProps?: Partial<WithLoadingProps>,
) => {
  const WithLoadingComponent: React.FC<P & WithLoadingProps> = ({
    isLoading = false,
    loadingSize = 'md',
    loadingVariant = 'spinner',
    loadingText,
    loadingClassName,
    ...props
  }) => {
    if (isLoading) {
      return (
        <LoadingSpinner
          size={loadingSize}
          variant={loadingVariant}
          text={loadingText}
          className={loadingClassName}
          {...defaultLoadingProps}
        />
      );
    }

    return <WrappedComponent {...(props as P)} />;
  };

  WithLoadingComponent.displayName = `withLoading(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithLoadingComponent;
};

export default withLoading;
