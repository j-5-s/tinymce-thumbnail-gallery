/*global jQuery*/
jQuery(window).load(function(){
	jQuery("ul.TINYMCE_gallery img").each(function(){
		//var img_height;
		var Img = new Image();
		Img.src=jQuery(this).attr("src");

		var width = Img.width,
			height = Img.height,
			ratio  = width/height,
			a_height = jQuery(this).parent("a").height(),
			img_height =  200 / ratio;

		//the image is smaller than the wrapper, force image height to equal wrapper height
		if (img_height<a_height) {
			img_height = (a_height * 2);
		}

		jQuery(this).css({"height":img_height+"px",'max-width':'inherit'});
	});

	//set the height
	jQuery(".TINYMCE_gallery_wrapper").each(function(){
	//apply absolute positionin to TINYMCE_gallery
		var gallery_height = parseInt(jQuery(this).children(".TINYMCE_gallery").height(), 10);
		var gallery_width = parseInt(jQuery(this).width(), 10);
		jQuery(this).find(".TINYMCE_gallery").css({"position":"absolute","width":gallery_width+"px","margin":0});
		jQuery(this).find(".TINYMCE_gallery").children("li").css({"list-style-type":"none"});
		jQuery(this).css({"height":(gallery_height)+"px"});
		jQuery(this).find(".TINYMCE_thumbnail_link").css({"margin-top":(gallery_height)+"px"});
	});
});

jQuery(document).ready(function(){
	var title = '';
	jQuery("ul.TINYMCE_gallery a").hover(function(){

		if (jQuery(this).children("img").attr("alt").length) {

			title =  jQuery(this).attr("title");

			var span       = jQuery("<span>"+jQuery(this).children("img").attr("alt")+"</span>"),
				img_height = jQuery(this).children("img").height(),
				img_width  = jQuery(this).children("img").width(),
				top        = jQuery(this).children("img").css("top"),
				left       = jQuery(this).children("img").css("left");

			jQuery(span).css({"width":img_width-22+"px","top":top,"left": left});
			jQuery(this).prepend(span);
		}
		jQuery(this).attr("title","");

		jQuery(this).click(function(){
			jQuery(this).attr("title",title);
		});



	},function() {
		jQuery(this).children("span").remove();
		jQuery(this).attr("title",title);
	});
});





