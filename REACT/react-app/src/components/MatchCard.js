import React, { Component } from "react";
import { Card, Row, Col, Space, Badge, Avatar, Typography } from 'antd';
import PropTypes from 'prop-types';

import { PATCH } from '../constants/constants';
import getSpellNameById from '../constants/spells'

const patch = PATCH;
const { Text } = Typography;

class MatchCard extends Component {

    render() {
        let player = this.props.participant
        let win = "#9EFC9F"
        let loss = "#FF9C9A"
        let color = ""
        if (player.win) { color = win } else { color = loss }

        return (
            <Card size="small" bodyStyle={{ background: color }}>
                <Space>
                    <Col>
                        <Badge count={player.champLevel} offset={[-5, 23]} overflowCount={20} size="small">
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + player.championName + ".png"} size={30} />
                        </Badge>
                    </Col>
                    <Col>
                        <Row>
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + getSpellNameById(player.summoner1Id) + ".png"} size={15} shape='square' />
                        </Row>
                        <Row>
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + getSpellNameById(player.summoner2Id) + ".png"} size={15} shape='square' />
                        </Row>
                    </Col>
                    <Col >
                        <Text>{player.summonerName}</Text>
                    </Col>
                    <Col>
                        <Text>{'' + player.kills + '/' + player.deaths + '/' + player.assists}</Text>
                    </Col>
                    <Col>
                        <Text>{(player.challenges.kda).toFixed(2)}</Text>
                    </Col>
                    <Col>
                        <Text>{player.neutralMinionsKilled + player.totalMinionsKilled}</Text>
                    </Col>
                    <Col>
                        <Text>{player.totalDamageDealtToChampions}</Text>
                    </Col>
                    <Col>
                        <Row>
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item0 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item1 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item2 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item3 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item4 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item5 + ".png"} size={25} shape='square' />
                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + player.item6 + ".png"} size={25} shape='square' />
                        </Row>
                    </Col>
                </Space >
            </Card >
        );
    }
}

MatchCard.propTypes = {
    participant: PropTypes.object.isRequired,
};

export default MatchCard;