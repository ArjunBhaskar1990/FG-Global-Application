
export default function DatePlugin({ label, setData, dataname }) {

    return (
        <>

            <div className="">
                <label for="dateOfBirth"
                    className="text-sm fw-semibold text-primary-light d-inline-block mb-8"> {label}
                    <span className="text-danger-600">*</span> </label>
                <input type="date" onChange={(e) => setData(dataname, e.target.value)} className="form-control" style={{ border: 'solid 2px #707070' }} id="dateOfBirth" />
            </div>

        </>

    )


}
