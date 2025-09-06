import Navbar from './components/Navbar'
import Menu from './pages/Menu'
import Quiz from './pages/Quiz'
import { BrowserRouter, Routes, Route } from "react-router";
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

export default function App() {
  const requestTokenURL = 'https://opentdb.com/api_token.php?command=request';
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const retreiveToken = async () => {
      try {
        const response = await axios.get(requestTokenURL);
        console.log(response.data.token);
        setToken(response.data.token);
      } catch (err) {
        setError('Failed to retreive Token');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    retreiveToken();
  }, []);

  if (loading) return <div>Loading Token ...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="bg-dark text-white" style={{ minHeight: '100vh' }}>
      <Navbar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/quiz/:categoryID/:difficulty/:type/" element={<Quiz token={token}/>} />
          </Routes>
      </BrowserRouter>
    </div>
  )
}
