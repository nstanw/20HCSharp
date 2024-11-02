import { observer } from "mobx-react";
import React, { useState } from "react";
//import Carousel, { Modal, ModalGateway } from 'react-images';
import Viewer from "react-viewer";
import { ImageDecorator } from "react-viewer/lib/ViewerProps";
import AppConsts from "../../utils/appconst";

interface IPhieuYeuCauLogImageProps {
    phieuYeuCauLog: any;
}

const PhieuYeuCauLogImage = observer(({ phieuYeuCauLog }: IPhieuYeuCauLogImageProps) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [images, setImages] = React.useState<ImageDecorator[]>([]);

    return phieuYeuCauLog.loaiNoiDung === "IMAGE" ? (
        <>
            <p>{phieuYeuCauLog.noiDung}</p>
            <img
                alt={phieuYeuCauLog.noiDung}
                src={AppConsts.remoteServiceBaseUrl + phieuYeuCauLog.path}
                onClick={() => {
                    setImages([]);
                    const items: ImageDecorator[] = [];
                    items.push({
                        src: AppConsts.remoteServiceBaseUrl + phieuYeuCauLog.path,
                        alt: "Ảnh",
                    });
                    setImages(items);
                    setModalIsOpen(true);
                }}
                style={{
                    cursor: "pointer",
                    maxWidth: "300px",
                    maxHeight: "300px",
                }}
            />
            {/* <ModalGateway>
        {modalIsOpen ? (
          <Modal onClose={() => setModalIsOpen(false)}>
            <Carousel views={[{ source: AppConsts.remoteServiceBaseUrl + phieuYeuCauLog.path }]} />
          </Modal>
        ) : null}
      </ModalGateway> */}
            <Viewer
                visible={modalIsOpen}
                onClose={() => {
                    setModalIsOpen(false);
                    setImages([]);
                }}
                images={images}
            />
        </>
    ) : (
        <>
            <p>{phieuYeuCauLog.noiDung}</p>
            <a href={AppConsts.remoteServiceBaseUrl + phieuYeuCauLog.path} download target="_blank">
                Tải file: {phieuYeuCauLog.fileName}
            </a>
        </>
    );
});
export default PhieuYeuCauLogImage;
