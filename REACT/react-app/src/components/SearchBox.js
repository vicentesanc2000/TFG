import React, { Component } from "react";
import { Input, Select, Row, Col } from 'antd';
import { Navigate } from 'react-router-dom';
import AppContext from "../context/Provider";

const { Search } = Input;
const { Option } = Select;

class SearchBox extends Component {

  static contextType = AppContext;

  state = {
    summoner: null,
    hasChanged: false,
    server: 'euw1'
  }

  render() {
    let { summoner, hasChanged, server } = this.state;
    let { setContextSummoner, setContextServer } = this.context;
    let url = '/history/' + summoner;
    return (
      <div>
        <Row>
          <Col>
            <Select defaultValue="euw1" size="large" onSelect={(selected) => this.setState({server: selected})}>
              <Option value="euw1">EUW</Option>
              <Option value="na1">NA</Option>
              <Option value="eun1">EUNE</Option>
              <Option value="br1">BR</Option>
              <Option value="la1">LAN</Option>
              <Option value="la2">LAS</Option>
              <Option value="oc1">OCE</Option>
              <Option value="kr">KR</Option>
              <Option value="ru">RU</Option>
              <Option value="jp1">JP</Option>
            </Select>
          </Col>
          <Col >
            {summoner && hasChanged === true && (
              <Navigate to={url} replace={true} />
            )}
            {hasChanged = false}
            <Search placeholder="Nombre de invocador" size="large" maxLength="16" onSearch={(summoner) => {
              this.setState({ summoner: summoner, hasChanged: true })
              setContextSummoner(summoner)
              setContextServer(server)
            }} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default SearchBox;