import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Badge, Button, Typography, Row, Col, Space } from 'antd';

import { PATCH } from '../constants/constants';
import getFetchResponse from '../services/getFetchResponse'
import RankedEntry from './RankedEntry';
import AppContext from '../context/Provider';

const patch = PATCH

class HistoryInfo extends Component {

    static contextType = AppContext;

    state = {
        summonerName: '',
        summonerLevel: '',
        summonerProfilePic: '',
        rankedEntries: [],
        loading: true
    }

    componentDidMount() {
        if (typeof this.props.name === 'string' || this.props.name instanceof String) {
            this.getRankedEntries(this.props.encryptedSummId)
        }
        
    }

    getRankedEntries = async (id) => {
        const url = 'http://localhost:8080/riot/'+ this.context.globalServer + '/getLeagueEntries/' + id;
        const entries = await getFetchResponse(url);
        this.setState({
            rankedEntries:entries,
            summonerName: this.props.name, 
            summonerLevel: this.props.level, 
            summonerProfilePic: this.props.profilePic,
            loading: false
        })
        return entries;
    }

    render() {
        let {summonerName, summonerLevel, summonerProfilePic, rankedEntries, loading} = this.state;

        return (
            <div>
                <Row>
                    <Space size="middle">
                        <Col>
                            <Row>
                                <Badge count={summonerLevel} offset={[-50, 100]} overflowCount={10000}>
                                    <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/profileicon/" + summonerProfilePic + ".png"} size={100} />
                                </Badge>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Typography.Title level={2}>{summonerName}</Typography.Title>
                            </Row>
                            <Row>
                                <Button type="primary">
                                    Actualizar
                                </Button>
                            </Row>
                        </Col>
                        {rankedEntries.length > 0 && (
                            <Col>
                                <RankedEntry queue={rankedEntries.at(0).queueType} tier={rankedEntries.at(0).tier} rank={rankedEntries.at(0).rank} wins={rankedEntries.at(0).wins} losses={rankedEntries.at(0).losses} leaguePoints={rankedEntries.at(0).leaguePoints}/>
                            </Col>
                        )}
                        {rankedEntries.length === 2 && (
                            <Col>
                                <RankedEntry queue={rankedEntries.at(1).queueType} tier={rankedEntries.at(1).tier} rank={rankedEntries.at(1).rank} wins={rankedEntries.at(1).wins} losses={rankedEntries.at(1).losses} leaguePoints={rankedEntries.at(1).leaguePoints}/>
                            </Col>
                        )}
                        
                    </Space>
                </Row>
    
    
            </div>
        );
    }

}

HistoryInfo.propTypes = {
    name: PropTypes.string.isRequired,
    level: PropTypes.number.isRequired,
    profilePic: PropTypes.number,
    encryptedSummId: PropTypes.string.isRequired
};

export default HistoryInfo;