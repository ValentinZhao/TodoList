<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  text-align: center;
}

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
</style>
