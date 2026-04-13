import { useEffect, useState, useRef } from "react";
import NavBar from "../Includes/NavBar";
import SideMenu from "../Includes/SideMenu";

export default function StudentMain({ auth, role, theme }) {

    const [loader, setLoader] = useState(false);
    const [questionsState, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);



















    // useEffect(() => {

    //     const body = document.getElementById('body');
    //     if (loader) {
    //         body.classList.add('opacity-50')

    //     } else {
    //         body.classList.remove('opacity-50')

    //     }
    // }, [loader])

    return (

        <>
            {loader &&
                <span className="loader"></span>
            }


            <div className="body-overlay"></div>
            <div
                className="overlay bg-black bg-opacity-50 w-100 h-100 position-fixed z-9 visibility-hidden opacity-0 duration-300">
            </div>

            <SideMenu auth={auth} role={role} theme={theme}/>

            <main id="dashboard-main " className="dashboard-main">

                <NavBar auth={auth} theme={theme}/>

                <div class="col-xxl-6 m-3">
                    <div class="card radius-12 border-0 h-100">
                        <div class="card-body p-24 d-flex gap-16 flex-sm-nowrap flex-wrap">
                            <div
                                class="radius-8 overflow-hidden position-relative z-1 py-32 px-20 text-center d-flex justify-content-center align-items-center flex-grow-1">
                                <img src="/storage/assets/images/bg/edit-profile-bg.png" alt="BG Image"
                                    class="position-absolute start-0 top-0 w-100 h-100 z-n1" />
                                <div class="">
                                    <span class="mb-12">
                                        <img src="/storage/assets/images/thumbs/studnt-edit-profile-img.png" alt="BG Image"
                                            class="rounded-circle object-fit-cover" />
                                    </span>
                                    <h6 class="text-white">{auth.name}</h6>
                                    <span class="text-white text-lg d-block">Age: {auth.students.age}</span>
                                    <span class="text-white text-lg d-block">Roll No: {auth.students.id}</span>
                                    <span class="text-white text-lg d-block">Contact No.: {auth.students.contact_no}</span>
                                    <span class="text-white text-lg d-block">Email: {auth.email}</span>
                                    <span class="text-white text-lg d-block">Gender: {auth.students.gender === 1 ? "Male" : "Female"}</span>
                                    <div class="mt-12">
                                        <a href="#"
                                            class="px-20 py-8 text-white bg-white bg-opacity-10 radius-6 fw-medium text-lg">Edit
                                            Profile</a>
                                    </div>
                                </div>
                            </div>

                            <div class="d-flex flex-column gap-20 flex-grow-1 justify-content-between">
                                <div
                                    class="radius-8 py-24 px-24 text-start d-flex align-items-center gap-12 bg-purple-100">
                                    <span
                                        class="w-48-px h-48-px d-inline-flex justify-content-center align-items-center rounded-circle border border-purple-300 bg-purple-200">
                                        <img src="/storage/assets/images/icons/teacher-widget-icon1.png" alt="User Icon" />
                                    </span>
                                    <div class="">
                                        <span class="text-secondary-light fw-medium d-block">Events</span>
                                        <h5 class="text-primary-light">10</h5>
                                    </div>
                                </div>
                                <div
                                    class="radius-8 py-24 px-24 text-start d-flex align-items-center gap-12 bg-success-100">
                                    <span
                                        class="w-48-px h-48-px d-inline-flex justify-content-center align-items-center rounded-circle border border-success-300 bg-success-200">
                                        <img src="/storage/assets/images/icons/teacher-widget-icon2.png" alt="User Icon" />
                                    </span>
                                    <div class="">
                                        <span class="text-secondary-light fw-medium d-block">Notifications</span>
                                        <h5 class="text-primary-light">15</h5>
                                    </div>
                                </div>
                                <div
                                    class="radius-8 py-24 px-24 text-start d-flex align-items-center gap-12 bg-primary-100">
                                    <span
                                        class="w-48-px h-48-px d-inline-flex justify-content-center align-items-center rounded-circle border border-primary-300 bg-primary-200">
                                        <img src="/storage/assets/images/icons/teacher-widget-icon3.png" alt="User Icon" />
                                    </span>
                                    <div class="">
                                        <span class="text-secondary-light fw-medium d-block">Attendance</span>
                                        <h5 class="text-primary-light">90%</h5>
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
            </main >







        </>
    )
}
