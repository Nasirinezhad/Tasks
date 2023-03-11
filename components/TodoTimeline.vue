<template lang="pug">
div.card.w-full
  Toast
  ConfirmPopup.z-2
  Timeline.customized-timeline(:value="todos" align="alternate")
      template(#marker="slotProps")
          a.flex.w-2rem.h-2rem.align-items-center.justify-content-center.text-white.border-circle.z-1.shadow-1( 
            :style="{ backgroundColor: statusColor(slotProps.item.status, slotProps.item.ts) }"
            herf="#"
            @click="changeStatus($event,slotProps.item)"
          )
            i(:class="statusIcon(slotProps.item.status, slotProps.item.ts)")

      template(#opposite="slotProps")
            small.p-text-secondary {{ dateFormat(slotProps.item.ts)}}

      template(#content="slotProps") {{ slotProps.item.message }}
</template>
<script>
import { mapMutations } from "vuex";

export default {
  name: "TimelineItem",
  data() {
    return {
    }
  },
  computed: {
    todos() {
      return this.$store.state.todos.list;
    },
  },
  methods: {
    statusColor(status, ts) {
      if(status == 'waiting' && (new Date).getTime() > ts) return '#fbc02d'
      return {waiting: '#9C27B0', done: '#0ac933', fail:'#e51142'}[status]
    },
    statusIcon(status, ts) {
      if(status == 'waiting' && (new Date).getTime() > ts) return 'pi pi-exclamation-circle'
      return {waiting: 'pi pi-clock', done: 'pi pi-check-circle', fail:'pi pi-times-circle'}[status]
    },
    dateFormat(ts) {
      let dateObj = new Date(ts)
      let dateformat
      if(dateObj.getDate() === (new Date).getDate() &&  ts < (new Date).getTime()+86400000) {
        dateformat = 'Today'
      }else if(ts < (new Date).getTime()+172800000 &&  ts > (new Date).getTime()+86400000) {
        dateformat = 'Tomorrow'
      }else if(ts > (new Date).getTime()-172800000 &&  ts < (new Date).getTime()-86400000) {
        dateformat = 'Yesterday'
      }else {
        dateformat = dateObj.getDate().toString().padStart(2, '0')+'/'+dateObj.getMonth().toString().padStart(2, '0')+'/'+dateObj.getFullYear()
      }
      return dateformat+' '+dateObj.getHours()+':'+dateObj.getMinutes().toString().padStart(2, '0')
    },
    changeStatus(event, task) {
        this.$confirm.require({
            target: event.currentTarget,
            message: 'Choase new status of this task',
            header: 'Change status',
            acceptLabel: task.status !== 'done' ? 'Done' : 'Waiting',
            rejectLabel: task.status !== 'fail' ? 'Failed' : 'Waiting',
            accept: () => {
              this.$store.commit("todos/changeStatus", 
              {task: task, status: task.status !== 'done' ? 'done' : 'waiting'})
              this.$toast.add({ severity: 'info', summary: 'Status Changed', detail: 'The status of this task successfuly changed', life: 3000 });
            },
            reject: () => {
              this.$store.commit("todos/changeStatus", 
              {task: task, status: task.status !== 'fail' ? 'fail' : 'waiting'})
              this.$toast.add({ severity: 'info', summary: 'Status Changed', detail: 'The status of this task successfuly changed', life: 3000 });
            }
        });
    }
  },
};
</script>