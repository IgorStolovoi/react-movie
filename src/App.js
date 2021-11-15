import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Layout from "./Layout/Layout";
import Theme from "./components/Theme/Theme";
import "./index.css";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Theme>
          <Layout />
        </Theme>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
