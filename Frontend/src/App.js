import { useState } from "react";
import axios from "axios";

function App() {
  const [input, setInput] = useState("");

  const handleClick = (value) => {
    setInput((prev) => prev + value);
  };

  const calculate = async () => {
    try {
      if (!input) return;

      const expression = input;
      const result = eval(expression);

      setInput(result.toString());

      try {
        await axios.post("http://localhost:5000/api/calc", {
          expression,
          result,
        });
      } catch (err) {
        console.log("DB save failed", err);
      }
    } catch {
      setInput("Error");
    }
  };

  const clear = () => setInput("");

  return (
    <div style={styles.container}>
      <div style={styles.calculator}>
        <h2 style={styles.title}>Calculator</h2>

        <input style={styles.display} value={input} readOnly />

        <div style={styles.buttons}>
          {[
            "7","8","9","/",
            "4","5","6","*",
            "1","2","3","-",
            "0",".","=","+"
          ].map((btn) => (
            <button
              key={btn}
              onClick={() => btn === "=" ? calculate() : handleClick(btn)}
              style={
                btn === "="
                  ? styles.equal
                  : ["+","-","*","/"].includes(btn)
                  ? styles.operator
                  : styles.button
              }
            >
              {btn}
            </button>
          ))}
          <button onClick={clear} style={styles.clear}>C</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
  },
  calculator: {
    width: "300px",
    padding: "20px",
    borderRadius: "20px",
    background: "#1f1f2e",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    textAlign: "center",
    marginBottom: "10px",
  },
  display: {
    width: "100%",
    height: "60px",
    fontSize: "24px",
    marginBottom: "15px",
    textAlign: "right",
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    outline: "none",
    background: "#2d2d44",
    color: "#fff",
  },
  buttons: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "10px",
  },
  button: {
    height: "55px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#3a3a5c",
    color: "#fff",
    cursor: "pointer",
    transition: "0.2s",
  },
  operator: {
    height: "55px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#ff9f43",
    color: "#fff",
    cursor: "pointer",
  },
  equal: {
    height: "55px",
    fontSize: "18px",
    borderRadius: "12px",
    border: "none",
    background: "#00c853",
    color: "#fff",
    cursor: "pointer",
  },
  clear: {
    gridColumn: "span 4",
    height: "55px",
    borderRadius: "12px",
    border: "none",
    background: "#ff3b3b",
    color: "#fff",
    fontSize: "18px",
    marginTop: "10px",
    cursor: "pointer",
  },
};

export default App;