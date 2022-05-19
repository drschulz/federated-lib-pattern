import React, { ComponentType } from "react";

interface FederatedWrapperProps {
  fallback: () => React.ReactNode;
}

class FederatedWrapper extends React.Component<FederatedWrapperProps, { hasError: boolean }> {
  constructor(props: FederatedWrapperProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      console.log('Using fallback component ...');
      return this.props.fallback();
    }

    console.log('Using remote component!');
    return this.props.children;
  }
}

export function FederatedComponent<T>(federatedComponent: () => Promise<{ default: React.ComponentType<T>}>, FallbackComponent: React.ComponentType<T>)  {
  const Federated = React.lazy<React.ComponentType<T>>(federatedComponent);

  const WrapperComponent: React.FC<T> = (props) => (
    <FederatedWrapper fallback={() => <FallbackComponent { ...props } />}>
      <React.Suspense fallback={<div>loading...</div>}>
        { /* typescript getting whiny .... */}
        <Federated {...props as any} />
      </React.Suspense>
    </FederatedWrapper>
  )

  return WrapperComponent;
}