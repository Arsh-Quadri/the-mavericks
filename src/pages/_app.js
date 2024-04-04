import AppLayout from "src/components/Layout";
import "src/styles/globals.css";
import { CartProvider } from "use-shopping-cart";
import React, { useState, useEffect } from "react";
import auth from "../../public/firebase.init"; // Assuming your Firebase initialization
import { onAuthStateChanged } from "firebase/auth";

const stripeKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null); // Reset user if no user is logged in
      }
    });

    return () => unsubscribe();
  }, [auth]);
  // console.log(user && user.email);
  return (
    <CartProvider stripe={stripeKey} cartMode="checkout-session" currency="USD">
      <AppLayout>
        <Component {...pageProps} user={user} />
      </AppLayout>
    </CartProvider>
  );
}
