import firebase from 'firebase'

export const state = () => ({
  token: ''
})

export const mutations = {
  mutateToken (state, payload) {
    state.token = payload
  }
}

export const actions = {
  async signUp ({ commit }, payload) {
    const email = payload.email
    const password = payload.password
    try {
      // ユーザ登録
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      // ログイン
      await firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      const token = await firebase.auth().currentUser.getIdToken(true)
      this.$cookies.set('jwt_token', token)
      commit('mutateToken', token)
      this.$router.push('/')
    } catch (e) {
      alert(e.message)
    }
  },

  async signIn ({ commit }, payload) {
    const email = payload.email
    const password = payload.password
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
      const token = await firebase.auth().currentUser.getIdToken(true)
      this.$cookies.set('jwt_token', token)
      commit('mutateToken', token)
      this.$router.push('/')
    } catch (e) {
      alert(e.message)
    }
  },

  async signOut ({ commit }) {
    try {
      await firebase.auth().signOut()
      commit('mutateToken', null)
      this.$cookies.remove('jwt_token')
      this.$router.push('/signin')
    } catch (e) {
      alert(e.message)
    }
  },

  setToken ({ commit }, payload) {
    commit('mutateToken', payload)
  }
}

export const getters = {
  isLogined (state) {
    return !!state.token
  }
}
