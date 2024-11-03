import MainLayout from 'layouts/MainLayout/MainLayout';
import './App.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from 'lib/reactQuery/reactQuery';

function App() {
  return (
    <div className="bg-primary h-screen p-4">
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <div>Home page</div>
        </MainLayout>
      </QueryClientProvider>
    </div>
  );
}

export default App;
