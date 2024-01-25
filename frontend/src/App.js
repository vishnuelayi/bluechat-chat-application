import "./App.css";
import { Router, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Homepage} exact />
      <Route path={"/chat-page"} component={Chatpage} />
    </div>
  );
}

export default App;
