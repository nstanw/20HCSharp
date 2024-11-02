import { useParams } from 'react-router-dom';
import { Col, Card, Row, Spin } from 'antd';
import React, { useState } from 'react';
import { observer } from 'mobx-react';
import { useStore } from '../../../helpers/use-store';
import PhieuYeuCauLogs from '../../../components/PhieuYeuCaus/phieuYeuCauLogs';
import PhieuYeuCauCongViecs from '../../../components/PhieuYeuCaus/phieuYeuCauCongViecs';
import CaiTaoDongHoDetailTrangThaiXuLy from '../components/trangThaiXuLy';
import CaiTaoDongHoDetailThongTinThoiGianKhaoSat from '../components/thongTinThoiGianKhaoSat';
import CaiTaoDongHoDetailThongTinKhachHang from '../components/thongTinKhachHang';

const CaiTaoDongHoDetail = observer(() => {
  const { caiTaoDongHoStore, sessionStore } = useStore();
  const { maddk } = useParams<{ maddk: string }>();
  const { caiTaoDongHoDetail } = caiTaoDongHoStore;
  const [isLoadding, setIsLoadding] = useState(true);

  React.useEffect(() => {
    sessionStore.title = 'Biên bản kiểm tra hiện trường và dự toán';
    sessionStore.subTitle = '';
    document.title = 'Biên bản kiểm tra hiện trường và dự toán';
  }, []);

  React.useEffect(() => {
    (async function run() {
      setIsLoadding(true);
      await caiTaoDongHoStore.getViewCaiTaoDongHo(maddk!);
      setIsLoadding(false);
    })();
  }, [maddk]);

  return (
    <Card>
      <Col>
        <Row>
          <Spin spinning={isLoadding}>
            <CaiTaoDongHoDetailTrangThaiXuLy caiTaoDongHoDetail={caiTaoDongHoDetail} />
            <CaiTaoDongHoDetailThongTinThoiGianKhaoSat caiTaoDongHoDetail={caiTaoDongHoDetail} />
            <CaiTaoDongHoDetailThongTinKhachHang caiTaoDongHoDetail={caiTaoDongHoDetail} />
          </Spin>
        </Row>
        <Row>
          <Col span={12}>
            <PhieuYeuCauCongViecs phieuYeuCauID={caiTaoDongHoDetail.phieuYeuCauID}></PhieuYeuCauCongViecs>
          </Col>
          <Col span={12}>
            <PhieuYeuCauLogs phieuYeuCauID={caiTaoDongHoDetail.phieuYeuCauID}></PhieuYeuCauLogs>
          </Col>
        </Row>
      </Col>
    </Card>
  );
});
export default CaiTaoDongHoDetail;
