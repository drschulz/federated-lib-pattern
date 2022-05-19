
type WrappedFunction<T extends (...args: any[]) => any> = (...args: Parameters<T>) => ReturnType<T>;


export function federatedFunction<T extends (...args: any[]) => any>(federatedFunction: () => Promise<{ default: T }>, fallbackFunction: T): WrappedFunction<T> {
  let resolvedFederatedFunction: T | null = null;
  federatedFunction().then((m) => resolvedFederatedFunction = m.default).catch(() => null);

  const fn: WrappedFunction<T> = (...args) => {
    if (resolvedFederatedFunction) {
      console.log('using remote function!');
      return resolvedFederatedFunction(...args);
    }

    console.log('using fallback function');
    return fallbackFunction(...args);
  };

  return fn;
}