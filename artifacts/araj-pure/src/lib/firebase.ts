import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  getDocFromServer,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  type Firestore,
} from 'firebase/firestore';

import configData from './firebase-config.json';

export const firebaseConfig = {
  projectId: configData.projectId,
  appId: configData.appId,
  apiKey: configData.apiKey,
  authDomain: configData.authDomain,
  firestoreDatabaseId: configData.firestoreDatabaseId,
  storageBucket: configData.storageBucket,
  messagingSenderId: configData.messagingSenderId,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const db: Firestore = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration.");
    }
  }
}
testConnection();

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phone?: string;
  address?: string;
  city?: string;
  pincode?: string;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface OrderItem {
  id: string;
  userId: string;
  userEmail: string;
  userName: string;
  productName: string;
  quantity: number;
  subtotal: number;
  discount: number;
  tax: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI';
  txnId?: string;
  shippingAddress: string;
  phone: string;
  status: 'Confirmed' | 'Dispatched' | 'Delivered';
  createdAt: any;
}

// ── Google Auth ──
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  await syncUserProfile(user);
  return user;
}

// ── Email / Password Auth ──
export async function registerWithEmail(email: string, pass: string, name: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  const user = cred.user;
  if (name.trim()) {
    await updateProfile(user, { displayName: name.trim() });
  }
  await syncUserProfile(user, { displayName: name.trim() });
  return user;
}

export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  await syncUserProfile(cred.user);
  return cred.user;
}

export async function quickDemoSignIn(): Promise<User> {
  const demoEmail = 'patron.demo@arajpure.com';
  const demoPass = 'ArajPure#1985';
  try {
    return await loginWithEmail(demoEmail, demoPass);
  } catch (err: any) {
    if (
      err.code === 'auth/user-not-found' ||
      err.code === 'auth/invalid-credential' ||
      err.code === 'auth/invalid-login-credentials'
    ) {
      return await registerWithEmail(demoEmail, demoPass, 'Patron Guest');
    }
    throw err;
  }
}

export async function logOut(): Promise<void> {
  await signOut(auth);
}

// ── User Profile Sync in Firestore ──
export async function syncUserProfile(user: User, additional: Partial<UserProfile> = {}): Promise<void> {
  if (!user || !user.uid) return;
  const userRef = doc(db, 'users', user.uid);
  const snap = await getDoc(userRef);

  const now = new Date().toISOString();
  if (!snap.exists()) {
    const profile: UserProfile = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || additional.displayName || 'Valued Patron',
      photoURL: user.photoURL,
      phone: additional.phone || '',
      address: additional.address || '',
      createdAt: now,
      lastLoginAt: now,
      ...additional,
    };
    await setDoc(userRef, profile);
  } else {
    await setDoc(
      userRef,
      {
        email: user.email,
        displayName: user.displayName || snap.data()?.displayName,
        photoURL: user.photoURL || snap.data()?.photoURL,
        lastLoginAt: now,
        ...additional,
      },
      { merge: true }
    );
  }
}

export async function updateUserAddressAndPhone(
  uid: string,
  data: { phone?: string; address?: string; city?: string; pincode?: string }
): Promise<void> {
  const userRef = doc(db, 'users', uid);
  await setDoc(userRef, data, { merge: true });
}

// ── Orders in Firestore ──
export type OrderData = OrderItem;

export async function fetchUserOrders(userId: string): Promise<OrderItem[]> {
  try {
    const ordersCol = collection(db, 'orders');
    const q = query(ordersCol, where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const list: OrderItem[] = [];
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      list.push({
        id: docSnap.id,
        ...data,
      } as OrderItem);
    });
    return list;
  } catch (err) {
    console.error('Failed to fetch user orders:', err);
    return [];
  }
}

export async function saveOrder(orderData: Omit<OrderItem, 'id' | 'createdAt'>): Promise<string> {
  const ordersCol = collection(db, 'orders');
  const docRef = await addDoc(ordersCol, {
    ...orderData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export { onAuthStateChanged };
export type { User };
