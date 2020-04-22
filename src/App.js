import React from "react";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Provider } from "react-redux";

import "./App.css";
import Navbar from "./components/Navbar";
import store from "./redux/stores";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ff7961",
      main: "#f44336",
      dark: "#ba000d",
      contrastText: "#000",
    },
  },
});

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <CssBaseline />

          <Navbar />
          {/* <Content /> */}
        </Provider>
      </ThemeProvider>
    </div>
  );
}

export default App;
