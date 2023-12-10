import { makeStyles } from "@material-ui/core";
import Homepage from "./pages/Homepage";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CoinPage from "./pages/CoinPage";
import Header from "./components/Header";
import Alerts from "./components/Alerts";
import CryptoContextProvider from "./CryptoContext";

const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
}));

function App(): JSX.Element {
  const classes = useStyles();

  return (
    <CryptoContextProvider>
      <BrowserRouter>
        <div className={classes.App}>
          <Header />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
          </Routes>
        </div>
        <Alerts />
      </BrowserRouter>
    </CryptoContextProvider>
  );
}

export default App;