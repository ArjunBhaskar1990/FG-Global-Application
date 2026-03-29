import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, useForm, router } from "@inertiajs/react";
import DatePlugin from "../Components/FormData/DatePlugin";
import { BsCheckLg } from "react-icons/bs";

export default function StudentRegistrationView({ auth, role, studentdetails }) {


    const [studentDetails, setStudentDetails] = useState(studentdetails);
    const [examResult, setexamResult] = useState(studentdetails.examresult);
    const [showTestDate, setShowTestDate] = useState(false);
    const [bridgeCourse, setBridgeCourse] = useState(false);
    const [examSummary, setExamSummary] = useState(studentDetails.exam_summary);

    const { data, setData, post, processing, errors } = useForm({
        student_id: studentdetails.id,
        student_email: studentdetails.email,
        date_testexam: ''
    })


    const formattedDate = (date) => {
        const d = new Date(date);

        const day = String(d.getDate()).padStart(2, '0');
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const year = d.getFullYear();

        return `${day}-${month}-${year}`;
    };


    const sheduleTest = () => {

        if (data.date_testexam) {

            post(route('schedule.testexam'), {
                preserveScroll: true,
                preserveState: false,
                preserveUrl: true
            })


        } else {


            alert('Select Exam Date');

        }

    }


    const rejectApplication = () => {

        if (!confirm("Are you sure want to reject this application?")) {
            return false;
        }

        router.visit(route('reject.application', data.student_id), {
            method: 'POST',
            preserveScroll: true,
            preserveUrl: true,
        });
    }

    const sendWhatsapp = () => {
        let name = studentDetails.first_name + ' ' + studentDetails.last_name;
        let email = studentDetails.email;
        let password = studentDetails.credential_pass;
        let logindate = formattedDate(studentDetails.date_testexam)

        let msg = `Hello Mr. ${name}, your login credentials will be active on ${logindate}. Kindly attend the exam.

Email: ${email}
Password: ${password}`;

        let phone = studentDetails.contact_no;
        let waURL = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;

        window.location.href = waURL;
    }

    const setbridgeCourse = (e) => {

        setBridgeCourse(e.target.checked)

    }

    useEffect(() => {


        studentDetails.bridge_course === 0 ? setBridgeCourse(false) : setBridgeCourse(true);

    }, [studentDetails])


    const reviewTest = () => {

        router.visit(route('review.test'), {
            method: 'POST',
            data: {
                student_regid : studentdetails.id,
                exam_summary: examSummary,
                bridge_course: bridgeCourse
            },
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
                        <div className="row gy-4">

                            <div className="mt-24">
                                <div className="card h-100">
                                    <div className="card-body p-24">
                                        <div className="d-flex gap-32 flex-md-row flex-column">
                                            <div className="max-w-300-px w-100 text-center">
                                                <figure className="mb-24 w-120-px h-120-px mx-auto rounded-circle overflow-hidden">
                                                    <img src="/storage/assets/images/thumbs/student-details-img.png" alt="Student Image" className="w-100 h-100 object-fit-cover" />
                                                </figure>
                                                <h2 className="h6 text-primary-light mb-16 fw-semibold">{studentDetails.first_name + " " + studentDetails.last_name}</h2>
                                                <p className="mb-0">Registration No: <span className="text-primary-600 fw-semibold">{studentDetails.reg_id}</span>
                                                </p>
                                                {/* <p className="mb-0">Admission No: <span className="text-primary-light fw-semibold">10</span> </p> */}

                                                {studentDetails.status === 0 &&

                                                    <div className="mt-32 d-flex gap-16 w-100">
                                                        {studentDetails.status !== 4 &&
                                                            <button onClick={() => setShowTestDate(!showTestDate)}
                                                                className="btn btn-primary-600 border fw-medium border-primary-600 text-md d-flex justify-content-center align-items-center gap-8 flex-grow-1 px-12 py-8 radius-8">
                                                                <span className="d-flex text-lg">
                                                                    <i className="ri-edit-line"></i>
                                                                </span>
                                                                Schedule for Exam Test
                                                            </button>
                                                        }
                                                    </div>
                                                }

                                                {showTestDate &&
                                                    <div>
                                                        {studentDetails.status === 0 &&
                                                            <div className="m-4">
                                                                <div>

                                                                    <DatePlugin setData={setData} dataname="date_testexam" label="Exam Test Date" />
                                                                </div>
                                                                <br />
                                                                <div>
                                                                    <button onClick={sheduleTest} className="btn btn-primary">
                                                                        SCHEDULE
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        }
                                                    </div>
                                                }
                                                <br />
                                                {studentDetails.status !== 4 &&
                                                    <button onClick={rejectApplication} className="bg-danger text-sm fw-bold px-16 py-4 rounded me-3 ">
                                                        REJECT APPLICATION
                                                    </button>
                                                }
                                            </div>

                                            <div >
                                                <span className="h-100 w-1-px bg-neutral-200"></span>
                                            </div>
                                            <div className="flex-grow-1">
                                                <div className="pb-16 border-bottom d-flex align-items-center ap-20">
                                                    <h3 className="h6 w-100 text-primary-light text-lg mb-0 fw-semibold">Personal Info</h3>

                                                    <div className="d-flex justify-content-end w-100">

                                                        <div
                                                            className={`border px-16 py-4 d-flex radius-4 fw-bold text-sm ${+ studentDetails.status === 0 && 'bg-primary-100 text-secondary-600' || studentDetails.status === 1 && 'bg-primary-100 text-success-600' || studentDetails.status === 1 && 'bg-primary-100 text-dark' || studentDetails.status === 2 && 'bg-primary-100 text-success' || studentDetails.status === 3 && 'bg-primary text-white' || studentDetails.status === 4 && 'bg-danger text-white'}`}>{studentDetails.status === 0 && 'PENDING' || studentDetails.status === 1 && 'EXAMINEE' || studentDetails.status === 2 && 'COUNSELLING' || studentDetails.status === 3 && 'STUDENT' || studentDetails.status === 4 && 'REJECTED'}
                                                        </div>
                                                    </div>

                                                </div>
                                                <div className="mt-16 d-flex flex-column gap-8">
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Date of Birth</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {formattedDate(studentDetails.dob)}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Age</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.age} Years</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Gender</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.gender === 1 ? "Male" : "Female"}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Email</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.email}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Address</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.address}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Aadhaar Number</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.adhaar}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Passport</span>
                                                        <span className="fw-normal text-sm text-secondary-light">: {studentDetails.passport}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Contact No.</span>
                                                        <span className="fw-normal text-sm text-primary-600">: {studentDetails.contact_no}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Automated Call</span>
                                                        <span className="fw-normal text-sm text-primary-600">: {studentDetails.automated_calls}</span>
                                                    </div>
                                                    <div className="d-flex gap-4">
                                                        <span className="fw-semibold text-sm text-primary-light w-120-px">Automated Email</span>
                                                        <span className="fw-normal text-sm text-primary-600">: {studentDetails.automated_email}</span>
                                                    </div>

                                                </div>
                                            </div>

                                        </div>
                                        <div className="my-16">
                                            <ul className="nav nav-pills bordered-tab mb-3" id="pills-tab" role="tablist">
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12  active"
                                                        id="pills-studentDetails-tab" data-bs-toggle="pill" data-bs-target="#pills-studentDetails"
                                                        type="button" role="tab" aria-controls="pills-studentDetails" aria-selected="true">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-group-line"></i>
                                                        </span>
                                                        Student Details
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 "
                                                        id="pills-attendance-tab" data-bs-toggle="pill" data-bs-target="#pills-attendance"
                                                        type="button" role="tab" aria-controls="pills-attendance" aria-selected="false">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-calendar-check-line"></i>
                                                        </span>
                                                        Father Details
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 "
                                                        id="pills-leave-tab" data-bs-toggle="pill" data-bs-target="#pills-leave" type="button"
                                                        role="tab" aria-controls="pills-leave" aria-selected="false">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-login-box-line"></i>
                                                        </span>
                                                        Mother Details
                                                    </button>
                                                </li>
                                                {/* <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 "
                                                        id="pills-fees-tab" data-bs-toggle="pill" data-bs-target="#pills-fees" type="button"
                                                        role="tab" aria-controls="pills-fees" aria-selected="false">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-money-dollar-box-line"></i>
                                                        </span>
                                                        Fees
                                                    </button>
                                                </li> */}
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 "
                                                        id="pills-exam-tab" data-bs-toggle="pill" data-bs-target="#pills-exam" type="button"
                                                        role="tab" aria-controls="pills-exam" aria-selected="false">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-file-edit-line"></i>
                                                        </span>
                                                        Exam
                                                    </button>
                                                </li>
                                                <li className="nav-item" role="presentation">
                                                    <button
                                                        className="nav-link d-flex align-items-center gap-8 text-secondary-light fw-medium text-sm text-hover-primary-600 text-capitalize bg-transparent px-20 py-12 "
                                                        id="pills-library-tab" data-bs-toggle="pill" data-bs-target="#pills-library" type="button"
                                                        role="tab" aria-controls="pills-library" aria-selected="false">
                                                        <span className="d-flex tab-icon line-height-1 text-md">
                                                            <i className="ri-book-line"></i>
                                                        </span>
                                                        Credentials
                                                    </button>
                                                </li>
                                            </ul>


                                            <div className="tab-content" id="pills-tabContent">

                                                <div className="tab-pane fade show active" id="pills-studentDetails" role="tabpanel"
                                                    aria-labelledby="pills-studentDetails-tab" tabindex="0">
                                                    <div className="row gy-4">
                                                        <div className="col-12">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Parent Guardian Detail</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="bg-hover-neutral-50 p-20">
                                                                        <div className="row g-4">
                                                                            <div className="col-sm-4">
                                                                                <div className="d-flex align-items-center gap-12">
                                                                                    <figure
                                                                                        className="w-48-px h-48-px rounded-circle overflow-hidden mb-0">
                                                                                        <img src="/storage/assets/images/thumbs/guardian-img1.png"
                                                                                            alt="Guardian Image"
                                                                                            className="flex-shrink-0 w-100 h-100 object-fit-cover" />
                                                                                    </figure>
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">
                                                                                            {studentDetails.father_name}
                                                                                        </h6>
                                                                                        <span >Father</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Phone</h6>
                                                                                    <span >{studentDetails.father_contact}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Email</h6>
                                                                                    <span >{studentDetails.father_email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="bg-hover-neutral-50 p-20">
                                                                        <div className="row g-4">
                                                                            <div className="col-sm-4">
                                                                                <div className="d-flex align-items-center gap-12">
                                                                                    <figure
                                                                                        className="w-48-px h-48-px rounded-circle overflow-hidden mb-0">
                                                                                        <img src="/storage/assets/images/thumbs/guardian-img2.png"
                                                                                            alt="Guardian Image"
                                                                                            className="flex-shrink-0 w-100 h-100 object-fit-cover" />
                                                                                    </figure>
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">
                                                                                            {studentDetails.mother_name}
                                                                                        </h6>
                                                                                        <span >Mother</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Phone</h6>
                                                                                    <span >{studentDetails.mother_contact}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Email</h6>
                                                                                    <span >{studentDetails.mother_email}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* <div className="bg-hover-neutral-50 p-20">
                                                                        <div className="row g-4">
                                                                            <div className="col-sm-4">
                                                                                <div className="d-flex align-items-center gap-12">
                                                                                    <figure
                                                                                        className="w-48-px h-48-px rounded-circle overflow-hidden mb-0">
                                                                                        <img src="/storage/assets/images/thumbs/guardian-img1.png"
                                                                                            alt="Guardian Image"
                                                                                            className="flex-shrink-0 w-100 h-100 object-fit-cover" />
                                                                                    </figure>
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Robert Fox
                                                                                        </h6>
                                                                                        <span >Guardian (Father)</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Phone</h6>
                                                                                    <span >+19854 65642</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Email</h6>
                                                                                    <span >father@example.com</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Academic Details</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <div className="row gy-4">
                                                                            <div className="col-sm-12">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Previous School
                                                                                        Name</h6>
                                                                                    <span >{studentDetails.previous_school}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-12">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Education Mode</h6>
                                                                                    <span >{studentDetails.package} </span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-12">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">{studentDetails.package === "Competitive Exam" && "Competitive Exam"} {studentDetails.package === "Tuition" && "Tuition"}</h6>
                                                                                    <span >{studentDetails.package === "Competitive Exam" && studentDetails.competitive_mode} {studentDetails.package === "Tuition" && studentDetails.tuition_mode}</span>
                                                                                </div>
                                                                            </div>
                                                                            {studentDetails.package === "Competitive Exam" &&
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">{studentDetails.package === "Competitive Exam" && "Duration"} </h6>
                                                                                        <span >{studentDetails.package === "Competitive Exam" && studentDetails.duration} </span>
                                                                                    </div>
                                                                                </div>
                                                                            }
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Address</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <div className="row gy-4">
                                                                            <div className="col-sm-12">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Current Address
                                                                                    </h6>
                                                                                    <span >{studentDetails.address}, {studentDetails.city}, {studentDetails.state}</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-12">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Permanent Address
                                                                                    </h6>
                                                                                    <span >{studentDetails.address}, {studentDetails.city}, {studentDetails.state}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Bank Details</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <div className="row gy-4">
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Bank Name</h6>
                                                                                    <span >Bank of America</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Branch</h6>
                                                                                    <span >New York</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">IFSC Code</h6>
                                                                                    <span >5283209832</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Medical Details</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <div className="row gy-4">
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Blood Group</h6>
                                                                                    <span >O+</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Height</h6>
                                                                                    <span >5.2</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Weight</h6>
                                                                                    <span >60kg</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Documents</h6>
                                                                </div>
                                                                <div className="card-body p-20">
                                                                    <div className="p-10 border radius-8">
                                                                        <div className="d-flex align-items-center justify-content-between gap-20">
                                                                            <div className="d-flex align-items-center gap-12">
                                                                                <span
                                                                                    className="w-36-px h-36-px radius-4 bg-neutral-50 d-flex justify-content-center align-items-center text-xl">
                                                                                    <i className="ri-file-text-line"></i>
                                                                                </span>
                                                                                <span
                                                                                    className="text-md text-secondary-light">BirthCertificate.pdf</span>
                                                                            </div>
                                                                            <button type="button"
                                                                                className="w-36-px h-36-px radius-4 bg-primary-50 bg-hover-primary-100 text-primary-600 d-flex justify-content-center align-items-center text-xl">
                                                                                <i className="ri-download-2-line"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Hostel</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <div className="row gy-4">
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Hostel</h6>
                                                                                    <span >Boys Hostel 101</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Room No.</h6>
                                                                                    <span >Room No.</span>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-sm-4">
                                                                                <div >
                                                                                    <h6 className="text-md mb-2 fw-medium flex-grow-1">Room Type</h6>
                                                                                    <span >One Bed</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12">
                                                            <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                                <div
                                                                    className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                                    <h6 className="text-lg fw-semibold mb-0">Description</h6>
                                                                </div>
                                                                <div className="card-body p-0">
                                                                    <div className="p-20">
                                                                        <p className="text-secondary-light">Known for their punctuality and positive
                                                                            attitude,
                                                                            [he/she/they] consistently demonstrates a strong commitment to academic
                                                                            excellence
                                                                            and co-curricular participation. [He/She/They] maintains good behavior,
                                                                            shows
                                                                            respect toward teachers and peers, and actively engages in classroom
                                                                            discussions and
                                                                            group activities. </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                </div>

                                                <div className="tab-pane fade" id="pills-attendance" role="tabpanel"
                                                    aria-labelledby="pills-attendance-tab" tabindex="0">
                                                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                        <div
                                                            className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                            <h6 className="text-lg fw-semibold mb-0">Father Details</h6>
                                                        </div>

                                                        <div className="row d-flex">
                                                            <div className="col-md-6">
                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Father Name
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_name}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Address
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_address}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Contact Number
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_contact}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Educational Qualification
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_qualification}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Place of Employment
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_employment}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Work Phone Number
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_phone}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Email
                                                                                        </h6>
                                                                                        <span >{studentDetails.father_email}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                        {/*
                                                        <div className="card-body p-0">
                                                            <div className="px-20 pt-20">
                                                                <div className="row row-cols-xxl-5 row-cols-lg-3 row-cols-sm-2 row-cols-1 g-3">
                                                                    <div className="col">
                                                                        <div
                                                                            className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-7">
                                                                            <div className="card-body p-0">
                                                                                <div
                                                                                    className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                                                                    <div>
                                                                                        <h6 className="fw-semibold mb-2">227</h6>
                                                                                        <span className="fw-medium text-secondary-light text-sm">Total
                                                                                            Present</span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="mb-0 w-48-px h-48-px bg-success-600 text-white flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                                                        <img src="/storage/assets/images/icons/attendence-icon1.png"
                                                                                            alt="Present Icon" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div
                                                                            className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-8">
                                                                            <div className="card-body p-0">
                                                                                <div
                                                                                    className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                                                                    <div>
                                                                                        <h6 className="fw-semibold mb-2">70</h6>
                                                                                        <span className="fw-medium text-secondary-light text-sm">Total
                                                                                            Absent</span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="mb-0 w-48-px h-48-px bg-danger-600 text-white flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                                                        <img src="/storage/assets/images/icons/attendence-icon2.png"
                                                                                            alt="Absent Icon" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div
                                                                            className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-9">
                                                                            <div className="card-body p-0">
                                                                                <div
                                                                                    className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                                                                    <div>
                                                                                        <h6 className="fw-semibold mb-2">27</h6>
                                                                                        <span className="fw-medium text-secondary-light text-sm">Half
                                                                                            Day</span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="mb-0 w-48-px h-48-px bg-purple-600 text-white flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                                                        <img src="/storage/assets/images/icons/attendence-icon3.png"
                                                                                            alt="Calendar Icon" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div
                                                                            className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-10">
                                                                            <div className="card-body p-0">
                                                                                <div
                                                                                    className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                                                                    <div>
                                                                                        <h6 className="fw-semibold mb-2">28</h6>
                                                                                        <span className="fw-medium text-secondary-light text-sm">Total
                                                                                            Late</span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="mb-0 w-48-px h-48-px bg-info-600 text-white flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                                                        <img src="/storage/assets/images/icons/attendence-icon4.png"
                                                                                            alt="Clock Icon" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="col">
                                                                        <div
                                                                            className="card px-20 py-28 shadow-2 radius-8 h-100 border border-neutral-200 shadow-none gradient-bg-end-11">
                                                                            <div className="card-body p-0">
                                                                                <div
                                                                                    className="d-flex flex-wrap align-items-center justify-content-between gap-1">
                                                                                    <div>
                                                                                        <h6 className="fw-semibold mb-2">12</h6>
                                                                                        <span className="fw-medium text-secondary-light text-sm">Total
                                                                                            Holiday</span>
                                                                                    </div>
                                                                                    <span
                                                                                        className="mb-0 w-48-px h-48-px bg-orange text-white flex-shrink-0 text-white d-flex justify-content-center align-items-center rounded-circle h6 mb-0">
                                                                                        <img src="/storage/assets/images/icons/attendence-icon5.png"
                                                                                            alt="Holiday Icon" />
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="mt-24 mb-16 mx-20">
                                                                <div
                                                                    className="d-flex flex-wrap align-items-center gap-24 justify-content-between flex-wrap">
                                                                    <div className="d-flex flex-wrap align-items-center gap-16 ">
                                                                        <div >
                                                                            <select className="form-control form-select">
                                                                                <option value="Jun 2025/2026">Jun 2025/2026</option>
                                                                                <option value="Jun 2026/2027">Jun 2026/2027</option>
                                                                                <option value="Jun 2027/2028">Jun 2027/2028</option>
                                                                                <option value="Jun 2028/2029">Jun 2028/2029</option>
                                                                            </select>
                                                                        </div>
                                                                        <div className="dropdown">
                                                                            <button type="button"
                                                                                className="px-12 py-8 border border-neutral-300 radius-8 d-flex align-items-center gap-20"
                                                                                data-bs-toggle="dropdown" aria-expanded="false">
                                                                                <span
                                                                                    className="d-flex align-items-center gap-1 text-secondary-light text-sm">
                                                                                    <i className="ri-file-upload-line text-md line-height-1"></i>
                                                                                    Export
                                                                                </span>
                                                                                <span >
                                                                                    <i className="ri-arrow-down-s-line"></i>
                                                                                </span>
                                                                            </button>
                                                                            <ul className="dropdown-menu p-12 border bg-base shadow">
                                                                                <li>
                                                                                    <button type="button"
                                                                                        className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10"
                                                                                        data-bs-toggle="modal" data-bs-target="#exampleModalView">
                                                                                        <i className="ri-file-3-line"></i>
                                                                                        PDF
                                                                                    </button>
                                                                                </li>
                                                                                <li>
                                                                                    <button type="button"
                                                                                        className="dropdown-item px-16 py-8 rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-10"
                                                                                        data-bs-toggle="modal" data-bs-target="#exampleModalEdit">
                                                                                        <i className="ri-file-excel-line"></i>
                                                                                        Excel
                                                                                    </button>
                                                                                </li>
                                                                            </ul>
                                                                        </div>
                                                                    </div>
                                                                    <div className="d-flex align-items-center flex-wrap gap-8">
                                                                        <p className="text-primary-light text-sm fw-medium mb-0">
                                                                            Present:
                                                                            <span className="fw-semibold text-success-600">P </span>
                                                                        </p>
                                                                        <p className="text-primary-light text-sm fw-medium mb-0">
                                                                            Absent:
                                                                            <span className="fw-semibold text-danger-600">A </span>
                                                                        </p>
                                                                        <p className="text-primary-light text-sm fw-medium mb-0">
                                                                            Holiday:
                                                                            <span className="fw-semibold text-warning-600">H </span>
                                                                        </p>
                                                                        <p className="text-primary-light text-sm fw-medium mb-0">
                                                                            Late:
                                                                            <span className="fw-semibold text-info-600">L </span>
                                                                        </p>
                                                                        <p className="text-primary-light text-sm fw-medium mb-0">
                                                                            Half Day:
                                                                            <span className="fw-semibold text-purple-600">F </span>
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="table-responsive overflow-x-auto">
                                                                <table className="table mb-0 table-heading-dark-mode">
                                                                    <thead>
                                                                        <tr>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">Month
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">1</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">2</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">3</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">4</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">5</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">6</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">7</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">8</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">9</th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">10
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">11
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">12
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">13
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">14
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">15
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">15
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">16
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">17
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">18
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">19
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">20
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">21
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">22
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">23
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">24
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">25
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">26
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">27
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">28
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">29
                                                                            </th>
                                                                            <th className="bg-neutral-100 text-sm text-primary-light px-10 py-16">30
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Jan</td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">H</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">A</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">F</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">L</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">H</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">A</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">L</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">h</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">F</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">H</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">P</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">A</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">H</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">p</span>
                                                                            </td>
                                                                            <td className="px-10 py-14 text-sm text-uppercase">
                                                                                <span className="attendance">p</span>
                                                                            </td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Feb</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Mar</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Apr</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">May</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">May</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">F</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">L</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">H</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">P</span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance">A</span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Jun</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Ju</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Aug</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Sep</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Oct</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Nov</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td className="px-10 py-16 text-sm">Dec</td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                            <td className="px-10 py-16 text-sm"><span className="attendance"></span></td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div> */}



                                                    </div>
                                                </div>

                                                <div className="tab-pane fade" id="pills-leave" role="tabpanel" aria-labelledby="pills-leave-tab"
                                                    tabindex="0">
                                                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                        <div
                                                            className="card-header border-bottom bg-base py-10 px-20 d-flex align-items-center justify-content-between">
                                                            <h6 className="text-lg fw-semibold mb-0">Mother Details </h6>

                                                        </div>

                                                        <div className="row d-flex">
                                                            <div className="col-md-6">
                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Mother Name
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_name}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Address
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_address}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Contact Number
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_contact}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Educational Qualification
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_qualification}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-md-6">
                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Place of Employment
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_employment}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Work Phone Number
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_phone}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Email
                                                                                        </h6>
                                                                                        <span >{studentDetails.mother_email}</span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    </div>
                                                </div>


                                                <div className="tab-pane fade" id="pills-exam" role="tabpanel" aria-labelledby="pills-exam-tab"
                                                    tabindex="0">
                                                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                        <div
                                                            className="card-header border-bottom bg-base py-16 px-24 d-flex align-items-center justify-content-between">
                                                            <h6 className="text-lg fw-semibold mb-0">Exam </h6>
                                                        </div>

                                                        <div>
                                                            <div className="col-xxl-12 col-xl-10 col-sm-10">
                                                                <div className=" ">

                                                                    {/* <div>
                                                                        <label for="contractType"
                                                                            className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                                                                            Question Type
                                                                        </label>
                                                                        <select onChange={(e) => setData('education_type', e.target.value)} id="educationType" className="form-control form-select">
                                                                            <option value="Select a Education Type" disabled selected>Select Question Type
                                                                            </option>
                                                                            <option value="1" selected={studentDetails.package === "Tuition"}>Tuition</option>
                                                                            <option value="2" selected={studentDetails.package === "School"}>School</option>
                                                                            <option value="3" selected={studentDetails.package === "Competitive Exam"}>Competitive Exam</option>
                                                                        </select>
                                                                    </div>

                                                                    &nbsp;&nbsp;&nbsp;
                                                                    <div >

                                                                        <button className="btn btn-primary" style={{ marginTop: '35px' }}>
                                                                            Update Question
                                                                        </button>
                                                                    </div> */}


                                                                    <div className=" col-sm-12">

                                                                        {examResult.length > 0 &&
                                                                            <div className="table-responsive" style={{ fontFamily: 'Poppins' }}>
                                                                                <table className="table table-striped table-hover align-middle text-center mb-0">
                                                                                    <thead className="table-dark sticky-top">
                                                                                        <tr>
                                                                                            <th className="bg-dark">#</th>
                                                                                            <th className="bg-dark">Question</th>
                                                                                            <th className="bg-dark">Answer</th>
                                                                                            <th className="bg-dark">File</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        {examResult.map((row, idx) => (
                                                                                            <tr
                                                                                                key={idx}
                                                                                                style={{ transition: "all 0.3s ease" }}
                                                                                                className={idx % 2 === 0 ? "bg-light" : ""}
                                                                                            >
                                                                                                <td className="fw-bold p-3">{idx + 1}</td>
                                                                                                <td
                                                                                                    className="fw-semibold p-3 text-truncate text-start"
                                                                                                    style={{ maxWidth: "250px" }}
                                                                                                    title={row.question} // show full text on hover
                                                                                                >
                                                                                                    {row.question}
                                                                                                </td>
                                                                                                <td className="p-3" >
                                                                                                    <div className="fs-6 text-white text-start">
                                                                                                        {row.answer}
                                                                                                    </div>
                                                                                                </td>
                                                                                                <td className="p-3 text-start">
                                                                                                    {row.image ? (
                                                                                                        <a
                                                                                                            href={row.image}
                                                                                                            target="_blank"
                                                                                                            rel="noopener noreferrer"
                                                                                                            className="text-primary text-decoration-underline"
                                                                                                        >
                                                                                                            {row.image.split("/").pop()}
                                                                                                        </a>
                                                                                                    ) : (
                                                                                                        <span className="fst-italic fw-bold">No File</span>
                                                                                                    )}
                                                                                                </td>
                                                                                            </tr>
                                                                                        ))}
                                                                                    </tbody>
                                                                                </table>




                                                                            </div>
                                                                        }
                                                                        <div className="m-3" style={{ fontFamily: 'Poppins' }}>
                                                                            <hr />
                                                                            <label className="fw-bold fs-5" >Exam Summary</label>

                                                                            <br />
                                                                            <textarea onChange={(e) => setExamSummary(e.target.value)} className="col-sm-8 rounded text-dark " defaultValue={examSummary} style={{ backgroundColor: '#e6e6e6' }} /> <br /> <br />



                                                                            <div className="form-check style-check d-flex align-items-center">
                                                                                <input onChange={(e) => setbridgeCourse(e)} checked={bridgeCourse} className="form-check-input" type="checkbox" />
                                                                                <label className="form-check-label">
                                                                                    Student / Parent is willing for BRIDGE Course.
                                                                                </label>
                                                                            </div>

                                                                            <br /> <br />





                                                                            <button onClick={reviewTest} className="btn btn-success text-dark fw-bold"> Review  </button>
                                                                        </div>
                                                                        {examResult.length < 1 &&
                                                                            <div className="d-flex justify-content-center">
                                                                                Currently nothing to show !!
                                                                            </div>

                                                                        }
                                                                    </div>

                                                                </div>

                                                            </div>


                                                        </div>






                                                    </div>
                                                </div>

                                                <div className="tab-pane fade" id="pills-library" role="tabpanel" aria-labelledby="pills-library-tab"
                                                    tabindex="0">
                                                    <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">
                                                        <div
                                                            className="card-header border-bottom bg-base py-10 px-20 d-flex align-items-center justify-content-between">
                                                            <h6 className="text-lg fw-semibold mb-0">Login Credentials </h6>

                                                        </div>

                                                        <div className="row d-flex">


                                                            <div className="col-md-6">
                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div >
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Username (Email)
                                                                                        </h6>
                                                                                        <span >{studentDetails.email ? studentDetails.email : "N/A"}</span>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-12">
                                                                                    <div>
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Password
                                                                                        </h6>
                                                                                        <span >{studentDetails.credential_pass ? studentDetails.credential_pass : "N/A"}</span>&nbsp;&nbsp;&nbsp;
                                                                                        {studentDetails.status === 4 && (<span className="fw-bold bg-white rounded p-1 text-danger">ACCOUNT DISABLED</span>)}
                                                                                    </div>
                                                                                </div>

                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-sm-6">


                                                                <div className="shadow-1 radius-12 bg-base h-100 overflow-hidden">

                                                                    <div className="card-body p-0">
                                                                        <div className="p-20">
                                                                            <div className="row gy-4">
                                                                                <div className="col-sm-12">
                                                                                    <div>
                                                                                        <h6 className="text-md mb-2 fw-medium flex-grow-1">Share Credentials
                                                                                        </h6>
                                                                                        {studentDetails.credential_pass ?
                                                                                            <span onClick={sendWhatsapp} style={{ cursor: 'pointer' }} ><i className="fa-brands text-success fa-whatsapp text-xxl"></i></span>
                                                                                            :
                                                                                            "N/A"
                                                                                        }
                                                                                    </div>
                                                                                </div>


                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>

                                                        </div>



                                                    </div>
                                                </div>


                                            </div>
                                        </div>
                                    </div>
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
