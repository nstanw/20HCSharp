import * as React from 'react';
import { Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
const getColumnSearchProps = (dataIndex) => ({
  filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
    <div style={{ padding: 8 }}>
      <Input
        ref={(node) => {
          //  searchInput = node;
        }}
        placeholder={`Tìm kiếm ${dataIndex}`}
        value={selectedKeys[0]}
        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
        onPressEnter={() => confirm()}
        style={{ width: 188, marginBottom: 8, display: 'block' }}
      />
      <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90, marginRight: 8 }}>
        Search
      </Button>
      <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
        Reset
      </Button>
    </div>
  ),
  filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
});

export default getColumnSearchProps;
