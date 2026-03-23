import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Logo from "../components/Logo.jsx";
import Footer from "../components/Footer.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/flights", label: "Flights" },
  { to: "/hotels", label: "Hotels" },
  { to: "/tours", label: "Tours" },
  { to: "/about", label: "About" },
  { to: "/help", label: "Help" }
];

export default function MainLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Logo />
          <nav className="top-nav header-pill">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className="nav-link nav-pill-link">
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="header-actions">
            {user ? (
              <>
                <NavLink to="/dashboard" className="button ghost">
                  Dashboard
                </NavLink>
                {user.role === "admin" && (
                  <NavLink to="/admin" className="button ghost">
                    Admin
                  </NavLink>
                )}
                {["agent", "admin"].includes(user.role) && (
                  <NavLink to="/agent" className="button ghost">
                    Agent
                  </NavLink>
                )}
                <button type="button" className="button secondary" onClick={logout}>
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/auth" className="button secondary">
                Sign In
              </NavLink>
            )}
          </div>
        </div>
      </header>
      <main className="site-main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
