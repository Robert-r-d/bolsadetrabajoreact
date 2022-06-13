import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:3001/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);
      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.login_form_container}>
        <div className={styles.left}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <img src="data:image/png;base64,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" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sing In
            </button>
          </form>
        </div>
        <div className={styles.right}>
          <h1>Registrate Aqui</h1>
          <Link to="/signup">
            <button type="button" className={styles.white_btn}>
              Sing Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
