jQuery(window).load(function(){

  jQuery("ul.TINYMCE_gallery img").each(function(){
          //var img_height;
          var Img = new Image()
          Img.src=jQuery(this).attr("src");

          var width = Img.width
      	  var height = Img.height;

          var ratio  = width/height;

          var a_height = jQuery(this).parent("a").height();


          var img_height =  200 / ratio;
        

          if (img_height<a_height) { //the image is smaller than the wrapper, force image height to equal wrapper hieght
              img_height = (a_height * 2);
              

          }
         // console.log(top)

          jQuery(this).css({"height":img_height+"px",'max-width':'inherit'})
   

  })

  //set the height
  jQuery(".TINYMCE_gallery_wrapper").each(function(){
      //apply absolute positionin to TINYMCE_gallery
      //jQuery(this).find(".TINYMCE_gallery").css({"position":"absolute"})

      var gallery_height = parseInt(jQuery(this).children(".TINYMCE_gallery").height());
      var gallery_width = parseInt(jQuery(this).width());
      jQuery(this).find(".TINYMCE_gallery").css({"position":"absolute","width":gallery_width+"px","margin":0})//,
      jQuery(this).find(".TINYMCE_gallery").children("li").css({"list-style-type":"none"})
     // alert(gallery_width)
      jQuery(this).css({"height":(gallery_height)+"px"})
      jQuery(this).find(".TINYMCE_thumbnail_link").css({"margin-top":(gallery_height)+"px"})
      
  })



});


jQuery(document).ready(function(){
            var title = '';
          jQuery("ul.TINYMCE_gallery a").hover(function(){
                    
            if (jQuery(this).children("img").attr("alt").length) {

                    title =  jQuery(this).attr("title");
                    var span = jQuery("<span>"+jQuery(this).children("img").attr("alt")+"</span>")
                    var img_height = jQuery(this).children("img").height()
                    var img_width = jQuery(this).children("img").width()
                    var top = jQuery(this).children("img").css("top")
                    var left = jQuery(this).children("img").css("left")
                   
                    jQuery(span).css({"width":img_width-22+"px","top":top,"left": left})
                    jQuery(this).prepend(span);
                    //remove the alt
                    
                  

            }
            jQuery(this).attr("title","");
              jQuery(this).click(function(){
                        jQuery(this).attr("title",title);
             })
                    
                 

                },function() {
                   jQuery(this).children("span").remove();
                  
                    jQuery(this).attr("title",title)
                   
                })

})





