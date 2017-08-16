$(function(){
	var swipeHeader = $('#header-list');
	var headerManager = new Hammer.Manager($('#header-list')[0]);
	var contentSwiper = $('#content-list');
	var contentManager = new Hammer.Manager($('#content-list')[0]);
	var headerItems = $('#header-list li');
	var itemNo = 0;
	var g = parseInt($("html").css("fontSize"));
	var pageLength = 8.53333;
	var itemLength = 3;
	headerManager.set({
		touchAction:'pan-y'
	});
	headerManager.add(new Hammer.Pan({
		direction: Hammer.DIRECTION_ALL,
		threshold: 0
	}));
	contentManager.set({
		touchAction: 'pan-y'
	});
	contentManager.add(new Hammer.Swipe({
		direction: Hammer.DIRECTION_ALL,
		threshold: 0
	}));
	headerItems.click(function(){
		var i = $(this).index();
		contentSwiper.animate({
			marginLeft: -(pageLength * i) + 'rem'
		}, 500);
		headerItems.removeClass('active').eq(i).addClass('active');
		if([2, 3, 4].indexOf(i) >= 0){
			swipeHeader.animate({
				marginLeft: -(itemLength * (i - 1)) + 'rem'
			}, 300)
		}
		itemNo = i;
	});
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
    contentManager.on('swipeleft', function(event) {
    	if(itemNo < 5){
    		contentSwiper.animate({
    			marginLeft: -(pageLength * (itemNo + 1)) + 'rem'
    		}, 500);
    		headerItems.removeClass('active').eq(itemNo + 1).addClass('active');
    		//在header滚动到，已经展现出最后一个header item的时候我们希望这个header不再向右滚动了
    		if([1, 2, 3].indexOf(itemNo) >= 0){
    			swipeHeader.animate({
    				marginLeft: -(itemLength * itemNo) + 'rem'
    			}, 300);
    		}
    		itemNo++;
    	}
    });
    contentManager.on('swiperight', function(event) {
    	if(itemNo > 0){
    		contentSwiper.animate({
    			marginLeft: -(pageLength * (itemNo - 1)) + 'rem'
    		}, 500);
    		headerItems.removeClass('active').eq(itemNo - 1).addClass('active');
    		//在header滚动到，已经展现出第一个header item的时候我们希望这个header不再向左滚动了
    		if([4, 3, 2].indexOf(itemNo) >= 0){
    			swipeHeader.animate({
    				marginLeft: -(itemLength * itemNo) + 'rem'
    			}, 300);
    		}
    		itemNo--;
    	}
    });

});