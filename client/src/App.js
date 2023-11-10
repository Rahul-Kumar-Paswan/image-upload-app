import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

import ImageUpload from './components/ImageUpload';
import ImageView from './components/ImageView';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/upload">Upload Image</Link>
              </li>
              <li>
                <Link to="/view">View Image</Link>
              </li>
            </ul>
          </nav>

          <Routes>
            <Route path="/upload" element={<ImageUpload />} />
            <Route path="/view" element={<ImageView />} />
          </Routes>
        </Router>
      </header>
    </div>
  );
}

export default App;
