import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCIESsq6NLHlAlBXO6C8qluZSAuK60Vyl4",
  authDomain: "charsadda-chappal.firebaseapp.com",
  projectId: "charsadda-chappal",
  storageBucket: "charsadda-chappal.firebasestorage.app",
  messagingSenderId: "397694699450",
  appId: "1:397694699450:web:a5dfb4f0c14c823734ff83",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
