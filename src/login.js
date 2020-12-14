import React from 'react';
import './App.css';
import useState from 'react'

function App() {
  const [users, setUsers] = useState({
    isSignedIn:'false',
    name:'',
    password:'',
    email:'',
    photo:''
  });
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
      const newUserInfo = {...users}
      newUserInfo[event.target.name] = event.target.value;
      newUserInfo[event.target.password] = event.target.value;
      setUsers(newUserInfo);
    }

  }
  const handleSubmit = () => {
    
  }
  return (
    <div className="App">
  <h1>Login Page Design with Auth</h1>
  <p>UserName:{users.name}</p>
  <p>Password:{users.password}</p>

  
  <form onSubmit={handleSubmit}>
<input type="text" name="email" onBlur={handleBlur} placeholder="Enter Your Email Address" required/>
<br/>
<input type="password" name="password" onBlur={handleBlur} placeholder="Enter Your Password" required/>
<br/>
<input type="submit" value="submit"/>
  </form>
    </div>
  );
}

export default App;
