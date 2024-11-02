import { ReportInput } from './dto/reportInput';
import http from '../httpService';
import { InputGetAllDto } from '../dto/inputGetAllDto';
import { PagedResultTotalDto } from '../dto/pagedResultTotalDto';
import { ViewGCSReportDto } from './dto/viewGCSReportDto'
class ReportService {
  public async getDataReport(input: InputGetAllDto): Promise<PagedResultTotalDto<ViewGCSReportDto>> {
    let result = await http.get('api/services/app/Report/GetReportData', { params: input});
     return result.data.result;
  }
  public async exportReport(input: ReportInput): Promise<Blob> {
    let result = await http.post('api/services/app/Report/ExportReport', input, { 
      responseType: "blob",
      headers: {
        "Content-Type": "application/json",
      }
    });
    return result.data;
  }
  public async exportReportToHtml(input: ReportInput): Promise<any> {
    let result = await http.post('api/services/app/Report/PrintReportHtml', input);
    return result.data;
  }

  public async printReport(input: ReportInput): Promise<any> {
    let result = await http.post('api/services/app/Report/PrintReportHtml', input);
    console.log(result);
    return result.data;
  }
}
export default new ReportService();
