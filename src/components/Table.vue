<template>
  <div>
    <Row type="flex">
      <Col span="6" v-for="(post,index) in posts" :key="index">
      <div style="background:#eee;padding: 5px;">
        <Card>
          <p style="width: 60%;overflow:visible" slot="title" @onclick="">{{ post.title}}</p>
          <router-link slot="title" role="button" type="primary"
                       :to="{name:'Editpost',params:{postid:post._id}}">编辑
          </router-link>
          <router-link slot="title" role="button" class="btn btn-danger btn-sm"
                       :to="{path:'/edit',params:{id:post._id}}">删除
          </router-link>
          <p style="height: 100px;">{{ post.text | truncate(100) }}</p>
        </Card>
      </div>
      </Col>
    </Row>
    <Tree :data="data1"></Tree>
  </div>
</template>

<script>

  import Vue from 'vue'

  Vue.filter('truncate', function (text, length, clamp) {
    clamp = clamp || '...';
    length = length || 30;

    if (text.length <= length) return text;

    let tcText = text.slice(0, length - clamp.length);
    let last = tcText.length - 1;


    while (last > 0 && tcText[last] !== ' ' && tcText[last] !== clamp[0]) last -= 1;

    // Fix for case when text dont have any `space`
    last = last || length - clamp.length;

    tcText = tcText.slice(0, last);

    return tcText + clamp;
  });

  export default {
    name: 'posttable',
    data() {
      return {
        posts: this.$store.state.posts.posttable,
        data1: [
          {
            title: '文章列表',
            expand: true,
            children: this.$store.getters.titlelist
          }
        ]
      }
    },

    watch: {
      // 如果路由有变化，会再次执行该方法
//      '$route': 'fetchData'
    },
    computed: {
//      ccc:this.$store.dispatch('fetchpostData'),
//      ddd:this.$store.getters.titlelist

    },

    methods: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
