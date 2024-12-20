import { Link, useNavigate } from "react-router-dom";
import Button from "../UI/Button";
import { useState } from "react"
import {signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider  } from "firebase/auth"
import {auth} from "../Firebase"
import {FaGoogle, FaTwitter } from 'react-icons/fa';
import { useProvider } from "../component/Provider"

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {dispatch, error} = useProvider();


    async function handleSubmit() {
        try {
            // Validate required input fields
            if ( !email.trim() || !password.trim()) {
                throw new Error('All fields are required');
            }
    
            console.log('Loading.......');
    
            // Attempt to create the user with email and password
            const userCredential = await signInWithEmailAndPassword (auth, email, password);
            const user = userCredential.user;
            alert('User successfully login');
            localStorage.setItem('userId', user.uid);
            localStorage.setItem('user', user.displayName)
            dispatch({type:"launchScreen", payload:true})
            const timer = setTimeout(() =>{
                dispatch({type:"launchScreen", payload:false})
              },5000)
              navigate('/dashboard/homepage')
              return () => clearTimeout(timer)
        } catch (err) {
            console.error('Error:', err.message);
    
            // Dispatch error message
            dispatch({ type: 'error', error: err.message });
        } finally {
            console.log('Finished');
        }
    }

    
    async function signinWithGoogle() {
        const goggleProvider = new GoogleAuthProvider();
    
        try {
            const result = await signInWithPopup(auth, goggleProvider);
            const user = result.user;
            console.log("User signed in: ", user);
            localStorage.setItem("userId", user.uid);
            localStorage.removeItem("user")
            localStorage.removeItem("alliegy")
            localStorage.removeItem("recipe")
            dispatch({ type: "authenticate", payload: true });
            dispatch({ type: "launchScreen", payload: true });
            setTimeout(() => {
                dispatch({ type: "launchScreen", payload: false });
            }, 5000);
            navigate("/dashboard/homepage");
        } catch (error) {
            console.error("Error during sign-in: ", error);
        }
    }
    const twitterProvider = new TwitterAuthProvider();

    async function signinWithTwitter() {
        try {
            const result = await signInWithPopup(auth, twitterProvider);
            // Successfully signed in
            const user = result.user;
            console.log("User signed in: ", user);
            localStorage.removeItem("user")
            localStorage.removeItem("alliegy")
            localStorage.removeItem("recipe")
            localStorage.setItem('userId', user.uid);
            navigate('/dashboard/homepage')
            // You can now use the user data or save it to your database if needed
        } catch (error) {
            console.error("Error during sign-in: ", error);
        }
    }
    return (
        <div className='h-full md:h-screen flex flex-col items-center justify-start md:justify-center px-6 py-12'>
            <div className={`flex flex-col items-center h-screen justify-start md:justify-center px-6 `}>
                <h1 className="text-[var(--red-pink-main)]">Login</h1>
                <form action="">
                    <div className="flex flex-col gap-2 w-[357px] h-auto relative p-5">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" id="email" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="flex flex-col gap-2 w-[357px] h-auto relative p-5">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" id="password" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="●●●●●●●●" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <svg width="28" height="24" style={{position:'absolute', right:'7%', top:'53%', cursor:'pointer'}} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.16353 20.002C6.4919 19.0878 5.08322 17.7595 4.07262 16.1443C1.81853 12.5484 4.70675 9.30023 7.79129 7.55341C9.39185 6.68841 11.1578 6.17327 12.9724 6.04209C14.7871 5.91092 16.6089 6.16665 18.3172 6.79246M21.1317 8.32248C22.1304 9.0783 22.9654 10.0289 23.5863 11.1166L23.619 11.178C26.1513 15.7026 21.3117 19.3598 17.4827 20.7302C15.2973 21.5098 12.9274 21.611 10.6835 21.0207M23.3491 5.39342C23.3491 5.39342 25.2052 6.75967 26.0041 7.59029M1.57715 7.59029C1.57715 7.59029 7.04674 1.953 13.7926 1.953C16.289 2.01153 18.7334 2.67706 20.9149 3.89209M10.9045 16.2425C10.4009 15.6811 10.0708 14.9859 9.95404 14.2408C9.83729 13.4958 9.93888 12.7328 10.2466 12.0443C10.5543 11.3557 11.0549 10.7712 11.6879 10.3612C12.3208 9.95113 13.059 9.73328 13.8131 9.73393C14.4327 9.73239 15.0433 9.88111 15.5926 10.1675M17.7159 13.6244C17.7148 14.6591 17.3033 15.6511 16.5716 16.3827C15.8399 17.1144 14.8479 17.5259 13.8131 17.527M22.1217 2.70979L6.60082 22.3012" stroke="#3E2823" strokeOpacity="0.45" strokeWidth="2.04545" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <p className="text-red-600">{error}</p>
                    </div>
                </form>
                <Button className="bg-[var(--pink)] w-44 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full mt-12" onClick={handleSubmit}>Log In</Button>
                <Button className="bg-[var(--pink)] w-44 text-[var(--pink-sup-color)] h-auto px-6 py-3 rounded-full my-5" onClick={() =>navigate('/signup')}>Sign Up</Button>
                {/* <h2 className="mt-14">Forgot password</h2> */}
                <h4 className="text-[var(--brown-text)] mt-7">or sign in with</h4>
                <div className="flex flex-row gap-5 text-2xl mt-4">
                    <FaGoogle className="cursor-pointer" onClick={signinWithGoogle}/>
                    <FaTwitter className="cursor-pointer" onClick={signinWithTwitter}/>
                </div>
                <Link to='/signup' className="mt-4 text-sm">Don’t have an account? Sign Up</Link>
        </div>
        </div>
    )
}

export default Login
