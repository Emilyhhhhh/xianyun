export const state = () => ({
    posts: []
})

export const mutations = {
    // 添加草稿内容
    setPosts(state, data) {
        state.posts.unshift(data)
    },
    // 删除草稿
    delPosts(state, data) {
        state.posts.splice(data, 1)
    }
}