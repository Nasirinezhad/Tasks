<template lang="pug">
div
    Toast
    div.fixed.m-2(style="bottom:5rem;right:5rem")
        Button.p-button-rounded.p-button-raised.p-4(
        icon="pi pi-plus"
        @click="visible = true"
        )
    Dialog(
        :visible="visible",
        modal,
        header="New Task",
        :style="{ width: '75vw' }",
        :breakpoints="{ '960px': '100vw' }"
        )
        p Write your task description and select the date
        hr
        Textarea.w-full(v-model="taskDesc" autoResize rows="2" placeholder="Write your task here...")
        Calendar.w-full(id="calendar-24h" inline v-model="datetime24h" showTime hourFormat="24" placeholder="choase date")
        hr
        template(#footer)
            Button(label="Cancel", severity="danger", icon="pi pi-times", @click="visible = false", text )
            Button(
                label="Add",
                icon="pi pi-check",
                @click="addTodo()",
                autofocus
            )
</template>

<script>
export default {
  data() {
    return {
        visible: false,
        taskDesc: '',
        datetime24h: ''
    }
  },
  methods: {
    addTodo() {
        if (this.taskDesc === '') {
            this.$toast.add({ severity: 'error', summary: 'Task description', detail: 'task description can not be empty', life: 3000 });
            return
        }
        if (this.datetime24h === '') {
            this.$toast.add({ severity: 'error', summary: 'Select date', detail: 'you should select some date', life: 3000 });
            return
        }
        this.$store.commit("todos/add", 
              { message: this.taskDesc, ts: (new Date(this.datetime24h)).getTime(), status: 'waiting'});
        this.$toast.add({ severity: 'success', summary: 'Task added', detail: 'your task successfuly added', life: 3000 });
        this.visible = false
    },
  },
};
</script>