import React, { Component } from 'react';
import { Typography } from 'antd';
import SearchBox from '../../components/SearchBox';

const { Title } = Typography;

class Home extends Component {

  render() {
    return (
      <div className="App" style={{
        position: "absolute",
        left: "50%",
        transform: "translate(-50%, 25%)",
      }}>
        <img src='logo.png' alt='application logo'></img>
        <Title>Anivia.gg</Title>
        <SearchBox />
      </div>
    );

  }
}

export default Home;