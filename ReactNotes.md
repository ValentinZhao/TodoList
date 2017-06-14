# React笔记&使用札记
入门学习了[阮一峰的React-demo教程](http://www.ruanyifeng.com/blog/2015/03/react.html)

## Quick Notes
- 组件：React 允许将代码封装成组件（component），然后像插入普通 HTML 标签一样，在网页中插入这个组件。React.createClass 方法就用于生成一个组件类

		var HelloMessage = React.createClass({
		  render: function() {
		    return <h1>Hello {this.props.name}</h1>;
		  }
		});
		
		ReactDOM.render(
		  <HelloMessage name="John" />,
		  document.getElementById('example')
		);
要注意一个很重要的应用就是，一个组件的属性可以从组件类的`this.props`对象上获取。
- 那么React也提供了`this.props.children`属性来将该组件的所有子节点返回。同时提供`React.Children`方法对child的集合进行集体操作
- 使用`propType`来限制传入组件的属性的类型
- 在虚拟DOM中为响应标签添加`ref`属性并赋一个名字，然后在相应的事件handler中我们通过`this.refs.[refName]`来获得这个虚拟DOM**插入到真实DOM中之后**对应真实的DOM。关于React支持的事件类型可以参阅 [官方文档](http://facebook.github.io/react/docs/events.html#supported-events)，一般就是`Click`,`KeyDown`,`Copy`,`Scroll`等
- React将组件看做一个状态机，与用户交互的过程中通过改变状态来触发UI的变化
- 关于表单，包括input, textarea, select和radio,我们读取它们的值是通过onclick的回调函数，通过`event.target.value`来获取，而不是this.props.value了

		var Input = React.createClass({
		  getInitialState: function() {
		    return {value: 'Hello!'};
		  },
		  handleChange: function(event) {
		    this.setState({value: event.target.value});
		  },
		  render: function () {
		    var value = this.state.value;
		    return (
		      <div>
		        <input type="text" value={value} onChange={this.handleChange} />
		        <p>{value}</p>
		      </div>
		    );
		  }
		});
		
		ReactDOM.render(<Input/>, document.body);
- 生命周期，Mounting：已插入真实DOM，Updating：正在被重新渲染，Unmounting：已移出真实DOM