import React from 'react';
import { Link } from 'react-router-dom';

const Form = (props) => {
    const {
        user,
        handleChange,
        handleSubmit,
        result,
        loading
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="text" placeholder='Email' className={user.email ? "form-control is-valid" : "form-control is-invalid"} onChange={handleChange} name="email" required />
            </div>
            <div className="form-group pt-3">
                <input type="password" placeholder='Password' className={user.password ? "form-control is-valid" : "form-control is-invalid"} onChange={handleChange} name="password" required />
            </div>
            <div className="from-group">
                <div className="login-tools">
                    <div>
                        <input type="checkbox" /> Remember Me
                    </div>
                    <div>
                        <Link to="#">Forgot Password?</Link>
                    </div>
                </div>
            </div>
            <div className="result">
                {
                    result.isLoggedIn ? <p className="alert alert-success text-center">{result.message}</p>
                        : <p className="alert-warning text-center">{result.message}</p>
                }
            </div>
            <div className="form-group">

                <button type="submit" className="btn btn-primary" >
                    {
                        loading ? <div className="spinner-border" role="status"></div> : "Submit"
                    }
                </button>
            </div>
        </form>
    );
};

export default Form;