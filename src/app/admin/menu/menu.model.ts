import {USER_ROLES, RoutePathsKeys} from '../../app.keys';
export const WORKFLOW_MENU = [
    {
      roles: [USER_ROLES.ADMIN],
      route: RoutePathsKeys.USERS,
      item: 'Usuarios'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SELLER, USER_ROLES.REVIEWER],
      route: RoutePathsKeys.PROFORMS,
      item: 'Proformas'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SELLER, USER_ROLES.REVIEWER],
      route: RoutePathsKeys.SAMPLES,
      item: 'Muetras'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SETTING],
      route: RoutePathsKeys.PRICE,
      item: 'Precios'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SETTING],
      route: RoutePathsKeys.PRODUCT_PROFORM,
      item: 'Productos Proformas'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SETTING],
      route: RoutePathsKeys.PRODUCT_SAMPLE,
      item: 'Productos Muestras'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SETTING, USER_ROLES.SELLER, USER_ROLES.REVIEWER, USER_ROLES.REPORTS, USER_ROLES.APPROVAL],
      route: RoutePathsKeys.LOGIN,
      item: 'Ingresar'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.SETTING, USER_ROLES.SELLER, USER_ROLES.REVIEWER, USER_ROLES.REPORTS, USER_ROLES.APPROVAL],
      route: RoutePathsKeys.LOGOUT,
      item: 'Salir'
    },
    {
      roles: [USER_ROLES.ADMIN, USER_ROLES.REVIEWER, USER_ROLES.REPORTS, USER_ROLES.APPROVAL],
      route: RoutePathsKeys.REPORT,
      item: 'Reportes'
    }
  ];