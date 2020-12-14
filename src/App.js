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
password: '',
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
  
const handleSignedOut = () =>{
firebase.auth().signOut()
.then(res =>{
  const signedOutUser = {
    isSignedIn: false,
    name: '',
    photo: '',
    email: '',
    error: '',
    success: false

  }
  setUser(signedOutUser);
})

.catch(err =>{

})
}

const handleBlur = (event) =>{
  let isFormValid = true;
  if(event.target.name === 'email'){
    isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
     
  }

  if(event.target.name === 'password'){
    const isPasswordValid = event.target.value.length > 6;
    const isPasswordNumber = /\d{1}/.test(event.target.value);
    isFormValid = isPasswordValid && isPasswordNumber;
  }

  if(isFormValid){
    const newUserInfo = {...user}
    newUserInfo[event.target.name] = event.target.value;
    newUserInfo[event.target.password] = event.target.value;
    setUser(newUserInfo);
  }

}
const handleSubmit = (event) => {
  if(user.email && user.password) {
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
  .then((user) => {
  const newUserInfo ={...user};
  newUserInfo.error = '';
  newUserInfo.success = true;
  setUser(newUserInfo);
  })
  .catch((error) => {
    const newUserInfo = {...user};
    newUserInfo.error = error.message;
    newUserInfo.success = false;
    setUser(newUserInfo);
  });
  }
  event.preventDefault();
  
}

  return(
    <div className="App">
    {
      user.isSignedIn ? <button className="mt-5 btn btn-info" onClick={handleSignedOut}>Sign Out</button> : <button className="mt-5 btn btn-info" onClick={handleSignedIn}>Sign In</button>
    }
{
  user.isSignedIn && 
  
  <div>
    <p>Welcome, {user.name}</p>
    <img src={user.photo} alt=""/>
    <h5>Email: {user.email}</h5>
    </div>
}
<div>
    <h1>Login Page Design with Auth</h1>
    <form onSubmit={handleSubmit}>
    <input type="text" name="name" onBlur={handleBlur} placeholder="Enter Your Name" required/>
    <br/>
  <input className="mt-1 mb-1" type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email Address" required/>
  <br/>
  <input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
  <br/>
  <input className="mt-1 mb-1" type="submit" value="submit"/>
    </form>

    <p style={{color: 'red'}}>{user.error}</p>
    {
      user.success && <p style={{color: 'green'}}>Account Created Successfully</p>
    }
    </div>
    </div>
  );
}

export default App;