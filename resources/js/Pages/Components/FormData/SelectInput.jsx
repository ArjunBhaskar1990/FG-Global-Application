

export default function SelectInput({ label, placeholder, values, selectMode, setData, dataname }) {

    return (
        <>

            <div>
                <label className="text-sm fw-semibold text-primary-light mb-8">
                    {label}
                </label>
                <select onChange={selectMode ? selectMode : (e) => setData(dataname, e.target.value)} className="form-select bg-white" style={{ border: 'solid 2px #707070' }} >
                    <option value="">{placeholder}</option>

                    {values && values.map((item, index) => {
                        return (
                            <option key={index}>{item} </option>
                        )
                    })}

                </select>
            </div>

        </>

    )
}
