import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { Circles } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { authContext } from "../../context/AuthContext";

function Login() {
  let { setToken } = useContext(authContext);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [messageError, setMessageError] = useState("");

  // ----------------------->handelLogin
  async function handelLogin(values) {
    setisLoading(true);
    const { data } = await axios
      .post(
        `https://note-sigma-black.vercel.app/api/v1/users/signIn
      `,
        values
      )
      .catch((err) => {
        setisLoading(false);

        setMessageError(err.response.data.msg);
      });
    if (data.msg === "done") {
      setMessageError("");
      setisLoading(false);
      setToken(`3b8ny__${data.token}`);
      localStorage.setItem("token", `3b8ny__${data.token}`);
      navigate("/");
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "Password must start with uppercase ..."
      ),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handelLogin,
  });
  return (
    <>
      <div className="container pt-5 mt-5">
        <div className="row  gx-0">
          <div className="col-md-6">
            <img
              src={require("../../Images/note-taking.png")}
              alt=""
              className="w-100 h-100"
            />
          </div>
          <div className="col-md-6  p-5 bg-white text-center ">
            <div className="text-center">
              <h2 className="text-center fw-bold text-main mb-3 ">
                Log in to Notes
              </h2>
            </div>
            {messageError ? (
              <div className="alert alert-danger">{messageError}</div>
            ) : null}
            <form onSubmit={formik.handleSubmit}>
              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.email}
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onBlur={formik.handleBlur}
              />
              {formik.errors.email && formik.touched.email ? (
                <p className="text-danger">{formik.errors.email}</p>
              ) : null}

              <input
                className="form-control mb-2"
                onChange={formik.handleChange}
                value={formik.values.password}
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onBlur={formik.handleBlur}
              />
              {formik.errors.password && formik.touched.password ? (
                <p className="text-danger">{formik.errors.password}</p>
              ) : null}
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn bg-main text-white   w-100  "
              >
                {!isLoading ? (
                  " Login "
                ) : (
                  <i className="fa-solid fa-spinner fa-spin"></i>
                )}
              </button>

              <hr />
              <div className="text-main text-center font-sm">
                Not a member yet?
                <Link
                  className="nav-link py-1 px-2 text-blue d-inline"
                  to="/register"
                >
                  Create Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
