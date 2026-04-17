

export default function NumberField({ label, placeholder,  inputAmount, functionname }) {

    return (
        <>

            <div>
                <label className="text-sm fw-semibold text-dark mb-8" >
                    {label} <span className="text-danger-600"></span>
                </label>
                <input type="text" onChange={functionname} value={inputAmount}  style={{ border: 'solid 2px #707070' }} className="form-control bg-white" placeholder={placeholder} />
            </div>


        </>
    )
}
