import React, { useEffect, useRef, useState } from "react";

const OtpInput = ({ length = 6, setInputs }) => {
    const inputs = useRef([]);

    const [otp, setOtp] = useState(Array(length).fill(""));

    const handleChange = (e, index) => {
        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return; // allow only single digit

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);


        if (value && index < length - 1) {
            inputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === "Backspace" && !e.target.value && index > 0) {
            inputs.current[index - 1].focus();
        }
    };


    useEffect(() => {
        const finalOtp = otp.join("");
        setInputs && setInputs(finalOtp);
    }, [otp, setInputs]);

    return (
        <div className="d-flex gap-2">
            {Array.from({ length }).map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength="1"
                    ref={(el) => (inputs.current[index] = el)}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    className="text-center text-dark fs-4 border rounded"
                    style={{
                        width: "40px",
                        height: "45px",
                        backgroundColor: "#f2f2f2",
                    }}
                />
            ))}
        </div>
    );
};

export default OtpInput;
