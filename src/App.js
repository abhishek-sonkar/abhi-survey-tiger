import './App.css';
import logo from './logo.png';
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { Switch, Route, Link, useHistory } from "react-router-dom";
import CreateSurvey from './components/CreateSurvey';
import TakeSurvey from './components/TakeSurvey';
import ConfirmSurvey from './components/ConfirmSurvey';
import { createSurvey } from './components/stores/SurveySlice';
import { unwrapResult } from '@reduxjs/toolkit';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  
  const redirectToNewSurvey = () => {
    dispatch(createSurvey())
    .then(unwrapResult)
    .then((newSurveyId) => history.push("/create-survey/" + newSurveyId));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"></img>
      </header>
      <Switch>
        <Route path="/create-survey/:surveyId">
          <CreateSurvey />
        </Route>
        <Route path="/confirm-survey/:surveyId">
          <ConfirmSurvey />
        </Route>
        <Route path="/take-survey">
          <TakeSurvey />
        </Route>
        <Route path="/">
          <Link to="/create-survey/">
            <Button className="survey-main-btn" onClick={redirectToNewSurvey}>Create Survey</Button>
          </Link>
          <Link to="/take-survey">
            <Button className="survey-main-btn">Take Survey</Button>
          </Link>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
