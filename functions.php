<?php
/**
 * MyFirstTheme's functions and definitions
 *
 * @package MyFirstTheme
 * @since MyFirstTheme 1.0
 */

define('THEME_NAME','boilerplate');

if (!function_exists('theme_setup')) {
    /**
     * Sets up theme defaults and registers support for various WordPress features.
     *
     * Note that this function is hooked into the after_setup_theme hook, which runs
     * before the init hook. The init hook is too late for some features, such as indicating
     * support post thumbnails.
     */
    function theme_setup()
    {
        //Make theme available for translation. Translations can be placed in the /languages/ directory.
        //load_theme_textdomain(THEME_NAME, get_template_directory() . '/languages');

        //Enable support for post thumbnails and featured images.
        add_theme_support('post-thumbnails');


        //Add support for two custom navigation menus.
        register_nav_menus(array(
            'primary' => __('Primary Menu', 'theme'),
            'secondary' => __('Secondary Menu', 'theme')
        ));

        //Enable support for the following post formats:aside, gallery, quote, image, and video
        add_theme_support('post-formats', array('aside', 'gallery', 'quote', 'image', 'video'));
    }
}
add_action('after_setup_theme', 'theme_setup');

if(!function_exists('enqueue_theme_styles')){
    function add_theme_scripts() {
        wp_enqueue_style( 'style', get_stylesheet_uri() );

        wp_enqueue_style( 'slider', get_template_directory_uri() . '/assets/css/bundle.css', array(), '1.0', 'all');

        wp_enqueue_script( 'script', get_template_directory_uri() . '/assets/js/app.js', array ( 'jquery' ), 1.0, true);

        //if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
        //    wp_enqueue_script( 'comment-reply' );
        //}
    }
}
add_action('wp_enqueue_scripts', 'add_theme_scripts');

//Theme Post Type Registration
require_once( get_theme_file_path( '/include/post-types/template.php' ) );