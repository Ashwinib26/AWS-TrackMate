import { useState } from "react";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";

export default function App() {
  const [user, setUser] = useState(null);

  return (
    <>
      {user ? (
        <Dashboard user={user} />
      ) : (
        <Login onLogin={(email) => setUser(email)} />
      )}
    </>
  );
}
