import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVt7WYaSn6DoDfGd0H9EquCVCoZrouGY8",
  authDomain: "react-task-three-e70a0.firebaseapp.com",
  projectId: "react-task-three-e70a0",
  storageBucket: "react-task-three-e70a0.firebasestorage.app",
  messagingSenderId: "744774159937",
  appId: "1:744774159937:web:b5aef4645da9f0800680c0",
  measurementId: "G-Z2SRDN8RNF"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);