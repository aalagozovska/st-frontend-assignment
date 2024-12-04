import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const InvoiceCreate = () => {

    const [number, numberChange] = useState("");
    const [client, clientChange] = useState("");
    const [totalAmount, totalAmountChange] = useState("");
    const [dueDate, dueDateChange] = useState("");
    const [validation, valChange] = useState(true);
    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        const invData = { number, client, totalAmount, dueDate };

        fetch("http://localhost:8000/invoice/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(invData)
        }).then((res) => {
            alert('Saved successfully.')
            navigate('/');
        }).catch((err) => {
            console.log(err.message)
        })
    }

    return (
        <div>
            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="card" style={{ "textAlign": "left" }}>
                            <div className="card-title">
                                <h2>Invoice Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Number</label>
                                            <input value={number} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Client</label>
                                            <input required value={client} onMouseDown={e => valChange(true)} onChange={e => clientChange(e.target.value)} className="form-control"></input>
                                            {client.length == 0 && validation && <span className="text-danger"></span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Total Amount</label>
                                            <input value={totalAmount} onChange={e => totalAmountChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Due Date</label>
                                            <input value={dueDate} onChange={e => dueDateChange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <button className="btn btn-success" type="submit">Save</button>
                                            <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    )
}
export default InvoiceCreate;