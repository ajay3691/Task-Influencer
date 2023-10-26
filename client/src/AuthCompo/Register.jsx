import axios from 'axios';
import React, { useState } from 'react';

const Register = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const [error, setError] = useState(""); // State for error message
    const changeHandler = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitHandler = (event) => {
        event.preventDefault();
        console.log(data);

        // Client-side validation
        if (data.password !== data.confirmpassword) {
            setError("Passwords do not match");
            return;
        }

        // Clear any previous errors
        setError(null);

        // Send POST request to the server
        axios.post("http://localhost:5000/user/register", data)
            .then((resp) => {
                alert("User registered successfully");
                // setSuccessMessage("User registered successfully");
            })
            .catch((error) => {
                console.error(error);
                // Handle registration error here and set an error message if needed
                setError("Registration failed. Please try again.");
            });

        /* 
            if (data.email == data.email) {
                setError("mail aledy exited");
                return;
            }
         */
    };

    return (
        <div>
            <center>
                <div className="container">
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-5">
                            <form /* onSubmit={submitHandler} */>
                                <h3>Register Page</h3>
                                <div className="form-group">
                                    <input type="text" name="email" placeholder="Email" onChange={changeHandler} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="password" placeholder="Password" onChange={changeHandler} className='form-control' />
                                </div>
                                <div className="form-group">
                                    <input type="text" name="confirmpassword" placeholder="Confirm password" onChange={changeHandler} className='form-control' />
                                </div>
                                {error && <p className="text-danger">{error}</p>} {/* Display error message if there is one */}
                                <button className='btn btn-success' onClick={submitHandler}>Register</button>
                                {/* <div className="form-group">
                                    <input type="submit" className='btn btn-success' value="Register" />
                                </div> */}
                            </form>
                        </div>
                    </div>
                </div>
            </center>
        </div>
    );
};

export default Register;
