import { CaloriesManagerProvider } from './CaloriesManager.provider';

const createProvider = (...providers) => {
  return providers.reduce(
    (AccumulatedProviders, CurrentProvider) => {
      const AnonymousComponent = ({ children }) => (
        <AccumulatedProviders>
          <CurrentProvider>{children}</CurrentProvider>
        </AccumulatedProviders>
      );
      AnonymousComponent.displayName = 'AnonymousComponent';

      return AnonymousComponent;
    },
    ({ children }) => <>{children}</>,
  );
};

const AppProviders = createProvider(CaloriesManagerProvider);

export default AppProviders;
