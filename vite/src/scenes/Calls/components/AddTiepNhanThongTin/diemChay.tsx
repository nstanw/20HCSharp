import { Button, Checkbox, Form, Input, message, Modal, Select, Spin } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { observer } from "mobx-react";
import { Coordinate } from "ol/coordinate";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import AllNhanVienSelect from "../../../../components/NhanViens/AllNhanVienSelect";
import { useStore } from "../../../../helpers/use-store";
import CreateSuaChuaSuCoInput from "../../../../models/TiepNhanThongTins/createSuaChuaSuCoInput";
import DialogBanDo from "./dialogBanDo";
const { Option } = Select;

interface IDiemChayProps {
    linkedID: string;
    tenKhachHang?: string;
    soDienThoai?: string;
    onSuccess?: () => void;
}

export type TXacNhanDinhViDiemChayProps = {
    coordinateDiemChay: Coordinate;
    addressDiemChay: string;
    soNha: string;
    tenDuongPho: string;
    maDuongPho: string;
    tenKhoi: string;
    maKhoi: string;
};

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
const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
};

const DiemChay = observer(({ linkedID, onSuccess, tenKhachHang = "", soDienThoai = "" }: IDiemChayProps) => {
    const navigate = useNavigate();
    const [spinning, setSpinning] = useState(false);
    const [bIsVisibleBanDo, setIsVisibleBanDo] = useState<boolean>(false);
    const [bIsKhachHangBaoTin, setIsKhachHangBaoTin] = useState<boolean>(true);
    const [dataMap, setDataMap] = useState<{
        soNha: string;
        maDuongPho: string;
        viTriDiemChayOfBanDo: string;
        maKhoi: string;
        pointLat: number;
        pointLon: number;
    }>({
        soNha: "",
        maDuongPho: "",
        viTriDiemChayOfBanDo: "",
        maKhoi: "",
        pointLat: 0,
        pointLon: 0,
    });
    const [diaChiKhaiBao, setDiaChiKhaiBao] = useState<string>("");
    const { tiepNhanThongTinStore } = useStore();
    const [form] = Form.useForm();

    const convertDiaChi = useCallback((data: TXacNhanDinhViDiemChayProps): string => {
        if (!!!data.soNha && !!!data.tenDuongPho && !!!data.tenKhoi) return "Hãy định vị trên bản đồ để chọn địa chỉ";
        const soNha = data.soNha ? `${data.soNha} - ` : "";
        const tenDuong = data.tenDuongPho ? `${data.tenDuongPho} - ` : "";
        const tenKhoi = data.tenKhoi || "";
        return `${soNha}${tenDuong}${tenKhoi}`;
    }, []);

    const onFinish = useCallback(
        (values: any) => {
            // if (!dataMap.soNha) {
            //     message.error("Vui lòng nhập số nhà của điểm chảy");
            //     return;
            // }
            // if (!dataMap.maDuongPho) {
            //     message.error("Vui lòng nhập tên đường của điểm chảy");
            //     return;
            // }
            if (!dataMap.maKhoi) {
                message.error("Vui lòng nhập tên phường, xã của điểm chảy");
                return;
            }
            if (!dataMap.viTriDiemChayOfBanDo || !dataMap.pointLat || !dataMap.pointLon) {
                message.error("Vui lòng chọn vị trí điểm chảy trên bản đồ");
                return;
            }
            setSpinning(true);
            Modal.confirm({
                title: "Xác nhận yêu cầu",
                content: "Bạn chắc chắn muốn gửi yêu cầu sửa chữa sự cố ?",
                onOk: async () => {
                    try {
                        const input = {
                            ...new CreateSuaChuaSuCoInput(),
                            linkedID,
                            hoTen: values.hoTen,
                            soDienThoai: values.soDienThoai,
                            tinhTrangSuCo: values.tinhTrangSuCo,
                            soNha: dataMap.soNha || null,
                            maDuongPho: dataMap.maDuongPho || null,
                            viTriDiemChayOfBanDo: dataMap.viTriDiemChayOfBanDo,
                            maNhanVienBaoTin: !bIsKhachHangBaoTin ? values.maNhanVienBaoTin.value : null,
                            maKhoi: dataMap.maKhoi,
                            madb: values.madb,
                            pointLat: dataMap.pointLat,
                            pointLon: dataMap.pointLon,
                        };
                        await tiepNhanThongTinStore.createSuaChuaSuCo(input);
                        message.success("Tạo yêu cầu thành công");
                        form.resetFields();
                        setDiaChiKhaiBao("");
                        onSuccess && onSuccess();
                        navigate("/tiepNhanThongTins");
                    } catch (error) {
                        console.log("Failed: ", error);
                    }
                },
            });
            setSpinning(false);
        },
        [dataMap, form, linkedID, tiepNhanThongTinStore, bIsKhachHangBaoTin, onSuccess, navigate]
    );

    const handleOpenMap = useCallback(() => {
        setIsVisibleBanDo(true);
    }, []);

    const handleXacNhanDinhViDiemChay = useCallback(
        (data: TXacNhanDinhViDiemChayProps) => {
            setIsVisibleBanDo(false);
            setDiaChiKhaiBao(convertDiaChi(data));
            setDataMap({
                soNha: data.soNha,
                maDuongPho: data.maDuongPho,
                viTriDiemChayOfBanDo: data.addressDiemChay,
                maKhoi: data.maKhoi,
                pointLat: data.coordinateDiemChay[1],
                pointLon: data.coordinateDiemChay[0],
            });
        },
        [convertDiaChi]
    );

    return (
        <>
            <Spin spinning={spinning}>
                <Form
                    form={form}
                    {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{ hoTen: tenKhachHang, soDienThoai: soDienThoai }}
                >
                    <Form.Item label="Họ tên người báo" name="hoTen">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Số điện thoại khách hàng" name="soDienThoai">
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Địa bàn"
                        name="madb"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <Select>
                            <Option value="VI">XN DVCN</Option>
                            <Option value="11">Trạm Anh Sơn</Option>
                            <Option value="12">Trạm Con Cuông</Option>
                            <Option value="13">Trạm Đô Lương</Option>
                            <Option value="14">Trạm Quỳ Châu</Option>
                            <Option value="15">Trạm Quỳ Hợp</Option>
                            <Option value="16">Trạm Tân Kỳ</Option>
                            <Option value="17">Trạm Thanh Chương</Option>
                            <Option value="18">Trạm Tương Dương</Option>
                            <Option value="19">Trạm Kỳ Sơn</Option>
                            <Option value="21">Trạm Nam đàn</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="" name="khachHang" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                        <Checkbox
                            defaultChecked={bIsKhachHangBaoTin}
                            onChange={() => setIsKhachHangBaoTin(!bIsKhachHangBaoTin)}
                        >
                            Khách hàng báo tin
                        </Checkbox>
                    </Form.Item>
                    {!bIsKhachHangBaoTin && (
                        <Form.Item
                            label="Nhân viên báo tin"
                            name="maNhanVienBaoTin"
                            rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                        >
                            <AllNhanVienSelect />
                        </Form.Item>
                    )}
                    <Form.Item label="Định vị">
                        <Button
                            type="default"
                            onClick={handleOpenMap}
                            style={{ border: "solid 1px #2EB609", color: "#2EB609" }}
                        >
                            Định vị trên bản đồ
                        </Button>
                    </Form.Item>
                    <Form.Item label="Địa chỉ" name="DiaChiLapDatMoi_SoNha">
                        {diaChiKhaiBao || (
                            <div
                                style={{
                                    color: "#b3b3b3",
                                    fontStyle: "italic",
                                    fontSize: "14px",
                                }}
                            >
                                Hãy định vị trên bản đồ để chọn địa chỉ
                            </div>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="Tình trạng sự cố"
                        name="tinhTrangSuCo"
                        rules={[{ required: true, message: "Vui lòng nhập trường dữ liệu này!" }]}
                    >
                        <TextArea style={{ width: "100%" }} rows={4} />
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </Form.Item>
                </Form>
            </Spin>
            <DialogBanDo
                visible={bIsVisibleBanDo}
                onDone={(data: TXacNhanDinhViDiemChayProps) => handleXacNhanDinhViDiemChay(data)}
                onCancel={() => setIsVisibleBanDo(false)}
            />
        </>
    );
});

export default DiemChay;
