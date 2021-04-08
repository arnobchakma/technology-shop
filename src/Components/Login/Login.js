import React, { useContext } from 'react';
import firebase from 'firebase/app';
import firebaseConfig from '../../firebaseConfig';
import 'firebase/auth';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import './Login.css';

if (!firebase.apps.length) {
   firebase.initializeApp(firebaseConfig);
}
const Login = () => {
   const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   console.log(loggedInUser);
   const history = useHistory();
   const location = useLocation();
   const { from } = location.state || { from: { pathname: '/' } };

   const githubProvider = new firebase.auth.GithubAuthProvider();
   const googleProvider = new firebase.auth.GoogleAuthProvider();
   const handleGoogleSignIn = () => {
      firebase
         .auth()
         .signInWithPopup(googleProvider)
         .then(result => {
            const user = result.user;
            setLoggedInUser(user);
            history.replace(from);
         })
         .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
         });
   };

   const handleGithubSign = () => {
      firebase
         .auth()
         .signInWithPopup(githubProvider)
         .then(result => {
            const user = result.user;
            setLoggedInUser(user);
            history.replace(from);
         })
         .catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage);
         });
   };

   return (
      <div className="login mt-5">
         {loggedInUser ? (
            <>
               <div className="text-center mt-2 mb-3">
                  <h1>Profile</h1>
                  <img src={loggedInUser.photoURL} alt="profile" />
               </div>
               <ul>
                  <li>Name: {loggedInUser.displayName}</li>
                  <li>Email: {loggedInUser.email}</li>
               </ul>
            </>
         ) : (
            <div className="text-center mt-5 ">
               <h1>Sign in</h1>
               <button
                  className="btn btn-success px-4"
                  onClick={handleGoogleSignIn}
               >
                  <FontAwesomeIcon icon={faGoogle} />
                  {'      '}
                  continue with google
               </button>
               <button
                  className="btn btn-danger px-4 mt-4"
                  onClick={handleGithubSign}
               >
                  <FontAwesomeIcon icon={faGithub} /> continue with github
               </button>
            </div>
         )}
      </div>
   );
};

export default Login;
