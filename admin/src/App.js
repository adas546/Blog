import { Button } from "antd";
// 现在是reset.css,不是antd.css了
import "antd/dist/reset.css";
import "./static/css/App.css";
import Pages from "./pages";
function App() {
  return (
    <div className="App">
      <Pages />
    </div>
  );
}

export default App;
