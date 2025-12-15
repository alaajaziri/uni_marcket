import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDy0amPic_0XU5Ef1pxj9AfuDTfpoI1S4I",
  authDomain: "unimarcket-3060e.firebaseapp.com",
  projectId: "unimarcket-3060e",
  storageBucket: "unimarcket-3060e.firebasestorage.app",
  messagingSenderId: "518803341614",
  appId: "1:518803341614:web:b824c5f4eac668aa96babf",
  measurementId: "G-FQ3R0RD8MR"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
