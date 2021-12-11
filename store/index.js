export const state = () => ({
    total: 0,
})

export const mutations = {
    update (state, total) {
        state.total = total
    }
}