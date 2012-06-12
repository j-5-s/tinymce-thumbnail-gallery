var GalleryDialog = {
	preInit : function() {
		var url;
							
		tinyMCEPopup.requireLangPack();
		url = tinyMCEPopup.getParam("external_image_list_url");

		document.write('<script language="javascript" type="text/javascript" src="' + tinyMCEPopup.editor.documentBaseURI.toAbsolute(url) + '"></script>');
	},
		
	init : function( ) {
		var f = document.forms[0], 
			nl = f.elements, 
			ed = tinyMCEPopup.editor, 
			dom = ed.dom, 
			n = ed.selection.getNode(),
			li = jQuery( n ).parents("ul.TINYMCE_gallery").children("li"),
			border = jQuery(n).parents("ul.TINYMCE_gallery").find("a").css("borderColor");
		
		tinyMCEPopup.resizeToInnerSize();
		
		this.fillFileList('src_list', 'tinyMCEImageList');

		TinyMCE_EditableSelects.init();

		if (jQuery(n).parents("ul.TINYMCE_gallery").length) { //its an edit

			//set the hidden field to editable //1
			jQuery("#is_edit").val(1);
			jQuery(li).each(function(){

				var fieldset = jQuery("#gallery_form div.image_wrapper:first").clone();

				
				var img = jQuery(this).find("img");
			
				//set the src
				jQuery(fieldset).find("input.src").val(jQuery(img).attr("src"));
			

				jQuery(fieldset).find("select.src_list").val(jQuery(img).attr("src"));
				
				//set the src_list
				jQuery(fieldset).find("input.src_list").val(jQuery(img).attr("src"));

				jQuery(fieldset).find("input.alt").val(jQuery(img).attr("alt"));


				//set x
				jQuery(fieldset).find("input.x").val(jQuery(img).css("left"));
		
				//set y
				jQuery(fieldset).find("input.y").val(jQuery(img).css("top"));

				//get the width of the thumbnail

				jQuery("#width").val(jQuery(img).parent("a").css("width").replace("px",""));
				jQuery("#height").val(jQuery(img).parent("a").css("height").replace("px",""));
		
				//load the preview
				GalleryDialog.previewImage(jQuery(fieldset).find("select.src_list"),jQuery(img).css("left"),jQuery(img).css("top"));
				jQuery("#gallery_form").append(fieldset);
			});
	
			jQuery("#gallery_form div.image_wrapper:first").remove();

			jQuery.farbtastic('#picker').setColor(this.borderColorHex(border));
		} 

								

		if (n.nodeName == 'IMG') {
			nl.src.value = dom.getAttrib(n, 'src');
												nl.alt.value = dom.getAttrib(n, 'alt');
			nl.title.value = dom.getAttrib(n, 'title');
		}

		// Setup browse button
		document.getElementById('srcbrowsercontainer').innerHTML = getBrowserHTML('srcbrowser','src','image','theme_advanced_image');
		if (isVisible('srcbrowser'))
			document.getElementById('src').style.width = '260px';		
	},

	borderColorHex: function( border ) {
		var re    = new RegExp("rgb\((.*)\)"),
			m     = re.exec(border),
			rgb   = m[2].split(","),
			red   = rgb[0].replace("(",""),
			green = rgb[1],
			blue  = rgb[2].replace(")","")

		return "#"+this.toHex(red) + this.toHex(green)+this.toHex(blue);
	},

	toHex: function( N ) {
		if ( typeof N === 'undefined') return "00";

		N = parseInt(N); if (N==0 || isNaN(N)) return "00";
		N =  Math.max(0,N); N=Math.min(N,255); N=Math.round(N);

		return "0123456789ABCDEF".charAt((N-N%16)/16)
				+ "0123456789ABCDEF".charAt(N%16);
	},


	insert : function(file, title) {
		var ed = tinyMCEPopup.editor, t = this, f = document.forms[0];


		//not sure what this does
		if (f.src.value === '') {
			if (ed.selection.getNode().nodeName == 'IMG') {
				ed.dom.remove(ed.selection.getNode());
				ed.execCommand('mceRepaint');
			}

			tinyMCEPopup.close();
			return;
		}

		if (jQuery("#is_edit").attr("value")==1) {
			//its edit, remove it
			ed.dom.remove(jQuery(ed.selection.getNode()).parents("div.TINYMCE_gallery_wrapper"));
		}
		t.insertAndClose();
	},

	insertAndClose : function() {
		var ed = tinyMCEPopup.editor, f = document.forms[0], nl = f.elements, v, args = {}, el;

		tinyMCEPopup.restoreSelection();

		// Fixes crash in Safari
		if (tinymce.isWebKit)
			ed.getWin().focus();

		if (!ed.settings.inline_styles) {
			args = {
				vspace : nl.vspace.value,
				hspace : nl.hspace.value,
				border : nl.border.value,
				align : getSelectValue(f, 'align')
			};
		} else {
			// Remove deprecated values
			args = {
				vspace : '',
				hspace : '',
				border : '',
				align : ''
			};
		}

		tinymce.extend(args, {
			src : nl.src.value,
			alt : nl.alt.value,
			width: '200px'
		});

		

		el = ed.selection.getNode();
							 
								
		if (el && el.nodeName == 'IMG') {
			ed.dom.setAttribs(el, args);
		} else {
			var list="";
			jQuery("input[name=src\[\]]").each(function(){

				//get id
				var id = jQuery(this).attr("id");

				id = id.replace("src","");


				var alt = jQuery(this).parents("div.image_wrapper").find("input.alt").val()


				//load the preview

				var x = parseInt(jQuery(this).parents("div.image_wrapper").find("input.x").val());
				var y = parseInt(jQuery(this).parents("div.image_wrapper").find("input.y").val());


				if (x>-10) {
					 x=-10;
					 
				}
				 

				if (y>-10) {
					 y=-10
				}
					 
				//load the preview
				var old_src  = jQuery(this).val();

				var replace300Regex = new RegExp(/-300x[0-9]+|-[0-9]+x300/);
				var full_src = old_src.replace(replace300Regex,"");

				list+="<li><a class=\"tinymce-thumbnail-gallery-image\" rel=\"TINYMCE_gallery\" title=\""+alt+"\" style=\"width:"+jQuery("#width").val()+"px;height:"+jQuery("#height").val()+"px;border-color:"+jQuery("#color").val()+"\" href=\""+full_src+"\"><img alt=\""+alt+"\" style=\";left:"+x+"px;top:"+y+"px;border-color:"+jQuery("#color").val()+"\" src=\""+jQuery(this).val()+"\" /></a></li>";

			});
									
			//create the ul, then add each li
			var ul = jQuery("<ul> </ul>");
			if (jQuery(""))
			var outer_wrapper = jQuery("<div> </div>")

			var wrapper = jQuery("<div> </div>")

			jQuery(ul).addClass("TINYMCE_gallery");
			jQuery(wrapper).addClass("TINYMCE_gallery_wrapper");
			jQuery(outer_wrapper).append(wrapper);
			 
			jQuery(ul).append(list)
			jQuery(wrapper).append(ul);

			if (jQuery("#is_edit").val()==0) {
				jQuery(wrapper).after("<p class=\"JC_credit_link\"><!--[TINYMCE_THUMBNAIL_LINK]--></p>")
			}
			ed.execCommand('mceInsertContent', false, jQuery(outer_wrapper).html(), {skip_undo : 1});
			ed.undoManager.add();
		}

		tinyMCEPopup.close();
	},

	removeImage : function(div) {
		if (jQuery(".image").length>1) {
			jQuery(div).parents(".image_wrapper").remove();
		} else {
			tinyMCEPopup.close();
			return;
		}

	},

	getAttrib : function(e, at) {
		var ed = tinyMCEPopup.editor, dom = ed.dom, v, v2;

		if (ed.settings.inline_styles) {
			switch (at) {
				case 'align':
					if (v = dom.getStyle(e, 'float'))
						return v;

					if (v = dom.getStyle(e, 'vertical-align'))
						return v;

					break;

				case 'hspace':
					v = dom.getStyle(e, 'margin-left')
					v2 = dom.getStyle(e, 'margin-right');

					if (v && v == v2)
						return parseInt(v.replace(/[^0-9]/g, ''));

					break;

				case 'vspace':
					v = dom.getStyle(e, 'margin-top')
					v2 = dom.getStyle(e, 'margin-bottom');
					if (v && v == v2)
						return parseInt(v.replace(/[^0-9]/g, ''));

					break;

				case 'border':
					v = 0;

					tinymce.each(['top', 'right', 'bottom', 'left'], function(sv) {
						sv = dom.getStyle(e, 'border-' + sv + '-width');

						// False or not the same as prev
						if (!sv || (sv != v && v !== 0)) {
							v = 0;
							return false;
						}

						if (sv)
							v = sv;
					});

					if (v)
						return parseInt(v.replace(/[^0-9]/g, ''));

					break;
			}
		}

		if (v = dom.getAttrib(e, at))
			return v;

		return '';
	},

	addImage : function() {
		var ed = tinyMCEPopup.editor, dom = ed.dom, v, v2;
		select_image = tinyMCEPopup.getParam("select_image")


		var fieldset = jQuery("#gallery_form div.image_wrapper:first").clone();

		var count  = jQuery("#gallery_form div.image_wrapper").length;
	

		jQuery(fieldset).find(".field").each(function(){
				var new_id = jQuery(this).attr("id")+'_'+count;
				jQuery(this).attr("id",new_id);
				jQuery(this).val("")


		});
		jQuery(fieldset).find("img").attr("src",select_image);
	

		jQuery(fieldset).appendTo("#gallery_form");
	},

	deleteGallery : function() {
		var ed = tinyMCEPopup.editor;
		var parent = jQuery(ed.selection.getNode()).parents("div.TINYMCE_gallery_wrapper").parent()
		ed.dom.remove(jQuery(parent).find(".JC_credit_link"))
		ed.dom.remove(jQuery(ed.selection.getNode()).parents("div.TINYMCE_gallery_wrapper"));
		tinyMCEPopup.close();
	},

	previewImage : function(el,left,top) {

		var div =  jQuery(el).parents(".image").children(".image_preview")

		div.html("<a href=\"#\"><img src=\""+jQuery(el).val()+"\" /></a><span>Click & drag image to reposition</span>");
		jQuery(div).children("a").css({"width":jQuery("#width").val()+"px","height":jQuery("#height").val()+"px"});
		jQuery(div).find("img").css({"left":left, "top":top});


		jQuery(el).parent().parents(".image").css({"height":(parseInt(jQuery("#height").val()) +25)+"px"})

		var ratio = jQuery(div).find("img").width()/jQuery(div).find("img").height()

		var Img = new Image()
		Img.src=jQuery(div).find("img").attr("src");

		var width = Img.width;
		var height = Img.height;
		var ratio = width/height;
		if (((jQuery("#width").val()*2)/ratio)<jQuery("#height").val()) { 
			jQuery(div).find("img").css({"height":jQuery("#height").val()*2+"px"})
		} else {
			jQuery(div).find("img").css({"width":"200px"})
		}
		jQuery(div).find("img").draggable({

			scroll: false ,
			stop: function(event, ui) {
				jQuery(el).parents(".image").children("input.x").attr("value",ui.position.left)
				jQuery(el).parents(".image").children("input.y").attr("value",ui.position.top)
			}
		});
	},

				
	fillFileList : function(id, l) {
		var dom = tinyMCEPopup.dom, lst = dom.get(id), v, cl;
							
		l = window[l];
		lst.options.length = 0;
				
		if (l && l.length > 0) {
			lst.options[lst.options.length] = new Option('', '');
			tinymce.each(l, function(o) {
				o[1] = jQuery(o[1]).attr('src');
				lst.options[lst.options.length] = new Option(o[0], o[1]);
			});
		} else {
			dom.remove(dom.getParent(id, 'tr'));
			alert('You have no images in your WordPress media gallery (Left Sidebar > Media). Add images there first, then you can use them in this plugin');
			tinyMCEPopup.close();
		}

	}
}


GalleryDialog.preInit();
tinyMCEPopup.onInit.add(GalleryDialog.init, GalleryDialog);