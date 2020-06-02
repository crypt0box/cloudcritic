<template>
  <div>
    <!-- {{ todos }} -->
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- {{ todo }} -->
        <span v-if="todo.created">
          <input
          type="checkbox"
          :checked="todo.done"
          @change="toggle(todo)">
          <span :class="{ done: todo.done }">
            {{ todo.name }} {{ todo.created.toDate() | dataFilter }}
          </span>
          <button @click="remove(todo.id); todoId = null">X</button>
          <button @click="addTodoId(todo.id)">Edit</button>
          <!-- {{ todo.id }} -->
        </span>
      </li>
    </ul>
    <div class="form">
      <form v-if="!todoId" @submit.prevent="add">
        <input v-model="name">
        <button>Add</button>
      </form>
      <form v-if="todoId" @submit.prevent="update">
        <input v-model="name">
        <button>Update</button>
        <button @click="todoId = null">Back</button>
      </form>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    data() {
      return {
        name: '',
        done: false,
        todoId: null,
      }
    },
    created() {
      this.$store.dispatch('todos/init')
    },
    methods: {
      add() {
        this.$store.dispatch('todos/add', this.name)
        this.name = ''
      },
      remove(id) {
        this.$store.dispatch('todos/remove', id)
      },
      toggle(todo) {
        this.$store.dispatch('todos/toggle', todo)
      },
      update() {
        this.$store.dispatch('todos/update', {name: this.name, id: this.todoId})
        this.name = ''
      },
      addTodoId(id) {
        this.todoId = id
      }
    },
    computed: {
      todos() {
        // return this.$store.state.todos.todos
        return this.$store.getters['todos/orderdTodos']
      }
    },
    filters: {
      dataFilter(data) {
        return moment(data).format('YYYY/MM/DD HH:mm:ss')
      }
    }
  }
</script>

<style scoped>
li > span > span.done {
  text-decoration: line-through;
}
</style>
