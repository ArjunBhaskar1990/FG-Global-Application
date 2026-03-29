import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router } from "@inertiajs/react";
import { FaClipboard, FaPen, FaUserFriends, FaCheck } from 'react-icons/fa';

export default function StudentDashboard({ auth, role, questions }) {


    const [questionsState, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

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
                questionsState.map((q) => ({ question: q.questions, answer: "", file: null }))
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
            newAnswers[index] = { ...newAnswers[index], file };
            return newAnswers;
        });
    };



    const handleSubmit = () => {


        const filledCount = answers.filter((ans) => ans.answer.trim() !== "").length;

        if (filledCount < 5) {
            alert(`Please fill at least 5 text fields. You have filled ${filledCount}.`);
            return;
        }

        router.visit(route('examresult.store'), {
            method: 'POST',
            data: {
                answers: answers
            },
            preserveState: true,
            preserveUrl: true,
            onSuccess: () => {
                setAnswers([]);

                const examResults = document.getElementById('exam-results');
                examResults.reset();

            },
            onError: (page) => {
                // console.log(page.props);
            }

        })

    };


    const goToComplete = () => {

        router.visit(route('complete.registration'), {
            method: "POST",
            preserveScroll: true,
            preserveUrl: true,
        })
    }



    return (

        <>


            <div className="body-overlay"></div>
            <div
                className="overlay bg-black bg-opacity-50 w-100 h-100 position-fixed z-9 visibility-hidden opacity-0 duration-300">
            </div>

            <SideMenu auth={auth} role={role} />

            <main id="dashboard-main" className="dashboard-main">

                <NavBar />

                <div className="dashboard-main-body">


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

                                    {auth.students.status === 2 && auth.students.notice === 1 &&
                                        <>
                                            <p className="text-start fs-6">
                                                Your exam has been successfully submitted for review. Our counselling team will review your answers, and once the review is complete, we will post the updates here. <br /> <br />

                                                Please stay connected for further notifications. <br /><br />
                                                Thank you, <br />
                                                FG Global
                                            </p>
                                        </>
                                    }
                                    {auth.students.status === 2 && auth.students.notice === 2 &&
                                        <>
                                            <p className="text-start fs-6">
                                                Dear Parent, <br /> <br />
                                                {auth.students.exam_summary.toUpperCase()} <br /> <br />


                                                {auth.students.bridge_course === 1 &&
                                                    <div>

                                                        <p className="fs-6">
                                                            Yes, I am willing for a Bridge Course

                                                        </p>

                                                        <button onClick={goToComplete} className="btn btn-success fw-bold text-dark">ACCEPT AND PROCEED !!</button>

                                                    </div>

                                                }

                                                {auth.students.bridge_course === 0 &&
                                                    <div>

                                                        <p className="fs-6">
                                                            No, I’ll teach my child about the weak side myself. I’ll take care of it. <br />
                                                            So, i dont want Bridge Course.

                                                        </p>

                                                        <button onClick={goToComplete} className="btn btn-success fw-bold text-dark">ACCEPT AND PROCEED !!</button>

                                                    </div>

                                                }
                                                <br />
                                                Parent, <br />
                                                On Behalf <br />
                                                {auth.name}
                                            </p>
                                        </>
                                    }



                                    {auth.students.status === 3 &&
                                        <>
                                            <p className="text-start fs-6">
                                                You have successfully completed our registration process. Just one more step to go—please verify your email ID to ensure smooth communication. <br /> <br />
                                                <input className="bg-white p-1 ps-3 text-dark border" value={auth.students.email} type="email" /> &nbsp;
                                                <button className="btn btn-primary">SEND OTP</button>

                                                <br /> <br />

                                                <button onClick={goToComplete} className="btn btn-success fw-bold text-dark">VERIFY EMAIL & COMPLETE REGISTRATION !!</button>
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
            </main>







        </>
    )
}
