import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router } from "@inertiajs/react";

export default function Dashboard({ auth, role, totalpendingreg, totaltestexam, totalcounselees, totalstudents, totalrejected, newregn }) {

    const [totalNewReg, setTotalNewReg] = useState(totalpendingreg);
    const [totaltestCount, settotaltestCount] = useState(totaltestexam);
    const [totalcounseleesCount, settotalcounseleesCount] = useState(totalcounselees);
    const [totalstudentsCount, settotalstudentsCount] = useState(totalstudents);
    const [totalrejectedCount, settotalrejectedCount] = useState(totalrejected);
    const [registration, setRegistration] = useState([]);
    const [dataTitle, setDataTitle] = useState('');


    useEffect(() => {

        setRegistration(newregn)

        setDataTitle("New Registration")

    }, [])

    const examTest = () => {

        router.visit(route('regn.examtest'), {
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,

            onSuccess: (page) => {

                setRegistration(page.props.newregn);
                setDataTitle("Examinees")

            }

        })
    }
    const Counselling = () => {

        router.visit(route('regn.counselling'), {
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,

            onSuccess: (page) => {

                setRegistration(page.props.newregn);
                setDataTitle("Counselees")

            }

        })
    }

    const Students = () => {

        router.visit(route('regn.students'), {
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,

            onSuccess: (page) => {

                setRegistration(page.props.newregn);
                setDataTitle("Students")

            }

        })
    }

    const NewRegn = () => {

        router.visit(route('regn.newregn'), {
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,

            onSuccess: (page) => {

                setRegistration(page.props.newregn);
                setDataTitle("New Registration")

            }

        })
    }

    const RejectedStudents = () => {

        router.visit(route('regn.rejected'), {
            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,

            onSuccess: (page) => {

                setRegistration(page.props.newregn);
                setDataTitle("Rejected Applications")

            }

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

                            <div className="col-xxl-12">
                                <div className="row gy-4  d-flex justify-content-center ">




                                    {role === "Counsellor" &&

                                        <>
                                            <div className="col-xxl-2 col-sm-4 " style={{ cursor: 'pointer' }} onClick={NewRegn}>
                                                <div className="card  shadow-1 radius-8 gradient-bg-end-1 h-100">

                                                    <div className="card-body p-20 hoverCounter">
                                                        <div
                                                            className="d-flex flex-wrap align-items-center gap-3 mb-16">
                                                            <div
                                                                className="w-44-px h-44-px bg-warning-600 rounded-circle d-flex justify-content-center align-items-center">
                                                                <img src="/storage/assets/images/icons/dashboard-icon1.png"
                                                                    alt="Icon" />
                                                            </div>
                                                            <p className="fw-medium text-primary-light mb-1">New Regn
                                                            </p>
                                                        </div>
                                                        <h6 className="mb-0">{totalNewReg}</h6>

                                                    </div>
                                                </div>
                                            </div>


                                            <div className="col-xxl-2 col-sm-4" style={{ cursor: 'pointer' }} onClick={examTest}>
                                                <div className="card shadow-1 radius-8 gradient-bg-end-1 h-100">

                                                    <div className="card-body p-20 hoverCounter">
                                                        <div
                                                            className="d-flex flex-wrap align-items-center gap-3 mb-16">
                                                            <div
                                                                className="w-44-px h-44-px bg-warning-600 rounded-circle d-flex justify-content-center align-items-center">
                                                                <img src="/storage/assets/images/icons/dashboard-icon1.png"
                                                                    alt="Icon" />
                                                            </div>
                                                            <p className="fw-medium text-primary-light mb-1">Examinees
                                                            </p>
                                                        </div>
                                                        <h6 className="mb-0">{totaltestCount}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-2 col-sm-4" style={{ cursor: 'pointer' }} onClick={Counselling}>
                                                <div className="card shadow-1 radius-8 gradient-bg-end-1 h-100">

                                                    <div className="card-body p-20 hoverCounter">
                                                        <div
                                                            className="d-flex flex-wrap align-items-center gap-3 mb-16">
                                                            <div
                                                                className="w-44-px h-44-px bg-warning-600 rounded-circle d-flex justify-content-center align-items-center">
                                                                <img src="/storage/assets/images/icons/dashboard-icon1.png"
                                                                    alt="Icon" />
                                                            </div>
                                                            <p className="fw-medium text-primary-light mb-1">Counselees
                                                            </p>
                                                        </div>
                                                        <h6 className="mb-0">{totalcounseleesCount}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-2 col-sm-4" style={{ cursor: 'pointer' }} onClick={Students}>
                                                <div className="card shadow-1 radius-8 gradient-bg-end-1 h-100">

                                                    <div className="card-body p-20 hoverCounter">
                                                        <div
                                                            className="d-flex flex-wrap align-items-center gap-3 mb-16">
                                                            <div
                                                                className="w-44-px h-44-px bg-warning-600 rounded-circle d-flex justify-content-center align-items-center">
                                                                <img src="/storage/assets/images/icons/dashboard-icon1.png"
                                                                    alt="Icon" />
                                                            </div>
                                                            <p className="fw-medium text-primary-light mb-1">Students
                                                            </p>
                                                        </div>
                                                        <h6 className="mb-0">{totalstudentsCount}</h6>

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-xxl-2 col-sm-4 " style={{ cursor: 'pointer' }} onClick={RejectedStudents}>
                                                <div className="card  shadow-1 radius-8 gradient-bg-end-1 h-100">

                                                    <div className="card-body p-20 hoverCounter">
                                                        <div
                                                            className="d-flex flex-wrap align-items-center gap-3 mb-16">
                                                            <div
                                                                className="w-44-px h-44-px bg-warning-600 rounded-circle d-flex justify-content-center align-items-center">
                                                                <img src="/storage/assets/images/icons/dashboard-icon1.png"
                                                                    alt="Icon" />
                                                            </div>
                                                            <p className="fw-medium text-primary-light mb-1">Rejected
                                                            </p>
                                                        </div>
                                                        <h6 className="mb-0">{totalrejectedCount}</h6>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    }

                                </div>

                            </div>


                            {(role === "Counsellor" || role === "Super Admin") &&
                                <>
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
                                                                <th scope="col">Regn No</th>
                                                                <th scope="col">Student Name</th>
                                                                <th scope="col">Address</th>
                                                                <th scope="col">Parent Name</th>
                                                                <th scope="col">Education Mode</th>
                                                                <th scope="col">Status</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {registration.map((item, index) => {

                                                                const studentname = item.first_name + "-" + item.last_name;


                                                                return (
                                                                    <tr key={index}>
                                                                        <td className="py-10-px"><span className="text-primary-600">{item.reg_id}</span></td>
                                                                        <td className="py-10-px">
                                                                            <div className="d-flex align-items-center">

                                                                                <div>
                                                                                    <h6 className="text-md mb-0 fw-medium">{item.first_name + " " + item.last_name}</h6>
                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-10-px" style={{ width: '400px' }}>
                                                                            <div className="w-50">
                                                                                {item.address}

                                                                            </div>

                                                                        </td>
                                                                        <td className="py-10-px">

                                                                            <div className="d-flex align-items-center">

                                                                                <div>
                                                                                    <h6 className="text-md mb-0 fw-medium">Father : {item.father_name}</h6>
                                                                                    <h6 className="text-md mb-0 fw-medium">Mother: {item.mother_name}</h6>

                                                                                </div>
                                                                            </div>
                                                                        </td>
                                                                        <td className="py-10-px">{item.package}</td>
                                                                        <td className="py-10-px">
                                                                            <Link href={route('view.studentregn', [item.reg_id.toLowerCase(), studentname, item.id])}>
                                                                                <button className="btn btn-primary">
                                                                                    View
                                                                                </button>
                                                                            </Link>


                                                                        </td>
                                                                    </tr>

                                                                )
                                                            })

                                                            }
                                                            {registration.length < 1 &&

                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>

                                                                    <td colSpan="10" className=" d-flex justify-content-center">
                                                                        Currently no new registration
                                                                    </td>
                                                                </tr>



                                                            }




                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            }
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
