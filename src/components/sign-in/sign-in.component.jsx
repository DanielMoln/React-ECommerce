import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  useEffect(() => {
    const handleSignIn = async () => {
      try {
        const response = await getRedirectResult(auth);

        // I have to await it.
        if (response) {
          const userDocRef = await createUserDocumentFromAuth(response.user);
          console.log(userDocRef);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleSignIn();
  }, []);

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={(e) => logGoogleUser()}>
        Sign in with Google Popup
      </button>
      <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button>
    </div>
  );
};
export default SignIn;
