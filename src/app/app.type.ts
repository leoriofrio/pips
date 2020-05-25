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

  export interface IProform {
    id: number;
    number_proform: string;
    user_id: number;
    colleges_id: string;
    client_id: string;
    date_proform: string;
    date_delivery: string;
    type_client_sale: string;
    agreement: string;
    status: string;
    state_number: number;
  }