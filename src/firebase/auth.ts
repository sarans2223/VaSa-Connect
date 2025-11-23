'use client';

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut,
} from 'firebase/auth';
import { app } from '@/firebase/config';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function signInWithGoogle() {
  return signInWithPopup(auth, provider);
}

export function signOut() {
  return firebaseSignOut(auth);
}

export function useAuth() {
  return auth;
}
