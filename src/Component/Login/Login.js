import React, { useContext, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { FaGoogle } from 'react-icons/fa';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../firebaseConfig';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';




const Login = () => {
    document.title = "Login page";
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app(); // if already initialized, use that one
    }
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    const [newUser, setNewUser] = useState(false);
    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        error: '',
        success: false,
        image: ''
    })
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const handleGoogleSignIn = () =>{
        firebase.auth().signInWithPopup(googleProvider)
        .then(result => {
            const {displayName,email,photoURL} = result.user;
            const signedInUser = {
                isSignedIn: true,
                name:displayName,
                email:email,
                image:photoURL
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
        })
        .catch(error => {
            console.log(error);
            console.log(error.message);
        })
    }

    const handleGoogleSignOut = () => {
        firebase.auth().signOut().then(() => {
            const signOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                image: ''
            }
            setUser(signOutUser);
            setLoggedInUser(signOutUser);
          }).catch((error) => {
            // An error happened.
          });
    }

    const handleBlur =(event) =>{
        
        let isFieldValid = true;
        if(event.target.name === "email"){
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
        }
        if(event.target.name === "password"){
            const isPasswordValid = event.target.value.length > 6
            const isPasswordHasNumber = /\d{1}/.test(event.target.value);
            isFieldValid = isPasswordValid && isPasswordHasNumber;
        }
        if(isFieldValid){
            const newUserInfo = {...user};
            newUserInfo[event.target.name] = event.target.value;
            console.log(newUserInfo)
            setUser(newUserInfo);
        }
    }

    const handleSubmit =(event) =>{
        if(newUser && user.email && user.password){
            firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((result) => {
                console.log(result)
                const newUserInfo = {...user};
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

        if(!newUser && user.email && user.password){
            firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then(result => {
                console.log(result)
                const {name,email,photoURL} = result.user;
            const signedInUser = {
                isSignedIn: true,
                name:name,
                email:email,
                image:photoURL
            }
            setUser(signedInUser);
            setLoggedInUser(signedInUser);
            history.replace(from);
            })
            .catch((error) => {
                const newUserInfo = { ...user };
                    newUserInfo.error = error.message;
                    newUserInfo.success = false;
                    setUser(newUserInfo);
            });
        }
        event.preventDefault();
    }

    return (
        <div className="container">
                <div className="row mt-3">
                    <div className="col-md-6 col-sm-12 col-lg-6 col-12 col-xl-6 m-auto">
                        {
                            user.isSignedIn && <h2>Welcome, {user.name}</h2>
                        }
                        <Form onSubmit={handleSubmit} style={{ border:'2px solid lightGray',padding:'20px 60px 60px 60px',marginBottom:'20px' }}>
                            <h2 style={{ marginBottom:'40px' }}>Create an Account</h2>
                            {
                                newUser && <Form.Group controlId="name">
                                <Form.Control name="name" onBlur={handleBlur} type="text" placeholder="Enter Your Name" required />
                            </Form.Group>
                            }
                            <Form.Group controlId="email">
                                <Form.Control name="email" onBlur={handleBlur} type="email" placeholder="Enter Your Email" required />
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control name="password" onBlur={handleBlur} type="password" placeholder="Enter Your Password" required />
                            </Form.Group>
                            {
                                newUser && <Form.Group controlId="confirmPassword">
                                <Form.Control name="confirmPassword" onBlur={handleBlur} type="password" placeholder="Enter Confirm Password" required />
                            </Form.Group>
                            }
                            {
                                newUser ? 
                                <Button style={{ backgroundColor:'tomato', border:'0',width:'100%' }} type="submit">
                                    Create An Account
                                </Button> : 

                                <Button style={{ backgroundColor:'tomato', border:'0',width:'100%' }} type="submit">
                                    Login
                                </Button>
                            }
                            {
                                newUser ? <h5 style={{ marginTop:'15px',textAlign:'center' }}>Already have an account?<span onClick = {() => setNewUser(!newUser)} style={{ color:'tomato',cursor:'pointer' }}>Login</span></h5> : <h5 style={{ marginTop:'15px',textAlign:'center' }}>If you don't have any account?<span onClick = {() => setNewUser(!newUser)} style={{ color:'tomato',cursor:'pointer' }}>Create account</span></h5>
                            }
                        </Form>
                        {
                            user.success ? <p style = {{ color:'green' }}>Your account {newUser ? 'created' : 'login'} successfully!</p> :  <p style = {{ color:'red' }}>{user.error}</p>
                        }
                        {
                            user.isSignedIn ? <Button onClick = {handleGoogleSignOut} style={{ width:'100%',backgroundColor:'tomato',color:'white',border:'0',padding:'20px 0 20px 0', marginBottom:'50px' }}><FaGoogle /> Google Sign Out</Button> : <button onClick = {handleGoogleSignIn} style={{ width:'100%',backgroundColor:'#0069D9',color:'white',border:'0',padding:'20px 0 20px 0', marginBottom:'50px' }}><FaGoogle /> Google Sign In</button>
                        }
                        
                    </div>
                </div>
        </div>
    );
};

export default Login;