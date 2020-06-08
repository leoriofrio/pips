// All the constants goes here
export namespace AppKeys {
  export const DEFAULT_PROFORMS_NAME = 'proforma';
  export const DEFAULT_SAMPLES_NAME = "muestra";
}

export enum AppStatusForm {
  active = 'Active',
  inactive = 'Inactive',
  inProgress = 'In Progress',
  acepted = 'Acepted'
}

export namespace ApiKeys {
  export const API_URL = "http://104.210.146.134:3000/";
  //export const API_URL = "http://localhost:3000/";
}

export namespace TitleNames {
  export const PROJECT_NAME = 'Plataforma de Ingreso de Proformas, Muestras y Revisión de productos';
}

export namespace TypeRegion {
  export const SIERRA = 'Sierra';
  export const COSTA = 'Costa';
}

export namespace ExcelKeys {
  export const DEFAULT_EXCEL_NAME = "file";
  export const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  export const EXCEL_EXTENSION = '.xlsx';
  export const EXCEL_TITLE_FONT = 'Arial';
  export const EXCEL_TITLE_FAMILY = 4;
  export const EXCEL_TITLE_SIZE = 16;
  export const EXCEL_TITLE_UNDERLINE = 'none';
  export const EXCEL_HEADER_FGCOLOR = '';
  export const EXCEL_HEADER_BGCOLOR = '#FFFFFF';
  export const EXCEL_DETAIL_CELL = 'cell';
  export const EXCEL_DETAIL_METADATA = 'metadata';
  export const EXCEL_DETAIL_FIELD = 'field';
  export const EXCEL_DETAIL_COLOR = 'color';
  export const EXCEL_DETAIL_FORMULA = 'formula';
  export const EXCEL_CELL_TYPE = 'pattern';
  export const EXCEL_CELL_PATTERN = 'solid';
  export const EXCEL_EXPORT_TYPE = 'excel';
}


export namespace Proform {
  export const ID = {prop: 'id', name: 'Id'};
  export const NUMBER_PROFORM = {prop: 'number_proform', name: 'Número'};
  export const USER_ID = {prop: 'user_id', name: 'Vendedor'};
  export const COLLEGE_ID = {prop: 'college_id', name: 'Colegios'};
  export const CLIENT_ID = {prop: 'client_id', name: 'Clientes'};
  export const DATE_PROFORM = {prop: 'date_proform', name: 'Fecha Registro'};
  export const DATE_DELIVERY = {prop: 'date_delivery', name: 'Fecha Entrega'};
  export const TYPE_CLIENT_SALE = {prop: 'type_client_sale', name: 'Canal de Venta'};
  export const AGREEMENT = {prop: 'agreement', name: 'Convenio'};
  export const STATUS = {prop: 'status', name: 'Estado'};
  export const STATE_NUMBER = {prop: 'state_number', name: 'Versión'};
 
}

export namespace ProformDetail {
  export const ID = {prop: 'id', name: 'Id'};
  export const PROFORM_ID = {prop: 'proform_id', name: 'proform_id'};
  export const DEGREE = {prop: 'degree', name: 'Grado'};
  export const PRODUCT_ID = {prop: 'product_id', name: 'product_Id'};
  export const QUANTITY = {prop: 'quantity', name: 'Cantidad'};
  export const PRICE = {prop: 'price', name: 'Precio'};
  export const SUB_TOTAL = {prop: 'subtotal', name: 'Subtotal'};
  export const SALE_DIRECT = {prop: 'sale_direct', name: 'DIRECTO'};
  export const SALE_EXTERNAL_LIBRARY = {prop: 'sale_external_library', name: 'LIBRERÍA EXTERNA'};
  export const SALE_EVENT = {prop: 'sale_event', name: 'Material Promocional Premios para eventos'};
  export const SALE_TEACHER = {prop: 'sale_teacher', name: 'Material Promocional para profesores'};
  export const SALE_INFRASTRUCTURE = {prop: 'sale_infrastructure', name: 'Infraestructura PLANTEL'};
  export const SALE_SCHOLARSHIPS = {prop: 'sale_scholarships', name: 'Becas PLANTEL'};
  export const SALE_STAFF = {prop: 'sale_staff', name: 'Equipos PLANTEL'};
  export const SALE_TRAINING = {prop: 'sale_training', name: 'Capacitación PLANTEL'};
  export const TOTAL = {prop: 'total', name: 'Total'};
}

export namespace TypeClientSale {
  export const TYPE_SALE = [
    {label: 'Directa',  value: 'Directa'},
    {label: 'Libreria',  value: 'Libreria'}
  ];
}

export namespace Agreement {
  export const TYPE_AGREEMENT = [
    {label: 'Nuevo',  value: 'Nuevo'},
    {label: 'Anterior',  value: 'Anterior'}
  ];
}

export namespace ProductColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const COD = {prop: 'cod', name: 'Cod'};
  export const SUBLINE = {prop: 'subline', name: 'Sublínea'};  
  export const DESCRIPTION = {prop: 'description', name: 'Descripción'};
  export const SERIE = {prop: 'serie', name: 'Serie'};
  export const NIVEL = {prop: 'nivel', name: 'Nivel Educación'};
  export const DEGREE = {prop: 'degree', name: 'Grado'};  
  export const BUSINESS_LINE = {prop: 'businessLine', name: 'Linea Negocios'};
  export const ISBN = {prop: 'isbn', name: 'ISBN'};
  export const REGION = {prop: 'region', name: 'Región'};
  
}

export namespace CollegesColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const COD_SANTILLANA = {prop: 'codSantillana', name: 'Código Santillana'};
  export const COD_INSTITUTO = {prop: 'codInstituto', name: 'Código Instituto'};
  export const STATUS = {prop: 'status', name: 'Status'};
  export const DELEGATE_TEXT = {prop: 'delegateText', name: 'Delegado Texto y LQL'};
  export const DELEGATE_ENGLISH = {prop: 'delegateEnglish', name: 'Delegado Inglés'};
  export const DELEGATE_SHARED = {prop: 'delegateShared', name: 'Delegado Compartir'};
  export const PROVINCE = {prop: 'province', name: 'Provincia'};
  export const CANTON = {prop: 'canton', name: 'Cantón'};
  export const PARISH = {prop: 'parish', name: 'Parroquia'};
  export const NAME = {prop: 'name', name: 'Nombre Institución'};
  export const ADDRESS = {prop: 'address', name: 'Dirección Institución'};
  export const NIVEL = {prop: 'nivel', name: 'Nivel Educación'};
  export const TYPE = {prop: 'type', name: 'Tipo'};
  export const SCHOOL_SYSTEM = {prop: 'schoolSystem', name: 'Régimen Escolar'};
  export const MODALITY = {prop: 'modality', name: 'Modalidad'};
  export const SCHOOL_DAY = {prop: 'schoolDay', name: 'Jornada'};
  export const REGION_ID = {prop: 'region', name: ''};
}

export namespace ClientColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const COD_CLIENT = {prop: 'codClient', name: 'Código'};
  export const PROVINCE = {prop: 'province', name: 'Provincia'};
  export const CITY = {prop: 'city', name: 'Ciudad'};
  export const NAME = {prop: 'name', name: 'Nombre cliente'};
  export const NICKNAME = {prop: 'nickName', name: 'Alias'};
  export const TYPE = {prop: 'type', name: 'Tipo'};
  export const STATUS = {prop: 'status', name: 'Status'};
}

export namespace UserColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const COD_USER = {prop: 'codUser', name: 'Código'};
  export const REGION = {prop: 'region', name: 'Región'};
  export const NAME = {prop: 'name', name: 'Nombre Completo'};
  export const USER_NAME = {prop: 'userName', name: 'Delegado'};
  export const PASSWORD = {prop: 'password', name: 'Clave'};
  export const ZONE = {prop: 'zone', name: 'Zona'};
  export const PHONE = {prop: 'phone', name: 'Teléfono'};
  export const MAIL = {prop: 'mail', name: 'Correo'};
  export const POSITION = {prop: 'position', name: 'Cargo'};
  export const STATUS = {prop: 'status', name: 'Estado'};
}


export namespace WorkflowServiceConstants {
  export const WORKFLOW_STATES = {
    blank: 'BLANK',
    administrator: {prop: 'ADMINISTRADOR', name: 'Administrador'},
    seller: {prop: 'VENDEDOR', name: 'Vendedor'},      
    reviewer: {prop: 'REVISOR', name: 'Revisor'},
    approval: {prop: 'APROBADOR', name: 'Aprobador'},
    setting: {prop: 'CONFIGURADOR', name: 'Configurador'},
    complete: 'COMPLETE'
  };
}

export const USER_ROLES = {
  SELLER: 'user',
  ADMIN: 'admins',
  REVIEWER: 'reviewer',
  APPROVAL: 'approval',
  SETTING: 'setting',
  REPORTS: 'reports',    
};

export namespace RoutesKeys {
  export const USERS = 'user';
  export const PROFORMS = 'proform';
  export const SAMPLES = 'sample';
  export const PRICE = 'price';
  export const PRODUCT_PROFORM = 'product-proform';
  export const PRODUCT_SAMPLE = 'product-sample';
  export const LOGIN = 'login';
  export const LOGOUT = 'logout';
  export const REPORT = 'report';    
}

export namespace RoutePathsKeys {
  export const USERS = '/user';
  export const PROFORMS = '/proform';
  export const SAMPLES = '/sample';
  export const PRICE = '/price';
  export const PRODUCT_PROFORM = '/product-proform';
  export const PRODUCT_SAMPLE = '/product-sample';
  export const LOGIN = '/login';
  export const LOGOUT = '/logout';
  export const REPORT = '/report';    
}

export const FilesType = {
  images: ["jpg", "jpeg", "png", "bmp", "gif"],
  documents: ["odt", "txt", "doc", "docx", "ppt", "pptx", "xls", "xlsx","pdf"],
  get all() {
    return [...this.images, ...this.documents]
  },
  mockImage: "https://mdbootstrap.com/img/Photos/Others/forest-sm.jpg"
}

export const ValidatesPattern = {
  alphanumeric: "[a-zA-Z0-9\\s]+"
}