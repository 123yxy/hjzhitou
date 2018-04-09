/*
 treeMenu - jQuery plugin
 version: 0.4

 Copyright 2014 Stepan Krapivin

*/

(function($){
	
	$("[name='a']").on("click",function(){
	   	$("[name='a']").next().hide();
	   	$(this).parent().siblings("li").removeClass("tree-opened").addClass("tree-closed");
	   	if($(this).parent().hasClass("tree-opened")){
	   	$(this).parent().removeClass("tree-opened").addClass("tree-closed");	
	   	$(this).next().hide();
	   	}
	   	if($(this).parent().hasClass("tree-closed")){
	   	$(this).parent().removeClass("tree-closed").addClass("tree-opened");
	   	$(this).next().show();
	   	}
	   	$(this).parent().siblings("li").addClass("tree-closed");
		$(this).parent().addClass("tree-opened");
		
	});
    $.fn.openActive = function(activeSel) {
        activeSel = activeSel || ".active";

        var c = this.attr("class");

        this.find(activeSel).each(function(){
            var el = $(this).parent();
            while (el.attr("class") !== c) {
                if(el.prop("tagName") === 'UL') {
                    el.show();
                } else if (el.prop("tagName") === 'LI') {
                    el.removeClass('tree-closed');
                    el.addClass("tree-opened");
                }

                el = el.parent();
            }
        });

        return this;
    }

    $.fn.treemenu = function(options) {
        options = options || {};
        options.delay = options.delay || 0;
        options.openActive = options.openActive || false;
        options.activeSelector = options.activeSelector || "";

        this.addClass("treemenu");
        this.find("> li").each(function() {
            e = $(this);
            var subtree = e.find('> ul');
            var button = e.find('span').eq(0).addClass('toggler');
            if( button.length == 0) {
                var button = $('<span>');
                button.addClass('toggler');
                e.append(button);
            } else {
                button.addClass('toggler');
            }

            if(subtree.length > 0) {
                subtree.hide();

                e.addClass('tree-closed');

                e.find(button).click(function() {
                    var li = $(this).parent('li');
                    li.find('> ul').slideToggle(options.delay);
                    li.toggleClass('tree-opened');
                    li.toggleClass('tree-closed');
                    li.toggleClass(options.activeSelector);
                });
                $(this).find('> ul').treemenu(options);
            } else {
                $(this).addClass('tree-empty');
//              $(this).removeChild("span");
            }
        });

        if (options.openActive) {
            this.openActive(options.activeSelector);
        }

        return this;
    }
})(jQuery);
