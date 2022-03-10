import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useState } from 'react';
import AboutPage from './pages/AboutPage'
import FeedbackData from './data/FeedbackData';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList'
import FeedbackStats from './components/FeedbackStats'
import Header from './components/Header'
import AboutIconLink from './components/AboutIconLink';
import { FeedbackProvider } from './Context/FeedbackContext';

function App() {
  const [feedback, setfeedback] = useState(FeedbackData)

  return (
    <FeedbackProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path='/' element={
              <>
                <FeedbackForm />
                <FeedbackStats />
                <FeedbackList />
              </>
            } />
            <Route path='/about' element={<AboutPage />} />
          </Routes>
          <AboutIconLink />
        </div>
      </Router>
    </FeedbackProvider>
  );
}

export default App;
