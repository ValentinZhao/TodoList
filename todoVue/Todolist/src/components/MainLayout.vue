<template>
<div>
  <h1>TO-DO List</h1>
        <div class="event_input_zone">
            <input type="text" class="event_wrapper" id="event_input" v-model="myMessage">
        </div>
        <div class="event_add_btn" @click="addEvents">
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
                <div class="finish_btn" @click="finishEvent">
                    <span class="finish_btn_content">{{ finished }}<br>>>>></span>
                </div>
                <div class="clear_cache_btn" @click="clearCache">
                    <span class="clear_cache_btn_content" v-html="clearCacheText"></span>
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
        clearCacheText: '清除<br>缓存',
        htmlWarning1: '在输入框内输入你要完成的事件，点击<b>“ADD”</b>即可将事件加入下方<b>左侧</b>的事件框内',
        htmlWarning2: '刚开始加入的事件都是“未完成事件”，<b>“编辑”</b>按钮可以让你重新编辑该事件，<b>“删除”</b>按钮则删掉本条事件',
        htmlWarning3: '勾选某个事件即可使其变为“已完成事件”状态，但要注意点击屏幕中央的<b>“已完成”</b>按钮来将其加入到右侧“已完成事件”框体内',
        htmlWarning4: '应注意的是，为了防止误删，我将你的每条记录都缓存了起来，只要你刷新页面（F5键）就可以拿回你所有曾输入的事件，如果你觉得缓存的数据都没有用了，可以选择点击<b>“清除缓存”</b>按钮（清除后也要刷新哦）'
      }
    },
    mounted () {
      var str = localStorage.getItem('todoList')
      var todoList = this.$store.getters.getTodoList
      if (str !== null) {
        todoList = JSON.parse(str)
        this.$store.commit('setTodoList', todoList)
        this.renderHTML()
      } else {
        todoList = []
        this.$store.commit('setTodoList', todoList)
      }
    },
    methods: {
      renderHTML: function () {
        var todoList = this.$store.getters.getTodoList
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
        span.onclick = (tr) => {
          this.deleteItem(tr)
        }
        span.innerHTML = '删除'
        editSpan.className = 'edit_item_btn'
        editSpan.onclick = (editSpan) => {
          this.editItem(editSpan)
        }
        editSpan.innerHTML = '编辑'
        tdContent.setAttribute('type', 'checkbox')
        textTd.style.color = 'red'
        tr.className = 'no_finish_body_text'
        tdContent.onclick = () => {
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
      deleteItem: function (that) {
        var tbody = that.srcElement.parentElement.parentElement.parentElement
        var tr = that.srcElement.parentElement.parentElement
        tbody.removeChild(tr)
      },
      editItem: function (that) {
        var tr = that.srcElement.parentElement.parentElement
        var textTd = tr.children[1]
        var textSpan = textTd.firstChild
        var text = textSpan.nodeValue
        var input = document.createElement('input')
        input.type = 'text'
        textTd.removeChild(textSpan)
        textTd.appendChild(input)
        input.value = text
        var finishTd = document.createElement('td')
        var finishSpan = document.createElement('span')
        var delTd = tr.lastChild
        finishSpan.className = 'finish_edit_item_btn'
        finishSpan.innerHTML = '完成'
        finishSpan.onclick = (finishSpan) => {
          this.finishEdit(finishSpan)
        }
        tr.removeChild(that.srcElement.parentElement)
        finishTd.appendChild(finishSpan)
        tr.insertBefore(finishTd, delTd)
      },
      addEvents: function () {
        var mInput = document.querySelector('#event_input')
        var mEvent = mInput.value
        var todoList = this.$store.getters.getTodoList
        mInput.value = ''
        var todo = { 'event': mEvent, 'isFinished': false }
        var tbody = document.querySelector('.no_finish_body')
        var tr = this.createTr(todo)
        tbody.appendChild(tr)
        todoList.push(todo)
        this.$store.commit('setTodoList', todoList)
        localStorage.setItem('todoList', JSON.stringify(todoList))
      },
      finishEvent: function () {
        var leftBody = document.querySelector('.no_finish_body')
        var rightBody = document.querySelector('.finished_body')
        var finishedList = []
        for (let i = 0; i < leftBody.children.length; i++) {
          var tr = leftBody.children[i]
          if (tr.children[0].firstChild.checked) { // because <tr><td><input></td><td>xxx</td></tr>
            finishedList.push(tr)
            leftBody.removeChild(tr)
          }
        }
        for (let i = 0; i < finishedList.length; i++) {
          finishedList[i].className = 'finish_body_text'
          rightBody.appendChild(finishedList[i])
        }
      },
      clearCache: function () {
        localStorage.clear()
      },
      finishEdit: function (that) {
        var input = that.srcElement.parentElement.parentElement.children[1].firstChild
        var editTd = that.srcElement.parentElement
        var textTd = input.parentElement
        var span = document.createElement('span')
        var eventName = input.value
        span.className = 'edit_item_btn'
        span.innerHTML = '编辑'
        span.onclick = this.editItem(that)
        textTd.removeChild(textTd.firstElementChild)
        textTd.innerHTML = eventName
        editTd.removeChild(editTd.firstElementChild)
        editTd.appendChild(span)
      }
    }
  }
</script>

<style scoped>

</style>
