// All the constants goes here
export namespace AppKeys {
  export const DEFAULT_PROFORMS_NAME = 'proforma';
  export const DEFAULT_SAMPLES_NAME = "muestra"
}

export namespace TitleNames {
  export const PROJECT_NAME = 'Plataforma de Ingreso de Proformas, Muestras y Revisión de productos';
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
  