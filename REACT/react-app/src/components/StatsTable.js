import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Col, Row } from 'antd';
import { useRef, useState, useEffect } from 'react';
import Highlighter from 'react-highlight-words';

const StatsTable = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    fetch('http://localhost:8080/championstats/')
    .then((res) => res.json())
    .then((res)=> {
      setData(res)
      setLoading(false)
    })
  }, []);

  const columns = [
    {
      title: 'Campeón',
      dataIndex: 'champion_name',
      key: 'champion_name',
      width: '30%',
      ...getColumnSearchProps('champion_name'),
    },
    {
      title: 'Ratio de victorias (%)',
      dataIndex: 'win_rate',
      key: 'win_rate',
      width: '23%',
      sorter: (a, b) => a.win_rate - b.win_rate,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ratio de pick (%)',
      dataIndex: 'pick_rate',
      key: 'pick_rate',
      width: '23%',
      sorter: (a, b) => a.pick_rate - b.pick_rate,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Ratio de ban (%)',
      dataIndex: 'ban_rate',
      key: 'ban_rate',
      width: '23%',
      sorter: (a, b) => a.ban_rate - b.ban_rate,
      sortDirections: ['descend', 'ascend'],
    },
  ];

  return (
    <Space>
      <Col>
        <Row>
        {loading === false && (
            <Table columns={columns} dataSource={data} />
          )}
        </Row>
      </Col>
    </Space>
  );
};
export default StatsTable;