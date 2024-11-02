import { Col, Row, Card, Input, Form } from 'antd';
import React, { useState } from 'react';
import AddTiepNhanThongTin from '../../Calls/components/AddTiepNhanThongTin';
import { observer } from 'mobx-react';
import { useStore } from '../../../helpers/use-store';

export interface IPaneTab {
  title: string;
  content: any;
  key: string;
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const AddYeuCau = observer(() => {
  const { sessionStore } = useStore();
  const [tenKhachHang, setTenKhachHang] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');

  React.useEffect(() => {
    sessionStore.title = 'Thêm mới tiếp nhận thông tin';
    sessionStore.subTitle = '';
  }, []);

  return (
    <Row>
      <Col span={24}>
        <Card>
          <Form {...formItemLayout}>
            <Form.Item label="Tên khách hàng" rules={[{ required: true, message: 'Vui lòng nhập trường dữ liệu này!' }]}>
              <Input
                onChange={(e) => {
                  setTenKhachHang(e.target.value);
                }}
              ></Input>
            </Form.Item>
            <Form.Item label="Số điện thoại" rules={[{ required: true, message: 'Vui lòng nhập trường dữ liệu này!' }]}>
              <Input
                onChange={(e) => {
                  setSoDienThoai(e.target.value);
                }}
              ></Input>
            </Form.Item>
          </Form>
          <div style={{ display: tenKhachHang && soDienThoai ? '' : 'none' }}>
            <AddTiepNhanThongTin linkedID="" tenKhachHang={tenKhachHang} soDienThoai={soDienThoai} onSuccess={() => {}}></AddTiepNhanThongTin>
          </div>
        </Card>
      </Col>
    </Row>
  );
});
export default AddYeuCau;
