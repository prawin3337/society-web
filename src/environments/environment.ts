// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const apiDomain = "http://localhost:3000";

export const environment = {
  production: false,
  apis: {
    login: `${apiDomain}/api/login`,
    auth: `${apiDomain}/api/auth`,
    members: `${apiDomain}/api/members`,
    validatePan: `${apiDomain}/api/login/validate-pan`,
    updatePassword: `${apiDomain}/api/auth/update-password`,
    flatNos: `${apiDomain}/api/flats`,
    transaction: `${apiDomain}/api/transaction`,
    transactionAll: `${apiDomain}/api/transaction/all`,
    transactionApprove: `${apiDomain}/api/transaction/approve`,
    transactionOverview: `${apiDomain}/api/transaction/overview`,
    maintenanceAll: `${apiDomain}/api/maintenance/all`,
    pettyCashAll: `${apiDomain}/api/petty-cash/all`,
    pettyCash: `${apiDomain}/api/petty-cash`,
    pettyCashSummary: `${apiDomain}/api/petty-cash/summary`
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
