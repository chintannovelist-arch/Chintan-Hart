import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Global variable declaration for the environment-injected config
declare const __firebase_config: any;
declare const __app_id: string;
declare const __initial_auth_token: string | undefined;

// Safe parsing of the config
let firebaseConfig;
let isMockConfig = false;

try {
  // Check if __firebase_config exists and handle both string and object formats
  if (typeof __firebase_config !== 'undefined') {
    if (typeof __firebase_config === 'string') {
       try {
         firebaseConfig = JSON.parse(__firebase_config);
       } catch (e) {
         console.warn("Failed to parse __firebase_config string:", e);
       }
    } else if (typeof __firebase_config === 'object') {
       firebaseConfig = __firebase_config;
    }
  }
} catch (e) {
  console.warn("Error accessing __firebase_config:", e);
}

// Robust check to ensure config is actually valid before initializing real Auth
// This prevents "auth/api-key-not-valid" if the key is "mock-key" or empty
const isValidConfig = firebaseConfig && 
                      firebaseConfig.apiKey && 
                      firebaseConfig.apiKey !== "mock-key" && 
                      firebaseConfig.apiKey.length > 10; // Basic length check

if (!isValidConfig) {
  console.warn("Firebase config missing, invalid, or using mock key. Auth features will be disabled to prevent errors.");
  firebaseConfig = { 
    apiKey: "mock-key", 
    authDomain: "mock-domain", 
    projectId: "mock-project",
    storageBucket: "mock-bucket",
    messagingSenderId: "00000000000",
    appId: "1:00000000000:web:0000000000000000000000"
  };
  isMockConfig = true;
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';

export const initializeAuth = async () => {
  // CRITICAL: Do not attempt to sign in if using a mock config.
  // This is the primary guard against 'auth/api-key-not-valid'.
  if (isMockConfig) {
      console.log("Skipping authentication: Mock configuration active.");
      return;
  }

  try {
    if (typeof __initial_auth_token !== 'undefined') {
      await signInWithCustomToken(auth, __initial_auth_token);
    } else {
      await signInAnonymously(auth);
    }
  } catch (error: any) {
    // Gracefully handle specific API key errors to keep the app running
    if (error.code === 'auth/api-key-not-valid' || error.message?.includes('api-key-not-valid')) {
        console.warn("Authentication skipped: Invalid Firebase API Key detected.");
    } else {
        console.error("Firebase authentication failed:", error);
    }
  }
};