import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { Card, Row, Col, Button, Form, Input, Spin, Divider, Modal, message } from 'antd';
import khachHangService from '../../services/khachHang/khachHangService';
import { useStore } from '../../helpers/use-store';
import { KhachHangDto } from '../../services/khachHang/dto/khachHangDto';
import reportService from '../../services/reports/reportService';
import { ChangePhoneInput } from '../../services/khachHang/dto/changePhoneDto';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const modalLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ReportName = 'KH_ThongTinSuDungNuoc';

const ScanHopDong = observer(() => {
  const { sessionStore } = useStore();
  const [ maKhachHang, setMaKhachHang ] = useState('');
  const [ loadingKhachhang, setLoadingKhachHang ] = useState(false);
  const [ spinning,  ] = useState(false);
  const [ isLoadding, setIsLoadding ] = React.useState(false);
  const [ form] = Form.useForm();
  const [ khachHang, setKhachHang ] = useState<KhachHangDto>();
  const [ htmlReport, setHtmlReport ] = React.useState();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  React.useEffect(() => {
    sessionStore.title = 'Thông tin khách hàng';
    return function clearUp() {
    };
  }, []);

  const onFilterClick = async () => {
    setLoadingKhachHang(true);
    try {
      var khachHang = await khachHangService.getViewKhachHang(maKhachHang);
      setKhachHang(khachHang);
      setLoadingKhachHang(false);
      form.setFieldsValue({
        tenkhachhang: khachHang?.tenkh
      })
    } catch (ex) {
      setLoadingKhachHang(false);
    }
    
    setIsLoadding(true);
    var data = await reportService.exportReportToHtml({
      reportPath: '/NAWASCO.ERP.Report/' + ReportName,
      format: 'EXCELOPENXML',
      page: 0,
      parameters: {
        IDKH: maKhachHang
      },
    });
    setHtmlReport(data.result);
    setIsLoadding(false);
  }

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values: any) => {
    try {
      setIsLoadding(true);
      let input: ChangePhoneInput = {
        idkh: khachHang?.idkh,
        sdt: values.soDienThoaiMoi
      };
      var result = await khachHangService.UpdatePhone(input);
      message.success('Cập nhật thành công');
      setKhachHang(result);
      setIsLoadding(false);
      setIsModalOpen(false);
    } catch (error) {
      setIsLoadding(false);
    }
  };

  return (
    <>
    <Card>
      <Row>
            <Col span={24}>
              <Card>
                <Spin spinning={spinning}>
                  <Form form={form} {...formItemLayout} initialValues={{ noicapcmnd: "CA Tỉnh Nghệ An", congviec: "Lao động tự do"}}>
                    <Form.Item label="Mã khách hàng">
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item name="sodb" noStyle rules={[{ required: true, message: 'Vui lòng nhập trường này' }]}>
                            <Input
                              onChange={(e) => {
                                setMaKhachHang(e.target.value);
                              }}
                            ></Input>
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <Button
                            loading={loadingKhachhang}
                            onClick={onFilterClick}
                          >
                            Tra cứu khách hàng
                          </Button>
                        </Col>
                      </Row>
                    </Form.Item>
                    <div style={{ display: khachHang ? '' : 'none' }}>
                      <Divider style={{ marginTop: 0 }}>Thông tin khách hàng</Divider>
                      <Form.Item label="IDKH" style={{ marginBottom: 0 }}>
                        <span className="ant-form-text">{khachHang?.idkh}</span>
                      </Form.Item>
                      <Form.Item label="Danh bộ" style={{ marginBottom: 0 }}>
                        <span className="ant-form-text">{khachHang?.sodb}</span>
                      </Form.Item>
                      <Form.Item label="Tên khách hàng" style={{ marginBottom: 0 }}>
                        <span className="ant-form-text">{khachHang?.tenkh}</span>
                      </Form.Item>
                      <Form.Item label="Địa chỉ khách hàng" style={{ marginBottom: 0 }}>
                        <span className="ant-form-text">{khachHang?.diachi}</span>
                      </Form.Item>
                      <Form.Item label="Số điện thoại">
                        <span className="ant-form-text">{khachHang?.sdt}</span>
                        <Button type="primary" onClick={() => handleOpenModal()} style={{marginLeft: 50}}>
                            Thay đổi số điện thoại
                        </Button>
                      </Form.Item>
                      <Divider style={{ marginTop: 0 }}>Lịch sử sử dụng nước</Divider>
                      {htmlReport === undefined ? (
                        <Row style={{ marginTop: 20 }}>
                          <Col span={24}></Col>
                        </Row>
                      ) : (
                        <Spin spinning={isLoadding}>
                          <Row style={{ marginTop: 20 }}>
                            <Col span={24} style={{ alignItems: 'center', justifyContent: 'center', display: 'flex', border: '1px solid darkred', padding: '15px' }}>
                              <div dangerouslySetInnerHTML={{ __html: `${htmlReport}` }} />
                            </Col>
                          </Row>
                        </Spin>
                      )}
                    </div>
                  </Form>
                </Spin>
              </Card>
            </Col>
          </Row>
    </Card>
    <Modal
      title="Thay đổi số điện thoại"
      visible={isModalOpen}
      onOk={async () => {
        await onFinish(form.getFieldsValue());
      }}
      onCancel={handleCancel}
    >
      <Form {...modalLayout} form={form} name="control-hooks" onFinish={onFinish} style={{ maxWidth: 600 }}>
        <Form.Item name="soDienThoaiMoi" label="Số điện thoại mới" rules={[{ required: true }]}>
          <Input  />
        </Form.Item>
      </Form>
    </Modal>
    </>
  );
});
export default ScanHopDong;
