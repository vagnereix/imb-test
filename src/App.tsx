import "./styles/global.scss";
import { BrowserRouter } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AppRoutes } from "./routes/app.routes";

import { SearchProvider } from "./hooks/useSearch";

function App() {
  return (
    <>
      <BrowserRouter>
        <SearchProvider>
          <AppRoutes />
          <ToastContainer />
        </SearchProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
