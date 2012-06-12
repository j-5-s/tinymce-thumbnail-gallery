<?php header('Content-Type: text/javascript'); ?>
<?php

//           //js/external_image)list.js.php   /           gallery/                  tinymce/          tinymce-thumbnail-gallery/   plugins/                  wp-content/              [root wp dir]/
require_once(dirname(__FILE__).DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR.'..'.DIRECTORY_SEPARATOR . 'wp-config.php');
 

?>
<?php
global $wpdb;
/*
 *
 */

$querystr = "SELECT * FROM ".$wpdb->prefix ."posts where post_type = 'attachment' and post_mime_type LIKE '%image%'";

$pageposts = $wpdb->get_results($querystr, OBJECT);

$i=1;
// echo $post->guid;
?>

var tinyMCEImageList = new Array(
    <?php foreach($pageposts as $post) :?>
<?php $firstImageSrc = wp_get_attachment_image($post->guid, 'medium', false); ?>
    ["<?php echo $post->post_name; ?>",'<?php echo  $firstImageSrc ?>']<?php if ($i<count($pageposts)) echo ',';$i++ ?>
    <?php endforeach; ?> 
);