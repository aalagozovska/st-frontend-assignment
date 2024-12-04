import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";

const InvoiceEdit = () => {

    const [number, numberChange] = useState("");
    const [client, clientChange] = useState("");
    const [totalAmount, totalAmountChange] = useState("");
    const [dueDate, dueDateChange] = useState("");
    const [validation, valChange] = useState(false);
    const navigate = useNavigate();

    const { invoiceid } = useParams();

    const handleSubmit = (event) =>{
        event.preventDefault();
        const invData={number, client, totalAmount, dueDate};

        fetch("http://localhost:8000/invoice/" + invoiceid,{
            method:"PUT",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(invData)
          }).then((res)=>{
            alert('Saved successfully.')
            navigate('/');
          }).catch((err)=>{
            console.log(err.message)
          })
    }

    useEffect(() => {
        fetch("http://localhost:8000/invoice/" + invoiceid).then((res) => {
            return res.json();
        }).then((resp) => {
            numberChange(resp.number);
            clientChange(resp.client);
            totalAmountChange(resp.totalAmount);
            dueDateChange(resp.dueDate);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);
    

    return(
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handleSubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Invoice Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Invoice Number</label>
                                        <input value={number} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Client</label>
                                        <input required value={client} onMouseDown={e=>valChange(true)} onChange={e=>clientChange(e.target.value)} className="form-control"></input>
                                    {client.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Total Amount</label>
                                        <input value={totalAmount} onChange={e=>totalAmountChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Due Date</label>
                                        <input value={dueDate} onChange={e=>dueDateChange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                       <button className="btn btn-success" type="submit">Update</button>
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
export default InvoiceEdit;