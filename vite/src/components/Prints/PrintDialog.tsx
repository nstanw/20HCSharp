import * as React from "react";
import { observer } from "mobx-react";
import reportService from "../../services/reports/reportService";
import { Modal, Spin, Row, Col, message } from "antd";
import printJS from "print-js";
// var printJS = require("print-js");

interface IPrintDialogProps {
    url: any;
    parameters: any;
    onPrintDone: () => void;
    visible: boolean;
}

const PrintDialog = observer(({ url, parameters, onPrintDone, visible }: IPrintDialogProps) => {
    React.useEffect(() => {
        downloadFileReport();
    }, [visible]);
    const downloadFileReport = async () => {
        if (visible) {
            const modal = Modal.success({
                title: "Tải file",
                content: (
                    <Spin tip="Đang tải file">
                        <Row>
                            <Col span={24}></Col>
                        </Row>
                    </Spin>
                ),
            });
            try {
                var data = await reportService.exportReport({
                    reportPath: url,
                    format: "PDF",
                    page: 0,
                    parameters: parameters,
                });
                var pdfUrl = URL.createObjectURL(data);
                //window.open(pdfUrl);
                printJS({
                    printable: pdfUrl,
                    onPrintDialogClose: () => {
                        //console.log('Close dialog');
                        modal.destroy();
                    },
                    onLoadingEnd: () => {
                        onPrintDone();

                        //console.log('on loadding end');
                    },
                });
            } catch (e) {
                message.error("Đã có lỗi xảy ra!");
            }
        }
    };
    return <></>;
});

export default PrintDialog;
