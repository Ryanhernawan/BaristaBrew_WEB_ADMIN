// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDYDZojX0k-aWmvSCbyFBQ1n98pHcx_iws",
  authDomain: "baristabrew-1b136.firebaseapp.com",
  projectId: "baristabrew-1b136",
  storageBucket: "baristabrew-1b136.appspot.com",
  messagingSenderId: "748811314766",
  appId: "1:748811314766:web:ffbfebe00e9b3f857b851f",
  measurementId: "G-GHK2FVERLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app