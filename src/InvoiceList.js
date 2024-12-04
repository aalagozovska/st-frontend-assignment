import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";

const InvoiceList = () =>{

    const [invData, invDataChange] = useState(null);
    const navigate = useNavigate();

    const LoadEdit = (id) => {
        navigate("/invoice/edit" + id);
    }

    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:8000/invoice/" + id, {
                method: "DELETE"
            }).then((res) => {
                alert('Removed successfully.')
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }

    useEffect(() => {
        fetch("http://localhost:8000/invoice").then((res) => {
            return res.json();
        }).then((resp) => {
            invDataChange(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    return(
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Invoice Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="invoice/create" className="btn btn-success">Add New</Link>
                    </div>
                    <table className="table table-order">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>Number</td>
                                <td>Client</td>
                                <td>Amount</td>
                                <td>Due Date</td>
                            </tr>
                        </thead>
                        <tbody>

                            {invData &&
                                invData.map(item => (
                                    <tr key={item.id}>
                                        <td>{item.id}</td>
                                        <td>{item.client}</td>
                                        <td>{item.totalAmount}</td>
                                        <td>{item.dueDate}</td>
                                        <td><a onClick={() => LoadEdit(item.id)} className="btn btn-success">Edit</a>
                                            <a onClick={() => Removefunction(item.id)} className="btn btn-danger">Remove</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    )
}

export default InvoiceList;