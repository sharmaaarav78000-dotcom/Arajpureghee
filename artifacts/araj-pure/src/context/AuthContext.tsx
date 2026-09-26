import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  auth,
  db,
  signInWithGoogle,
  registerWithEmail,
  loginWithEmail,
  quickDemoSignIn,
  logOut,
  onAuthStateChanged,
  type User,
  type UserProfile,
  type OrderItem,
} from '@/lib/firebase';
import { doc, getDoc, onSnapshot, collection, query, where, orderBy } from 'firebase/firestore';

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  orders: OrderItem[];
  loading: boolean;
  isAuthModalOpen: boolean;
  authMode: 'login' | 'register';
  authModalMode: 'login' | 'register';
  isProfileModalOpen: boolean;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setIsProfileModalOpen: (open: boolean) => void;
  signInGoogle: () => Promise<void>;
  signInEmail: (email: string, pass: string) => Promise<void>;
  signUpEmail: (email: string, pass: string, name: string) => Promise<void>;
  signInDemoPatron: () => Promise<void>;
  signOutUser: () => Promise<void>;
  refreshProfile?: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal UI state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribeAuth();
  }, []);

  // Listen to Firestore profile updates for current user
  useEffect(() => {
    if (!user) {
      setProfile(null);
      setOrders([]);
      return;
    }

    const userDocRef = doc(db, 'users', user.uid);
    const unsubscribeProfile = onSnapshot(userDocRef, (snap) => {
      if (snap.exists()) {
        setProfile(snap.data() as UserProfile);
      }
    });

    // Listen to user's orders in Firestore
    const ordersQuery = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );
    const unsubscribeOrders = onSnapshot(ordersQuery, (snapshot) => {
      const list: OrderItem[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      // Sort in-memory to prevent complex composite index requirements
      list.sort((a, b) => {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
        return timeB - timeA;
      });
      setOrders(list);
    });

    return () => {
      unsubscribeProfile();
      unsubscribeOrders();
    };
  }, [user]);

  const signInGoogle = async () => {
    await signInWithGoogle();
    closeAuthModal();
  };

  const signInEmail = async (email: string, pass: string) => {
    await loginWithEmail(email, pass);
    closeAuthModal();
  };

  const signUpEmail = async (email: string, pass: string, name: string) => {
    await registerWithEmail(email, pass, name);
    closeAuthModal();
  };

  const signInDemoPatron = async () => {
    await quickDemoSignIn();
    closeAuthModal();
  };

  const signOutUser = async () => {
    await logOut();
    setIsProfileModalOpen(false);
  };

  const refreshProfile = async () => {
    if (!user) return;
    const snap = await getDoc(doc(db, 'users', user.uid));
    if (snap.exists()) {
      setProfile(snap.data() as UserProfile);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        orders,
        loading,
        isAuthModalOpen,
        authMode,
        authModalMode: authMode,
        isProfileModalOpen,
        openAuthModal,
        closeAuthModal,
        setIsProfileModalOpen,
        signInGoogle,
        signInEmail,
        signUpEmail,
        signInDemoPatron,
        signOutUser,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
