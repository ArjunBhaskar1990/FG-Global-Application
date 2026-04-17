import { useEffect, useState, useRef } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router } from "@inertiajs/react";
import { FaClipboard, FaPen, FaUserFriends, FaCheck } from 'react-icons/fa';
import OtpInput from "../Components/FormData/OtpInput";
export default function StudentDashboard({ auth, theme, role, questions }) {

    const [inputs, setInputs] = useState('');
    const [loader, setLoader] = useState(false);
    const [questionsState, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const [showOTPInput, setShowOTPInput] = useState(0);
    const [emailError, setEmailError] = useState('');
    const [veriEmail, setVeriEmail] = useState(auth.students.email)

    const INITIAL_TIME = 5 * 60;  // 5 mins

    const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
    const [isRunning, setIsRunning] = useState(false);



    useEffect(() => {

        if (!isRunning) return;

        if (timeLeft === 0) {
            setIsRunning(false);
            setShowOTPInput(0);
            router.visit(route('otp.timeout'), {
                method: 'POST',
                preserveScroll: true,
                preserveState: true,
                preserveUrl: true,
                onSuccess: () => {

                    setTimeLeft(INITIAL_TIME);
                    setEmailError('');
                }
            })
            return;
        }

        const timer = setInterval(() => {

            setTimeLeft((prev) => prev - 1);

        }, 1000);

        return () => clearInterval(timer);

    }, [isRunning, timeLeft])


    const formatTime = (seconds) => {
        const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
        const secs = String(seconds % 60).padStart(2, "0");
        return `${mins}:${secs}`;
    }

    const icons = [
        <FaClipboard />,
        <FaPen />,
        <FaUserFriends />,
        <FaCheck />
    ];


    function MyClipboard({ i }) {
        return icons[i] || <FaClipboard />;
    }
    function MyClipExam({ i }) {
        return icons[i] || <FaPen />;
    }
    function MyClipVolumeUp({ i }) {
        return icons[i] || <FaUserFriends />;
    }
    function MyClipCheck({ i }) {
        return icons[i] || <FaCheck />;
    }



    useEffect(() => {

        setQuestions(questions);

    }, [questions])


    useEffect(() => {
        if (questionsState && questionsState.length > 0) {
            setAnswers(
                questionsState.map((q) => ({ question: q.questions, answer: "", image: null }))
            );
        }
    }, [questionsState]);


    const handleTextChange = (index, value) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = { ...newAnswers[index], answer: value };
            return newAnswers;
        });
    };

    const handleFileChange = (index, file) => {
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = { ...newAnswers[index], file }; // ✅ change image → file
            return newAnswers;
        });
    };


    const handleSubmit = () => {

        const filledCount = answers.filter((ans) => ans.answer?.trim() !== "").length;

        if (filledCount < 5) {
            alert(`Please fill at least 5 text fields. You have filled ${filledCount}.`);
            return;
        }

        const formData = new FormData();

        answers.forEach((item, index) => {
            formData.append(`answers[${index}][question]`, item.question || "");
            formData.append(`answers[${index}][answer]`, item.answer || "");

            if (item.file) {
                formData.append(`answers[${index}][file]`, item.file);
            }
        });

        router.post(route('examresult.store'), formData, {
            forceFormData: true,
            preserveState: true,
            preserveUrl: true,
            onSuccess: () => { },
            onError: (errors) => { }
        });
    };


    const willDolater = () => {
        router.visit(route('complete.registration-withoutotp'), {
            method: "POST",
            preserveState: true,
            preserveScroll: true,
            preserveUrl: true,
            onSuccess: (page) => {
                setEmailError(page.props.flash.failed);

            }
        })

    }



    const acceptCondition = () => {


        router.visit(route('accept.condition'), {
            method: "POST",
            data: {
                email: veriEmail,
                typed_otp: inputs
            },
            preserveState: true,
            preserveScroll: true,
            preserveUrl: true,
            onSuccess: (page) => {
                setEmailError(page.props.flash.failed);



            }
        })

    }

    const goToComplete = () => {


        router.visit(route('complete.registration'), {
            method: "POST",
            data: {
                email: veriEmail,
                typed_otp: inputs
            },
            preserveState: true,
            preserveScroll: true,
            preserveUrl: true,
            onSuccess: (page) => {
                setEmailError(page.props.flash.failed);


            },
            onError: (page) => {

                setEmailError(page.email);
            }
        })
    }


    const sendOTP = () => {

        setLoader(true);
        setIsRunning(true)
        router.visit(route('send.otp-email'), {

            method: 'POST',
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,
            data: {

                email: veriEmail

            },
            onSuccess: () => {

                setShowOTPInput(1)

            },
            onFinish: () => {
                setLoader(false);

            },
            onError: (page) => {

                setEmailError(page.email)
                setLoader(false);
            }
        })





    }


    useEffect(() => {

        const body = document.getElementById('body');
        if (loader) {
            body.classList.add('opacity-50')

        } else {
            body.classList.remove('opacity-50')

        }
    }, [loader])

    return (

        <>
            {loader &&
                <span className="loader"></span>
            }


            <div className="body-overlay"></div>
            <div
                className="overlay bg-black bg-opacity-50 w-100 h-100 position-fixed z-9 visibility-hidden opacity-0 duration-300">
            </div>

            <SideMenu auth={auth} role={role} theme={theme} />

            <main id="dashboard-main " className="dashboard-main" style={{ fontFamily: 'Poppins' }}>

                <NavBar auth={auth} theme={theme} />

                <div id="body" className="dashboard-main-body">


                    <div
                        className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                        <div class>
                            {/* <h6 className="fw-semibold mb-0">Dashboard</h6> */}

                        </div>
                    </div>

                    <div className="mt-24">
                        <div className="row gy-4 col-sm-12">

                            <div className="col-xxl-12">
                                <div className="row gy-4 d-flex justify-content-center ">

                                </div>

                            </div>


                            <div className="container p-2">

                                {/* Steps */}
                                <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
                                    <div className="progress w-100 position-absolute" style={{ height: "2px", top: "20px", zIndex: 0 }}>
                                        <div className={`progress-bar bg-success ${auth.students.status === 0 && 'w-25' || auth.students.status === 1 && 'w-50' || auth.students.status === 2 && 'w-75' || auth.students.status === 3 && 'w-100'}`}></div>
                                    </div>

                                    {["Registration", "Exam", "Counselling", "Complete Registration"].map((step, i) => (
                                        <div key={i} className="text-center flex-fill" style={{ zIndex: 1 }}>
                                            <div
                                                className={`rounded-circle mx-auto mb-1 d-flex align-items-center justify-content-center ${i <= auth.students.status ? "bg-success" : "bg-secondary"
                                                    }`}
                                                style={{ width: "40px", height: "40px" }}
                                            >
                                                {i === 0 ? <MyClipboard i={i} /> : i === 1 ? <MyClipExam i={i} /> : i === 2 ? <MyClipVolumeUp i={i} /> : <MyClipCheck i={i} />}
                                            </div>
                                            <small className={i === auth.students.status ? "fw-bold" : "text-secondary"}>
                                                {step}
                                            </small>
                                        </div>
                                    ))}
                                </div>


                                <div className="card shadow-sm p-3">


                                    {auth.students.status === 1 &&
                                        <>
                                            <form id="exam-results">
                                                {questionsState.map((item, index) => {


                                                    return (
                                                        <div key={index} className="card-body text-start" style={index % 2 === 0 ? { backgroundColor: '#2f3a4b' } : { backgroundColor: '#424c5e' }}>
                                                            <div className="d-flex gap-20">

                                                                <div style={{ width: '5%' }}>{index + 1}</div>
                                                                <div style={{ width: '95%' }}>

                                                                    <div>
                                                                        <p>
                                                                            {item.questions}
                                                                        </p>
                                                                    </div>
                                                                    <div className="mt-4">

                                                                        <table>
                                                                            <tbody>

                                                                                <tr>
                                                                                    <td >
                                                                                        <input onChange={(e) => handleTextChange(index, e.target.value)} style={{ border: 'solid 3px #000', color: '#000' }} className="p-1 bg-light w-100 rounded me-sm-5" type="text" />
                                                                                    </td>
                                                                                    <td>
                                                                                        <label className="ms-5 text-xs">(&nbsp; jpg, jpeg, docx, pdf &nbsp;)</label>
                                                                                        <input onChange={(e) => handleFileChange(index, e.target.files[0])} type="file" className="ms-5 w-100 " />

                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>

                                                                        </table>

                                                                    </div>



                                                                </div>

                                                            </div>

                                                        </div>


                                                    )
                                                })}
                                            </form>
                                            <div className="d-flex justify-content-end m-3">
                                                <button onClick={handleSubmit} className="btn btn-primary">Submit Exam</button>
                                            </div>
                                        </>
                                    }

                                    {(Number(auth.students.status) === 2 && Number(auth.students.notice) === 1) &&
                                        <>
                                            <p className="text-start fs-6">
                                                Your exam has been successfully submitted for review. Our counselling team will review your answers, and once the review is complete, we will post the updates here. <br /> <br />

                                                Please stay connected for further notifications. <br /><br />
                                                Thank you, <br />
                                                FG Global
                                            </p>
                                        </>
                                    }
                                    {(Number(auth.students.status) === 2 && Number(auth.students.notice) === 2) &&
                                        <>
                                            <p className="text-start fs-6">
                                                Dear Parent, <br /> <br />
                                                {auth.students.exam_summary.toUpperCase()} <br /> <br />


                                                {Number(auth.students.bridge_course) === 1 &&
                                                    <div>

                                                        <p className="fs-6">
                                                            Yes, I am willing for a Bridge Course

                                                        </p>

                                                        <button onClick={acceptCondition} className="btn btn-success fw-bold text-dark">ACCEPT AND PROCEED !!</button>

                                                    </div>

                                                }

                                                {Number(auth.students.bridge_course) === 0 &&
                                                    <div>

                                                        <p className="fs-6">
                                                            No, I’ll teach my child about the weak side myself. I’ll take care of it. <br />
                                                            So, i dont want Bridge Course.

                                                        </p>

                                                        <button onClick={acceptCondition} className="btn btn-success fw-bold text-dark">ACCEPT AND PROCEED !!</button>

                                                    </div>

                                                }
                                                <br />
                                                Parent, <br />
                                                On Behalf <br />
                                                {auth.name}
                                            </p>
                                        </>
                                    }



                                    {Number(auth.students.status) === 3 &&
                                        <>
                                            <p className="text-start fs-6">
                                                You have successfully completed our registration process. Just one more step to go—please verify your email ID to ensure smooth communication. <br /> <br />
                                                <input disabled={isRunning} onChange={(e) => setVeriEmail(e.target.value)} style={isRunning ? { backgroundColor: '#b9b6b6' } : { backgroundColor: '#f2f2f2' }} className="p-1 rounded ps-3 w-50 fs-5 text-dark border" defaultValue={veriEmail} type="email" /> &nbsp;
                                                <button disabled={isRunning} onClick={sendOTP} className={`btn ${isRunning ? ' btn-secondary' : 'btn-primary'}`}>SEND OTP</button>
                                                {isRunning &&
                                                    <span className="fs-5">
                                                        &nbsp;
                                                        {formatTime(timeLeft)}
                                                    </span>
                                                }
                                                <br />

                                                <span className="text-white text-xs fst-italic"> {emailError} </span>

                                                {showOTPInput === 1 &&
                                                    <div className="p-3 bg-dark rounded">
                                                        <OtpInput length={6} setInputs={setInputs} />
                                                    </div>
                                                }
                                                <br /><br />
                                                <button
                                                    onClick={goToComplete}
                                                    className={`btn  fw-bold text-dark ${inputs.length === 6 ? "btn-success" : "disabled btn-secondary"
                                                        }`}
                                                >
                                                    VERIFY EMAIL & COMPLETE REGISTRATION !!
                                                </button> &nbsp;
                                                <button
                                                    onClick={willDolater}
                                                    className={`btn btn-primary fw-bold text-dark"
                                                        }`}
                                                >
                                                    I'll DO IT LATER !!
                                                </button>
                                            </p>
                                        </>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <footer className="d-footer">
                    <div class>
                        <p className="mb-0 text-center"> &copy; <span
                            className="current-year"></span> FG Global School. Designed by Oracuz</p>
                    </div>
                </footer>
            </main >







        </>
    )
}
