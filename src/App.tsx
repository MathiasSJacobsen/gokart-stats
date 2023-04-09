import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import Landing from "./landing/Landing";
import { NotFoundPage } from "./NotFoundPage";

function App() {
  return (
    <div>
      <Helmet>
        <title>Bekk - gokart</title>
      </Helmet>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
