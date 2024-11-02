import { SearchOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
const getColumnSearchProps = (dataIndex: any) => ({
    filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
    }: {
        setSelectedKeys: any;
        selectedKeys: any;
        confirm: any;
        clearFilters: any;
    }) => (
        <div style={{ padding: 8 }}>
            <Input
                ref={(_node) => {
                    //  searchInput = node;
                }}
                placeholder={`Tìm kiếm ${dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                onPressEnter={() => confirm()}
                style={{ width: 188, marginBottom: 8, display: "block" }}
            />
            <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small" style={{ width: 90, marginRight: 8 }}>
                Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                Reset
            </Button>
        </div>
    ),
    filterIcon: (filtered: any) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
});

export default getColumnSearchProps;
