$(function(){
	var headerManager = new Hammer.Manager($('#header-list')[0]);
	var swipeHeader = $('#header-list');
	var itemNo = 0;
	var g = parseInt($("html").css("fontSize"));
	headerManager.set({
		touchAction:'pan-y'
	});
	headerManager.add(new Hammer.Pan({
		direction: Hammer.DIRECTION_ALL,
		threshold: 0
	}));
	swipeHeader.css('marginLeft', '1rem');
	// headerManager.on('pan', function(){
		// 	swipeHeader.css('marginLeft', '1rem');
		// 	itemNo = i;
		// 	console.log('DETACTED!!!')
		// });
		headerManager.on("pan", function(k) {
            var j = parseInt(swipeHeader.css("marginLeft"));
            var i = j + k.deltaX / 10;
            i = i / g;
            if (i <= -9.0) {
                i = (i + 9.0) / 2 - 9.0
            }
            if (i >= 0.6) {
                i = (i - 0.6) / 2 + 0.6
            }
            swipeHeader.css("marginLeft", i + "rem")
        });
        headerManager.on("panend", function(k){
        	var i = parseFloat(swipeHeader.css('marginLeft'));
        	i = i / g;
        	if (i <= -9.0) {
        		i = -9.0;
        	} else if (i >= 0) {
        		i = 0;
        	}
        	swipeHeader.animate({
        		marginLeft: i + 'rem'
        	}, 300);
        });

});