<template>
  <div>
    <div>
      <label>标题</label>
      <Input v-model="title" placeholder="Enter something..." clearable style="width: 200px"></Input>
      <label>标签</label>
      <Select v-model="selects" multiple style="width:260px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <label>日期</label>
      <DatePicker type="date" placeholder="Select date" placement="bottom-end"></DatePicker>

      <div id="editor">
        <mavon-editor style="height: 100%" v-model="test"></mavon-editor>
      </div>
    </div>
  </div>
</template>
<script>
  // Local Registration
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'editor',
    data() {
      return {
        value: '22222221',
        title: 'test',
        selects: '',
        cityList: [
          {
            value: 'New York',
            label: 'New York'
          },
          {
            value: 'London',
            label: 'London'
          },
          {
            value: 'Sydney',
            label: 'Sydney'
          },
          {
            value: 'Ottawa',
            label: 'Ottawa'
          },
          {
            value: 'Paris',
            label: 'Paris'
          },
          {
            value: 'Canberra',
            label: 'Canberra'
          }
        ],
      }
    },
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    },
    computed: {
      test: {
        get () {
          return ''
        },
        set (val) {
          console.log('输入',val);
        }
      }
    }
  }
</script>
<style>
  #editor {
    margin: auto;
    padding-top: 5px;
    width: 99%;
    height: 580px;
    position: relative;
    z-index: 1;
  }
</style>
