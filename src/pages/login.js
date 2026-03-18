import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Sending request...");
      const res = await API.post("/auth/login", { email, password });

      console.log("LOGIN RESPONSE:", res.data); // debugging

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);

        console.log("TOKEN SAVED:", localStorage.getItem("token"));

        navigate("/dashboard");
      } else {
        alert("Token not received from server");
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
alert(err.response?.data?.message || "Login failed");
    }
  };

 return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
    }}
  >
    <div
      style={{
        padding: "30px",
        borderRadius: "10px",
        width: "300px",
        textAlign: "center",
      }}
    >
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", padding: "8px" }}
        />

        <br /><br />

        <button
          type="submit"
          style={{
            width: "50%",
            padding: "10px",
            cursor: "pointer",
            backgroundColor:"dodgerblue"
          }}
        >
          Login
        </button>
      </form>
    </div>
  </div>
)};

export default Login;
