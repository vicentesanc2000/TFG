import { Space, Table, Select, Row, Col } from 'antd';
import { useState, useEffect } from 'react';

const { Option } = Select;

const RankingTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [server, setServer] = useState('euw1');
  const [queue, setQueue] = useState('RANKED_SOLO_5x5');

  useEffect(() => {
    fetch('http://localhost:8080/riot/' + server +'/getChallengerLeague/' + queue)
      .then((res) => res.json())
      .then((res) => {
        setData(res)
        setLoading(false)
      })
  }, [server, queue]);

  const columns = [
    {
      title: 'Invocador',
      dataIndex: 'summonerName',
      key: 'summonerName',
      width: '30%',
    },
    {
      title: 'Victorias',
      dataIndex: 'wins',
      key: 'wins',
      width: '20%',
      sorter: (a, b) => a.wins - b.wins,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Derrotas',
      dataIndex: 'losses',
      key: 'losses',
      width: '20%',
    },
    {
      title: 'Puntos de Liga (LPs)',
      dataIndex: 'leaguePoints',
      key: 'leaguePoints',
      width: '20%',
      sorter: (a, b) => a.leaguePoints - b.leaguePoints,
      sortDirections: ['descend', 'ascend'],
      defaultSortOrder: 'descend',
    },
  ];

  return (
    <Space>
      <Col>
        <Row>
          <Col>
            <Select defaultValue="euw1" size="large" onSelect={(selected) => setServer(selected)}>
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
          <Col>
            <Select defaultValue="RANKED_SOLO_5x5" size="large" onSelect={(selected) => setQueue(selected)}>
              <Option value="RANKED_SOLO_5x5">Solo Q</Option>
              <Option value="RANKED_FLEX_SR">Flex Q</Option>
            </Select>
          </Col>
        </Row>
        <Row>
          {loading === false && (
            <Table columns={columns} dataSource={data} />
          )}
        </Row>
      </Col>
    </Space>

  );
};
export default RankingTable;