export type GridRecord = {
    id: string;
    name: string;
    carBudget: number;
    bikeBudget: number;
    ptBudget: number;
    totalBudget: number;
  }

  export interface UploadInformation {
    deadline: Date;
    description: string;
  }

  export interface FileUpload {
    name?: string;
    url?: string;
    description?: string;
    date?: Date;
    user?: string;
    icon?: string;
  }

  export interface DataUpload {
    payPlanPeriod: any;
    route?: string;
  }