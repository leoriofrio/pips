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

  export interface DataType {
    label: any,
    value: any;
  }

  export interface IProform {
    id: number;
    number_proform: string;
    user_id: number;
    college_id: string;
    client_id: string;
    date_proform: string;
    date_delivery: string;
    type_client_sale: string;
    agreement: string;
    status: string;
    state_number: number;
  }

  export interface IProformDetail {
    id: 0,
    degree: "string",
    quantity: 0,
    price: 0,
    sale_direct: 0,
    sale_donation: 0,
    sale_external_library: 0,
    sale_event: 0,
    sale_teacher: 0,
    sale_infrastructure: 0,
    sale_scholarships: 0,
    sale_staff: 0,
    sale_training: 0,
    capex: 0,
    proform_id: 0,
    product_id: 0
  };

  export interface PROFORM_SUMMARY  {    
    quantity: 0,
    subtotal:0,
    sale_direct: number,
    sale_donation: number,
    sale_external_library: number,
    sale_event: number,
    sale_teacher: number,
    sale_infrastructure: number,
    sale_scholarships: number,
    sale_staff: number,
    sale_training: number,
    capex: number,
    total:0,
  };

  export const MODEL_DETAIL = {
    "id": 0,
    "degree": "string",
    "codigo": "",
    "product_id": 0,
    "quantity": 0,
    "price": 0,
    "subtotal":0,
    "total":0,
    "sale_direct": 0,
    "sale_donation": 0,
    "sale_external_library": 0,
    "sale_event": 0,
    "sale_teacher": 0,
    "sale_infrastructure": 0,
    "sale_scholarships": 0,
    "sale_staff": 0,
    "sale_training": 0,
    "capex": 0,
    "quantity_check": 0,
  };


  export const MODEL_DETAIL_SAVE = {
    "id": 0,
    "degree": "string",
    "quantity": 0,
    "price": 0,
    "sale_direct": 0,
    "sale_donation": 0,
    "sale_external_library": 0,
    "sale_event": 0,
    "sale_teacher": 0,
    "sale_infrastructure": 0,
    "sale_scholarships": 0,
    "sale_staff": 0,
    "sale_training": 0,
    "capex": 0,
    "proform_id": 0,
    "product_id": 0,
    "quantity_check": 0,
  };
  

  