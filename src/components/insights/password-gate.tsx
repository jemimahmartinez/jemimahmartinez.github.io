import React, { useState } from "react";
import withStyles, { WithStylesProps } from "react-jss";

const PASSWORD_HASH =
  "a30c0db8ae6223bab99dfe654b954b5f56676738a690dbd29c685cf5e2bcdc5d";

async function sha256Hex(input: string): Promise<string> {
  const buf = new TextEncoder().encode(input);
  const digest = await crypto.subtle.digest("SHA-256", buf);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

const styles = {
  gate: {
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    gap: "16px",
    padding: "24px",
    "max-width": "600px",
    width: "90%",
    "background-color": "#1A1A1D",
    border: "1px solid #3E0C0C",
    "border-radius": "8px",
    "@media (max-width: 600px)": {
      "max-width": "340px",
      padding: "20px",
    },
  },
  subheading: {
    margin: "0",
    "font-size": "0.6em",
    color: "#bbb",
    "text-align": "center",
  },
  form: {
    display: "flex",
    "flex-direction": "row",
    gap: "8px",
    width: "100%",
  },
  input: {
    flex: "1",
    "min-width": "0",
    padding: "10px 12px",
    "font-size": "0.6em",
    "font-family": "Montserrat, sans-serif",
    "background-color": "#000000",
    color: "white",
    border: "1px solid #3E0C0C",
    "border-radius": "4px",
    outline: "none",
    "&:focus": {
      "border-color": "#5E1219",
    },
    "@media (max-width: 600px)": {
      padding: "16px 14px",
      "font-size": "16px",
    },
  },
  button: {
    padding: "10px 16px",
    "font-size": "0.6em",
    "font-family": "Montserrat, sans-serif",
    "background-color": "#5E1219",
    color: "white",
    border: "none",
    "border-radius": "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
    "&:hover": {
      "background-color": "#950740",
    },
    "@media (max-width: 600px)": {
      padding: "16px 18px",
      "font-size": "14px",
    },
  },
  error: {
    margin: "0",
    "font-size": "0.55em",
    color: "#5E1219",
  },
};

interface IProps extends WithStylesProps<typeof styles> {
  classes: any;
  onUnlock: () => void;
}

const PasswordGate: React.FunctionComponent<IProps> = ({
  classes,
  onUnlock,
}) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hash = await sha256Hex(value);
    if (hash === PASSWORD_HASH) {
      setError(false);
      onUnlock();
    } else {
      setError(true);
    }
  };

  return (
    <div className={classes.gate}>
      <p className={classes.subheading}>
        🔒 Enter the password to view this section.
      </p>
      <form className={classes.form} onSubmit={handleSubmit}>
        <input
          type="password"
          className={classes.input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError(false);
          }}
        />
        <button type="submit" className={classes.button}>
          Unlock
        </button>
      </form>
      {error && <p className={classes.error}>Incorrect password.</p>}
    </div>
  );
};

export default withStyles(styles)(PasswordGate);
