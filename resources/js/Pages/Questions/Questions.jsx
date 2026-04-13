import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router } from "@inertiajs/react";

export default function Dashboard({ auth, role, theme, totalpendingreg, totaltestexam, questions }) {

    const [totalNewReg, setTotalNewReg] = useState(totalpendingreg);
    const [totaltestCount, settotaltestCount] = useState(totaltestexam);
    const [question, setQuestions] = useState([]);
    const [dataTitle, setDataTitle] = useState('');
    const [questiondata, setQuestiondata] = useState('');


    useEffect(() => {


        setQuestions(questions)


    }, [questions])


    const deleteQuestions = (id) => {


        router.delete(route('exam.questions.destroy', id), {
            preserveScroll: true,

        });




    }





    return (

        <>


            <div className="body-overlay"></div>
            <div
                className="overlay bg-black bg-opacity-50 w-100 h-100 position-fixed z-9 visibility-hidden opacity-0 duration-300">
            </div>

            <SideMenu auth={auth} role={role} theme={theme}/>

            <main id="dashboard-main" className="dashboard-main">

                <NavBar auth={auth} theme={theme}/>

                <div className="dashboard-main-body">


                    <div
                        className="breadcrumb d-flex flex-wrap align-items-center justify-content-between gap-3 mb-24">
                        <div >
                            <h6 className="fw-semibold mb-0">Exam Questions</h6>

                        </div>

                        <div>

                            <Link href={route('exam.questions.create')} className="btn btn-primary-600 d-flex align-items-center gap-6 ">
                                <span className="d-flex text-md">
                                    <i className="ri-add-large-line"></i>
                                </span>
                                Add New Questions
                            </Link>
                        </div>


                    </div>
                    <div className="col-xxl-12">
                        <div className="card radius-12 border-0">
                            <div
                                className="d-flex align-items-center flex-wrap gap-2 justify-content-between py-12 px-20 border-bottom border-neutral-200">
                                <h6 className="mb-2 fw-bold text-lg">{dataTitle}</h6>

                            </div>
                            <div className="card-body p-0">
                                <div className="table-responsive scroll-sm">
                                    <table className="table bordered-table mb-0 data-table" id="dataTable"
                                        data-page-length='10'>
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Questions</th>
                                                <th scope="col">Education Type</th>
                                                <th scope="col">Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {question.map((item, index) => {




                                                return (
                                                    <tr key={index}>
                                                        <td className="py-10-px"><span className="text-primary-600">{index + 1}</span></td>
                                                        <td className="py-10-px">
                                                            <div className="d-flex align-items-center">

                                                                <div>
                                                                    <h6 className="text-md mb-0 fw-medium">{item.questions}</h6>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="py-10-px">

                                                            {item.education_type === 1 && "School"}
                                                            {item.education_type === 2 && "Tuition"}
                                                            {item.education_type === 3 && "Competitive Exam"}

                                                        </td>
                                                        <td className="py-10-px">
                                                            <button onClick={() => deleteQuestions(item.id)} className="btn btn-danger"> Delete </button>
                                                        </td>

                                                    </tr>

                                                )
                                            })

                                            }
                                            {question.length < 1 &&

                                                <tr>
                                                    <td></td>
                                                    <td></td>

                                                    <td colSpan="6" className=" d-flex justify-content-center">
                                                        Currently no questions
                                                    </td>
                                                </tr>



                                            }




                                        </tbody>
                                    </table>
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
