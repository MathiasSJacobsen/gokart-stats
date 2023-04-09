import { Helmet } from "react-helmet-async";
import Landing from "./landing/Landing";

function App() {
  return (
    <div>
      <Helmet>
        <title>Bekk - gokart</title>
      </Helmet>
      <Landing />
    </div>
  );
}

export default App;
