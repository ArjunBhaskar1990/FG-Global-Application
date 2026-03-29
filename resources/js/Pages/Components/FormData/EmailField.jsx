
import { useEffect, useState } from "react";
export default function EmailField({ label, placeholder, value, setData, dataname }) {

    const [email, setEmail] = useState("");


    const isValidEmail = (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

    const isValid = isValidEmail(email);


    const verifyEmail = () => {
        let verifyBtn = document.getElementById('verify-btn');
        verifyBtn.classList.add('disabled');
    }


    useEffect(() => {

        email && setData(dataname, email)

    }, [email])


    return (
        <>

            <div style={{ position: "relative", paddingTop: '6px' }}>
                <label className="text-sm fw-semibold text-dark  " >
                    {label} <span className="text-danger-600">*</span>
                </label>
                <input
                    type="email"
                    value={value}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={placeholder}
                    className="form-control bg-white"
                    style={{
                        border: "solid 2px #707070",

                    }}
                />

                {isValid && (
                    <>
                        <span

                            style={{
                                position: "absolute",
                                right: "10px",
                                top: "50%",
                                transform: "translateY(15%)",
                                color: "white",
                                width: '30px',
                                backgroundColor: 'green',
                                borderRadius: '10px',
                                fontWeight: 'bold',
                                fontSize: "16px",
                                pointerEvents: "none",
                            }}
                        >
                            &nbsp; ✓
                        </span>

                    </>
                )}
            </div>

            {/* <div style={{ position: "relative", paddingTop: '34px', paddingLeft: '10px' }}>
                {isValid &&

                    <button id="verify-btn" onClick={verifyEmail} type="button" className="btn btn-primary">Verify</button>
                }
            </div> */}

        </>
    )
}
