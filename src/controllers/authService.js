module.exports.ServiceName = ""; //fileName if empty,null or undefined
module.exports.Service = ({ token, clientErrors: { UnauthorizedError }, constants: { errorCodes }, repositories: { accessTokenRepository, userRepository } }) => ({
    signin: async ({ credential }) => {

        return {};
    },
    signout: async ({ xBwToken }) => {

        return {};
    },
    signup: async ({ user }) => {

        return {};
    }
});
