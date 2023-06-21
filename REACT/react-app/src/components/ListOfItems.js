import { Button, List } from 'antd';
import { useEffect, useState, useContext } from 'react';
import Match from './Match'
import getRegionByServer from '../constants/servers'
import AppContext from '../context/Provider';

export default function ListOfItems ({ puuid }) {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState([]);
    const [count, setCount] = useState(2);
    const {globalServer} = useContext(AppContext);

    useEffect(() => {
        let aux = []
        fetch('http://localhost:8080/riot/' + getRegionByServer(globalServer) + '/getlistofmatches/' + puuid + '/' + 0)
            .then((res) => res.json())
            .then((res) => {
                res.map( (id) => {
                    fetch('http://localhost:8080/riot/' + getRegionByServer(globalServer) + '/getmatchinfo/' + id)
                    .then((res) => res.json())
                    .then((res) => {
                        aux.push(res)
                    })
                })
                setInitLoading(false);
                setData(aux);
                setList(aux);
            });
    }, []);

    const onLoadMore = () => {
        let aux = []
        setLoading(true);
        fetch('http://localhost:8080/riot/' + getRegionByServer(globalServer) + '/getlistofmatches/' + puuid + '/' + count)
            .then((res) => res.json())
            .then((res) => {
                res.map( (id) => {
                    fetch('http://localhost:8080/riot/' + getRegionByServer(globalServer) + '/getmatchinfo/' + id)
                    .then((res) => res.json())
                    .then((res) => {
                        aux.push(res)
                        if(aux.length === 2) {
                            let newData = data.concat(aux);
                            setData(newData);
                            setList(newData);
                            setLoading(false);
                            setCount(count+2)
                        }
                    })
                })
                // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                // In real scene, you can using public method of react-virtualized:
                // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                window.dispatchEvent(new Event('resize'));
            });
    };

    const loadMore =
        !initLoading && !loading ? (
            <div
                style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                }}
            >
                <Button onClick={onLoadMore}>Mas</Button>
            </div>
        ) : null;

    return (
        <List
            className="demo-loadmore-list"
            loading={initLoading}
            itemLayout="horizontal"
            loadMore={loadMore}
            dataSource={list}
            renderItem={(item) => (
            <Match
                match={item}
                puuid={puuid}
            />
            )}
        />
    );
};