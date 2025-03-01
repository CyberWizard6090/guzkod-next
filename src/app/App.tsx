import { Providers } from './providers';
import { AppRouter } from './routers';
import 'shared/styles/index.scss';

function App() {
  return (
    <Providers>
      <AppRouter />
    </Providers>
  );
}

export default App;
