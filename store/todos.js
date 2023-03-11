export const state = () => ({
    list: JSON.parse(localStorage.getItem('store')) || []
})

export const mutations = {
    add(state, todo) {
        let n = 0
        for (; n < state.list.length && state.list[n].ts > todo.ts; n++);
        state.list.splice(n, 0, todo)
        localStorage.setItem('store', JSON.stringify(state.list))
    },
    remove(state, { todo }) {
        state.list.splice(state.list.indexOf(todo), 1)
        localStorage.setItem('store', JSON.stringify(state.list))
    },
    changeStatus(state, todo) {
        todo.task.status = todo.status
        localStorage.setItem('store', JSON.stringify(state.list))
    }
}

// export const watch = {
//     list: function () {
//         console.log('any...........')
//         if (isLocalStorage() /* function to detect if localstorage is supported*/) {
//             localStorage.setItem('store', this.list)
//         }
//     }
// }