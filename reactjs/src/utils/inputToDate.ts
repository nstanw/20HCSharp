export function inputToDate(value:string): string {
    let ngayLamViec = String(value);
    let ngayLamViecs = ngayLamViec.split("/")
    if (ngayLamViecs.length!==3) {
        throw "Vui lòng nhập đúng định dạng ngày tháng"
    } else {
        let ngayLamViecMonth = Number(ngayLamViecs[1]);
        let ngayLamViecYear = Number(ngayLamViecs[2]);
        let ngayLamViecDay = Number(ngayLamViecs[0]);

        if (ngayLamViecMonth <= 0 || ngayLamViecMonth > 12) {
            throw("Vui lòng nhập đúng tháng")
        } else if (ngayLamViecYear <= 0) {
            throw("Vui lòng nhập đúng năm")
        } else if (ngayLamViecDay <= 0 || ngayLamViecDay > 31) {
            throw("Vui lòng nhập đúng ngày")
        }
        return ngayLamViecYear + '-' + ngayLamViecMonth + '-' + ngayLamViecDay
    }
}
