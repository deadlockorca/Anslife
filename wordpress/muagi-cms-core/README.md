# MUAGI CMS Core Plugin

## Install
1. Zip folder `wordpress/muagi-cms-core/`.
2. Upload in `wp-admin -> Plugins -> Add New -> Upload Plugin`.
3. Activate plugin.

## What it does
1. Registers CPT: `product`, `project`
2. Registers taxonomies:
- `product_category`, `project_type`
- `product_finish`, `product_seat_option`
3. Adds product specification metabox in admin
4. Exposes extra REST fields on `product`:
- `gallery`
- `specifications`
5. Adds REST CORS whitelist for frontend domains + localhost/127.0.0.1 dev origins

## Notes
1. After activation, go to `Settings -> Permalinks` and click `Save Changes` once.
2. Keep WordPress plugins minimal: Contact Form 7, Flamingo, WP Mail SMTP.
3. Update CORS whitelist in plugin when moving to new domain.
4. To apply plugin updates, re-upload file and deactivate/activate plugin once.
