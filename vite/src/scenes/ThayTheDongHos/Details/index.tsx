import { useParams } from 'react-router-dom';
import { Col, Card, Row,  Spin } from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../helpers/use-store';
import PhieuYeuCauLogs from '../../../components/PhieuYeuCaus/phieuYeuCauLogs';
import PhieuYeuCauCongViecs from '../../../components/PhieuYeuCaus/phieuYeuCauCongViecs';
import ThayTheDongHoDetailTrangThaiXuLy from '../components/trangThaiXuLy';
import ThayTheDongHoDetailThongTinThoiGianKhaoSat from '../components/thongTinThoiGianKhaoSat';
import ThayTheDongHoDetailThongTinKhachHang from '../components/thongTinKhachHang';

const ThayTheDongHoDetail = observer(() => {
  const { thayTheDongHoStore, sessionStore } = useStore();
  const { maddk } = useParams<{ maddk: string }>();
  const { thayTheDongHoDetail } = thayTheDongHoStore;
  const [isLoadding, setIsLoadding] = useState(true);
  
  React.useEffect(() => {
    sessionStore.title = 'Biên bản kiểm tra hiện trường và dự toán';
    sessionStore.subTitle = '';
    document.title = 'Biên bản kiểm tra hiện trường và dự toán';
  }, []);

  React.useEffect(() => {
    (async function run() {
      setIsLoadding(true);
      await thayTheDongHoStore.getViewThayTheDongHo(maddk!);
      setIsLoadding(false);
    })();
  }, [maddk]);

  return (
    <Card>
      <Col>
        <Row>
          <Spin spinning={isLoadding}>
            <ThayTheDongHoDetailTrangThaiXuLy thayTheDongHoDetail={thayTheDongHoDetail} />
            <ThayTheDongHoDetailThongTinThoiGianKhaoSat thayTheDongHoDetail={thayTheDongHoDetail} />
            <ThayTheDongHoDetailThongTinKhachHang thayTheDongHoDetail={thayTheDongHoDetail} />
          </Spin>
        </Row>
        <Row>
          <Col span={12}>
            <PhieuYeuCauCongViecs phieuYeuCauID={thayTheDongHoDetail.phieuYeuCauID}></PhieuYeuCauCongViecs>
          </Col>
          <Col span={12}>
            <PhieuYeuCauLogs phieuYeuCauID={thayTheDongHoDetail.phieuYeuCauID}></PhieuYeuCauLogs>
          </Col>
        </Row>
      </Col>
    </Card>
  );
});
export default ThayTheDongHoDetail;
