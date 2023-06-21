import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'antd/dist/antd.min.css';
import { Layout } from 'antd';

import Home from './pages/Home';
import History from './pages/History';
import ChampionStats from './pages/ChampionStats';
import Tips from './pages/Tips';
import Ranking from './pages/Ranking';

import MenuPrincipal from './components/MenuPrincipal';
import NotFound from './components/NotFound';

import { Provider } from './context/Provider';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Layout style={{ height: "100vh", background:"#EEEEEE" }}>
            <Provider>
              <MenuPrincipal modo="horizontal" tema="dark" />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/history/:summoner" element={<History />} />
                <Route path="/champions" element={<ChampionStats />} />
                <Route path="/tips" element={<Tips/>}/>
                <Route path="/ranking" element={<Ranking/>}/>
                <Route path="*" element={<NotFound/>} />
              </Routes>
            </Provider>
          </Layout>
        </div>
      </Router>

    );
  }
}

export default App;  