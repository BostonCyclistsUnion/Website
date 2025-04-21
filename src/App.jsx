import './App.css'

import LabsPage from './components/LabsPage/LabsPage'
import MapPage from './components/MapPage/MapPage'
import LTSPage from './components/LTSPage/LTSPage'
import OSMPage from './components/OSMPage/OSMPage'
import { 
  LABS_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  LTS_PAGE_ROUTE,
  OSM_PAGE_ROUTE,
} from './components/routes/routes';

import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
    
    return (
        <div id='primary-column'>
          <HashRouter basename='/'>
            <Routes>
              <Route path={LABS_PAGE_ROUTE} element={<LabsPage />} />
              <Route path={MAP_PAGE_ROUTE} element={<MapPage />} />
              <Route path={LTS_PAGE_ROUTE} element={<LTSPage />} />
              <Route path={OSM_PAGE_ROUTE} element={<OSMPage />} />
            </Routes>
          </HashRouter>
        </div>
    )
}

export default App
