
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Global variable declaration for the environment-injected config
declare const __firebase_config: any;
declare const __app_id: string;
declare const __initial_auth_token: string | undefined;

// Safe parsing of the config
let firebaseConfig: any;
let isMockConfig = false;

try {
  // Check if __firebase_config exists and handle both string and object formats
  if (typeof window !== 'undefined' && typeof (window as any).__firebase_config !== 'undefined') {
    const config = (window as any).__firebase_config;
    if (typeof config === 'string') {
       try {
         firebaseConfig = JSON.parse(config);
       } catch (e) {
         console.warn("Failed to parse __firebase_config string:", e);
       }
    } else if (typeof config === 'object') {
       firebaseConfig = config;
    }
  }
} catch (e) {
  console.warn("Error accessing __firebase_config:", e);
}

// Robust check to ensure config is actually valid before initializing real Auth
// We check if it looks like a real key (not "mock-key" or containing placeholders)
const isValidConfig = firebaseConfig && 
                      firebaseConfig.apiKey && 
                      firebaseConfig.apiKey !== "mock-key" && 
                      !firebaseConfig.apiKey.includes("INSERT_KEY");

if (!isValidConfig) {
  console.log("Firebase config missing or invalid. Enabling Demo Mode.");
  // Provide a structural mock to allow initializeApp to pass without throwing immediately
  firebaseConfig = { 
    apiKey: "mock-key-1234567890", 
    authDomain: "mock.firebaseapp.com", 
    projectId: "mock-project",
    storageBucket: "mock.appspot.com",
    messagingSenderId: "00000000000",
    appId: "1:00000000000:web:0000000000000000000000"
  };
  isMockConfig = true;
}

const app = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
export const isDemoMode = isMockConfig; // Export for UI components to check

export const initializeAuth = async () => {
  // CRITICAL: Do not attempt to sign in if using a mock config.
  // This avoids network errors and 'auth/api-key-not-valid' warnings in console.
  if (isMockConfig) {
      return;
  }

  try {
    if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
      await signInWithCustomToken(auth, __initial_auth_token);
    } else {
      await signInAnonymously(auth);
    }
  } catch (error: any) {
    // Gracefully handle specific API key errors to keep the app running
    console.warn("Firebase authentication failed (Demo Mode active):", error.message);
  }
};
