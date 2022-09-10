import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Elements/Home'
import Dummy from './Elements/Dummy';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/game" element={<Dummy />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
