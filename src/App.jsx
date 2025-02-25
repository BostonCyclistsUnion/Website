import './App.css'

import LandingPage from './components/LandingPage/LandingPage'
import MapPage from './components/MapPage/MapPage'
import { LANDING_PAGE_ROUTE, STRESS_MAP_PAGE_ROUTE } from './components/routes/routes';

import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
    
    return (
        <div id='primary-column'>
          <HashRouter basename='/'>
            <Routes>
                <Route path={STRESS_MAP_PAGE_ROUTE} element={<MapPage />} />
                <Route path={LANDING_PAGE_ROUTE} element={<LandingPage />} />
            </Routes>
          </HashRouter>
        </div>
    )
}

export default App
