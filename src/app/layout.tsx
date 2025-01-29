
import { AuthProvider } from '@/contexts/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
    
      <body>
        <AuthProvider>
         <QueryClientProvider client={queryClient}>
          {children}
          <Toaster position="bottom-right" />
          </QueryClientProvider>
        </AuthProvider> 
      </body>
    </html>
  );
}