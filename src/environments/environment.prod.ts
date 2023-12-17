const apiDomain = "https://ancient-newt-34.telebit.io";

export const environment = {
  production: true,
  apis: {
    login: `${apiDomain}/api/login`,
    auth: `${apiDomain}/api/auth`,
    memberIds: `${apiDomain}/api/login/member-ids`,
    validatePan: `${apiDomain}/api/login/validate-pan`,
    updatePassword: `${apiDomain}/api/auth/update-password`
  }
};
