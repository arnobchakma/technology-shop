import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React, { useContext, useState } from 'react';
import { Link, useHistory, useLocation, } from 'react-router-dom';
import OtherLogIn from '../OthersLogin/OthersLogin';
import './Signup.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseConfig from '../AuthConfig/firebaseConfig';
import Form from './Form';
import { UserContext } from '../../App';

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}

const Signup = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   const [user, setUser] = useState({
      name: '',
      email: '',
      password: '',
      confirmPass: false,
      success: false
   });
   const [error, setError] = useState({
      name: false,
      email: false,
      password: false,
      confirmPass: false
   });
   const [loading, setLoading] = useState(false);
   // redirect route
   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: "/" } };

   /*----------------Start Create User Using Email and Password -----------------*/
   const handleChange = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      if (name === "name") {
         const nameLength = value.length > 2;
         const nameText = /\w{2}/g.test(value);
         if (nameLength && nameText) {
            const newUser = { ...user };
            newUser.name = value;
            setUser(newUser);
            // error
            const newError = { ...error };
            newError.name = true;
            setError(newError);
         } else {
            const newError = { ...error };
            newError.name = false;
            setError(newError);
         }
      }

      if (name === "email") {
         const emailCheck = /\w{2}@(gmail|email|info|yahoo).com/.test(value);
         if (emailCheck) {
            const newUser = { ...user };
            newUser.email = value;
            setUser(newUser);
            // error
            const newError = { ...error };
            newError.email = true;
            setError(newError);
         } else {
            const newError = { ...error };
            newError.email = false;
            setError(newError);
         }
      }

      if (name === "password") {
         const passCheck = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/.test(value);
         if (passCheck) {
            const newUser = { ...user };
            newUser.password = value;
            setUser(newUser);
            // error
            const newError = { ...error };
            newError.password = true;
            setError(newError);
         } else {
            const newError = { ...error };
            newError.password = false;
            setError(newError);
         }
      }
      if (name === "confirmPass") {
         const prevPass = user.password;
         const nextPass = value;
         if (prevPass === nextPass) {
            const newUser = { ...user };
            newUser.confirmPass = true;
            setUser(newUser);
            // error
            const newError = { ...error };
            newError.confirmPass = true;
            setError(newError);
         } else {
            const newError = { ...error };
            newError.confirmPass = false;
            setError(newError);
         }
      }
   }

   // Handle Create New User
   const handleCreateUser = (e) => {
      const { name, email, password, confirmPass } = user;
      if (name && email && password && confirmPass) {
         setLoading(true);
         const auth = getAuth();
         createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
               const signInUser = userCredential.user;
               updateUserInfo(name);
               // set auth user
               const authUser = { ...loggedInUser };
               authUser.name = name;
               authUser.email = email;
               setLoggedInUser(authUser);

               // after auth update error 
               const updateError = { name: false, email: false, password: false, confirmPass: false };
               setError(updateError);

               // after auth update user
               const updateUser = {
                  name: '',
                  email: '',
                  password: '',
                  confirmPass: false,
                  success: true
               }
               setUser(updateUser);
               e.target.reset();
               setLoading(false);
               history.replace(from);
            })
            .catch((error) => {
               var errorMessage = error.message;
               const updateUser = { ...user };
               updateUser.success = errorMessage;
               setUser(updateUser);
               setLoading(false);
            });
      } else {
         const updateUser = { ...user };
         updateUser.success = "Input Field is Wrong";
         setUser(updateUser);
      }
      e.preventDefault();
      e.target.reset();
   }

   // update user info 
   const updateUserInfo = (name) => {
      const auth = getAuth();
      updateProfile(auth.currentUser, {
         displayName: name,
         photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function () {
         // Update successful.
      }).catch(function (error) {
         // An error happened.
      });
   }

   return (
      <div className="signup-main">
         <div className="signup-wrapper">
            <div className="signup-form">
               <h3 className="text-center py-4">Create an account</h3>
               <Form handleCreateUser={handleCreateUser} handleChange={handleChange} error={error} success={user.success} loading={loading} />
               <div className="other-tools">
                  <h4 className="text-center">Already have an account? <Link to="/login">Login</Link></h4>
               </div>
            </div>
            <OtherLogIn />
         </div>
      </div>
   );
};

export default Signup;