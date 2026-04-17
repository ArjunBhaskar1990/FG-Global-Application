

export default function InputField({ label, placeholder, setData, dataname }) {


    return (
        <>

            <div>
                <label className="text-sm fw-semibold text-dark mb-8" >
                    {label} <span className="text-danger-600"></span>
                </label>
                <input
                    type="text"
                    style={{ textTransform: 'uppercase', border: 'solid 2px #707070' }}
                    onChange={(e) => setData(dataname, e.target.value)} className="form-control bg-white" placeholder={placeholder} />
            </div>


        </>
    )
}
