import "./App.css";
import Values from "values.js";
import { useState } from "react";
import SingleColor from "./Color";
import Button from "@material-ui/core/Button";
import FormatColorFillIcon from "@material-ui/icons/FormatColorFill";
import Snackbar from "@material-ui/core/Snackbar";
import { alertState, chosenColorState } from "./atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";

function App() {
  const [color, setColor] = useState("");
  const [error, setError] = useState(false);
  const [colorList, setColorList] = useState([]);
  const [alert, setAlert] = useRecoilState(alertState);
  const chosenColor = useRecoilValue(chosenColorState);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError(false);
  };

  const generateColor = (e) => {
    e.preventDefault();

    try {
      let colors = new Values(`#${color}`).all(5);
      setColorList(colors);
      setError(false);
    } catch (error) {
      setError(true);
      console.log(`🔴 ERROR: ${color} is not a valid color`);
    }
  };

  return (
    <div className="app">
      <div className="app__header">
        <h1 className="app_headerTitle">Color Generator</h1>
        <form className="app__headerForm" onSubmit={generateColor}>
          <TextField
            value={color}
            type="text"
            placeholder="Enter hex"
            onChange={(e) => setColor(e.target.value)}
            error={error}
            InputProps={{
              startAdornment: (
                <InputAdornment
                  style={{ overflow: "visible" }}
                  position="start"
                >
                  #
                </InputAdornment>
              ),
            }}
          />
          <Button
            className="app__headerFormButton"
            color="primary"
            variant="contained"
            disabled={!color}
            type="submit"
            style={{ marginLeft: 10 }}
            endIcon={<FormatColorFillIcon />}
          >
            Generate
          </Button>
        </form>
      </div>

      <Snackbar
        open={alert}
        autoHideDuration={3000}
        onClose={handleClose}
        key={`${chosenColor} copied to clipboard`}
        message={`${chosenColor} copied to clipboard`}
      />

      <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={handleCloseError}
        key="Incorrect input, enter HEX code"
        message="Incorrect input, enter HEX code"
      />

      <div className="app__showColors">
        {colorList.map((color, index) => (
          <SingleColor color={color} key={index} index={index} />
        ))}
      </div>
    </div>
  );
}

export default App;
