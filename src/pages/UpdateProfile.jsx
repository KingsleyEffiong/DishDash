import Button from "../UI/Button"

function UpdateProfile() {
    return (
        <div className='h-full xl:h-full'>
        <div className={`flex flex-col items-center  px-6 py-12 `}>
            <h1 className="text-[var(--red-pink-main)]">Profile</h1>
            <h1 className="font-bold">Complete your profile</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adipisci velit corporis hic aliquid ab amet eligendi eveniet voluptate, nam necessitatibus delectus architecto voluptates molestiae aliquam dicta,</p>
            <form action="" className="grid place-items-center mt-7">
            <svg width="104" height="101" style={{cursor:'pointer'}} viewBox="0 0 104 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50.6863" cy="50.4073" r="50.4073" fill="#FFC6C9"/>
            <path d="M51.1793 41.8069C56.3246 41.8069 60.4956 37.6359 60.4956 32.4906C60.4956 27.3453 56.3246 23.1743 51.1793 23.1743C46.034 23.1743 41.8629 27.3453 41.8629 32.4906C41.8629 37.6359 46.034 41.8069 51.1793 41.8069Z" stroke="#FD5D69" strokeWidth="4.1406" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M68.3296 69.0189C63.8577 79.064 51.1214 78.236 51.1214 78.236C51.1214 78.236 38.3766 79.0309 33.9131 69.0189C33.0492 67.0929 32.6025 65.0058 32.6025 62.8949C32.6025 60.784 33.0492 58.6972 33.9131 56.7712C38.3766 46.7261 51.1214 47.5541 51.1214 47.5541C51.1214 47.5541 63.8577 46.7592 68.3296 56.7712C69.1934 58.6972 69.6401 60.784 69.6401 62.8949C69.6401 65.0058 69.1934 67.0929 68.3296 69.0189Z" stroke="#FD5D69" strokeWidth="4.1406" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="74.6899" y="66.0096" width="29.0311" height="29.0311" rx="8.7973" fill="#FD5D69"/>
            <path d="M88.9024 76.5774L91.8034 72.9661C92.1635 72.5229 92.6844 72.2402 93.2522 72.1798C93.8201 72.1195 94.3887 72.2864 94.8338 72.6441C95.2764 73.0046 95.5585 73.5254 95.6189 74.093C95.6792 74.6606 95.5127 75.2291 95.1558 75.6745L92.2548 79.2858M83.0642 88.5847H97.0518M88.9355 76.5232L82.5617 84.4138L81.7823 86.9627C81.7094 87.2014 81.7096 87.4564 81.7828 87.6949C81.8559 87.9335 81.9986 88.1448 82.1927 88.3017C82.3867 88.4585 82.6232 88.5538 82.8718 88.5753C83.1204 88.5968 83.3698 88.5434 83.5879 88.4222L85.9141 87.1222L92.2849 79.2317C92.4632 79.0117 92.5963 78.7587 92.6766 78.4873C92.7569 78.2158 92.7828 77.9311 92.7529 77.6496C92.7229 77.3681 92.6378 77.0952 92.5022 76.8467C92.3667 76.5981 92.1835 76.3788 91.963 76.2012C91.7431 76.0234 91.4903 75.8908 91.2192 75.8107C90.948 75.7307 90.6636 75.7048 90.3825 75.7348C90.1013 75.7647 89.8288 75.8497 89.5805 75.985C89.3322 76.1203 89.1131 76.3032 88.9355 76.5232Z" stroke="#FFFDF9" strokeWidth="1.50468" strokeLinecap="round"/>
            </svg>

                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" name="name" id="name" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="Full name"/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="gender">Gender</label>
                    <input type="gender" name="gender" id="gender" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="Gender"/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="phone number">Phone Number</label>
                    <input type="text" name="phone number" id="phoneNumber" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none placeholder:text-red-400 px-6" placeholder="888 233 1223"/>
                </div>
                <div className="flex flex-col gap-2 w-[357px] h-auto p-5">
                    <label htmlFor="date of birth">Date of birth</label>
                    <input type="text" name="Date of birth" id="dateOfBirth" className="bg-[var(--pink)] w-full h-[41px] text-[var(--black-beige)] rounded-full outline-none custom-placeholder placeholder:text-red-400 px-6" placeholder="DD/MM/YY"/>
                </div>
            </form>
            <p className="mt-8">By continuing, you agree to </p>
            <h4 className="font-semibold"> Terms of Use and Privacy Policy.</h4>
            <Button className="bg-[var(--pink-sup-color)] w-44 text-[var(--whitebeige)] h-auto px-6 py-3 rounded-full mt-5">Continue</Button>
    </div>
    </div>
    )
}

export default UpdateProfile
