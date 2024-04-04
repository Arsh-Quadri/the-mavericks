import Link from "next/link";
import Logo from "./Logo";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { useShoppingCart } from "use-shopping-cart";
import { useRouter } from "next/router";
import auth from "../../public/firebase.init";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

export default function Header() {
  const router = useRouter();
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
  const { formattedTotalPrice, cartCount } = useShoppingCart();
  return (
    <header className="sticky top-0 bg-white z-10 shadow">
      <div className="container mx-auto p-6 flex justify-between">
        <Logo />
        <div className="flex gap-7 justify-center items-center">
          {!user ? (
            <>
              <Link href="/login" className="text-gray-700 font-medium">
                Login
              </Link>
              <Link href="/signup" className="text-gray-700 font-medium">
                Sign Up
              </Link>
            </>
          ) : (
            <div
              onClick={() => {
                auth.signOut();
                setUser(null);
                router.push("/");
              }}
              className="text-gray-700 font-medium"
            >
              LogOut
            </div>
          )}

          <Link
            href="/cart"
            className="flex items-center space-x-1 text-gray-700 hover:text-gray-900"
          >
            <div className="relative ">
              <ShoppingCartIcon className="w-7 h-7 flex-shrink-0" />
            </div>
            <p className="text-lg">
              {formattedTotalPrice}{" "}
              <span className="text-sm text-gray-500">({cartCount})</span>
            </p>
          </Link>
        </div>
      </div>
    </header>
  );
}
