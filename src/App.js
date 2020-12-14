import React, {useState} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firbaseConfig from './firebase.config';
import './App.css';

firebase.initializeApp(firbaseConfig);
function App() {
const [user, setUser] = useState({
isSignedIn: false,
name:'',
email: '',
photo: ''
})
  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignedIn = () =>{
    firebase.auth().signInWithPopup(provider)
    .then(res =>{
      const {displayName, photoURL, email} = res.user;
      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        photo: photoURL,
        email: email
      }
      console.log(displayName, email, photoURL);
      setUser(signedInUser);
      
    })
    .catch (err =>{
      console.log(err);
      console.log(err.message);
    })
  }
  
  return(
    <div className="App">
<button className="mt-5 btn btn-info" onClick={handleSignedIn}>Sign In</button>
{
  user.isSignedIn && 
  
  <div>
    <p>Welcome, {user.name}</p>
    <img src={user.photo} alt=""/>
    <h5>Email: {user.email}</h5>
    </div>
}
    </div>
  );
}

export default App;