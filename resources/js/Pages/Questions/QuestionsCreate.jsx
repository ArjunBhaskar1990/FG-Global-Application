import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router, useForm } from "@inertiajs/react";

export default function QuestionsCreate({ auth, role, totalpendingreg, totaltestexam, newregn }) {

    const [totalNewReg, setTotalNewReg] = useState(totalpendingreg);
    const [totaltestCount, settotaltestCount] = useState(totaltestexam);
    const [registration, setRegistration] = useState([]);


    const { data, setData, post, errors, processing } = useForm({

        questions: '',
        education_type: ''


    });


    const addQuestions = (e) => {

        e.preventDefault();

        post(route('exam.questions.store'), {

            preserveScroll: true,
            preserveState: true,


            onSuccess: () => {


                let examquestions = document.getElementById('examquestions');
                examquestions.reset();

            }

        });

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



                    </div>
                    <div className="col-xxl-12">
                        <div className="card radius-12 border-0">
                            <div
                                className="d-flex align-items-center flex-wrap gap-2 justify-content-between py-12 px-20 border-bottom border-neutral-200">

                            </div>

                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                <form id="examquestions" >
                                    <div
                                        className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                        <h6 className="text-lg fw-semibold mb-0">Exam Questions</h6>
                                    </div>
                                    <div className="card-body p-20">
                                        <div className="row gy-3">
                                            <div className="col-sm-6">
                                                <div >
                                                    <label for="schoolNamee"
                                                        className="text-sm fw-semibold text-primary-light d-inline-block mb-8">Questions </label>
                                                    <input onChange={(e) => setData('questions', e.target.value)} type="text" className="form-control" id="schoolNamee"
                                                        placeholder="Questions..." />
                                                </div>
                                            </div>
                                            <div className="col-xxl-3 col-xl-4 col-sm-6">
                                                <div >
                                                    <label for="contractType"
                                                        className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                                                        Education Type
                                                    </label>
                                                    <select onChange={(e) => setData('education_type', e.target.value)} id="educationType" className="form-control form-select">
                                                        <option value="Select a Education Type" disabled selected>Select a Education Type
                                                        </option>
                                                        <option value="1">Tuition</option>
                                                        <option value="2">School</option>
                                                        <option value="3">Competitive Exam</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className=" col-sm-9 d-flex justify-content-end mt-5">
                                            <button onClick={addQuestions} className="btn btn-primary">Add Questions</button>
                                        </div>
                                    </div>
                                </form>
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
