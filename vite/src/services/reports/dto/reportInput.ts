export interface ReportInput {
    reportPath: string;
    page: number;
    format: string;
    parameters: { [key: string]: string | null; } | undefined;
}

