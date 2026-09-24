import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Home from '@/pages/Home';
import Navbar from '@/components/Navbar';
import Cart from '@/components/Cart';
import AuthModal from '@/components/auth/AuthModal';
import UserProfileModal from '@/components/auth/UserProfileModal';
import WhatsAppButton from '@/components/WhatsAppButton';
import GheeChat from '@/components/GheeChat';
import ScrollProgress from '@/components/effects/ScrollProgress';
import CursorSpotlight from '@/components/effects/CursorSpotlight';
import FuturisticLoader from '@/components/effects/FuturisticLoader';

const queryClient = new QueryClient();

function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-serif font-bold text-foreground mb-4">404</h1>
        <p className="text-muted-foreground">Page not found</p>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CartProvider>
          <TooltipProvider>
            <FuturisticLoader />
            <ScrollProgress />
            <CursorSpotlight />
            <AuthModal />
            <UserProfileModal />
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
              <Navbar />
              <Router />
              <Cart />
              <WhatsAppButton />
              <GheeChat />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </CartProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;