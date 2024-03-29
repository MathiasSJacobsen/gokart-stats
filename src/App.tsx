import { Helmet } from "react-helmet-async";
import { Route, Routes } from "react-router-dom";
import Header from "./header/Header";
import Information from "./information/Information";
import Landing from "./landing/Landing";
import { NotFoundPage } from "./NotFoundPage";
import SessionTimes from "./SessionTimes";
import Utfordringen from "./Utfordringen";
import BestLapTable from "./bestLapTable/BestLapTable";

function App() {
  return (
    <div>
      <Helmet>
        <title>Bekk - gokart</title>
      </Helmet>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/info" element={<Information />} />
        <Route path="/session/1" element={<SessionTimes nr={1} />} />
        <Route path="/session/2" element={<SessionTimes nr={2} />} />
        <Route path="/session/3" element={<SessionTimes nr={3} />} />
        <Route path="/session/7" element={<SessionTimes nr={7} />} />
        <Route path="/session/8" element={<SessionTimes nr={8} />} />
        <Route path="/session/9" element={<SessionTimes nr={9} />} />

        <Route path="/utfordringen" element={<Utfordringen />} />
        <Route path="/hi" element={<BestLapTable />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
