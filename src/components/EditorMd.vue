<template>
  <div>
    <Input v-model="title" placeholder="Enter something..." clearable style="width: 200px"></Input>

  <div id="editor">
    <mavon-editor style="height: 100%" v-model="value"></mavon-editor>
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
        title:'test',
      }
    },
    components: {
      mavonEditor
      // or 'mavon-editor': mavonEditor
    }
  }
</script>
<style>
  #editor {
    margin: auto;
    padding-top: 5px;
    width: 99%;
    height: 580px;
  }
</style>
