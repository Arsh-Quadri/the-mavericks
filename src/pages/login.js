import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import auth from "../../public/firebase.init"; 
// import AuthContext from "./_app"
export default function loginPage() {
    // const { user } =  useContext(AuthContext);
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // Consider adding a loading state for user feedback
//   console.log(user && user.email)
    // useEffect(() => {
    //   // Redirect after isAdminValue is fetched (if applicable)
    //   if (isAdminValue !== null) {
    //     isAdminValue ? router.push("/admin") : router.push("/consumer");
    //   }
    // }, [isAdminValue, router]); // Use router.push for Next.js navigation
  
    const handleSignIn = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
        // Handle successful login (e.g., redirect to appropriate page)
      } catch (error) {
        alert(error.message); // Set the error message
      }
    };
  
    const handleGoogleSignIn = async () => {
      try {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        router.push("/");
        // Handle successful Google login (e.g., redirect)
      } catch (error) {
        alert(error.message);
      }
    };
  
    const handleForgotPassword = async (e) => {
      e.preventDefault(); // Prevent default form submission behavior
      try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset email sent successfully. Check your inbox.");
      } catch (error) {
        alert(error.message);
      }
    };
    return (<div className="bg-[#F7F7F7] pb-10 w-full flex flex-col justify-center items-center relative ">
    <div className="sm:w-[85%] md:w-[50%] lg:w-[34%] relative mt-8 flex flex-col justify-center">
      <h1 className="text-3xl font-[750] relative py-5 left-0 text-left">
        Login or create an account
      </h1>
      <div className="mt-3">
        <h1 className="text-md font-[600] relative  left-0 text-left mb-1">
          Email address
        </h1>
        <input
          type="email"
          value={email}
          className="bg-transparent outline-none placeholder-[#9C784A] pl-2 py-2 w-full rounded-xl border-2 border-[#E8DECF] "
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mt-3">
        <h1 className="text-md font-[600] relative  left-0 text-left">
          Password
        </h1>
        <input
          type="password"
          value={password}
          className="bg-transparent outline-none placeholder-[#9C784A] pl-2 py-2 w-full rounded-xl border-2 border-[#E8DECF] "
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <h1
        className="text-sm text-[#9C784A] font-[500] relative  left-0 cursor-pointer text-center m-auto w-fit py-2 mt-3"
        onClick={handleForgotPassword}
      >
        Forgot password?
      </h1>
      <div
        className="bg-[#F28F0D] hover:bg-[#f89f2b] font-[600] px-4 py-3 rounded-xl cursor-pointer  md:block text-center mt-3"
        onClick={(e) => handleSignIn(e)}
      >
        Log in
      </div>
      <div
        className="bg-[#F5EDE8] hover:bg-[#f3eae5] flex justify-center items-center font-[600] px-4 py-2 rounded-xl cursor-pointer text-center mt-3 gap-2"
        onClick={handleGoogleSignIn}
      >
        {/* <img src={google} alt="" /> */}
        <div>Continue with Google</div>
      </div>
      <h1 className="text-sm text-[#9C784A] font-[500] relative  left-0 text-center py-3 ">
        Don't have an account?
      </h1>
      <Link
        href="/signup"
        className="bg-[#F5EDE8] hover:bg-[#f3eae5] flex justify-center items-center font-[600] px-4 py-2 rounded-xl cursor-pointer text-center gap-2"
      >
        <div>Sign up</div>
      </Link>
    </div>
  </div>)
}