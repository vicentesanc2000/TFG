import { HomeOutlined } from '@ant-design/icons';
import React, { Component } from 'react';
import { Row, Col, Menu } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import AppContext from '../context/Provider';


class MenuPrincipal extends Component {
    static contextType = AppContext;

    items = [
        { key: 1, label: 'Inicio', link: '/' },
        { key: 2, label: 'Campeones', link: '/champions' },
        { key: 3, label: 'Historial', link: `/history/${this.context.globalSummoner}`},
        { key: 4, label: 'Consejos', link: '/tips' },
        { key: 5, label: 'Ranking', link: '/ranking'}
    ]

    render() {
        return (
            <div className="menu">
                <Row>
                    <Col span={19}>
                        <Menu mode={this.props.modo} theme={this.props.tema}>
                            {this.items.map(({ key, label, link }) => (
                                <Menu.Item key={key} >{label}
                                    <Link to ={link}/>
                                </Menu.Item> 
                            ))}
                        </Menu>
                        
                    </Col>
                    <Col span={5} style={{background:"#222222"}}><SearchBox/></Col>
                </Row>
            </div>
        );
    }
}

MenuPrincipal.propTypes = {
    modo: PropTypes.string.isRequired,
    tema: PropTypes.string.isRequired,
};

export default MenuPrincipal;