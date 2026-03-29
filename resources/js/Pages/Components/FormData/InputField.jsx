

export default function InputField({ label, placeholder, setData, dataname }) {


    return (
        <>

            <div>
                <label className="text-sm fw-semibold text-dark mb-8" >
                    {label} <span className="text-danger-600"></span>
                </label>
                <input type="text" onChange={(e) => setData(dataname, e.target.value)} style={{ border: 'solid 2px #707070' }} className="form-control bg-white" placeholder={placeholder} />
            </div>


        </>
    )
}
