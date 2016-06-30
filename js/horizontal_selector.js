/*
 * Jquery Horizontal Selector v1.0
 * 
 *
 * Copyright 2016, Boris
  *
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/MIT
*/

jQuery.fn.extend({
	
	horizontalSelector: function (opts){
		var scriptURL = 'horizontal_selector.js';
		var cssURL = 'horizontal_selector.css';
		var selectorId = $(this).attr("id");
		var hashtagSelectorId = "#" + selectorId;
		var optionValueArray = optionValues($(this));
		var optionHtmlArray = optionHtmls($(this));
		var numberOfOptions = $(this).children().size();
		var parent = $(this).parent();
		var currentSelected = $(this)[0].selectedIndex;
		var selWidth = 0;
		var ctrlMinWid = 50;
		var ctrlWidth = $(hashtagSelectorId).outerWidth() > ctrlMinWid ? $(hashtagSelectorId).outerWidth() : ctrlMinWid;
		var ctrlHeight = $(hashtagSelectorId).outerHeight();
		var entParent = $("<div></div>");
		var ctrlParent = $("<div></div>");
		var leftButton, rightButton;
		var animateSpeed = 100;
		var originClassNames = $(this).attr('class');
		var entireClassName = 'HorizontalParentDiv', parentClassName = 'HorizontalWorkDiv', selectClassName = 'HorizontalSelect';

		if(typeof opts.setValueWithID == 'object')
		{
			var json = opts.setValueWithID;
			if( Object.prototype.toString.call( json ) === '[object Array]' ) 
			{
				var i, len = json.length;
				for (i=0;i<len;i++)
				{
					if (typeof json[i].id != undefined && typeof json[i].val == 'string')
					{
						var id = json[i].id, val = json[i].val;
						if (id>=0 && id<numberOfOptions)
						{
							$(this).find('option').eq(id).html(val);
						}
					}
				}
			}
			else
			{
				if (typeof json.id != undefined && typeof json.val == 'string')
				{
					var id = json.id, val = json.val;
					if (id>=0 && id<numberOfOptions)
					{
						$(this).find('option').eq(id).html(val);
					}
				}
			}
		}
		if (typeof opts.setValue == 'object')
		{
			var json = opts.setValue;
			if( Object.prototype.toString.call( json ) === '[object Array]' ) 
			{
				var i, len = json.length;
				$(this).html("");
				for (i=0;i<len;i++)
				{
					$(this).append("<option>" + json[i] + "</option>")
				}
				numberOfOptions = len;
				currentSelected = 0;
			}
			else
			{

			}
		}
		construct();
		includeLink();
		// Events

		function includeLink(){
			var bStylesheetExists = false;
			var url;
			$('script').each(function() {
				if ($(this).attr('src') != undefined && $(this).attr('src').indexOf(scriptURL) != -1)
					url = $(this).attr('src');
			});
			url = url.substring(0, url.length-scriptURL.length);
			$('link').each(function() { 
				if($(this).attr('href') === url + cssURL) {
			   		bStylesheetExists = true;
				}
			});

			if(bStylesheetExists === false) {
			$('head').append('<link rel="stylesheet" href="'+ url + cssURL + '" type="text/css" />');
			}
		}
		function construct(){
			var element = $(hashtagSelectorId).clone().wrap("<div></div>").parent().html().replace(/select/g,"div");
			var lefWid, rigWid;
			$(hashtagSelectorId).find('option').css('display',"inline-block");
			$(hashtagSelectorId).find('option').css('float','left');
			$(hashtagSelectorId).css('position','absolute');
			$(hashtagSelectorId).attr('curIndex', currentSelected);
			$(hashtagSelectorId).attr('totalChild', numberOfOptions);


			element = $(hashtagSelectorId).clone().wrap("<div></div>").parent().html().replace(/select/g,"div");
			lefWid, rigWid;
			leftButton = $("<button class='left_select'>&lsaquo;</button>");
			rightButton = $("<button class='right_select'>&rsaquo;</button>");
			ctrlParent.append(element);
			entParent.append(leftButton);
			entParent.append(ctrlParent);
			entParent.append(rightButton);
			$(hashtagSelectorId).replaceWith(entParent);
			leftButton.css('float','left');
			rightButton.css('float','left');
			lefWid = leftButton.outerWidth();
			rigWid = rightButton.outerWidth();
			ctrlParent.css('width', ctrlWidth + "px");
			ctrlParent.css('position', "relative");
			ctrlParent.css('overflow', "hidden");
			ctrlParent.css('float', "left");
			ctrlParent.css('height', ctrlHeight);
			ctrlParent.addClass(parentClassName);
			entParent.attr('class',originClassNames);
			entParent.addClass(entireClassName);
			entParent.css('width', (ctrlWidth+lefWid+rigWid) + "px");
			entParent.css('height', ctrlHeight);
			entParent.attr('id', selectorId);
			ctrlParent.find('#'+selectorId).attr('class',selectClassName);
			ctrlParent.find('.'+selectClassName).attr('id',selectorId+"Origin");
			ctrlParent.find('.'+selectClassName + " option").each(function(){
				$(this).css('width', (ctrlWidth-4) + "px");
				selWidth += (ctrlWidth);
			})
			ctrlParent.find('#'+selectorId+"Origin").css('width', selWidth);
		};
		$('.' + entireClassName + ' .left_select').on('click', function(){
			var select = $(this).parent().find('#'+selectorId+"Origin");
			var index = parseInt(select.attr('curindex'), 10);
			var left;
			if (index > 0)
			{
				index--;
			}
			else
				index = numberOfOptions - 1;
			currentSelected = index;
			if (index == numberOfOptions - 1)
			{
				left = selWidth - (select.children().eq(index).outerWidth());
				select.animate({
						left: "-="+left,
					}, animateSpeed, function() {
						select.attr('curIndex', index);
						select.children().removeClass('active');
						select.children().eq(index).addClass('active');
						select.children().eq(index).css('background-color','white');
						if (typeof opts.changeEventById == 'function') { 
							opts.changeEventById.call(this, currentSelected);
						}
						if (typeof opts.changeEventByValue == 'function') { 
							opts.changeEventByValue.call(this, select.children().eq(index).html());
						}
					});	
			}
			else
			{
				left = select.children().eq(index+1).outerWidth();
				select.animate({
						left: "+="+left,
					}, animateSpeed, function() {
						select.attr('curIndex', index);
						select.children().removeClass('active');
						select.children().eq(index).addClass('active');
						select.children().eq(index).css('background-color','white');
						if (typeof opts.changeEventById == 'function') { 
							opts.changeEventById.call(this, currentSelected);
						}
						if (typeof opts.changeEventByValue == 'function') { 
							opts.changeEventByValue.call(this, select.children().eq(index).html());
						}
					});
			}
			
		})
		$('.' + entireClassName + ' .right_select').on('click', function(){
			var select = $(this).parent().find('#'+selectorId+"Origin");
			var index = parseInt(select.attr('curindex'), 10);
			var left;
			if (index+1 < numberOfOptions)
			{
				index++;
			}
			else
				index = 0;
			currentSelected = index;
			if (index == 0)
			{
				left = parseInt(select.css('left'));
				select.animate({
						left: "-="+left,
					}, animateSpeed, function() {
						select.attr('curIndex', index);
						select.children().removeClass('active');
						select.children().eq(index).addClass('active');
						select.children().eq(index).css('background-color','white');
						if (typeof opts.changeEventById == 'function') { 
							opts.changeEventById.call(this, currentSelected);
						}
						if (typeof opts.changeEventByValue == 'function') { 
							opts.changeEventByValue.call(this, select.children().eq(index).html());
						}
					});
			}
			else
			{
				left = select.children().eq(index-1).outerWidth();
				select.animate({
						left: "-="+left,
					}, animateSpeed, function() {
						select.attr('curIndex', index);
						select.children().removeClass('active');
						select.children().eq(index).addClass('active');
						select.children().eq(index).css('background-color','white');
						if (typeof opts.changeEventById == 'function') { 
							opts.changeEventById.call(this, currentSelected);
						}
						if (typeof opts.changeEventByValue == 'function') { 
							opts.changeEventByValue.call(this, select.children().eq(index).html());
						}
					});
			}
		})
		function optionValues(element){
			var array = [];
			element.children().each(function(){
				array.push($(this).attr("value"));
			});
			return array;
		};
		
		function optionHtmls(element){
			var array = [];
			element.children().each(function(){
				array.push($(this).html());	
			});
			return array;
		};
	}
});

		

		
