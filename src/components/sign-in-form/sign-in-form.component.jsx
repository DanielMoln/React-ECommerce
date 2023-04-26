import { useContext, useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Incorrect password!");
          break;
        case "auth/user-not-found":
          alert("User not found!");
          break;
        case "auth/too-many-requests":
          alert(
            "Too many tries, please for a while before trying to login again!"
          );
          break;
      }
    }
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an acoount?</h2>
      <span>Sign in with your email and password, or with google</span>

      <form onSubmit={handleFormSubmit}>
        <FormInput
          label="Email"
          value={email}
          name="email"
          type="text"
          required
          onChange={handleChange}
        />
        <FormInput
          label="Password"
          value={password}
          name="password"
          type="password"
          required
          onChange={handleChange}
        />

        <div className="buttons-container">
          <Button type="submit">Sing In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Sing in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
export default SignInForm;
