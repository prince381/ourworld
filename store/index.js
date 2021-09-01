import JWTDecode from 'jwt-decode'
import cookieparser from 'cookieparser'

export const strict = false

export const actions = {
    nuxtServerInit({ commit }, { req }) {
        if (!req.headers.cookie) return;

        const parsedCookie = cookieparser.parse(req.headers.cookie);

        const token = parsedCookie.access_token;
        if (token) {
            const decoded = JWTDecode(token);
            if (decoded) {
                commit('auth/setUser',{
                    uid: decoded.user_id,
                    email: decoded.email,
                    emailVerified: decoded.email_verified,
                    displayName: decoded.name
                })
            }
        }
    }
}