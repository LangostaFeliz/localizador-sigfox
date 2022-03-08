
import Navbar from './components/Navbar'
import './App.css';
import { useEffect } from 'react'

import Home from './pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
function App() {

  useEffect(() => {
    document.title = "Localiador-Sigfox"
  }, []);
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}


export default App;
