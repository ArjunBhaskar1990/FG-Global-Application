
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function Login() {

    const [loader, setLoader] = useState(false);


    const { data, setData, post, errors, processing } = useForm({

        email: '',
        password: '',

    });




    const loginUser = (e) => {
        setLoader(true);
        e.preventDefault();

        post(route('login.store'), {

            preserveScroll: true,
            preserveState: true,

            onFinish: () => {

                setLoader(false);

            },
            onSuccess: () => {
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

            <div className="body-overlay"></div>
            {loader &&
                <span className="loader"></span>
            }

            <div className="d-lg-flex" id="body" style={{ backgroundColor: 'aliceblue' }}>
                <div className="w-50 d-lg-flex d-none overflow-hidden">
                    <img src="/storage/assets/images/thumbs/login-img.png" alt="Login Image" className="w-100 h-100 object-fit-cover" />
                </div>

                <div className="lg-w-50 px-24 py-32 justify-content-center align-items-center">
                    <div className="max-w-540-px mx-auto">
                        <Link href={route('login')} className="text-center">

                            <img className="w-50" src="/storage/fgglobal/fg_final.png" alt="FG Global" />
                        </Link>
                        <div className="mt-32 mb-32">
                            <h1 className="h6 fw-bold text-primary-light mb-8">
                                Welcome...
                            </h1>

                            <p className="text-sm text-secondary-light mb-0">
                                Log in to your account to continue
                            </p>
                        </div>
                        <form className="d-flex flex-column gap-32 submit-form">
                            <div className="d-flex flex-column gap-16">
                                <div>
                                    <label htmlFor="email" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                                        Email Address
                                        <span className="text-danger-600">*</span>
                                    </label> <br />
                                    {errors.email && <span className="text-xs text-danger">{errors.email}</span>}
                                    <input onChange={(e) => setData('email', e.target.value)} type="email" id="email" className="email-field form-control" placeholder="Enter your email" />
                                </div>

                                <div>
                                    <label htmlFor="password" className="text-sm fw-semibold text-primary-light d-inline-block mb-8">
                                        Password
                                        <span className="text-danger-600">*</span>
                                    </label> <br />
                                    {errors.password && <span className="text-xs text-danger">{errors.password}</span>}
                                    <div className="position-relative">
                                        <input onChange={(e) => setData('password', e.target.value)} type="password" id="password" className="password-field form-control" placeholder="Enter your password"
                                        />
                                        <button type="button"
                                            className="toggle-password btn p-0 border-0 bg-transparent position-absolute end-0 top-50 translate-middle-y me-16 text-secondary-light cursor-pointer ri-eye-line"
                                            data-toggle="#password" aria-label="Toggle password visibility">
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button onClick={loginUser} type="button" className="loginBtn btn btn-primary-600 text-sm btn-sm px-12 py-16 w-100 radius-8"> Log In
                                </button>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
