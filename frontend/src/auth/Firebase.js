import { initializeApp } from "firebase/app";
import { getAuth, signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCRd4Snii_enaCML6HWv8FmDQbj8VPMAXQ",
    authDomain: "ecommerce-f84d8.firebaseapp.com",
    projectId: "ecommerce-f84d8",
    storageBucket: "ecommerce-f84d8.firebasestorage.app",
    messagingSenderId: "846505265674",
    appId: "1:846505265674:web:3f719fddf99b075e76adf3",
    measurementId: "G-FVGXFLW8T6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

// Setup reCAPTCHA (Invisible)
const setupRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });
  }
};

// Send OTP
export const sendOTP = async (phoneNumber) => {
  setupRecaptcha();
  return signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
};

// Verify OTP
export const verifyOTP = async (confirmationResult, otp) => {
  return confirmationResult.confirm(otp);
};
