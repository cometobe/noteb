<template>
  <div id="app">
    <Menu mode="horizontal" :theme="theme1">
      <MenuItem name="1" >
        <Icon type="ios-paper"></Icon>
        <router-link to="/">首页</router-link>
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people"></Icon>
        <router-link to="/fullCalendar">日历</router-link>
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="stats-bars"></Icon>
          视图切换
        </template>
        <MenuGroup title="使用">
          <router-link to="/calendar">日历</router-link>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4">
        <Icon type="settings"></Icon>
        <router-link to="/editor">MD编辑器</router-link>
      </MenuItem>
      <MenuItem name="5">

        <Button type="primary" shape="circle" icon="ios-search"></Button>
      </MenuItem>
    </Menu>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        theme1: 'light'
      }
    },
    beforeCreate() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
//      this.fetchData()
      console.log(this.$store.state.posts.posttable)
    },
    mounted() {
      this.$store.dispatch('fetchpostData');
      console.log(this.$store.state.posts.lists);
//      console.log(this.$store.state);
    },
    methods:{
      route: function(){
        alert(1)
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
