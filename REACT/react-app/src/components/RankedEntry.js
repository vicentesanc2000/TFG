import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Typography, Row, Col, Space, Progress } from 'antd';

const { Title, Text } = Typography;

class RankedEntry extends Component {

    state = {}

    render() {
        return (
            <div>
                <Row>
                    <Title level={5}>{(this.props.queue)}</Title>
                </Row>
                <Row>
                    <Space>
                        <Col>
                            <Avatar src={process.env.PUBLIC_URL + '/ranked-emblem/emblem-' + this.props.tier + '.png'} size={100} />
                        </Col>
                        <Col>
                            <Row>
                                <Text>{this.props.tier + ' ' + this.props.rank}</Text>
                            </Row>
                            <Row>
                                <Text>{this.props.leaguePoints} LP</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Text>{this.props.wins + 'V - ' + this.props.losses + 'D'}</Text>
                            </Row>
                        </Col>
                        <Col>
                            <Progress type='circle' percent={((this.props.wins/(this.props.wins+this.props.losses))*100).toFixed(2)} size={100}/>
                        </Col>
                    </Space>
                </Row>
            </div>
        );
    }
}

RankedEntry.propTypes = {
    queue: PropTypes.string.isRequired,
    tier: PropTypes.string.isRequired,
    rank: PropTypes.string.isRequired,
    wins: PropTypes.number.isRequired,
    losses: PropTypes.number.isRequired,
    leaguePoints: PropTypes.number.isRequired
};

export default RankedEntry;