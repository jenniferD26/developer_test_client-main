import Navigation from '../Navigation';

import { HomePage } from '../../pages/HomePage';
import { PersonPage } from '../../pages/PersonPage';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div id='bg'>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="person/:id" element={<PersonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
