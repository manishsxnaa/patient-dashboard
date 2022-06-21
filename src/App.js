import Login from './components/Login/Login';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PatientAuthContextProvider from './contexts/PatientAuthContext';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <PatientAuthContextProvider>
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/Home" component={Home} />
          </Switch>
        </Router>
      </PatientAuthContextProvider>
    </div>
  );
}

export default App;
