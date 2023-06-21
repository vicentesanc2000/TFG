import React, { Component } from 'react';
import { useParams } from 'react-router-dom';
import HistoryInfo from '../../components/HistoryInfo';
import ListOfItems from '../../components/ListOfItems';
import getFetchResponse from '../../services/getFetchResponse';

import { LoadingOutlined } from '@ant-design/icons';
import { Typography, Col, Space } from 'antd'
import AppContext from '../../context/Provider';

const { Title } = Typography;

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class History extends Component {

    static contextType = AppContext;

    state = {
        summoner: this.props.params.summoner,
        matchCount: 0,
        server: 'euw1',
        region: 'europe',
        playerData: null,
        loading: true,
    }

    getPlayerData = async (summoner) => {
        const APIurl = "http://localhost:8080/riot/" + this.context.globalServer + "/getsummonerbyname/" + summoner
        const playerdata = await getFetchResponse(APIurl)
        this.setState({ playerData: playerdata })
        return playerdata.puuid
    }

    componentDidMount() {
        this.getPlayerData((this.state.summoner))
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.playerData !== this.state.playerData) {
            this.setState({ loading: false })
        }
    }

    render() {
        let { loading, playerData } = this.state;

        if (loading) return <LoadingOutlined />

        return (
            <div className="App" style={{
                position: "absolute",
                left: "50%",
                transform: "translate(-50%, 0px)",
                background: "#EEEEEE"
            }}>
                <Col span={1} />
                <Col span={22}>
                    <Space direction="vertical">
                        <Title level={1}>Historial</Title>
                        {playerData && !loading && (
                            <HistoryInfo name={playerData.name} level={playerData.summonerLevel} profilePic={playerData.profileIconId} encryptedSummId={playerData.id}></HistoryInfo>
                        )}
                        {playerData && !loading && (
                            <ListOfItems puuid={playerData.puuid}></ListOfItems>
                        )}
                    </Space>
                </Col>
                <Col span={1} />
            </div>
        );
    }


}

export default withParams(History); 