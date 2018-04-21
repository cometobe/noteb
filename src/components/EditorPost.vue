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
      <DatePicker v-model="postdate" type="date" placeholder="Select date" placement="bottom-end"></DatePicker>

      <div id="editor">
        <mavon-editor style="height: 100%" v-model="test11" :editable="true"></mavon-editor>
      </div>
    </div>
  </div>
</template>
<script>
  // Local Registration
  import {mavonEditor} from 'mavon-editor'
  import 'mavon-editor/dist/css/index.css'

  export default {
    name: 'editorpost',
    data() {
      return {
        value: '22222221',
        title: this.$store.getters.postbyid(this.$route.params.id).title,
        postdate:this.$store.getters.postbyid(this.$route.params.id).createtime,
//        posts:this.$route.params.id,
//        posts: this.$store.state.posttable.filter(o => o.id === this.$route.params.id)[0].id,
//        test:this.$store.state.posts.getters.postid(this.$router.params.id),
//        id:this.$router.params.id,
        post:'',
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

//      ...mapGetters('postbyid'),
      test11:{
        get(){
//          console.log('get',this.$store.state.posts.posttable[0],this.$route.params.id);
          return this.$store.getters.postbyid(this.$route.params.id).text
//          return this.$route.params.id
//          return this.$store.posts.getters.postbyid(this.route.state,this.$router.params.id)
        },
        set(val){
          console.log('输入',val);
          this.$store.commit('savepostbyid', val)
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
