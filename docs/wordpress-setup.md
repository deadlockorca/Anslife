# WordPress CMS Setup (`cms.muagi.vn`)

## 1) Core CMS
1. Login `https://cms.muagi.vn/wp-admin`.
2. `Settings -> Permalinks -> Post name`.
3. `Settings -> Reading -> Discourage search engines` for staging.
4. Install plugin from this repo: `wordpress/muagi-cms-core/muagi-cms-core.php`.

## 2) Required Plugins (free)
1. Contact Form 7
2. Flamingo
3. WP Mail SMTP

## 3) Content model
1. Static pages (Page + slug):
- `about-anslife`
- `manufacturing-ecosystem`
- `quality-control`
- `commercial-process`
- `global-network`
- `scholarship-community`
- `contact`
2. Dynamic:
- CPT `product` + taxonomy `product_category`
- CPT `project` + taxonomy `project_type`
- Default `Post` + categories for news

## 4) Product category seed
1. `ghe`
2. `ban`
3. `tu-ke`
4. `bo-phong-ngu`
5. `thiet-ke-rieng`
6. `oem-odm`

## 5) Project type seed
1. `du-an-xuat-khau`
2. `case-san-xuat`
3. `case-cai-tien`
4. `hinh-anh-giao-hang`

## 6) Contact Form 7 templates
Create 2 forms and keep their IDs for frontend env vars.

### Quote request form
```txt
[text* your-name placeholder "Ho ten"]
[email* your-email placeholder "Email"]
[text* your-company placeholder "Cong ty"]
[text product-interest placeholder "San pham quan tam"]
[textarea* your-message placeholder "Noi dung"]
[submit "Gui bao gia"]
```

### Meeting form
```txt
[text* your-name placeholder "Ho ten"]
[email* your-email placeholder "Email"]
[text* your-phone placeholder "So dien thoai"]
[date* meeting-date]
[textarea* your-message placeholder "Noi dung"]
[submit "Dat lich"]
```

## 7) CORS
`MUAGI CMS Core` whitelists:
1. `https://muagi.vn`
2. `https://anslife.vn`
3. `http://localhost:5173`

If domain changes, update whitelist in the plugin file.

## 8) If `/wp-json` returns 404
If `https://cms.muagi.vn/wp-json` returns 404 but `wp-admin` works:
1. Go to `Settings -> Permalinks` and click `Save Changes`.
2. Ensure CMS `.htaccess` contains WordPress rewrite rules.
3. Temporary API base fallback for frontend: `https://cms.muagi.vn/index.php/wp-json`.
