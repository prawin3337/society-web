const apiDomain = "https://ancient-newt-34.telebit.io";

export const environment = {
  production: true,
  apis: {
    login: `${apiDomain}/api/login`,
    auth: `${apiDomain}/api/auth`,
    members: `${apiDomain}/api/members`,
    validatePan: `${apiDomain}/api/login/validate-pan`,
    updatePassword: `${apiDomain}/api/auth/update-password`,
    flatNos: `${apiDomain}/api/flats`,
    transaction: `${apiDomain}/api/transaction`
  }
};
