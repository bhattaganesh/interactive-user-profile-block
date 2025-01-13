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
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'closeable_message_block_register' );
