<?php
/**
 * Plugin Name: MUAGI CMS Core
 * Description: Registers ANSLIFE content types, taxonomies, and REST CORS policy.
 * Version: 1.1.1
 * Author: ANSLIFE
 */

if (!defined('ABSPATH')) {
    exit;
}

function muagi_register_content_types() {
    register_post_type('product', array(
        'labels' => array(
            'name' => 'Sản phẩm',
            'singular_name' => 'Sản phẩm',
            'menu_name' => 'Sản phẩm',
            'name_admin_bar' => 'Sản phẩm',
            'add_new' => 'Thêm mới',
            'add_new_item' => 'Thêm sản phẩm',
            'new_item' => 'Sản phẩm mới',
            'edit_item' => 'Sửa sản phẩm',
            'view_item' => 'Xem sản phẩm',
            'all_items' => 'Tất cả sản phẩm',
            'search_items' => 'Tìm sản phẩm',
            'not_found' => 'Không tìm thấy sản phẩm.',
            'not_found_in_trash' => 'Không có sản phẩm trong thùng rác.',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-products',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'page-attributes', 'custom-fields'),
        'rewrite' => array('slug' => 'products'),
    ));

    register_post_type('project', array(
        'labels' => array(
            'name' => 'Dự án',
            'singular_name' => 'Dự án',
            'menu_name' => 'Dự án',
            'name_admin_bar' => 'Dự án',
            'add_new' => 'Thêm mới',
            'add_new_item' => 'Thêm dự án',
            'new_item' => 'Dự án mới',
            'edit_item' => 'Sửa dự án',
            'view_item' => 'Xem dự án',
            'all_items' => 'Tất cả dự án',
            'search_items' => 'Tìm dự án',
            'not_found' => 'Không tìm thấy dự án.',
            'not_found_in_trash' => 'Không có dự án trong thùng rác.',
        ),
        'public' => true,
        'show_in_rest' => true,
        'has_archive' => false,
        'menu_icon' => 'dashicons-portfolio',
        'supports' => array('title', 'editor', 'excerpt', 'thumbnail', 'page-attributes'),
        'rewrite' => array('slug' => 'projects'),
    ));

    register_taxonomy('product_category', 'product', array(
        'labels' => array(
            'name' => 'Danh mục sản phẩm',
            'singular_name' => 'Danh mục sản phẩm',
            'search_items' => 'Tìm danh mục sản phẩm',
            'all_items' => 'Tất cả danh mục sản phẩm',
            'edit_item' => 'Sửa danh mục sản phẩm',
            'update_item' => 'Cập nhật danh mục sản phẩm',
            'add_new_item' => 'Thêm danh mục sản phẩm',
            'new_item_name' => 'Tên danh mục mới',
            'menu_name' => 'Danh mục sản phẩm',
        ),
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'product-category'),
    ));

    register_taxonomy('project_type', 'project', array(
        'labels' => array(
            'name' => 'Loại dự án',
            'singular_name' => 'Loại dự án',
            'search_items' => 'Tìm loại dự án',
            'all_items' => 'Tất cả loại dự án',
            'edit_item' => 'Sửa loại dự án',
            'update_item' => 'Cập nhật loại dự án',
            'add_new_item' => 'Thêm loại dự án',
            'new_item_name' => 'Tên loại dự án mới',
            'menu_name' => 'Loại dự án',
        ),
        'public' => true,
        'hierarchical' => true,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'project-type'),
    ));

    register_taxonomy('product_finish', 'product', array(
        'labels' => array(
            'name' => 'Hoàn thiện bề mặt',
            'singular_name' => 'Hoàn thiện bề mặt',
            'search_items' => 'Tìm hoàn thiện',
            'all_items' => 'Tất cả hoàn thiện',
            'edit_item' => 'Sửa hoàn thiện',
            'update_item' => 'Cập nhật hoàn thiện',
            'add_new_item' => 'Thêm kiểu hoàn thiện',
            'new_item_name' => 'Tên hoàn thiện mới',
            'menu_name' => 'Hoàn thiện',
        ),
        'public' => true,
        'hierarchical' => false,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'product-finish'),
    ));

    register_taxonomy('product_seat_option', 'product', array(
        'labels' => array(
            'name' => 'Tùy chọn mặt ngồi',
            'singular_name' => 'Tùy chọn mặt ngồi',
            'search_items' => 'Tìm tùy chọn mặt ngồi',
            'all_items' => 'Tất cả tùy chọn',
            'edit_item' => 'Sửa tùy chọn mặt ngồi',
            'update_item' => 'Cập nhật tùy chọn mặt ngồi',
            'add_new_item' => 'Thêm tùy chọn mặt ngồi',
            'new_item_name' => 'Tên tùy chọn mới',
            'menu_name' => 'Tùy chọn mặt ngồi',
        ),
        'public' => true,
        'hierarchical' => false,
        'show_in_rest' => true,
        'rewrite' => array('slug' => 'product-seat-option'),
    ));
}
add_action('init', 'muagi_register_content_types');

function muagi_register_product_meta() {
    $meta_keys = array(
        'muagi_product_code',
        'muagi_material',
        'muagi_dimensions_l',
        'muagi_dimensions_d',
        'muagi_dimensions_h',
        'muagi_seat_length',
        'muagi_seat_depth',
        'muagi_seat_height',
        'muagi_spec_note',
        'muagi_gallery_ids',
    );

    foreach ($meta_keys as $meta_key) {
        register_post_meta('product', $meta_key, array(
            'type' => 'string',
            'single' => true,
            'show_in_rest' => true,
            'sanitize_callback' => 'sanitize_text_field',
            'auth_callback' => function () {
                return current_user_can('edit_posts');
            },
        ));
    }
}
add_action('init', 'muagi_register_product_meta');

function muagi_add_product_metaboxes() {
    add_meta_box(
        'muagi-product-specifications',
        'Thông số sản phẩm (ANSLIFE)',
        'muagi_render_product_specifications_metabox',
        'product',
        'normal',
        'default'
    );
}
add_action('add_meta_boxes', 'muagi_add_product_metaboxes');

function muagi_render_product_specifications_metabox($post) {
    wp_nonce_field('muagi_save_product_specifications', 'muagi_product_specs_nonce');

    $fields = array(
        'muagi_product_code' => 'Mã sản phẩm',
        'muagi_material' => 'Chất liệu',
        'muagi_dimensions_l' => 'Kích thước L (cm)',
        'muagi_dimensions_d' => 'Kích thước D (cm)',
        'muagi_dimensions_h' => 'Kích thước H (cm)',
        'muagi_seat_length' => 'Seat length (cm)',
        'muagi_seat_depth' => 'Seat depth (cm)',
        'muagi_seat_height' => 'Seat height (cm)',
        'muagi_gallery_ids' => 'Gallery IDs (vd: 101,102,103)',
        'muagi_spec_note' => 'Ghi chú thông số',
    );

    echo '<table class="form-table" role="presentation"><tbody>';

    foreach ($fields as $key => $label) {
        $value = get_post_meta($post->ID, $key, true);
        echo '<tr>';
        echo '<th scope="row"><label for="' . esc_attr($key) . '">' . esc_html($label) . '</label></th>';
        echo '<td><input type="text" class="regular-text" id="' . esc_attr($key) . '" name="' . esc_attr($key) . '" value="' . esc_attr($value) . '" /></td>';
        echo '</tr>';
    }

    echo '</tbody></table>';
}

function muagi_save_product_specifications($post_id) {
    if (!isset($_POST['muagi_product_specs_nonce'])) {
        return;
    }

    if (!wp_verify_nonce($_POST['muagi_product_specs_nonce'], 'muagi_save_product_specifications')) {
        return;
    }

    if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
        return;
    }

    if (!current_user_can('edit_post', $post_id)) {
        return;
    }

    $meta_keys = array(
        'muagi_product_code',
        'muagi_material',
        'muagi_dimensions_l',
        'muagi_dimensions_d',
        'muagi_dimensions_h',
        'muagi_seat_length',
        'muagi_seat_depth',
        'muagi_seat_height',
        'muagi_spec_note',
        'muagi_gallery_ids',
    );

    foreach ($meta_keys as $meta_key) {
        if (isset($_POST[$meta_key])) {
            update_post_meta($post_id, $meta_key, sanitize_text_field($_POST[$meta_key]));
        }
    }
}
add_action('save_post_product', 'muagi_save_product_specifications');

function muagi_build_product_image_payload($attachment_id) {
    $src = wp_get_attachment_image_url($attachment_id, 'full');
    if (!$src) {
        return null;
    }

    return array(
        'id' => (int) $attachment_id,
        'src' => $src,
        'thumbnail' => wp_get_attachment_image_url($attachment_id, 'thumbnail'),
        'alt' => get_post_meta($attachment_id, '_wp_attachment_image_alt', true),
    );
}

function muagi_get_product_gallery($object) {
    $product_id = isset($object['id']) ? (int) $object['id'] : 0;
    if (!$product_id) {
        return array();
    }

    $gallery_ids_raw = get_post_meta($product_id, 'muagi_gallery_ids', true);
    $gallery_ids = array();

    if (!empty($gallery_ids_raw)) {
        $gallery_ids = array_map('intval', array_filter(array_map('trim', explode(',', $gallery_ids_raw))));
    } else {
        $attachments = get_attached_media('image', $product_id);
        if (!empty($attachments)) {
            foreach ($attachments as $attachment) {
                $gallery_ids[] = (int) $attachment->ID;
            }
        }
    }

    $featured_id = (int) get_post_thumbnail_id($product_id);
    if ($featured_id > 0 && !in_array($featured_id, $gallery_ids, true)) {
        array_unshift($gallery_ids, $featured_id);
    }

    $gallery = array();
    foreach ($gallery_ids as $attachment_id) {
        $image = muagi_build_product_image_payload($attachment_id);
        if ($image) {
            $gallery[] = $image;
        }
    }

    return $gallery;
}

function muagi_get_product_specifications($object) {
    $product_id = isset($object['id']) ? (int) $object['id'] : 0;
    if (!$product_id) {
        return array();
    }

    return array(
        'product_code' => get_post_meta($product_id, 'muagi_product_code', true),
        'material' => get_post_meta($product_id, 'muagi_material', true),
        'dimensions' => array(
            'l' => get_post_meta($product_id, 'muagi_dimensions_l', true),
            'd' => get_post_meta($product_id, 'muagi_dimensions_d', true),
            'h' => get_post_meta($product_id, 'muagi_dimensions_h', true),
        ),
        'seat' => array(
            'length' => get_post_meta($product_id, 'muagi_seat_length', true),
            'depth' => get_post_meta($product_id, 'muagi_seat_depth', true),
            'height' => get_post_meta($product_id, 'muagi_seat_height', true),
        ),
        'note' => get_post_meta($product_id, 'muagi_spec_note', true),
    );
}

function muagi_register_rest_fields() {
    register_rest_field('product', 'gallery', array(
        'get_callback' => 'muagi_get_product_gallery',
        'schema' => null,
    ));

    register_rest_field('product', 'specifications', array(
        'get_callback' => 'muagi_get_product_specifications',
        'schema' => null,
    ));
}
add_action('rest_api_init', 'muagi_register_rest_fields');

function muagi_get_allowed_origins() {
    $allowed_hosts = array(
        'muagi.vn',
        'anslife.vn',
    );

    $origins = array();
    foreach ($allowed_hosts as $host) {
        $host = strtolower(trim($host));
        if ($host === '') {
            continue;
        }

        $origins[] = 'https://' . $host;
        if (strpos($host, 'www.') !== 0) {
            $origins[] = 'https://www.' . $host;
        }
    }

    $origins = array_values(array_unique($origins));

    return apply_filters('muagi_allowed_origins', $origins);
}

function muagi_add_rest_cors_headers($served) {
    $allowed_origins = muagi_get_allowed_origins();

    $origin = get_http_origin();

    $is_localhost = false;
    if ($origin) {
        $parsed = wp_parse_url($origin);
        if (!empty($parsed['host']) && in_array($parsed['host'], array('localhost', '127.0.0.1'), true)) {
            $is_localhost = true;
        }
    }

    if ($origin && (in_array($origin, $allowed_origins, true) || $is_localhost)) {
        header('Access-Control-Allow-Origin: ' . esc_url_raw($origin));
        header('Vary: Origin', false);
        header('Access-Control-Allow-Credentials: true');
        header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, PATCH, DELETE');
        header('Access-Control-Allow-Headers: Authorization, Content-Type, X-WP-Nonce');
    }

    if (isset($_SERVER['REQUEST_METHOD']) && 'OPTIONS' === $_SERVER['REQUEST_METHOD']) {
        status_header(200);
        exit;
    }

    return $served;
}

function muagi_override_default_rest_cors() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', 'muagi_add_rest_cors_headers');
}
add_action('rest_api_init', 'muagi_override_default_rest_cors', 15);

function muagi_after_plugin_activation() {
    muagi_register_content_types();
    flush_rewrite_rules();
}
register_activation_hook(__FILE__, 'muagi_after_plugin_activation');

function muagi_after_plugin_deactivation() {
    flush_rewrite_rules();
}
register_deactivation_hook(__FILE__, 'muagi_after_plugin_deactivation');
