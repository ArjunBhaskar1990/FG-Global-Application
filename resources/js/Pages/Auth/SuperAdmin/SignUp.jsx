


export default function SignUp() {


    return (

        <>
            <div className="container py-5">
                {/* Header */}
                <div className="text-center mb-4">
                    <h3 className="fw-bold">Sign Up To Financial</h3>
                    <p className="text-muted">
                        Fill all form field to go next step
                    </p>
                </div>

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

                {/* Form Card */}
                <div className="card shadow-sm">
                    <div className="card-body">
                        <h5 className="mb-4">Personal Information:</h5>

                        <form>
                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control border-0 border-bottom rounded-0"
                                        placeholder="First Name"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control border-0 border-bottom rounded-0"
                                        placeholder="Last Name"
                                    />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control border-0 border-bottom rounded-0"
                                        placeholder="Address Location"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        className="form-control border-0 border-bottom rounded-0"
                                        placeholder="Zip Code"
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="form-control border-0 border-bottom rounded-0"
                                    placeholder="Phone Number"
                                />
                            </div>

                            <div className="text-end">
                                <button className="btn btn-danger px-4">
                                    Next Step
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
