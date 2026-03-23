import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function AuthPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "user",
    companyName: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      if (mode === "login") {
        await login({ email: form.email, password: form.password });
      } else {
        await register(form);
      }
      navigate(location.state?.from || "/dashboard");
    } catch (submitError) {
      setError(submitError.message);
    }
  };

  return (
    <div className="page-shell auth-shell">
      <form className="glass-card auth-card" onSubmit={handleSubmit}>
        <span className="eyebrow">{mode === "login" ? "Welcome back" : "Create account"}</span>
        <h1>{mode === "login" ? "Sign in to continue booking." : "Start selling or planning journeys."}</h1>
        {mode === "register" && (
          <>
            <label className="input-group">
              <span>Name</span>
              <input name="name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
            </label>
            <label className="input-group">
              <span>Phone</span>
              <input name="phone" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} />
            </label>
            <label className="input-group">
              <span>Role</span>
              <select name="role" value={form.role} onChange={(event) => setForm({ ...form, role: event.target.value })}>
                <option value="user">Traveler</option>
                <option value="agent">Travel Agent</option>
              </select>
            </label>
            {form.role === "agent" && (
              <label className="input-group">
                <span>Agency name</span>
                <input
                  name="companyName"
                  value={form.companyName}
                  onChange={(event) => setForm({ ...form, companyName: event.target.value })}
                />
              </label>
            )}
          </>
        )}
        <label className="input-group">
          <span>Email</span>
          <input name="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} />
        </label>
        <label className="input-group">
          <span>Password</span>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={(event) => setForm({ ...form, password: event.target.value })}
          />
        </label>
        {error && <p className="error-text">{error}</p>}
        <button type="submit" className="button primary">
          {mode === "login" ? "Sign In" : "Register"}
        </button>
        <button type="button" className="button ghost" onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Need an account?" : "Already registered?"}
        </button>
      </form>
    </div>
  );
}
