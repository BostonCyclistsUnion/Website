import './App.css'

import LabsPage from './components/LabsPage/LabsPage'
import MapPage from './components/MapPage/MapPage'
import LTSPage from './components/LTSPage/LTSPage'
import OSMPage from './components/OSMPage/OSMPage'
import {
  ForgottenIntersectionsPage, 
  ProtectedIntersectionsPage,
  IntersectionAuditPage,
  } from './components/IntersectionsPages/IntersectionsPages'
import {
  BikeParkingPage,
  BikeParkingMappingPage,
} from './components/BikeParkingPages/BikeParkingPages'
import { 
  LABS_PAGE_ROUTE,
  MAP_PAGE_ROUTE,
  LTS_PAGE_ROUTE,
  OSM_PAGE_ROUTE,
  OSMEDIT_PAGE_ROUTE,
  INX_PAGE_ROUTE,
  PINX_PAGE_ROUTE,
  INXAUDIT_PAGE_ROUTE,
  BIKEPARKING_PAGE_ROUTE,
} from './components/routes/routes';

import { HashRouter, Route, Routes } from 'react-router-dom';

function App() {
    
    return (
        <div id='primary-column' key='website'>
          <HashRouter basename='/' key='hashrouter'>
            <Routes key='routes'>
              <Route path={LABS_PAGE_ROUTE} element={<LabsPage />} key='route-LabsPage'/>
              <Route path={MAP_PAGE_ROUTE} element={<MapPage />} key='route-MapPage'/>
              <Route path={LTS_PAGE_ROUTE} element={<LTSPage />} key='route-LTSPage'/>
              <Route path={OSM_PAGE_ROUTE} element={<OSMPage />} key='route-OSMPage'/>
              <Route path={INX_PAGE_ROUTE} element={<ForgottenIntersectionsPage />} key='route-InxPage'/>
              <Route path={PINX_PAGE_ROUTE} element={<ProtectedIntersectionsPage />} key='route-PInxPage'/>
              <Route path={INXAUDIT_PAGE_ROUTE} element={<IntersectionAuditPage />} key='route-InxAPage'/>              
              <Route path={BIKEPARKING_PAGE_ROUTE} element={<BikeParkingPage />} key='route-BikeParkingPage'/>
              <Route path={OSMEDIT_PAGE_ROUTE} element={<BikeParkingMappingPage />} key='route-BikeParkingMappingPage'/>
            </Routes>
          </HashRouter>
        </div>
    )
}

export default App
