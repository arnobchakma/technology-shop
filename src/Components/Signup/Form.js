import React from 'react';

const Form = (props) => {
    const { handleCreateUser, handleChange, error, success, loading } = props;
    return (

        <form onSubmit={handleCreateUser}>
            <div className="form-group">
                <input type="text" placeholder='Name' className={error.name ? "form-control is-valid" : "form-control is-invalid"} name="name" onChange={handleChange} required />
            </div>
            <div className="form-group py-3">
                <input type="email" placeholder='Email' className={error.email ? "form-control is-valid" : "form-control is-invalid"} name="email" onChange={handleChange} required />
            </div>
            <div className="form-group">
                <input type="password" placeholder='Password' className={error.password ? "form-control is-valid" : "form-control is-invalid"} name="password" onChange={handleChange} required />
            </div>
            <div className="form-group pt-3">
                <input type="password" placeholder='Confirm Password' className={error.confirmPass ? "form-control is-valid" : "form-control is-invalid"} name="confirmPass" onChange={handleChange} required />
            </div>

            <div className="result">
                {
                    (success === true) ? <p className="alert alert-success text-center">Successfully Created ✔✔</p>
                        : <p className="alert-warning text-center">{success}</p>
                }
            </div>

            <div className="form-group">
                <button type="submit" className="btn btn-success submitBtn">
                    {
                        loading ? <div class="spinner-border" role="status"></div> : "Submit"
                    }
                </button>
            </div>

        </form>
    );
};

export default Form;