import type { LanguageCode } from './language';
import { AUTO_TRANSLATIONS } from './autoTranslations';
import { NAV_MENU_TRANSLATIONS } from './navMenuTranslations';

const VIETNAMESE = 'vn';

const PRIMARY_NAV_TRANSLATIONS: Partial<
  Record<Exclude<LanguageCode, typeof VIETNAMESE>, Partial<Record<string, string>>>
> = {
  en: {
    'Trang chủ': 'Home',
    'Về ANSLIFE': 'About ANSLIFE',
    'Triết lý': 'Philosophy',
    'Sản phẩm & Giải pháp': 'Products & Solutions',
    'Vận hành': 'Operations',
    'Nguyên liệu': 'Materials',
    'Sản xuất': 'Manufacturing',
    'Supply Hub Việt Nam': 'Vietnam Supply Hub',
    'Trung tâm cung ứng Việt Nam': 'Vietnam Supply Hub',
    'Chất lượng & Tiêu chuẩn': 'Quality & Standards',
    'Tài nguyên': 'Resources',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'Frequently Asked Questions',
    'Phụng sự xã hội': 'Social Contribution',
    'Liên hệ / Gửi yêu cầu': 'Contact / Send Inquiry',
    'Yêu cầu chung': 'General Inquiry',
    'Yêu cầu báo giá': 'Request Quotation',
    'Tải bản vẽ / ảnh tham chiếu': 'Upload Drawing / Reference Image',
    'Yêu cầu OEM / ODM': 'OEM / ODM Request',
    'Yêu cầu Supply Hub': 'Supply Hub Inquiry',
    'Yêu cầu thăm nhà máy': 'Factory Visit Request',
    'Thông tin liên hệ': 'Contact Information',
  },
  jp: {
    'Trang chủ': 'ホーム',
    'Về ANSLIFE': 'ANSLIFEについて',
    'Triết lý': '理念',
    'Sản phẩm & Giải pháp': '製品・ソリューション',
    'Vận hành': '運用',
    'Nguyên liệu': '原材料',
    'Sản xuất': '製造',
    'Supply Hub Việt Nam': 'ベトナム供給ハブ',
    'Trung tâm cung ứng Việt Nam': 'ベトナム供給ハブ',
    'Chất lượng & Tiêu chuẩn': '品質・基準',
    'Tài nguyên': 'リソース',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'よくある質問',
    'Phụng sự xã hội': '社会貢献',
    'Liên hệ / Gửi yêu cầu': 'お問い合わせ / 依頼送信',
    'Yêu cầu chung': '一般お問い合わせ',
    'Yêu cầu báo giá': '見積依頼',
    'Tải bản vẽ / ảnh tham chiếu': '図面 / 参考画像アップロード',
    'Yêu cầu OEM / ODM': 'OEM / ODM依頼',
    'Yêu cầu Supply Hub': '供給ハブお問い合わせ',
    'Yêu cầu thăm nhà máy': '工場訪問依頼',
    'Thông tin liên hệ': '連絡先情報',
  },
  kr: {
    'Trang chủ': '홈',
    'Về ANSLIFE': 'ANSLIFE 소개',
    'Triết lý': '철학',
    'Sản phẩm & Giải pháp': '제품 및 솔루션',
    'Vận hành': '운영',
    'Nguyên liệu': '원자재',
    'Sản xuất': '제조',
    'Supply Hub Việt Nam': '베트남 공급 허브',
    'Trung tâm cung ứng Việt Nam': '베트남 공급 허브',
    'Chất lượng & Tiêu chuẩn': '품질 및 표준',
    'Tài nguyên': '리소스',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': '자주 묻는 질문',
    'Phụng sự xã hội': '사회공헌',
    'Liên hệ / Gửi yêu cầu': '문의 / 요청 보내기',
    'Yêu cầu chung': '일반 문의',
    'Yêu cầu báo giá': '견적 요청',
    'Tải bản vẽ / ảnh tham chiếu': '도면 / 참고 이미지 업로드',
    'Yêu cầu OEM / ODM': 'OEM / ODM 요청',
    'Yêu cầu Supply Hub': '공급 허브 문의',
    'Yêu cầu thăm nhà máy': '공장 방문 요청',
    'Thông tin liên hệ': '연락처 정보',
  },
  sv: {
    'Trang chủ': 'Hem',
    'Về ANSLIFE': 'Om ANSLIFE',
    'Triết lý': 'Filosofi',
    'Sản phẩm & Giải pháp': 'Produkter & Lösningar',
    'Vận hành': 'Drift',
    'Nguyên liệu': 'Material',
    'Sản xuất': 'Tillverkning',
    'Supply Hub Việt Nam': 'Vietnams Supply Hub',
    'Trung tâm cung ứng Việt Nam': 'Vietnams Supply Hub',
    'Chất lượng & Tiêu chuẩn': 'Kvalitet & Standarder',
    'Tài nguyên': 'Resurser',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'Vanliga frågor',
    'Phụng sự xã hội': 'Socialt bidrag',
    'Liên hệ / Gửi yêu cầu': 'Kontakt / Skicka förfrågan',
    'Yêu cầu chung': 'Allmän förfrågan',
    'Yêu cầu báo giá': 'Offertförfrågan',
    'Tải bản vẽ / ảnh tham chiếu': 'Ladda upp ritning / referensbild',
    'Yêu cầu OEM / ODM': 'OEM / ODM-förfrågan',
    'Yêu cầu Supply Hub': 'Supply Hub-förfrågan',
    'Yêu cầu thăm nhà máy': 'Fabriksbesöksförfrågan',
    'Thông tin liên hệ': 'Kontaktinformation',
  },
  fr: {
    'Trang chủ': 'Accueil',
    'Về ANSLIFE': 'À propos d’ANSLIFE',
    'Triết lý': 'Philosophie',
    'Sản phẩm & Giải pháp': 'Produits & Solutions',
    'Vận hành': 'Opérations',
    'Nguyên liệu': 'Matériaux',
    'Sản xuất': 'Production',
    'Supply Hub Việt Nam': 'Hub d’approvisionnement au Vietnam',
    'Trung tâm cung ứng Việt Nam': 'Hub d’approvisionnement au Vietnam',
    'Chất lượng & Tiêu chuẩn': 'Qualité & Standards',
    'Tài nguyên': 'Ressources',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'Questions fréquentes',
    'Phụng sự xã hội': 'Contribution sociale',
    'Liên hệ / Gửi yêu cầu': 'Contact / Envoyer une demande',
    'Yêu cầu chung': 'Demande générale',
    'Yêu cầu báo giá': 'Demande de devis',
    'Tải bản vẽ / ảnh tham chiếu': 'Téléverser un plan / une image de référence',
    'Yêu cầu OEM / ODM': 'Demande OEM / ODM',
    'Yêu cầu Supply Hub': 'Demande Supply Hub',
    'Yêu cầu thăm nhà máy': 'Demande de visite d’usine',
    'Thông tin liên hệ': 'Informations de contact',
  },
  ru: {
    'Trang chủ': 'Главная',
    'Về ANSLIFE': 'Об ANSLIFE',
    'Triết lý': 'Философия',
    'Sản phẩm & Giải pháp': 'Продукты и решения',
    'Vận hành': 'Операции',
    'Nguyên liệu': 'Материалы',
    'Sản xuất': 'Производство',
    'Supply Hub Việt Nam': 'Центр поставок во Вьетнаме',
    'Trung tâm cung ứng Việt Nam': 'Центр поставок во Вьетнаме',
    'Chất lượng & Tiêu chuẩn': 'Качество и стандарты',
    'Tài nguyên': 'Ресурсы',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'Часто задаваемые вопросы',
    'Phụng sự xã hội': 'Социальный вклад',
    'Liên hệ / Gửi yêu cầu': 'Контакты / Отправить запрос',
    'Yêu cầu chung': 'Общий запрос',
    'Yêu cầu báo giá': 'Запрос предложения',
    'Tải bản vẽ / ảnh tham chiếu': 'Загрузить чертеж / референсное изображение',
    'Yêu cầu OEM / ODM': 'Запрос OEM / ODM',
    'Yêu cầu Supply Hub': 'Запрос Supply Hub',
    'Yêu cầu thăm nhà máy': 'Запрос на посещение фабрики',
    'Thông tin liên hệ': 'Контактная информация',
  },
  es: {
    'Trang chủ': 'Inicio',
    'Về ANSLIFE': 'Sobre ANSLIFE',
    'Triết lý': 'Filosofía',
    'Sản phẩm & Giải pháp': 'Productos y Soluciones',
    'Vận hành': 'Operaciones',
    'Nguyên liệu': 'Materiales',
    'Sản xuất': 'Producción',
    'Supply Hub Việt Nam': 'Centro de Suministro en Vietnam',
    'Trung tâm cung ứng Việt Nam': 'Centro de Suministro en Vietnam',
    'Chất lượng & Tiêu chuẩn': 'Calidad y Estándares',
    'Tài nguyên': 'Recursos',
    'Hỏi đáp': 'FAQ',
    'Câu hỏi thường gặp': 'Preguntas Frecuentes',
    'Phụng sự xã hội': 'Contribución social',
    'Liên hệ / Gửi yêu cầu': 'Contacto / Enviar solicitud',
    'Yêu cầu chung': 'Consulta general',
    'Yêu cầu báo giá': 'Solicitud de cotización',
    'Tải bản vẽ / ảnh tham chiếu': 'Subir plano / imagen de referencia',
    'Yêu cầu OEM / ODM': 'Solicitud OEM / ODM',
    'Yêu cầu Supply Hub': 'Consulta Supply Hub',
    'Yêu cầu thăm nhà máy': 'Solicitud de visita a fábrica',
    'Thông tin liên hệ': 'Información de contacto',
  },
  zh: {
    'Trang chủ': '首页',
    'Về ANSLIFE': '关于 ANSLIFE',
    'Triết lý': '理念',
    'Sản phẩm & Giải pháp': '产品与解决方案',
    'Vận hành': '运营',
    'Nguyên liệu': '原材料',
    'Sản xuất': '生产',
    'Supply Hub Việt Nam': '越南供应中心',
    'Trung tâm cung ứng Việt Nam': '越南供应中心',
    'Chất lượng & Tiêu chuẩn': '质量与标准',
    'Tài nguyên': '资源',
    'Hỏi đáp': '问答',
    'Câu hỏi thường gặp': '常见问题',
    'Phụng sự xã hội': '社会贡献',
    'Liên hệ / Gửi yêu cầu': '联系 / 提交需求',
    'Yêu cầu chung': '一般咨询',
    'Yêu cầu báo giá': '报价请求',
    'Tải bản vẽ / ảnh tham chiếu': '上传图纸 / 参考图片',
    'Yêu cầu OEM / ODM': 'OEM / ODM需求',
    'Yêu cầu Supply Hub': 'Supply Hub咨询',
    'Yêu cầu thăm nhà máy': '工厂参观请求',
    'Thông tin liên hệ': '联系信息',
  },
};

const CONTACT_REQUEST_TRANSLATIONS: Partial<
  Record<Exclude<LanguageCode, typeof VIETNAMESE>, Partial<Record<string, string>>>
> = {
  en: {
    'Liên hệ': 'Contact',
    'Gửi yêu cầu làm việc': 'Send a Work Request',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      'Select the request type that matches your needs, then send the details so the ANSLIFE team can route and respond through the right service group.',
    'Loại yêu cầu': 'Request type',
    'Các loại yêu cầu': 'Request types',
    'Yêu cầu mua hàng / sản xuất': 'Purchasing / Production request',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      'Furniture, components or product groups manufactured according to buyer needs.',
    'Yêu cầu R&D / phát triển mẫu': 'R&D / Sample development request',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      'Product, sample, material, structure or finishing development.',
    'Yêu cầu OEM / ODM': 'OEM / ODM request',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      'Develop products from drawings, physical samples, technical briefs or ideas.',
    'Yêu cầu cấu kiện nội thất': 'Furniture component request',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      'Chair frames, table tops, table legs, cabinet parts, bed parts or custom components.',
    'Yêu cầu hoàn thiện bề mặt': 'Surface finishing request',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'Stain, oil, lacquer, painted finish, matte finish or buyer-specific color samples.',
    'Yêu cầu QC / kiểm soát chất lượng': 'QC / Quality control request',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      'Material inspection, in-process inspection, final inspection or QC reporting.',
    'Yêu cầu Supply Hub': 'Supply Hub request',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      'Warehousing, LCL/FCL consolidation, standard sample management, documentation or recurring shipment.',
    'Yêu cầu tài trợ thương mại': 'Trade finance request',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      'Support trade finance options linked to orders, production, QC and shipment.',
    'Yêu cầu logistics / chứng từ': 'Logistics / Documentation request',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      'Export coordination, packing, container loading and shipment documentation.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': 'Product / product group / service of interest',
    'Nội dung yêu cầu': 'Request details',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'Describe your needs, product group, market, estimated quantity, reference documents or required response timeline.',
    'Bạn đến từ thị trường nào?': 'Which market are you from?',
    'Chọn thị trường': 'Select market',
    'Nhật Bản': 'Japan',
    EU: 'EU',
    Mỹ: 'United States',
    'Hàn Quốc': 'South Korea',
    'Trung Quốc': 'China',
    Úc: 'Australia',
    Canada: 'Canada',
    'Gửi yêu cầu': 'Send request',
    'Họ tên': 'Full name',
    'Công ty': 'Company',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Enter a product name and click Add',
    'Thêm': 'Add',
    'Xóa': 'Remove',
    'Đang tải danh sách sản phẩm...': 'Loading product list...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'Could not load product suggestions from the data system. You can still enter manually.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      'There are no products in the system to suggest yet.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'You can select multiple products. If a product is not suggested, enter it manually and click Add.',
    'Đang gửi dữ liệu...': 'Submitting data...',
    'Đang gửi...': 'Submitting...',
    'Không gửi được form. Vui lòng thử lại.': 'Unable to submit the form. Please try again.',
  },
  jp: {
    'Liên hệ': 'お問い合わせ',
    'Gửi yêu cầu làm việc': '業務依頼を送信',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      'ご要望に合う依頼タイプを選択し、詳細情報を送信してください。ANSLIFEチームが適切なサービス担当へ振り分けて対応します。',
    'Loại yêu cầu': '依頼タイプ',
    'Các loại yêu cầu': '依頼タイプ一覧',
    'Yêu cầu mua hàng / sản xuất': '購買 / 生産依頼',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      'バイヤーの要望に応じた家具、部材、商品グループの生産。',
    'Yêu cầu R&D / phát triển mẫu': 'R&D / サンプル開発依頼',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      '製品、試作サンプル、材料、構造、仕上げ方法の開発。',
    'Yêu cầu OEM / ODM': 'OEM / ODM依頼',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      '図面、実物サンプル、技術ブリーフ、アイデアに基づく製品展開。',
    'Yêu cầu cấu kiện nội thất': '家具部材依頼',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      '椅子フレーム、天板、テーブル脚、収納部材、ベッド部材、カスタム部材。',
    'Yêu cầu hoàn thiện bề mặt': '表面仕上げ依頼',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'ステイン、オイル、ラッカー、カラー塗装、マット仕上げ、バイヤー指定色サンプル。',
    'Yêu cầu QC / kiểm soát chất lượng': 'QC / 品質管理依頼',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      '材料検査、工程内検査、最終検査、QCレポート。',
    'Yêu cầu Supply Hub': 'Supply Hub依頼',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      '保管、LCL/FCL混載、標準サンプル管理、書類対応、定期出荷。',
    'Yêu cầu tài trợ thương mại': '貿易金融依頼',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      '注文、生産、QC、出荷に紐づく貿易金融案を支援します。',
    'Yêu cầu logistics / chứng từ': '物流 / 書類依頼',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      '輸出調整、梱包、コンテナ積載、出荷書類。',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': '関心のある製品 / 商品群 / サービス',
    'Nội dung yêu cầu': '依頼内容',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'ご要望、製品グループ、市場、想定数量、参考資料、希望回答時期をご記入ください。',
    'Bạn đến từ thị trường nào?': 'どの市場からのお問い合わせですか？',
    'Chọn thị trường': '市場を選択',
    'Nhật Bản': '日本',
    EU: 'EU',
    Mỹ: '米国',
    'Hàn Quốc': '韓国',
    'Trung Quốc': '中国',
    Úc: 'オーストラリア',
    Canada: 'カナダ',
    'Gửi yêu cầu': '依頼を送信',
    'Họ tên': 'お名前',
    'Công ty': '会社名',
    'Nhập tên sản phẩm rồi bấm Thêm': '製品名を入力して「追加」を押してください',
    'Thêm': '追加',
    'Xóa': '削除',
    'Đang tải danh sách sản phẩm...': '製品一覧を読み込み中...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'データシステムから製品候補を取得できません。手入力は可能です。',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      '候補として表示できる製品がシステムにまだありません。',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      '複数の製品を選択できます。候補にない場合は手入力して「追加」を押してください。',
    'Đang gửi dữ liệu...': 'データ送信中...',
    'Đang gửi...': '送信中...',
    'Không gửi được form. Vui lòng thử lại.':
      'フォームを送信できませんでした。もう一度お試しください。',
  },
  kr: {
    'Liên hệ': '문의',
    'Gửi yêu cầu làm việc': '업무 요청 보내기',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      '요청 목적에 맞는 유형을 선택한 뒤 정보를 보내면 ANSLIFE 팀이 적합한 서비스 그룹으로 배정해 응답합니다.',
    'Loại yêu cầu': '요청 유형',
    'Các loại yêu cầu': '요청 유형',
    'Yêu cầu mua hàng / sản xuất': '구매 / 생산 요청',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      '바이어 요구에 따른 가구, 부품 또는 제품군 생산.',
    'Yêu cầu R&D / phát triển mẫu': 'R&D / 샘플 개발 요청',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      '제품, 샘플, 자재, 구조 또는 마감 방식 개발.',
    'Yêu cầu OEM / ODM': 'OEM / ODM 요청',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      '도면, 실물 샘플, 기술 브리프 또는 아이디어 기반 제품 개발.',
    'Yêu cầu cấu kiện nội thất': '가구 부품 요청',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      '의자 프레임, 테이블 상판, 다리, 수납 부품, 침대 부품 또는 맞춤 부품.',
    'Yêu cầu hoàn thiện bề mặt': '표면 마감 요청',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      '스테인, 오일, 래커, 컬러 도장, 무광 마감 또는 바이어 지정 컬러 샘플.',
    'Yêu cầu QC / kiểm soát chất lượng': 'QC / 품질관리 요청',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      '자재 검사, 공정 검사, 최종 검사 또는 QC 보고.',
    'Yêu cầu Supply Hub': 'Supply Hub 요청',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      '보관, LCL/FCL 통합, 표준 샘플 관리, 서류 또는 정기 출하.',
    'Yêu cầu tài trợ thương mại': '무역 금융 요청',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      '주문, 생산, QC 및 출하와 연계된 무역 금융 방안을 지원합니다.',
    'Yêu cầu logistics / chứng từ': '물류 / 서류 요청',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      '수출 조율, 포장, 컨테이너 적재 및 선적 서류.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': '관심 제품 / 제품군 / 서비스',
    'Nội dung yêu cầu': '요청 내용',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      '요구사항, 제품군, 시장, 예상 수량, 참고 자료 또는 희망 응답 일정을 입력해 주세요.',
    'Bạn đến từ thị trường nào?': '어느 시장에서 오셨나요?',
    'Chọn thị trường': '시장 선택',
    'Nhật Bản': '일본',
    EU: 'EU',
    Mỹ: '미국',
    'Hàn Quốc': '한국',
    'Trung Quốc': '중국',
    Úc: '호주',
    Canada: '캐나다',
    'Gửi yêu cầu': '요청 보내기',
    'Họ tên': '이름',
    'Công ty': '회사',
    'Nhập tên sản phẩm rồi bấm Thêm': '제품명을 입력한 뒤 추가를 누르세요',
    'Thêm': '추가',
    'Xóa': '삭제',
    'Đang tải danh sách sản phẩm...': '제품 목록을 불러오는 중...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      '데이터 시스템에서 제품 추천을 불러오지 못했습니다. 수동 입력은 가능합니다.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      '시스템에 추천할 제품이 아직 없습니다.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      '여러 제품을 선택할 수 있습니다. 추천에 없으면 직접 입력 후 추가를 누르세요.',
    'Đang gửi dữ liệu...': '데이터 전송 중...',
    'Đang gửi...': '전송 중...',
    'Không gửi được form. Vui lòng thử lại.':
      '폼을 전송할 수 없습니다. 다시 시도해 주세요.',
  },
  sv: {
    'Liên hệ': 'Kontakt',
    'Gửi yêu cầu làm việc': 'Skicka arbetsförfrågan',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      'Välj den förfrågningstyp som passar ditt behov och skicka informationen så att ANSLIFE kan ta emot och svara via rätt tjänstegrupp.',
    'Loại yêu cầu': 'Typ av förfrågan',
    'Các loại yêu cầu': 'Förfrågningstyper',
    'Yêu cầu mua hàng / sản xuất': 'Inköps- / produktionsförfrågan',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      'Produktion av möbler, komponenter eller produktgrupper enligt köparens behov.',
    'Yêu cầu R&D / phát triển mẫu': 'R&D / provutveckling',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      'Utveckling av produkt, prov, material, konstruktion eller ytbehandling.',
    'Yêu cầu OEM / ODM': 'OEM / ODM-förfrågan',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      'Produktutveckling utifrån ritningar, fysiska prover, teknisk brief eller idéer.',
    'Yêu cầu cấu kiện nội thất': 'Förfrågan om möbelkomponenter',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      'Stolsramar, bordsskivor, bordsben, skåpdelar, sängdelar eller specialkomponenter.',
    'Yêu cầu hoàn thiện bề mặt': 'Förfrågan om ytbehandling',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'Stain, olja, lack, färgmålning, matt finish eller köparspecifika färgprover.',
    'Yêu cầu QC / kiểm soát chất lượng': 'QC / kvalitetskontroll',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      'Materialkontroll, produktionskontroll, slutkontroll eller QC-rapportering.',
    'Yêu cầu Supply Hub': 'Supply Hub-förfrågan',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      'Lagring, LCL/FCL-konsolidering, standardprov, dokument eller återkommande leveranser.',
    'Yêu cầu tài trợ thương mại': 'Handelsfinansieringsförfrågan',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      'Stöd för handelsfinansiering kopplad till order, produktion, QC och leverans.',
    'Yêu cầu logistics / chứng từ': 'Logistik / dokumentförfrågan',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      'Exportkoordinering, packning, containerlastning och fraktdokument.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': 'Produkt / produktgrupp / tjänst av intresse',
    'Nội dung yêu cầu': 'Förfrågningsdetaljer',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'Beskriv behov, produktgrupp, marknad, beräknad volym, referensmaterial eller önskad svarstid.',
    'Bạn đến từ thị trường nào?': 'Vilken marknad kommer du från?',
    'Chọn thị trường': 'Välj marknad',
    'Nhật Bản': 'Japan',
    EU: 'EU',
    Mỹ: 'USA',
    'Hàn Quốc': 'Sydkorea',
    'Trung Quốc': 'Kina',
    Úc: 'Australien',
    Canada: 'Kanada',
    'Gửi yêu cầu': 'Skicka förfrågan',
    'Họ tên': 'Namn',
    'Công ty': 'Företag',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Ange produktnamn och klicka på Lägg till',
    'Thêm': 'Lägg till',
    'Xóa': 'Ta bort',
    'Đang tải danh sách sản phẩm...': 'Laddar produktlista...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'Kunde inte ladda produktförslag från datasystemet. Du kan fortfarande ange manuellt.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      'Det finns ännu inga produkter i systemet att föreslå.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'Du kan välja flera produkter. Om den inte finns i förslagen, ange manuellt och klicka på Lägg till.',
    'Đang gửi dữ liệu...': 'Skickar data...',
    'Đang gửi...': 'Skickar...',
    'Không gửi được form. Vui lòng thử lại.':
      'Formuläret kunde inte skickas. Försök igen.',
  },
  fr: {
    'Liên hệ': 'Contact',
    'Gửi yêu cầu làm việc': 'Envoyer une demande de travail',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      "Choisissez le type de demande adapté à votre besoin, puis envoyez les informations afin que l'équipe ANSLIFE les oriente vers le bon service.",
    'Loại yêu cầu': 'Type de demande',
    'Các loại yêu cầu': 'Types de demandes',
    'Yêu cầu mua hàng / sản xuất': 'Demande d’achat / production',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      "Production de meubles, composants ou groupes de produits selon les besoins de l'acheteur.",
    'Yêu cầu R&D / phát triển mẫu': 'Demande R&D / développement d’échantillon',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      'Développement de produit, échantillon, matériau, structure ou solution de finition.',
    'Yêu cầu OEM / ODM': 'Demande OEM / ODM',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      'Développement de produits à partir de plans, échantillons physiques, briefs techniques ou idées.',
    'Yêu cầu cấu kiện nội thất': 'Demande de composants de mobilier',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      'Structures de chaise, plateaux, pieds de table, pièces de rangement, éléments de lit ou composants sur mesure.',
    'Yêu cầu hoàn thiện bề mặt': 'Demande de finition de surface',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'Teinte, huile, laque, peinture couleur, finition mate ou échantillon couleur selon buyer.',
    'Yêu cầu QC / kiểm soát chất lượng': 'Demande QC / contrôle qualité',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      'Inspection des matériaux, contrôle en production, inspection finale ou rapport QC.',
    'Yêu cầu Supply Hub': 'Demande Supply Hub',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      'Stockage, consolidation LCL/FCL, gestion des échantillons standards, documents ou expéditions récurrentes.',
    'Yêu cầu tài trợ thương mại': 'Demande de financement commercial',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      'Accompagnement pour une solution de financement commercial liée aux commandes, à la production, au QC et aux expéditions.',
    'Yêu cầu logistics / chứng từ': 'Demande logistique / documents',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      'Coordination export, emballage, chargement container et documents d’expédition.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': 'Produit / groupe de produits / service concerné',
    'Nội dung yêu cầu': 'Détails de la demande',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'Décrivez le besoin, le groupe de produits, le marché, la quantité estimée, les documents de référence ou le délai de réponse souhaité.',
    'Bạn đến từ thị trường nào?': 'De quel marché venez-vous ?',
    'Chọn thị trường': 'Sélectionner un marché',
    'Nhật Bản': 'Japon',
    EU: 'UE',
    Mỹ: 'États-Unis',
    'Hàn Quốc': 'Corée du Sud',
    'Trung Quốc': 'Chine',
    Úc: 'Australie',
    Canada: 'Canada',
    'Gửi yêu cầu': 'Envoyer la demande',
    'Họ tên': 'Nom complet',
    'Công ty': 'Entreprise',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Saisissez le nom du produit puis cliquez sur Ajouter',
    'Thêm': 'Ajouter',
    'Xóa': 'Supprimer',
    'Đang tải danh sách sản phẩm...': 'Chargement de la liste des produits...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'Impossible de charger les suggestions depuis le système de données. Vous pouvez toujours saisir manuellement.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      'Aucun produit disponible dans le système pour les suggestions.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'Vous pouvez sélectionner plusieurs produits. Si le produit n’apparaît pas, saisissez-le manuellement puis cliquez sur Ajouter.',
    'Đang gửi dữ liệu...': 'Envoi des données...',
    'Đang gửi...': 'Envoi...',
    'Không gửi được form. Vui lòng thử lại.':
      'Impossible d’envoyer le formulaire. Veuillez réessayer.',
  },
  ru: {
    'Liên hệ': 'Контакты',
    'Gửi yêu cầu làm việc': 'Отправить рабочий запрос',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      'Выберите тип запроса, соответствующий вашей задаче, затем отправьте данные, чтобы команда ANSLIFE направила их в нужную сервисную группу.',
    'Loại yêu cầu': 'Тип запроса',
    'Các loại yêu cầu': 'Типы запросов',
    'Yêu cầu mua hàng / sản xuất': 'Запрос на закупку / производство',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      'Производство мебели, компонентов или товарных групп под требования buyer.',
    'Yêu cầu R&D / phát triển mẫu': 'Запрос R&D / разработка образца',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      'Разработка продукта, образца, материала, конструкции или варианта отделки.',
    'Yêu cầu OEM / ODM': 'Запрос OEM / ODM',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      'Разработка продукта по чертежам, физическим образцам, техническому брифу или идее.',
    'Yêu cầu cấu kiện nội thất': 'Запрос мебельных компонентов',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      'Каркасы стульев, столешницы, ножки столов, детали шкафов, кроватей или кастомные компоненты.',
    'Yêu cầu hoàn thiện bề mặt': 'Запрос на финишную отделку',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'Морилка, масло, лак, цветная окраска, матовая отделка или цветовые образцы buyer.',
    'Yêu cầu QC / kiểm soát chất lượng': 'Запрос QC / контроля качества',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      'Проверка материалов, инспекция в производстве, финальная инспекция или отчет QC.',
    'Yêu cầu Supply Hub': 'Запрос Supply Hub',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      'Складирование, консолидация LCL/FCL, управление эталонными образцами, документы или регулярные отгрузки.',
    'Yêu cầu tài trợ thương mại': 'Запрос торгового финансирования',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      'Поддержка вариантов торгового финансирования, связанных с заказом, производством, QC и отгрузкой.',
    'Yêu cầu logistics / chứng từ': 'Запрос по логистике / документам',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      'Координация экспорта, упаковка, загрузка контейнера и отгрузочные документы.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': 'Интересующий продукт / группа товаров / услуга',
    'Nội dung yêu cầu': 'Детали запроса',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'Опишите задачу, группу продуктов, рынок, предполагаемое количество, справочные материалы или желаемый срок ответа.',
    'Bạn đến từ thị trường nào?': 'С какого рынка вы обращаетесь?',
    'Chọn thị trường': 'Выберите рынок',
    'Nhật Bản': 'Япония',
    EU: 'ЕС',
    Mỹ: 'США',
    'Hàn Quốc': 'Южная Корея',
    'Trung Quốc': 'Китай',
    Úc: 'Австралия',
    Canada: 'Канада',
    'Gửi yêu cầu': 'Отправить запрос',
    'Họ tên': 'Полное имя',
    'Công ty': 'Компания',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Введите название продукта и нажмите Добавить',
    'Thêm': 'Добавить',
    'Xóa': 'Удалить',
    'Đang tải danh sách sản phẩm...': 'Загрузка списка продуктов...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'Не удалось загрузить подсказки из системы данных. Вы можете ввести данные вручную.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      'В системе пока нет продуктов для подсказок.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'Можно выбрать несколько продуктов. Если нужного нет в подсказках, введите вручную и нажмите Добавить.',
    'Đang gửi dữ liệu...': 'Отправка данных...',
    'Đang gửi...': 'Отправка...',
    'Không gửi được form. Vui lòng thử lại.':
      'Не удалось отправить форму. Попробуйте еще раз.',
  },
  es: {
    'Liên hệ': 'Contacto',
    'Gửi yêu cầu làm việc': 'Enviar solicitud de trabajo',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      'Elige el tipo de solicitud que corresponde a tu necesidad y envía la información para que el equipo de ANSLIFE la derive al grupo de servicio correcto.',
    'Loại yêu cầu': 'Tipo de solicitud',
    'Các loại yêu cầu': 'Tipos de solicitud',
    'Yêu cầu mua hàng / sản xuất': 'Solicitud de compra / producción',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      'Producción de muebles, componentes o grupos de productos según las necesidades del buyer.',
    'Yêu cầu R&D / phát triển mẫu': 'Solicitud de I+D / desarrollo de muestra',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      'Desarrollo de producto, muestra, material, estructura o solución de acabado.',
    'Yêu cầu OEM / ODM': 'Solicitud OEM / ODM',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      'Desarrollo de productos a partir de planos, muestras físicas, briefs técnicos o ideas.',
    'Yêu cầu cấu kiện nội thất': 'Solicitud de componentes de mobiliario',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      'Estructuras de silla, sobres de mesa, patas, partes de gabinete, cama o componentes personalizados.',
    'Yêu cầu hoàn thiện bề mặt': 'Solicitud de acabado superficial',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      'Tinte, aceite, laca, pintura de color, acabado mate o muestras de color según buyer.',
    'Yêu cầu QC / kiểm soát chất lượng': 'Solicitud de QC / control de calidad',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      'Inspección de materiales, inspección en proceso, inspección final o informe QC.',
    'Yêu cầu Supply Hub': 'Solicitud Supply Hub',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      'Almacenamiento, consolidación LCL/FCL, gestión de muestras estándar, documentación o envíos recurrentes.',
    'Yêu cầu tài trợ thương mại': 'Solicitud de financiación comercial',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      'Apoyo con opciones de financiación comercial vinculadas al pedido, la producción, el QC y el despacho.',
    'Yêu cầu logistics / chứng từ': 'Solicitud de logística / documentación',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      'Coordinación de exportación, embalaje, carga de contenedor y documentos de envío.',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': 'Producto / grupo de productos / servicio de interés',
    'Nội dung yêu cầu': 'Detalles de la solicitud',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      'Describe la necesidad, grupo de productos, mercado, cantidad estimada, documentos de referencia o plazo deseado de respuesta.',
    'Bạn đến từ thị trường nào?': '¿De qué mercado vienes?',
    'Chọn thị trường': 'Seleccionar mercado',
    'Nhật Bản': 'Japón',
    EU: 'UE',
    Mỹ: 'Estados Unidos',
    'Hàn Quốc': 'Corea del Sur',
    'Trung Quốc': 'China',
    Úc: 'Australia',
    Canada: 'Canadá',
    'Gửi yêu cầu': 'Enviar solicitud',
    'Họ tên': 'Nombre completo',
    'Công ty': 'Empresa',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Introduce el nombre del producto y pulsa Añadir',
    'Thêm': 'Añadir',
    'Xóa': 'Eliminar',
    'Đang tải danh sách sản phẩm...': 'Cargando lista de productos...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      'No se pudieron cargar sugerencias desde el sistema de datos. Aún puedes introducirlo manualmente.',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      'Aún no hay productos en el sistema para sugerir.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'Puedes seleccionar varios productos. Si no aparece en las sugerencias, introdúcelo manualmente y pulsa Añadir.',
    'Đang gửi dữ liệu...': 'Enviando datos...',
    'Đang gửi...': 'Enviando...',
    'Không gửi được form. Vui lòng thử lại.':
      'No se pudo enviar el formulario. Inténtalo de nuevo.',
  },
  zh: {
    'Liên hệ': '联系',
    'Gửi yêu cầu làm việc': '提交工作需求',
    'Chọn loại yêu cầu phù hợp với nhu cầu của bạn, sau đó gửi thông tin để đội ngũ ANSLIFE tiếp nhận và phản hồi theo đúng nhóm dịch vụ.':
      '请选择符合需求的类型并提交信息，ANSLIFE团队会转交给对应服务组处理和回复。',
    'Loại yêu cầu': '需求类型',
    'Các loại yêu cầu': '需求类型',
    'Yêu cầu mua hàng / sản xuất': '采购 / 生产需求',
    'Sản xuất nội thất, cấu kiện hoặc nhóm hàng theo nhu cầu buyer.':
      '根据买家需求生产家具、构件或产品组。',
    'Yêu cầu R&D / phát triển mẫu': '研发 / 样品开发需求',
    'Phát triển sản phẩm, mẫu thử, vật liệu, cấu trúc hoặc phương án hoàn thiện.':
      '产品、样品、材料、结构或表面处理方案开发。',
    'Yêu cầu OEM / ODM': 'OEM / ODM需求',
    'Triển khai sản phẩm theo bản vẽ, mẫu thật, brief kỹ thuật hoặc ý tưởng.':
      '根据图纸、实物样品、技术简报或想法开发产品。',
    'Yêu cầu cấu kiện nội thất': '家具构件需求',
    'Khung ghế, mặt bàn, chân bàn, bộ phận tủ, giường hoặc cấu kiện tùy chỉnh.':
      '椅架、桌面、桌脚、柜体部件、床部件或定制构件。',
    'Yêu cầu hoàn thiện bề mặt': '表面处理需求',
    'Stain, oil, lacquer, sơn màu, matte finish hoặc mẫu màu theo buyer.':
      '染色、油蜡、漆面、彩色涂装、哑光效果或买家指定色样。',
    'Yêu cầu QC / kiểm soát chất lượng': 'QC / 质量控制需求',
    'Kiểm tra vật liệu, kiểm tra trong sản xuất, kiểm tra cuối hoặc báo cáo QC.':
      '材料检验、生产过程检验、最终检验或QC报告。',
    'Yêu cầu Supply Hub': 'Supply Hub需求',
    'Lưu kho, gom hàng LCL/FCL, quản lý mẫu chuẩn, chứng từ hoặc xuất hàng định kỳ.':
      '仓储、LCL/FCL集货、标准样品管理、单证或定期出货。',
    'Yêu cầu tài trợ thương mại': '贸易融资需求',
    'Hỗ trợ phương án tài trợ thương mại gắn với đơn hàng, sản xuất, QC và xuất hàng.':
      '支持与订单、生产、QC和出货关联的贸易融资方案。',
    'Yêu cầu logistics / chứng từ': '物流 / 单证需求',
    'Điều phối xuất khẩu, packing, container loading và hồ sơ giao hàng.':
      '出口协调、包装、装柜和交货文件。',
    'Sản phẩm / nhóm hàng / dịch vụ quan tâm': '关注的产品 / 产品组 / 服务',
    'Nội dung yêu cầu': '需求内容',
    'Mô tả nhu cầu, nhóm sản phẩm, thị trường, số lượng dự kiến, tài liệu tham chiếu hoặc thời gian cần phản hồi.':
      '请描述需求、产品组、市场、预计数量、参考资料或期望回复时间。',
    'Bạn đến từ thị trường nào?': '您来自哪个市场？',
    'Chọn thị trường': '选择市场',
    'Nhật Bản': '日本',
    EU: '欧盟',
    Mỹ: '美国',
    'Hàn Quốc': '韩国',
    'Trung Quốc': '中国',
    Úc: '澳大利亚',
    Canada: '加拿大',
    'Gửi yêu cầu': '提交需求',
    'Họ tên': '姓名',
    'Công ty': '公司',
    'Nhập tên sản phẩm rồi bấm Thêm': '输入产品名称后点击添加',
    'Thêm': '添加',
    'Xóa': '删除',
    'Đang tải danh sách sản phẩm...': '正在加载产品列表...',
    'Không tải được gợi ý sản phẩm từ hệ thống dữ liệu. Bạn vẫn có thể nhập thủ công.':
      '无法从数据系统加载产品建议。你仍然可以手动输入。',
    'Chưa có sản phẩm trong hệ thống để gợi ý.':
      '系统中暂无可建议的产品。',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      '可以选择多个产品。如果建议中没有，请手动输入后点击添加。',
    'Đang gửi dữ liệu...': '正在提交数据...',
    'Đang gửi...': '提交中...',
    'Không gửi được form. Vui lòng thử lại.':
      '表单提交失败，请重试。',
  },
};

const TRANSLATIONS: Partial<Record<
  Exclude<LanguageCode, typeof VIETNAMESE>,
  Partial<Record<string, string>>
>> = {
  en: {
    'Trang chủ': 'Home',
    'Bàn - Tủ trang điểm': 'Table - Dressing cabinet',
    'Bàn Cafe - Bàn trà': 'Coffee Table - Tea Table',
    'Bàn Console - Kệ Console': 'Console table - Console shelf',
    'Bàn học - Bàn làm việc': 'Study desk - Work desk',
    'Bàn Lamp - Bàn góc': 'Lamp Table - Corner table',
    'Bàn ngoài trời': 'Outdoor table',
    'Bình hoa - Lọ hoa': 'Vase - Vase of flowers',
    'Bộ bàn ghế ngoài trời': 'Outdoor furniture set',
    'Bộ chăn ga gối': 'Bedding set',
    'English': 'English',
    'Facebook': 'Facebook',
    'Ghế Bar - Ghế đôn': 'Bar Chairs - Stools',
    'Ghế Bench': 'Bench Chair',
    'Ghế học - Ghế làm việc': 'Study chair - Working chair',
    'Ghế ngoài trời': 'Outdoor chairs',
    'Giường': 'Bed',
    'Giường 2m2': 'Bed 2m2',
    'Giường King': 'King bed',
    'Giường Queen': 'Queen bed',
    'Giường tầng': 'Bunk bed',
    'Giường đơn - Cũi': 'Single bed - Crib',
    'Giỏ trang trí - Hộp trang trí': 'Decorative basket - Decorative box',
    'Gương trang trí': 'Decorative mirror',
    'Hoa giả- cây giả': 'Artificial flowers - fake plants',
    'Hậu cần': 'Logistics',
    'Instagram': 'Instagram',
    'Không gian ngoài trời': 'Outdoor space',
    'Khăn trải bàn - Tấm lót trang trí': 'Tablecloth - Decorative placemat',
    'Nến - Tinh dầu thơm': 'Candles - Fragrance essential oils',
    'Pha lê cao cấp Bohemia': 'High quality Bohemia crystal',
    'Phụ kiện trang trí': 'Decorative accessories',
    'Sofa - Ghế thư giãn': 'Sofa - Relaxation chair',
    'Sofa 2 chỗ': '2-seat sofa',
    'Sofa 3 chỗ': '3-seat sofa',
    'Sofa bed': 'Sofa bed',
    'Sofa da bò': 'Cowhide sofa',
    'Sofa góc - Sofa bộ': 'Corner sofa - Sofa set',
    'Sofa thư giãn Recliner': 'Recliner relaxing sofa',
    'Sofa đơn': 'Single sofa',
    'Sản phẩm ngoài trời khác': 'Other outdoor products',
    'Thảm': 'Carpet',
    'TikTok': 'TikTok',
    'Tiếng Anh': 'English',
    'Tiếng Hàn': 'Korean',
    'Tiếng Nhật': 'Japanese',
    'Tiếng Việt': 'Vietnamese',
    'Tranh': 'Painting',
    'Tủ - Kệ': 'Cabinets - Shelves',
    'Tủ - Kệ giầy': 'Cabinet - Shoe shelf',
    'Tủ kính - Tủ trưng bầy - Tủ sách': 'Glass cabinets - Display cabinets - Bookcases',
    'Tủ ngăn kéo - Tủ trang trí nhỏ': 'Chest of drawers - Small decorative cabinet',
    'Tủ nhà tắm - Lavabo': 'Bathroom cabinet - Lavabo',
    'Tủ Sideboard - Tủ Buffet': 'Sideboard Cabinet - Buffet Cabinet',
    'Tủ Tivi - Kệ Tivi': 'TV Cabinet - TV Shelf',
    'Vỏ gối trang trí': 'Decorative pillowcases',
    'YouTube': 'YouTube',
    'Đèn': 'Lamp',
    'Đôn - Ottoman': 'Don - Ottoman',
    'Đệm': 'Cushion',
    'Đồ cho bé': 'Baby items',
    'Đồ gia dụng': 'Household appliances',
    'Đồ gia dụng - Đồ nhà bếp': 'Household appliances - Kitchen appliances',
    'Đồ trang trí': 'Decorations',
    'Đồ trang trí Giáng Sinh': 'Christmas decorations',
    'Ưu đãi độc quyền': 'Exclusive offers',
    '日本語': 'Japanese',
    '한국어': 'Korean',
    'Về ANSLIFE': 'About ANSLIFE',
    'Về Anslife': 'About ANSLIFE',
    'Giới thiệu về Anslife': 'About ANSLIFE',
    'Giới thiệu về công ty': 'Company Introduction',
    'Lịch sử phát triển': 'Development History',
    'Giới thiệu ANSLIFE': 'ANSLIFE Introduction',
    'Giới thiệu chương trình đối tác': 'Partner Program Overview',
    'Giới thiệu triết lý': 'Philosophy Overview',
    'Công cụ & Năng lực': 'Tools & Capabilities',
    'Công cụ & năng lực': 'Tools & Capabilities',
    'Dự án & Mạng lưới': 'Projects & Network',
    'Dự án & mạng lưới': 'Projects & Network',
    'Liên hệ & Hỗ trợ': 'Contact & Support',
    'Liên hệ & hỗ trợ': 'Contact & Support',
    'Cá nhân': 'Individual',
    'Tổ chức': 'Organization',
    'Đối tác đặc biệt': 'Special Partner',
    'Hệ sinh thái sản xuất': 'Manufacturing Ecosystem',
    'Năng lực sản xuất': 'Manufacturing Capability',
    'Quy mô hệ sinh thái sản xuất': 'Manufacturing Ecosystem Scale',
    'Công suất sản xuất': 'Production Capacity',
    'Năng lực phát triển sản phẩm': 'Product Development Capability',
    'Khả năng xử lý đơn hàng': 'Order Handling Capability',
    'Quy mô hệ sinh thái': 'Ecosystem Scale',
    'Sản xuất theo yêu cầu (OEM / ODM)': 'Custom Manufacturing (OEM / ODM)',
    'Sản xuất theo yêu cầu': 'Custom Manufacturing',
    'Thị trường xuất khẩu': 'Export Markets',
    'Kiểm soát chất lượng': 'Quality Control',
    'Hệ thống kiểm soát chất lượng': 'Quality Control System',
    'Sản phẩm': 'Products',
    'Sản phẩm & Giải pháp': 'Products & Solutions',
    'Nội thất hoàn thiện': 'Finished Furniture',
    'Nhóm nội thất hoàn thiện sẵn sàng phát triển cho buyer quốc tế.':
      'Finished furniture product groups ready for development for international buyers.',
    'ANSLIFE sản xuất nội thất hoàn thiện theo mẫu duyệt, bản vẽ và tiêu chuẩn của buyer quốc tế tại Việt Nam, từ lựa chọn vật liệu đến kiểm soát chất lượng và đóng gói xuất khẩu.':
      'ANSLIFE manufactures finished furniture in Vietnam based on approved samples, technical drawings, and international buyer standards, from material selection to quality control and export packing.',
    'Chúng tôi kết nối sản phẩm với hệ thống nhà máy, chuỗi cung ứng vật liệu, lưu kho và xuất hàng định kỳ để buyer có thể vận hành đơn hàng ổn định, minh bạch và phù hợp từng thị trường.':
      'We connect products with factory operations, material supply chains, warehousing, and scheduled export so buyers can manage stable, transparent orders for each target market.',
    '9 nhóm sản phẩm nội thất hoàn thiện': '9 finished furniture product groups',
    '10 nhóm sản phẩm nội thất hoàn thiện': '10 finished furniture product groups',
    'Sản xuất đa dạng các dòng ghế ăn, ghế phòng khách, ghế bar, ghế cafe, ghế gỗ và ghế bọc nệm.':
      'Dining chairs, lounge chairs, bar chairs, cafe chairs, wooden chairs, and upholstered chair programs.',
    'Các dòng bàn ăn, bàn cafe, bàn làm việc và bàn phụ theo tiêu chuẩn chất lượng và hoàn thiện theo yêu cầu.':
      'Dining tables, cafe tables, work tables, and side tables made to buyer quality and finishing requirements.',
    'Tủ quần áo, tủ sideboard, tủ giày và các giải pháp lưu trữ theo thiết kế và công năng của dự án.':
      'Wardrobes, sideboards, shoe cabinets, and storage solutions based on project design and function.',
    'Kệ sách, kệ trang trí và kệ lưu trữ theo bản vẽ hoặc thiết kế riêng cho từng thị trường.':
      'Book shelves, display shelves, and storage shelving made from drawings or market-specific designs.',
    'Giường ngủ và khung giường theo các tiêu chuẩn kỹ thuật, độ bền kết cấu và yêu cầu đóng gói xuất khẩu.':
      'Bed frames and bedroom products built to technical standards, structural durability, and export packing requirements.',
    'Ghế đôn, ghế băng và ottoman theo yêu cầu kích thước, vật liệu bọc và quy cách hoàn thiện.':
      'Stools, benches, and ottomans produced to required dimensions, upholstery materials, and finish specifications.',
    'Ghế mây, bàn mây, sản phẩm kết hợp vật liệu tự nhiên và khung gỗ theo định hướng thương mại của buyer.':
      'Rattan chairs, rattan tables, natural-material products, and mixed-material furniture with wood frames.',
    'Sofa, ghế lounge, ghế ăn bọc nệm và các sản phẩm theo mẫu duyệt, tiêu chuẩn foam và vật liệu bọc.':
      'Sofas, lounge chairs, upholstered dining chairs, and approved-sample products with foam and fabric standards.',
    'Nhóm sản phẩm ngoài trời với vật liệu và hoàn thiện phù hợp điều kiện sử dụng, lưu kho và vận chuyển quốc tế.':
      'Outdoor products with suitable materials, finishes, storage requirements, and international transport readiness.',
    'Sản phẩm nội thất tùy chỉnh theo bản vẽ, mẫu duyệt và tiêu chuẩn riêng cho dự án khách sạn, resort, văn phòng và không gian thương mại.':
      'Custom furniture developed from technical drawings, approved samples, and project standards for hotels, resorts, offices, and commercial spaces.',
    'Sản phẩm theo bản vẽ kỹ thuật, mẫu duyệt và tiêu chuẩn riêng của từng buyer quốc tế.':
      'Products developed from technical drawings, approved samples, and private standards for international buyers.',
    'Từ mẫu duyệt, bản vẽ kỹ thuật và tiêu chuẩn riêng của buyer.':
      'Production based on approved samples, technical drawings, and buyer-specific standards.',
    'Chuỗi cung ứng vật liệu': 'Material supply chain',
    'Kết nối nguồn vật liệu ổn định tại Việt Nam: gỗ tự nhiên, plywood, MDF, veneer, foam và phụ kiện.':
      'Stable sourcing in Vietnam for solid wood, plywood, MDF, veneer, foam, and hardware.',
    'Kiểm soát chất lượng độc lập': 'Independent quality control',
    'QC độc lập theo mẫu duyệt, tiêu chuẩn vật liệu, kích thước, màu sắc và quy cách đóng gói.':
      'QC against approved samples, material standards, dimensions, colors, and packing specifications.',
    'Đóng gói & xuất khẩu': 'Packing & export',
    'Hỗ trợ chứng từ, logistics và xuất hàng định kỳ theo kế hoạch dự án.':
      'Support for documentation, logistics, and scheduled export according to each project plan.',
    'Gửi yêu cầu sản phẩm cho ANSLIFE': 'Send your product request to ANSLIFE',
    'Buyer có thể gửi bản vẽ, mẫu thật, hình ảnh tham khảo hoặc yêu cầu tiêu chuẩn sản phẩm. ANSLIFE sẽ xem xét và đề xuất phương án sản xuất, vật liệu, kiểm soát chất lượng và xuất hàng phù hợp.':
      'Buyers can send drawings, physical samples, reference images, or product standard requirements. ANSLIFE will review and propose suitable production, material, quality control, and export options.',
    'Tải bản vẽ lên': 'Upload drawings',
    'Liên hệ ANSLIFE': 'Contact ANSLIFE',
    'Linh kiện nội thất': 'Furniture Components',
    'Cấu kiện nội thất': 'Furniture Components',
    'Linh kiện cho ghế, bàn, tủ và các cấu phần bọc nệm.':
      'Components for chairs, tables, cabinets, and upholstered parts.',
    'Tủ & lưu trữ': 'Cabinets & Storage',
    'Kệ': 'Shelves',
    'Nội thất bọc nệm': 'Upholstered Furniture',
    'Nội thất ngoài trời': 'Outdoor Furniture',
    'Nội thất tùy chỉnh dự án': 'Custom Project Furniture',
    'Ván, gỗ tự nhiên, veneer, foam, vật liệu bọc và vật liệu đóng gói.':
      'Boards, solid wood, veneer, foam, upholstery materials, and packing materials.',
    'Chân gỗ': 'Wooden Legs',
    'Bộ phận bọc nệm': 'Upholstery Parts',
    'Linh kiện mây': 'Rattan Components',
    'Cấu kiện mây tre': 'Rattan & Bamboo Components',
    'Tổng quan dịch vụ cung ứng vật liệu': 'Material Supply Service Overview',
    'Ván ép & ván công nghiệp': 'Plywood & Boards',
    'Nguyên liệu gỗ': 'Wood Materials',
    'Vật liệu mút & bọc': 'Foam & Upholstery Materials',
    'Vật liệu mây tre': 'Rattan & Bamboo Materials',
    'Vải / da / vật liệu bọc': 'Fabric / Leather / Upholstery',
    'Vật liệu đóng gói': 'Packing Materials',
    'Phát triển OEM/ODM': 'OEM/ODM Development',
    'Giải pháp dịch vụ': 'Service Solutions',
    'Giải pháp vận hành & cung ứng': 'Operations & Supply Solutions',
    'Phát triển sản phẩm OEM / ODM': 'OEM / ODM Product Development',
    'Thẩm định năng lực nhà máy': 'Factory Capability Assessment',
    'Vận hành & quản lý dự án xuất khẩu': 'Export Project Operation & Management',
    'QC độc lập trong dự án': 'Independent QC in Projects',
    'Điều phối logistics & xuất nhập khẩu dự án':
      'Project Logistics & Import-Export Coordination',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      'From technical drawings, physical samples, or product ideas to sample development and mass production in Vietnam.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      'Operations, supply, warehousing, QC, packing, and export consolidation solutions for international buyers.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE supports international buyers in operating projects in Vietnam, from feasibility assessment, product development, factory assessment, quality control, logistics, and warehousing to trade finance and shipment.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      'Illustration of logistics and the global supply chain',
    '1. Phát triển sản phẩm OEM / ODM': '1. OEM / ODM Product Development',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      'From drawings, physical samples, or product ideas to sample development and mass production.',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. Project & Supply Chain Feasibility Assessment',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      'Assessing product, material, factory, capacity, timeline, cost, and Vietnam supply chain fit.',
    '3. Thẩm định năng lực nhà máy': '3. Factory Capability Assessment',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      'Assessing factory capability by product, material, output, quality standards, and delivery schedule.',
    '4. Vận hành & quản lý dự án xuất khẩu':
      '4. Export Project Operation & Management',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      'Tracking progress, coordinating information, managing production, handling issues, and reporting project status.',
    '5. QC độc lập trong dự án': '5. Independent QC in Projects',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      'Quality control independent from the factory, aligned with buyer standards and each target market.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. Project Logistics & Import-Export Coordination',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      'Supporting import of supplies, components, and materials; consolidation, warehousing, documents, and international shipment.',
    '7. Lưu kho tại Việt Nam': '7. Warehousing in Vietnam',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      'Storing goods, materials, components, approved samples, packing standards, and buffer inventory in Vietnam.',
    '8. Tài trợ thương mại': '8. Trade Finance',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      'Controlled trade finance for buyers and subcontracting factories, linked to orders, materials, production, QC, and shipment.',
    'Hành trình của một dự án tại ANSLIFE':
      'The Journey of a Project at ANSLIFE',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'We accompany buyers throughout the project journey, from concept to final delivery.',
    'Ý tưởng & yêu cầu': 'Concept & Requirements',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'Project & Supply Chain Feasibility Assessment',
    'Đánh giá khả thi': 'Feasibility Assessment',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      'Reviewing product, materials, cost, and timeline.',
    'Phát triển sản phẩm OEM / ODM.': 'OEM / ODM product development.',
    'Thẩm định nhà máy': 'Factory Assessment',
    'Thẩm định năng lực nhà máy.': 'Factory capability assessment.',
    'Vận hành dự án': 'Project Operation',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      'Export project operation and trade finance.',
    'QC độc lập trong dự án.': 'Independent QC in projects.',
    'Logistics & xuất nhập khẩu': 'Logistics & Import-Export',
    'Điều phối logistics & xuất nhập khẩu dự án.':
      'Project logistics and import-export coordination.',
    'Lưu kho & hỗ trợ': 'Warehousing & Support',
    'Lưu kho tại Việt Nam và tài trợ thương mại.':
      'Warehousing in Vietnam and trade finance.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      'Why do buyers choose ANSLIFE operations & supply solutions?',
    'Một đầu mối - toàn bộ giải pháp': 'One contact point - complete solution',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      'From product development to shipment, all within one ecosystem.',
    'Độc lập - khách quan - minh bạch': 'Independent - objective - transparent',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'Representing buyer interests while independently controlling quality and risk.',
    'Hiểu thị trường quốc tế': 'International market understanding',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      'Understanding the standards, regulations, and practices of major markets.',
    'Tối ưu chi phí & hiệu quả': 'Cost & efficiency optimization',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'Optimizing the supply chain, reducing costs, and shortening project timelines.',
    'Đồng hành dài hạn': 'Long-term partnership',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'Committed to long-term partnership and sustainable growth with buyers.',
    'Sẵn sàng bắt đầu dự án của bạn?': 'Ready to start your project?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      'Send your request today and the ANSLIFE team will respond as soon as possible.',
    'Gửi yêu cầu': 'Send inquiry',
    'Tải tài liệu / bản vẽ lên': 'Upload documents / drawings',
    'QC & Kiểm định': 'QC & Inspection',
    'Giải pháp lưu kho tại Việt Nam': 'Vietnam Storage Solution',
    'Gom hàng xuất khẩu': 'Export Consolidation',
    'Nguyên liệu': 'Materials',
    'Gỗ kỹ thuật': 'Engineered Wood',
    'Vật liệu tự nhiên': 'Natural Materials',
    Mây: 'Rattan',
    Tre: 'Bamboo',
    'Mặt đan mây': 'Cane Webbing',
    'Vật liệu bọc nệm': 'Upholstery Materials',
    Vải: 'Fabric',
    'Da / PU': 'Leather / PU',
    'Vật liệu đệm': 'Cushion Materials',
    'Hoàn thiện bề mặt': 'Finishing',
    'Hoàn thiện tự nhiên': 'Natural Finish',
    'Hoàn thiện dầu': 'Oil Finish',
    'Hoàn thiện sơn màu': 'Painted Finish',
    'Hoàn thiện mờ': 'Matte Finish',
    'Thùng carton': 'Carton',
    'Foam bảo vệ': 'Foam Protection',
    'Bảo vệ cạnh': 'Edge Protection',
    'Nhà cung ứng vật liệu nội thất Việt Nam': 'Furniture Materials Supplier Vietnam',
    'Nhà cung ứng plywood Việt Nam': 'Plywood Supplier Vietnam',
    'Vật liệu gỗ cho sản xuất nội thất': 'Wood Materials for Furniture Production',
    'Foam & vật liệu bọc nệm Việt Nam': 'Foam Upholstery Materials Vietnam',
    'Vật liệu đóng gói nội thất xuất khẩu': 'Packing Materials for Export Furniture',
    'Nhà sản xuất nội thất Việt Nam': 'Vietnam Furniture Manufacturer',
    'Nhà sản xuất nội thất gỗ Việt Nam': 'Vietnam Wooden Furniture Manufacturer',
    'Nhà sản xuất nội thất OEM / ODM tại Việt Nam':
      'OEM ODM Furniture Manufacturer Vietnam',
    'Đối tác sản xuất nội thất Việt Nam': 'Vietnam Furniture Production Partner',
    'Supply Hub Việt Nam cho buyer Nhật Bản': 'Vietnam Supply Hub for Japanese Buyers',
    'Giải pháp lưu kho Việt Nam cho nhà nhập khẩu':
      'Vietnam Storage Solution for Importers',
    'Xuất hàng hằng tuần từ Việt Nam sang Nhật Bản':
      'Weekly Shipment from Vietnam to Japan',
    'Dịch vụ gom hàng xuất khẩu Việt Nam': 'Vietnam Export Consolidation Service',
    'Phòng tiêu chuẩn buyer': 'Buyer Standard Room',
    'Checklist QC nội thất': 'Furniture QC Checklist',
    'Tiêu chuẩn đóng gói xuất khẩu': 'Export Packing Standard',
    'Nguồn vật liệu phục vụ sản xuất nội thất cho buyer và đối tác quốc tế.':
      'Furniture material supply for buyers and international production partners.',
    'Nguồn plywood cho sản xuất nội thất và kế hoạch xuất hàng từ Việt Nam.':
      'Plywood supply for furniture production and shipment planning from Vietnam.',
    'Gỗ tự nhiên, ván kỹ thuật và mẫu vật liệu cho phát triển sản phẩm.':
      'Solid wood, engineered boards, and material references for product development.',
    'Foam, vải, da và vật liệu đệm cho sản phẩm nội thất.':
      'Foam, fabric, leather, and cushion materials for furniture products.',
    'Carton, foam bảo vệ, bảo vệ cạnh và packing cho hàng nội thất xuất khẩu.':
      'Cartons, foam protection, edge protection, and packing materials for export furniture.',
    'Năng lực sản xuất nội thất tại Việt Nam cho buyer quốc tế.':
      'Furniture manufacturing capability in Vietnam for international buyers.',
    'Sản xuất nội thất gỗ từ Việt Nam theo yêu cầu buyer.':
      'Wooden furniture manufacturing from Vietnam for buyer requirements.',
    'Phát triển mẫu và sản xuất OEM / ODM nội thất tại Việt Nam.':
      'Furniture sample development and OEM ODM manufacturing in Vietnam.',
    'Đối tác sản xuất, QC và điều phối xuất khẩu nội thất từ Việt Nam.':
      'Furniture production, QC, and export coordination partner from Vietnam.',
    'Điều phối lưu kho, mẫu chuẩn và xuất hàng từ Việt Nam cho buyer Nhật Bản.':
      'Storage, standard samples, and shipment coordination from Vietnam for Japanese buyers.',
    'Lưu kho và tổ chức tồn kho phục vụ importer làm việc với nguồn cung Việt Nam.':
      'Storage and inventory organization for importers working with Vietnam supply.',
    'Điều phối lịch xuất hàng định kỳ từ Việt Nam sang Nhật Bản.':
      'Recurring shipment coordination from Vietnam to Japan.',
    'Gom lô hàng, vật liệu và linh kiện để chuẩn bị xuất khẩu từ Việt Nam.':
      'Consolidation of shipments, materials, and components for export from Vietnam.',
    'Không gian quản lý mẫu duyệt, vật liệu, packing standard và checklist buyer.':
      'A buyer standard room for approved samples, materials, packing standards, and checklists.',
    'Checklist QC cho vật liệu, công đoạn, thành phẩm và đóng gói nội thất.':
      'Furniture QC checklists for materials, production stages, finished goods, and packing.',
    'Tiêu chuẩn packing cho hàng nội thất trước khi xuất khẩu.':
      'Export packing standards for furniture before shipment.',
    'Trung tâm cung ứng': 'Supply Hub',
    'Mây tre đan': 'Rattan & Bamboo',
    'Kitchenware gỗ': 'Wooden Kitchenware',
    'Decor & Thủ công mỹ nghệ': 'Decor & Handicrafts',
    'Bộ bàn ăn': 'Dining Sets',
    'Sơn mài': 'Lacquerware',
    'Khảm trai': 'Mother-of-Pearl Inlay',
    'Trang trí gỗ': 'Wooden Decor',
    'Sản phẩm mây tre theo thiết kế': 'Custom-Designed Rattan Products',
    'Bàn mây': 'Rattan Tables',
    'Ghế mây': 'Rattan Chairs',
    'Giỏ mây': 'Rattan Baskets',
    'Khay mây': 'Rattan Trays',
    'Khay gỗ': 'Wooden Trays',
    'Thớt gỗ': 'Wooden Cutting Boards',
    'Muỗng gỗ': 'Wooden Spoons',
    'Dụng cụ nhà bếp': 'Kitchen Utensils',
    'Decor mây tre': 'Rattan & Bamboo Decor',
    'Art objects': 'Art Objects',
    'Custom Design': 'Custom Design',
    'OEM': 'OEM',
    'ODM': 'ODM',
    'Quy trình thương mại': 'Commercial Process',
    'Quy trình hợp tác': 'Cooperation Process',
    'Quy trình đặt hàng': 'Order Flow',
    'Quy trình phát triển mẫu': 'Sample Development Process',
    'Quy trình đánh giá': 'Evaluation Process',
    'Quy trình xử lý lỗi': 'Issue Handling Process',
    'Điều kiện giao hàng (Incoterms)': 'Delivery Terms (Incoterms)',
    'Phương thức thanh toán': 'Payment Methods',
    'Thời gian sản xuất': 'Lead Time',
    'Logistics': 'Logistics',
    'Dự án': 'Projects',
    'Mạng lưới': 'Network',
    'Tuyển dụng': 'Careers',
    'Bản đồ': 'Map',
    'Hình ảnh container': 'Container Photos',
    'VỀ ANSLIFE': 'ABOUT ANSLIFE',
    'QUY TRÌNH THƯƠNG MẠI': 'COMMERCIAL PROCESS',
    'DỰ ÁN & CASE STUDY': 'PROJECTS & CASE STUDIES',
    'HỆ THỐNG TOÀN CẦU': 'GLOBAL NETWORK',
    'PHỤNG SỰ XÃ HỘI': 'SOCIAL CONTRIBUTION',
    'Dự án & Case Study': 'Projects & Case Studies',
    'Hệ thống toàn cầu': 'Global Network',
    'Quỹ học bổng': 'Scholarship Fund',
    'Quỹ học bổng & cộng đồng': 'Scholarship Fund & Community',
    'Phụng Sự Xã Hội': 'Social Contribution',
    'Phụng sự xã hội': 'Social Contribution',
    'Tin tức': 'News',
    'Liên hệ': 'Contact',
    'Báo giá': 'Quote',
    'Liên hệ nhanh': 'Quick Contact',
    'Liên kết nhanh': 'Quick links',
    'Đăng nhập': 'Login',
    'Quản trị': 'Admin',
    Menu: 'Menu',
    'Mở menu': 'Open menu',
    'Đóng menu': 'Close menu',
    'Nhóm khách hàng': 'Customer segments',
    'Bạn đang truy cập': 'You are viewing as',
    'Danh mục điều hướng': 'Navigation categories',
    'Mục nổi bật': 'Highlights',
    'Mục này đang được cập nhật.': 'This section is being updated.',
    'Ngôn ngữ đã hỗ trợ': 'Supported languages',
    'Tất cả ngôn ngữ khác (sẽ hỗ trợ sau)':
      'All other languages (coming soon)',
    'Mạng xã hội': 'Social',
    'Kết nối ANSLIFE': 'Connect with ANSLIFE',
    'Theo dõi ANSLIFE': 'Follow ANSLIFE',
    'Tìm kiếm': 'Search',
    'Trang kết quả tìm kiếm theo từ khóa trên hệ sinh thái ANSLIFE.':
      'Search results page for keywords across the ANSLIFE ecosystem.',
    'Nhập từ khóa để tìm sản phẩm, dự án, tin tức và các trang thông tin liên quan.':
      'Enter keywords to find products, projects, news, and related information pages.',
    'Đóng tìm kiếm': 'Close search',
    'Tìm sản phẩm, vật liệu, dịch vụ cung ứng...':
      'Search products, materials, supply solutions...',
    'Từ khóa tìm kiếm': 'Search keyword',
    'Từ khóa': 'Keyword',
    'Kết quả': 'Results',
    'Kết quả tìm kiếm': 'Search results',
    'Gợi ý dữ liệu mới nhất': 'Latest suggestions',
    'Vui lòng nhập từ khóa để bắt đầu tìm kiếm.':
      'Please enter a keyword to start searching.',
    'Quý khách đang tìm kiếm gì hôm nay?': 'What are you looking for today?',
    'Đóng': 'Close',
    'Truy cập nhanh': 'Quick access',
    'Từ khóa gần đây': 'Recent keywords',
    'Điều hướng website': 'Website navigation',
    'Điều hướng': 'Navigation',
    'Trang thông tin': 'Information page',
    'Các nhóm giải pháp của ANSLIFE': 'ANSLIFE solution groups',
    'Không tìm thấy nhóm phù hợp. Hãy thử từ khóa khác.':
      'No matching groups found. Please try another keyword.',
    'Đang tải dữ liệu tìm kiếm...': 'Loading search data...',
    'Không tìm thấy kết quả phù hợp.': 'No matching results found.',
    'Không tìm thấy kết quả phù hợp. Bạn có thể thử từ khóa khác.':
      'No matching results found. You can try another keyword.',
    'Giới thiệu công ty': 'Company Introduction',
    'Triết lý': 'Philosophy',
    'Tổng quan công ty': 'Company Overview',
    'Tầm nhìn - Sứ mệnh': 'Vision - Mission',
    'Tầm nhìn & Sứ mệnh': 'Vision & Mission',
    'Giá trị cốt lõi': 'Core Values',
    'Triết lý sản xuất': 'Production Philosophy',
    'Triết lý vận hành': 'Operating Philosophy',
    'Cơ cấu tổ chức': 'Organization Structure',
    'Đội ngũ': 'Team',
    'Hệ sinh thái ANSLIFE': 'ANSLIFE Ecosystem',
    'Hệ sinh thái Anslife': 'ANSLIFE Ecosystem',
    'Tầm nhìn, sứ mệnh': 'Vision, Mission',
    'Hệ thống sản xuất': 'Production System',
    'Mạng lưới nhà máy': 'Factory Network',
    'Nhà máy ANSLIFE': 'ANSLIFE Factory',
    'Nhà máy vệ tinh': 'Satellite Factories',
    'Mô hình vận hành hệ sinh thái': 'Ecosystem Operating Model',
    'Đăng ký đối tác sản xuất': 'Manufacturing Partner Registration',
    'Phát triển sản phẩm': 'Product Development',
    'Điều kiện tham gia': 'Participation Criteria',
    'Form đăng ký nhà máy': 'Factory Registration Form',
    'Phát triển nguồn nhân lực': 'Human Resource Development',
    'Vùng nguyên liệu': 'Raw Material Zone',
    'Nguyên liệu & Chuỗi cung ứng': 'Materials & Supply Chain',
    'Nguồn cung gỗ': 'Wood Supply',
    'Hệ thống cung ứng': 'Supply System',
    'Vật liệu công nghiệp': 'Industrial Materials',
    'Vật liệu liên quan': 'Related Materials',
    'MDF / PB / ván công nghiệp': 'MDF / PB / Engineered Boards',
    'Plywood': 'Plywood',
    'Kiểm soát nguyên liệu': 'Material Control',
    'Thiết bị & công nghệ': 'Equipment & Technology',
    'Máy móc sản xuất': 'Production Machinery',
    'Công nghệ gia công': 'Processing Technology',
    'Quy trình sản xuất': 'Production Process',
    'Phát triển mẫu': 'Sample Development',
    'Gia công': 'Processing',
    'Lắp ráp': 'Assembly',
    'Sơn hoàn thiện': 'Finishing',
    'Đóng gói': 'Packaging',
    'QC & Đóng gói': 'QC & Packing',
    'Tiêu chuẩn & QC': 'Standards & QC',
    'Tiêu chuẩn & chứng chỉ': 'Standards & Certifications',
    'Tiêu chuẩn sản xuất': 'Production Standards',
    'Chứng chỉ trong hệ sinh thái': 'Ecosystem Certifications',
    'Triết lý QC': 'QC Philosophy',
    'Hệ thống QC': 'QC System',
    'Kiểm tra nguyên liệu': 'Input Inspection',
    'Kiểm tra trong sản xuất': 'In-Process Inspection',
    'Kiểm tra trước xuất hàng': 'Pre-shipment Inspection',
    'Case cải tiến chất lượng': 'Quality Improvement Cases',
    'Ghế': 'Chairs',
    'Ghế ăn': 'Dining Chairs',
    'Ghế lounge': 'Lounge Chairs',
    'Ghế bar': 'Bar Chairs',
    'Bàn': 'Tables',
    'Bàn ăn': 'Dining Tables',
    'Bàn cà phê': 'Coffee Tables',
    'Bàn phụ': 'Side Tables',
    'Tủ / Kệ': 'Cabinets / Shelves',
    'Tủ / kệ': 'Cabinets / Shelves',
    'Tủ quần áo': 'Wardrobes',
    'Kệ trang trí': 'Display Shelves',
    'Tủ lưu trữ': 'Storage Cabinets',
    'Bộ phòng ngủ': 'Bedroom Sets',
    'Giường ngủ': 'Beds',
    'Tủ đầu giường': 'Bedside Tables',
    'Bàn trang điểm': 'Dressing Tables',
    'Bộ phòng ngủ hoàn chỉnh': 'Complete Bedroom Sets',
    'Sản phẩm theo thiết kế': 'Custom Design Products',
    'Dịch vụ OEM/ODM': 'OEM/ODM Service',
    'Dịch vụ OEM': 'OEM Service',
    'Dịch vụ ODM': 'ODM Service',
    'Thiết kế theo yêu cầu': 'Custom Design',
    'OEM / ODM': 'OEM / ODM',
    'Thanh toán': 'Payment',
    'Supply Hub Việt Nam': 'Vietnam Supply Hub',
    'Trung tâm cung ứng Việt Nam': 'Vietnam Supply Hub',
    'Tổng quan mô hình Supply Hub': 'Supply Hub Model Overview',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'Warehousing & Buffer Inventory in Vietnam',
    'Điều phối xuất hàng định kỳ': 'Scheduled Shipment Coordination',
    'Lưu kho vật liệu & cấu kiện': 'Material & Component Storage',
    'Lưu kho tại Việt Nam': 'Storage in Vietnam',
    'Phòng mẫu chuẩn đối tác': 'Partner Standard Room',
    'Mẫu cấu kiện': 'Component Samples',
    'Quản lý mẫu & tiêu chuẩn': 'Sample & Standard Management',
    'Điều phối xuất hàng hằng tuần': 'Weekly Shipment Arrangement',
    'QC trước xuất hàng': 'QC Before Shipment',
    'Đóng gói xuất khẩu': 'Export Packing',
    'Gom container / LCL': 'Container / LCL Consolidation',
    'Hỗ trợ chứng từ': 'Documentation Support',
    'Trách nhiệm xã hội': 'Social Responsibility',
    'Chúng tôi làm gì': 'What We Do',
    'Vì sao chọn Việt Nam': 'Why Vietnam',
    'Tiêu chuẩn làm việc của chúng tôi': 'Our Working Standards',
    'Người liên hệ / Thông tin công ty': 'Contact Person / Company Information',
    'Tủ & Lưu trữ': 'Cabinets & Storage',
    'Ghế đôn & ghế băng': 'Stools & Benches',
    'Nội thất mây tre': 'Rattan & Bamboo Furniture',
    'Nội thất tùy chỉnh dự án khách sạn, resort, văn phòng':
      'Custom Furniture for Hotel, Resort & Office Projects',
    'Nội thất tùy chỉnh': 'Custom Furniture',
    'Linh kiện gỗ': 'Wooden Components',
    'Khung ghế': 'Chair Frames',
    'Mặt bàn': 'Table Tops',
    'Bộ phận tủ': 'Cabinet Parts',
    'Linh kiện mây / tre': 'Rattan / Bamboo Components',
    'Linh kiện bọc nệm': 'Upholstery Components',
    'Cung ứng vật liệu': 'Materials Supply',
    'Gỗ tự nhiên / gỗ xẻ': 'Solid Wood / Lumber',
    Veneer: 'Veneer',
    'Foam / Mút / Xốp': 'Foam / Sponge / Cushion',
    'Phát triển OEM / ODM': 'OEM / ODM Development',
    'Rà soát thiết kế': 'Design Review',
    'Hỗ trợ bản vẽ kỹ thuật': 'Technical Drawing Support',
    'Tối ưu chi phí': 'Cost Optimization',
    'Sản xuất hàng loạt': 'Mass Production',
    'Giải pháp sẵn sàng xuất khẩu': 'Export-Ready Solutions',
    'Đóng gói theo tiêu chuẩn buyer': 'Packing by Buyer Standard',
    'Nhãn & mã vạch': 'Labeling & Barcode',
    'Container hỗn hợp': 'Mixed Container',
    'Chuẩn bị xuất hàng': 'Shipment Preparation',
    'Banner chuẩn đóng gói': 'Packing standard banner',
    'Chuẩn đóng gói': 'Packing Standard',
    'ANSLIFE triển khai các tiêu chuẩn đóng gói nhằm giảm thiểu rủi ro trong quá trình lưu kho, bốc xếp, vận chuyển nội địa và vận chuyển quốc tế. Quy cách đóng gói được xây dựng dựa trên đặc tính sản phẩm, yêu cầu của buyer, điều kiện vận chuyển và tiêu chuẩn của từng thị trường.':
      'ANSLIFE implements packing standards to reduce risks during storage, handling, domestic transportation, and international shipping. Packing specifications are developed based on product characteristics, buyer requirements, transport conditions, and each market standard.',
    'Mục tiêu của đóng gói': 'Packing Objectives',
    'Bảo vệ sản phẩm': 'Product Protection',
    'Giảm thiểu trầy xước, va đập, biến dạng và hư hỏng trong quá trình vận chuyển.':
      'Reduce scratches, impact, deformation, and damage during transportation.',
    'Duy trì chất lượng': 'Maintain Quality',
    'Giữ nguyên trạng thái sản phẩm từ khi xuất xưởng đến khi nhận hàng.':
      'Keep products in their original condition from factory dispatch to receipt.',
    'Tối ưu vận chuyển': 'Optimize Transportation',
    'Hỗ trợ lưu kho, xếp dỡ và vận chuyển hiệu quả.':
      'Support efficient storage, handling, and transportation.',
    'Hỗ trợ truy xuất': 'Traceability Support',
    'Đảm bảo nhận diện và quản lý sản phẩm theo từng đơn hàng.':
      'Ensure product identification and management by each order.',
    'Những gì được kiểm soát trong đóng gói?': 'What Is Controlled in Packing?',
    'Bảo vệ bề mặt': 'Surface Protection',
    'Bảo vệ các khu vực dễ trầy xước hoặc hư hỏng trong quá trình vận chuyển.':
      'Protect areas that are easy to scratch or damage during transportation.',
    'Tay ghế': 'Chair arm',
    'Cạnh sản phẩm': 'Product edge',
    'Bề mặt hoàn thiện': 'Finished surface',
    'Bảo vệ kết cấu': 'Structure Protection',
    'Giảm thiểu tác động từ rung lắc, va đập hoặc chồng xếp.':
      'Reduce impact from vibration, collision, or stacking.',
    'Chân bàn': 'Table leg',
    'Chi tiết lắp ráp': 'Assembly detail',
    'Kiểm soát phụ kiện': 'Accessory Control',
    'Đảm bảo đầy đủ phụ kiện và linh kiện đi kèm.':
      'Ensure all accessories and included components are complete.',
    'Bộ vít': 'Screw set',
    Khóa: 'Lock',
    'Chân tăng chỉnh': 'Adjustable foot',
    'Hướng dẫn lắp ráp': 'Assembly instruction',
    'Kiểm soát nhãn mác': 'Label Control',
    'Đảm bảo nhận diện chính xác sản phẩm và đơn hàng.':
      'Ensure accurate identification of the product and order.',
    'Mã hàng': 'Item code',
    'Mã carton': 'Carton code',
    'Nhãn buyer': 'Buyer label',
    'Nhãn vận chuyển': 'Shipping label',
    'Kiểm soát pallet': 'Pallet Control',
    'Kiểm soát container': 'Container Control',
    'Đảm bảo hàng hóa được xếp phù hợp và điều kiện vận chuyển quốc tế.':
      'Ensure goods are loaded properly for international shipping conditions.',
    'Các vật liệu đóng gói được sử dụng': 'Packing Materials Used',
    Carton: 'Carton',
    'Bảo vệ sản phẩm trong quá trình lưu kho và vận chuyển.':
      'Protect products during storage and transportation.',
    'Giảm thiểu va đập và rung động.': 'Reduce impact and vibration.',
    'Corner Protection': 'Corner Protection',
    'Bảo vệ cạnh và góc sản phẩm.': 'Protect product edges and corners.',
    'Túi bảo vệ': 'Protective Bag',
    'Giảm trầy xước và bụi bẩn.': 'Reduce scratches and dust.',
    Pallet: 'Pallet',
    'Hỗ trợ lưu kho và bốc xếp.': 'Support storage and handling.',
    'Vật liệu chống ẩm': 'Moisture Control Material',
    'Hỗ trợ bảo vệ sản phẩm trong quá trình vận chuyển quốc tế.':
      'Help protect products during international transportation.',
    'Các hình thức đóng gói': 'Packing Formats',
    'Knock-down (KD)': 'Knock-down (KD)',
    'Sản phẩm được tháo rời để tối ưu vận chuyển và lưu kho.':
      'Products are disassembled to optimize transportation and storage.',
    'Semi Knock-down (SKD)': 'Semi Knock-down (SKD)',
    'Một phần sản phẩm được tháo rời, các phần được lắp ráp sẵn.':
      'Part of the product is disassembled while other parts remain pre-assembled.',
    'Fully Assembled': 'Fully Assembled',
    'Sản phẩm hoàn thiện và được giao ở trạng thái lắp ráp hoàn chỉnh.':
      'Finished products are delivered in a fully assembled condition.',
    'Component Packaging': 'Component Packaging',
    'Đóng gói cấu kiện hoặc bán thành phẩm theo bộ.':
      'Pack components or semi-finished parts by set.',
    'Project Packaging': 'Project Packaging',
    'Đóng gói theo yêu cầu riêng của dự án hoặc buyer.':
      'Pack according to specific project or buyer requirements.',
    'Quy trình kiểm tra đóng gói': 'Packing Inspection Process',
    'Hoàn thiện sản phẩm': 'Product completion',
    'Kiểm tra thành phẩm': 'Finished goods inspection',
    'Kiểm tra carton & nhãn': 'Carton & label inspection',
    'Kiểm tra container': 'Container inspection',
    'Xuất hàng': 'Shipment',
    'Tiêu chuẩn đóng gói theo buyer': 'Packing Standards by Buyer',
    'Mỗi buyer có thể có tiêu chuẩn đóng gói riêng về:':
      'Each buyer may have specific packing standards for:',
    'Quy cách carton': 'Carton specification',
    'Vị trí nhãn': 'Label position',
    'Cấu trúc pallet': 'Pallet structure',
    'Bộ phụ kiện': 'Accessory set',
    'Yêu cầu bảo vệ bề mặt': 'Surface protection requirement',
    'Tiêu chuẩn vận chuyển': 'Transportation standard',
    'ANSLIFE hỗ trợ lưu trữ và quản lý các tiêu chuẩn này trong hệ thống hồ sơ dự án và Phòng mẫu chuẩn đối tác.':
      'ANSLIFE supports storing and managing these standards in the project record system and partner standard room.',
    'Vai trò trong hệ thống chất lượng': 'Role in the Quality System',
    'Giao nhận': 'Handover',
    'Các rủi ro cần hạn chế': 'Risks to Reduce',
    'Trầy xước': 'Scratches',
    'Va đập': 'Impact',
    'Thiếu phụ kiện': 'Missing accessories',
    'Sai nhãn': 'Wrong label',
    'Hư hỏng trong vận chuyển': 'Damage during transportation',
    'Khiếu nại khách hàng': 'Customer complaint',
    'Liên kết với Supply Hub Việt Nam': 'Connection with Vietnam Supply Hub',
    'Chuẩn đóng gói không chỉ phục vụ xuất khẩu trực tiếp mà còn hỗ trợ hoạt động lưu kho, gom hàng, tồn kho đệm và điều phối xuất hàng trong mô hình Supply Hub Việt Nam của ANSLIFE.':
      'Packing standards support not only direct export but also storage, consolidation, buffer inventory, and shipment coordination within ANSLIFE’s Vietnam Supply Hub model.',
    'Trao đổi về tiêu chuẩn đóng gói của dự án': 'Discuss Project Packing Standards',
    'Buyer có thể gửi tiêu chuẩn đóng gói, quy cách carton, yêu cầu pallet hoặc hướng dẫn vận chuyển để ANSLIFE đánh giá và đề xuất phương án phù hợp.':
      'Buyers can send packing standards, carton specifications, pallet requirements, or shipping instructions so ANSLIFE can review and propose a suitable solution.',
    'Tải tiêu chuẩn đóng gói': 'Upload packing standard',
    'Banner báo cáo kiểm tra': 'Inspection report banner',
    'ANSLIFE ghi nhận kết quả kiểm tra bằng hồ sơ rõ ràng, hình ảnh thực tế và nhận xét kiểm soát chất lượng để buyer theo dõi tình trạng sản phẩm trước khi xuất hàng.':
      'ANSLIFE records inspection results with clear documentation, actual photos, and quality-control comments so buyers can track product status before shipment.',
    'Báo cáo được thực hiện ở những giai đoạn nào?':
      'At Which Stages Is the Report Prepared?',
    'Kiểm tra hoàn thiện bề mặt': 'Surface finish inspection',
    'Kiểm tra đóng gói': 'Packing inspection',
    'Báo cáo chất lượng': 'Quality report',
    'Nội dung của một báo cáo kiểm tra': 'Contents of an Inspection Report',
    'Thông tin dự án': 'Project information',
    'Ghi nhận các thông tin cơ bản của dự án và lô hàng được kiểm tra.':
      'Record the basic information of the project and inspected lot.',
    'Bao gồm: Tên dự án, Buyer, Nhà máy, Mã sản phẩm, Ngày kiểm tra, Người thực hiện.':
      'Includes: project name, buyer, factory, product code, inspection date, and inspector.',
    'Kết quả kiểm tra': 'Inspection results',
    'Tổng hợp các nội dung đã được đánh giá trong quá trình kiểm tra.':
      'Summarize the items evaluated during inspection.',
    'Bao gồm: Kích thước, Kết cấu, Hoàn thiện, Chức năng, Đóng gói, Số lượng.':
      'Includes: dimensions, structure, finish, function, packing, and quantity.',
    'Hình ảnh kiểm tra': 'Inspection photos',
    'Lưu trữ hình ảnh thực tế tại thời điểm kiểm tra nhằm hỗ trợ đối chiếu và truy xuất.':
      'Store actual photos at the time of inspection to support comparison and traceability.',
    'Bao gồm: Hình sản phẩm, Hình lỗi nếu có, Hình đóng gói, Hình container, Hình kiểm tra thực tế.':
      'Includes: product photos, defect photos if any, packing photos, container photos, and actual inspection photos.',
    'Sai lệch và ghi chú': 'Deviations and notes',
    'Ghi nhận các điểm chưa phù hợp hoặc các nội dung cần theo dõi.':
      'Record nonconformities or items that need follow-up.',
    'Bao gồm: Mô tả sai lệch, Mức độ ảnh hưởng, Đề xuất xử lý, Tình trạng khắc phục.':
      'Includes: deviation description, impact level, proposed action, and correction status.',
    'Kết luận kiểm tra': 'Inspection conclusion',
    'Đưa ra đánh giá tổng thể về tình trạng của lô hàng hoặc sản phẩm được kiểm tra.':
      'Provide an overall assessment of the inspected lot or product condition.',
    'Ví dụ: Đạt yêu cầu, Đạt có điều kiện, Cần khắc phục, Không đạt.':
      'Examples: passed, conditionally passed, needs correction, failed.',
    'Hồ sơ lưu trữ': 'Archived records',
    'Lưu trữ kết quả kiểm tra nhằm phục vụ truy xuất và các đơn hàng lặp lại.':
      'Archive inspection results for traceability and repeat orders.',
    'Các loại báo cáo ANSLIFE có thể cung cấp':
      'Types of Reports ANSLIFE Can Provide',
    'Báo cáo kiểm tra vật liệu': 'Material inspection report',
    'Ghi nhận kết quả đánh giá vật liệu trước sản xuất.':
      'Record material evaluation results before production.',
    'Báo cáo kiểm tra trong sản xuất': 'In-process inspection report',
    'Ghi nhận kết quả kiểm tra tại các công đoạn sản xuất.':
      'Record inspection results at production stages.',
    'Báo cáo hoàn thiện bề mặt': 'Surface finish report',
    'Đánh giá màu sắc, độ bóng, độ đồng đều và chất lượng bề mặt.':
      'Evaluate color, gloss, consistency, and surface quality.',
    'Báo cáo kiểm tra cuối': 'Final inspection report',
    'Đánh giá thành phẩm trước khi đóng gói hoặc xuất hàng.':
      'Evaluate finished goods before packing or shipment.',
    'Báo cáo đóng gói': 'Packing report',
    'Xác nhận tình trạng đóng gói, nhãn mác và chuẩn bị xuất hàng.':
      'Confirm packing condition, labels, and shipment preparation.',
    'Báo cáo QC độc lập': 'Independent QC report',
    'Báo cáo được thực hiện bởi hoạt động kiểm tra độc lập theo yêu cầu của dự án hoặc buyer.':
      'Report prepared through independent inspection according to project or buyer requirements.',
    'Cấu trúc một báo cáo điển hình': 'Typical Report Structure',
    'Phạm vi kiểm tra': 'Inspection scope',
    'Hình ảnh minh chứng': 'Evidence photos',
    'Sai lệch & hành động khắc phục': 'Deviation & corrective action',
    'Kết luận': 'Conclusion',
    'Lưu hồ sơ': 'Record archive',
    'Báo cáo hỗ trợ điều gì?': 'What Does the Report Support?',
    'Minh bạch': 'Transparency',
    'Buyer có thể theo dõi kết quả kiểm tra một cách rõ ràng.':
      'Buyers can clearly follow inspection results.',
    'Truy xuất': 'Traceability',
    'Dễ dàng đối chiếu giữa các lô hàng và các đợt sản xuất.':
      'Easily compare between lots and production runs.',
    'Kiểm soát rủi ro': 'Risk control',
    'Phát hiện và xử lý các sai lệch trước khi giao hàng.':
      'Detect and handle deviations before shipment.',
    'Duy trì tiêu chuẩn': 'Maintain standards',
    'Hỗ trợ quản lý chất lượng cho các đơn hàng lặp lại.':
      'Support quality management for repeat orders.',
    'Liên kết với hệ thống chất lượng': 'Connected to the Quality System',
    'Lưu hồ sơ chất lượng': 'Quality record archive',
    'Liên kết với Phòng mẫu chuẩn đối tác': 'Connected to the Partner Standard Room',
    'Các báo cáo kiểm tra được lưu cùng với mẫu duyệt, bản vẽ kỹ thuật, bảng màu, tiêu chuẩn đóng gói và checklist QC nhằm hỗ trợ truy xuất và duy trì tính nhất quán cho các dự án dài hạn.':
      'Inspection reports are stored together with approved samples, technical drawings, color boards, packing standards, and QC checklists to support traceability and maintain consistency for long-term projects.',
    'Trao đổi về yêu cầu báo cáo chất lượng của dự án':
      'Discuss Project Quality Report Requirements',
    'Buyer có thể gửi yêu cầu về biểu mẫu báo cáo, checklist QC hoặc tiêu chuẩn đánh giá để ANSLIFE xây dựng hệ thống báo cáo phù hợp với từng dự án.':
      'Buyers can send requirements for report templates, QC checklists, or evaluation standards so ANSLIFE can build a reporting system suitable for each project.',
    'Gỗ tự nhiên': 'Solid Wood',
    'Gỗ cao su': 'Rubber Wood',
    'Gỗ Ash': 'Ash Wood',
    'Ash Wood': 'Ash Wood',
    'Banner gỗ cao su': 'Rubber wood banner',
    'Banner gỗ Ash': 'Ash wood banner',
    'Banner gỗ Oak': 'Oak wood banner',
    'Loại gỗ cứng được sử dụng rộng rãi trong nội thất xuất khẩu nhờ vân gỗ đẹp, khả năng gia công tốt và tính linh hoạt trong hoàn thiện bề mặt.':
      'A hardwood widely used in export furniture thanks to its attractive grain, good machinability, and flexible surface finishing capability.',
    'Gỗ Ash là một trong những loại gỗ tự nhiên phổ biến trong ngành nội thất cao cấp và nội thất xuất khẩu. Với màu sắc sáng, vân gỗ rõ nét và khả năng hoàn thiện linh hoạt, Ash được sử dụng rộng rãi trong các dòng sản phẩm theo phong cách Bắc Âu, hiện đại và đương đại.':
      'Ash is one of the common natural woods used in high-end furniture and export furniture. With its light color, distinct grain, and flexible finishing capability, ash is widely used in Scandinavian, modern, and contemporary product lines.',
    'Ash phù hợp cho cả sản phẩm hoàn thiện, cấu kiện nội thất và các chương trình OEM / ODM yêu cầu tính thẩm mỹ cao cùng khả năng sản xuất ổn định.':
      'Ash is suitable for finished products, furniture components, and OEM / ODM programs that require high aesthetics and stable production capability.',
    'Tổng quan vật liệu': 'Material Overview',
    'Nhóm vật liệu': 'Material group',
    'Từ trắng kem đến vàng nhạt hoặc nâu nhạt.':
      'From creamy white to pale yellow or light brown.',
    'Vân gỗ rõ ràng, thẳng hoặc dạng sóng nhẹ, tạo cảm giác tự nhiên và hiện đại.':
      'Clear grain, straight or gently wavy, creating a natural and modern feel.',
    'Gia công tốt, phù hợp với cắt, tiện, CNC, uốn cong và nhiều phương pháp sản xuất nội thất.':
      'Machines well and suits cutting, turning, CNC, bending, and many furniture production methods.',
    'Đặc điểm nổi bật': 'Key Characteristics',
    'Vân gỗ đẹp và rõ nét': 'Beautiful, Distinct Grain',
    'Mang lại giá trị thẩm mỹ cao và dễ nhận diện trong các dòng nội thất hiện đại.':
      'Provides strong aesthetic value and clear recognition in modern furniture lines.',
    'Dễ kết hợp với nhiều phong cách thiết kế và phương án hoàn thiện.':
      'Easy to combine with many design styles and finishing options.',
    'Khả năng hoàn thiện linh hoạt': 'Flexible Finishing Capability',
    'Phù hợp với stain, lacquer, oil finish và nhiều hệ hoàn thiện khác.':
      'Suitable for stain, lacquer, oil finish, and many other finishing systems.',
    'Gia công tốt': 'Good Machining',
    'Thích hợp cho các chi tiết phức tạp, cấu kiện cong và sản phẩm yêu cầu độ chính xác cao.':
      'Suitable for complex details, curved components, and products requiring high precision.',
    'Tính ứng dụng cao': 'High Application Value',
    'Được sử dụng rộng rãi trong nội thất gia đình, khách sạn và dự án thương mại.':
      'Widely used in residential furniture, hotel furniture, and commercial projects.',
    'Phù hợp với nhiều thị trường': 'Suitable for Many Markets',
    'Là loại gỗ quen thuộc trong các chương trình nội thất xuất khẩu sang Mỹ, Châu Âu và Nhật Bản.':
      'A familiar wood species in furniture export programs for the United States, Europe, and Japan.',
    'Ứng dụng trong nội thất': 'Interior Applications',
    'Ghế ăn, ghế lounge, ghế bọc nệm và các dòng ghế thiết kế.':
      'Dining chairs, lounge chairs, upholstered chairs, and designed chair lines.',
    'Bàn ăn, bàn làm việc, bàn cà phê và bàn phụ.':
      'Dining tables, work desks, coffee tables, and side tables.',
    'Tủ đầu giường, tủ trang trí và các hệ lưu trữ cao cấp.':
      'Bedside cabinets, display cabinets, and premium storage systems.',
    'Khung giường và các bộ phận kết cấu.':
      'Bed frames and structural parts.',
    'Tay ghế, chân bàn, khung ghế và các chi tiết gia công theo bản vẽ.':
      'Armrests, table legs, chair frames, and details machined to drawings.',
    'Khách sạn, resort, nhà hàng, văn phòng và các không gian thương mại.':
      'Hotels, resorts, restaurants, offices, and commercial spaces.',
    'Khả năng hoàn thiện bề mặt': 'Surface Finishing Capability',
    'Giữ lại màu sắc tự nhiên và vẻ đẹp nguyên bản của vật liệu.':
      'Preserves the natural color and original beauty of the material.',
    'Stain Finish': 'Stain Finish',
    'Tạo chiều sâu cho vân gỗ và phát triển màu sắc theo yêu cầu thiết kế.':
      'Adds depth to the wood grain and develops color according to design requirements.',
    'Oil Finish': 'Oil Finish',
    'Mang lại cảm giác tự nhiên và gần gũi với vật liệu.':
      'Creates a natural feel that stays close to the material.',
    'Tạo bề mặt hiện đại và tinh tế.': 'Creates a modern and refined surface.',
    'Hoàn thiện màu theo bảng màu hoặc mẫu duyệt của buyer.':
      'Finished to the buyer color board or approved sample.',
    'Những yếu tố cần kiểm soát': 'Control Factors',
    'Kiểm soát độ ổn định trước sản xuất và hoàn thiện.':
      'Control stability before production and finishing.',
    'Đồng đều màu sắc': 'Color consistency',
    'Đảm bảo tính nhất quán giữa các lô vật liệu.':
      'Ensure consistency between material batches.',
    'Vân gỗ': 'Wood grain',
    'Lựa chọn và sắp xếp phù hợp với yêu cầu thẩm mỹ của sản phẩm.':
      'Select and arrange grain to match the product aesthetic requirements.',
    'Kiểm soát màu sắc, độ bóng và chất lượng hoàn thiện.':
      'Control color, gloss, and finishing quality.',
    'Đóng gói & vận chuyển': 'Packing & Transportation',
    'Bảo vệ sản phẩm trong quá trình lưu kho và xuất khẩu.':
      'Protect products during storage and export.',
    'Ash trong hệ thống cung ứng của ANSLIFE':
      'Ash in ANSLIFE’s Supply System',
    'ANSLIFE hỗ trợ phát triển sản phẩm, lựa chọn vật liệu, đánh giá khả năng sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ Ash tại Việt Nam.':
      'ANSLIFE supports product development, material selection, production feasibility assessment, and supply chain organization for projects using ash wood in Vietnam.',
    'Tùy theo yêu cầu của buyer, Ash có thể được sử dụng cho sản phẩm hoàn thiện, cấu kiện nội thất, chương trình OEM / ODM hoặc các dự án nội thất thương mại và xuất khẩu.':
      'Depending on buyer requirements, ash can be used for finished products, furniture components, OEM / ODM programs, or commercial and export furniture projects.',
    'Ash phù hợp với những phong cách nào?':
      'Which Styles Is Ash Suitable For?',
    Scandinavian: 'Scandinavian',
    'Tận dụng màu sáng và vân gỗ tự nhiên.':
      'Makes use of light color and natural wood grain.',
    Modern: 'Modern',
    'Kết hợp với các đường nét đơn giản và hoàn thiện mờ.':
      'Pairs with simple lines and matte finishing.',
    Contemporary: 'Contemporary',
    'Linh hoạt với nhiều phương án màu sắc và vật liệu kết hợp.':
      'Flexible across many color options and combined materials.',
    Hospitality: 'Hospitality',
    'Phù hợp với các dự án khách sạn, resort và không gian thương mại.':
      'Suitable for hotel, resort, and commercial space projects.',
    'Liên kết nội dung liên quan': 'Related Content Links',
    'Khám phá các sản phẩm sử dụng gỗ Ash.':
      'Explore products using ash wood.',
    'Các cấu kiện và bộ phận được sản xuất từ Ash.':
      'Components and parts manufactured from ash.',
    'Các phương án hoàn thiện phù hợp với Ash.':
      'Finishing options suitable for ash.',
    'Các hoạt động kiểm soát vật liệu trong sản xuất.':
      'Material control activities in production.',
    'Trao đổi về vật liệu Ash cho dự án của bạn':
      'Discuss Ash Materials for Your Project',
    'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ Ash và đề xuất phương án phù hợp.':
      'Buyers can send drawings, product samples, or technical requirements so ANSLIFE can evaluate ash wood application feasibility and propose a suitable solution.',
    '1. Tổng quan vật liệu': '1. Material Overview',
    'Tên thương mại': 'Trade name',
    Rubberwood: 'Rubberwood',
    'Nguồn gốc': 'Origin',
    'Cây cao su sau chu kỳ khai thác mủ.':
      'Rubber trees after the latex harvesting cycle.',
    'Màu sắc tự nhiên': 'Natural color',
    'Từ trắng kem đến vàng nhạt.': 'From creamy white to pale yellow.',
    'Đặc điểm vân gỗ': 'Wood grain characteristics',
    'Vân tương đối đều, nhẹ và dễ hoàn thiện.':
      'Relatively even, subtle grain that is easy to finish.',
    'Khả năng gia công': 'Machining capability',
    'Gia công tốt bằng các phương pháp cắt, tiện, CNC, khoan và lắp ráp.':
      'Machines well with cutting, turning, CNC, drilling, and assembly methods.',
    '2. Đặc điểm nổi bật': '2. Key Characteristics',
    'Nguồn cung ổn định': 'Stable supply',
    'Nguồn cung dồi dào từ diện tích cao su lớn, đảm bảo tính ổn định và lịch sản xuất.':
      'Abundant supply from large rubber-growing areas, supporting stable production flow.',
    'Dễ gia công': 'Easy to machine',
    'Gia công tốt, ít gây mẻ, phù hợp với nhiều phương pháp cắt, tiện, CNC, khoan và lắp ráp.':
      'Machines well with low chipping risk, suitable for cutting, turning, CNC, drilling, and assembly.',
    'Hoàn thiện linh hoạt': 'Flexible finishing',
    'Dễ chấp nhận nhiều hệ thống hoàn thiện: stain, sơn PU, sơn NC, sơn màu và các hiệu ứng khác.':
      'Accepts many finishing systems such as stain, PU coating, NC coating, color coating, and other effects.',
    'Màu sắc sáng': 'Light color',
    'Màu sáng tự nhiên giúp sản phẩm dễ phối màu, tạo cảm giác hiện đại và tinh tế.':
      'Its naturally light color makes products easy to color-match and creates a modern, refined feel.',
    'Thích hợp sản xuất hàng loạt': 'Suitable for mass production',
    'Tính chất ổn định, đồng nhất, phù hợp cho sản xuất quy mô lớn và kiểm soát chất lượng.':
      'Stable and consistent properties make it suitable for large-scale production and quality control.',
    'Giá trị kinh tế tốt': 'Good economic value',
    'Chi phí hợp lý, tối ưu hiệu quả đầu tư cho các dự án xuất khẩu và OEM/ODM.':
      'Reasonable cost helps optimize investment efficiency for export and OEM/ODM projects.',
    '3. Ứng dụng trong nội thất': '3. Interior Applications',
    'Ghế ăn, ghế cafe, ghế bar và ghế làm việc với thiết kế đa dạng.':
      'Dining chairs, cafe chairs, bar chairs, and working chairs in diverse designs.',
    'Bàn ăn, bàn cafe, bàn làm việc, bàn trà và các loại bàn khác.':
      'Dining tables, cafe tables, work desks, tea tables, and other table types.',
    'Tủ quần áo, tủ kệ, tủ bếp, kệ trang trí và giải pháp lưu trữ khác.':
      'Wardrobes, cabinets, kitchen cabinets, display shelves, and other storage solutions.',
    'Giường đôi, giường trẻ em, giường tầng và các thiết kế theo yêu cầu.':
      'Double beds, children’s beds, bunk beds, and made-to-order designs.',
    'Khung ghế, chân bàn, thanh giường, khung tủ và các cấu kiện lắp ráp khác.':
      'Chair frames, table legs, bed rails, cabinet frames, and other assembled components.',
    'Sản phẩm cho dự án khách sạn, resort, căn hộ, văn phòng và không gian công cộng.':
      'Products for hotel, resort, apartment, office, and public-space projects.',
    '4. Khả năng hoàn thiện bề mặt': '4. Surface Finishing Capability',
    Stain: 'Stain',
    'Tôn vân gỗ tự nhiên, màu sắc ấm áp và sang trọng.':
      'Highlights natural wood grain with warm and elegant color.',
    'Natural Finish': 'Natural Finish',
    'Giữ màu gỗ tự nhiên, trong trẻo, tinh tế và hiện đại.':
      'Preserves the natural wood color for a clean, refined, modern look.',
    Lacquer: 'Lacquer',
    'Bề mặt mịn, bền màu, dễ vệ sinh và bảo trì.':
      'Smooth, color-stable surface that is easy to clean and maintain.',
    'Matte Finish': 'Matte Finish',
    'Hiệu ứng mờ cao cấp, chống bám vân tay, cảm giác tự nhiên.':
      'Premium matte effect with fingerprint resistance and a natural feel.',
    'Color Finish': 'Color Finish',
    'Sơn màu đa dạng, đáp ứng yêu cầu thiết kế riêng.':
      'Diverse color coating options for custom design requirements.',
    '5. Những yếu tố cần kiểm soát': '5. Control Factors',
    'Độ ẩm vật liệu': 'Material moisture',
    'Kiểm soát độ ẩm phù hợp để hạn chế cong vênh, nứt nẻ và đảm bảo độ ổn định.':
      'Control suitable moisture levels to limit warping, cracking, and ensure stability.',
    'Màu sắc': 'Color',
    'Đồng nhất màu gỗ giữa các lô và giữa các chi tiết trong cùng một sản phẩm.':
      'Keep wood color consistent between batches and between parts within the same product.',
    'Chất lượng ghép thanh': 'Laminated board quality',
    'Đảm bảo keo ghép đạt tiêu chuẩn, mối ghép chắc chắn và thẩm mỹ cao.':
      'Ensure glue quality meets standards, with strong joints and high visual quality.',
    'Bám dính tốt, bề mặt mịn, màu sắc đồng đều và đạt yêu cầu kỹ thuật.':
      'Good adhesion, smooth surface, consistent color, and technical compliance.',
    'Bảo vệ sản phẩm trong quá trình vận chuyển, đảm bảo đến nơi trong tình trạng tốt nhất.':
      'Protect products during transport and ensure they arrive in the best possible condition.',
    '6. Gỗ cao su trong hệ thống cung ứng của ANSLIFE':
      '6. Rubber Wood in ANSLIFE’s Supply System',
    'ANSLIFE hỗ trợ khách hàng phát triển sản phẩm, lựa chọn vật liệu phù hợp, đánh giá tính khả thi sản xuất và tổ chức chuỗi cung ứng cho các dự án sử dụng gỗ cao su tại Việt Nam.':
      'ANSLIFE supports customers in product development, material selection, production feasibility assessment, and supply chain organization for projects using rubber wood in Vietnam.',
    'Gỗ cao su có thể được ứng dụng cho sản phẩm hoàn thiện, cấu kiện nội thất, chương trình OEM/ODM và các dự án xuất khẩu đến Mỹ, Châu Âu, Nhật Bản và nhiều thị trường khác.':
      'Rubber wood can be used for finished products, furniture components, OEM/ODM programs, and export projects to the United States, Europe, Japan, and many other markets.',
    'Tư vấn & phát triển SP': 'Consulting & Product Development',
    'Đánh giá tính khả thi': 'Feasibility Assessment',
    'Sản xuất & kiểm soát chất lượng': 'Manufacturing & Quality Control',
    'Quản lý chuỗi cung ứng': 'Supply Chain Management',
    '7. Liên kết với các nội dung liên quan': '7. Related Content Links',
    'Khám phá các dòng sản phẩm nội thất do ANSLIFE sản xuất.':
      'Explore furniture product lines manufactured by ANSLIFE.',
    'Tìm hiểu các cấu kiện và linh kiện nội thất.':
      'Learn about furniture components and parts.',
    'Các hệ thống sơn và hoàn thiện phù hợp cho gỗ cao su.':
      'Paint and finishing systems suitable for rubber wood.',
    'Giải pháp kiểm soát độ ẩm trong sản xuất và lưu kho.':
      'Moisture control solutions for production and storage.',
    '8. Trao đổi về vật liệu gỗ cao su cho dự án của bạn':
      '8. Discuss Rubber Wood Materials for Your Project',
    'Buyer có thể gửi bản vẽ, mẫu sản phẩm hoặc yêu cầu kỹ thuật để ANSLIFE đánh giá khả năng ứng dụng gỗ cao su và đề xuất phương án phù hợp.':
      'Buyers can send drawings, product samples, or technical requirements so ANSLIFE can evaluate rubber wood application feasibility and propose a suitable solution.',
    Ash: 'Ash',
    Oak: 'Oak',
    Beech: 'Beech',
    Acacia: 'Acacia',
    Pine: 'Pine',
    'Ván ép & ván kỹ thuật': 'Plywood & Engineered Boards',
    MDF: 'MDF',
    'Ván dăm': 'Particle Board',
    'Ván phủ bề mặt': 'Laminated Board',
    'Mây tre': 'Rattan & Bamboo',
    'Mút & vật liệu bọc': 'Foam & Upholstery',
    'Kim loại & phụ kiện': 'Metal & Hardware',
    'Mẫu sơn / màu / hoàn thiện': 'Paint / Stain / Finishing Samples',
    'Sản xuất': 'Manufacturing',
    'Tổng quan nhà máy': 'Factory Overview',
    'Chuẩn bị vật liệu': 'Material Preparation',
    Cắt: 'Cutting',
    'Gia công gỗ': 'Woodworking',
    'Chà nhám': 'Sanding',
    'Hoàn thiện / sơn': 'Finishing / Painting',
    'Kiểm tra': 'Inspection',
    'Đóng gói sản phẩm': 'Packing',
    'Máy móc & thiết bị': 'Machinery & Equipment',
    'Năng lực hoàn thiện': 'Finishing Capability',
    'Dây chuyền lắp ráp': 'Assembly Line',
    'Khu vực đóng gói': 'Packing Area',
    'Xếp container': 'Container Loading',
    'Tổng quan': 'Overview',
    'Tồn kho đệm tại Việt Nam': 'Inventory Buffer in Vietnam',
    'Gom hàng LCL / FCL': 'LCL / FCL Consolidation',
    'Hỗ trợ cung ứng Nhật Bản & Singapore': 'Japan & Singapore Supply Support',
    'Lưu kho vật liệu & linh kiện': 'Material & Component Storage',
    'Hỗ trợ chứng từ xuất khẩu': 'Export Documentation Support',
    'Mẫu sản phẩm đã duyệt': 'Approved Product Samples',
    'Mẫu linh kiện': 'Component Samples',
    'Bản vẽ kỹ thuật': 'Technical Drawings',
    'Bảng màu / hoàn thiện': 'Color / Finish Boards',
    'Tài liệu vật liệu': 'Material References',
    'Tiêu chuẩn đóng gói': 'Packing & Shipment Standards',
    'Checklist QC': 'QC Checklists',
    'Chất lượng & Tiêu chuẩn': 'Quality & Standards',
    'Tổng quan hệ thống chất lượng': 'Quality System Overview',
    'Quy trình kiểm soát chất lượng': 'Quality Control Process',
    'Kiểm tra vật liệu': 'Material Inspection',
    'Kiểm tra cuối': 'Final Inspection',
    'Kiểm soát mẫu duyệt': 'Approved Sample Control',
    'Kiểm soát độ ẩm': 'Moisture Control',
    'Báo cáo kiểm tra': 'Inspection Report',
    'Tiêu chuẩn riêng của buyer': 'Buyer-Specific Standards',
    'Tài nguyên': 'Resources',
    'Thư viện vật liệu': 'Material Library',
    'Ghi chú sản xuất': 'Manufacturing Notes',
    'Nội dung hỗ trợ buyer trong quá trình xuất khẩu.':
      'Content that supports buyers during the export process.',
    'Banner kiến thức xuất khẩu': 'Export knowledge banner',
    'Thông tin và kinh nghiệm thực tế về sản xuất, logistics và xuất khẩu nội thất từ Việt Nam.':
      'Practical information and experience about furniture production, logistics, and export from Vietnam.',
    'Thư viện Kiến thức xuất khẩu được xây dựng nhằm chia sẻ các thông tin hữu ích liên quan đến sản xuất, chuỗi cung ứng, logistics, kiểm soát chất lượng và hoạt động xuất khẩu nội thất từ Việt Nam.':
      'The Export Knowledge library is built to share useful information related to production, supply chains, logistics, quality control, and furniture export operations from Vietnam.',
    'Nội dung được tổng hợp từ kinh nghiệm thực tế của ANSLIFE trong quá trình làm việc với buyer, nhà máy và các dự án xuất khẩu quốc tế.':
      'The content is compiled from ANSLIFE’s practical experience working with buyers, factories, and international export projects.',
    'Banner case study': 'Case study banner',
    'Các tình huống triển khai theo sản phẩm và dự án.':
      'Implementation cases by product and project.',
    'Những dự án, sản phẩm và giải pháp đã được triển khai trong thực tế.':
      'Projects, products, and solutions that have been implemented in practice.',
    'Case Study là thư viện tổng hợp các dự án, sản phẩm và hoạt động vận hành thực tế mà ANSLIFE đã tham gia hoặc hỗ trợ triển khai.':
      'Case Study is a library of real projects, products, and operational activities that ANSLIFE has participated in or supported.',
    'Mỗi Case Study tập trung vào bài toán của khách hàng, cách tiếp cận, giải pháp thực hiện và kết quả đạt được nhằm giúp buyer và đối tác hiểu rõ hơn về năng lực triển khai của ANSLIFE.':
      'Each Case Study focuses on the customer problem, approach, implemented solution, and results achieved to help buyers and partners better understand ANSLIFE’s execution capability.',
    'Các nhóm Case Study': 'Case Study Groups',
    'Các dự án phát triển sản phẩm từ ý tưởng, bản vẽ hoặc mẫu tham chiếu đến sản xuất hàng loạt.':
      'Product development projects from ideas, drawings, or reference samples through mass production.',
    'Phát triển bộ sưu tập ghế cho thị trường Nhật Bản':
      'Developing a chair collection for the Japanese market',
    'Chuyển đổi thiết kế từ concept sang sản xuất':
      'Converting designs from concept to production',
    'Tối ưu cấu kiện để giảm chi phí sản xuất':
      'Optimizing components to reduce production cost',
    'Dự án nội thất hoàn thiện': 'Finished Furniture Projects',
    'Các dự án sản xuất và cung ứng nội thất hoàn thiện cho buyer quốc tế.':
      'Finished furniture production and supply projects for international buyers.',
    'Ghế xuất khẩu cho thị trường Mỹ': 'Export chairs for the US market',
    'Bộ bàn ăn cho thị trường EU': 'Dining sets for the EU market',
    'Nội thất phòng ngủ cho chuỗi bán lẻ':
      'Bedroom furniture for retail chains',
    'Dự án khách sạn, resort và nhà hàng':
      'Hotel, Resort, and Restaurant Projects',
    'Các dự án nội thất tùy chỉnh theo yêu cầu riêng của công trình.':
      'Custom furniture projects based on each property’s specific requirements.',
    'Resort ven biển': 'Beachfront resorts',
    'Khách sạn boutique': 'Boutique hotels',
    'Chuỗi nhà hàng quốc tế': 'International restaurant chains',
    'Văn phòng và không gian làm việc': 'Offices and workspaces',
    'Giải pháp chuỗi cung ứng': 'Supply Chain Solutions',
    'Các dự án liên quan đến điều phối nhà máy, vật liệu, logistics và xuất khẩu.':
      'Projects related to factory coordination, materials, logistics, and export.',
    'Quản lý nhiều nhà máy cho một dự án':
      'Managing multiple factories for one project',
    'Gom hàng từ nhiều nguồn cung': 'Consolidating goods from multiple sources',
    'Tổ chức xuất hàng định kỳ': 'Arranging recurring shipments',
    'Các mô hình lưu kho, tồn kho đệm và điều phối cung ứng tại Việt Nam.':
      'Warehousing, buffer inventory, and supply coordination models in Vietnam.',
    'Kho đệm cho buyer Nhật Bản': 'Buffer storage for Japanese buyers',
    'Gom hàng LCL từ nhiều nhà máy':
      'LCL consolidation from multiple factories',
    'Quản lý vật liệu cho dự án dài hạn':
      'Material management for long-term projects',
    'Các tình huống kiểm soát chất lượng và giải quyết rủi ro trong dự án.':
      'Quality control and project risk resolution scenarios.',
    'Khắc phục sai lệch màu sắc': 'Correcting color deviations',
    'Kiểm soát chất lượng đa nhà máy': 'Multi-factory quality control',
    'QC độc lập trước xuất hàng': 'Independent QC before shipment',
    'Chuẩn hóa mẫu duyệt cho đơn hàng lặp lại':
      'Standardizing approved samples for repeat orders',
    'Cấu trúc một Case Study': 'Case Study Structure',
    'Bối cảnh': 'Context',
    'Khách hàng đang gặp vấn đề gì?':
      'What problem is the customer facing?',
    'Mục tiêu': 'Objective',
    'Kết quả mong muốn là gì?': 'What is the desired outcome?',
    'Thách thức': 'Challenge',
    'Những khó khăn hoặc rủi ro chính.':
      'Key difficulties or risks.',
    'Giải pháp': 'Solution',
    'ANSLIFE đã triển khai những gì.': 'What ANSLIFE implemented.',
    'Những thay đổi hoặc kết quả đạt được.':
      'Changes or results achieved.',
    'Bài học kinh nghiệm': 'Lessons Learned',
    'Những ghi nhận có giá trị cho các dự án tương tự.':
      'Valuable notes for similar projects.',
    'Case Study nổi bật': 'Featured Case Studies',
    'Supply Chain': 'Supply Chain',
    'Quality Control': 'Quality Control',
    'Tối ưu chuỗi cung ứng cho dự án đa nhà máy':
      'Optimizing the supply chain for a multi-factory project',
    'Điều phối vật liệu, cấu kiện và giao hàng từ nhiều nguồn cung.':
      'Coordinating materials, components, and delivery from multiple sources.',
    'Xây dựng tồn kho đệm tại Việt Nam':
      'Building buffer inventory in Vietnam',
    'Giảm thời gian giao hàng và tăng khả năng đáp ứng cho buyer.':
      'Reducing lead time and improving responsiveness for buyers.',
    'Chuẩn hóa mẫu duyệt cho đơn hàng dài hạn':
      'Standardizing approved samples for long-term orders',
    'Duy trì tính nhất quán giữa các lô hàng trong nhiều năm.':
      'Maintaining consistency across production batches for many years.',
    'Giá trị từ Case Study': 'Value from Case Studies',
    'Thực tế': 'Practical',
    'Dựa trên các dự án đã triển khai.':
      'Based on projects that have already been implemented.',
    'Cho thấy cách ANSLIFE xử lý vấn đề.':
      'Shows how ANSLIFE handles problems.',
    'Kinh nghiệm': 'Experience',
    'Chia sẻ bài học từ thực tiễn.':
      'Shares lessons from real practice.',
    'Tham khảo': 'Reference',
    'Giúp buyer hình dung phương án triển khai cho dự án của mình.':
      'Helps buyers envision an implementation approach for their own project.',
    'Tìm hiểu các dự án thực tế cùng ANSLIFE':
      'Explore real projects with ANSLIFE',
    'Khám phá các dự án, giải pháp và bài học thực tiễn từ hoạt động sản xuất, chuỗi cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'Explore projects, solutions, and practical lessons from furniture production, supply chain, and export operations in Vietnam.',
    'Xem Case Study mới nhất': 'View latest case studies',
    'Gửi yêu cầu dự án': 'Send project inquiry',
    'Các chuyên mục chính': 'Main Categories',
    'Bắt đầu sản xuất tại Việt Nam': 'Starting Production in Vietnam',
    'Những thông tin cơ bản dành cho buyer hoặc doanh nghiệp đang tìm hiểu khả năng sản xuất tại Việt Nam.':
      'Basic information for buyers or businesses exploring production capability in Vietnam.',
    'Làm thế nào để bắt đầu tìm nhà máy tại Việt Nam':
      'How to start finding a factory in Vietnam',
    'OEM và ODM khác nhau như thế nào': 'How OEM and ODM differ',
    'Những thông tin cần chuẩn bị trước khi gửi RFQ':
      'Information to prepare before sending an RFQ',
    'Các yếu tố ảnh hưởng đến giá thành sản phẩm':
      'Factors that affect product cost',
    'Chuỗi cung ứng & sản xuất': 'Supply Chain & Production',
    'Các chủ đề liên quan đến năng lực sản xuất, vật liệu, nhà máy và tổ chức chuỗi cung ứng.':
      'Topics related to production capability, materials, factories, and supply chain organization.',
    'Đánh giá năng lực nhà máy như thế nào':
      'How to evaluate factory capability',
    'Khi nào nên sử dụng nhiều nhà máy cho một dự án':
      'When to use multiple factories for one project',
    'Các rủi ro phổ biến trong chuỗi cung ứng nội thất':
      'Common risks in the furniture supply chain',
    'Tối ưu hóa sản lượng và kế hoạch giao hàng':
      'Optimizing output and delivery planning',
    'Chất lượng & QC': 'Quality & QC',
    'Kiến thức liên quan đến kiểm soát chất lượng trong sản xuất và xuất khẩu.':
      'Knowledge related to quality control in production and export.',
    'Kiểm tra trong sản xuất là gì': 'What is in-process inspection?',
    'Kiểm tra cuối là gì': 'What is final inspection?',
    'Những lỗi phổ biến trong sản xuất nội thất':
      'Common issues in furniture production',
    'Logistics & xuất khẩu': 'Logistics & Export',
    'Thông tin về vận chuyển, container, chứng từ và điều phối xuất khẩu.':
      'Information about shipping, containers, documents, and export coordination.',
    'LCL và FCL khác nhau như thế nào': 'How LCL and FCL differ',
    'Những lưu ý khi xuất khẩu nội thất': 'Notes when exporting furniture',
    'Chuẩn bị chứng từ xuất khẩu': 'Preparing export documents',
    'Cách tối ưu chi phí logistics': 'How to optimize logistics costs',
    'Vật liệu & hoàn thiện': 'Materials & Finishing',
    'Kiến thức về vật liệu, hoàn thiện bề mặt và các yếu tố ảnh hưởng đến chất lượng sản phẩm.':
      'Knowledge about materials, surface finishing, and factors that affect product quality.',
    'Các loại gỗ phổ biến trong nội thất xuất khẩu':
      'Common wood species in export furniture',
    'Kiểm soát độ ẩm vật liệu': 'Controlling material moisture',
    'Hoàn thiện bề mặt cho từng thị trường':
      'Surface finishing for each market',
    'Buyer Guides': 'Buyer Guides',
    'Các hướng dẫn dành cho buyer đang tìm kiếm đối tác sản xuất tại Việt Nam.':
      'Guides for buyers looking for manufacturing partners in Vietnam.',
    'Checklist làm việc với nhà máy': 'Factory collaboration checklist',
    'Cách đánh giá nhà cung cấp': 'How to evaluate suppliers',
    'Những câu hỏi cần làm rõ trước khi đặt hàng':
      'Questions to clarify before placing an order',
    'Quản lý dự án sản xuất từ xa': 'Managing production projects remotely',
    'Chủ đề nổi bật': 'Featured Topics',
    'OEM vs ODM: Lựa chọn nào phù hợp?': 'OEM vs ODM: Which Option Fits?',
    'So sánh chi tiết giữa OEM và ODM để giúp bạn chọn mô hình phù hợp cho dự án của mình.':
      'A detailed comparison between OEM and ODM to help you choose the right model for your project.',
    'Những lỗi thường gặp khi phát triển sản phẩm mới':
      'Common Mistakes When Developing New Products',
    'Các lỗi phổ biến có thể gây sai lệch khi phát triển sản phẩm nội thất và cách hạn chế.':
      'Common issues that can cause deviations during furniture product development and how to reduce them.',
    'Đánh giá năng lực nhà máy trước khi đặt hàng':
      'Evaluating Factory Capability Before Ordering',
    'Các yếu tố quan trọng cần xem xét để lựa chọn nhà máy phù hợp và đảm bảo chất lượng.':
      'Important factors to review when choosing the right factory and ensuring quality.',
    'Vai trò của QC độc lập trong dự án xuất khẩu':
      'The Role of Independent QC in Export Projects',
    'Tại sao QC độc lập giúp giảm rủi ro và nâng cao chất lượng sản phẩm trước khi giao hàng.':
      'Why independent QC helps reduce risk and improve product quality before shipment.',
    'Lưu kho và tồn kho đệm tại Việt Nam':
      'Warehousing and Buffer Inventory in Vietnam',
    'Lợi ích của việc lưu kho, gom hàng và tồn kho đệm trong chuỗi cung ứng quốc tế.':
      'The benefits of warehousing, consolidation, and buffer inventory in international supply chains.',
    'Cách xây dựng chuỗi cung ứng ổn định tại Việt Nam':
      'How to Build a Stable Supply Chain in Vietnam',
    'Chiến lược giúp duy trì chuỗi cung ứng ổn định, linh hoạt và hiệu quả cho dự án dài hạn.':
      'Strategies to maintain a stable, flexible, and efficient supply chain for long-term projects.',
    'Buyer quốc tế': 'International Buyers',
    'Tìm hiểu thị trường sản xuất tại Việt Nam, quy trình, chi phí và các lưu ý quan trọng khi triển khai dự án.':
      'Understand Vietnam’s manufacturing market, process, costs, and key notes when launching projects.',
    'Nhà nhập khẩu': 'Importers',
    'Nâng cao hiểu biết về chuỗi cung ứng, logistics, chất lượng và các quy định xuất khẩu.':
      'Improve understanding of supply chains, logistics, quality, and export regulations.',
    'Tiếp cận các yêu cầu phổ biến của buyer quốc tế và nâng cao năng lực sản xuất, quản trị và chất lượng.':
      'Access common requirements from international buyers and improve production, management, and quality capability.',
    'Đội ngũ mua hàng': 'Purchasing Teams',
    'Hỗ trợ đánh giá nhà cung cấp, quản lý dự án, kiểm soát chất lượng và tối ưu hiệu quả mua hàng.':
      'Support supplier evaluation, project management, quality control, and purchasing efficiency optimization.',
    'Khám phá thư viện kiến thức xuất khẩu của ANSLIFE':
      'Explore ANSLIFE’s Export Knowledge Library',
    'Tìm hiểu thêm về sản xuất, chuỗi cung ứng, chất lượng, logistics và các hoạt động xuất khẩu nội thất từ Việt Nam.':
      'Learn more about production, supply chains, quality, logistics, and furniture export operations from Vietnam.',
    'Xem bài viết mới nhất': 'View latest articles',
    'Kinh nghiệm thực tế từ vật liệu, sản xuất, hoàn thiện và kiểm soát chất lượng trong ngành nội thất xuất khẩu.':
      'Practical experience from materials, production, finishing, and quality control in export furniture.',
    'Ghi chú sản xuất là thư viện tổng hợp các quan sát, kinh nghiệm và bài học thực tế từ quá trình phát triển sản phẩm, sản xuất, hoàn thiện bề mặt, kiểm soát chất lượng và xuất khẩu.':
      'Manufacturing Notes is a library of observations, experience, and practical lessons from product development, production, surface finishing, quality control, and export.',
    'Nội dung được xây dựng nhằm hỗ trợ buyer, đối tác và đội ngũ sản xuất hiểu rõ hơn về các yếu tố ảnh hưởng đến chất lượng, tiến độ và tính ổn định của sản phẩm nội thất.':
      'The content is built to help buyers, partners, and production teams better understand the factors that affect furniture quality, schedule, and stability.',
    'Banner ghi chú sản xuất': 'Manufacturing notes banner',
    'Các chuyên mục ghi chú': 'Note Categories',
    'Vật liệu & nguyên liệu': 'Materials & Raw Materials',
    'Các ghi chú liên quan đến gỗ tự nhiên, gỗ kỹ thuật, veneer, vật liệu bọc nệm, mây tre và các vật liệu sử dụng trong sản xuất nội thất.':
      'Notes related to solid wood, engineered wood, veneer, upholstery materials, rattan, bamboo, and materials used in furniture production.',
    'Sự khác biệt giữa Oak và Ash trong sản xuất ghế':
      'The difference between Oak and Ash in chair production',
    'Những lưu ý khi sử dụng veneer tự nhiên': 'Key notes when using natural veneer',
    'Độ ẩm vật liệu ảnh hưởng như thế nào đến sản phẩm':
      'How material moisture affects the product',
    'Khi nào nên sử dụng plywood thay cho gỗ tự nhiên':
      'When to use plywood instead of solid wood',
    'Cấu kiện & kết cấu sản phẩm': 'Components & Product Structure',
    'Các ghi chú liên quan đến cấu kiện, mộng gỗ, liên kết và kết cấu sản phẩm.':
      'Notes related to components, wood joints, connections, and product structure.',
    'Các loại mộng gỗ phổ biến trong nội thất xuất khẩu':
      'Common wood joints in export furniture',
    'Khung ghế chịu lực được thiết kế như thế nào':
      'How load-bearing chair frames are designed',
    'Những lỗi thường gặp trong lắp ráp cấu kiện':
      'Common issues in component assembly',
    'Vai trò của dung sai trong sản xuất hàng loạt':
      'The role of tolerance in mass production',
    'Sơn & hoàn thiện bề mặt': 'Paint & Surface Finishing',
    'Kinh nghiệm về stain, màu sắc, hoàn thiện bề mặt và kiểm soát chất lượng hoàn thiện.':
      'Experience with stain, color, surface finishing, and finish quality control.',
    'Stain và sơn màu khác nhau như thế nào': 'How stain and colored paint differ',
    'Tại sao cùng một màu nhưng hai lô hàng có thể khác nhau':
      'Why two batches can differ even with the same color',
    'Các yếu tố ảnh hưởng đến độ bóng của sản phẩm':
      'Factors that affect product gloss',
    'Kiểm soát màu sắc trong sản xuất hàng loạt':
      'Color control in mass production',
    'Các ghi chú liên quan đến hoạt động QC và hệ thống chất lượng.':
      'Notes related to QC activities and the quality system.',
    'Các lỗi thường gặp khi kiểm tra cuối': 'Common issues during final inspection',
    'Tại sao cần kiểm tra trong sản xuất': 'Why in-process inspection is needed',
    'Vai trò của mẫu duyệt trong dự án nội thất':
      'The role of approved samples in furniture projects',
    'Những điểm buyer thường quan tâm khi đánh giá chất lượng':
      'Quality points buyers usually care about',
    'Đóng gói & logistics': 'Packing & Logistics',
    'Những kinh nghiệm liên quan đến đóng gói, lưu kho và vận chuyển quốc tế.':
      'Experience related to packing, warehousing, and international transportation.',
    'Knock-down và Fully Assembled nên chọn phương án nào':
      'Choosing between Knock-down and Fully Assembled',
    'Những nguyên nhân phổ biến gây hư hỏng trong vận chuyển':
      'Common causes of damage during transportation',
    'Lựa chọn vật liệu đóng gói phù hợp cho nội thất xuất khẩu':
      'Selecting suitable packing materials for export furniture',
    'Lưu ý khi xếp container sản phẩm nội thất':
      'Notes when loading furniture products into containers',
    'Những kinh nghiệm từ quá trình phát triển sản phẩm và triển khai dự án mới.':
      'Experience from product development and new project implementation.',
    'Từ bản vẽ đến sản xuất hàng loạt': 'From drawing to mass production',
    'Những câu hỏi cần làm rõ trước khi phát triển mẫu':
      'Questions to clarify before sample development',
    'Các yếu tố ảnh hưởng đến chi phí sản xuất':
      'Factors that affect production cost',
    'Khi nào nên lựa chọn OEM và khi nào nên lựa chọn ODM':
      'When to choose OEM and when to choose ODM',
    'Các chủ đề nổi bật': 'Featured Topics',
    'Độ ẩm vật liệu và rủi ro cong vênh':
      'Material Moisture and Warping Risk',
    'Hiểu rõ độ ẩm vật liệu và cách kiểm soát giúp giảm thiểu cong vênh, nứt và biến dạng trong sản xuất.':
      'Understanding material moisture and how to control it helps reduce warping, cracking, and deformation in production.',
    'Các hệ hoàn thiện bề mặt phổ biến trong nội thất xuất khẩu':
      'Common Surface Finishing Systems in Export Furniture',
    'Tổng hợp các hệ hoàn thiện phổ biến, ưu điểm, ứng dụng và lưu ý khi sản xuất hàng loạt.':
      'A summary of common finishing systems, their advantages, applications, and notes for mass production.',
    'Những lỗi thường gặp trong đóng gói nội thất':
      'Common Issues in Furniture Packing',
    'Những điểm cần được kiểm soát trong đóng gói và vận chuyển để cải thiện trạng thái giao hàng.':
      'Key points to control in packing and transportation to improve delivery condition.',
    'Kiểm soát màu sắc giữa các lô hàng': 'Color Control Between Production Batches',
    'Vì sao màu sắc giữa các lô hàng có thể khác nhau và cách kiểm soát hiệu quả.':
      'Why color can vary between batches and how to control it effectively.',
    'Vai trò của mẫu duyệt trong sản xuất hàng loạt':
      'The Role of Approved Samples in Mass Production',
    'Mẫu duyệt là cơ sở quan trọng để duy trì tính đồng nhất và hạn chế rủi ro.':
      'Approved samples are an important basis for maintaining consistency and reducing risk.',
    'Tối ưu hóa cấu kiện cho sản xuất và vận chuyển':
      'Optimizing Components for Production and Transportation',
    'Thiết kế cấu kiện hợp lý giúp tối ưu chi phí, thời gian sản xuất và vận chuyển.':
      'Well-designed components help optimize cost, production time, and transportation.',
    'Đối tượng phù hợp': 'Suitable Audiences',
    Buyer: 'Buyer',
    'Hiểu rõ hơn về vật liệu, sản xuất và kiểm soát chất lượng.':
      'Better understand materials, production, and quality control.',
    'Nhà thiết kế': 'Designer',
    'Hiểu các yếu tố ảnh hưởng đến khả năng sản xuất.':
      'Understand the factors that affect manufacturability.',
    'Chia sẻ kinh nghiệm và bài học thực tế.':
      'Share practical experience and lessons learned.',
    'Đội ngũ phát triển sản phẩm': 'Product Development Team',
    'Hỗ trợ quá trình phát triển và tối ưu sản phẩm.':
      'Support product development and optimization.',
    'Vì sao ghi chú sản xuất quan trọng?': 'Why Are Manufacturing Notes Important?',
    'Chia sẻ kinh nghiệm thực tế': 'Share practical experience',
    'Giảm rủi ro trong sản xuất và xuất khẩu':
      'Reduce risks in production and export',
    'Nâng cao hiểu biết về vật liệu và quy trình':
      'Improve understanding of materials and processes',
    'Tối ưu chất lượng, tiến độ và chi phí':
      'Optimize quality, schedule, and cost',
    'Hỗ trợ quyết định và phát triển sản phẩm':
      'Support decisions and product development',
    'Thư viện kiến thức liên tục cập nhật':
      'Continuously Updated Knowledge Library',
    'Các ghi chú được cập nhật thường xuyên từ thực tế sản xuất tại các nhà máy và dự án của ANSLIFE.':
      'Notes are updated regularly from real production at ANSLIFE factories and projects.',
    'Quan sát thực tế từ sản xuất': 'Real observations from production',
    'Bài học từ lỗi và cải tiến': 'Lessons from defects and improvements',
    'Kinh nghiệm từ nhiều thị trường': 'Experience from multiple markets',
    'Giải pháp tối ưu trong thực tế': 'Practical optimization solutions',
    'Góp phần xây dựng chuỗi cung ứng chất lượng':
      'Contributing to a Quality Supply Chain',
    'Chia sẻ kiến thức giúp nâng cao năng lực của toàn bộ chuỗi cung ứng, đối tác và cộng đồng sản xuất nội thất tại Việt Nam.':
      'Knowledge sharing helps improve the capability of the whole supply chain, partners, and furniture manufacturing community in Vietnam.',
    'Chia sẻ kiến thức': 'Share knowledge',
    'Nâng cao năng lực': 'Improve capability',
    'Chuỗi cung ứng ổn định': 'Stable supply chain',
    'Sản phẩm chất lượng': 'Quality products',
    'Khách hàng hài lòng': 'Satisfied customers',
    'Các ghi chú giúp duy trì và đối chiếu tiêu chuẩn với mẫu duyệt, bản vẽ, bảng màu và checklist QC của từng buyer.':
      'Notes help maintain and compare standards with each buyer’s approved samples, drawings, color boards, and QC checklists.',
    'Bảng màu & hoàn thiện': 'Color & Finish Boards',
    'Khám phá thư viện ghi chú sản xuất của ANSLIFE':
      'Explore ANSLIFE’s Manufacturing Notes Library',
    'Các ghi chú được cập nhật từ thực tế sản xuất, phát triển sản phẩm, kiểm soát chất lượng và xuất khẩu nhằm hỗ trợ buyer và đối tác hiểu rõ hơn về ngành nội thất tại Việt Nam.':
      'Notes are updated from real production, product development, quality control, and export experience to help buyers and partners better understand the furniture industry in Vietnam.',
    'Xem ghi chú mới nhất': 'View latest notes',
    'Tìm kiếm chủ đề': 'Search topics',
    'Case study': 'Case Studies',
    'Case Study': 'Case Studies',
    'Cập nhật công ty': 'Company Updates',
    'Banner cập nhật công ty': 'Company updates banner',
    'Những hoạt động, dự án và cột mốc mới nhất của ANSLIFE.':
      'The latest activities, projects, and milestones from ANSLIFE.',
    'Trang Cập nhật công ty chia sẻ những thông tin mới nhất về hoạt động của ANSLIFE, bao gồm phát triển năng lực sản xuất, hợp tác đối tác, triển khai dự án, tham gia triển lãm, hoạt động cộng đồng và các cột mốc quan trọng trong quá trình phát triển.':
      'The Company Updates page shares the latest information about ANSLIFE activities, including production capability development, partner collaboration, project implementation, exhibition participation, community activities, and important milestones in the development journey.',
    'Đây là nơi giúp buyer, đối tác và cộng đồng theo dõi hành trình phát triển của ANSLIFE tại Việt Nam và trên thị trường quốc tế.':
      'This is where buyers, partners, and the community can follow ANSLIFE’s development journey in Vietnam and international markets.',
    'Tin tức công ty': 'Company News',
    'Dự án & hợp tác': 'Projects & Partnerships',
    'Nhà máy & sản xuất': 'Factory & Production',
    'Triển lãm & sự kiện': 'Exhibitions & Events',
    'Chất lượng & chứng nhận': 'Quality & Certifications',
    'Các cập nhật nổi bật': 'Featured Updates',
    'Năng lực': 'Capability',
    'Supply Hub': 'Supply Hub',
    'Chất lượng': 'Quality',
    'Sự kiện': 'Event',
    'ANSLIFE mở rộng mạng lưới nhà máy đối tác':
      'ANSLIFE expands its partner factory network',
    'Tăng cường năng lực sản xuất và khả năng đáp ứng cho các dự án nội thất xuất khẩu quy mô lớn.':
      'Strengthening production capacity and responsiveness for large-scale export furniture projects.',
    'Khởi động chương trình Supply Hub Việt Nam':
      'Launch of the Vietnam Supply Hub program',
    'Mô hình hỗ trợ lưu kho, tồn kho đệm và điều phối xuất hàng linh hoạt cho buyer quốc tế.':
      'A model supporting warehousing, buffer stock, and flexible shipment coordination for international buyers.',
    'Phát triển hệ thống quản lý mẫu duyệt':
      'Developing an approved sample management system',
    'Tối ưu hóa việc lưu trữ, đối chiếu và quản lý mẫu duyệt nhằm nâng cao khả năng kiểm soát chất lượng.':
      'Optimizing storage, comparison, and management of approved samples to improve quality control capability.',
    'Tham gia VIFA Expo 2025': 'Participating in VIFA Expo 2025',
    'Giới thiệu năng lực sản xuất, giải pháp cung ứng và mô hình Supply Hub Việt Nam đến khách hàng quốc tế.':
      'Introducing production capability, supply solutions, and the Vietnam Supply Hub model to international customers.',
    'Dòng thời gian phát triển': 'Development Timeline',
    'Mở rộng mạng lưới nhà máy hợp tác': 'Expanded the partner factory network',
    'Hoàn thiện vai trò vận hành dự án xuất khẩu':
      'Strengthened export project operation capabilities',
    'Củng cố chuỗi cung ứng vật liệu nội thất':
      'Reinforced the furniture material supply chain',
    'Chuyển trụ sở chính về Thành phố Hồ Chí Minh':
      'Moved head office operations to Ho Chi Minh City',
    'Mở thêm chi nhánh hoạt động tại Đồng Nai':
      'Opened an additional operating branch in Dong Nai',
    'Mở rộng hệ thống nhà máy vệ tinh': 'Expanded the satellite factory system',
    'Xây dựng khu vực kiểm định chất lượng độc lập':
      'Built an independent quality testing area',
    'Nâng cấp hệ thống QC & truy xuất': 'Upgraded QC and traceability systems',
    'Mở rộng năng lực lưu kho và kho đệm':
      'Expanded warehousing and buffer stock capacity',
    'Kiểm định tiêu chuẩn cơ học cho nội thất':
      'Tested mechanical standards for furniture',
    'Triển khai hệ thống quản lý số': 'Implemented a digital management system',
    'Tăng gấp đôi năng lực sản xuất': 'Doubled production capacity',
    'Mở rộng hợp tác toàn cầu': 'Expanded global partnerships',
    'Phát triển chương trình bền vững': 'Developed sustainability programs',
    'Buyer & đối tác': 'Buyers & Partners',
    'Cập nhật năng lực mới nhất, dự án và các giải pháp cung ứng từ ANSLIFE.':
      'Stay updated on ANSLIFE’s latest capabilities, projects, and supply solutions.',
    'Nhà máy đối tác': 'Partner Factories',
    'Theo dõi các chương trình hợp tác, kế hoạch sản xuất và phát triển chuỗi cung ứng.':
      'Follow cooperation programs, production plans, and supply chain development.',
    'Cộng đồng': 'Community',
    'Theo dõi các hoạt động xã hội, đào tạo nghề và chương trình phát triển nguồn nhân lực.':
      'Follow social activities, vocational training, and workforce development programs.',
    'Theo dõi những cập nhật mới nhất từ ANSLIFE':
      'Follow the latest updates from ANSLIFE',
    'Khám phá các hoạt động, dự án, sự kiện và cột mốc phát triển mới nhất của ANSLIFE.':
      'Explore ANSLIFE’s latest activities, projects, events, and development milestones.',
    'Xem tất cả cập nhật': 'View all updates',
    'Đăng ký nhận tin': 'Subscribe for updates',
    FAQ: 'FAQ',
    'Câu hỏi thường gặp': 'Frequently Asked Questions',
    'Liên hệ / Gửi yêu cầu': 'Contact / Send Inquiry',
    'Yêu cầu chung': 'General Inquiry',
    'Yêu cầu báo giá': 'Request Quotation',
    'Tải bản vẽ / ảnh tham chiếu': 'Upload Drawing / Reference Image',
    'Yêu cầu OEM / ODM': 'OEM / ODM Request',
    'Yêu cầu Supply Hub': 'Supply Hub Inquiry',
    'Yêu cầu thăm nhà máy': 'Factory Visit Request',
    'Thông tin liên hệ': 'Contact Information',
    'Nội thất gỗ': 'Wood furniture',
    'Tin nổi bật': 'Featured news',
    'Đăng ký trực tuyến': 'Online registration',
    'Ưu đãi': 'Offers',
    'Báo giá nhanh': 'Quick quote',
    'Dự án khách sạn': 'Hotel projects',
    'Báo giá & làm việc': 'Quote & consultation',
    'Dự án xuất khẩu': 'Export Projects',
    'Case sản xuất': 'Manufacturing Cases',
    'Case cải tiến': 'Improvement Cases',
    'Hình ảnh giao hàng': 'Delivery Images',
    'Việt Nam - Trụ sở': 'Vietnam - Headquarters',
    'Việt Nam – Trụ sở': 'Vietnam - Headquarters',
    'Singapore – Văn phòng': 'Singapore - Office',
    'Singapore - Văn phòng đại diện': 'Singapore - Representative Office',
    'Singapore – Văn phòng đại diện': 'Singapore - Representative Office',
    'Nhật Bản – Văn phòng': 'Japan - Office',
    'Nhật Bản - Văn phòng đại diện': 'Japan - Representative Office',
    'Nhật Bản – Văn phòng đại diện': 'Japan - Representative Office',
    'Hoa Kỳ – Văn phòng': 'United States - Office',
    'Hoa Kỳ - Văn phòng đại diện': 'United States - Representative Office',
    'Hoa Kỳ – Văn phòng đại diện': 'United States - Representative Office',
    'Đối tác quốc tế': 'International Partners',
    'Giới thiệu quỹ': 'Fund Overview',
    'Chương trình học bổng': 'Scholarship Programs',
    'Hoạt động cộng đồng': 'Community Activities',
    'Tham gia cùng ANSLIFE': 'Join ANSLIFE',
    'Tin doanh nghiệp': 'Corporate News',
    'Tin nhà máy': 'Factory News',
    'Kiến thức sản xuất': 'Manufacturing Insights',
    'Kiến thức QC': 'QC Insights',
    'Kiến thức xuất khẩu': 'Export Knowledge',
    'Thông tin công ty': 'Company Information',
    'Gửi yêu cầu báo giá': 'Request a Quote',
    'Đặt lịch làm việc': 'Schedule a Meeting',
    'Xem chi tiết': 'View details',
    'Xem toàn bộ': 'View all',
    'Đọc bài viết': 'Read article',
    'Danh mục sản phẩm': 'Product Categories',
    'Sản phẩm tiêu biểu': 'Featured Products',
    'Dự án & case study': 'Projects & Case Studies',
    'Tin tức & kiến thức sản xuất': 'News & Manufacturing Knowledge',
    'Khám phá sản phẩm': 'Explore products',
    'Nhận tư vấn dự án': 'Get project consultation',
    'Tất cả': 'All',
    'Chi tiết sản phẩm': 'Product details',
    'Chi tiết dự án': 'Project details',
    'Chi tiết tin tức': 'News details',
    'Quay lại danh mục sản phẩm': 'Back to product catalog',
    'Quay lại danh sách dự án': 'Back to project list',
    'Quay lại danh sách tin tức': 'Back to news list',
    'Không tìm thấy trang': 'Page not found',
    'Quay lại trang chủ': 'Back to home',
    'LIÊN HỆ': 'CONTACT',
    'TIN TỨC': 'NEWS',
    'DỰ ÁN': 'PROJECTS',
    'DANH MỤC SẢN PHẨM': 'PRODUCT CATALOG',
    'Dự án & Nghiên cứu điển hình': 'Projects & Case Studies',
    'Tin tức & Kiến thức': 'News & Insights',
    'Báo cáo & tác động': 'Reports & Impact',
    'Chính sách bảo mật': 'Privacy Policy',
    'Điều khoản sử dụng': 'Terms of Use',
    'Liên kết chân trang': 'Footer links',
    'Nhà sản xuất và xuất khẩu nội thất gỗ uy tín cho các thương hiệu toàn cầu.':
      'Trusted wooden furniture manufacturer and exporter for global brands.',
    'Mọi quyền được bảo lưu.': 'All Rights Reserved.',
    'Thông tin công ty ANSLIFE, form báo giá và đặt lịch làm việc.':
      'ANSLIFE company information, quote request form and meeting booking.',
    'ANSLIFE là đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam cho buyer quốc tế trong ngành nội thất, cấu kiện và vật liệu. Chúng tôi có văn phòng đại diện tại Hà Nội, TP. Hồ Chí Minh, Tokyo, Singapore và Hong Kong.':
      'ANSLIFE is a manufacturing, supply chain and export partner in Vietnam for international buyers in furniture, components and materials. We have representative offices in Hanoi, Ho Chi Minh City, Tokyo, Singapore and Hong Kong.',
    'Tên công ty': 'Company Name',
    'Vai trò': 'Role',
    'Đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam':
      'Manufacturing, supply chain and export partner in Vietnam',
    'Lĩnh vực hoạt động': 'Business Scope',
    'Sản xuất nội thất, cấu kiện, chuỗi cung ứng vật liệu, lưu kho, QC độc lập, vận hành dự án, tài trợ thương mại, đóng gói và xuất hàng':
      'Furniture production, components, material supply chain, warehousing, independent QC, project operations, trade finance, packing and export shipment',
    'Thị trường phục vụ': 'Markets Served',
    'Nhật Bản, Hoa Kỳ, EU và buyer quốc tế':
      'Japan, United States, EU and international buyers',
    'Văn phòng trong nước': 'Vietnam Offices',
    'Hà Nội, TP. Hồ Chí Minh': 'Hanoi, Ho Chi Minh City',
    'Văn phòng quốc tế': 'International Offices',
    'Ngôn ngữ hỗ trợ': 'Supported Languages',
    'Tiếng Anh, Tiếng Nhật, Tiếng Việt, Tiếng Hàn':
      'English, Japanese, Vietnamese, Korean',
    'Buyer có thể liên hệ ANSLIFE để gửi yêu cầu sản phẩm, bản vẽ, mẫu, vật liệu hoặc kế hoạch lưu kho – xuất hàng từ Việt Nam.':
      'Buyers can contact ANSLIFE to send product requirements, drawings, samples, materials or warehousing and export shipment plans from Vietnam.',
    'Văn phòng & liên hệ': 'Offices & Contact',
    'ANSLIFE có hệ thống văn phòng đại diện tại Việt Nam, Nhật Bản, Singapore và Hong Kong nhằm hỗ trợ buyer quốc tế trong quá trình trao đổi yêu cầu, quản lý dự án, kiểm soát tiêu chuẩn và tổ chức chuỗi cung ứng từ Việt Nam.':
      'ANSLIFE operates representative offices in Vietnam, Japan, Singapore and Hong Kong to support international buyers with requirement exchange, project management, standards control and supply chain organization from Vietnam.',
    'Văn phòng đại diện': 'Representative Offices',
    'Địa chỉ': 'Address',
    'Địa chỉ đang cập nhật': 'Address updating',
    'VIỆT NAM': 'VIETNAM',
    'Tiêu chuẩn làm việc của ANSLIFE': 'Our Working Standards',
    'ANSLIFE làm việc dựa trên nguyên tắc rõ ràng, có thể kiểm soát và có thể truy xuất. Mỗi dự án được quản lý dựa trên mẫu đã duyệt, bản vẽ kỹ thuật, tiêu chuẩn vật liệu, checklist kiểm hàng, tiêu chuẩn đóng gói và kế hoạch giao hàng đã thống nhất.':
      'ANSLIFE works based on clear, controllable and traceable standards. Each project is managed through approved samples, technical drawings, material standards, inspection checklists, packing requirements and agreed shipment plans.',
    'Kiểm soát mẫu đã duyệt': 'Approved Sample Control',
    'Mẫu sản phẩm, cấu kiện, màu sắc, vật liệu và bề mặt hoàn thiện được lưu giữ làm tiêu chuẩn đối chiếu trong quá trình sản xuất và kiểm hàng.':
      'Approved product samples, components, colors, materials and finishes are maintained as reference standards for production and inspection.',
    'Quản lý bản vẽ kỹ thuật': 'Technical Drawing Management',
    'Bản vẽ, kích thước, kết cấu, thông số vật liệu và yêu cầu kỹ thuật được ghi nhận rõ ràng trước khi triển khai sản xuất.':
      'Drawings, dimensions, structures, material specifications and technical requirements are clearly recorded before production starts.',
    'Quản lý vật liệu & màu sắc': 'Material & Color Management',
    'Vật liệu, mẫu sơn, bảng màu, veneer, plywood, foam, vải, phụ kiện và vật liệu đóng gói được kiểm soát theo tiêu chuẩn của từng buyer và từng thị trường.':
      'Materials, color panels, paint samples, veneer, plywood, foam, fabric, accessories and packing materials are controlled according to buyer and market requirements.',
    'Checklist kiểm hàng': 'Order-Specific Inspection Checklist',
    'Mỗi đơn hàng có checklist kiểm tra riêng, bao gồm kích thước, kết cấu, độ hoàn thiện, màu sắc, độ ẩm, đóng gói, nhãn mác và tình trạng hàng trước khi xuất.':
      'Each order follows its own inspection checklist covering dimensions, structure, finish, color, moisture, packing, labeling and pre-shipment condition.',
    'QC độc lập': 'Independent QC',
    'Hệ thống QC của ANSLIFE hoạt động độc lập với bộ máy sản xuất, nhằm đảm bảo việc kiểm tra được thực hiện khách quan theo tiêu chuẩn đã thống nhất.':
      "ANSLIFE's QC system operates independently from the production team to ensure objective inspection based on agreed standards.",
    'Quy cách đóng gói, carton mark, nhãn hàng, mã sản phẩm, pallet, container loading hoặc LCL/FCL shipment được kiểm soát theo yêu cầu của từng buyer.':
      "Packing method, carton marks, labels, item codes, pallets, container loading and LCL/FCL shipment requirements are controlled according to each buyer's standard.",
    'Báo cáo minh bạch': 'Transparent Reporting',
    'Các vấn đề phát sinh trong sản xuất, kiểm hàng hoặc xuất hàng được ghi nhận, báo cáo và trao đổi rõ ràng để có phương án xử lý kịp thời.':
      'Issues during production, inspection or shipment are recorded, reported and discussed clearly so that corrective actions can be taken in time.',
    'Gửi yêu cầu báo giá hoặc đặt lịch làm việc. Dữ liệu được lưu vào WordPress qua Contact Form 7 + Flamingo.':
      'Send a quote request or schedule a meeting. Data is saved to WordPress via Contact Form 7 + Flamingo.',
    'Vui lòng điền biểu mẫu để đội ngũ ANSLIFE phản hồi báo giá trong thời gian sớm nhất.':
      'Please complete the form so the ANSLIFE team can respond with a quote as soon as possible.',
    'Đăng ký lịch làm việc để ANSLIFE chủ động sắp xếp tư vấn theo nhu cầu của bạn.':
      'Book a meeting so ANSLIFE can proactively arrange consultation based on your needs.',
    'Form ID chưa được cấu hình. Vui lòng đặt NEXT_PUBLIC_CF7_QUOTE_FORM_ID hoặc NEXT_PUBLIC_CF7_MEETING_FORM_ID.':
      'Form ID is not configured. Please set NEXT_PUBLIC_CF7_QUOTE_FORM_ID or NEXT_PUBLIC_CF7_MEETING_FORM_ID.',
    'Đang gửi dữ liệu...': 'Submitting data...',
    'Không gửi được form. Vui lòng thử lại.': 'Unable to submit the form. Please try again.',
    'Họ tên': 'Full name',
    Email: 'Email',
    'Công ty': 'Company',
    'Sản phẩm quan tâm': 'Products of interest',
    'Nhập tên sản phẩm rồi bấm Thêm': 'Enter a product name and click Add',
    'Thêm': 'Add',
    'Xóa': 'Remove',
    'Đang tải danh sách sản phẩm...': 'Loading product list...',
    'Không tải được gợi ý sản phẩm từ CMS. Bạn vẫn có thể nhập thủ công.':
      'Could not load product suggestions from CMS. You can still enter manually.',
    'Chưa có sản phẩm trong CMS để gợi ý.': 'No products in CMS for suggestions yet.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      'You can select multiple products. If not found in suggestions, enter manually and click Add.',
    'Nội dung': 'Message',
    'Đang gửi...': 'Submitting...',
    'Gửi báo giá': 'Submit quote request',
    'Số điện thoại': 'Phone number',
    'Ngày mong muốn': 'Preferred date',
    'Đặt lịch': 'Schedule',
    'Chọn ngày của bạn': 'Select your dates',
    'Chọn ngày làm việc': 'Select a meeting date',
    'Tháng tiếp theo': 'Next month',
    'Ngày đã chọn': 'Selected date',
    'Chưa chọn ngày': 'No date selected',
    'Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.':
      'ANSLIFE V1 website: manufacturing ecosystem, quality and global capability.',
    'Chào buổi sáng': 'Good morning',
    'Chào buổi chiều': 'Good afternoon',
    'Chào buổi tối': 'Good evening',
    'Không gian ban ngày': 'Daytime scene',
    'Không gian hoàng hôn': 'Sunset scene',
    'Không gian ban đêm': 'Night scene',
    'SẢN XUẤT NỘI THẤT ANSLIFE': 'ANSLIFE FURNITURE MANUFACTURING',
    'Giải pháp sản xuất nội thất xuất khẩu theo tiêu chuẩn quốc tế.':
      'Furniture manufacturing solutions aligned with global standards.',
    'Nội thất xuất khẩu, bộ sưu tập theo chất liệu và phong cách.':
      'Export furniture collections by material and style.',
    'Gia công theo yêu cầu': 'Custom manufacturing',
    'OEM/ODM, phát triển mẫu và vận hành sản xuất linh hoạt.':
      'OEM/ODM, sample development, and flexible production operations.',
    'Các dự án nội thất thực tế cho thị trường trong nước và quốc tế.':
      'Real interior projects for domestic and international markets.',
    'Gửi yêu cầu báo giá, đặt lịch trao đổi với đội ngũ ANSLIFE.':
      'Submit a quote request and schedule a consultation with the ANSLIFE team.',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất, QC tới giao hàng theo tiêu chuẩn quốc tế.':
      'ANSLIFE operates an ecosystem from materials and production to QC and delivery under international standards.',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất đến kiểm soát chất lượng và giao hàng. Hạ tầng nhà máy linh hoạt cho OEM/ODM.':
      'ANSLIFE operates an ecosystem from materials and production to quality control and delivery. Flexible factory infrastructure for OEM/ODM.',
    'Nhà máy ANSLIFE + nhà máy đối tác': 'ANSLIFE factories + partner factories',
    'QC nhiều lớp từ đầu vào đến trước xuất hàng':
      'Multi-layer QC from input to pre-shipment',
    'Mạng lưới toàn cầu': 'Global Network',
    'Kết nối dự án tại Việt Nam, Nhật, Singapore và Hoa Kỳ':
      'Project connectivity in Vietnam, Japan, Singapore and the United States',
    'Sản phẩm nổi bật': 'Featured products',
    'Dự án và case study': 'Projects and case studies',
    'Tin tức mới nhất': 'Latest news',
    'Hỗ trợ tiếp nhận yêu cầu báo giá':
      'Support for quote requests 24/7',
    'TỔNG DIỆN TÍCH NHÀ MÁY (MÉT VUÔNG)': 'TOTAL FACTORY AREA (SQUARE METERS)',
    'CÔNG NHÂN VIÊN VÀ CHUYÊN GIA': 'EMPLOYEES AND SPECIALISTS',
    'NHÂN VIÊN KỸ THUẬT': 'TECHNICAL STAFF',
    'SỐ NĂM KINH NGHIỆM': 'YEARS OF EXPERIENCE',
    'Quy mô theo từng nhà máy': 'Scale by factory',
    'Trung tâm sản xuất chủ lực': 'Core production hub',
    'Quy mô lớn, vận hành chuỗi sản xuất chính':
      'Large scale, operating the primary production chain',
    'Tập trung các công đoạn cốt lõi và kiểm soát kỹ thuật.':
      'Concentrates core stages and technical control.',
    'Ưu tiên đơn hàng chiến lược, yêu cầu tiêu chuẩn cao.':
      'Prioritizes strategic orders with high standards.',
    'Là điểm điều phối tiến độ cho toàn hệ sinh thái.':
      'Acts as the schedule coordination hub for the whole ecosystem.',
    'Mạng lưới sản xuất liên kết': 'Connected production network',
    'Quy mô linh hoạt theo nhóm sản phẩm':
      'Flexible scale by product category',
    'Mở rộng công suất theo mùa vụ và kế hoạch xuất khẩu.':
      'Expands capacity based on seasonality and export plans.',
    'Chuyên môn hóa theo từng dòng sản phẩm hoặc công đoạn.':
      'Specializes by product line or production stage.',
    'Phối hợp cùng trung tâm sản xuất chủ lực để đảm bảo tiến độ giao hàng.':
      'Coordinates with the core production hub to ensure delivery timelines.',
    'Đang cập nhật mô tả sản phẩm.': 'Product description is being updated.',
    'Đang cập nhật nội dung dự án.': 'Project content is being updated.',
    'Đang cập nhật nội dung bài viết.': 'Article content is being updated.',
    'TRANG WEB ANSLIFE V1': 'ANSLIFE WEBSITE V1',
    'Các nhóm nội dung': 'Content Groups',
    'V1 hiển thị theo dạng section/anchor để team nhập nội dung nhanh và dễ mở rộng đa ngôn ngữ ở giai đoạn sau.':
      'V1 displays section/anchor blocks so the team can input content quickly and scale multilingual content later.',
    'Danh mục sản phẩm theo nhóm, cho phép gửi yêu cầu báo giá trực tiếp từ từng trang chi tiết.':
      'Products are grouped by category and allow direct quote requests from each detail page.',
    'Tổng hợp dự án thực tế, bài học vận hành và hình ảnh giao hàng theo thị trường.':
      'A collection of real projects, operation learnings and delivery visuals by market.',
    'Nội dung vận hành, sản xuất, QC và cập nhật từ hệ sinh thái ANSLIFE.':
      'Operations, manufacturing, QC and updates from the ANSLIFE ecosystem.',
    'Chi tiết bài viết': 'Article details',
    'Ngày đăng': 'Published on',
    'Không tìm thấy bài viết trong CMS.': 'Article not found in CMS.',
    'Thông tin chi tiết bài viết ANSLIFE': 'Detailed ANSLIFE article information',
    'CHI TIẾT TIN TỨC': 'NEWS DETAILS',
    'CHI TIẾT SẢN PHẨM': 'PRODUCT DETAILS',
    'CHI TIẾT DỰ ÁN': 'PROJECT DETAILS',
    'Không tìm thấy sản phẩm trong CMS.': 'Product not found in CMS.',
    'Không tìm thấy dự án trong CMS.': 'Project not found in CMS.',
    'Thông tin chi tiết dự án và nghiên cứu điển hình ANSLIFE':
      'Detailed ANSLIFE project and case study information',
    'Thông tin chi tiết sản phẩm ANSLIFE':
      'Detailed ANSLIFE product information',
    'Chưa có ảnh sản phẩm': 'No product image available',
    'Danh mục': 'Category',
    'Chưa gán': 'Unassigned',
    'Tùy chọn hoàn thiện': 'Finish options',
    'Tùy chọn mặt ngồi': 'Seat options',
    'Thông số kỹ thuật': 'Specifications',
    'Mô tả nhanh': 'Quick overview',
    'Mô tả chi tiết': 'Detailed description',
    'Mã sản phẩm': 'Product code',
    'Chất liệu': 'Material',
    'Kích thước (L x D x H)': 'Dimensions (L x D x H)',
    'Sản phẩm tồn tại nhưng không thuộc nhóm URL hiện tại.':
      'The product exists but does not match the current URL category.',
    'Đường dẫn không tồn tại trên hệ thống frontend hiện tại.':
      'This path does not exist in the current frontend system.',
    'Vui lòng quay lại trang chủ hoặc sử dụng menu điều hướng.':
      'Please return to the homepage or use the navigation menu.',
    'Thông tin địa chỉ ANSLIFE': 'ANSLIFE Address Information',
    'Văn phòng Hà Nội': 'Hanoi Office',
    'Văn phòng TP.HCM': 'Ho Chi Minh City Office',
    'Địa chỉ nhà máy': 'Factory Address',
    'Bản đồ ANSLIFE': 'ANSLIFE Map',
    'Trang này tập trung vào điều hướng vị trí. Bạn có thể mở trực tiếp từng địa điểm trên Google Maps để lấy chỉ đường nhanh.':
      'This page focuses on location navigation. You can open each destination directly on Google Maps for quick directions.',
    'Bản đồ trụ sở ANSLIFE': 'ANSLIFE Headquarters Map',
    'Mở trên Google Maps': 'Open in Google Maps',
    'Trụ sở chính': 'Headquarters',
    'Nhà máy Đồng Nai': 'Dong Nai Factory',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh.':
      'No. 15, D2 Street, Hiep Phat Residential Area, Phu Loi Ward, Ho Chi Minh City.',
    'Điểm điều phối thương mại và vận hành trung tâm của ANSLIFE.':
      'Central coordination point for ANSLIFE commercial and operations activities.',
    'Phù hợp cho lịch hẹn trao đổi dự án và xác nhận mẫu.':
      'Suitable for project discussion meetings and sample confirmation appointments.',
    'Tham quan nhà máy theo lịch đăng ký trước với đội ngũ ANSLIFE.':
      'Factory visits are available by prior registration with the ANSLIFE team.',
    'Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.':
      '5th Floor, Zen Tower, No. 12 Khuat Duy Tien Street, Thanh Xuan Trung Ward, Thanh Xuan District, Hanoi.',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh':
      'No. 15, D2 Street, Hiep Phat Residential Area, Phu Loi Ward, Ho Chi Minh City',
    'Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.':
      'No. 609, Group 3, Quarter 1, Long Binh Ward, Dong Nai Province, Vietnam.',
    'Giao diện SPA + CMS WordPress': 'SPA Interface + WordPress CMS',
    'Giao diện Next.js + CMS WordPress': 'Next.js Interface + WordPress CMS',
    'Đội ngũ ANSLIFE sẵn sàng tiếp nhận yêu cầu báo giá, hỗ trợ kỹ thuật sản phẩm, đặt lịch làm việc và trao đổi kế hoạch hợp tác theo từng thị trường.':
      'The ANSLIFE team is ready to receive quote requests, provide product technical support, schedule meetings, and discuss cooperation plans by market.',
    'Phản hồi nhanh': 'Fast response',
    'Ưu tiên phản hồi thông tin trong khung thời gian làm việc gần nhất.':
      'We prioritize replies during the nearest business hours.',
    'Hỗ trợ kỹ thuật': 'Technical support',
    'Tư vấn theo mã hàng, vật liệu, cấu trúc và tiêu chuẩn hoàn thiện.':
      'Consulting by product code, materials, structure, and finishing standards.',
    'Hỗ trợ thương mại': 'Commercial support',
    'Đồng bộ báo giá, điều kiện giao hàng và quy trình đơn hàng.':
      'Aligning quotations, delivery terms, and order processing workflow.',
    'Làm việc đa kênh': 'Multi-channel collaboration',
    'Hỗ trợ email, điện thoại và lịch hẹn trực tiếp.':
      'Support via email, phone, and in-person appointments.',
    'Giờ làm việc: Thứ 2 - Thứ 7, 08:00 - 17:30':
      'Working hours: Monday - Saturday, 08:00 - 17:30',
    'Hỗ trợ gặp trực tiếp theo lịch hẹn.':
      'In-person meetings available by appointment.',
    'Phù hợp cho trao đổi dự án và xác nhận mẫu.':
      'Ideal for project discussions and sample confirmations.',
    'Nhà máy': 'Factory',
    'Đón tiếp tham quan nhà máy theo đăng ký trước.':
      'Factory visits welcomed by prior registration.',
    'Hỗ trợ khảo sát năng lực sản xuất theo từng nhóm sản phẩm.':
      'Production capability surveys supported by product group.',
    'Hướng dẫn gửi yêu cầu nhanh': 'Quick request guidelines',
    'Để nhận phản hồi chính xác và nhanh hơn, bạn nên cung cấp rõ nhóm sản phẩm, thị trường mục tiêu, số lượng dự kiến và yêu cầu chất lượng ưu tiên.':
      'For a faster and more accurate response, please share the product group, target market, expected volume, and priority quality requirements.',
    'Đính kèm bản vẽ hoặc ảnh tham chiếu nếu đã có.':
      'Attach drawings or reference images if available.',
    'Nêu rõ thời gian mong muốn nhận báo giá / triển khai.':
      'State the desired timeline for receiving the quote or starting execution.',
    'Cho biết điều kiện giao hàng dự kiến để tư vấn phù hợp.':
      'Share the expected delivery terms so we can advise accordingly.',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'Furniture manufacturing, supply and export system in Vietnam.',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'Warehousing, shipment coordination, and partner standard room in Vietnam.',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      'Overview of warehousing, consolidation, export coordination, and partner standard room.',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'Finished goods warehousing, buffer inventory, and shipment planning support in Vietnam.',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'Consolidating LCL, FCL, and multiple supply sources to optimize export.',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'Organizing recurring shipment schedules based on buyer plans, markets, and supply capability.',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      'Storing materials, components, and semi-finished goods to support production and long-term supply.',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      'Supporting shipment records, cargo information, and documents for export.',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      'Managing approved samples, components, drawings, material documents, packing standards, and QC checklists.',
  },
  jp: {
    'Trang chủ': 'ホーム',
    'Art objects': '美術品',
    'Bàn - Tủ trang điểm': 'テーブル - ドレッシングキャビネット',
    'Bàn Cafe - Bàn trà': 'コーヒーテーブル - ティーテーブル',
    'Bàn Console - Kệ Console': 'コンソールテーブル - コンソールシェルフ',
    'Bàn học - Bàn làm việc': '学習机 - ワークデスク',
    'Bàn Lamp - Bàn góc': 'ランプテーブル - コーナーテーブル',
    'Bàn mây': '籐テーブル',
    'Bàn ngoài trời': 'アウトドアテーブル',
    'Bình hoa - Lọ hoa': '花瓶 - 花瓶',
    'Bản đồ': '地図',
    'Bộ bàn ghế ngoài trời': '屋外用家具セット',
    'Bộ bàn ăn': 'ダイニングテーブルセット',
    'Bộ chăn ga gối': '寝具セット',
    'Chứng chỉ trong hệ sinh thái': 'エコシステムにおける認証',
    'Custom Design': 'カスタムデザイン',
    'Công nghệ gia công': '加工技術',
    'Decor & Thủ công mỹ nghệ': '装飾と工芸品',
    'Decor mây tre': '竹と籐の装飾',
    'Dụng cụ nhà bếp': 'キッチン用品',
    'English': '英語',
    'Facebook': 'Facebook',
    'Form đăng ký nhà máy': '工場登録フォーム',
    'Ghế Bar - Ghế đôn': 'バーチェア - スツール',
    'Ghế Bench': 'ベンチチェア',
    'Ghế học - Ghế làm việc': '学習椅子 - 作業椅子',
    'Ghế mây': '籐椅子',
    'Ghế ngoài trời': 'アウトドアチェア',
    'Gia công': '機械加工',
    'Giường': 'ベッド',
    'Giường 2m2': 'ベッド2m2',
    'Giường King': 'キングベッド',
    'Giường Queen': 'クイーンベッド',
    'Giường tầng': '二段ベッド',
    'Giường đơn - Cũi': 'シングルベッド - ベビーベッド',
    'Giỏ mây': '籐バスケット',
    'Giỏ trang trí - Hộp trang trí': '飾りかご・飾り箱',
    'Giới thiệu chương trình đối tác': 'パートナープログラムのご紹介',
    'Giới thiệu về Anslife': 'ANSLIFEについて',
    'Gương trang trí': '飾り鏡',
    'Hoa giả- cây giả': '造花 - フェイク植物',
    'Hoa Kỳ – Văn phòng đại diện': '米国 – 駐在員事務所',
    'Hậu cần': 'ロジスティクス',
    'Hệ sinh thái Anslife': 'ANSLIFEエコシステム',
    'Hệ thống cung ứng': '供給体制',
    'Instagram': 'Instagram',
    'Khay gỗ': '木製トレイ',
    'Khay mây': '籐トレイ',
    'Không gian ngoài trời': '屋外スペース',
    'Khăn trải bàn - Tấm lót trang trí': 'テーブルクロス - 装飾プレースマット',
    'Khảm trai': 'パールモザイク',
    'Kitchenware gỗ': '木製キッチン用品',
    'Kiểm soát nguyên liệu': '原料管理',
    'Lắp ráp': '組み立てる',
    'Lịch sử phát triển': '開発経緯',
    'MDF / PB / ván công nghiệp': 'MDF/PB/工業用ボード',
    'Muỗng gỗ': '木のスプーン',
    'Máy móc sản xuất': '生産機械',
    'Mây tre đan': '竹と籐',
    'Mô hình vận hành hệ sinh thái': 'エコシステム運用モデル',
    'Nguồn cung gỗ': '木材の供給',
    'Nhà máy ANSLIFE': 'ANSLIFEファクトリー',
    'Nhà máy vệ tinh': 'サテライト工場',
    'Nhật Bản – Văn phòng đại diện': '日本 – 駐在員事務所',
    'Nến - Tinh dầu thơm': 'キャンドル - フレグランス エッセンシャル オイル',
    'ODM': 'ODM',
    'OEM': 'OEM',
    'Pha lê cao cấp Bohemia': '高品質のボヘミアクリスタル',
    'Phát triển mẫu': 'サンプル開発',
    'Phát triển nguồn nhân lực': '人材育成',
    'Phụ kiện trang trí': '装飾アクセサリー',
    'Phụng sự xã hội': '社会に奉仕する',
    'Plywood': '合板',
    'Quy mô hệ sinh thái': '生態系規模',
    'Quy trình xử lý lỗi': 'エラー処理プロセス',
    'Quy trình đánh giá': '評価プロセス',
    'Singapore – Văn phòng đại diện': 'シンガポール – 駐在員事務所',
    'Sofa - Ghế thư giãn': 'ソファ・リラックスチェア',
    'Sofa 2 chỗ': '2人掛けソファ',
    'Sofa 3 chỗ': '3人掛けソファ',
    'Sofa bed': 'ソファベッド',
    'Sofa da bò': '牛革ソファ',
    'Sofa góc - Sofa bộ': 'コーナーソファ - ソファセット',
    'Sofa thư giãn Recliner': 'リクライニングリラックスソファ',
    'Sofa đơn': 'シングルソファ',
    'Sơn hoàn thiện': '塗装完了',
    'Sơn mài': 'ラッカー',
    'Sản phẩm mây tre theo thiết kế': 'デザインに合わせた竹・籐製品',
    'Sản phẩm ngoài trời khác': 'その他のアウトドア用品',
    'Sản xuất theo yêu cầu': 'ご要望に応じて製作します',
    'Thiết bị & công nghệ': '設備と技術',
    'Thảm': 'カーペット',
    'Thớt gỗ': '木製まな板',
    'TikTok': 'TikTok',
    'Tiêu chuẩn sản xuất': '製造基準',
    'Tiếng Anh': '英語',
    'Tiếng Hàn': '韓国語',
    'Tiếng Nhật': '日本語',
    'Tiếng Việt': 'ベトナム語',
    'Trang trí gỗ': '木の装飾',
    'Tranh': '絵画',
    'Triết lý': '理念',
    'Triết lý vận hành': '経営理念',
    'Tầm nhìn, sứ mệnh': 'ビジョン、ミッション',
    'Tủ - Kệ': 'キャビネット - 棚',
    'Tủ - Kệ giầy': 'キャビネット - 靴棚',
    'Tủ kính - Tủ trưng bầy - Tủ sách': 'ガラスキャビネット - 飾り棚 - 本棚',
    'Tủ ngăn kéo - Tủ trang trí nhỏ': 'チェスト - 小さな装飾キャビネット',
    'Tủ nhà tắm - Lavabo': 'バスルームキャビネット - Lavabo',
    'Tủ Sideboard - Tủ Buffet': 'サイドボードキャビネット - ビュッフェキャビネット',
    'Tủ Tivi - Kệ Tivi': 'テレビキャビネット - テレビ棚',
    'Vật liệu công nghiệp': '産業資材',
    'Vật liệu liên quan': '関連資料',
    'Vỏ gối trang trí': '装飾枕カバー',
    'YouTube': 'YouTube',
    'Điều kiện tham gia': '参加条件',
    'Đèn': 'ランプ',
    'Đóng gói': 'パック',
    'Đôn - Ottoman': 'ドン - オスマン帝国',
    'Đăng ký đối tác sản xuất': '制作パートナーとして登録する',
    'Đệm': 'クッション',
    'Đồ cho bé': 'ベビー用品',
    'Đồ gia dụng': '家庭用電化製品',
    'Đồ gia dụng - Đồ nhà bếp': '家電製品 - キッチン家電',
    'Đồ trang trí': '装飾品',
    'Đồ trang trí Giáng Sinh': 'クリスマスの飾り付け',
    'Ưu đãi độc quyền': '特別オファー',
    '日本語': '日本語',
    '한국어': '韓国語',
    'Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.':
      'ANSLIFE V1 ウェブサイト: 生産エコシステム、品質、グローバル対応力。',
    'Chào buổi sáng': 'おはようございます',
    'Chào buổi chiều': 'こんにちは',
    'Chào buổi tối': 'こんばんは',
    'Không gian ban ngày': '昼のシーン',
    'Không gian hoàng hôn': '夕暮れのシーン',
    'Không gian ban đêm': '夜のシーン',
    'Quý khách đang tìm kiếm gì hôm nay?': '本日は何をお探しですか？',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất, QC tới giao hàng theo tiêu chuẩn quốc tế.':
      'ANSLIFEは原材料・生産・QC・出荷まで、国際基準に沿ったエコシステムを運営しています。',
    'Truy cập nhanh': 'クイックアクセス',
    'Tin nổi bật': '注目ニュース',
    'Đăng ký trực tuyến': 'オンライン登録',
    'Sản phẩm nổi bật': '注目製品',
    'Dự án khách sạn': 'ホテルプロジェクト',
    'Nội thất gỗ': '木製家具',
    'Báo giá nhanh': 'クイック見積り',
    'Gia công theo yêu cầu': 'カスタム製造',
    'Báo giá & làm việc': '見積り・ご相談',
    'Các dự án nội thất thực tế cho thị trường trong nước và quốc tế.':
      '国内外市場向けの実際のインテリアプロジェクト。',
    'Các nhóm giải pháp của ANSLIFE': 'ANSLIFEのソリューショングループ',
    'Nội thất xuất khẩu, bộ sưu tập theo chất liệu và phong cách.':
      '輸出向け家具コレクション（素材別・スタイル別）。',
    'OEM/ODM, phát triển mẫu và vận hành sản xuất linh hoạt.':
      'OEM/ODM、サンプル開発、柔軟な生産運営。',
    'Gửi yêu cầu báo giá, đặt lịch trao đổi với đội ngũ ANSLIFE.':
      '見積り依頼を送信し、ANSLIFEチームとの相談日程を予約できます。',
    'Từ khóa gần đây': '最近のキーワード',
    'Không tìm thấy nhóm phù hợp. Hãy thử từ khóa khác.':
      '該当するグループが見つかりません。別のキーワードをお試しください。',
    'Về ANSLIFE': 'ANSLIFEについて',
    'Về Anslife': 'ANSLIFEについて',
    'VỀ ANSLIFE': 'ANSLIFEについて',
    'Giới thiệu ANSLIFE': 'ANSLIFE紹介',
    'Giới thiệu về công ty': '会社紹介',
    'Giới thiệu triết lý': '理念紹介',
    'Cá nhân': '個人',
    'Tổ chức': '組織',
    'Đối tác đặc biệt': '特別パートナー',
    'Hệ sinh thái sản xuất': '生産エコシステム',
    'Năng lực sản xuất': '製造能力',
    'Quy mô hệ sinh thái sản xuất': '生産エコシステム規模',
    'Công suất sản xuất': '生産能力',
    'Năng lực phát triển sản phẩm': '製品開発力',
    'Khả năng xử lý đơn hàng': '受注処理能力',
    'Sản xuất theo yêu cầu (OEM / ODM)': '受託生産（OEM / ODM）',
    'Thị trường xuất khẩu': '輸出市場',
    'Kiểm soát chất lượng': '品質管理',
    'Hệ thống kiểm soát chất lượng': '品質管理システム',
    'Sản phẩm': '製品',
    'Sản phẩm & Giải pháp': '製品・ソリューション',
    'Nội thất hoàn thiện': '完成家具',
    'Linh kiện nội thất': '家具部品',
    'Chân gỗ': '木製脚',
    'Bộ phận bọc nệm': '張地部品',
    'Linh kiện mây': 'ラタン部品',
    'Ván ép & ván công nghiệp': '合板・ボード',
    'Nguyên liệu gỗ': '木材原料',
    'Vật liệu mút & bọc': 'フォーム・張地材料',
    'Vật liệu mây tre': 'ラタン・竹素材',
    'Vải / da / vật liệu bọc': '生地・レザー・張地材料',
    'Vật liệu đóng gói': '梱包資材',
    'Foam / Mút / Xốp': 'フォーム / スポンジ',
    'Phát triển OEM/ODM': 'OEM/ODM開発',
    'Giải pháp dịch vụ': 'サービスソリューション',
    'Giải pháp vận hành & cung ứng': '運営・供給ソリューション',
    'Phát triển sản phẩm OEM / ODM': 'OEM / ODM製品開発',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      '図面、実物サンプル、または製品アイデアからサンプル開発とベトナムでの量産まで。',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      '海外バイヤー向けの運営、供給、保管、QC、梱包、輸出混載ソリューション。',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFEは、実現可能性評価、製品開発、工場評価、品質管理、物流、保管から貿易金融、出荷まで、海外バイヤーのベトナムでのプロジェクト運営を支援します。',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      '物流とグローバルサプライチェーンのイラスト',
    '1. Phát triển sản phẩm OEM / ODM': '1. OEM / ODM製品開発',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      '図面、実物サンプル、または製品アイデアからサンプル開発と量産まで対応します。',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. プロジェクト・サプライチェーン実現可能性評価',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      '製品、材料、工場、生産能力、期間、コスト、ベトナムのサプライチェーン適合性を評価します。',
    '3. Thẩm định năng lực nhà máy': '3. 工場能力評価',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      '製品、材料、生産量、品質基準、納期に基づいて工場能力を評価します。',
    '4. Vận hành & quản lý dự án xuất khẩu': '4. 輸出プロジェクト運営・管理',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      '進捗管理、情報調整、生産管理、発生課題の対応、プロジェクト報告を行います。',
    '5. QC độc lập trong dự án': '5. プロジェクト内の独立QC',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      '工場から独立した品質管理を、バイヤー基準と各市場の要件に沿って実施します。',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. プロジェクト物流・輸出入調整',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      '資材、部品、原材料の輸入、貨物混載、保管、書類、国際出荷を支援します。',
    '7. Lưu kho tại Việt Nam': '7. ベトナムでの保管',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      '商品、材料、部材、承認サンプル、梱包基準、予備在庫をベトナムで保管します。',
    '8. Tài trợ thương mại': '8. 貿易金融',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      '注文、材料、生産、QC、出荷に連動した、バイヤーと委託工場向けの管理型貿易金融を提供します。',
    'Hành trình của một dự án tại ANSLIFE':
      'ANSLIFEにおけるプロジェクトの流れ',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'アイデア段階から商品が顧客に届くまで、プロジェクト全体を通じてバイヤーに伴走します。',
    'Ý tưởng & yêu cầu': 'アイデア・要件',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'プロジェクト・サプライチェーン実現可能性評価',
    'Đánh giá khả thi': '実現可能性評価',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      '製品、材料、コスト、スケジュールを確認します。',
    'Phát triển sản phẩm OEM / ODM.': 'OEM / ODM製品開発。',
    'Thẩm định nhà máy': '工場評価',
    'Thẩm định năng lực nhà máy.': '工場能力評価。',
    'Vận hành dự án': 'プロジェクト運営',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      '輸出プロジェクト運営と貿易金融。',
    'QC độc lập trong dự án.': 'プロジェクト内の独立QC。',
    'Logistics & xuất nhập khẩu': '物流・輸出入',
    'Điều phối logistics & xuất nhập khẩu dự án.': 'プロジェクト物流・輸出入調整。',
    'Lưu kho & hỗ trợ': '保管・サポート',
    'Lưu kho tại Việt Nam và tài trợ thương mại.': 'ベトナムでの保管と貿易金融。',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      'なぜバイヤーはANSLIFEの運営・供給ソリューションを選ぶのか',
    'Một đầu mối - toàn bộ giải pháp': '単一窓口・包括的ソリューション',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      '製品開発から出荷まで、すべてを一つのエコシステムで対応します。',
    'Độc lập - khách quan - minh bạch': '独立・客観・透明',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'バイヤーの利益を代表し、品質とリスクを独立して管理します。',
    'Hiểu thị trường quốc tế': '国際市場への理解',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      '主要市場の基準、規制、商慣行を理解しています。',
    'Tối ưu chi phí & hiệu quả': 'コストと効率の最適化',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'サプライチェーンを最適化し、コストを削減し、プロジェクト期間を短縮します。',
    'Đồng hành dài hạn': '長期的な伴走',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'バイヤーと共に持続的に成長する長期的なパートナーシップを重視します。',
    'Sẵn sàng bắt đầu dự án của bạn?': 'プロジェクトを始める準備はできていますか？',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      '本日お問い合わせいただければ、ANSLIFEチームができるだけ早く返信します。',
    'Gửi yêu cầu': 'お問い合わせ',
    'Tải tài liệu / bản vẽ lên': '資料 / 図面をアップロード',
    'Tải bản vẽ lên': '図面をアップロード',
    'Liên hệ ANSLIFE': 'ANSLIFEに連絡',
    'QC & Kiểm định': 'QC・検査',
    'Giải pháp lưu kho tại Việt Nam': 'ベトナム保管ソリューション',
    'Gom hàng xuất khẩu': '輸出混載',
    'Nguyên liệu': '原材料',
    'Gỗ kỹ thuật': 'エンジニアードウッド',
    'Vật liệu tự nhiên': '天然素材',
    Mây: 'ラタン',
    Tre: '竹',
    'Mặt đan mây': 'ケーンウェビング',
    'Vật liệu bọc nệm': '張地材料',
    Vải: '生地',
    'Da / PU': 'レザー / PU',
    'Vật liệu đệm': 'クッション材料',
    'Hoàn thiện bề mặt': '仕上げ',
    'Hoàn thiện tự nhiên': 'ナチュラル仕上げ',
    'Hoàn thiện dầu': 'オイル仕上げ',
    'Hoàn thiện sơn màu': '塗装仕上げ',
    'Hoàn thiện mờ': 'マット仕上げ',
    'Thùng carton': 'カートン',
    'Foam bảo vệ': 'フォーム保護材',
    'Bảo vệ cạnh': 'エッジ保護材',
    'Nhà cung ứng vật liệu nội thất Việt Nam': 'ベトナム家具材料サプライヤー',
    'Nhà cung ứng plywood Việt Nam': 'ベトナム合板サプライヤー',
    'Vật liệu gỗ cho sản xuất nội thất': '家具生産用木材材料',
    'Foam & vật liệu bọc nệm Việt Nam': 'ベトナムのフォーム・張地材料',
    'Vật liệu đóng gói nội thất xuất khẩu': '輸出家具用梱包資材',
    'Nhà sản xuất nội thất Việt Nam': 'ベトナム家具メーカー',
    'Nhà sản xuất nội thất gỗ Việt Nam': 'ベトナム木製家具メーカー',
    'Nhà sản xuất nội thất OEM / ODM tại Việt Nam': 'ベトナムOEM・ODM家具メーカー',
    'Đối tác sản xuất nội thất Việt Nam': 'ベトナム家具生産パートナー',
    'Supply Hub Việt Nam cho buyer Nhật Bản': '日本バイヤー向けベトナム供給ハブ',
    'Giải pháp lưu kho Việt Nam cho nhà nhập khẩu': '輸入業者向けベトナム保管ソリューション',
    'Xuất hàng hằng tuần từ Việt Nam sang Nhật Bản': 'ベトナムから日本への週次出荷',
    'Dịch vụ gom hàng xuất khẩu Việt Nam': 'ベトナム輸出混載サービス',
    'Phòng tiêu chuẩn buyer': 'バイヤー標準ルーム',
    'Checklist QC nội thất': '家具QCチェックリスト',
    'Tiêu chuẩn đóng gói xuất khẩu': '輸出梱包基準',
    'Trung tâm cung ứng': 'サプライハブ',
    'Quy trình thương mại': '商務プロセス',
    'QUY TRÌNH THƯƠNG MẠI': '商務プロセス',
    'Quy trình hợp tác': '協業プロセス',
    'Quy trình đặt hàng': '注文プロセス',
    'Quy trình phát triển mẫu': 'サンプル開発プロセス',
    'Điều kiện giao hàng (Incoterms)': '配送条件（Incoterms）',
    'Phương thức thanh toán': '支払い方法',
    'Thời gian sản xuất': '生産リードタイム',
    Logistics: '物流',
    'Dự án': 'プロジェクト',
    'DỰ ÁN & CASE STUDY': 'プロジェクト＆ケーススタディ',
    'HỆ THỐNG TOÀN CẦU': 'グローバルネットワーク',
    'PHỤNG SỰ XÃ HỘI': '社会貢献',
    'Mạng lưới': 'ネットワーク',
    'Tuyển dụng': '採用',
    'Hình ảnh container': 'コンテナ写真',
    'Báo cáo & tác động': 'レポートとインパクト',
    'Dự án & Case Study': 'プロジェクト＆ケーススタディ',
    'Hệ thống toàn cầu': 'グローバルネットワーク',
    'Quỹ học bổng': '奨学金基金',
    'Quỹ học bổng & cộng đồng': '奨学金基金・コミュニティ',
    'Phụng Sự Xã Hội': '社会貢献',
    'Câu hỏi thường gặp': 'よくある質問',
    'Tin tức': 'ニュース',
    'Liên hệ': 'お問い合わせ',
    'Báo giá': '見積り',
    'Liên hệ nhanh': 'クイックお問い合わせ',
    'Liên kết nhanh': 'クイックリンク',
    'Đăng nhập': 'ログイン',
    'Quản trị': '管理',
    Menu: 'メニュー',
    'Mở menu': 'メニューを開く',
    'Đóng menu': 'メニューを閉じる',
    'Đóng': '閉じる',
    'Nhóm khách hàng': '顧客セグメント',
    'Bạn đang truy cập': '現在のアクセス区分',
    'Danh mục điều hướng': 'ナビゲーションカテゴリ',
    'Mục nổi bật': '注目項目',
    'Mục này đang được cập nhật.': 'このセクションは更新中です。',
    'Ngôn ngữ đã hỗ trợ': '対応済み言語',
    'Tất cả ngôn ngữ khác (sẽ hỗ trợ sau)':
      'その他すべての言語（今後対応）',
    'Mạng xã hội': 'ソーシャル',
    'Kết nối ANSLIFE': 'ANSLIFEとつながる',
    'Theo dõi ANSLIFE': 'ANSLIFEをフォロー',
    'Tìm kiếm': '検索',
    'Trang kết quả tìm kiếm theo từ khóa trên hệ sinh thái ANSLIFE.':
      'ANSLIFEエコシステム内のキーワード検索結果ページです。',
    'Nhập từ khóa để tìm sản phẩm, dự án, tin tức và các trang thông tin liên quan.':
      'キーワードを入力して、製品・プロジェクト・ニュース・関連情報ページを検索できます。',
    'Đóng tìm kiếm': '検索を閉じる',
    'Tìm sản phẩm, vật liệu, dịch vụ cung ứng...':
      '製品・素材・供給ソリューションを検索...',
    'Từ khóa tìm kiếm': '検索キーワード',
    'Từ khóa': 'キーワード',
    'Kết quả': '結果',
    'Kết quả tìm kiếm': '検索結果',
    'Gợi ý dữ liệu mới nhất': '最新のおすすめ',
    'Vui lòng nhập từ khóa để bắt đầu tìm kiếm.':
      '検索を開始するにはキーワードを入力してください。',
    'Đang tải dữ liệu tìm kiếm...': '検索データを読み込み中...',
    'Không tìm thấy kết quả phù hợp.': '該当する結果が見つかりません。',
    'Không tìm thấy kết quả phù hợp. Bạn có thể thử từ khóa khác.':
      '該当する結果が見つかりません。別のキーワードをお試しください。',
    'Điều hướng website': 'サイトナビゲーション',
    'Điều hướng': 'ナビゲーション',
    'Trang thông tin': '情報ページ',
    'Giới thiệu công ty': '会社紹介',
    'Tổng quan công ty': '会社概要',
    'Tầm nhìn - Sứ mệnh': 'ビジョン - ミッション',
    'Tầm nhìn & Sứ mệnh': 'ビジョン・ミッション',
    'Giá trị cốt lõi': 'コアバリュー',
    'Triết lý sản xuất': '生産哲学',
    'Cơ cấu tổ chức': '組織構成',
    'Đội ngũ': 'チーム',
    'Hệ sinh thái ANSLIFE': 'ANSLIFEエコシステム',
    'Hệ thống sản xuất': '生産システム',
    'Mạng lưới nhà máy': '工場ネットワーク',
    'Vùng nguyên liệu': '原材料エリア',
    'Nguyên liệu & Chuỗi cung ứng': '原材料・サプライチェーン',
    'Quy trình sản xuất': '製造工程',
    'Phát triển sản phẩm': '製品開発',
    'QC & Đóng gói': 'QC・梱包',
    'Tiêu chuẩn & QC': '基準・QC',
    'Tiêu chuẩn & chứng chỉ': '基準と認証',
    'Triết lý QC': 'QC方針',
    'Hệ thống QC': 'QCシステム',
    'Kiểm tra nguyên liệu': '原材料検査',
    'Kiểm tra trong sản xuất': '工程内検査',
    'Kiểm tra trước xuất hàng': '出荷前検査',
    'Case cải tiến chất lượng': '品質改善事例',
    'Ghế': '椅子',
    'Ghế ăn': 'ダイニングチェア',
    'Ghế lounge': 'ラウンジチェア',
    'Ghế bar': 'バーチェア',
    'Bàn': 'テーブル',
    'Bàn ăn': 'ダイニングテーブル',
    'Bàn cà phê': 'コーヒーテーブル',
    'Bàn phụ': 'サイドテーブル',
    'Tủ / Kệ': 'キャビネット / 棚',
    'Tủ / kệ': 'キャビネット / 棚',
    'Tủ quần áo': 'ワードローブ',
    'Kệ trang trí': 'ディスプレイシェルフ',
    'Tủ lưu trữ': '収納キャビネット',
    'Bộ phòng ngủ': 'ベッドルームセット',
    'Giường ngủ': 'ベッド',
    'Tủ đầu giường': 'ベッドサイドテーブル',
    'Bàn trang điểm': 'ドレッシングテーブル',
    'Bộ phòng ngủ hoàn chỉnh': 'フルベッドルームセット',
    'Sản phẩm theo thiết kế': 'カスタム製品',
    'Dịch vụ OEM/ODM': 'OEM/ODMサービス',
    'Dịch vụ OEM': 'OEMサービス',
    'Dịch vụ ODM': 'ODMサービス',
    'Thiết kế theo yêu cầu': 'カスタムデザイン',
    'OEM / ODM': 'OEM / ODM',
    'Thanh toán': '支払い',
    'Trung tâm cung ứng Việt Nam': 'ベトナム供給ハブ',
    'Lưu kho tại Việt Nam': 'ベトナムでの保管',
    'Phòng mẫu chuẩn đối tác': 'パートナー標準ルーム',
    'Quản lý mẫu & tiêu chuẩn': 'サンプル・標準管理',
    'Điều phối xuất hàng hằng tuần': '週次出荷手配',
    'QC trước xuất hàng': '出荷前QC',
    'Đóng gói xuất khẩu': '輸出梱包',
    'Gom container / LCL': 'コンテナ / LCL混載',
    'Hỗ trợ chứng từ': '書類サポート',
    'Trách nhiệm xã hội': '社会的責任',
    'Chúng tôi làm gì': '事業内容',
    'Dự án xuất khẩu': '輸出プロジェクト',
    'Case sản xuất': '製造事例',
    'Case cải tiến': '改善事例',
    'Hình ảnh giao hàng': '出荷写真',
    'Việt Nam - Trụ sở': 'ベトナム - 本社',
    'Việt Nam – Trụ sở': 'ベトナム - 本社',
    'Singapore – Văn phòng': 'シンガポール - オフィス',
    'Singapore - Văn phòng đại diện': 'シンガポール - 代表事務所',
    'Nhật Bản – Văn phòng': '日本 - オフィス',
    'Nhật Bản - Văn phòng đại diện': '日本 - 代表事務所',
    'Hoa Kỳ – Văn phòng': '米国 - オフィス',
    'Hoa Kỳ - Văn phòng đại diện': '米国 - 代表事務所',
    'Đối tác quốc tế': '国際パートナー',
    'Chính sách bảo mật': 'プライバシーポリシー',
    'Điều khoản sử dụng': '利用規約',
    'Liên kết chân trang': 'フッターリンク',
    'Nhà sản xuất và xuất khẩu nội thất gỗ uy tín cho các thương hiệu toàn cầu.':
      '世界的ブランド向けに木製家具を製造・輸出する信頼できるパートナーです。',
    'Mọi quyền được bảo lưu.': 'All Rights Reserved.',
    'Giới thiệu quỹ': '基金紹介',
    'Chương trình học bổng': '奨学金プログラム',
    'Hoạt động cộng đồng': 'コミュニティ活動',
    'Tin tức công ty': '会社ニュース',
    'Dự án & hợp tác': 'プロジェクト・協業',
    'Nhà máy & sản xuất': '工場・生産',
    'Triển lãm & sự kiện': '展示会・イベント',
    'Chất lượng & chứng nhận': '品質・認証',
    'Tham gia cùng ANSLIFE': 'ANSLIFEに参加',
    'Tin doanh nghiệp': '企業ニュース',
    'Tin nhà máy': '工場ニュース',
    'Kiến thức sản xuất': '製造知識',
    'Kiến thức QC': 'QC知識',
    'Kiến thức xuất khẩu': '輸出知識',
    'Thông tin công ty': '会社情報',
    'Thông tin công ty ANSLIFE, form báo giá và đặt lịch làm việc.':
      'ANSLIFEの会社情報、見積り依頼フォーム、打ち合わせ予約。',
    'ANSLIFE là đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam cho buyer quốc tế trong ngành nội thất, cấu kiện và vật liệu. Chúng tôi có văn phòng đại diện tại Hà Nội, TP. Hồ Chí Minh, Tokyo, Singapore và Hong Kong.':
      'ANSLIFEは、家具、部材、素材分野の海外バイヤー向けに、ベトナムで生産、サプライチェーン、輸出を支援するパートナーです。ハノイ、ホーチミン市、東京、シンガポール、香港に代表オフィスがあります。',
    'Tên công ty': '会社名',
    'Vai trò': '役割',
    'Đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam':
      'ベトナムにおける生産、サプライチェーン、輸出パートナー',
    'Lĩnh vực hoạt động': '事業領域',
    'Sản xuất nội thất, cấu kiện, chuỗi cung ứng vật liệu, lưu kho, QC độc lập, vận hành dự án, tài trợ thương mại, đóng gói và xuất hàng':
      '家具製造、部材、素材サプライチェーン、保管、独立QC、プロジェクト運営、貿易金融、梱包、出荷',
    'Thị trường phục vụ': '対応市場',
    'Nhật Bản, Hoa Kỳ, EU và buyer quốc tế':
      '日本、米国、EU、海外バイヤー',
    'Văn phòng trong nước': 'ベトナム国内オフィス',
    'Hà Nội, TP. Hồ Chí Minh': 'ハノイ、ホーチミン市',
    'Văn phòng quốc tế': '海外オフィス',
    'Ngôn ngữ hỗ trợ': '対応言語',
    'Tiếng Anh, Tiếng Nhật, Tiếng Việt, Tiếng Hàn':
      '英語、日本語、ベトナム語、韓国語',
    'Buyer có thể liên hệ ANSLIFE để gửi yêu cầu sản phẩm, bản vẽ, mẫu, vật liệu hoặc kế hoạch lưu kho – xuất hàng từ Việt Nam.':
      'バイヤーはANSLIFEに連絡し、製品要件、図面、サンプル、素材、またはベトナムからの保管・出荷計画を送ることができます。',
    'Văn phòng & liên hệ': 'オフィス・連絡先',
    'ANSLIFE có hệ thống văn phòng đại diện tại Việt Nam, Nhật Bản, Singapore và Hong Kong nhằm hỗ trợ buyer quốc tế trong quá trình trao đổi yêu cầu, quản lý dự án, kiểm soát tiêu chuẩn và tổ chức chuỗi cung ứng từ Việt Nam.':
      'ANSLIFEは、ベトナム、日本、シンガポール、香港に代表オフィスを展開し、海外バイヤーの要件確認、プロジェクト管理、基準管理、ベトナムからのサプライチェーン構築を支援します。',
    'Văn phòng đại diện': '代表オフィス',
    'Địa chỉ': '住所',
    'Địa chỉ đang cập nhật': '住所更新中',
    'VIỆT NAM': 'ベトナム',
    'Tiêu chuẩn làm việc của ANSLIFE': 'ANSLIFEの業務基準',
    'ANSLIFE làm việc dựa trên nguyên tắc rõ ràng, có thể kiểm soát và có thể truy xuất. Mỗi dự án được quản lý dựa trên mẫu đã duyệt, bản vẽ kỹ thuật, tiêu chuẩn vật liệu, checklist kiểm hàng, tiêu chuẩn đóng gói và kế hoạch giao hàng đã thống nhất.':
      'ANSLIFEは、明確で管理可能かつ追跡可能な基準に基づいて業務を行います。各プロジェクトは、承認サンプル、技術図面、材料基準、検品チェックリスト、梱包基準、合意済みの出荷計画に基づいて管理されます。',
    'Kiểm soát mẫu đã duyệt': '承認サンプル管理',
    'Mẫu sản phẩm, cấu kiện, màu sắc, vật liệu và bề mặt hoàn thiện được lưu giữ làm tiêu chuẩn đối chiếu trong quá trình sản xuất và kiểm hàng.':
      '承認済みの製品サンプル、部材、色、材料、仕上げ面は、生産と検品時の照合基準として保管されます。',
    'Quản lý bản vẽ kỹ thuật': '技術図面管理',
    'Bản vẽ, kích thước, kết cấu, thông số vật liệu và yêu cầu kỹ thuật được ghi nhận rõ ràng trước khi triển khai sản xuất.':
      '図面、寸法、構造、材料仕様、技術要件は、生産開始前に明確に記録されます。',
    'Quản lý vật liệu & màu sắc': '材料・色管理',
    'Vật liệu, mẫu sơn, bảng màu, veneer, plywood, foam, vải, phụ kiện và vật liệu đóng gói được kiểm soát theo tiêu chuẩn của từng buyer và từng thị trường.':
      '材料、塗装サンプル、カラーパネル、突板、合板、フォーム、生地、付属品、梱包材は、各バイヤーと市場の基準に従って管理されます。',
    'Checklist kiểm hàng': '検品チェックリスト',
    'Mỗi đơn hàng có checklist kiểm tra riêng, bao gồm kích thước, kết cấu, độ hoàn thiện, màu sắc, độ ẩm, đóng gói, nhãn mác và tình trạng hàng trước khi xuất.':
      '各注文には、寸法、構造、仕上げ、色、含水率、梱包、ラベル、出荷前状態を含む専用の検品チェックリストがあります。',
    'QC độc lập': '独立QC',
    'Hệ thống QC của ANSLIFE hoạt động độc lập với bộ máy sản xuất, nhằm đảm bảo việc kiểm tra được thực hiện khách quan theo tiêu chuẩn đã thống nhất.':
      'ANSLIFEのQC体制は生産部門から独立して運用され、合意済み基準に基づき客観的な検査を行います。',
    'Tiêu chuẩn đóng gói': '梱包・出荷基準',
    'Quy cách đóng gói, carton mark, nhãn hàng, mã sản phẩm, pallet, container loading hoặc LCL/FCL shipment được kiểm soát theo yêu cầu của từng buyer.':
      '梱包仕様、カートンマーク、ラベル、商品コード、パレット、コンテナ積載、LCL/FCL出荷要件は、各バイヤーの基準に従って管理されます。',
    'Báo cáo minh bạch': '透明な報告',
    'Các vấn đề phát sinh trong sản xuất, kiểm hàng hoặc xuất hàng được ghi nhận, báo cáo và trao đổi rõ ràng để có phương án xử lý kịp thời.':
      '生産、検品、出荷中に発生した問題は記録、報告、明確に共有され、適時に是正対応が取れるようにします。',
    'Gửi yêu cầu báo giá': '見積り依頼',
    'Đặt lịch làm việc': '打ち合わせ予約',
    'Họ tên': 'お名前',
    'Số điện thoại': '電話番号',
    'Nội dung': 'メッセージ',
    'Đang gửi...': '送信中...',
    'Đặt lịch': '予約する',
    'Chọn ngày của bạn': '希望日を選択',
    'Chọn ngày làm việc': '打ち合わせ日を選択',
    'Tháng tiếp theo': '翌月',
    'Ngày đã chọn': '選択した日付',
    'Chưa chọn ngày': '日付が未選択',
    'Bản đồ ANSLIFE': 'ANSLIFEマップ',
    'Trang này tập trung vào điều hướng vị trí. Bạn có thể mở trực tiếp từng địa điểm trên Google Maps để lấy chỉ đường nhanh.':
      'このページは位置案内に特化しています。各地点をGoogleマップで直接開き、すぐに経路案内を確認できます。',
    'Bản đồ trụ sở ANSLIFE': 'ANSLIFE本社マップ',
    'Mở trên Google Maps': 'Googleマップで開く',
    'Trụ sở chính': '本社',
    'Nhà máy Đồng Nai': 'ドンナイ工場',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh.':
      'ホーチミン市フーロイ坊ヒエップファット住宅地D2通り15番地',
    'Điểm điều phối thương mại và vận hành trung tâm của ANSLIFE.':
      'ANSLIFEの商務および運営を統括する中核拠点です。',
    'Phù hợp cho lịch hẹn trao đổi dự án và xác nhận mẫu.':
      'プロジェクト打ち合わせとサンプル確認の面談に適しています。',
    'Tham quan nhà máy theo lịch đăng ký trước với đội ngũ ANSLIFE.':
      '工場見学はANSLIFEチームへの事前予約にて対応します。',
    'Vui lòng điền biểu mẫu để đội ngũ ANSLIFE phản hồi báo giá trong thời gian sớm nhất.':
      'ANSLIFEチームができるだけ早くお見積りをご案内できるよう、フォームをご入力ください。',
    'Đăng ký lịch làm việc để ANSLIFE chủ động sắp xếp tư vấn theo nhu cầu của bạn.':
      'ご要望に合わせてANSLIFEが相談日程を調整できるよう、打ち合わせをご予約ください。',
    'Form ID chưa được cấu hình. Vui lòng đặt NEXT_PUBLIC_CF7_QUOTE_FORM_ID hoặc NEXT_PUBLIC_CF7_MEETING_FORM_ID.':
      'フォームIDが未設定です。NEXT_PUBLIC_CF7_QUOTE_FORM_ID または NEXT_PUBLIC_CF7_MEETING_FORM_ID を設定してください。',
    'Đang gửi dữ liệu...': 'データ送信中...',
    'Không gửi được form. Vui lòng thử lại.':
      'フォームを送信できませんでした。もう一度お試しください。',
    Email: 'メール',
    'Nhập tên sản phẩm rồi bấm Thêm': '製品名を入力して「追加」を押してください',
    'Thêm': '追加',
    'Xóa': '削除',
    'Đang tải danh sách sản phẩm...': '製品一覧を読み込み中...',
    'Không tải được gợi ý sản phẩm từ CMS. Bạn vẫn có thể nhập thủ công.':
      'CMSから製品候補を取得できません。手入力は可能です。',
    'Chưa có sản phẩm trong CMS để gợi ý.':
      '候補として表示できる製品がCMSにまだありません。',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      '複数製品を選択できます。候補にない場合は手入力して「追加」を押してください。',
    'Xem chi tiết': '詳細を見る',
    'Xem toàn bộ': 'すべて見る',
    'Đọc bài viết': '記事を読む',
    'Danh mục sản phẩm': '製品カテゴリ',
    'Sản phẩm tiêu biểu': '注目製品',
    'TỔNG DIỆN TÍCH NHÀ MÁY (MÉT VUÔNG)': '工場総面積（平方メートル）',
    'CÔNG NHÂN VIÊN VÀ CHUYÊN GIA': '従業員・専門スタッフ',
    'NHÂN VIÊN KỸ THUẬT': '技術スタッフ',
    'SỐ NĂM KINH NGHIỆM': '経験年数',
    'Quy mô theo từng nhà máy': '工場別の規模',
    'Trung tâm sản xuất chủ lực': '中核生産ハブ',
    'Quy mô lớn, vận hành chuỗi sản xuất chính':
      '大規模で、主要な生産チェーンを運営',
    'Tập trung các công đoạn cốt lõi và kiểm soát kỹ thuật.':
      '中核工程と技術管理を集中的に実施。',
    'Ưu tiên đơn hàng chiến lược, yêu cầu tiêu chuẩn cao.':
      '高い基準が求められる戦略案件を優先。',
    'Là điểm điều phối tiến độ cho toàn hệ sinh thái.':
      '全エコシステムの進行管理のハブとして機能。',
    'Mạng lưới sản xuất liên kết': '連携生産ネットワーク',
    'Quy mô linh hoạt theo nhóm sản phẩm':
      '製品グループごとに柔軟な規模',
    'Mở rộng công suất theo mùa vụ và kế hoạch xuất khẩu.':
      '季節性や輸出計画に応じて生産能力を拡張。',
    'Chuyên môn hóa theo từng dòng sản phẩm hoặc công đoạn.':
      '製品ラインまたは工程ごとに専門化。',
    'Phối hợp cùng trung tâm sản xuất chủ lực để đảm bảo tiến độ giao hàng.':
      '中核生産ハブと連携し、納期を確実に維持。',
    'Dự án & case study': 'プロジェクト & ケーススタディ',
    'Tin tức & kiến thức sản xuất': 'ニュース & 製造知識',
    'Khám phá sản phẩm': '製品を見る',
    'Nhận tư vấn dự án': 'プロジェクト相談',
    'Tất cả': 'すべて',
    'Chi tiết sản phẩm': '製品詳細',
    'Chi tiết dự án': 'プロジェクト詳細',
    'Chi tiết tin tức': 'ニュース詳細',
    'Quay lại danh mục sản phẩm': '製品一覧へ戻る',
    'Quay lại danh sách dự án': 'プロジェクト一覧へ戻る',
    'Quay lại danh sách tin tức': 'ニュース一覧へ戻る',
    'Không tìm thấy trang': 'ページが見つかりません',
    'Quay lại trang chủ': 'ホームへ戻る',
    'LIÊN HỆ': 'お問い合わせ',
    'TIN TỨC': 'ニュース',
    'DỰ ÁN': 'プロジェクト',
    'DANH MỤC SẢN PHẨM': '製品カテゴリ',
    'SẢN XUẤT NỘI THẤT ANSLIFE': 'ANSLIFE家具製造',
    'Giải pháp sản xuất nội thất xuất khẩu theo tiêu chuẩn quốc tế.':
      '国際基準に準拠した輸出向け家具製造ソリューション。',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất đến kiểm soát chất lượng và giao hàng. Hạ tầng nhà máy linh hoạt cho OEM/ODM.':
      'ANSLIFEは原材料・生産・品質管理・出荷まで一貫したエコシステムを運営し、OEM/ODMに対応する柔軟な工場体制を備えています。',
    'Thông tin địa chỉ ANSLIFE': 'ANSLIFE所在地情報',
    'Văn phòng Hà Nội': 'ハノイオフィス',
    'Văn phòng TP.HCM': 'ホーチミン市オフィス',
    'Địa chỉ nhà máy': '工場所在地',
    'Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.':
      'ハノイ市タインスアン区タインスアントゥン坊クアットズイティエン通り12番地、Zen Tower 5階',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh':
      'ホーチミン市フーロイ坊ヒエップファット住宅地区D2通り15番地',
    'Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.':
      'ベトナム・ドンナイ省ロンビン坊第1街区第3組609番地',
    'Giao diện SPA + CMS WordPress': 'SPAインターフェース + WordPress CMS',
    'Giao diện Next.js + CMS WordPress':
      'Next.jsインターフェース + WordPress CMS',
    'Đội ngũ ANSLIFE sẵn sàng tiếp nhận yêu cầu báo giá, hỗ trợ kỹ thuật sản phẩm, đặt lịch làm việc và trao đổi kế hoạch hợp tác theo từng thị trường.':
      'ANSLIFEチームは、見積依頼の受付、製品の技術サポート、商談の予約、市場ごとの協業プランのご相談まで対応いたします。',
    'Phản hồi nhanh': '迅速な対応',
    'Ưu tiên phản hồi thông tin trong khung thời gian làm việc gần nhất.':
      '直近の営業時間内を優先して回答いたします。',
    'Hỗ trợ kỹ thuật': '技術サポート',
    'Tư vấn theo mã hàng, vật liệu, cấu trúc và tiêu chuẩn hoàn thiện.':
      '製品コード・素材・構造・仕上げ基準に基づきご相談を承ります。',
    'Hỗ trợ thương mại': '商務サポート',
    'Đồng bộ báo giá, điều kiện giao hàng và quy trình đơn hàng.':
      '見積・納品条件・発注プロセスを一貫して調整いたします。',
    'Làm việc đa kênh': 'マルチチャネル対応',
    'Hỗ trợ email, điện thoại và lịch hẹn trực tiếp.':
      'メール、電話、対面での打ち合わせに対応します。',
    'Giờ làm việc: Thứ 2 - Thứ 7, 08:00 - 17:30':
      '営業時間:月曜日 - 土曜日 08:00 - 17:30',
    'Hỗ trợ gặp trực tiếp theo lịch hẹn.':
      '事前予約による対面対応が可能です。',
    'Phù hợp cho trao đổi dự án và xác nhận mẫu.':
      'プロジェクト協議やサンプル確認に適しています。',
    'Nhà máy': '工場',
    'Đón tiếp tham quan nhà máy theo đăng ký trước.':
      '事前登録により工場見学をご案内いたします。',
    'Hỗ trợ khảo sát năng lực sản xuất theo từng nhóm sản phẩm.':
      '製品カテゴリーごとの生産能力調査に対応いたします。',
    'Hướng dẫn gửi yêu cầu nhanh': 'スムーズな依頼のためのご案内',
    'Để nhận phản hồi chính xác và nhanh hơn, bạn nên cung cấp rõ nhóm sản phẩm, thị trường mục tiêu, số lượng dự kiến và yêu cầu chất lượng ưu tiên.':
      'より正確で迅速な回答のため、製品カテゴリー、対象市場、想定数量、優先すべき品質要件を明確にお知らせください。',
    'Đính kèm bản vẽ hoặc ảnh tham chiếu nếu đã có.':
      '図面や参考画像があれば添付してください。',
    'Nêu rõ thời gian mong muốn nhận báo giá / triển khai.':
      '見積受領および着手を希望される時期をお知らせください。',
    'Cho biết điều kiện giao hàng dự kiến để tư vấn phù hợp.':
      '想定される納品条件をお知らせいただければ適切にご提案いたします。',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'ベトナムにおける家具の製造・供給・輸出システム。',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'ベトナムでの倉庫保管、出荷調整、パートナー標準ルーム。',
    'Tổng quan mô hình Supply Hub': 'Supply Hubモデル概要',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      '倉庫保管、混載、輸出調整、パートナー標準ルームのモデル概要。',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'ベトナムでの倉庫保管・バッファ在庫',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'ベトナムでの完成品保管、バッファ在庫、出荷計画サポート。',
    'Gom hàng LCL / FCL': 'LCL / FCL混載',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'LCL、FCL、複数供給元の貨物を統合し、輸出を最適化します。',
    'Điều phối xuất hàng định kỳ': '定期出荷調整',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'バイヤー計画、市場、供給能力に応じて定期出荷スケジュールを組みます。',
    'Lưu kho vật liệu & cấu kiện': '材料・部材保管',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      '材料、部材、半製品を保管し、生産と長期供給を支援します。',
    'Hỗ trợ chứng từ xuất khẩu': '輸出書類サポート',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      '輸出に必要な出荷記録、貨物情報、書類をサポートします。',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      '承認サンプル、部材、図面、材料資料、梱包基準、QCチェックリストを管理します。',
  },
  kr: {
    'Trang chủ': '홈',
    'Art objects': '미술품',
    'Bàn - Tủ trang điểm': '테이블 - 옷장',
    'Bàn Cafe - Bàn trà': '커피 테이블 - 티 테이블',
    'Bàn Console - Kệ Console': '콘솔 테이블 - 콘솔 선반',
    'Bàn học - Bàn làm việc': '공부용 책상 - 업무용 책상',
    'Bàn Lamp - Bàn góc': '램프 테이블 - 코너 테이블',
    'Bàn mây': '등나무 테이블',
    'Bàn ngoài trời': '야외 테이블',
    'Bình hoa - Lọ hoa': '꽃병 - 꽃의 꽃병',
    'Bản đồ': '지도',
    'Bộ bàn ghế ngoài trời': '야외 가구 세트',
    'Bộ bàn ăn': '식탁 세트',
    'Bộ chăn ga gối': '침구 세트',
    'Chứng chỉ trong hệ sinh thái': '생태계에서의 인증',
    'Custom Design': '맞춤형 디자인',
    'Công nghệ gia công': '가공기술',
    'Decor & Thủ công mỹ nghệ': '장식 및 공예',
    'Decor mây tre': '대나무와 등나무 장식',
    'Dụng cụ nhà bếp': '주방용품',
    'English': '영어',
    'Facebook': 'Facebook',
    'Form đăng ký nhà máy': '공장등록양식',
    'Ghế Bar - Ghế đôn': '바 의자 - 스툴',
    'Ghế Bench': '벤치의자',
    'Ghế học - Ghế làm việc': '학습 의자 - 작업 의자',
    'Ghế mây': '등나무 의자',
    'Ghế ngoài trời': '야외 의자',
    'Gia công': '가공',
    'Giường': '침대',
    'Giường 2m2': '침대 2m2',
    'Giường King': '킹사이즈 침대',
    'Giường Queen': '퀸사이즈 침대',
    'Giường tầng': '이층침대',
    'Giường đơn - Cũi': '싱글침대 - 유아용 침대',
    'Giỏ mây': '등나무 바구니',
    'Giỏ trang trí - Hộp trang trí': '장식바구니 - 장식상자',
    'Giới thiệu chương trình đối tác': '파트너 프로그램 소개',
    'Giới thiệu về Anslife': 'ANSLIFE 소개',
    'Gương trang trí': '장식용 거울',
    'Hoa giả- cây giả': '조화 - 가짜 식물',
    'Hoa Kỳ – Văn phòng đại diện': '미국 – 대표 사무소',
    'Hậu cần': '기호 논리학',
    'Hệ sinh thái Anslife': 'ANSLIFE 생태계',
    'Hệ thống cung ứng': '공급 시스템',
    'Instagram': 'Instagram',
    'Khay gỗ': '나무 트레이',
    'Khay mây': '등나무 트레이',
    'Không gian ngoài trời': '야외 공간',
    'Khăn trải bàn - Tấm lót trang trí': '식탁보 - 장식용 플레이스매트',
    'Khảm trai': '진주 모자이크',
    'Kitchenware gỗ': '목재 주방용품',
    'Kiểm soát nguyên liệu': '원료 관리',
    'Lắp ráp': '모으다',
    'Lịch sử phát triển': '개발 이력',
    'MDF / PB / ván công nghiệp': 'MDF/PB/산업용보드',
    'Muỗng gỗ': '나무 숟가락',
    'Máy móc sản xuất': '생산 기계',
    'Mây tre đan': '대나무와 등나무',
    'Mô hình vận hành hệ sinh thái': '생태계 운영 모델',
    'Nguồn cung gỗ': '목재 공급',
    'Nhà máy ANSLIFE': 'ANSLIFE 공장',
    'Nhà máy vệ tinh': '위성공장',
    'Nhật Bản – Văn phòng đại diện': '일본 – 대표 사무소',
    'Nến - Tinh dầu thơm': '양초 - 향수 에센셜 오일',
    'ODM': 'ODM',
    'OEM': 'OEM',
    'Pha lê cao cấp Bohemia': '고품질 보헤미아 크리스탈',
    'Phát triển mẫu': '샘플 개발',
    'Phát triển nguồn nhân lực': '인재육성',
    'Phụ kiện trang trí': '장식용 액세서리',
    'Phụng sự xã hội': '사회에 봉사하다',
    'Plywood': '합판',
    'Quy mô hệ sinh thái': '생태계 규모',
    'Quy trình xử lý lỗi': '오류 처리 프로세스',
    'Quy trình đánh giá': '평가과정',
    'Singapore – Văn phòng đại diện': '싱가포르 – 대표 사무소',
    'Sofa - Ghế thư giãn': '소파 - 휴식의자',
    'Sofa 2 chỗ': '2인용 소파',
    'Sofa 3 chỗ': '3인용 소파',
    'Sofa bed': '소파베드',
    'Sofa da bò': '소가죽 소파',
    'Sofa góc - Sofa bộ': '코너 소파 - 소파 세트',
    'Sofa thư giãn Recliner': '리클라이너 편안한 소파',
    'Sofa đơn': '싱글 소파',
    'Sơn hoàn thiện': '완성된 페인트',
    'Sơn mài': '래커',
    'Sản phẩm mây tre theo thiết kế': '디자인에 따른 대나무, 등나무 제품',
    'Sản phẩm ngoài trời khác': '기타 아웃도어 제품',
    'Sản xuất theo yêu cầu': '요청에 따라 제조됨',
    'Thiết bị & công nghệ': '장비 및 기술',
    'Thảm': '양탄자',
    'Thớt gỗ': '나무 도마',
    'TikTok': 'TikTok',
    'Tiêu chuẩn sản xuất': '생산 표준',
    'Tiếng Anh': '영어',
    'Tiếng Hàn': '한국어',
    'Tiếng Nhật': '일본어',
    'Tiếng Việt': '베트남어',
    'Trang trí gỗ': '목재 장식',
    'Tranh': '그림',
    'Triết lý': '철학',
    'Triết lý vận hành': '운영 철학',
    'Tầm nhìn, sứ mệnh': '비전, 미션',
    'Tủ - Kệ': '캐비닛 - 선반',
    'Tủ - Kệ giầy': '수납장 - 신발장',
    'Tủ kính - Tủ trưng bầy - Tủ sách': '유리장 - 디스플레이 캐비닛 - 책장',
    'Tủ ngăn kéo - Tủ trang trí nhỏ': '서랍장 - 작은 장식 캐비닛',
    'Tủ nhà tắm - Lavabo': '욕실 캐비닛 - Lavabo',
    'Tủ Sideboard - Tủ Buffet': '찬장 캐비닛 - 뷔페 캐비닛',
    'Tủ Tivi - Kệ Tivi': 'TV 캐비닛 - TV 선반',
    'Vật liệu công nghiệp': '산업자재',
    'Vật liệu liên quan': '관련자료',
    'Vỏ gối trang trí': '장식용 베갯잇',
    'YouTube': 'YouTube',
    'Điều kiện tham gia': '참가조건',
    'Đèn': '램프',
    'Đóng gói': '팩',
    'Đôn - Ottoman': '돈 - 오스만',
    'Đăng ký đối tác sản xuất': '생산 파트너로 등록',
    'Đệm': '쿠션',
    'Đồ cho bé': '아기용품',
    'Đồ gia dụng': '가전제품',
    'Đồ gia dụng - Đồ nhà bếp': '가전제품 - 주방용품',
    'Đồ trang trí': '장식물',
    'Đồ trang trí Giáng Sinh': '크리스마스 장식',
    'Ưu đãi độc quyền': '독점 제안',
    '日本語': '일본어',
    '한국어': '한국어',
    'Website ANSLIFE V1: hệ sinh thái sản xuất, chất lượng và năng lực toàn cầu.':
      'ANSLIFE V1 웹사이트: 생산 생태계, 품질, 글로벌 역량.',
    'Chào buổi sáng': '좋은 아침입니다',
    'Chào buổi chiều': '좋은 오후입니다',
    'Chào buổi tối': '좋은 저녁입니다',
    'Không gian ban ngày': '주간 장면',
    'Không gian hoàng hôn': '노을 장면',
    'Không gian ban đêm': '야간 장면',
    'Quý khách đang tìm kiếm gì hôm nay?': '오늘 무엇을 찾고 계신가요?',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất, QC tới giao hàng theo tiêu chuẩn quốc tế.':
      'ANSLIFE는 원자재, 생산, QC, 납품까지 국제 기준에 맞춘 생태계를 운영합니다.',
    'Truy cập nhanh': '빠른 이동',
    'Tin nổi bật': '주요 뉴스',
    'Đăng ký trực tuyến': '온라인 등록',
    'Sản phẩm nổi bật': '주요 제품',
    'Dự án khách sạn': '호텔 프로젝트',
    'Nội thất gỗ': '원목 가구',
    'Báo giá nhanh': '빠른 견적',
    'Gia công theo yêu cầu': '맞춤 생산',
    'Báo giá & làm việc': '견적 및 상담',
    'Các dự án nội thất thực tế cho thị trường trong nước và quốc tế.':
      '국내외 시장을 위한 실제 인테리어 프로젝트.',
    'Các nhóm giải pháp của ANSLIFE': 'ANSLIFE 솔루션 그룹',
    'Nội thất xuất khẩu, bộ sưu tập theo chất liệu và phong cách.':
      '수출용 가구 컬렉션(소재별/스타일별).',
    'OEM/ODM, phát triển mẫu và vận hành sản xuất linh hoạt.':
      'OEM/ODM, 샘플 개발, 유연한 생산 운영.',
    'Gửi yêu cầu báo giá, đặt lịch trao đổi với đội ngũ ANSLIFE.':
      '견적 요청을 보내고 ANSLIFE 팀과 상담 일정을 예약하세요.',
    'Từ khóa gần đây': '최근 키워드',
    'Không tìm thấy nhóm phù hợp. Hãy thử từ khóa khác.':
      '일치하는 그룹을 찾지 못했습니다. 다른 키워드를 시도해 주세요.',
    'Về ANSLIFE': 'ANSLIFE 소개',
    'Về Anslife': 'ANSLIFE 소개',
    'VỀ ANSLIFE': 'ANSLIFE 소개',
    'Giới thiệu ANSLIFE': 'ANSLIFE 소개',
    'Giới thiệu về công ty': '회사 소개',
    'Giới thiệu triết lý': '철학 소개',
    'Cá nhân': '개인',
    'Tổ chức': '조직',
    'Đối tác đặc biệt': '특별 파트너',
    'Hệ sinh thái sản xuất': '생산 생태계',
    'Năng lực sản xuất': '제조 역량',
    'Quy mô hệ sinh thái sản xuất': '생산 생태계 규모',
    'Công suất sản xuất': '생산 용량',
    'Năng lực phát triển sản phẩm': '제품 개발 역량',
    'Khả năng xử lý đơn hàng': '주문 처리 역량',
    'Sản xuất theo yêu cầu (OEM / ODM)': '맞춤 생산 (OEM / ODM)',
    'Thị trường xuất khẩu': '수출 시장',
    'Kiểm soát chất lượng': '품질 관리',
    'Hệ thống kiểm soát chất lượng': '품질 관리 시스템',
    'Sản phẩm': '제품',
    'Sản phẩm & Giải pháp': '제품 및 솔루션',
    'Nội thất hoàn thiện': '완제품 가구',
    'Linh kiện nội thất': '가구 부품',
    'Chân gỗ': '목재 다리',
    'Bộ phận bọc nệm': '업홀스터리 부품',
    'Linh kiện mây': '라탄 부품',
    'Ván ép & ván công nghiệp': '합판 및 보드',
    'Nguyên liệu gỗ': '목재 원자재',
    'Vật liệu mút & bọc': '폼 및 업홀스터리 소재',
    'Vật liệu mây tre': '라탄 및 대나무 소재',
    'Vải / da / vật liệu bọc': '패브릭 / 가죽 / 업홀스터리',
    'Vật liệu đóng gói': '포장 자재',
    'Foam / Mút / Xốp': '폼 / 스펀지',
    'Phát triển OEM/ODM': 'OEM/ODM 개발',
    'Giải pháp dịch vụ': '서비스 솔루션',
    'Giải pháp vận hành & cung ứng': '운영 및 공급 솔루션',
    'Phát triển sản phẩm OEM / ODM': 'OEM / ODM 제품 개발',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      '도면, 실물 샘플 또는 제품 아이디어부터 샘플 개발과 베트남 대량 생산까지.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      '국제 바이어를 위한 운영, 공급, 보관, QC, 포장 및 수출 통합 솔루션.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE는 타당성 평가, 제품 개발, 공장 평가, 품질 관리, 물류, 보관부터 무역 금융과 출하까지 국제 바이어의 베트남 프로젝트 운영을 지원합니다.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu': '물류 및 글로벌 공급망 일러스트',
    '1. Phát triển sản phẩm OEM / ODM': '1. OEM / ODM 제품 개발',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      '도면, 실물 샘플 또는 제품 아이디어에서 샘플 개발과 대량 생산까지 지원합니다.',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. 프로젝트 및 공급망 타당성 평가',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      '제품, 소재, 공장, 생산량, 일정, 비용 및 베트남 공급망 적합성을 평가합니다.',
    '3. Thẩm định năng lực nhà máy': '3. 공장 역량 평가',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      '제품, 소재, 생산량, 품질 기준 및 납기 일정에 따라 공장 역량을 평가합니다.',
    '4. Vận hành & quản lý dự án xuất khẩu': '4. 수출 프로젝트 운영 및 관리',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      '진행 상황 추적, 정보 조율, 생산 관리, 이슈 대응 및 프로젝트 보고를 수행합니다.',
    '5. QC độc lập trong dự án': '5. 프로젝트 독립 QC',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      '공장과 독립적으로 바이어 기준 및 각 시장 요구사항에 맞춰 품질을 관리합니다.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. 프로젝트 물류 및 수출입 조율',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      '자재, 부품, 원자재 수입과 화물 통합, 보관, 문서 및 국제 출하를 지원합니다.',
    '7. Lưu kho tại Việt Nam': '7. 베트남 보관',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      '상품, 소재, 구성품, 승인 샘플, 포장 기준 및 예비 재고를 베트남에서 보관합니다.',
    '8. Tài trợ thương mại': '8. 무역 금융',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      '주문, 자재, 생산, QC 및 출하와 연결된 바이어 및 외주 공장 대상의 관리형 무역 금융을 제공합니다.',
    'Hành trình của một dự án tại ANSLIFE': 'ANSLIFE 프로젝트 진행 과정',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      '아이디어 단계부터 상품이 고객에게 도착할 때까지 프로젝트 전 과정을 바이어와 함께합니다.',
    'Ý tưởng & yêu cầu': '아이디어 및 요구사항',
    'Đánh giá khả thi dự án & chuỗi cung ứng': '프로젝트 및 공급망 타당성 평가',
    'Đánh giá khả thi': '타당성 평가',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      '제품, 소재, 비용 및 일정을 검토합니다.',
    'Phát triển sản phẩm OEM / ODM.': 'OEM / ODM 제품 개발.',
    'Thẩm định nhà máy': '공장 평가',
    'Thẩm định năng lực nhà máy.': '공장 역량 평가.',
    'Vận hành dự án': '프로젝트 운영',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.': '수출 프로젝트 운영 및 무역 금융.',
    'QC độc lập trong dự án.': '프로젝트 독립 QC.',
    'Logistics & xuất nhập khẩu': '물류 및 수출입',
    'Điều phối logistics & xuất nhập khẩu dự án.': '프로젝트 물류 및 수출입 조율.',
    'Lưu kho & hỗ trợ': '보관 및 지원',
    'Lưu kho tại Việt Nam và tài trợ thương mại.': '베트남 보관 및 무역 금융.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      '바이어가 ANSLIFE의 운영 및 공급 솔루션을 선택하는 이유',
    'Một đầu mối - toàn bộ giải pháp': '단일 창구 - 전체 솔루션',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      '제품 개발부터 출하까지 하나의 생태계 안에서 지원합니다.',
    'Độc lập - khách quan - minh bạch': '독립성 - 객관성 - 투명성',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      '바이어의 이익을 대변하며 품질과 리스크를 독립적으로 관리합니다.',
    'Hiểu thị trường quốc tế': '국제 시장 이해',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      '주요 시장의 기준, 규정 및 관행을 이해합니다.',
    'Tối ưu chi phí & hiệu quả': '비용 및 효율 최적화',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      '공급망을 최적화하고 비용을 줄이며 프로젝트 기간을 단축합니다.',
    'Đồng hành dài hạn': '장기 파트너십',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      '바이어와 함께 지속 가능한 성장을 이루는 장기 협력을 지향합니다.',
    'Sẵn sàng bắt đầu dự án của bạn?': '프로젝트를 시작할 준비가 되셨나요?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      '오늘 요청을 보내주시면 ANSLIFE 팀이 최대한 빠르게 답변드리겠습니다.',
    'Gửi yêu cầu': '문의 보내기',
    'Tải tài liệu / bản vẽ lên': '자료 / 도면 업로드',
    'QC & Kiểm định': 'QC 및 검사',
    'Giải pháp lưu kho tại Việt Nam': '베트남 보관 솔루션',
    'Gom hàng xuất khẩu': '수출 화물 통합',
    'Nguyên liệu': '원자재',
    'Gỗ kỹ thuật': '엔지니어드 우드',
    'Vật liệu tự nhiên': '천연 소재',
    Mây: '라탄',
    Tre: '대나무',
    'Mặt đan mây': '케인 위빙',
    'Vật liệu bọc nệm': '업홀스터리 소재',
    Vải: '패브릭',
    'Da / PU': '가죽 / PU',
    'Vật liệu đệm': '쿠션 소재',
    'Hoàn thiện bề mặt': '마감',
    'Hoàn thiện tự nhiên': '내추럴 마감',
    'Hoàn thiện dầu': '오일 마감',
    'Hoàn thiện sơn màu': '도장 마감',
    'Hoàn thiện mờ': '무광 마감',
    'Thùng carton': '카톤',
    'Foam bảo vệ': '폼 보호재',
    'Bảo vệ cạnh': '모서리 보호재',
    'Nhà cung ứng vật liệu nội thất Việt Nam': '베트남 가구 자재 공급업체',
    'Nhà cung ứng plywood Việt Nam': '베트남 합판 공급업체',
    'Vật liệu gỗ cho sản xuất nội thất': '가구 생산용 목재 자재',
    'Foam & vật liệu bọc nệm Việt Nam': '베트남 폼 및 업홀스터리 소재',
    'Vật liệu đóng gói nội thất xuất khẩu': '수출 가구 포장 자재',
    'Nhà sản xuất nội thất Việt Nam': '베트남 가구 제조업체',
    'Nhà sản xuất nội thất gỗ Việt Nam': '베트남 목재 가구 제조업체',
    'Nhà sản xuất nội thất OEM / ODM tại Việt Nam': '베트남 OEM ODM 가구 제조업체',
    'Đối tác sản xuất nội thất Việt Nam': '베트남 가구 생산 파트너',
    'Supply Hub Việt Nam cho buyer Nhật Bản': '일본 바이어를 위한 베트남 공급 허브',
    'Giải pháp lưu kho Việt Nam cho nhà nhập khẩu': '수입업체를 위한 베트남 보관 솔루션',
    'Xuất hàng hằng tuần từ Việt Nam sang Nhật Bản': '베트남에서 일본으로 주간 선적',
    'Dịch vụ gom hàng xuất khẩu Việt Nam': '베트남 수출 통합 서비스',
    'Phòng tiêu chuẩn buyer': '바이어 표준룸',
    'Checklist QC nội thất': '가구 QC 체크리스트',
    'Tiêu chuẩn đóng gói xuất khẩu': '수출 포장 표준',
    'Trung tâm cung ứng': '공급 허브',
    'Quy trình thương mại': '상거래 프로세스',
    'QUY TRÌNH THƯƠNG MẠI': '상거래 프로세스',
    'Quy trình hợp tác': '협업 프로세스',
    'Quy trình đặt hàng': '주문 프로세스',
    'Quy trình phát triển mẫu': '샘플 개발 프로세스',
    'Điều kiện giao hàng (Incoterms)': '배송 조건(Incoterms)',
    'Phương thức thanh toán': '결제 방식',
    'Thời gian sản xuất': '생산 리드타임',
    Logistics: '물류',
    'Dự án': '프로젝트',
    'DỰ ÁN & CASE STUDY': '프로젝트 & 케이스 스터디',
    'HỆ THỐNG TOÀN CẦU': '글로벌 네트워크',
    'PHỤNG SỰ XÃ HỘI': '사회 공헌',
    'Mạng lưới': '네트워크',
    'Tuyển dụng': '채용',
    'Hình ảnh container': '컨테이너 이미지',
    'Báo cáo & tác động': '보고서 및 임팩트',
    'Dự án & Case Study': '프로젝트 & 케이스 스터디',
    'Hệ thống toàn cầu': '글로벌 네트워크',
    'Quỹ học bổng': '장학 재단',
    'Quỹ học bổng & cộng đồng': '장학 재단 및 커뮤니티',
    'Phụng Sự Xã Hội': '사회 공헌',
    'Câu hỏi thường gặp': '자주 묻는 질문',
    'Tin tức': '뉴스',
    'Liên hệ': '문의',
    'Báo giá': '견적',
    'Liên hệ nhanh': '빠른 문의',
    'Liên kết nhanh': '빠른 링크',
    'Đăng nhập': '로그인',
    'Quản trị': '관리',
    Menu: '메뉴',
    'Mở menu': '메뉴 열기',
    'Đóng menu': '메뉴 닫기',
    'Đóng': '닫기',
    'Nhóm khách hàng': '고객 그룹',
    'Bạn đang truy cập': '현재 접속 대상',
    'Danh mục điều hướng': '탐색 카테고리',
    'Mục nổi bật': '추천 항목',
    'Mục này đang được cập nhật.': '이 섹션은 현재 업데이트 중입니다.',
    'Ngôn ngữ đã hỗ trợ': '지원 언어',
    'Tất cả ngôn ngữ khác (sẽ hỗ trợ sau)':
      '기타 모든 언어(추후 지원)',
    'Mạng xã hội': '소셜',
    'Kết nối ANSLIFE': 'ANSLIFE 연결',
    'Theo dõi ANSLIFE': 'ANSLIFE 팔로우',
    'Tìm kiếm': '검색',
    'Trang kết quả tìm kiếm theo từ khóa trên hệ sinh thái ANSLIFE.':
      'ANSLIFE 생태계 전반의 키워드 검색 결과 페이지입니다.',
    'Nhập từ khóa để tìm sản phẩm, dự án, tin tức và các trang thông tin liên quan.':
      '키워드를 입력해 제품, 프로젝트, 뉴스 및 관련 정보 페이지를 검색하세요.',
    'Đóng tìm kiếm': '검색 닫기',
    'Tìm sản phẩm, vật liệu, dịch vụ cung ứng...':
      '제품, 소재, 공급 솔루션 검색...',
    'Từ khóa tìm kiếm': '검색 키워드',
    'Từ khóa': '키워드',
    'Kết quả': '결과',
    'Kết quả tìm kiếm': '검색 결과',
    'Gợi ý dữ liệu mới nhất': '최신 추천',
    'Vui lòng nhập từ khóa để bắt đầu tìm kiếm.':
      '검색을 시작하려면 키워드를 입력하세요.',
    'Đang tải dữ liệu tìm kiếm...': '검색 데이터를 불러오는 중...',
    'Không tìm thấy kết quả phù hợp.': '일치하는 결과가 없습니다.',
    'Không tìm thấy kết quả phù hợp. Bạn có thể thử từ khóa khác.':
      '일치하는 결과가 없습니다. 다른 키워드를 시도해 보세요.',
    'Điều hướng website': '웹사이트 내비게이션',
    'Điều hướng': '내비게이션',
    'Trang thông tin': '정보 페이지',
    'Giới thiệu công ty': '회사 소개',
    'Tổng quan công ty': '회사 개요',
    'Tầm nhìn - Sứ mệnh': '비전 - 미션',
    'Tầm nhìn & Sứ mệnh': '비전 및 미션',
    'Giá trị cốt lõi': '핵심 가치',
    'Triết lý sản xuất': '생산 철학',
    'Cơ cấu tổ chức': '조직 구조',
    'Đội ngũ': '팀',
    'Hệ sinh thái ANSLIFE': 'ANSLIFE 생태계',
    'Hệ thống sản xuất': '생산 시스템',
    'Mạng lưới nhà máy': '공장 네트워크',
    'Vùng nguyên liệu': '원자재 구역',
    'Nguyên liệu & Chuỗi cung ứng': '원자재 및 공급망',
    'Quy trình sản xuất': '제조 공정',
    'Phát triển sản phẩm': '제품 개발',
    'QC & Đóng gói': 'QC 및 포장',
    'Tiêu chuẩn & QC': '표준 및 QC',
    'Tiêu chuẩn & chứng chỉ': '표준 및 인증',
    'Triết lý QC': 'QC 철학',
    'Hệ thống QC': 'QC 시스템',
    'Kiểm tra nguyên liệu': '원자재 검사',
    'Kiểm tra trong sản xuất': '공정 중 검사',
    'Kiểm tra trước xuất hàng': '출하 전 검사',
    'Case cải tiến chất lượng': '품질 개선 사례',
    'Ghế': '의자',
    'Ghế ăn': '다이닝 체어',
    'Ghế lounge': '라운지 체어',
    'Ghế bar': '바 체어',
    'Bàn': '테이블',
    'Bàn ăn': '다이닝 테이블',
    'Bàn cà phê': '커피 테이블',
    'Bàn phụ': '사이드 테이블',
    'Tủ / Kệ': '캐비닛 / 선반',
    'Tủ / kệ': '캐비닛 / 선반',
    'Tủ quần áo': '옷장',
    'Kệ trang trí': '디스플레이 선반',
    'Tủ lưu trữ': '수납 캐비닛',
    'Bộ phòng ngủ': '침실 세트',
    'Giường ngủ': '침대',
    'Tủ đầu giường': '협탁',
    'Bàn trang điểm': '화장대',
    'Bộ phòng ngủ hoàn chỉnh': '완성형 침실 세트',
    'Sản phẩm theo thiết kế': '맞춤 설계 제품',
    'Dịch vụ OEM/ODM': 'OEM/ODM 서비스',
    'Dịch vụ OEM': 'OEM 서비스',
    'Dịch vụ ODM': 'ODM 서비스',
    'Thiết kế theo yêu cầu': '맞춤 디자인',
    'OEM / ODM': 'OEM / ODM',
    'Thanh toán': '결제',
    'Trung tâm cung ứng Việt Nam': '베트남 공급 허브',
    'Lưu kho tại Việt Nam': '베트남 내 보관',
    'Phòng mẫu chuẩn đối tác': '파트너 표준룸',
    'Quản lý mẫu & tiêu chuẩn': '샘플 및 표준 관리',
    'Điều phối xuất hàng hằng tuần': '주간 선적 조율',
    'QC trước xuất hàng': '출하 전 QC',
    'Đóng gói xuất khẩu': '수출 포장',
    'Gom container / LCL': '컨테이너 / LCL 통합',
    'Hỗ trợ chứng từ': '서류 지원',
    'Trách nhiệm xã hội': '사회적 책임',
    'Chúng tôi làm gì': '우리가 하는 일',
    'Dự án xuất khẩu': '수출 프로젝트',
    'Case sản xuất': '생산 사례',
    'Case cải tiến': '개선 사례',
    'Hình ảnh giao hàng': '배송 이미지',
    'Việt Nam - Trụ sở': '베트남 - 본사',
    'Việt Nam – Trụ sở': '베트남 - 본사',
    'Singapore – Văn phòng': '싱가포르 - 오피스',
    'Singapore - Văn phòng đại diện': '싱가포르 - 대표 사무소',
    'Nhật Bản – Văn phòng': '일본 - 오피스',
    'Nhật Bản - Văn phòng đại diện': '일본 - 대표 사무소',
    'Hoa Kỳ – Văn phòng': '미국 - 오피스',
    'Hoa Kỳ - Văn phòng đại diện': '미국 - 대표 사무소',
    'Đối tác quốc tế': '국제 파트너',
    'Chính sách bảo mật': '개인정보 처리방침',
    'Điều khoản sử dụng': '이용 약관',
    'Liên kết chân trang': '푸터 링크',
    'Nhà sản xuất và xuất khẩu nội thất gỗ uy tín cho các thương hiệu toàn cầu.':
      '글로벌 브랜드를 위한 신뢰할 수 있는 원목 가구 제조 및 수출 파트너입니다.',
    'Mọi quyền được bảo lưu.': '모든 권리 보유.',
    'Giới thiệu quỹ': '재단 소개',
    'Chương trình học bổng': '장학 프로그램',
    'Hoạt động cộng đồng': '커뮤니티 활동',
    'Tin tức công ty': '회사 소식',
    'Dự án & hợp tác': '프로젝트 및 협력',
    'Nhà máy & sản xuất': '공장 및 생산',
    'Triển lãm & sự kiện': '전시회 및 이벤트',
    'Chất lượng & chứng nhận': '품질 및 인증',
    'Tham gia cùng ANSLIFE': 'ANSLIFE와 함께하기',
    'Tin doanh nghiệp': '기업 뉴스',
    'Tin nhà máy': '공장 뉴스',
    'Kiến thức sản xuất': '생산 지식',
    'Kiến thức QC': 'QC 지식',
    'Kiến thức xuất khẩu': '수출 지식',
    'Thông tin công ty': '회사 정보',
    'Thông tin công ty ANSLIFE, form báo giá và đặt lịch làm việc.':
      'ANSLIFE 회사 정보, 견적 요청 양식 및 미팅 예약.',
    'ANSLIFE là đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam cho buyer quốc tế trong ngành nội thất, cấu kiện và vật liệu. Chúng tôi có văn phòng đại diện tại Hà Nội, TP. Hồ Chí Minh, Tokyo, Singapore và Hong Kong.':
      'ANSLIFE는 가구, 부품, 소재 분야의 해외 바이어를 위한 베트남 내 생산, 공급망, 수출 파트너입니다. 하노이, 호치민시, 도쿄, 싱가포르, 홍콩에 대표 사무소를 두고 있습니다.',
    'Tên công ty': '회사명',
    'Vai trò': '역할',
    'Đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam':
      '베트남 내 생산, 공급망 및 수출 파트너',
    'Lĩnh vực hoạt động': '사업 분야',
    'Sản xuất nội thất, cấu kiện, chuỗi cung ứng vật liệu, lưu kho, QC độc lập, vận hành dự án, tài trợ thương mại, đóng gói và xuất hàng':
      '가구 생산, 부품, 소재 공급망, 보관, 독립 QC, 프로젝트 운영, 무역 금융, 포장 및 출하',
    'Thị trường phục vụ': '서비스 시장',
    'Nhật Bản, Hoa Kỳ, EU và buyer quốc tế':
      '일본, 미국, EU 및 해외 바이어',
    'Văn phòng trong nước': '베트남 국내 사무소',
    'Hà Nội, TP. Hồ Chí Minh': '하노이, 호치민시',
    'Văn phòng quốc tế': '해외 사무소',
    'Ngôn ngữ hỗ trợ': '지원 언어',
    'Tiếng Anh, Tiếng Nhật, Tiếng Việt, Tiếng Hàn':
      '영어, 일본어, 베트남어, 한국어',
    'Buyer có thể liên hệ ANSLIFE để gửi yêu cầu sản phẩm, bản vẽ, mẫu, vật liệu hoặc kế hoạch lưu kho – xuất hàng từ Việt Nam.':
      '바이어는 ANSLIFE에 연락해 제품 요구사항, 도면, 샘플, 소재 또는 베트남발 보관 및 출하 계획을 보낼 수 있습니다.',
    'Văn phòng & liên hệ': '사무소 및 연락처',
    'ANSLIFE có hệ thống văn phòng đại diện tại Việt Nam, Nhật Bản, Singapore và Hong Kong nhằm hỗ trợ buyer quốc tế trong quá trình trao đổi yêu cầu, quản lý dự án, kiểm soát tiêu chuẩn và tổ chức chuỗi cung ứng từ Việt Nam.':
      'ANSLIFE는 베트남, 일본, 싱가포르, 홍콩에 대표 사무소를 운영하며 해외 바이어의 요구사항 협의, 프로젝트 관리, 기준 관리, 베트남발 공급망 구축을 지원합니다.',
    'Văn phòng đại diện': '대표 사무소',
    'Địa chỉ': '주소',
    'Địa chỉ đang cập nhật': '주소 업데이트 중',
    'VIỆT NAM': '베트남',
    'Tiêu chuẩn làm việc của ANSLIFE': 'ANSLIFE 업무 기준',
    'ANSLIFE làm việc dựa trên nguyên tắc rõ ràng, có thể kiểm soát và có thể truy xuất. Mỗi dự án được quản lý dựa trên mẫu đã duyệt, bản vẽ kỹ thuật, tiêu chuẩn vật liệu, checklist kiểm hàng, tiêu chuẩn đóng gói và kế hoạch giao hàng đã thống nhất.':
      'ANSLIFE는 명확하고 관리 가능하며 추적 가능한 기준에 따라 업무를 수행합니다. 각 프로젝트는 승인 샘플, 기술 도면, 자재 기준, 검사 체크리스트, 포장 기준, 합의된 출하 계획을 바탕으로 관리됩니다.',
    'Kiểm soát mẫu đã duyệt': '승인 샘플 관리',
    'Mẫu sản phẩm, cấu kiện, màu sắc, vật liệu và bề mặt hoàn thiện được lưu giữ làm tiêu chuẩn đối chiếu trong quá trình sản xuất và kiểm hàng.':
      '승인된 제품 샘플, 부품, 색상, 자재 및 마감 표면은 생산과 검사 과정의 기준 샘플로 보관됩니다.',
    'Quản lý bản vẽ kỹ thuật': '기술 도면 관리',
    'Bản vẽ, kích thước, kết cấu, thông số vật liệu và yêu cầu kỹ thuật được ghi nhận rõ ràng trước khi triển khai sản xuất.':
      '도면, 치수, 구조, 자재 사양 및 기술 요구사항은 생산 시작 전에 명확히 기록됩니다.',
    'Quản lý vật liệu & màu sắc': '자재 및 색상 관리',
    'Vật liệu, mẫu sơn, bảng màu, veneer, plywood, foam, vải, phụ kiện và vật liệu đóng gói được kiểm soát theo tiêu chuẩn của từng buyer và từng thị trường.':
      '자재, 도장 샘플, 컬러 패널, 베니어, 합판, 폼, 원단, 부자재 및 포장재는 각 바이어와 시장 기준에 따라 관리됩니다.',
    'Checklist kiểm hàng': '검사 체크리스트',
    'Mỗi đơn hàng có checklist kiểm tra riêng, bao gồm kích thước, kết cấu, độ hoàn thiện, màu sắc, độ ẩm, đóng gói, nhãn mác và tình trạng hàng trước khi xuất.':
      '각 주문은 치수, 구조, 마감, 색상, 함수율, 포장, 라벨, 출하 전 상태를 포함한 전용 검사 체크리스트를 따릅니다.',
    'QC độc lập': '독립 QC',
    'Hệ thống QC của ANSLIFE hoạt động độc lập với bộ máy sản xuất, nhằm đảm bảo việc kiểm tra được thực hiện khách quan theo tiêu chuẩn đã thống nhất.':
      'ANSLIFE의 QC 시스템은 생산 조직과 독립적으로 운영되어 합의된 기준에 따라 객관적인 검사가 이루어지도록 합니다.',
    'Tiêu chuẩn đóng gói': '포장 및 출하 기준',
    'Quy cách đóng gói, carton mark, nhãn hàng, mã sản phẩm, pallet, container loading hoặc LCL/FCL shipment được kiểm soát theo yêu cầu của từng buyer.':
      '포장 방식, 카톤 마크, 라벨, 품목 코드, 팔레트, 컨테이너 적재 및 LCL/FCL 출하 요구사항은 각 바이어 기준에 따라 관리됩니다.',
    'Báo cáo minh bạch': '투명한 보고',
    'Các vấn đề phát sinh trong sản xuất, kiểm hàng hoặc xuất hàng được ghi nhận, báo cáo và trao đổi rõ ràng để có phương án xử lý kịp thời.':
      '생산, 검사 또는 출하 중 발생한 문제는 기록, 보고, 명확히 공유되어 적시에 시정 조치를 취할 수 있도록 합니다.',
    'Gửi yêu cầu báo giá': '견적 요청',
    'Đặt lịch làm việc': '미팅 예약',
    'Họ tên': '이름',
    'Số điện thoại': '전화번호',
    'Nội dung': '메시지',
    'Đang gửi...': '전송 중...',
    'Đặt lịch': '예약하기',
    'Chọn ngày của bạn': '날짜를 선택하세요',
    'Chọn ngày làm việc': '미팅 날짜 선택',
    'Tháng tiếp theo': '다음 달',
    'Ngày đã chọn': '선택한 날짜',
    'Chưa chọn ngày': '날짜를 선택하지 않음',
    'Bản đồ ANSLIFE': 'ANSLIFE 지도',
    'Trang này tập trung vào điều hướng vị trí. Bạn có thể mở trực tiếp từng địa điểm trên Google Maps để lấy chỉ đường nhanh.':
      '이 페이지는 위치 안내에 집중되어 있습니다. 각 지점을 Google 지도에서 직접 열어 빠르게 길찾기를 확인할 수 있습니다.',
    'Bản đồ trụ sở ANSLIFE': 'ANSLIFE 본사 지도',
    'Mở trên Google Maps': 'Google 지도에서 열기',
    'Trụ sở chính': '본사',
    'Nhà máy Đồng Nai': '동나이 공장',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh.':
      '호치민시 푸로이동 히엡팟 주거단지 D2도로 15번지',
    'Điểm điều phối thương mại và vận hành trung tâm của ANSLIFE.':
      'ANSLIFE의 상업 및 운영을 총괄하는 중앙 조정 거점입니다.',
    'Phù hợp cho lịch hẹn trao đổi dự án và xác nhận mẫu.':
      '프로젝트 협의 및 샘플 확인 미팅에 적합합니다.',
    'Tham quan nhà máy theo lịch đăng ký trước với đội ngũ ANSLIFE.':
      '공장 방문은 ANSLIFE 팀과 사전 예약 후 진행됩니다.',
    'Vui lòng điền biểu mẫu để đội ngũ ANSLIFE phản hồi báo giá trong thời gian sớm nhất.':
      'ANSLIFE 팀이 최대한 빠르게 견적을 안내할 수 있도록 양식을 입력해 주세요.',
    'Đăng ký lịch làm việc để ANSLIFE chủ động sắp xếp tư vấn theo nhu cầu của bạn.':
      '요청에 맞춰 ANSLIFE가 상담 일정을 조율할 수 있도록 미팅을 예약해 주세요.',
    'Form ID chưa được cấu hình. Vui lòng đặt NEXT_PUBLIC_CF7_QUOTE_FORM_ID hoặc NEXT_PUBLIC_CF7_MEETING_FORM_ID.':
      'Form ID가 설정되지 않았습니다. NEXT_PUBLIC_CF7_QUOTE_FORM_ID 또는 NEXT_PUBLIC_CF7_MEETING_FORM_ID를 설정해 주세요.',
    'Đang gửi dữ liệu...': '데이터 전송 중...',
    'Không gửi được form. Vui lòng thử lại.':
      '폼을 전송할 수 없습니다. 다시 시도해 주세요.',
    Email: '이메일',
    'Nhập tên sản phẩm rồi bấm Thêm': '제품명을 입력한 뒤 추가를 누르세요',
    'Thêm': '추가',
    'Xóa': '삭제',
    'Đang tải danh sách sản phẩm...': '제품 목록을 불러오는 중...',
    'Không tải được gợi ý sản phẩm từ CMS. Bạn vẫn có thể nhập thủ công.':
      'CMS에서 제품 추천을 불러오지 못했습니다. 수동 입력은 가능합니다.',
    'Chưa có sản phẩm trong CMS để gợi ý.':
      'CMS에 추천할 제품이 아직 없습니다.',
    'Bạn có thể chọn nhiều sản phẩm. Nếu không thấy trong gợi ý, nhập thủ công rồi bấm Thêm.':
      '여러 제품을 선택할 수 있습니다. 추천에 없으면 직접 입력 후 추가를 누르세요.',
    'Xem chi tiết': '자세히 보기',
    'Xem toàn bộ': '전체 보기',
    'Đọc bài viết': '기사 읽기',
    'Danh mục sản phẩm': '제품 카테고리',
    'Sản phẩm tiêu biểu': '대표 제품',
    'TỔNG DIỆN TÍCH NHÀ MÁY (MÉT VUÔNG)': '공장 총면적(제곱미터)',
    'CÔNG NHÂN VIÊN VÀ CHUYÊN GIA': '직원 및 전문가',
    'NHÂN VIÊN KỸ THUẬT': '기술 인력',
    'SỐ NĂM KINH NGHIỆM': '경력 연수',
    'Quy mô theo từng nhà máy': '공장별 규모',
    'Trung tâm sản xuất chủ lực': '핵심 생산 허브',
    'Quy mô lớn, vận hành chuỗi sản xuất chính':
      '대규모로 핵심 생산 체인을 운영',
    'Tập trung các công đoạn cốt lõi và kiểm soát kỹ thuật.':
      '핵심 공정과 기술 관리를 집중 수행합니다.',
    'Ưu tiên đơn hàng chiến lược, yêu cầu tiêu chuẩn cao.':
      '높은 기준이 필요한 전략 주문을 우선 처리합니다.',
    'Là điểm điều phối tiến độ cho toàn hệ sinh thái.':
      '전체 생태계의 일정 조율 허브 역할을 합니다.',
    'Mạng lưới sản xuất liên kết': '연계 생산 네트워크',
    'Quy mô linh hoạt theo nhóm sản phẩm':
      '제품군별 유연한 규모 운영',
    'Mở rộng công suất theo mùa vụ và kế hoạch xuất khẩu.':
      '시즌 수요와 수출 계획에 맞춰 생산 능력을 확장합니다.',
    'Chuyên môn hóa theo từng dòng sản phẩm hoặc công đoạn.':
      '제품 라인 또는 공정 단위로 전문화합니다.',
    'Phối hợp cùng trung tâm sản xuất chủ lực để đảm bảo tiến độ giao hàng.':
      '핵심 생산 허브와 협업해 납기 일정을 보장합니다.',
    'Dự án & case study': '프로젝트 & 사례 연구',
    'Tin tức & kiến thức sản xuất': '뉴스 & 생산 지식',
    'Khám phá sản phẩm': '제품 살펴보기',
    'Nhận tư vấn dự án': '프로젝트 상담',
    'Tất cả': '전체',
    'Chi tiết sản phẩm': '제품 상세',
    'Chi tiết dự án': '프로젝트 상세',
    'Chi tiết tin tức': '뉴스 상세',
    'Quay lại danh mục sản phẩm': '제품 목록으로 돌아가기',
    'Quay lại danh sách dự án': '프로젝트 목록으로 돌아가기',
    'Quay lại danh sách tin tức': '뉴스 목록으로 돌아가기',
    'Không tìm thấy trang': '페이지를 찾을 수 없습니다',
    'Quay lại trang chủ': '홈으로 돌아가기',
    'LIÊN HỆ': '문의',
    'TIN TỨC': '뉴스',
    'DỰ ÁN': '프로젝트',
    'DANH MỤC SẢN PHẨM': '제품 카테고리',
    'SẢN XUẤT NỘI THẤT ANSLIFE': 'ANSLIFE 가구 제조',
    'Giải pháp sản xuất nội thất xuất khẩu theo tiêu chuẩn quốc tế.':
      '국제 표준에 맞춘 수출용 가구 제조 솔루션.',
    'ANSLIFE vận hành hệ sinh thái từ nguyên liệu, sản xuất đến kiểm soát chất lượng và giao hàng. Hạ tầng nhà máy linh hoạt cho OEM/ODM.':
      'ANSLIFE는 원자재, 생산, 품질관리, 납품까지 연결된 생태계를 운영하며 OEM/ODM에 유연하게 대응하는 공장 인프라를 갖추고 있습니다.',
    'Thông tin địa chỉ ANSLIFE': 'ANSLIFE 주소 정보',
    'Văn phòng Hà Nội': '하노이 오피스',
    'Văn phòng TP.HCM': '호치민시 오피스',
    'Địa chỉ nhà máy': '공장 주소',
    'Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.':
      '하노이시 탄쑤언군 탄쑤언쭝동 쿠앗주이띠엔 거리 12번지 Zen Tower 5층',
    'Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh':
      '호치민시 푸러이동 히엡팟 주거지 D2도로 15번지',
    'Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.':
      '베트남 동나이성 롱빈동 1구역 3조 609번지',
    'Giao diện SPA + CMS WordPress': 'SPA 인터페이스 + WordPress CMS',
    'Giao diện Next.js + CMS WordPress': 'Next.js 인터페이스 + WordPress CMS',
    'Đội ngũ ANSLIFE sẵn sàng tiếp nhận yêu cầu báo giá, hỗ trợ kỹ thuật sản phẩm, đặt lịch làm việc và trao đổi kế hoạch hợp tác theo từng thị trường.':
      'ANSLIFE 팀은 견적 요청 접수, 제품 기술 지원, 미팅 일정 조율, 시장별 협력 방안 논의를 모두 지원합니다.',
    'Phản hồi nhanh': '빠른 응대',
    'Ưu tiên phản hồi thông tin trong khung thời gian làm việc gần nhất.':
      '가장 가까운 업무 시간 내 우선 회신해 드립니다.',
    'Hỗ trợ kỹ thuật': '기술 지원',
    'Tư vấn theo mã hàng, vật liệu, cấu trúc và tiêu chuẩn hoàn thiện.':
      '제품 코드, 소재, 구조, 마감 기준에 따라 상담해 드립니다.',
    'Hỗ trợ thương mại': '상업 지원',
    'Đồng bộ báo giá, điều kiện giao hàng và quy trình đơn hàng.':
      '견적, 배송 조건, 주문 프로세스를 일관되게 조율합니다.',
    'Làm việc đa kênh': '멀티 채널 대응',
    'Hỗ trợ email, điện thoại và lịch hẹn trực tiếp.':
      '이메일, 전화, 직접 미팅 일정을 지원합니다.',
    'Giờ làm việc: Thứ 2 - Thứ 7, 08:00 - 17:30':
      '업무 시간: 월요일 - 토요일, 08:00 - 17:30',
    'Hỗ trợ gặp trực tiếp theo lịch hẹn.':
      '사전 예약을 통한 대면 미팅이 가능합니다.',
    'Phù hợp cho trao đổi dự án và xác nhận mẫu.':
      '프로젝트 협의와 샘플 확인에 적합합니다.',
    'Nhà máy': '공장',
    'Đón tiếp tham quan nhà máy theo đăng ký trước.':
      '사전 등록 시 공장 견학을 안내해 드립니다.',
    'Hỗ trợ khảo sát năng lực sản xuất theo từng nhóm sản phẩm.':
      '제품군별 생산 역량 조사를 지원합니다.',
    'Hướng dẫn gửi yêu cầu nhanh': '빠른 요청 가이드',
    'Để nhận phản hồi chính xác và nhanh hơn, bạn nên cung cấp rõ nhóm sản phẩm, thị trường mục tiêu, số lượng dự kiến và yêu cầu chất lượng ưu tiên.':
      '더 정확하고 빠른 회신을 위해 제품군, 목표 시장, 예상 수량, 우선 품질 요건을 명확히 알려 주세요.',
    'Đính kèm bản vẽ hoặc ảnh tham chiếu nếu đã có.':
      '도면이나 참고 이미지가 있다면 첨부해 주세요.',
    'Nêu rõ thời gian mong muốn nhận báo giá / triển khai.':
      '견적 수령 및 진행을 희망하는 일정을 알려 주세요.',
    'Cho biết điều kiện giao hàng dự kiến để tư vấn phù hợp.':
      '예상 배송 조건을 알려 주시면 그에 맞추어 안내해 드립니다.',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      '베트남의 가구 생산, 공급 및 수출 시스템.',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      '베트남 내 창고 보관, 출하 조율 및 파트너 표준룸.',
    'Tổng quan mô hình Supply Hub': 'Supply Hub 모델 개요',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      '창고 보관, 화물 통합, 수출 조율 및 파트너 표준룸 모델 개요.',
    'Lưu kho & tồn kho đệm tại Việt Nam': '베트남 창고 보관 및 버퍼 재고',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      '베트남 내 완제품 보관, 버퍼 재고 및 출하 계획 지원.',
    'Gom hàng LCL / FCL': 'LCL / FCL 혼재',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'LCL, FCL 및 여러 공급원의 화물을 통합해 수출을 최적화합니다.',
    'Điều phối xuất hàng định kỳ': '정기 출하 조율',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      '바이어 계획, 시장 및 공급 역량에 맞춰 정기 출하 일정을 구성합니다.',
    'Lưu kho vật liệu & cấu kiện': '자재 및 구성품 보관',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      '자재, 구성품 및 반제품을 보관해 생산과 장기 공급을 지원합니다.',
    'Hỗ trợ chứng từ xuất khẩu': '수출 서류 지원',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      '수출을 위한 출하 기록, 화물 정보 및 관련 서류를 지원합니다.',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      '승인 샘플, 구성품, 도면, 자재 문서, 포장 기준 및 QC 체크리스트를 관리합니다.',
  },
  sv: {
    'Foam / Mút / Xốp': 'Foam / Svamp',
    'Giải pháp vận hành & cung ứng': 'Drift- och leveranslösningar',
    'Phát triển sản phẩm OEM / ODM': 'OEM / ODM-produktutveckling',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      'Från ritningar, fysiska prover eller produktidéer till provutveckling och massproduktion i Vietnam.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      'Drift, leverans, lagerhållning, QC, packning och exportkonsolidering för internationella köpare.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE hjälper internationella köpare att driva projekt i Vietnam, från genomförbarhetsbedömning, produktutveckling, fabriksbedömning, kvalitetskontroll, logistik och lager till handelsfinansiering och leverans.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      'Illustration av logistik och global leveranskedja',
    '1. Phát triển sản phẩm OEM / ODM': '1. OEM / ODM-produktutveckling',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      'Från ritningar, fysiska prover eller produktidéer till provutveckling och massproduktion.',
    'Xem chi tiết': 'Visa detaljer',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. Genomförbarhetsbedömning av projekt och leveranskedja',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      'Bedömning av produkt, material, fabrik, kapacitet, tidsplan, kostnad och leveranskedja i Vietnam.',
    '3. Thẩm định năng lực nhà máy': '3. Bedömning av fabrikskapacitet',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      'Bedömning av fabrikskapacitet utifrån produkt, material, volym, kvalitetsstandarder och leveransplan.',
    '4. Vận hành & quản lý dự án xuất khẩu': '4. Drift och hantering av exportprojekt',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      'Uppföljning av framsteg, informationssamordning, produktionsstyrning, hantering av problem och projektrapportering.',
    '5. QC độc lập trong dự án': '5. Oberoende QC i projektet',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      'Kvalitetskontroll oberoende av fabriken, enligt köparens standarder och varje målmarknad.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. Samordning av projektlogistik och import-export',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      'Stöd för import av förnödenheter, komponenter och material samt konsolidering, lager, dokument och internationell leverans.',
    '7. Lưu kho tại Việt Nam': '7. Lagerhållning i Vietnam',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      'Lagring av varor, material, komponenter, godkända prover, packstandarder och buffertlager i Vietnam.',
    '8. Tài trợ thương mại': '8. Handelsfinansiering',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      'Kontrollerad handelsfinansiering för köpare och underleverantörer, kopplad till order, material, produktion, QC och leverans.',
    'Hành trình của một dự án tại ANSLIFE': 'Projektresan hos ANSLIFE',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'Vi följer köparen genom hela projektresan, från idé till slutleverans.',
    'Ý tưởng & yêu cầu': 'Idé och krav',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'Genomförbarhetsbedömning av projekt och leveranskedja',
    'Đánh giá khả thi': 'Genomförbarhetsbedömning',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      'Granskning av produkt, material, kostnad och tidsplan.',
    'Phát triển sản phẩm': 'Produktutveckling',
    'Phát triển sản phẩm OEM / ODM.': 'OEM / ODM-produktutveckling.',
    'Thẩm định nhà máy': 'Fabriksbedömning',
    'Thẩm định năng lực nhà máy.': 'Bedömning av fabrikskapacitet.',
    'Vận hành dự án': 'Projektdrift',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      'Drift av exportprojekt och handelsfinansiering.',
    'QC độc lập': 'Oberoende QC',
    'QC độc lập trong dự án.': 'Oberoende QC i projektet.',
    'Logistics & xuất nhập khẩu': 'Logistik och import-export',
    'Điều phối logistics & xuất nhập khẩu dự án.':
      'Samordning av projektlogistik och import-export.',
    'Lưu kho & hỗ trợ': 'Lager och support',
    'Lưu kho tại Việt Nam và tài trợ thương mại.':
      'Lagerhållning i Vietnam och handelsfinansiering.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      'Varför väljer köpare ANSLIFE:s drift- och leveranslösningar?',
    'Một đầu mối - toàn bộ giải pháp': 'En kontaktpunkt - komplett lösning',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      'Från produktutveckling till leverans, allt i ett ekosystem.',
    'Độc lập - khách quan - minh bạch': 'Oberoende - objektivt - transparent',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'Vi företräder köparens intressen och kontrollerar kvalitet och risk oberoende.',
    'Hiểu thị trường quốc tế': 'Förståelse för internationella marknader',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      'Kunskap om standarder, regler och praxis på större marknader.',
    'Tối ưu chi phí & hiệu quả': 'Optimering av kostnad och effektivitet',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'Optimerar leveranskedjan, minskar kostnader och kortar projekttiden.',
    'Đồng hành dài hạn': 'Långsiktigt partnerskap',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'Engagerade i långsiktigt samarbete och hållbar tillväxt med köpare.',
    'Sẵn sàng bắt đầu dự án của bạn?': 'Redo att starta ditt projekt?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      'Skicka din förfrågan idag så svarar ANSLIFE-teamet så snart som möjligt.',
    'Gửi yêu cầu': 'Skicka förfrågan',
    'Tải tài liệu / bản vẽ lên': 'Ladda upp dokument / ritningar',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'System för möbeltillverkning, försörjning och export i Vietnam.',
    'Trung tâm cung ứng Việt Nam': 'Vietnams Supply Hub',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'Lagerhållning, leveranssamordning och partnerns standardrum i Vietnam.',
    'Tổng quan mô hình Supply Hub': 'Översikt över Supply Hub-modell',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      'Översikt över lagerhållning, konsolidering, exportsamordning och partnerns standardrum.',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'Lagring & buffertlager i Vietnam',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'Lagring av färdiga varor, buffertlager och stöd för leveransplanering i Vietnam.',
    'Gom hàng LCL / FCL': 'LCL / FCL-konsolidering',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'Konsolidering av LCL, FCL och flera leveranskällor för att optimera exporten.',
    'Điều phối xuất hàng định kỳ': 'Schemalagd leveranssamordning',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'Organisering av återkommande leveranser enligt köparplaner, marknader och leveranskapacitet.',
    'Lưu kho vật liệu & cấu kiện': 'Lagring av material och komponenter',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      'Lagring av material, komponenter och halvfabrikat för produktion och långsiktig leverans.',
    'Hỗ trợ chứng từ xuất khẩu': 'Stöd för exportdokument',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      'Stöd för sändningsunderlag, lastinformation och dokument för export.',
    'Phòng mẫu chuẩn đối tác': 'Partnerns standardprovrum',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      'Hantering av godkända prover, komponenter, ritningar, materialdokument, packstandarder och QC-checklistor.',
  },
  fr: {
    'Foam / Mút / Xốp': 'Mousse / Éponge',
    'Giải pháp vận hành & cung ứng': 'Solutions opérationnelles et d’approvisionnement',
    'Phát triển sản phẩm OEM / ODM': 'Développement produit OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      'Des plans, échantillons réels ou idées produit jusqu’au développement d’échantillons et à la production en série au Vietnam.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      'Solutions d’exploitation, d’approvisionnement, de stockage, de QC, d’emballage et de groupage export pour les acheteurs internationaux.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE accompagne les acheteurs internationaux dans l’exploitation de projets au Vietnam, de l’étude de faisabilité, du développement produit, de l’évaluation d’usine, du contrôle qualité, de la logistique et du stockage jusqu’au financement commercial et à l’expédition.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      'Illustration de la logistique et de la chaîne d’approvisionnement mondiale',
    '1. Phát triển sản phẩm OEM / ODM': '1. Développement produit OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      'Des plans, échantillons physiques ou idées produit jusqu’au développement d’échantillons et à la production en série.',
    'Xem chi tiết': 'Voir les détails',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. Étude de faisabilité du projet et de la supply chain',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      'Évaluation de l’adéquation du produit, des matériaux, de l’usine, de la capacité, du calendrier, des coûts et de la supply chain au Vietnam.',
    '3. Thẩm định năng lực nhà máy': '3. Évaluation des capacités de l’usine',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      'Évaluation des capacités de l’usine selon le produit, les matériaux, le volume, les standards qualité et le calendrier de livraison.',
    '4. Vận hành & quản lý dự án xuất khẩu':
      '4. Exploitation et gestion de projets export',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      'Suivi de l’avancement, coordination de l’information, gestion de production, traitement des problèmes et reporting projet.',
    '5. QC độc lập trong dự án': '5. QC indépendant dans le projet',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      'Contrôle qualité indépendant de l’usine, selon les standards de l’acheteur et de chaque marché cible.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. Coordination logistique et import-export du projet',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      'Support pour l’importation de fournitures, composants et matériaux; groupage, stockage, documents et expédition internationale.',
    '7. Lưu kho tại Việt Nam': '7. Stockage au Vietnam',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      'Stockage au Vietnam des marchandises, matériaux, composants, échantillons approuvés, standards d’emballage et stocks tampons.',
    '8. Tài trợ thương mại': '8. Financement commercial',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      'Financement commercial contrôlé pour les acheteurs et usines sous-traitantes, lié aux commandes, matériaux, production, QC et expédition.',
    'Hành trình của một dự án tại ANSLIFE':
      'Le parcours d’un projet chez ANSLIFE',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'Nous accompagnons l’acheteur tout au long du projet, de l’idée jusqu’à la livraison finale.',
    'Ý tưởng & yêu cầu': 'Idée et exigences',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'Étude de faisabilité du projet et de la supply chain',
    'Đánh giá khả thi': 'Étude de faisabilité',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      'Vérification du produit, des matériaux, des coûts et du calendrier.',
    'Phát triển sản phẩm': 'Développement produit',
    'Phát triển sản phẩm OEM / ODM.': 'Développement produit OEM / ODM.',
    'Thẩm định nhà máy': 'Évaluation d’usine',
    'Thẩm định năng lực nhà máy.': 'Évaluation des capacités de l’usine.',
    'Vận hành dự án': 'Exploitation du projet',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      'Exploitation du projet export et financement commercial.',
    'QC độc lập': 'QC indépendant',
    'QC độc lập trong dự án.': 'QC indépendant dans le projet.',
    'Logistics & xuất nhập khẩu': 'Logistique et import-export',
    'Điều phối logistics & xuất nhập khẩu dự án.':
      'Coordination logistique et import-export du projet.',
    'Lưu kho & hỗ trợ': 'Stockage et support',
    'Lưu kho tại Việt Nam và tài trợ thương mại.':
      'Stockage au Vietnam et financement commercial.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      'Pourquoi les acheteurs choisissent-ils les solutions opérationnelles et d’approvisionnement d’ANSLIFE ?',
    'Một đầu mối - toàn bộ giải pháp': 'Un interlocuteur unique - une solution complète',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      'Du développement produit à l’expédition, tout dans un même écosystème.',
    'Độc lập - khách quan - minh bạch': 'Indépendant - objectif - transparent',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'Représenter les intérêts de l’acheteur et contrôler indépendamment la qualité et les risques.',
    'Hiểu thị trường quốc tế': 'Compréhension des marchés internationaux',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      'Maîtrise des standards, réglementations et pratiques des grands marchés.',
    'Tối ưu chi phí & hiệu quả': 'Optimisation des coûts et de l’efficacité',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'Optimiser la supply chain, réduire les coûts et raccourcir les délais projet.',
    'Đồng hành dài hạn': 'Accompagnement long terme',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'Engagement dans un partenariat long terme et une croissance durable avec les acheteurs.',
    'Sẵn sàng bắt đầu dự án của bạn?': 'Prêt à démarrer votre projet ?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      'Envoyez votre demande aujourd’hui, l’équipe ANSLIFE vous répondra dès que possible.',
    'Gửi yêu cầu': 'Envoyer une demande',
    'Tải tài liệu / bản vẽ lên': 'Téléverser documents / plans',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'Système de production, d’approvisionnement et d’exportation de mobilier au Vietnam.',
    'Trung tâm cung ứng Việt Nam': 'Hub d’approvisionnement au Vietnam',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'Stockage, coordination des expéditions et salle standard partenaire au Vietnam.',
    'Tổng quan mô hình Supply Hub': 'Présentation du modèle Supply Hub',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      'Présentation du stockage, du groupage, de la coordination export et de la salle standard partenaire.',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'Stockage & stock tampon au Vietnam',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'Stockage de produits finis, stock tampon et support au planning d’expédition au Vietnam.',
    'Gom hàng LCL / FCL': 'Consolidation LCL / FCL',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'Consolidation LCL, FCL et coordination de plusieurs sources pour optimiser l’export.',
    'Điều phối xuất hàng định kỳ': 'Coordination d’expéditions régulières',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'Organisation d’expéditions récurrentes selon les plans acheteur, les marchés et la capacité d’approvisionnement.',
    'Lưu kho vật liệu & cấu kiện': 'Stockage matériaux & composants',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      'Stockage des matériaux, composants et semi-finis pour soutenir la production et l’approvisionnement long terme.',
    'Hỗ trợ chứng từ xuất khẩu': 'Support documentaire export',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      'Support des dossiers, informations de lot et documents nécessaires à l’export.',
    'Phòng mẫu chuẩn đối tác': 'Salle d’échantillons standard partenaire',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      'Gestion des échantillons approuvés, composants, plans, documents matériaux, standards d’emballage et checklists QC.',
  },
  ru: {
    'Foam / Mút / Xốp': 'Пена / Губка',
    'Giải pháp vận hành & cung ứng': 'Операционные и снабженческие решения',
    'Phát triển sản phẩm OEM / ODM': 'Разработка продукта OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      'От чертежей, реальных образцов или идеи продукта до разработки образца и массового производства во Вьетнаме.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      'Решения для международных покупателей: операционное сопровождение, снабжение, хранение, QC, упаковка и консолидация экспортных грузов.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE поддерживает международных покупателей в ведении проектов во Вьетнаме: от оценки осуществимости, разработки продукта, аудита фабрики, контроля качества, логистики и хранения до торгового финансирования и отгрузки.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      'Иллюстрация логистики и глобальной цепочки поставок',
    '1. Phát triển sản phẩm OEM / ODM': '1. Разработка продукта OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      'От чертежей, физических образцов или идеи продукта до разработки образца и массового производства.',
    'Xem chi tiết': 'Подробнее',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. Оценка осуществимости проекта и цепочки поставок',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      'Оценка соответствия продукта, материалов, фабрики, мощности, сроков, стоимости и цепочки поставок во Вьетнаме.',
    '3. Thẩm định năng lực nhà máy': '3. Оценка возможностей фабрики',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      'Оценка возможностей фабрики по продукту, материалам, объему, стандартам качества и графику поставки.',
    '4. Vận hành & quản lý dự án xuất khẩu':
      '4. Операционное управление экспортным проектом',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      'Отслеживание прогресса, координация информации, управление производством, решение возникающих вопросов и проектная отчетность.',
    '5. QC độc lập trong dự án': '5. Независимый QC в проекте',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      'Контроль качества, независимый от фабрики, в соответствии со стандартами покупателя и каждого целевого рынка.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. Координация логистики и импорта-экспорта проекта',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      'Поддержка импорта материалов, комплектующих и сырья; консолидация, хранение, документы и международная отгрузка.',
    '7. Lưu kho tại Việt Nam': '7. Хранение во Вьетнаме',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      'Хранение товаров, материалов, компонентов, утвержденных образцов, стандартов упаковки и резервных запасов во Вьетнаме.',
    '8. Tài trợ thương mại': '8. Торговое финансирование',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      'Контролируемое торговое финансирование для покупателей и подрядных фабрик, связанное с заказами, материалами, производством, QC и отгрузкой.',
    'Hành trình của một dự án tại ANSLIFE': 'Путь проекта в ANSLIFE',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'Мы сопровождаем покупателя на всем пути проекта, от идеи до доставки товара конечному клиенту.',
    'Ý tưởng & yêu cầu': 'Идея и требования',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'Оценка осуществимости проекта и цепочки поставок',
    'Đánh giá khả thi': 'Оценка осуществимости',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      'Проверка продукта, материалов, стоимости и графика.',
    'Phát triển sản phẩm': 'Разработка продукта',
    'Phát triển sản phẩm OEM / ODM.': 'Разработка продукта OEM / ODM.',
    'Thẩm định nhà máy': 'Аудит фабрики',
    'Thẩm định năng lực nhà máy.': 'Оценка возможностей фабрики.',
    'Vận hành dự án': 'Операционное ведение проекта',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      'Операционное ведение экспортного проекта и торговое финансирование.',
    'QC độc lập': 'Независимый QC',
    'QC độc lập trong dự án.': 'Независимый QC в проекте.',
    'Logistics & xuất nhập khẩu': 'Логистика и импорт-экспорт',
    'Điều phối logistics & xuất nhập khẩu dự án.':
      'Координация логистики и импорта-экспорта проекта.',
    'Lưu kho & hỗ trợ': 'Хранение и поддержка',
    'Lưu kho tại Việt Nam và tài trợ thương mại.':
      'Хранение во Вьетнаме и торговое финансирование.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      'Почему покупатели выбирают операционные и снабженческие решения ANSLIFE?',
    'Một đầu mối - toàn bộ giải pháp': 'Одна точка контакта - полное решение',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      'От разработки продукта до отгрузки, все в одной экосистеме.',
    'Độc lập - khách quan - minh bạch': 'Независимо - объективно - прозрачно',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'Представляем интересы покупателя и независимо контролируем качество и риски.',
    'Hiểu thị trường quốc tế': 'Понимание международных рынков',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      'Понимание стандартов, правил и практик основных рынков.',
    'Tối ưu chi phí & hiệu quả': 'Оптимизация затрат и эффективности',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'Оптимизация цепочки поставок, снижение затрат и сокращение сроков проекта.',
    'Đồng hành dài hạn': 'Долгосрочное партнерство',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'Нацелены на долгосрочное сотрудничество и устойчивый рост вместе с покупателями.',
    'Sẵn sàng bắt đầu dự án của bạn?': 'Готовы начать ваш проект?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      'Отправьте запрос сегодня, и команда ANSLIFE ответит как можно скорее.',
    'Gửi yêu cầu': 'Отправить запрос',
    'Tải tài liệu / bản vẽ lên': 'Загрузить документы / чертежи',
    'Tải bản vẽ lên': 'Загрузить чертеж',
    'Liên hệ ANSLIFE': 'Связаться с ANSLIFE',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'Система производства, поставок и экспорта мебели во Вьетнаме.',
    'Trung tâm cung ứng Việt Nam': 'Центр поставок во Вьетнаме',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'Хранение, координация отгрузок и стандартная комната партнера во Вьетнаме.',
    'Tổng quan mô hình Supply Hub': 'Обзор модели Supply Hub',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      'Обзор модели хранения, консолидации, экспортной координации и стандартной комнаты партнера.',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'Складирование и буферный запас во Вьетнаме',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'Хранение готовой продукции, буферный запас и поддержка планирования отгрузок во Вьетнаме.',
    'Gom hàng LCL / FCL': 'Консолидация LCL / FCL',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'Консолидация LCL, FCL и нескольких источников поставки для оптимизации экспорта.',
    'Điều phối xuất hàng định kỳ': 'Координация регулярных отгрузок',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'Организация регулярных графиков отгрузки по планам покупателя, рынкам и возможностям поставки.',
    'Lưu kho vật liệu & cấu kiện': 'Хранение материалов и компонентов',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      'Хранение материалов, компонентов и полуфабрикатов для производства и долгосрочных поставок.',
    'Hỗ trợ chứng từ xuất khẩu': 'Поддержка экспортных документов',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      'Поддержка записей, информации о партии и документов для экспорта.',
    'Phòng mẫu chuẩn đối tác': 'Комната стандартных образцов партнера',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      'Управление утвержденными образцами, компонентами, чертежами, материалами, стандартами упаковки и QC-чеклистами.',
  },
  es: {
    'Foam / Mút / Xốp': 'Espuma / Esponja',
    'Giải pháp vận hành & cung ứng': 'Soluciones de operación y suministro',
    'Phát triển sản phẩm OEM / ODM': 'Desarrollo de producto OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      'Desde planos, muestras físicas o ideas de producto hasta desarrollo de muestras y producción en serie en Vietnam.',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      'Soluciones de operación, suministro, almacenamiento, QC, embalaje y consolidación de exportación para compradores internacionales.',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE apoya a compradores internacionales en la operación de proyectos en Vietnam, desde la evaluación de viabilidad, desarrollo de producto, evaluación de fábrica, control de calidad, logística y almacenamiento hasta la financiación comercial y el despacho.',
    'Minh họa logistics và chuỗi cung ứng toàn cầu':
      'Ilustración de logística y cadena de suministro global',
    '1. Phát triển sản phẩm OEM / ODM': '1. Desarrollo de producto OEM / ODM',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      'Desde planos, muestras físicas o ideas de producto hasta desarrollo de muestras y producción en serie.',
    'Xem chi tiết': 'Ver detalles',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. Evaluación de viabilidad del proyecto y la cadena de suministro',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      'Evaluación de la adecuación del producto, materiales, fábrica, capacidad, plazo, coste y cadena de suministro en Vietnam.',
    '3. Thẩm định năng lực nhà máy': '3. Evaluación de capacidad de fábrica',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      'Evaluación de la capacidad de la fábrica según producto, materiales, volumen, estándares de calidad y calendario de entrega.',
    '4. Vận hành & quản lý dự án xuất khẩu':
      '4. Operación y gestión de proyectos de exportación',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      'Seguimiento del avance, coordinación de información, gestión de producción, resolución de incidencias e informes del proyecto.',
    '5. QC độc lập trong dự án': '5. QC independiente en el proyecto',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      'Control de calidad independiente de la fábrica, según los estándares del comprador y de cada mercado objetivo.',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. Coordinación logística e importación-exportación del proyecto',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      'Soporte para importación de suministros, componentes y materiales; consolidación, almacenamiento, documentos y despacho internacional.',
    '7. Lưu kho tại Việt Nam': '7. Almacenamiento en Vietnam',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      'Almacenamiento en Vietnam de mercancías, materiales, componentes, muestras aprobadas, estándares de embalaje e inventario de reserva.',
    '8. Tài trợ thương mại': '8. Financiación comercial',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      'Financiación comercial controlada para compradores y fábricas subcontratadas, vinculada a pedidos, materiales, producción, QC y despacho.',
    'Hành trình của một dự án tại ANSLIFE':
      'El recorrido de un proyecto en ANSLIFE',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      'Acompañamos al comprador durante todo el proyecto, desde la idea hasta la entrega final.',
    'Ý tưởng & yêu cầu': 'Idea y requisitos',
    'Đánh giá khả thi dự án & chuỗi cung ứng':
      'Evaluación de viabilidad del proyecto y la cadena de suministro',
    'Đánh giá khả thi': 'Evaluación de viabilidad',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      'Revisión del producto, materiales, coste y calendario.',
    'Phát triển sản phẩm': 'Desarrollo de producto',
    'Phát triển sản phẩm OEM / ODM.': 'Desarrollo de producto OEM / ODM.',
    'Thẩm định nhà máy': 'Evaluación de fábrica',
    'Thẩm định năng lực nhà máy.': 'Evaluación de capacidad de fábrica.',
    'Vận hành dự án': 'Operación del proyecto',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.':
      'Operación del proyecto de exportación y financiación comercial.',
    'QC độc lập': 'QC independiente',
    'QC độc lập trong dự án.': 'QC independiente en el proyecto.',
    'Logistics & xuất nhập khẩu': 'Logística e importación-exportación',
    'Điều phối logistics & xuất nhập khẩu dự án.':
      'Coordinación logística e importación-exportación del proyecto.',
    'Lưu kho & hỗ trợ': 'Almacenamiento y soporte',
    'Lưu kho tại Việt Nam và tài trợ thương mại.':
      'Almacenamiento en Vietnam y financiación comercial.',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      '¿Por qué los compradores eligen las soluciones de operación y suministro de ANSLIFE?',
    'Một đầu mối - toàn bộ giải pháp': 'Un solo punto de contacto - solución completa',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      'Desde el desarrollo de producto hasta el despacho, todo en un mismo ecosistema.',
    'Độc lập - khách quan - minh bạch': 'Independiente - objetivo - transparente',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      'Representamos los intereses del comprador y controlamos la calidad y el riesgo de forma independiente.',
    'Hiểu thị trường quốc tế': 'Comprensión de mercados internacionales',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      'Conocimiento de estándares, normativas y prácticas de los principales mercados.',
    'Tối ưu chi phí & hiệu quả': 'Optimización de costes y eficiencia',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      'Optimizar la cadena de suministro, reducir costes y acortar los plazos del proyecto.',
    'Đồng hành dài hạn': 'Acompañamiento a largo plazo',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      'Compromiso de colaboración a largo plazo y crecimiento sostenible junto con los compradores.',
    'Sẵn sàng bắt đầu dự án của bạn?': '¿Listo para iniciar tu proyecto?',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      'Envía tu solicitud hoy y el equipo de ANSLIFE responderá lo antes posible.',
    'Gửi yêu cầu': 'Enviar solicitud',
    'Tải tài liệu / bản vẽ lên': 'Subir documentos / planos',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      'Sistema de producción, suministro y exportación de mobiliario en Vietnam.',
    'Trung tâm cung ứng Việt Nam': 'Centro de Suministro en Vietnam',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      'Almacenamiento, coordinación de envíos y sala estándar del socio en Vietnam.',
    'Tổng quan mô hình Supply Hub': 'Resumen del modelo Supply Hub',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      'Resumen de almacenamiento, consolidación, coordinación de exportación y sala estándar del socio.',
    'Lưu kho & tồn kho đệm tại Việt Nam': 'Almacenaje y stock de respaldo en Vietnam',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      'Almacenamiento de productos terminados, stock de respaldo y apoyo al plan de envíos en Vietnam.',
    'Gom hàng LCL / FCL': 'Consolidación LCL / FCL',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      'Consolidación LCL, FCL y coordinación de varias fuentes para optimizar la exportación.',
    'Điều phối xuất hàng định kỳ': 'Coordinación de envíos periódicos',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      'Organización de envíos recurrentes según planes del comprador, mercados y capacidad de suministro.',
    'Lưu kho vật liệu & cấu kiện': 'Almacenamiento de materiales y componentes',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      'Almacenamiento de materiales, componentes y semielaborados para apoyar producción y suministro a largo plazo.',
    'Hỗ trợ chứng từ xuất khẩu': 'Soporte de documentación de exportación',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      'Soporte de registros, información de lote y documentos para exportación.',
    'Phòng mẫu chuẩn đối tác': 'Sala de muestras estándar del socio',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      'Gestión de muestras aprobadas, componentes, planos, documentos de materiales, estándares de embalaje y checklists QC.',
  },
  zh: {
    'Foam / Mút / Xốp': '泡棉 / 海绵',
    'Tin tức công ty': '公司新闻',
    'Dự án & hợp tác': '项目与合作',
    'Nhà máy & sản xuất': '工厂与生产',
    'Triển lãm & sự kiện': '展会与活动',
    'Chất lượng & chứng nhận': '质量与认证',
    'Hoạt động cộng đồng': '社区活动',
    'Giải pháp vận hành & cung ứng': '运营与供应解决方案',
    'Phát triển sản phẩm OEM / ODM': 'OEM / ODM 产品开发',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt tại Việt Nam.':
      '从图纸、实物样品或产品想法，到样品开发和在越南批量生产。',
    'Giải pháp vận hành, cung ứng, lưu kho, QC, đóng gói và gom hàng xuất khẩu cho buyer quốc tế.':
      '面向国际买家的运营、供应、仓储、QC、包装和出口集货解决方案。',
    'ANSLIFE hỗ trợ buyer quốc tế vận hành các dự án tại Việt Nam từ giai đoạn đánh giá khả thi, phát triển sản phẩm, thẩm định nhà máy, kiểm soát chất lượng, logistics, lưu kho đến tài trợ thương mại và xuất hàng.':
      'ANSLIFE 支持国际买家在越南运营项目，涵盖可行性评估、产品开发、工厂评估、质量控制、物流、仓储、贸易融资和出货。',
    'Minh họa logistics và chuỗi cung ứng toàn cầu': '物流与全球供应链示意图',
    '1. Phát triển sản phẩm OEM / ODM': '1. OEM / ODM 产品开发',
    'Từ bản vẽ, mẫu thật hoặc ý tưởng sản phẩm đến phát triển mẫu và sản xuất hàng loạt.':
      '从图纸、实物样品或产品想法，到样品开发和批量生产。',
    'Xem chi tiết': '查看详情',
    '2. Đánh giá khả thi dự án & chuỗi cung ứng':
      '2. 项目与供应链可行性评估',
    'Đánh giá tính phù hợp của sản phẩm, vật liệu, nhà máy, sản lượng, thời gian, chi phí và chuỗi cung ứng tại Việt Nam.':
      '评估产品、材料、工厂、产能、时间、成本及越南供应链的匹配度。',
    '3. Thẩm định năng lực nhà máy': '3. 工厂能力评估',
    'Đánh giá năng lực nhà máy theo sản phẩm, vật liệu, sản lượng, tiêu chuẩn chất lượng và tiến độ giao hàng.':
      '根据产品、材料、产量、质量标准和交付进度评估工厂能力。',
    '4. Vận hành & quản lý dự án xuất khẩu': '4. 出口项目运营与管理',
    'Theo dõi tiến độ, điều phối thông tin, quản lý sản xuất, xử lý vấn đề phát sinh và báo cáo dự án.':
      '跟踪进度、协调信息、管理生产、处理问题并进行项目报告。',
    '5. QC độc lập trong dự án': '5. 项目独立 QC',
    'Kiểm soát chất lượng độc lập với nhà máy, theo tiêu chuẩn buyer và từng thị trường.':
      '独立于工厂进行质量控制，符合买家标准和各目标市场要求。',
    '6. Điều phối logistics & xuất nhập khẩu dự án':
      '6. 项目物流与进出口协调',
    'Hỗ trợ nhập khẩu vật tư, linh kiện, nguyên liệu; gom hàng, lưu kho, chứng từ và xuất hàng quốc tế.':
      '支持物资、零部件和原材料进口；集货、仓储、单证和国际出货。',
    '7. Lưu kho tại Việt Nam': '7. 越南仓储',
    'Lưu hàng hóa, vật liệu, cấu kiện, mẫu chuẩn, tiêu chuẩn đóng gói và hàng tồn dự phòng tại Việt Nam.':
      '在越南存放货物、材料、构件、确认样品、包装标准和备用库存。',
    '8. Tài trợ thương mại': '8. 贸易融资',
    'Tài trợ thương mại có kiểm soát cho buyer và nhà máy gia công, gắn với đơn hàng, vật liệu, sản xuất, QC và xuất hàng.':
      '为买家和代工厂提供受控贸易融资，与订单、材料、生产、QC 和出货挂钩。',
    'Hành trình của một dự án tại ANSLIFE': 'ANSLIFE 的项目流程',
    'Chúng tôi đồng hành cùng buyer trong toàn bộ hành trình của dự án - từ ý tưởng đến khi hàng hóa đến tay khách hàng.':
      '我们陪伴买家完成整个项目流程，从想法到货物交付给客户。',
    'Ý tưởng & yêu cầu': '想法与需求',
    'Đánh giá khả thi dự án & chuỗi cung ứng': '项目与供应链可行性评估',
    'Đánh giá khả thi': '可行性评估',
    'Kiểm tra sản phẩm, vật liệu, chi phí và tiến độ.':
      '检查产品、材料、成本和进度。',
    'Phát triển sản phẩm': '产品开发',
    'Phát triển sản phẩm OEM / ODM.': 'OEM / ODM 产品开发。',
    'Thẩm định nhà máy': '工厂评估',
    'Thẩm định năng lực nhà máy.': '工厂能力评估。',
    'Vận hành dự án': '项目运营',
    'Vận hành dự án xuất khẩu và tài trợ thương mại.': '出口项目运营与贸易融资。',
    'QC độc lập': '独立 QC',
    'QC độc lập trong dự án.': '项目独立 QC。',
    'Logistics & xuất nhập khẩu': '物流与进出口',
    'Điều phối logistics & xuất nhập khẩu dự án.': '项目物流与进出口协调。',
    'Lưu kho & hỗ trợ': '仓储与支持',
    'Lưu kho tại Việt Nam và tài trợ thương mại.': '越南仓储与贸易融资。',
    'Vì sao buyer chọn giải pháp vận hành & cung ứng của ANSLIFE?':
      '为什么买家选择 ANSLIFE 的运营与供应解决方案？',
    'Một đầu mối - toàn bộ giải pháp': '一个窗口 - 完整解决方案',
    'Từ phát triển sản phẩm đến xuất hàng, tất cả trong một hệ sinh thái.':
      '从产品开发到出货，全部在一个生态系统内完成。',
    'Độc lập - khách quan - minh bạch': '独立 - 客观 - 透明',
    'Đại diện lợi ích của buyer, kiểm soát chất lượng và rủi ro một cách độc lập.':
      '代表买家利益，独立控制质量和风险。',
    'Hiểu thị trường quốc tế': '理解国际市场',
    'Am hiểu tiêu chuẩn, quy định và thông lệ của các thị trường lớn.':
      '熟悉主要市场的标准、法规和商业惯例。',
    'Tối ưu chi phí & hiệu quả': '优化成本与效率',
    'Tối ưu chuỗi cung ứng, giảm chi phí và rút ngắn thời gian dự án.':
      '优化供应链，降低成本并缩短项目周期。',
    'Đồng hành dài hạn': '长期陪伴',
    'Cam kết đồng hành lâu dài, cùng buyer phát triển bền vững.':
      '致力于与买家长期合作，共同实现可持续增长。',
    'Sẵn sàng bắt đầu dự án của bạn?': '准备开始您的项目了吗？',
    'Gửi yêu cầu ngay hôm nay, đội ngũ ANSLIFE sẽ phản hồi trong thời gian sớm nhất.':
      '今天发送需求，ANSLIFE 团队会尽快回复。',
    'Gửi yêu cầu': '发送需求',
    'Tải tài liệu / bản vẽ lên': '上传资料 / 图纸',
    'Hệ thống sản xuất, cung ứng và xuất khẩu nội thất tại Việt Nam.':
      '越南家具生产、供应与出口体系。',
    'Trung tâm cung ứng Việt Nam': '越南供应中心',
    'Lưu kho, điều phối xuất hàng và phòng mẫu chuẩn đối tác tại Việt Nam.':
      '越南仓储、出货协调与合作伙伴标准样品室。',
    'Tổng quan mô hình Supply Hub': 'Supply Hub模式概览',
    'Tổng quan mô hình lưu kho, gom hàng, điều phối xuất khẩu và phòng mẫu chuẩn đối tác.':
      '仓储、集货、出口协调与合作伙伴标准样品室模式概览。',
    'Lưu kho & tồn kho đệm tại Việt Nam': '越南仓储与缓冲库存',
    'Giải pháp lưu kho thành phẩm, tồn kho đệm và hỗ trợ kế hoạch xuất hàng tại Việt Nam.':
      '越南成品仓储、缓冲库存及出货计划支持。',
    'Gom hàng LCL / FCL': 'LCL / FCL拼箱与整柜集货',
    'Gom hàng lẻ, gom container và điều phối nhiều nguồn hàng để tối ưu xuất khẩu.':
      '整合LCL、FCL及多来源货物，以优化出口。',
    'Điều phối xuất hàng định kỳ': '定期出货协调',
    'Tổ chức lịch xuất hàng định kỳ theo kế hoạch buyer, thị trường và năng lực cung ứng.':
      '根据买家计划、市场和供应能力安排定期出货。',
    'Lưu kho vật liệu & cấu kiện': '材料与构件仓储',
    'Lưu kho vật liệu, cấu kiện và bán thành phẩm để hỗ trợ sản xuất và cung ứng dài hạn.':
      '储存材料、构件和半成品，以支持生产和长期供应。',
    'Hỗ trợ chứng từ xuất khẩu': '出口单证支持',
    'Hỗ trợ hồ sơ, thông tin lô hàng và chứng từ phục vụ xuất khẩu.':
      '支持出口所需的出货记录、货物信息和相关单证。',
    'Phòng mẫu chuẩn đối tác': '合作伙伴标准样品室',
    'Quản lý mẫu duyệt, cấu kiện, bản vẽ, tài liệu vật liệu, tiêu chuẩn đóng gói và checklist QC.':
      '管理确认样品、构件、图纸、材料文件、包装标准和QC检查表。',
  },
};

export function translateText(language: LanguageCode, text: string): string {
  if (language === VIETNAMESE) {
    return text;
  }

  return (
    PRIMARY_NAV_TRANSLATIONS[language]?.[text] ??
    CONTACT_REQUEST_TRANSLATIONS[language]?.[text] ??
    NAV_MENU_TRANSLATIONS[language]?.[text] ??
    TRANSLATIONS[language]?.[text] ??
    AUTO_TRANSLATIONS[language]?.[text] ??
    TRANSLATIONS.en?.[text] ??
    AUTO_TRANSLATIONS.en?.[text] ??
    text
  );
}
