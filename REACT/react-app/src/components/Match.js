import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Collapse, Avatar, Badge, Typography, Row, Col, Space, Card, Popover } from 'antd';
import { Link } from 'react-router-dom'

import getSpellNameById from '../constants/spells'
import { PATCH } from '../constants/constants';
import getQueueById from '../constants/queueIds'

import MatchCard from './MatchCard';

const { Panel } = Collapse;
const { Text } = Typography;

const patch = PATCH;

class Match extends Component {

    constructor(props) {
        super(props)
        //obtener participantes
        const participants = this.props.match.metadata.participants

        //obtener posiscion del jugador que hace la peticion
        const pos = participants.findIndex((element) => element === this.props.puuid)

        //obtener la informacion del jugador
        var player = this.props.match.info.participants.at(pos)

        //determinar a que equipo pertenece el jugador
        var team = player.teamId

        if (team === 200) { team = 1 } else { team = 0 }

        //obtener los objetos del jugador
        var items = []
        items.push(player.item0)
        items.push(player.item1)
        items.push(player.item2)
        items.push(player.item3)
        items.push(player.item4)
        items.push(player.item5)
        items.push(player.item6)

        //obtener la lista de jugadores de cada equipo
        var team1 = []
        var team1champs = []
        var team1participants = []
        var team2 = []
        var team2champs = []
        var team2participants = []
        for (let i = 0; i < 10; i++) {
            let participant = this.props.match.info.participants.at(i)
            if (i < 5) {
                team1.push(participant.summonerName)
                team1champs.push(participant.championName)
                team1participants.push(participant)
            }
            else {
                team2.push(participant.summonerName)
                team2champs.push(participant.championName)
                team2participants.push(participant)
            }
        }

        let time = ((new Date().getTime()) - this.props.match.info.gameEndTimestamp) / 1000
        let unidades = 'segundos'
        if (time > 60) {
            time = time / 60
            unidades = 'minutos'
            if (time >= 60) {
                time = time / 60
                unidades = 'horas'
                if (time >= 24) {
                    time = time / 24
                    unidades = 'días'
                }
            }
        }
        time = Math.floor(time)
        let hace = '' + time + ' ' + unidades

        this.state = {
            player: player,
            teamPos: team,
            itemList: items,
            team100: team1,
            team200: team2,
            team100champs: team1champs,
            team200champs: team2champs,
            team100participants: team1participants,
            team200participants: team2participants,
            hace: hace,
        }
    }

    render() {
        let { player, teamPos, itemList, team100, team200, team100champs, team200champs, hace, team100participants, team200participants } = this.state;

        return (
            <div>
                <Col>
                    <Collapse>
                        <div >
                            <Row>
                                <Space size={'middle'}>
                                    <Col span={3} />
                                    <Col>
                                        <Badge count={player.champLevel} offset={[-5, 48]} overflowCount={20}>
                                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + player.championName + ".png"} size={50} />
                                        </Badge>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + getSpellNameById(player.summoner1Id) + ".png"} size={25} shape='square' />
                                        </Row>
                                        <Row>
                                            <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/spell/" + getSpellNameById(player.summoner2Id) + ".png"} size={25} shape='square' />
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Text>{getQueueById(this.props.match.info.queueId)}</Text>
                                        </Row>
                                        <Row>
                                            {this.props.match.info.teams.at(teamPos).win === true && (
                                                <Text type="success">Victoria</Text>
                                            )}
                                            {this.props.match.info.teams.at(teamPos).win === false && (
                                                <Text type="danger">Derrota</Text>
                                            )}
                                        </Row>
                                        <Row>
                                            <Text>Duración: {((this.props.match.info.gameDuration) / 60).toFixed(2)}</Text>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Space>
                                                <Col>
                                                    <Text>{'' + player.kills + '/' + player.deaths + '/' + player.assists}</Text>
                                                </Col>
                                                <Col>
                                                    <Text>{(player.challenges.kda).toFixed(2)} KDA</Text>
                                                </Col>
                                                <Col>
                                                    <Text>{player.neutralMinionsKilled + player.totalMinionsKilled} CS</Text>
                                                </Col>
                                            </Space>
                                        </Row>
                                        <Row>
                                            <div>
                                                {
                                                    itemList.map((item) =>
                                                        <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/item/" + item + ".png"} size={25} shape='square' key={'' + this.props.match.metadata.matchId + this.props.puuid + item} />
                                                    )
                                                }
                                            </div>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Space>
                                                <Col>
                                                    <Space direction='vertical' size={2}>
                                                        {
                                                            team100champs.map((champ) =>
                                                                <Row>
                                                                    <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + champ + ".png"} size={20} shape='square' key={this.props.match.metadata.matchId + champ} />
                                                                </Row>
                                                            )
                                                        }
                                                    </Space>
                                                </Col>
                                                <Col>
                                                    <Space direction='vertical' size={0}>
                                                        {
                                                            team100.map((summoner) =>
                                                                <Row >
                                                                    <Link to={'/history/' + summoner}>{summoner}</Link>
                                                                </Row>
                                                            )
                                                        }
                                                    </Space>
                                                </Col>
                                                <Col>
                                                    <Space direction='vertical' size={2}>
                                                        {
                                                            team200champs.map((champ) =>
                                                                <Row>
                                                                    <Avatar src={"http://ddragon.leagueoflegends.com/cdn/" + patch + "/img/champion/" + champ + ".png"} size={20} shape='square' key={this.props.match.metadata.matchId + champ} />
                                                                </Row>
                                                            )
                                                        }
                                                    </Space>
                                                </Col>
                                                <Col>
                                                    <Space direction='vertical' size={0}>
                                                        {
                                                            team200.map((summoner) =>
                                                                <Row>
                                                                    <Link to={'/history/' + summoner}>{summoner}</Link>
                                                                </Row>
                                                            )
                                                        }
                                                    </Space>
                                                </Col>
                                            </Space>
                                        </Row>
                                    </Col>
                                    <Col>
                                        <Text>Hace {hace}</Text>
                                    </Col>
                                </Space>
                            </Row>
                        </div>
                        <Panel header="Detalles">
                            <Space>
                                <Col>
                                    <Row>
                                        <Card size="small" bodyStyle={{ background: "#D9D9D9" }}>
                                            <Space>
                                                <Col>
                                                    <Text strong={true}>Equipo 1</Text>
                                                </Col>
                                                <Col>
                                                    <Popover content={<Text>Indica el número de bajas/muertes/asistencias que se ha obtenido durante la partida</Text>} title="Marcador">
                                                        <Text strong={true}>Score</Text>
                                                    </Popover>
                                                </Col>
                                                <Col>
                                                    <Popover content={<Text>Se calcula como bajas + asistencias entre las muertes y suele utilizarse como indicativo del rendimiento del jugador en la partida</Text>} title="KDA">
                                                        <Text strong={true}>KDA</Text>
                                                    </Popover>
                                                </Col>
                                                <Col>
                                                    <Popover content={<Text>Indica el número de monstruos neutrales ejecutados durante la partida</Text>} title="CS">
                                                        <Text strong={true}>CS</Text>
                                                    </Popover>
                                                </Col>
                                                <Col>
                                                    <Text strong={true}>Daño</Text>
                                                </Col>
                                            </Space>
                                        </Card>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {
                                                team100participants.map((participant) =>
                                                    <MatchCard participant={participant} />
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                                <Col>
                                    <Row>
                                        <Card size="small" bodyStyle={{ background: "#D9D9D9" }}>
                                            <Space>
                                                <Col>
                                                    <Text strong={true}>Equipo 2</Text>
                                                </Col>
                                                <Col>
                                                    <Text strong={true}>Score</Text>
                                                </Col>
                                                <Col>
                                                    <Text strong={true}>KDA</Text>
                                                </Col>
                                                <Col>
                                                    <Text strong={true}>CS</Text>
                                                </Col>
                                                <Col>
                                                    <Text strong={true}>Daño</Text>
                                                </Col>
                                            </Space>
                                        </Card>
                                    </Row>
                                    <Row>
                                        <Col>
                                            {
                                                team200participants.map((participant) =>
                                                    <MatchCard participant={participant} />
                                                )
                                            }
                                        </Col>
                                    </Row>
                                </Col>
                            </Space>
                        </Panel>
                    </Collapse>
                </Col>
            </div>
        );
    }

}

Match.propTypes = {
    match: PropTypes.object.isRequired,
    puuid: PropTypes.string.isRequired,
};

export default Match;