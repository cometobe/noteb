<template>
<full-calendar :events="fcEvents" locale="zh-cn"
@changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick"></full-calendar>

</template>

<script>
import fullCalendar from '@/components/fullCalendar'
//import fc from './Calendar.vue'
import Vue from 'vue'
import router from '../router'
//Vue.component('full-calendar', fullCalendar)

export default {
  data() {
    return {
      fcEvents: this.$store.getters.postevent
    }
  },
   methods : {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },
    'eventClick' (event, jsEvent, pos) {
//       console.log('eventClick', event, jsEvent, pos)
      console.log(event.id)
      return this.$router.push({ name: 'editorpost', params: {id:event.id}})
    },
    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },
    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    }
  }
}


</script>
