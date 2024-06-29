// const apiDomain = "https://ancient-newt-34.telebit.io";
// const apiDomain = "https://62ba-2405-201-1018-40ea-e65f-1ff-fe49-ae5c.ngrok-free.app";
const apiDomain = "http://192.168.0.7:3000";

export const environment = {
  production: true,
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
