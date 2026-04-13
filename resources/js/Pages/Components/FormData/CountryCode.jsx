

export default function CountryCode({ label, placeholder, values, selectMode, setData, dataname }) {


    return (
        <>

            <div>
                <label className="text-sm fw-semibold text-primary-light mb-8">
                    {label}
                </label>
                <select className="col-sm-1 form-select bg-white" onChange={selectMode ? selectMode : (e) => setData(dataname, e.target.value)} style={{ border: 'solid 2px #707070' }} >
                    <option value="">{placeholder}</option>

                    {values && values.map((item, index) => {
                        return (
                            <option key={item.phonecode} value={item.phonecode}>{"+" + item.phonecode}  {"(" + item.name + ")"} </option>
                        )
                    })}

                </select>
            </div>

        </>

    )
}
