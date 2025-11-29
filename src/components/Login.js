import {useState,useRef} from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from "../utils/firebase"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
    const [isSigninForm,setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = ()=>{
      // Validate the form data 
      const message = checkValidData(email.current.value,password.current.value)
      setErrorMessage(message);
      if(message) return;
      //Sign In/ Sign up
      if(!isSigninForm){
        createUserWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {    
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://avatars.githubusercontent.com/u/206697214?v=4"
          }).then(() => {
            // Profile updated!
            const {uid, email, displayName, photoURL} = auth.currentUser;
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL}));
            navigate("/browse")
          }).catch((error) => {
            setErrorMessage(error.code+ "-" +error.message)
          });
          console.log(user);
          
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-" +errorMessage)
        });
      }
      else{
        signInWithEmailAndPassword(auth, email.current.value,password.current.value)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode+ "-" +errorMessage);
          navigate("/browse")
        });
      }
     
    }

    const toggleSignInForm = ()=>{
     setIsSignInForm(!isSigninForm)
    }
    return (
        <div>
            <Header/>
            <div className='absolute'>
            <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4ffe3d37-1fc1-4d93-b61a-1fa58c11ccff/web/IN-en-20251124-TRIFECTA-perspective_9f00d07d-f08e-494f-8907-92371138c534_large.jpg"
            alt="Logo"/>
        </div>
        <form onSubmit={(e)=> e.preventDefault()}className='absolute w-3/12  p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white'>
            <h1 className='font-bold text-2xl py-4'>{isSigninForm? "Sign In" : "Sign Up"} </h1>
            {!isSigninForm && (<input ref={name} type="text" placeholder="Full Name" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>)}
            <input ref={email} type="Email address" placeholder="Email Address" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>
            <input ref={password} type="password" placeholder="Password" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>
            <p className="flex items-center gap-1 text-red-500 font-medium animate-pulse mt-1 mx-auto my-3">
            {errorMessage}</p>
            <button className='p-3 mb-4 bg-red-600 hover:bg-red-700 transition w-full rounded-md font-semibold' onClick={handleButtonClick}>{isSigninForm? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer hover:underline' onClick={toggleSignInForm} >
            {isSigninForm? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
        </form>
        </div>
    );
};

export default Login;