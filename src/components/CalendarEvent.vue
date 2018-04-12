<template id="date" style="display: block">
  <input type="text" class="datapicker"/>
</template>


<script>
  epctrl._rootPath = '/';
  var testFn = function (e) {
    console.log(e);
  };
  var testCalendar = epctrl.init('Calendar', {
    el: '#date',
    // date: '2017-9',
    events: {
      beforeSourceLoad: function (e) {
        console.log(e);
        // 加载资源前可以再加入一些自己的其他资源
      },
      afterLoadSource: testFn
    }
  });

  // 日期部分渲染前
  testCalendar.on('beforeDateRender', function (e) {
    var startDate = e.startDate,
      endDate = e.endDate;
    // 如果需要动态获取数据
    // 则将获取数据的ajax加到事件对象的ajax属性上即可
    // 日期渲染的cellRender事件将在ajax成功获取数据后执行
    e.ajax = $.ajax({
      // url: 'getDateInfo.xxx',
      url: '',
      data: {
        start: startDate,
        end: endDate
      }
    });
  });

  // testCalendar.on('beforeCellRender', testFn);
  // testCalendar.on('cellRender',testFn);
  // testCalendar.on('dateClick',testFn);

  testCalendar.on('cellRender', function (e) {
    console.log(e);
    if (!e.isHeader) {
      e.extraHtml = '<span style="color:#c0c0c0;text-align:left;"; id="cellp' + e.date + '"></span>' +
        '<div style="color:#c0c0c0;text-align:left;"; id="cell' + e.date + '"></div>';
      e.ajax = $.ajax({
        type: "get",
        async: true,
        // url: 'getDateInfo.xxx',
        url: '/cal/check/' + e.date,
        success: function (data) {
          if (data.title != '没有文章') {
            var titlehtml = '';
            var titlearray = data.title;
            for (var index = 0; index < titlearray.length; index++) {
              titlehtml += '<a class="calpost">' + data.title[index] + '</a>' + '</br>'
            }
            $("#" + 'cell' + e.date).prev()[0].style.textDecoration = "underline";
            $("#" + 'cell' + e.date).html(titlehtml);
          }
          else {
          }
          ;
        },
      });
      e.ajax = $.ajax({
        type: "get",
        async: true,
        // url: 'getDateInfo.xxx',
        url: '/cal/checkplace/' + e.date,
        success: function (data) {
          if (data.place != '没有出差') {
            $("#" + 'cellp' + e.date).prev()[0].style.borderBottom = "1px dashed red";
            $("#" + 'cellp' + e.date).html(data.place);
          }
          else {

          }
          ;
        },
      });
    }
  });

  $(".calpost").onclick(function () {
    $(this).html('123');
  });
</script>



