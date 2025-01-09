import { useNavigate } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useState } from "react";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();

  function onSubmit(e, uniqueEmail, pass) {
    e.preventDefault();

    if (uniqueEmail == email && pass == password) {
      navigate("/app");
    }
  }

  return (
    <main className={styles.login}>
      <PageNav />

      <form
        className={styles.form}
        onSubmit={(e) => onSubmit(e, email, password)}
      >
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <button className={styles.ctaLink}>Login</button>
        </div>
      </form>
    </main>
  );
}
