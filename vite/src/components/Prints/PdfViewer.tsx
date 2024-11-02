import { DownloadOutlined, PrinterOutlined } from "@ant-design/icons";
import { Button, Modal, Spin, message } from "antd";
import { useState } from "react";
import reportService from "../../services/reports/reportService";
import PrintDialog from "./PrintDialog";
import fileDownload from "js-file-download";
// var fileDownload = require("js-file-download");

interface IPdfViewerProps {
    url: any;
    parameters: any;
    title: any;
    type: any;
    visibleDownload: boolean;
    fileName: string;
    onPrintDone: () => void;
}

const PdfViewer = ({
    url,
    parameters,
    title,
    type,
    visibleDownload = false,
    fileName = "",
    onPrintDone = () => {},
}: IPdfViewerProps) => {
    const [content, setContent] = useState("");
    const [visible, setVisible] = useState(false);
    const [visiblePrint, setVisiblePrint] = useState(false);
    const [loading, setLoading] = useState(false);
    const downloadFileReport = async () => {
        if (url) {
            setLoading(true);
            try {
                var data = await reportService.exportReportToHtml({
                    reportPath: url,
                    format: "MHTML",
                    page: 0,
                    parameters: parameters,
                });
                setContent(data.result);
                setLoading(false);
            } catch (e) {
                message.error("Đã có lỗi xảy ra!");
                setLoading(false);
            }
        }
    };
    const downloadFileExcel = async () => {
        const modal = Modal.success({
            title: "Tải file " + fileName,
            content: <Spin tip="Đang tải file"></Spin>,
        });

        var data = await reportService.exportReport({
            reportPath: url,
            format: "XLMS",
            page: 0,
            parameters: parameters,
        });
        fileDownload(data, fileName + Date.now() + ".xlsx");
        setTimeout(() => {
            modal.destroy();
        }, 1000);
    };
    return (
        <>
            <Button
                type={type}
                onClick={() => {
                    setVisible(true);
                    downloadFileReport();
                }}
            >
                {title}
            </Button>
            <Modal
                maskClosable={false}
                onCancel={() => {
                    setVisible(false);
                }}
                open={visible}
                width={"90%"}
                bodyStyle={{ height: 600, overflowY: "auto" }}
                style={{ top: 20 }}
                footer={[
                    <Button
                        key="1"
                        shape="round"
                        icon={<PrinterOutlined />}
                        onClick={() => {
                            setVisiblePrint(true);
                        }}
                    >
                        In File
                    </Button>,
                    <Button
                        key="2"
                        shape="round"
                        icon={<DownloadOutlined />}
                        style={{ display: visibleDownload ? "" : "none" }}
                        onClick={async () => {
                            await downloadFileExcel();
                        }}
                    >
                        Tải File Excel
                    </Button>,
                    <Button
                        key="3"
                        type="primary"
                        onClick={() => {
                            setVisible(false);
                        }}
                    >
                        Đóng
                    </Button>,
                ]}
            >
                <Spin spinning={loading}>
                    <div style={{ whiteSpace: "pre-wrap" }} dangerouslySetInnerHTML={{ __html: content }}></div>
                </Spin>
            </Modal>
            <PrintDialog
                url={url}
                parameters={parameters}
                visible={visiblePrint}
                onPrintDone={() => {
                    setVisiblePrint(false);
                    onPrintDone();
                }}
            ></PrintDialog>
        </>
    );
};
export default PdfViewer;
