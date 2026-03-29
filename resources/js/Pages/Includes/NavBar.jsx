

export default function NavBar() {


    const toggleMenu = () => {

        const body = document.querySelector('body');
        body.classList.add('overlay-active');

        const sidebar = document.getElementById('sidebar')
        sidebar.classList.add('sidebar-open')



    }

    return (

        <>
            <div className="navbar-header shadow-1">
                <div className="row align-items-center justify-content-between">
                    <div className="col-auto">
                        <div className="d-flex flex-wrap align-items-center gap-4">
                            <button onClick={toggleMenu} type="button" className="sidebar-mobile-toggle"
                                aria-label="Sidebar Mobile Toggler Button">
                                <iconify-icon icon="heroicons:bars-3-solid"
                                    className="icon"></iconify-icon>
                            </button>
                            <form className="navbar-search">
                                <input type="text" className="bg-transparent" name="search"
                                    placeholder="Search" />
                                <iconify-icon icon="ion:search-outline"
                                    className="icon"></iconify-icon>
                            </form>
                        </div>
                    </div>
                    <div className="col-auto">
                        <div className="d-flex flex-wrap align-items-center gap-3">

                            <div className="dropdown">
                                <button
                                    className="has-indicator w-40-px h-40-px bg-neutral-200 rounded-circle d-flex justify-content-center align-items-center position-relative"
                                    type="button" data-bs-toggle="dropdown"
                                    aria-label="Notification Button">
                                    <iconify-icon icon="iconoir:bell"
                                        className="text-primary-light text-xl"></iconify-icon>
                                    <span
                                        className="w-8-px h-8-px bg-danger-600 position-absolute end-0 top-0 rounded-circle mt-2 me-2"></span>
                                </button>
                                <div className="dropdown-menu to-top dropdown-menu-lg p-0">
                                    <div
                                        className="m-16 py-12 px-16 radius-8 bg-primary-50 mb-16 d-flex align-items-center justify-content-between gap-2">
                                        <div>
                                            <h6
                                                className="text-lg text-primary-light fw-semibold mb-0">Notifications</h6>
                                        </div>
                                        <span
                                            className="text-primary-600 fw-semibold text-lg w-40-px h-40-px rounded-circle bg-base d-flex justify-content-center align-items-center">05</span>
                                    </div>

                                    <div className="max-h-400-px overflow-y-auto scroll-sm pe-4">
                                        <a href="javascript:void(0)"
                                            className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between">
                                            <div
                                                className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                <span
                                                    className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                    <iconify-icon icon="bitcoin-icons:verify-outline"
                                                        className="icon text-xxl"></iconify-icon>
                                                </span>
                                                <div>
                                                    <h6
                                                        className="text-md fw-semibold mb-4">Congratulations</h6>
                                                    <p
                                                        className="mb-0 text-sm text-secondary-light text-w-200-px">Your
                                                        profile has been Verified. Your
                                                        profile has been Verified</p>
                                                </div>
                                            </div>
                                            <span
                                                className="text-sm text-secondary-light flex-shrink-0">23
                                                Mins ago</span>
                                        </a>

                                        <a href="javascript:void(0)"
                                            className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50">
                                            <div
                                                className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                <span
                                                    className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                    <img src="/storage/assets/images/notification/profile-1.png"
                                                        alt="Image" />
                                                </span>
                                                <div>
                                                    <h6 className="text-md fw-semibold mb-4">Ronald
                                                        Richards</h6>
                                                    <p
                                                        className="mb-0 text-sm text-secondary-light text-w-200-px">You
                                                        can stitch between artboards</p>
                                                </div>
                                            </div>
                                            <span
                                                className="text-sm text-secondary-light flex-shrink-0">23
                                                Mins ago</span>
                                        </a>

                                        <a href="javascript:void(0)"
                                            className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between">
                                            <div
                                                className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                <span
                                                    className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                    AM
                                                </span>
                                                <div>
                                                    <h6 className="text-md fw-semibold mb-4">Arlene
                                                        McCoy</h6>
                                                    <p
                                                        className="mb-0 text-sm text-secondary-light text-w-200-px">Invite
                                                        you to prototyping</p>
                                                </div>
                                            </div>
                                            <span
                                                className="text-sm text-secondary-light flex-shrink-0">23
                                                Mins ago</span>
                                        </a>

                                        <a href="javascript:void(0)"
                                            className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between bg-neutral-50">
                                            <div
                                                className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                <span
                                                    className="w-44-px h-44-px bg-success-subtle text-success-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                    <img src="/storage/assets/images/notification/profile-2.png"
                                                        alt="Image" />
                                                </span>
                                                <div>
                                                    <h6 className="text-md fw-semibold mb-4">Robiul
                                                        Hasan</h6>
                                                    <p
                                                        className="mb-0 text-sm text-secondary-light text-w-200-px">Invite
                                                        you to prototyping</p>
                                                </div>
                                            </div>
                                            <span
                                                className="text-sm text-secondary-light flex-shrink-0">23
                                                Mins ago</span>
                                        </a>

                                        <a href="javascript:void(0)"
                                            className="px-24 py-12 d-flex align-items-start gap-3 mb-2 justify-content-between">
                                            <div
                                                className="text-black hover-bg-transparent hover-text-primary d-flex align-items-center gap-3">
                                                <span
                                                    className="w-44-px h-44-px bg-info-subtle text-info-main rounded-circle d-flex justify-content-center align-items-center flex-shrink-0">
                                                    DR
                                                </span>
                                                <div>
                                                    <h6 className="text-md fw-semibold mb-4">Darlene
                                                        Robertson</h6>
                                                    <p
                                                        className="mb-0 text-sm text-secondary-light text-w-200-px">Invite
                                                        you to prototyping</p>
                                                </div>
                                            </div>
                                            <span
                                                className="text-sm text-secondary-light flex-shrink-0">23
                                                Mins ago</span>
                                        </a>
                                    </div>

                                    <div className="text-center py-12 px-16">
                                        <a href="javascript:void(0)"
                                            className="text-primary-600 fw-semibold text-md hover-underline">See
                                            All Notification</a>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
