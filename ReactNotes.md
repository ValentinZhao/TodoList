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
