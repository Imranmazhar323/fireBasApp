import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const firebaseConfig = {
  // Your Firebase SDK configuration
  apiKey: "AIzaSyB6JPOgKsNGwPzGeIgrxNHWLbZRdC_vJ4E",
  authDomain: "react-typescript-app-e2e32.firebaseapp.com",
  projectId: "react-typescript-app-e2e32",
  storageBucket: "react-typescript-app-e2e32.appspot.com",
  messagingSenderId: "207270648978",
  appId: "1:207270648978:web:46a787f7cc69d0d5aa9a4b",
  measurementId: "G-PX1ML4G59Q"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

interface FormState {
  step: number;
  firstName: string;
  lastName: string;
  email: string;
}

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    step: 1,
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("formState", formState);

    db.collection('forms').add(formState)
      .then(() => {
        console.log('Form data stored in Firebase.');
        setFormState({
          step: 1,
          firstName: '',
          lastName: '',
          email: '',
        });
      })
      .catch((error:any) => {
        console.error('Error storing form data:', error);
      });
  };

  const { step, firstName, lastName, email } = formState;

  return (
    <div className="App">
      <h1>Stepper Form Example</h1>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2>Step 1</h2>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={() => setFormState((prevState) => ({ ...prevState, step: 2 }))}>
              Next
            </button>
          </div>
        )}
        {step === 2 && (
          <div>
            <h2>Step 2</h2>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <button type="button" onClick={() => setFormState((prevState) => ({ ...prevState, step: 1 }))}>
              Back
            </button>
            <button type="submit">SubmitBtn</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
