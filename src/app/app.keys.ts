// All the constants goes here
export namespace AppKeys {
  export const DEFAULT_PROFORMS_NAME = 'proforma';
  export const DEFAULT_SAMPLES_NAME = "muestra"
}

export namespace TitleNames {
  export const PROJECT_NAME = 'Plataforma de Ingreso de Proformas, Muestras y Revisión de productos';
}

export namespace ProductColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const SUBLINE = {prop: 'subline', name: 'Sublínea'};
  export const COD = {prop: 'cod', name: 'Cod'};
  export const DESCRIPTION = {prop: 'description', name: 'Descripción'};
  export const STATUS = {prop: 'status', name: 'Estado'};
  export const STOCK = {prop: 'stock', name: 'Stock'};
  export const DEGREE = {prop: 'degree', name: 'Grado'};
  export const BUSINESS_LINE = {prop: 'businessLine', name: 'Linea Negocios'};
  export const ISBN = {prop: 'isbn', name: 'ISBN'};
  export const REGION_ID = {prop: 'region_id', name: 'Región'}
}

export namespace ClientColumns {
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
  export const REGION_ID = {prop: 'region_id', name: ''};
}

export namespace UserColumns {
  export const ID = {prop: 'id', name: 'Id'};
  export const EMAIL = {prop: 'email', name: 'Email'};
  export const FIRST_NAME = {prop: 'firstName', name: 'Nombre'};
  export const LAST_NAME = {prop: 'lastName', name: 'Apellido'};
  export const PASSWORD = {prop: 'password', name: 'Clave'};
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
  