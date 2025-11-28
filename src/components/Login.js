import {useState} from 'react';
import Header from './Header';

const Login = () => {
    const [isSigninForm,setIsSignInForm] = useState(true);

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
        <form className='absolute w-3/12  p-12 bg-black/80 my-36 mx-auto right-0 left-0 text-white'>
            <h1 className='font-bold text-2xl py-4'>{isSigninForm? "Sign In" : "Sign Up"} </h1>
            {!isSigninForm && (<input type="text" placeholder="Full Name" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>)}
            <input type="text" placeholder="Email Address" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>
            <input type="text" placeholder="Password" className='p-3 mb-4 w-full bg-neutral-800 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600'/>
            <button className='p-3 mb-4 bg-red-600 hover:bg-red-700 transition w-full rounded-md font-semibold'>{isSigninForm? "Sign In" : "Sign Up"}</button>
            <p className='py-4 cursor-pointer hover:underline' onClick={toggleSignInForm} >
            {isSigninForm? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now."}</p>
        </form>
        </div>
    );
};

export default Login;