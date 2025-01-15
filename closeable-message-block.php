<?php
/**
 * Plugin Name: Closeable Message Block
 * Description: A Gutenberg block with a closeable message for front-end viewers.
 * Version: 1.0.0
 * Author: Ganesh Bhatta
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

// Register block
function closeable_message_block_register() {
    $blocks = array(
        'closeable-message',
        'price-card',
        'user-profile',
    );

    foreach ( $blocks as $block ) {
        register_block_type( __DIR__ . '/build/blocks/' . $block );
    }

}
add_action( 'init', 'closeable_message_block_register' );

function first_dynamic_block_register() {
    $asset_file = include  __DIR__ . '/build/blocks/first-dynamic-block/index.asset.php';

    wp_register_script(
        'first-dynamic-block',
        plugins_url( 'build/blocks/first-dynamic-block/index.js', __FILE__ ),
        $asset_file['dependencies'],
        $asset_file['version']
    );

    register_block_type( 'interactive-user-profile-block/first-dynamic-block', array(
        'api_version' => 3,
        'editor_script' => 'first-dynamic-block',
        'render_callback' => 'first_dynamic_block_render_callback'
    ) );
}
add_action ('init', 'first_dynamic_block_register');

function first_dynamic_block_render_callback(  $block_attributes, $content  ) {
    $content = '<div class="dynamic-block">';
    $content .= '<h2>Current Date and Time</h2>';
    $content .= '<p>' . date( 'F j, Y, g:i a' ) . '</p>';
    $content .= '</div>';

    return $content;
}