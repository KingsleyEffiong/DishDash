import { useNavigate } from "react-router-dom"

function BackButton() {
    const navigate = useNavigate()
    return (
        <svg width="32" height="18" className="absolute left-1 top-3 cursor-pointer w-auto h-5 z-20" viewBox="0 0 32 18" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => {
            navigate(-1)
        }}>
        <path d="M22.8047 9.00005H10.7959V14.3348C10.7957 14.645 10.709 14.949 10.5453 15.2126C10.3817 15.4762 10.1478 15.6888 9.86985 15.8266C9.59193 15.9644 9.2811 16.0218 8.97228 15.9925C8.66346 15.9633 8.36902 15.8483 8.12197 15.6607L2.64568 11.5017C2.25929 11.209 1.94594 10.8308 1.73019 10.3968C1.51444 9.96277 1.40215 9.48475 1.40215 9.00005C1.40215 8.51536 1.51444 8.03723 1.73019 7.6032C1.94594 7.16916 2.25929 6.79096 2.64568 6.49833L8.12197 2.33927C8.36902 2.15166 8.66346 2.03674 8.97228 2.00745C9.2811 1.97816 9.59193 2.0356 9.86985 2.17341C10.1478 2.31122 10.3817 2.52385 10.5453 2.7874C10.709 3.05096 10.7957 3.35502 10.7959 3.66523V4.80117" stroke="#FD5D69" strokeWidth="2.15865" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}

export default BackButton
