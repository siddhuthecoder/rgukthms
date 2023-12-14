import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [doctorId, setDoctorId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      
      navigate("/home");
    }
  }, [isLoggedIn]); // Adding isLoggedIn as a dependency
  

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!doctorId || !password) {
      setError("Both Doctor ID and Password are required");
      return;
    }

    const data = {
      doctorId,
      password,
    };

    try {
      const savedUserResponse = await fetch("http://localhost:3002/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (savedUserResponse.ok) {
        const res = await savedUserResponse.json();
        console.log(res);
        localStorage.setItem('doctorId', doctorId);
    
        if (res) {
          setLoggedIn(true);
        } else {
          setError("Invalid Doctor ID or Password");
        }
      } else {
        // Handle HTTP errors
        const errorData = await savedUserResponse.json(); // Parse the error response
        console.error("HTTP error:", savedUserResponse.status);
        console.log(errorData.msg);
        setError(errorData.msg || "Failed to log in. Please try again.");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Network error:", error);
      setError("Failed to connect. Please check your network.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form style={styles.form} onSubmit={handleLogin}>
        <label>
          Doctor ID:
          <input
            type="text"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          />
        </label>
        <label>
          Password:
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </label>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "50px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px",
  },
  passwordContainer: {
    position: "relative",
    width: "100%", // Ensure the container takes full width
  },
  toggleButton: {
    position: "absolute",
    top: "50%",
    right: "10px",
    transform: "translateY(-50%)",
    cursor: "pointer",
    padding: "5px", // Add padding for better visibility and click area
  },
  error: {
    color: "red",
    marginTop: "10px",
  },
};

export default LoginPage;
