$(function(){
	var swipeWatcher = function(){
		var h_swipeHeader = new Hammer($('#head')[0]);
		var swipeHeader = $('#head');
		var itemNo = 0;
		return function(i){
			h_swipeHeader.on('pan', function(){
				swipeHeader.css('marginLeft', '1rem');
				itemNo = i;
			});
		}
	}
	swipeWatcher();
});