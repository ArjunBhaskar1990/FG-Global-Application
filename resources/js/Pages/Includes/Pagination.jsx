
import { Link } from "@inertiajs/react"
import { useState, useEffect } from "react";


export default function Pagination({ pagination, searchconsingee, jobmode, selecteduserFilter, selectedConsignee, selectedInvoice }) {

    const [showLoader, SetShowLoader] = useState(false)

    useEffect(() => {
        const body = document.querySelector('body');
        body.classList.remove("bodyOpacity")
        if (showLoader === true) {

            body.classList.add("bodyOpacity")
        }
    }, [showLoader]);

    const params = new URLSearchParams(window.location.search);
    jobmode && params.append('job', jobmode);
    selecteduserFilter && params.append('userFilter', selecteduserFilter);
    searchconsingee && params.append('searchconsingee', searchconsingee);
    selectedConsignee && params.append('consignee', selectedConsignee);
    selectedInvoice && params.append('invoice', selectedInvoice);
    params.delete('page');


    return (
        <>
            {showLoader &&
                <span className="loader"></span>
            }


            <div className="pagination p1">
                <ul>
                    {pagination && pagination.map((item, index) =>
                        <Link key={index} style={{ marginRight: '4px' }} className={`page-link ${item.active ? 'is-active' : ''}`} href={item.url != null && item.url + "&" + params} ><li onClick={() => SetShowLoader(true)}>{item.label.replace("&laquo;", "<<").replace("&raquo;", ">>").replace("Previous", "").replace("Next", "")}</li></Link>
                    )}
                </ul>
            </div>
        </>
    )
}
