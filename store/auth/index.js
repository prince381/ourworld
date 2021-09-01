import { auth, db } from '~/services/firebase'
import Cookie from 'js-cookie'

export const state = () => ({
    user: null,
    error: '',
    isErr: false
})

export const mutations = {
    setUser(state,user) {
        state.user = user
    },
    isError(state,err) {
        state.error = err;
        state.isErr = true;

        setTimeout(() => {
            state.isErr = false;
        },5000)
    }
}

export const actions = {
    async login({commit}, userInfo) {
        try {
            const {mail, password} = userInfo;
            await auth.signInWithEmailAndPassword(mail,password)
            const token = await auth.currentUser.getIdToken();
            Cookie.set('access_token',token);

            const {email, uid, emailVerified} = auth.currentUser;
            commit('setUser',{email, uid, emailVerified})

        } catch(error) {
            commit('isError',error.message)
        }
    },
    async register({commit}, userInfo) {
        try {
            const {mail, password} = userInfo;
            await auth.createUserWithEmailAndPassword(mail,password)

            const {email, uid, emailVerified} = auth.currentUser;
            commit('setUser',{email, uid, emailVerified})
            
            await auth.currentUser.sendEmailVerification()
        } catch(error) {
            commit('isError',error.message)
        }
    },
    async logout({commit}) {
        await auth.signOut();
        commit('setUser',null);
        Cookie.remove('access_token');
    }
}