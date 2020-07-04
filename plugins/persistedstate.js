import createPersistedState from 'vuex-persistedstate'
 
export default ({ store }) => {
 
    window.onNuxtReady(() => {
        createPersistedState({
            key: 'cloudcritic-user',
            paths: ['auth']
        })(store)
    })
}