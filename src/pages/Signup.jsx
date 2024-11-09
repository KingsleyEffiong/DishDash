import { Link, useNavigate } from "react-router-dom"
import Button from "../UI/Button"
import { useState } from "react"
import {auth, db} from "../Firebase"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {doc, setDoc} from "firebase/firestore"
import Modal from "../UI/Modal"
import Overlay from "../UI/Overlay"
import { useProvider } from "../component/Provider"
function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phonenumber, setPhoneNumber] = useState('');
    const [dob, setDob] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const navigate = useNavigate();
    const {showPopup, dispatch, error} = useProvider();

    async function handleSubmit() {
        const allegy = JSON.parse(localStorage.getItem('alligy'));
        const recipes = JSON.parse(localStorage.getItem('recipes'));
        const cookingLevel = localStorage.getItem('activeCookingLevel')
            
            try {
                // Validate required input fields
                if (!name.trim() || !email.trim() || !phonenumber.trim() || !dob.trim() || !password.trim() || !cpassword.trim()) {
                    throw new Error('All fields are required');
                }
                if (password !== cpassword) {
                    throw new Error('Passwords do not match');
                }
        
                console.log('Loading.......');
        
                // Attempt to create the user with email and password
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await setDoc(doc(db, "users", user.uid), {
                    name,
                    email,
                    phonenumber,
                    dob,
                    recipes,
                    allegy,
                    cookingLevel,
                    createdAt: new Date().toISOString()
                });console.log('User created:', user);
        
                // Dispatch action to show success popup
                dispatch({ type: 'showPopup', payload: true });
                console.log('User data saved successfully');
                localStorage.setItem('userId', user.uid);
                navigate('/login')
            } catch (err) {
                console.error('Error:', err.message);
        
                // Dispatch error message
                dispatch({ type: 'error', error: err.message });
            } finally {
                console.log('Finished');
            }
        }
        
    

    return (
        <div className='h-full xl:h-full'>
        <div className={`flex flex-col items-center px-6 py-12 `}>
            <h1 className="text-[var(--red-pink-main)]">Sign Up</h1>
            <form action="">
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="jonas" value={name} onChange={(e) => setName(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="phone number">Phone Number</label>
                    <input type="text" name="phone number" id="phoneNumber" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="+234 993 2332" value={phonenumber} onChange={(e) => setPhoneNumber(e.target.value)}/> 
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="date of birth">Date of birth</label>
                    <input type="text" name="Date of birth" id="dateOfBirth" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="DD/MM/YY" value={dob} onChange={(e) => setDob(e.target.value)}/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto relative p-5">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="●●●●●●●●" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <svg width="28" height="24" style={{position:'absolute', right:'7%', top:'55%', cursor:'pointer'}} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.16353 20.002C6.4919 19.0878 5.08322 17.7595 4.07262 16.1443C1.81853 12.5484 4.70675 9.30023 7.79129 7.55341C9.39185 6.68841 11.1578 6.17327 12.9724 6.04209C14.7871 5.91092 16.6089 6.16665 18.3172 6.79246M21.1317 8.32248C22.1304 9.0783 22.9654 10.0289 23.5863 11.1166L23.619 11.178C26.1513 15.7026 21.3117 19.3598 17.4827 20.7302C15.2973 21.5098 12.9274 21.611 10.6835 21.0207M23.3491 5.39342C23.3491 5.39342 25.2052 6.75967 26.0041 7.59029M1.57715 7.59029C1.57715 7.59029 7.04674 1.953 13.7926 1.953C16.289 2.01153 18.7334 2.67706 20.9149 3.89209M10.9045 16.2425C10.4009 15.6811 10.0708 14.9859 9.95404 14.2408C9.83729 13.4958 9.93888 12.7328 10.2466 12.0443C10.5543 11.3557 11.0549 10.7712 11.6879 10.3612C12.3208 9.95113 13.059 9.73328 13.8131 9.73393C14.4327 9.73239 15.0433 9.88111 15.5926 10.1675M17.7159 13.6244C17.7148 14.6591 17.3033 15.6511 16.5716 16.3827C15.8399 17.1144 14.8479 17.5259 13.8131 17.527M22.1217 2.70979L6.60082 22.3012" stroke="#3E2823" strokeOpacity="0.45" strokeWidth="2.04545" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto relative p-5">
                    <label htmlFor="cpassword">Comfirm Password</label>
                    <input type="password" name="cpassword" id="cpassword" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="●●●●●●●●" value={cpassword} onChange={(e) => setCPassword(e.target.value)}/>
                    <svg width="28" height="24" style={{position:'absolute', right:'7%', top:'43%', cursor:'pointer'}} viewBox="0 0 28 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.16353 20.002C6.4919 19.0878 5.08322 17.7595 4.07262 16.1443C1.81853 12.5484 4.70675 9.30023 7.79129 7.55341C9.39185 6.68841 11.1578 6.17327 12.9724 6.04209C14.7871 5.91092 16.6089 6.16665 18.3172 6.79246M21.1317 8.32248C22.1304 9.0783 22.9654 10.0289 23.5863 11.1166L23.619 11.178C26.1513 15.7026 21.3117 19.3598 17.4827 20.7302C15.2973 21.5098 12.9274 21.611 10.6835 21.0207M23.3491 5.39342C23.3491 5.39342 25.2052 6.75967 26.0041 7.59029M1.57715 7.59029C1.57715 7.59029 7.04674 1.953 13.7926 1.953C16.289 2.01153 18.7334 2.67706 20.9149 3.89209M10.9045 16.2425C10.4009 15.6811 10.0708 14.9859 9.95404 14.2408C9.83729 13.4958 9.93888 12.7328 10.2466 12.0443C10.5543 11.3557 11.0549 10.7712 11.6879 10.3612C12.3208 9.95113 13.059 9.73328 13.8131 9.73393C14.4327 9.73239 15.0433 9.88111 15.5926 10.1675M17.7159 13.6244C17.7148 14.6591 17.3033 15.6511 16.5716 16.3827C15.8399 17.1144 14.8479 17.5259 13.8131 17.527M22.1217 2.70979L6.60082 22.3012" stroke="#3E2823" strokeOpacity="0.45" strokeWidth="2.04545" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                <p className="text-red-600">{error}</p>
                </div>
            </form>
            <p className="mt-8">By continuing, you agree to </p>
            <h4 className="font-semibold"> Terms of Use and Privacy Policy.</h4>
            <Button className="bg-[var(--pink-sup-color)] w-44 text-[var(--whitebeige)] h-auto px-6 py-3 rounded-full mt-5" onClick={handleSubmit}>Sign Up</Button>
            <Link to='/login' className="mt-2 text-sm">Already have an account?  Log In</Link>
    </div>
    {showPopup && 
    <>
    <Modal className={"w-[250px] h-auto p-3 bg-[var(--whitebeige)] fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center rounded-3xl text-[var(--black-beige)]"}>
            <h1>Sign up succesful!</h1>
            <svg width="83" height="83" viewBox="0 0 83 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="41.5" cy="41.0976" r="41.0976" fill="#FFC6C9"/>
            <path d="M41.9019 34.0857C46.0969 34.0857 49.4977 30.6849 49.4977 26.4899C49.4977 22.2949 46.0969 18.8942 41.9019 18.8942C37.7069 18.8942 34.3062 22.2949 34.3062 26.4899C34.3062 30.6849 37.7069 34.0857 41.9019 34.0857Z" stroke="#FD5D69" strokeWidth="3.37588" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M55.8847 56.2719C52.2388 64.4617 41.8547 63.7867 41.8547 63.7867C41.8547 63.7867 31.4638 64.4347 27.8246 56.2719C27.1203 54.7016 26.7561 53 26.7561 51.2789C26.7561 49.5579 27.1203 47.8565 27.8246 46.2862C31.4638 38.0963 41.8547 38.7714 41.8547 38.7714C41.8547 38.7714 52.2388 38.1233 55.8847 46.2862C56.5891 47.8565 56.9532 49.5579 56.9532 51.2789C56.9532 53 56.5891 54.7016 55.8847 56.2719Z" stroke="#FD5D69" strokeWidth="3.37588" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        </Modal>
        <Overlay />
    </>
        }
    </div>
    )
}

export default Signup
