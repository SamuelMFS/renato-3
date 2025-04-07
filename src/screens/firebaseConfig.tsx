import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDwBwbg1QrjzW0QBwpUnzeUrWGh0VlN0AY",
  authDomain: "cafeteria-4eed8.firebaseapp.com",
  projectId: "cafeteria-4eed8",
  storageBucket: "cafeteria-4eed8.firebasestorage.app",
  messagingSenderId: "478340728039",
  appId: "1:478340728039:web:3a0e33ca3f8444bd7d4e42",
  measurementId: "G-1DWW19WP2L"
};

const app = initializeApp(firebaseConfig);

// Instancia do Firebase Auth
const auth = getAuth(app);

// Instancia do Realtime Database
const db = getDatabase(app);

export { db, auth };
