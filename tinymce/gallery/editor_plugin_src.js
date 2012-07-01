/*globals tinymce, jQuery */

(function() {
	tinymce.create('tinymce.plugins.TinymceThumbnailGalleryPlugin', {
		/**
		 * Initializes the plugin, this will be executed after the plugin has been created.
		 * This call is done before the editor instance has finished it's initialization so use the onInit event
		 * of the editor instance to intercept that event.
		 *
		 * @param {tinymce.Editor} ed Editor instance that the plugin is initialized in.
		 * @param {string} url Absolute URL to where the plugin is located.
		 */
		init : function(ed, url) {
			// Register the command so that it can be invoked by using tinyMCE.activeEditor.execCommand('mceExample');
			ed.addCommand('mceTinymceThumbnailGallery', function() {
				ed.windowManager.open({
					file : url + '/gallery.htm',
					width : 480 + parseInt( ed.getLang( 'advimage.delta_width', 0), 10 ),
					height : 385 + parseInt( ed.getLang('advimage.delta_height', 0), 10 ),
					inline : 1,
					resizable : "yes",
					scrollbars : "yes"
				}, {
					plugin_url : url
				});
			});

			// Register example button
			ed.addButton('TinymceThumbnailGallery', {
				title : 'Thumbnail Gallery',
				cmd : 'mceTinymceThumbnailGallery',
				image : url + '/img/gallery_btn.gif'
			});

			// Add a node change handler, selects the button in the UI when a image is selected
			ed.onNodeChange.add(function(ed, cm, n) {
				cm.setActive('TinymceThumbnailGallery',jQuery(n).parents("ul.TINYMCE_gallery").length);
				ed.dom.loadCSS(url + "/css/content.css");
			});
		},


		/**
		 * Creates control instances based in the incomming name. This method is normally not
		 * needed since the addButton method of the tinymce.Editor class is a more easy way of adding buttons
		 * but you sometimes need to create more complex controls like listboxes, split buttons etc then this
		 * method can be used to create those.
		 *
		 * @param {String} n Name of the control to create.
		 * @param {tinymce.ControlManager} cm Control manager to use inorder to create new control.
		 * @return {tinymce.ui.Control} New control instance or null if no control was created.
		 */
		createControl : function(n, cm) {
			return null;
		},

		/**
		 * Returns information about the plugin as a name/value array.
		 * The current keys are longname, author, authorurl, infourl and version.
		 *
		 * @return {Object} Name/value array containing information about the plugin.
		 */
		getInfo : function() {
			return {
				longname : 'Tinymce Thumbnail Gallery',
				author : 'James Charlesworth',
				authorurl : 'http://www.jamescharlesworth.com',
				infourl : 'http://www.jamescharlesworth.com/tools/tincMceGallery',
				version : "0.1"
			};
		}
	});

	// Register plugin
	tinymce.PluginManager.add( 'TinymceThumbnailGallery', tinymce.plugins.TinymceThumbnailGalleryPlugin );
}());