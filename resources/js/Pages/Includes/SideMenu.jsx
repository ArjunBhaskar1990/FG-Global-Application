import { useEffect } from "react"
import { Link } from "@inertiajs/react";

export default function SideMenu({ auth, role }) {



    useEffect(() => {

        const body = document.querySelector('html');

        body.setAttribute('data-theme', 'dark');

    }, [])


    const sideBar = () => {

        const dashboardMain = document.getElementById('dashboard-main');
        const sidebar = document.getElementById('sidebar');


        sidebar.classList.toggle('active');
        dashboardMain.classList.toggle('active');
    }


    const toggleClose = () => {


        const body = document.querySelector('body');
        body.classList.remove('overlay-active');

        const sidebar = document.getElementById('sidebar')
        sidebar.classList.remove('sidebar-open')
    }


    useEffect(() => {
        if (role === "Super Admin" || role === "Counsellor") {
            const showNewStudent = document.getElementById('showNewStudent');
            if (showNewStudent) showNewStudent.style.display = "none";

            const showConfig = document.getElementById('showConfig');
            if (showConfig) showConfig.style.display = "none";
        }
    }, [role]);


    const dropAdmission = () => {

        let el = document.getElementById('showNewStudent');
        if (el.style.display === "none") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }

    }

    const dropConfig = () => {

        let el = document.getElementById('showConfig');
        if (el.style.display === "none") {
            el.style.display = "block";
        } else {
            el.style.display = "none";
        }

    }


    return (
        <>
            <aside id="sidebar" className="sidebar ">

                <button onClick={toggleClose} type="button" className="sidebar-close-btn">
                    <iconify-icon icon="radix-icons:cross-2"></iconify-icon>
                </button>
                <div>
                    <div
                        className="sidebar-logo d-flex align-items-center justify-content-between">
                        <a href={route('page.dashboard')} >
                            <img src="/storage/assets/images/logo.png" alt="site logo"
                                className="light-logo" />
                            <div className="d-flex justify-content-center">
                                <img src="/storage/fgglobal/fg_og.png" alt="site logo"
                                    className="dark-logo" style={{ width: '100px' }} />
                            </div>

                            <img src="/storage/fgglobal/fg_og.png" alt="site logo"
                                className="logo-icon" />
                        </a>
                        <button type="button"
                            className="text-xxl d-xl-flex d-none line-height-1 sidebar-toggle text-neutral-500"
                            aria-label="Collapse Sidebar">
                            <i onClick={sideBar} className="ri-contract-left-line"></i>
                        </button>
                    </div>
                </div>

                <div className="mx-16 py-12">
                    <div className="dropdown profile-dropdown">
                        <button type="button"
                            className="profile-dropdown__button d-flex align-items-center justify-content-between p-10 w-100 overflow-hidden bg-neutral-50 radius-12 "
                            data-bs-toggle="dropdown" data-bs-display="static"
                            aria-expanded="false">
                            <span className="d-flex align-items-start gap-10">
                                <img src="/storage/assets/images/thumbs/leave-request-img2.png"
                                    alt="Thumbnail"
                                    className="w-40-px h-40-px rounded-circle object-fit-cover flex-shrink-0" />
                                <span className="profile-dropdown__contents">
                                    <span className="h6 mb-0 text-md d-block text-primary-light">{auth.name}</span>
                                    <span
                                        className="text-secondary-light text-sm mb-0 d-block">{role}</span>
                                </span>
                            </span>
                            <span
                                className="profile-dropdown__icon pe-8 text-xl d-flex line-height-1">
                                <i className="ri-arrow-right-s-line"></i>
                            </span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-lg-end border p-12">
                            <li>
                                <a href="student-details.html"
                                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                                    <i className="ri-user-3-line"></i>
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a href="general.html"
                                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                                    <i className="ri-settings-3-line"></i>
                                    Setting
                                </a>
                            </li>
                            <li>
                                <Link href={route('logout')} method="delete"
                                    className="dropdown-item rounded text-secondary-light bg-hover-neutral-200 text-hover-neutral-900 d-flex align-items-center gap-2 py-6">
                                    <i className="ri-shut-down-line"></i>
                                    Log Out
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="sidebar-menu-area">

                    <ul className="sidebar-menu" id="sidebar-menu ">
                        <li>
                            <Link href={route('page.dashboard')}>
                                <i className="ri-home-4-line"></i>
                                <span>Dashboard</span>
                            </Link>
                        </li>
                        {role === "Super Admin" || role === "Counsellor" &&
                            <>
                                <li className="dropdown">
                                    <a style={{ cursor: 'pointer' }} onClick={dropAdmission}>
                                        <i className="ri-booklet-line"></i>

                                        <span>New Student </span>
                                    </a>

                                    <ul id="showNewStudent" className="sidebar-submenu hidden " >
                                        <li>
                                            <Link href={route('page.newregistration')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                New Registration
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('page.examlist')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                Exam Test
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('page.counsellinglist')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                Counselling
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('page.studentsindex')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                On Going Students
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href={route('page.rejectedstudents')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                Rejected Registration
                                            </Link>
                                        </li>

                                    </ul>
                                </li>

                                <li className="dropdown">
                                    <a style={{ cursor: 'pointer' }} onClick={dropConfig}>
                                        <i className="ri-booklet-line"></i>

                                        <span>Configuration </span>
                                    </a>

                                    <ul id="showConfig" className="sidebar-submenu hidden " >
                                        <li>
                                            <Link href={route('exam.questions')}>
                                                <i className="ri-circle-fill circle-icon w-auto"></i>
                                                Questions
                                            </Link>
                                        </li>

                                    </ul>
                                </li>
                            </>
                        }

                    </ul>


                </div>

            </aside >
        </>
    )

}
