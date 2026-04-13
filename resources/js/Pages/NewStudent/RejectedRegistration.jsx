import { useEffect, useState } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";
import { Link, router } from "@inertiajs/react";
import Pagination from "../Includes/Pagination";

export default function RejectedRegistration({ auth, role, newregn, theme }) {

    const [registration, setRegistration] = useState([]);


    useEffect(() => {

        setRegistration(newregn)


    }, [])


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
                        <div class>
                            {/* <h6 className="fw-semibold mb-0">Dashboard</h6> */}

                        </div>
                    </div>

                    <div className="mt-24">
                        <div className="row gy-4">

                            <div className="col-xxl-10">
                                <div className="row gy-4 ">





                                </div>

                            </div>

                            {role === "Student" &&


                                <div className="container p-5">

                                    {/* Steps */}
                                    <div className="d-flex justify-content-between align-items-center mb-4 position-relative">
                                        <div className="progress w-100 position-absolute" style={{ height: "2px", top: "20px", zIndex: 0 }}>
                                            <div className="progress-bar bg-danger w-25"></div>
                                        </div>

                                        {["About", "Account", "Ownership", "Financing"].map((step, i) => (
                                            <div key={i} className="text-center flex-fill" style={{ zIndex: 1 }}>
                                                <div
                                                    className={`rounded-circle mx-auto mb-1 d-flex  align-items-center justify-content-center ${i === 0 ? "bg-danger text-white" : "bg-light"
                                                        }`}
                                                    style={{ width: "40px", height: "40px" }}
                                                >
                                                    {i === 0 ? "👤" : i === 1 ? "🔒" : i === 2 ? "📄" : "$"}
                                                </div>
                                                <small className={i === 0 ? "fw-bold" : "text-muted"}>
                                                    {step}
                                                </small>
                                            </div>
                                        ))}
                                    </div>


                                </div>

                            }

                            {(role === "Counsellor" || role === "Super Admin") &&
                                <>
                                    <div className="col-xxl-12">
                                        <div className="card radius-12 border-0">
                                            <div
                                                className="d-flex align-items-center flex-wrap gap-2 justify-content-between py-12 px-20 border-bottom border-neutral-200">
                                                <h6 className="mb-2 fw-bold text-lg">Rejected Registration</h6>

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
                                                            {registration.data && registration.data.map((item, index) => {

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
                                                                        <td className="py-10-px">

                                                                            {item.address}

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
                                                            {registration.data && registration.data.length < 1 &&

                                                                <tr>
                                                                    <td></td>
                                                                    <td></td>

                                                                    <td colSpan="10" className=" d-flex justify-content-center">
                                                                        Currently no on going students
                                                                    </td>
                                                                </tr>



                                                            }




                                                        </tbody>
                                                    </table>
                                                </div>
                                                <div className="m-3">
                                                    <Pagination pagination={registration.links} />
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
