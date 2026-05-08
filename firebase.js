import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA5lfFr54rr99_ttVPMGXiFUBI5SWgFGVg",
  authDomain: "freelance-saas-576c8.firebaseapp.com",
  projectId: "freelance-saas-576c8",
  storageBucket: "freelance-saas-576c8.firebasestorage.app",
  messagingSenderId: "17320746328",
  appId: "1:17320746328:web:43b94276d4c951d69f592d",
  measurementId: "G-JVB62TKK5C"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
