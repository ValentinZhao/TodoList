<template>
<div>
  <h1>TO-DO List</h1>
        <div class="event_input_zone">
            <input type="text" class="event_wrapper" id="event_input" v-model="myMessage">
        </div>
        <div class="event_add_btn" onclick="addEvents()">
            <span class="event_add_btn_content">{{ add }}</span>
        </div>
        <div class="all_event_wrapper">
            <div class="event_no_finish">
                <table class="table_no_finish">
                	<tbody class="no_finish_body">
                	</tbody>
                </table>
            </div>
            <div class="finish_btn_wrapper">
                <div class="finish_btn" onclick="finishEvent()">
                    <span class="finish_btn_content">{{ finished }}<br>>>>></span>
                </div>
                <div class="clear_cache_btn" onclick="clearCache()">
                    <span class="clear_cache_btn_content" v-html="clearCache"></span>
                </div>
            </div>
            <div class="event_finished">
                <table class="table_finished">
                	<tbody class="finished_body">
                	</tbody>
                </table>
            </div>
            <div class="warning_wrapper">
                <ul>
                    <li v-html="htmlWarning1"></li>
                    <li v-html="htmlWarning2"></li>
                    <li v-html="htmlWarning3"></li>
                    <li v-html="htmlWarning4"></li>
                </ul>
            </div>
        </div>
</div>
</template>

<script>
  export default {
    name: 'layout',
    data () {
      return {
        add: 'ADD',
        myMessage: '',
        finished: '已完成',
        clearCache: '清除<br>缓存',
        htmlWarning1: '在输入框内输入你要完成的事件，点击<b>“ADD”</b>即可将事件加入下方<b>左侧</b>的事件框内',
        htmlWarning2: '刚开始加入的事件都是“未完成事件”，<b>“编辑”</b>按钮可以让你重新编辑该事件，<b>“删除”</b>按钮则删掉本条事件',
        htmlWarning3: '勾选某个事件即可使其变为“已完成事件”状态，但要注意点击屏幕中央的<b>“已完成”</b>按钮来将其加入到右侧“已完成事件”框体内',
        htmlWarning4: '应注意的是，为了防止误删，我将你的每条记录都缓存了起来，只要你刷新页面（F5键）就可以拿回你所有曾输入的事件，如果你觉得缓存的数据都没有用了，可以选择点击<b>“清除缓存”</b>按钮（清除后也要刷新哦）'
      }
    },
    created () {
      var str = localStorage.getItem('todoList')
      if (str !== null) {
        todoList = str !== null ? JSON.parse(str) : []
        this.renderHTML()
      } else {
        todoList = []
      }
    },
    methods: {
      renderHTML: function () {
        if (todoList) {
          for (var index in todoList) {
            var mBody = document.querySelector('.no_finish_body')
            var todo = todoList[index]
            var tr = this.createTr(todo)
            mBody.appendChild(tr)
          }
        }
      },
      createTr: function (todo) {
        var tr = document.createElement('tr')
        var td = document.createElement('td')
        var textTd = document.createElement('td')
        var tdContent = document.createElement('input')
        var text = document.createTextNode(todo.event)
        var editTd = document.createElement('td')
        var editSpan = document.createElement('span')
        var delTd = document.createElement('td')
        var span = document.createElement('span')
        span.className = 'delete_item_btn'
        span.onclick = this.deleteItem
        span.innerHTML = '删除'
        editSpan.className = 'edit_item_btn'
        editSpan.onclick = this.editItem
        editSpan.innerHTML = '编辑'
        tdContent.setAttribute('type', 'checkbox')
        textTd.style.color = 'red'
        tr.className = 'no_finish_body_text'
        tdContent.onclick = function tdContentClick () {
          if (tdContent.checked) {
            textTd.style.color = 'green'
            textTd.style.textDecoration = 'line-through'
          } else {
            textTd.style.color = 'red'
            textTd.style.textDecoration = 'none'
          }
        }
        editTd.appendChild(editSpan)
        delTd.appendChild(span)
        td.appendChild(tdContent)
        textTd.appendChild(text)
        tr.appendChild(td)
        tr.appendChild(textTd)
        tr.appendChild(editTd)
        tr.appendChild(delTd)
        return tr
      },
      deleteItem: function () {

      },
      editItem: function () {

      }
    }
  }
</script>

<style lang="scss" scoped>
body {
    background: #FFFFF3;
}

h1 {
    position: absolute;
    left: 100px;
    top: 30px;
}

div.event_input_zone {
    position: absolute;
    left: 5%;
    top: 20%;
    width: 70%;
    height: 50px;
}

.event_wrapper {
    border: 1px solid #E3E3E3;
    background: #FFFFF3;
    margin: 5px;
    width: 100%;
    height: 100%;
    position: relative;
    outline: none;
    font-size: 30px;
}

.event_wrapper:hover {
    border: 1px solid #D9D9D9;
}

.event_add_btn {
    background: #7EC0EE;
    height: 54px;
    width: 70px;
    position: absolute;
    left: 76%;
    top: 20.5%;
}

.event_add_btn_content {
    position: relative;
    top: 35%;
}

.event_add_btn:link {
}

.event_add_btn:hover {
    opacity: 0.7;
    cursor: pointer;
}

.event_add_btn:active {
    opacity: 0.9;
    cursor: pointer;
}

.event_add_btn:visited {
}

.all_event_wrapper {
    position: absolute;
    left: 5%;
    top: 30%;
    width: 80%;
    height: 50%;
    /*border: 2px dotted black;*/
}

.event_no_finish {
    position: relative;
    float: left;
    left: 5%;
    border: 2px dotted black;
    width: 40%;
    height: 100%;
}

.event_finished {
    position: relative;
    left: 55%;
    border: 2px dotted black;
    width: 40%;
    height: 100%;
}

.finish_btn_wrapper {
    position: relative;
    float: left;
    /*border: 2px solid red;*/
    left: 5.1%;
    width: 9.5%;
    height: 100%;
}

.finish_btn {
    position: relative;
    top: 30%;
    width: 100%;
    height: 20%;
    background: #54FF9F;
}

.finish_btn:link {}
.finish_btn:hover {
    opacity: 0.7;
    cursor: pointer;
}

.finish_btn:active {
    opacity: 0.9;
    cursor: pointer;
}
.finish_btn:visited {}

.finish_btn_content {
    position: relative;
    top: 30%;
    text-align: center;
}

.table_no_finish {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
}

.table_finished {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
    /* border: 1px solid green; */
}

.no_finish_body {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
}

.no_finish_body_text {
    display: block;
    position: relative;
    margin-bottom: 5px;
}

.finished_body {
    display: block;
    position: relative;
    width: 100%;
    height: 100%;
}

.finish_body_text {
    display: block;
    position: relative;
    bottom: 100%;
    margin-bottom: 5px;
}

.delete_item_btn {
    background-color: red;
    color: white;
    width: 30px;
    height: 20px;
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
    text-align: center;
}

.delete_item_btn:linked {}
.delete_item_btn:hover {
    opacity: 0.6;
}

.edit_item_btn:active {
    opacity: 0.9;
}
.edit_item_btn:visited {}

.edit_item_btn {
    background-color: indigo;
    color: white;
    width: 30px;
    height: 20px;
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
    text-align: center;
}

.edit_item_btn:linked {}
.edit_item_btn:hover {
    opacity: 0.6;
}

.edit_item_btn:active {
    opacity: 0.9;
}
.edit_item_btn:visited {}

.finish_edit_item_btn {
    background-color: green;
    color: white;
    width: 30px;
    height: 20px;
    cursor: pointer;
    padding: 3px;
    border-radius: 5px;
    text-align: center;
}

.finish_edit_item_btn:linked {}
.finish_edit_item_btn:hover {
    opacity: 0.6;
}

.finish_edit_item_btn:active {
    opacity: 0.9;
}
.finish_edit_item_btn:visited {}

.clear_cache_btn_wrapper {
    position: relative;
}

.clear_cache_btn {
    display: block;
    position: relative;
    width: 100%;
    height: 20%;
    top: 40%;
    background-color: #FF3030;
}

.clear_cache_btn:link {}

.clear_cache_btn:hover {
    opacity: 0.6;
    cursor: pointer;
}

.clear_cache_btn:active {
    opacity: 0.9;
    cursor: pointer;
}

.clear_cache_btn:visited {}

.clear_cache_btn_content {
    position: relative;
    top: 30%;
    color: white;
    text-align: center;
}

.warning_wrapper {
    position: relative;
    display: block;
    left: 5%;
    top: 5%;
}
</style>
