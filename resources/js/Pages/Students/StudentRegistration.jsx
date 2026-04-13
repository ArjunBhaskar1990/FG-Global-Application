


import InputField from "../Components/FormData/inputField";
import EmailField from "../Components/FormData/EmailField";
import SelectInput from "../Components/FormData/SelectInput";
import CountryCode from "../Components/FormData/countryCode";
import DatePlugin from "../Components/FormData/DatePlugin";
import { useForm } from "@inertiajs/react";
import Modal from 'react-bootstrap4-modal';
import { useEffect, useState } from "react";

export default function StudentRegistration({ countries }) {


    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const [regnNumber, setRegnNumber] = useState('');




    const selectMode = (e) => {
        setData('package', e.target.value);

        if (e.target.value === "School") {

            setData('competitive_mode', null);
            setData('duration', null);
            setData('tuition_mode', null);
        }
        if (e.target.value === "Competitive Exam") {

            setData('competitive_mode', null);
            setData('duration', null);
            setData('tuition_mode', null);
        }
        if (e.target.value === "Tuition") {

            setData('competitive_mode', null);
            setData('duration', null);
        }
    }
    const selectTMode = (e) => {
        setData('tuition_mode', e.target.value);
    }
    const selectCMode = (e) => {
        setData('competitive_mode', e.target.value);
    }
    const selectDuration = (e) => {
        setData('duration', e.target.value);
    }


    const { data, setData, post, reset, rocessing, errors } = useForm({

        first_name: '',
        last_name: '',
        address: '',
        city: '',
        state: '',
        country_code_student: '',
        country_code_autocalls: '',
        contact_no: '',
        email: '',
        dob: '',
        age: '',
        gender: '',
        adhaar: '',
        emirates_id: '',
        passport: '',

        // Mode of Education

        package: '',
        tuition_mode: '',
        competitive_mode: '',
        duration: '',
        previous_school: '',
        automated_calls: '',
        automated_email: '',

        // Mother Details

        mother_name: '',
        mother_address: '',
        mother_contact: '',
        country_code_motherpersonal: '',
        mother_employment: '',
        mother_phone: '',
        country_code_motherwork: '',
        mother_email: '',
        mother_qualification: '',

        // Father Details

        father_name: '',
        father_address: '',
        father_contact: '',
        country_code_fatherpersonal: '',
        father_employment: '',
        father_phone: '',
        country_code_fatherwork: '',
        father_email: '',
        father_qualification: '',

    })


    const completeRegistration = () => {

        post(route('add-new-registration'), {

            preserveScroll: true,
            preserveState: true,
            preserveUrl: true,
            onSuccess: (page) => {
                setVisible(true);

                setRegnNumber(page.props.flash.regnid);
                setMessage(page.props.flash.message);
                const form = document.getElementById('student-form');
                form.reset();
            }
        })

    }

    const closeDialog = () => {
        setVisible(false);

    }




    return (

        <>
            <Modal visible={visible} fade={true} className="modal-lg">

                {/* <div className="modal-header">
                        <h6 className="modal-title text-success text-lg">Success</h6>
                    </div> */}
                <div className="modal-body">

                    <i className="fa-solid fa-check "></i> &nbsp; &nbsp; <span className="text-xxl">SUBMITTED !! </span>

                    <div className="m-3">
                        Your application No. <span className="text-danger">{regnNumber}</span> has been successfully received and accepted.
                        It is currently under review by our team.
                        You will be notified once the approval process is completed.
                    </div>

                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={closeDialog}>
                        Close
                    </button>

                </div>


            </Modal>

            <div className="body-overlay"></div>
            <div className="theme-customization-sidebar w-100 bg-base h-100vh overflow-y-auto position-fixed end-0 top-0">

            </div>

            <div className="overlay bg-black bg-opacity-50 w-100 h-100 position-fixed z-9 visibility-hidden opacity-0 duration-300">
            </div>

            <div className="d-lg-flex bg-white mb-5" style={{ backgroundImage: 'url("/storage/fgglobal/bg_image.jpg")' }}>


                <form id="student-form" className="d-sm-flex col-sm-12">

                    <div className="lg-w-50 px-24 d-flex justify-content-center ">
                        <div className="max-w-540-px mx-auto w-100">

                            <div>

                                <img src="storage/fgglobal/fg_final.png" alt="FG Global School" className="w-50" />

                            </div>


                            <div className="mt-4 mb-32">
                                <h1 className="h6 fw-bold text-primary-light">Start Your Learning Journey</h1>
                                <p className="text-sm text-secondary-light">
                                    Build Your Future — Register Now
                                </p>
                            </div>




                            <div className="d-flex flex-column" style={{ gap: '10px' }}>

                                <div className="d-flex">
                                    <div>
                                        {errors.first_name && <span className="fw-bold  text-danger" style={{ fontSize: '8px' }}>{errors.first_name}</span>}
                                        <InputField label="Full Name" setData={setData} dataname="first_name" placeholder="Enter First Name" />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>
                                        {errors.last_name && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.last_name}</span>}
                                        <InputField label="Last Name" setData={setData} dataname="last_name" placeholder="Enter Last Name" />
                                    </div>


                                </div>
                                <div>
                                    {errors.address && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.address}</span>}
                                    <InputField label="Current Address" setData={setData} dataname="address" placeholder="Enter your current address" />
                                </div>


                                <div className="d-flex">
                                    <div>
                                        {errors.city && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.city}</span>}
                                        <InputField label="City" setData={setData} dataname="city" placeholder="Enter your city name" />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>
                                        {errors.state && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.state}</span>}
                                        <InputField label="State" setData={setData} dataname="state" placeholder="Enter your state name" />
                                    </div>

                                </div>

                                <div className="d-flex">
                                    <div>
                                        {errors.country_code_student && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_student}</span>}
                                        <CountryCode setData={setData} selectMode="" dataname="country_code_student" label="Country Code" placeholder="Country Code" values={countries} />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>

                                        <InputField label="Contact No." setData={setData} dataname="contact_no" placeholder="Enter your contact number" />
                                    </div>

                                </div>
                                {errors.email && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.email}</span>}
                                <EmailField label="Email" setData={setData} dataname="email" placeholder="Enter Email " />

                                <div className="d-flex">

                                    <div>
                                        {errors.dob && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.dob}</span>}
                                        <DatePlugin label="DOB" setData={setData} dataname="dob" />
                                    </div>
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <div>
                                        {errors.age && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.age}</span>}
                                        <InputField label="Age" setData={setData} dataname="age" placeholder="Enter your Age " />
                                    </div>

                                </div>
                                <div className="d-flex">

                                    <div>
                                        {errors.adhaar && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.adhaar}</span>}
                                        <InputField setData={setData} dataname="adhaar" label="Aadhaar Number" placeholder="Enter your Aadhaar ID " />
                                    </div>
                                    &nbsp;&nbsp;
                                    <div>
                                        {errors.emirates_id && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.emirates_id}</span>}
                                        <InputField setData={setData} dataname="emirates_id" label="Emirates ID" placeholder="Enter your Emirates ID " />
                                    </div>
                                </div>

                                <div>
                                    {errors.passport && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.passport}</span>}
                                    <InputField setData={setData} dataname="passport" label="Passport" placeholder="Enter your Passport" />
                                </div>


                            </div>
                            <div className="col-sm-4">
                                {errors.gender && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.gender}</span>}
                                <SelectInput setData={setData} selectMode="" dataname="gender" label="Select Gender" placeholder="Gender" values={['Male', 'Female']} />
                            </div>

                            <div className="mt-5">
                                <p className="text-lg text-white fw-bold bg-secondary p-2" style={{ borderRadius: '10px' }}>
                                    &nbsp; ACADEMIC INFORMATION
                                </p>
                                <p>Mode of Education</p>
                                <div className="d-flex" style={{ gap: '10px' }}>


                                    <div>
                                        {errors.package && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.package}</span>}
                                        <SelectInput label="Select Package" setData="" selectMode={selectMode} placeholder="Select Package" values={['School', 'Tuition', 'Competitive Exam']} />
                                    </div>


                                    <div>
                                        {data.package === "Tuition" &&
                                            errors.tuition_mode && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.tuition_mode}</span>
                                        }
                                        {data.package === "Tuition" &&
                                            <SelectInput label="Tuition Mode" setData="" selectMode={selectTMode} placeholder="Tuition Mode" values={['All Subjects', 'Semester-wise Tuition', 'Chapter Wise', 'Unit Wise', 'Revised Questions']} />
                                        }
                                    </div>

                                    {data.package === "Competitive Exam" &&
                                        <SelectInput label="Competitive Mode" setData="" selectMode={selectCMode} placeholder="Competitive Mode" values={['All India Medical Entrance', 'Engineering Entrance', 'IIT', 'Civil Service', 'LLB', 'CAT', 'MAT']} />
                                    }
                                    {data.package === "Competitive Exam" &&
                                        <SelectInput setData="" selectMode={selectDuration} label="Duration" placeholder="Duration"
                                            values={
                                                (
                                                    ["All India Medical Entrance", "Engineering Entrance", "IIT"].includes(data.competitive_mode) ||
                                                    [""].includes(data.competitive_mode)
                                                )
                                                    ? ["1 Month", "3 Months", "1 Year", "2 Years"]
                                                    : ["1 Month", "3 Months", "1 Year"]
                                            }


                                        />
                                    }

                                </div> <br />
                                <InputField setData={setData} dataname="previous_school" label="Previous School (Optional)" placeholder="Enter your previous school" />
                                <br />
                                {errors.country_code_autocalls && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_autocalls}</span>}
                                <div className="d-flex">

                                    <CountryCode setData={setData} selectMode="" dataname="country_code_autocalls" label="Country Code" placeholder="Country Code" values={countries} />
                                    &nbsp;
                                    {errors.automated_calls && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.automated_calls}</span>}
                                    <InputField setData={setData} dataname="automated_calls" label="Automated Calls" placeholder="Enter Phone Number.." />
                                </div>
                                <br />

                                <div>
                                    {errors.automated_email && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.automated_email}</span>}
                                    <InputField setData={setData} dataname="automated_email" label="Best Email for Automated Email" placeholder="Enter Email.." />
                                </div>


                            </div>

                        </div>
                    </div>
                    <div className="lg-w-50 px-24 py-40 d-flex justify-content-center align-items-center" >
                        <div className="max-w-540-px mx-auto w-100">


                            <p className="text-lg text-white fw-bold bg-secondary p-2" style={{ borderRadius: '10px' }}>
                                &nbsp; DETAILS ABOUT YOUR MOTHER
                            </p>
                            <div className="d-flex flex-column" style={{ gap: '10px' }}>

                                <div className="d-flex">

                                    <div>
                                        {errors.mother_name && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.mother_name}</span>}
                                        <InputField label="Mother / Guardian Name" setData={setData} dataname="mother_name" placeholder="Enter Name.." />
                                    </div>

                                </div>

                                <div>

                                    {errors.mother_address && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.mother_address}</span>}
                                    <InputField label="Address" setData={setData} dataname="mother_address" placeholder="Address.." />
                                </div>


                                <div className="d-flex justify-content-between">

                                    <div>
                                        {errors.country_code_motherpersonal && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_motherpersonal}</span>}
                                        <CountryCode setData={setData} selectMode="" dataname="country_code_motherpersonal" label="Country Code" placeholder="Country Code" values={countries} />
                                    </div>

                                    <div>
                                        {errors.mother_contact && <span className="fw-bold  text-danger" style={{ fontSize: '8px' }}>{errors.mother_contact}</span>}
                                        <InputField label="Contact Number" setData={setData} dataname="mother_contact" placeholder="Contact Number.." />
                                    </div>

                                </div>
                                <div>
                                    {errors.mother_employment && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.mother_employment}</span>}
                                    <InputField label="Place of Employment" setData={setData} dataname="mother_employment" placeholder="Employment Details.." />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {errors.country_code_motherwork && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_motherwork}</span>}
                                        <CountryCode setData={setData} selectMode="" dataname="country_code_motherwork" label="Country Code" placeholder="Country Code" values={countries} />

                                    </div>
                                    <div>
                                        {errors.mother_phone && <span className="fw-bold  text-danger" style={{ fontSize: '8px' }}>{errors.mother_phone}</span>}
                                        <InputField label="Work Phone Number" setData={setData} dataname="mother_phone" placeholder="Work Phone Number.." />
                                    </div>

                                </div>

                                <div>
                                    {errors.mother_qualification && <span className="fw-bold  text-danger" style={{ fontSize: '8px' }}>{errors.mother_qualification}</span>}
                                    <InputField label="Qualification" setData={setData} dataname="mother_qualification" placeholder="Mother's Qualification.." />
                                </div>
                                <div>
                                    {errors.mother_email && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.mother_email}</span>}
                                    <EmailField label="Email" setData={setData} dataname="mother_email" placeholder="Mother's Email " />
                                </div>

                            </div>

                            <div style={{ marginTop: '40px' }}>

                            </div>
                            <p className="text-lg text-white fw-bold bg-secondary p-2" style={{ borderRadius: '10px' }}>
                                &nbsp;  DETAILS ABOUT YOUR FATHER
                            </p>
                            <div action="#" className="d-flex flex-column " style={{ gap: '10px' }}>

                                <div className="d-flex">

                                    <div>
                                        {errors.father_name && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_name}</span>}
                                        <InputField label="Father / Guardian Name" setData={setData} dataname="father_name" placeholder="Enter Name.." />
                                    </div>
                                </div>

                                <div>
                                    {errors.father_address && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_address}</span>}
                                    <InputField label="Address" setData={setData} dataname="father_address" placeholder="Address.." />
                                </div>


                                <div className="d-flex justify-content-between">
                                    <div>
                                        {errors.country_code_fatherpersonal && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_fatherpersonal}</span>}
                                        <CountryCode setData={setData} selectMode="" dataname="country_code_fatherpersonal" label="Country Code" placeholder="Country Code" values={countries} />
                                    </div>
                                    <div>
                                        {errors.father_contact && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_contact}</span>}
                                        <InputField label="Contact Number" setData={setData} dataname="father_contact" placeholder="Contact Number.." />
                                    </div>


                                </div>
                                <div>
                                    {errors.father_employment && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_employment}</span>}
                                    <InputField label="Place of Employment" setData={setData} dataname="father_employment" placeholder="Employment Details.." />
                                </div>

                                <div className="d-flex justify-content-between">

                                    <div>
                                        {errors.country_code_fatherwork && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.country_code_fatherwork}</span>}
                                        <CountryCode setData={setData} selectMode="" dataname="country_code_fatherwork" label="Country Code" placeholder="Country Code" values={countries} />
                                    </div>
                                    <div>
                                        {errors.father_phone && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_phone}</span>}
                                        <InputField label="Work Phone Number" setData={setData} dataname="father_phone" placeholder="Work Phone Number.." />
                                    </div>

                                </div>

                                <div>
                                    {errors.father_qualification && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_qualification}</span>}
                                    <InputField label="Qualification" setData={setData} dataname="father_qualification" placeholder="Father's Qualification.." />
                                </div>


                                <div>

                                    {errors.father_email && <span className="fw-bold text-danger" style={{ fontSize: '8px' }}>{errors.father_email}</span>}
                                    <EmailField label="Email" setData={setData} dataname="father_email" placeholder="Father's Email " />
                                </div>
                                <button type="button" onClick={completeRegistration} className="btn btn-primary-600 w-100 mt-5 py-16 radius-8 text-sm fw-semibold">
                                    Complete Registration
                                </button>

                            </div>



                        </div>
                    </div>
                </form>


            </div>
        </>

    )
}
