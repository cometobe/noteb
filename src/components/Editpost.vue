<template id="postedit">
  <div style="padding-top: 10px;">
    <form method="post" action="" enctype="multipart/form-data"
          class="">
      <div class="">
        <div class="row">
          <div class="col-lg-3">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">标题</label>
              <div class="col-sm-9">
                <input type="text" name="title" required="" lay-verify="required" placeholder="请输入标题"
                       class="form-control">
              </div>
            </div>
          </div>
          <div class="offset-lg-1 col-lg-3">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">标签</label>
              <div class="col-sm-9">
                <select name="tags[]" id="dropmenu" class="select2 form-control" multiple="multiple">
                </select>
              </div>
            </div>
          </div>
          <div class="offset-lg-1 col-lg-3">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">日期</label>
              <div class="">
                <!--<vue-datepicker-local v-model="time"></vue-datepicker-local>-->
              </div>
            </div>
          </div>
          <div class="col-lg-1">
            <div class="">
              <button type="submit" class="btn btn-primary form-control">提交</button>
            </div>
          </div>
        </div>
      </div>
      <!--<div id="editormd" class="">-->
        <!--<textarea id="my-editormd-html-code" name="text"></textarea>-->
        <!--<EditDocMainEditor></EditDocMainEditor>-->
      <!--</div>-->
      {{post._id}}
    </form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        time: new Date(),

      }
    }
  }

</script>
