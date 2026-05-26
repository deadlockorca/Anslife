import type { LanguageCode } from '../i18n/language';
import { translateText } from '../i18n/translations';

const ABOUT_COMPANY_INTRO_SECTION_VN = `
  <section id="company-intro" class="ai-section ai-company-intro ai-company-overview">
    <article class="ai-company-hero">
      <div class="ai-company-copy">
        <h2 class="ai-company-title">Tổng quan công ty</h2>
        <p class="ai-company-lead">
          ANSLIFE JSC là đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam cho buyer quốc tế trong ngành nội thất, cấu kiện và vật liệu.
        </p>
        <p>
          Chúng tôi vận hành một hệ thống gồm nhà máy do ANSLIFE điều phối, mạng lưới nhà máy vệ tinh, chuỗi cung ứng vật liệu liên tục, hệ thống QC độc lập, kho lưu trữ tại Việt Nam và cơ chế xuất hàng định kỳ.
        </p>
        <p>
          ANSLIFE JSC hỗ trợ buyer từ phát triển sản phẩm, chuẩn bị vật liệu, tổ chức sản xuất, kiểm soát chất lượng, quản lý dự án, tài trợ thương mại đến đóng gói và xuất hàng sang Nhật Bản, Hoa Kỳ, EU và các thị trường quốc tế.
        </p>
        <div class="ai-company-keyline">
          <strong>ANSLIFE JSC là một hệ thống sản xuất - chuỗi cung ứng - QC độc lập - lưu kho - tài trợ thương mại - xuất khẩu tại Việt Nam cho buyer quốc tế.</strong>
        </div>
      </div>
    </article>

    <div class="ai-stat-grid">
      <article class="ai-stat-card">
        <strong>Vai trò</strong>
        <p>Đối tác sản xuất, chuỗi cung ứng & xuất khẩu</p>
      </article>
      <article class="ai-stat-card">
        <strong>Địa điểm</strong>
        <p>Việt Nam. Văn phòng đại diện: Tokyo, Singapore, Hong Kong</p>
      </article>
      <article class="ai-stat-card">
        <strong>Thị trường</strong>
        <p>Nhật Bản, Hoa Kỳ, EU và buyer quốc tế</p>
      </article>
      <article class="ai-stat-card">
        <strong>Dịch vụ chính</strong>
        <p>Sản xuất, vật liệu, QC độc lập, lưu kho, vận hành dự án, tài trợ thương mại và xuất hàng</p>
      </article>
    </div>

    <section class="ai-section">
      <h2>ANSLIFE hỗ trợ buyer những gì?</h2>
      <div class="ai-highlight-grid">
        <article class="ai-highlight-card">
          <h3>Sản xuất</h3>
          <p>Tổ chức sản xuất nội thất, cấu kiện và sản phẩm theo yêu cầu dự án.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Chuỗi cung ứng vật liệu</h3>
          <p>Chuẩn bị, điều phối và duy trì nguồn vật liệu liên tục tại Việt Nam.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>QC độc lập</h3>
          <p>Kiểm soát chất lượng tách khỏi nhà máy để giảm rủi ro lỗi trước khi xuất hàng.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Lưu kho tại Việt Nam</h3>
          <p>Lưu trữ hàng hóa, vật liệu và đơn hàng để hỗ trợ kế hoạch xuất hàng định kỳ.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Vận hành & quản lý dự án</h3>
          <p>Theo dõi tiến độ, mẫu, tiêu chuẩn, phản hồi kỹ thuật và phối hợp giữa các bên.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Tài trợ thương mại</h3>
          <p>Hỗ trợ dòng tiền sản xuất và kế hoạch cung ứng cho các đơn hàng phù hợp.</p>
        </article>
      </div>
    </section>
  </section>
`.trim();

const ABOUT_COMPANY_INFO_SECTION_VN = `
  <section id="company-info" class="ai-section ai-company-intro ai-company-overview ai-company-info-section">
    <details class="ai-company-info-accordion" open>
      <summary>
        <span>Thông tin công ty</span>
      </summary>
      <div class="ai-company-info-body">
        <p class="ai-company-info-lead">
          ANSLIFE JSC là đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam cho buyer quốc tế trong ngành nội thất, cấu kiện và vật liệu. Chúng tôi có văn phòng đại diện tại Hà Nội, TP. Hồ Chí Minh, Tokyo, Singapore và Hong Kong.
        </p>

        <dl class="ai-company-info-list">
          <div class="ai-company-info-row">
            <dt>Tên công ty</dt>
            <dd>ANSLIFE JSC</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Vai trò</dt>
            <dd>Đối tác sản xuất, chuỗi cung ứng và xuất khẩu tại Việt Nam</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Lĩnh vực hoạt động</dt>
            <dd>Sản xuất nội thất, cấu kiện, chuỗi cung ứng vật liệu, lưu kho, QC độc lập, vận hành dự án, tài trợ thương mại, đóng gói và xuất hàng</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Thị trường phục vụ</dt>
            <dd>Nhật Bản, Hoa Kỳ, EU và buyer quốc tế</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Văn phòng trong nước</dt>
            <dd>Hà Nội, TP. Hồ Chí Minh</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Văn phòng quốc tế</dt>
            <dd>Tokyo, Singapore, Hong Kong</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Website</dt>
            <dd><a href="https://anslife.net" target="_blank" rel="noopener noreferrer">anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Email</dt>
            <dd><a href="mailto:global@anslife.net">global@anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Ngôn ngữ hỗ trợ</dt>
            <dd>Tiếng Anh, Tiếng Nhật, Tiếng Việt, Tiếng Hàn</dd>
          </div>
        </dl>

        <p class="ai-company-info-cta">
          Buyer có thể liên hệ ANSLIFE JSC để gửi yêu cầu sản phẩm, bản vẽ, mẫu, vật liệu hoặc kế hoạch lưu kho – xuất hàng từ Việt Nam.
        </p>
      </div>
    </details>

    <div class="ai-company-office-section">
      <header class="ai-company-office-header">
        <h2>Văn phòng & liên hệ</h2>
        <p>
          ANSLIFE JSC có hệ thống văn phòng đại diện tại Việt Nam, Nhật Bản, Singapore và Hong Kong nhằm hỗ trợ buyer quốc tế trong quá trình trao đổi yêu cầu, quản lý dự án, kiểm soát tiêu chuẩn và tổ chức chuỗi cung ứng từ Việt Nam.
        </p>
      </header>

      <div class="ai-company-office-grid">
        <article class="ai-company-office-card">
          <h3>VIỆT NAM</h3>
          <dl>
            <div>
              <dt>Văn phòng đại diện</dt>
              <dd>Hà Nội, TP. Hồ Chí Minh</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.vn">contact@anslife.vn</a></dd>
            </div>
            <div>
              <dt>Số điện thoại</dt>
              <dd><a href="tel:+84901827555">+84 901 827 555</a></dd>
            </div>
            <div>
              <dt>Địa chỉ Hà Nội</dt>
              <dd>Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội, Việt Nam</dd>
            </div>
            <div>
              <dt>Địa chỉ TP. Hồ Chí Minh</dt>
              <dd>Số 63 KDC Hiệp Thành 1, Phường Phú Lợi, Thành Phố Hồ Chí Minh, Việt Nam</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>JAPAN</h3>
          <dl>
            <div>
              <dt>Văn phòng đại diện</dt>
              <dd>Tokyo, Japan</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.jp">contact@anslife.jp</a></dd>
            </div>
            <div>
              <dt>Địa chỉ</dt>
              <dd>Địa chỉ đang cập nhật</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>SINGAPORE</h3>
          <dl>
            <div>
              <dt>Văn phòng đại diện</dt>
              <dd>Singapore</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.sg">contact@anslife.sg</a></dd>
            </div>
            <div>
              <dt>Địa chỉ</dt>
              <dd>Địa chỉ đang cập nhật</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>HONG KONG</h3>
          <dl>
            <div>
              <dt>Văn phòng đại diện</dt>
              <dd>Hong Kong</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.hk">contact@anslife.hk</a></dd>
            </div>
            <div>
              <dt>Địa chỉ</dt>
              <dd>Địa chỉ đang cập nhật</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
`.trim();

const ABOUT_COMPANY_INTRO_SECTION_EN = `
  <section id="company-intro" class="ai-section ai-company-intro ai-company-overview">
    <article class="ai-company-hero">
      <div class="ai-company-copy">
        <h2 class="ai-company-title">Company Overview</h2>
        <p class="ai-company-lead">
          ANSLIFE JSC is a manufacturing, supply chain and export partner in Vietnam for international buyers in furniture, components and materials.
        </p>
        <p>
          We operate a system that includes ANSLIFE-coordinated factories, a satellite factory network, continuous material supply, independent QC, warehousing in Vietnam and recurring export shipment operations.
        </p>
        <p>
          ANSLIFE JSC supports buyers from product development, material preparation, production organization, quality control, project management and trade finance to packing and export shipment to Japan, the United States, EU and international markets.
        </p>
        <div class="ai-company-keyline">
          <strong>ANSLIFE JSC is a production, supply chain, independent QC, warehousing, trade finance and export system in Vietnam for international buyers.</strong>
        </div>
      </div>
    </article>

    <div class="ai-stat-grid">
      <article class="ai-stat-card">
        <strong>Role</strong>
        <p>Manufacturing, supply chain & export partner</p>
      </article>
      <article class="ai-stat-card">
        <strong>Location</strong>
        <p>Vietnam. Representative offices: Tokyo, Singapore, Hong Kong</p>
      </article>
      <article class="ai-stat-card">
        <strong>Markets</strong>
        <p>Japan, United States, EU and international buyers</p>
      </article>
      <article class="ai-stat-card">
        <strong>Core services</strong>
        <p>Production, materials, independent QC, warehousing, project operations, trade finance and export shipment</p>
      </article>
    </div>

    <section class="ai-section">
      <h2>How ANSLIFE Supports Buyers</h2>
      <div class="ai-highlight-grid">
        <article class="ai-highlight-card">
          <h3>Production</h3>
          <p>Organizing furniture, component and project-based production in Vietnam.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Material Supply Chain</h3>
          <p>Preparing, coordinating and maintaining continuous material supply in Vietnam.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Independent QC</h3>
          <p>Quality control separated from factories to reduce defects before export shipment.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Warehousing in Vietnam</h3>
          <p>Storing goods, materials and orders to support recurring export shipment plans.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Project Operations</h3>
          <p>Tracking schedule, samples, standards, technical feedback and coordination between parties.</p>
        </article>
        <article class="ai-highlight-card">
          <h3>Trade Finance</h3>
          <p>Supporting production cash flow and supply planning for suitable orders.</p>
        </article>
      </div>
    </section>
  </section>
`.trim();

const ABOUT_COMPANY_INFO_SECTION_EN = `
  <section id="company-info" class="ai-section ai-company-intro ai-company-overview ai-company-info-section">
    <details class="ai-company-info-accordion" open>
      <summary>
        <span>Company Information</span>
      </summary>
      <div class="ai-company-info-body">
        <p class="ai-company-info-lead">
          ANSLIFE JSC is a manufacturing, supply chain and export partner in Vietnam for international buyers in furniture, components and materials. We have representative offices in Ha Noi, Ho Chi Minh City, Tokyo, Singapore and Hong Kong.
        </p>

        <dl class="ai-company-info-list">
          <div class="ai-company-info-row">
            <dt>Company Name</dt>
            <dd>ANSLIFE JSC</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Role</dt>
            <dd>Manufacturing, supply chain and export partner in Vietnam</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Business Scope</dt>
            <dd>Furniture production, components, material supply chain, warehousing, independent QC, project operations, trade finance, packing and export shipment</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Markets Served</dt>
            <dd>Japan, United States, EU and international buyers</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Vietnam Offices</dt>
            <dd>Ha Noi, Ho Chi Minh City</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>International Offices</dt>
            <dd>Tokyo, Singapore, Hong Kong</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Website</dt>
            <dd><a href="https://anslife.net" target="_blank" rel="noopener noreferrer">anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Email</dt>
            <dd><a href="mailto:global@anslife.net">global@anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Supported Languages</dt>
            <dd>English, Japanese, Vietnamese, Korean</dd>
          </div>
        </dl>

        <p class="ai-company-info-cta">
          Buyers can contact ANSLIFE JSC to send product requirements, drawings, samples, materials or warehousing and export shipment plans from Vietnam.
        </p>
      </div>
    </details>

    <div class="ai-company-office-section">
      <header class="ai-company-office-header">
        <h2>Offices & Contact</h2>
        <p>
          ANSLIFE JSC operates representative offices in Vietnam, Japan, Singapore and Hong Kong to support international buyers with requirement exchange, project management, standards control and supply chain organization from Vietnam.
        </p>
      </header>

      <div class="ai-company-office-grid">
        <article class="ai-company-office-card">
          <h3>VIETNAM</h3>
          <dl>
            <div>
              <dt>Representative Offices</dt>
              <dd>Ha Noi, Ho Chi Minh City</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.vn">contact@anslife.vn</a></dd>
            </div>
            <div>
              <dt>Phone</dt>
              <dd><a href="tel:+84901827555">+84 901 827 555</a></dd>
            </div>
            <div>
              <dt>Hanoi Address</dt>
              <dd>5th Floor, Zen Tower, No. 12 Khuat Duy Tien Street, Thanh Xuan Trung Ward, Thanh Xuan District, Ha Noi, Viet Nam</dd>
            </div>
            <div>
              <dt>Ho Chi Minh City Address</dt>
              <dd>No. 63 Hiep Thanh 1 Residential Area, Phu Loi Ward, Ho Chi Minh City, Viet Nam</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>JAPAN</h3>
          <dl>
            <div>
              <dt>Representative Office</dt>
              <dd>Tokyo, Japan</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.jp">contact@anslife.jp</a></dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>Address updating</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>SINGAPORE</h3>
          <dl>
            <div>
              <dt>Representative Office</dt>
              <dd>Singapore</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.sg">contact@anslife.sg</a></dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>Address updating</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>HONG KONG</h3>
          <dl>
            <div>
              <dt>Representative Office</dt>
              <dd>Hong Kong</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.hk">contact@anslife.hk</a></dd>
            </div>
            <div>
              <dt>Address</dt>
              <dd>Address updating</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
`.trim();

const ABOUT_COMPANY_INFO_SECTION_JP = `
  <section id="company-info" class="ai-section ai-company-intro ai-company-overview ai-company-info-section">
    <details class="ai-company-info-accordion" open>
      <summary>
        <span>会社情報</span>
      </summary>
      <div class="ai-company-info-body">
        <p class="ai-company-info-lead">
          ANSLIFE JSCは、家具、部材、素材分野の海外バイヤー向けに、ベトナムにおける製造、サプライチェーン、輸出を支援するパートナーです。Ha Noi、Ho Chi Minh City、東京、シンガポール、香港に代表拠点があります。
        </p>

        <dl class="ai-company-info-list">
          <div class="ai-company-info-row">
            <dt>会社名</dt>
            <dd>ANSLIFE JSC</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>役割</dt>
            <dd>ベトナムにおける製造、サプライチェーン、輸出パートナー</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>事業領域</dt>
            <dd>家具製造、部材、素材サプライチェーン、倉庫保管、独立QC、プロジェクト運営、貿易金融、梱包、輸出出荷</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>対応市場</dt>
            <dd>日本、米国、EU、海外バイヤー</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>ベトナム拠点</dt>
            <dd>Ha Noi、Ho Chi Minh City</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>海外拠点</dt>
            <dd>東京、シンガポール、香港</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>ウェブサイト</dt>
            <dd><a href="https://anslife.net" target="_blank" rel="noopener noreferrer">anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Email</dt>
            <dd><a href="mailto:global@anslife.net">global@anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>対応言語</dt>
            <dd>英語、日本語、ベトナム語、韓国語</dd>
          </div>
        </dl>

        <p class="ai-company-info-cta">
          バイヤーは、製品要件、図面、サンプル、素材、またはベトナムからの倉庫保管・輸出出荷計画についてANSLIFE JSCへお問い合わせいただけます。
        </p>
      </div>
    </details>

    <div class="ai-company-office-section">
      <header class="ai-company-office-header">
        <h2>拠点・お問い合わせ</h2>
        <p>
          ANSLIFE JSCは、ベトナム、日本、シンガポール、香港に代表拠点を置き、海外バイヤーの要件確認、プロジェクト管理、基準管理、ベトナムからのサプライチェーン構築を支援します。
        </p>
      </header>

      <div class="ai-company-office-grid">
        <article class="ai-company-office-card">
          <h3>ベトナム</h3>
          <dl>
            <div>
              <dt>代表オフィス</dt>
              <dd>Ha Noi、Ho Chi Minh City</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.vn">contact@anslife.vn</a></dd>
            </div>
            <div>
              <dt>電話番号</dt>
              <dd><a href="tel:+84901827555">+84 901 827 555</a></dd>
            </div>
            <div>
              <dt>ハノイ住所</dt>
              <dd>5th Floor, Zen Tower, No. 12 Khuat Duy Tien Street, Thanh Xuan Trung Ward, Thanh Xuan District, Ha Noi, Viet Nam</dd>
            </div>
            <div>
              <dt>ホーチミン市住所</dt>
              <dd>No. 63 Hiep Thanh 1 Residential Area, Phu Loi Ward, Ho Chi Minh City, Viet Nam</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>日本</h3>
          <dl>
            <div>
              <dt>代表オフィス</dt>
              <dd>東京、日本</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.jp">contact@anslife.jp</a></dd>
            </div>
            <div>
              <dt>住所</dt>
              <dd>更新中</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>シンガポール</h3>
          <dl>
            <div>
              <dt>代表オフィス</dt>
              <dd>シンガポール</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.sg">contact@anslife.sg</a></dd>
            </div>
            <div>
              <dt>住所</dt>
              <dd>更新中</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>香港</h3>
          <dl>
            <div>
              <dt>代表オフィス</dt>
              <dd>香港</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.hk">contact@anslife.hk</a></dd>
            </div>
            <div>
              <dt>住所</dt>
              <dd>更新中</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
`.trim();

const ABOUT_COMPANY_INFO_SECTION_KR = `
  <section id="company-info" class="ai-section ai-company-intro ai-company-overview ai-company-info-section">
    <details class="ai-company-info-accordion" open>
      <summary>
        <span>회사 정보</span>
      </summary>
      <div class="ai-company-info-body">
        <p class="ai-company-info-lead">
          ANSLIFE JSC는 가구, 부품, 소재 분야의 해외 바이어를 위한 베트남 내 생산, 공급망, 수출 파트너입니다. Ha Noi, Ho Chi Minh City, 도쿄, 싱가포르, 홍콩에 대표 거점을 두고 있습니다.
        </p>

        <dl class="ai-company-info-list">
          <div class="ai-company-info-row">
            <dt>회사명</dt>
            <dd>ANSLIFE JSC</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>역할</dt>
            <dd>베트남 내 생산, 공급망 및 수출 파트너</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>사업 영역</dt>
            <dd>가구 생산, 부품, 소재 공급망, 창고 보관, 독립 QC, 프로젝트 운영, 무역 금융, 포장 및 수출 선적</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>대상 시장</dt>
            <dd>일본, 미국, EU 및 해외 바이어</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>베트남 사무소</dt>
            <dd>Ha Noi, Ho Chi Minh City</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>해외 사무소</dt>
            <dd>도쿄, 싱가포르, 홍콩</dd>
          </div>
          <div class="ai-company-info-row">
            <dt>웹사이트</dt>
            <dd><a href="https://anslife.net" target="_blank" rel="noopener noreferrer">anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>Email</dt>
            <dd><a href="mailto:global@anslife.net">global@anslife.net</a></dd>
          </div>
          <div class="ai-company-info-row">
            <dt>지원 언어</dt>
            <dd>영어, 일본어, 베트남어, 한국어</dd>
          </div>
        </dl>

        <p class="ai-company-info-cta">
          바이어는 제품 요구사항, 도면, 샘플, 소재 또는 베트남 내 창고 보관 및 수출 선적 계획에 대해 ANSLIFE JSC에 문의할 수 있습니다.
        </p>
      </div>
    </details>

    <div class="ai-company-office-section">
      <header class="ai-company-office-header">
        <h2>사무소 및 연락처</h2>
        <p>
          ANSLIFE JSC는 베트남, 일본, 싱가포르, 홍콩에 대표 거점을 운영하며 해외 바이어의 요구사항 협의, 프로젝트 관리, 기준 관리 및 베트남 기반 공급망 구축을 지원합니다.
        </p>
      </header>

      <div class="ai-company-office-grid">
        <article class="ai-company-office-card">
          <h3>베트남</h3>
          <dl>
            <div>
              <dt>대표 사무소</dt>
              <dd>Ha Noi, Ho Chi Minh City</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.vn">contact@anslife.vn</a></dd>
            </div>
            <div>
              <dt>전화번호</dt>
              <dd><a href="tel:+84901827555">+84 901 827 555</a></dd>
            </div>
            <div>
              <dt>하노이 주소</dt>
              <dd>5th Floor, Zen Tower, No. 12 Khuat Duy Tien Street, Thanh Xuan Trung Ward, Thanh Xuan District, Ha Noi, Viet Nam</dd>
            </div>
            <div>
              <dt>호치민시 주소</dt>
              <dd>No. 63 Hiep Thanh 1 Residential Area, Phu Loi Ward, Ho Chi Minh City, Viet Nam</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>일본</h3>
          <dl>
            <div>
              <dt>대표 사무소</dt>
              <dd>도쿄, 일본</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.jp">contact@anslife.jp</a></dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>업데이트 중</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>싱가포르</h3>
          <dl>
            <div>
              <dt>대표 사무소</dt>
              <dd>싱가포르</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.sg">contact@anslife.sg</a></dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>업데이트 중</dd>
            </div>
          </dl>
        </article>

        <article class="ai-company-office-card">
          <h3>홍콩</h3>
          <dl>
            <div>
              <dt>대표 사무소</dt>
              <dd>홍콩</dd>
            </div>
            <div>
              <dt>Email</dt>
              <dd><a href="mailto:contact@anslife.hk">contact@anslife.hk</a></dd>
            </div>
            <div>
              <dt>주소</dt>
              <dd>업데이트 중</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
`.trim();

const ABOUT_WORKING_STANDARDS_SECTION_VN = `
  <section id="working-standards" class="ai-section ai-working-standards">
    <header class="ai-working-standards-header">
      <h1>Tiêu chuẩn làm việc của ANSLIFE</h1>
      <p>
        ANSLIFE JSC làm việc dựa trên nguyên tắc rõ ràng, có thể kiểm soát và có thể truy xuất. Mỗi dự án được quản lý dựa trên mẫu đã duyệt, bản vẽ kỹ thuật, tiêu chuẩn vật liệu, checklist kiểm hàng, tiêu chuẩn đóng gói và kế hoạch giao hàng đã thống nhất.
      </p>
    </header>

    <div class="ai-working-standards-list">
      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">01</span>
          <span>Kiểm soát mẫu đã duyệt</span>
        </summary>
        <p>Mẫu sản phẩm, cấu kiện, màu sắc, vật liệu và bề mặt hoàn thiện được lưu giữ làm tiêu chuẩn đối chiếu trong quá trình sản xuất và kiểm hàng.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">02</span>
          <span>Quản lý bản vẽ kỹ thuật</span>
        </summary>
        <p>Bản vẽ, kích thước, kết cấu, thông số vật liệu và yêu cầu kỹ thuật được ghi nhận rõ ràng trước khi triển khai sản xuất.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">03</span>
          <span>Quản lý vật liệu & màu sắc</span>
        </summary>
        <p>Vật liệu, mẫu sơn, bảng màu, veneer, plywood, foam, vải, phụ kiện và vật liệu đóng gói được kiểm soát theo tiêu chuẩn của từng buyer và từng thị trường.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">04</span>
          <span>Checklist kiểm hàng</span>
        </summary>
        <p>Mỗi đơn hàng có checklist kiểm tra riêng, bao gồm kích thước, kết cấu, độ hoàn thiện, màu sắc, độ ẩm, đóng gói, nhãn mác và tình trạng hàng trước khi xuất.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">05</span>
          <span>QC độc lập</span>
        </summary>
        <p>Hệ thống QC của ANSLIFE hoạt động độc lập với bộ máy sản xuất, nhằm đảm bảo việc kiểm tra được thực hiện khách quan theo tiêu chuẩn đã thống nhất.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">06</span>
          <span>Tiêu chuẩn đóng gói</span>
        </summary>
        <p>Quy cách đóng gói, carton mark, nhãn hàng, mã sản phẩm, pallet, container loading hoặc LCL/FCL shipment được kiểm soát theo yêu cầu của từng buyer.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">07</span>
          <span>Báo cáo minh bạch</span>
        </summary>
        <p>Các vấn đề phát sinh trong sản xuất, kiểm hàng hoặc xuất hàng được ghi nhận, báo cáo và trao đổi rõ ràng để có phương án xử lý kịp thời.</p>
      </details>
    </div>
  </section>
`.trim();

const ABOUT_WORKING_STANDARDS_SECTION_EN = `
  <section id="working-standards" class="ai-section ai-working-standards">
    <header class="ai-working-standards-header">
      <h1>Our Working Standards</h1>
      <p>
        ANSLIFE JSC works based on clear, controllable and traceable standards. Each project is managed through approved samples, technical drawings, material standards, inspection checklists, packing requirements and agreed shipment plans.
      </p>
    </header>

    <div class="ai-working-standards-list">
      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">01</span>
          <span>Approved Sample Control</span>
        </summary>
        <p>Approved product samples, components, colors, materials and finishes are maintained as reference standards for production and inspection.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">02</span>
          <span>Technical Drawing Management</span>
        </summary>
        <p>Drawings, dimensions, structures, material specifications and technical requirements are clearly recorded before production starts.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">03</span>
          <span>Material & Color Management</span>
        </summary>
        <p>Materials, color panels, paint samples, veneer, plywood, foam, fabric, accessories and packing materials are controlled according to buyer and market requirements.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">04</span>
          <span>Order-Specific Inspection Checklist</span>
        </summary>
        <p>Each order follows its own inspection checklist covering dimensions, structure, finish, color, moisture, packing, labeling and pre-shipment condition.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">05</span>
          <span>Independent QC</span>
        </summary>
        <p>ANSLIFE's QC system operates independently from the production team to ensure objective inspection based on agreed standards.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">06</span>
          <span>Packing & Shipment Standards</span>
        </summary>
        <p>Packing method, carton marks, labels, item codes, pallets, container loading and LCL/FCL shipment requirements are controlled according to each buyer's standard.</p>
      </details>

      <details class="ai-working-standard-card">
        <summary>
          <span class="ai-working-standard-number">07</span>
          <span>Transparent Reporting</span>
        </summary>
        <p>Issues during production, inspection or shipment are recorded, reported and discussed clearly so that corrective actions can be taken in time.</p>
      </details>
    </div>
  </section>
`.trim();

const AI_PAGE_CONTENT: Record<string, string> = {
  'about-anslife': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/ai/about-anslife.svg" alt="Về ANSLIFE" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    ANSLIFE là một hệ thống sản xuất và xuất khẩu nội thất được xây dựng tại Việt Nam, tập trung vào tổ chức chuỗi
    sản xuất, kiểm soát chất lượng và kết nối các nguồn lực trong ngành.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>OEM / ODM</strong>
      <p>Mô hình triển khai linh hoạt theo thiết kế của khách hàng hoặc đồng phát triển mẫu.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Đa thị trường</strong>
      <p>Tư duy vận hành theo tiêu chuẩn xuất khẩu và khác biệt yêu cầu từng khu vực.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Chuỗi khép kín</strong>
      <p>Kết nối nguyên liệu, sản xuất, QC và hậu cần để giảm rủi ro tiến độ.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Cải tiến liên tục</strong>
      <p>Ra quyết định dựa trên dữ liệu lỗi, lead time và phản hồi sau giao hàng.</p>
    </article>
  </div>

  ${ABOUT_COMPANY_INTRO_SECTION_VN}

  ${ABOUT_COMPANY_INFO_SECTION_VN}

  ${ABOUT_WORKING_STANDARDS_SECTION_VN}

  <section id="vision-mission" class="ai-section ai-vision-mission">
    <div class="ai-vision-shell">
      <header class="ai-vision-header">
        <h2>Tầm nhìn, sứ mệnh</h2>
        <span class="ai-vision-header-line" aria-hidden="true"></span>
      </header>

      <article class="ai-vision-panel">
        <div class="ai-vision-side">
          <h3>Tầm nhìn</h3>
          <span class="ai-vision-side-line" aria-hidden="true"></span>
        </div>

        <div class="ai-vision-content ai-vision-content-grid">
          <div class="ai-vision-copy">
            <p>
              ANSLIFE hướng tới việc trở thành một hệ thống sản xuất có thể kiểm soát ở quy mô toàn cầu, kết nối khách
              hàng quốc tế với mạng lưới sản xuất tại nhiều quốc gia.
            </p>
            <p>
              Chúng tôi không chỉ xây dựng năng lực sản xuất tại Việt Nam, mà từng bước mở rộng hệ sinh thái sang các
              khu vực khác, nơi các nhà máy được tổ chức và vận hành theo cùng một tiêu chuẩn, cùng một hệ thống kiểm
              soát và cùng một phương thức quản lý dữ liệu.
            </p>
          </div>

          <div class="ai-vision-copy">
            <p>ANSLIFE định hướng trở thành một nền tảng sản xuất xuyên biên giới, nơi:</p>
            <ul class="ai-vision-bullet-list">
              <li>Chất lượng được kiểm soát bằng hệ thống, không phụ thuộc vào vị trí địa lý</li>
              <li>Dữ liệu sản xuất được quản lý tập trung</li>
              <li>Các nhà máy tại nhiều quốc gia có thể vận hành theo cùng một chuẩn</li>
            </ul>
            <p class="ai-vision-copy-note">
              Trong dài hạn, ANSLIFE hướng tới việc xây dựng một mạng lưới sản xuất toàn cầu có tính ổn định cao, linh
              hoạt về công suất và minh bạch trong toàn bộ quá trình vận hành.
            </p>
          </div>
        </div>
      </article>

      <article class="ai-vision-panel ai-vision-panel-mission">
        <div class="ai-vision-side">
          <h3>Sứ mệnh</h3>
          <span class="ai-vision-side-line" aria-hidden="true"></span>
        </div>

        <div class="ai-vision-content">
          <p class="ai-vision-mission-lead">
            Sứ mệnh của ANSLIFE là xây dựng một hệ thống sản xuất minh bạch, có thể kiểm soát và có khả năng mở rộng
            toàn cầu, giúp kết nối hiệu quả giữa khách hàng quốc tế và mạng lưới sản xuất.
          </p>

          <div class="ai-vision-benefit-grid">
            <article class="ai-vision-benefit">
              <h4>
                Đối với khách hàng
              </h4>
              <ul>
                <li>Tiếp cận hệ thống sản xuất tại nhiều quốc gia thông qua một nền tảng thống nhất</li>
                <li>Giảm rủi ro trong quá trình sản xuất xuyên biên giới</li>
                <li>Đảm bảo chất lượng và tiến độ ở quy mô lớn</li>
              </ul>
            </article>

            <article class="ai-vision-benefit">
              <h4>
                Đối với nhà máy
              </h4>
              <ul>
                <li>Tham gia vào mạng lưới sản xuất toàn cầu</li>
                <li>Vận hành theo tiêu chuẩn quốc tế</li>
                <li>Nâng cao năng lực sản xuất và quản trị</li>
              </ul>
            </article>

            <article class="ai-vision-benefit">
              <h4>
                Đối với hệ sinh thái
              </h4>
              <ul>
                <li>Kết nối các nguồn lực sản xuất tại nhiều quốc gia</li>
                <li>Chuẩn hóa quy trình và hệ thống kiểm soát chất lượng</li>
                <li>Tạo ra một nền tảng sản xuất có khả năng mở rộng linh hoạt theo nhu cầu thị trường</li>
              </ul>
            </article>
          </div>
        </div>
      </article>
    </div>
  </section>

  <section id="core-values" class="ai-section ai-core-values">
    <div class="ai-core-shell">
      <header class="ai-core-header">
        <h2>Giá trị cốt lõi</h2>
        <span class="ai-core-header-accent" aria-hidden="true"></span>
        <div class="ai-core-header-meta">
          <p class="ai-core-kicker">GIÁ TRỊ CỐT LÕI</p>
          <span class="ai-core-header-rule" aria-hidden="true"></span>
        </div>
      </header>

      <div class="ai-core-grid">
        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">01</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M52 16l18 7v18c0 14-9 22-18 27-9-5-18-13-18-27V23z" />
                <path d="M44 41l6 6 10-12" />
                <path d="M12 48h24v30H12z" />
                <path d="M19 48v-6h10v6" />
                <path d="M18 58h12M18 64h9M18 70h10" />
                <circle cx="74" cy="66" r="10" />
                <path d="M74 52v4M74 76v4M60 66h4M84 66h4M64 56l3 3M81 73l3 3M64 76l3-3M81 59l3-3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>KIỂM SOÁT</h3>
            <p>ANSLIFE vận hành dựa trên nguyên tắc kiểm soát, không phụ thuộc vào cảm tính hay cá nhân.</p>
            <p>Mọi hoạt động trong sản xuất đều được:</p>
            <ul>
              <li>Thiết lập quy trình rõ ràng</li>
              <li>Kiểm tra theo từng công đoạn</li>
              <li>Ghi nhận dữ liệu thực tế</li>
            </ul>
            <p class="ai-core-card-note">
              Chất lượng không được đảm bảo bằng lời nói, mà bằng hệ thống kiểm soát xuyên suốt.
            </p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">02</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="24" cy="26" rx="12" ry="6" />
                <path d="M12 26v24c0 3 5 6 12 6s12-3 12-6V26" />
                <path d="M12 38c0 3 5 6 12 6s12-3 12-6M12 50c0 3 5 6 12 6s12-3 12-6" />
                <path d="M46 40h8v10h-8zM58 30h8v20h-8z" />
                <path d="M48 68l8-8 8 7 10-10" />
                <circle cx="48" cy="68" r="2.3" />
                <circle cx="56" cy="60" r="2.3" />
                <circle cx="64" cy="67" r="2.3" />
                <circle cx="74" cy="57" r="2.3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>DỮ LIỆU</h3>
            <p>Mọi thông tin trong hệ thống đều được ghi nhận, lưu trữ và sử dụng để phục vụ vận hành.</p>
            <div class="ai-core-split-list">
              <div class="ai-core-split-col">
                <p>ANSLIFE xây dựng hệ thống dữ liệu bao gồm:</p>
                <ul>
                  <li>Dữ liệu sản xuất</li>
                  <li>Dữ liệu QC</li>
                  <li>Dữ liệu tiến độ</li>
                  <li>Dữ liệu lỗi</li>
                </ul>
              </div>
              <div class="ai-core-split-col">
                <p>Dữ liệu không chỉ để lưu trữ, mà để:</p>
                <ul>
                  <li>Phân tích</li>
                  <li>Cải tiến</li>
                  <li>Đưa ra quyết định</li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">03</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 16h30l14 14v46H24z" />
                <path d="M54 16v14h14M34 38h24M34 48h24M34 58h20" />
                <circle cx="62" cy="66" r="10" />
                <path d="M62 54v4M62 74v4M50 66h4M70 66h4M54 58l3 3M67 71l3 3M54 74l3-3M67 61l3-3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>TIÊU CHUẨN</h3>
            <p>ANSLIFE chuẩn hóa toàn bộ quy trình để đảm bảo sự đồng nhất trong hệ thống.</p>
            <p>Dù sản xuất tại bất kỳ nhà máy nào, mọi hoạt động đều phải tuân theo:</p>
            <ul>
              <li>Tiêu chuẩn kỹ thuật</li>
              <li>Tiêu chuẩn chất lượng</li>
              <li>Quy trình vận hành</li>
            </ul>
            <p class="ai-core-card-note">Tiêu chuẩn là nền tảng để hệ thống có thể mở rộng.</p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">04</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="24" cy="46" r="6" />
                <circle cx="48" cy="40" r="8" />
                <circle cx="72" cy="46" r="6" />
                <path d="M16 72v-8c0-5 4-9 8-9s8 4 8 9v8" />
                <path d="M38 72v-10c0-6 5-11 10-11s10 5 10 11v10" />
                <path d="M64 72v-8c0-5 4-9 8-9s8 4 8 9v8" />
                <path d="M16 34c8-12 24-18 40-16 8 1 14 4 20 8" stroke-dasharray="4 4" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>MINH BẠCH</h3>
            <p>ANSLIFE xây dựng môi trường làm việc minh bạch giữa:</p>
            <div class="ai-core-split-list">
              <div class="ai-core-split-col">
                <ul>
                  <li>Khách hàng</li>
                  <li>Nhà máy</li>
                  <li>Hệ thống vận hành</li>
                </ul>
                <p>Thông tin được:</p>
              </div>
              <div class="ai-core-split-col">
                <ul>
                  <li>Ghi nhận rõ ràng</li>
                  <li>Cập nhật liên tục</li>
                  <li>Chia sẻ theo đúng phạm vi</li>
                </ul>
              </div>
            </div>
            <p class="ai-core-card-note">Minh bạch giúp giảm rủi ro và tăng độ tin cậy trong hợp tác.</p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">05</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 64V42l8 6 8-12v10h16v18H32z" />
                <path d="M38 58h6M48 58h6" />
                <circle cx="48" cy="52" r="28" />
                <path d="M44 22h10l-2-6M25 44l-4 10-4-3M71 58l4-10 4 3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>LINH HOẠT</h3>
            <p>ANSLIFE vận hành hệ sinh thái nhiều nhà máy, cho phép:</p>
            <ul>
              <li>Điều chỉnh công suất</li>
              <li>Phân bổ sản xuất</li>
              <li>Thích ứng với yêu cầu khác nhau của từng thị trường</li>
            </ul>
            <p class="ai-core-card-note">
              Sự linh hoạt được xây dựng trên nền tảng hệ thống, không phải xử lý tình huống ngẫu nhiên.
            </p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">06</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 42l10-18 16 8-10 18zM78 42l-10-18-16 8 10 18z" />
                <path d="M35 50l8-7c3-2 7-2 10 0l8 7" />
                <path d="M30 54l10 10c2 2 5 2 7 0l6-6" />
                <path d="M66 54L56 64c-2 2-5 2-7 0" />
                <path d="M24 52l12 12M72 52L60 64" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>HỢP TÁC</h3>
            <p>
              ANSLIFE không xem nhà máy và khách hàng là đối tượng giao dịch, mà là đối tác trong cùng một hệ thống.
            </p>
            <p>Chúng tôi hướng tới:</p>
            <ul>
              <li>Hợp tác lâu dài</li>
              <li>Phát triển cùng nhau</li>
              <li>Nâng cao tiêu chuẩn chung</li>
            </ul>
          </div>
        </article>
      </div>

      <div class="ai-core-footer-notes">
        <article class="ai-core-note-card">
          <span class="ai-core-note-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 24l22-10 22 10" />
              <path d="M14 24h36M18 24v18M28 24v18M38 24v18M48 24v18M12 46h40" />
            </svg>
          </span>
          <p>ANSLIFE vận hành như một hệ thống, nơi mọi giá trị được xây dựng từ kiểm soát, dữ liệu và tiêu chuẩn.</p>
        </article>
        <article class="ai-core-note-card is-trailing">
          <span class="ai-core-note-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="21" cy="25" r="5" />
              <circle cx="32" cy="21" r="6" />
              <circle cx="43" cy="25" r="5" />
              <path d="M13 44v-3c0-4 3-7 7-7h2c4 0 7 3 7 7v3" />
              <path d="M24 44v-4c0-4.5 3.5-8 8-8s8 3.5 8 8v4" />
              <path d="M35 14l2 3 3-2" />
            </svg>
          </span>
          <p>Hệ sinh thái chỉ bền vững khi tất cả các bên cùng phát triển.</p>
        </article>
      </div>
    </div>
  </section>

  <section id="production-philosophy" class="ai-section ai-operating-philosophy">
    <h2>Triết lý vận hành</h2>
    <p class="ai-op-kicker">TRIẾT LÝ VẬN HÀNH ANSLIFE</p>
    <p class="ai-op-subtitle">(Chất lượng là ưu tiên số 1 – Giá là ưu tiên số 2)</p>

    <article class="ai-op-core">
      <h3>1. Nguyên tắc cốt lõi</h3>
      <p>Chúng tôi không cạnh tranh bằng việc trở thành đơn vị rẻ nhất.</p>
      <p>Chúng tôi cạnh tranh bằng việc trở thành đơn vị đáng tin cậy nhất.</p>
      <p class="ai-op-emphasis">Chất lượng là ưu tiên hàng đầu. Giá chỉ đứng sau.</p>
    </article>

    <div class="ai-op-grid">
      <article class="ai-op-card">
        <h3>2. “Chất lượng” tại ANSLIFE là gì</h3>
        <p>Chất lượng không phải là lời nói.</p>
        <p>Chất lượng là một hệ thống.</p>
        <p>Tại ANSLIFE, chất lượng được đảm bảo thông qua:</p>
        <ul>
          <li>Lựa chọn nguyên liệu nghiêm ngặt (chỉ sử dụng gỗ đạt chuẩn)</li>
          <li>Hệ thống kiểm soát chất lượng nhiều lớp</li>
          <li>Tách biệt các công đoạn sản xuất (hàng trắng / hoàn thiện)</li>
          <li>Kiểm tra trước sản xuất và trong quá trình sản xuất</li>
          <li>Sản xuất dư để phòng ngừa rủi ro giao hàng</li>
        </ul>
        <p class="ai-op-note-mini">Chúng tôi không tập trung sửa lỗi.</p>
        <p class="ai-op-note-mini">Chúng tôi thiết kế hệ thống để lỗi không có cơ hội xảy ra.</p>
      </article>

      <article class="ai-op-card">
        <h3>3. Cam kết của chúng tôi</h3>
        <p>Chúng tôi ưu tiên:</p>
        <ol class="ai-op-priority">
          <li>Không có lỗi nghiêm trọng</li>
          <li>Không trễ tiến độ giao hàng</li>
          <li>Không lặp lại lỗi</li>
        </ol>
        <p>Chỉ khi đảm bảo được các điều trên, chúng tôi mới xem xét đến tối ưu chi phí.</p>
      </article>

      <article class="ai-op-card">
        <h3>4. Cách tiếp cận về giá</h3>
        <p>Giá không phải là công cụ cạnh tranh chính của chúng tôi.</p>
        <p>Chúng tôi duy trì mức giá:</p>
        <ul>
          <li>Ổn định</li>
          <li>Hợp lý</li>
          <li>Tương xứng với chất lượng</li>
        </ul>
        <p>Chúng tôi không theo đuổi lợi nhuận ngắn hạn bằng cách đánh đổi sự ổn định dài hạn.</p>
      </article>

      <article class="ai-op-card">
        <h3>5. Hợp tác dài hạn</h3>
        <p>Chúng tôi tin rằng một mối quan hệ bền vững được xây dựng dựa trên:</p>
        <ul>
          <li>Niềm tin</li>
          <li>Sự ổn định</li>
          <li>Tính minh bạch</li>
        </ul>
        <p>Mục tiêu của chúng tôi là trở thành đối tác:</p>
        <ul>
          <li>Luôn cung cấp chất lượng ổn định</li>
          <li>Giảm thiểu rủi ro vận hành cho khách hàng</li>
          <li>Đồng hành và phát triển cùng khách hàng trong dài hạn</li>
        </ul>
      </article>
    </div>

    <article class="ai-op-philosophy">
      <h3>6. Triết lý của chúng tôi</h3>
      <p>Chúng tôi không tối đa hóa lợi nhuận trên từng đơn hàng.</p>
      <p>Chúng tôi tối đa hóa niềm tin theo thời gian.</p>
      <p>Bởi vì:</p>
      <div class="ai-op-formula">
        <p>Niềm tin tạo ra sản lượng.</p>
        <p>Sản lượng tạo ra sự ổn định.</p>
        <p>Sự ổn định tạo ra giá trị bền vững.</p>
      </div>
    </article>

    <p class="ai-op-signoff">
      <strong>ANSLIFE</strong>
      <span>Vận hành bằng hệ thống. Phát triển bằng sự bền vững.</span>
    </p>
  </section>

  <section id="organization" class="ai-section ai-operating-philosophy">
    <h2>Cơ cấu tổ chức</h2>
    <p class="ai-op-kicker">CƠ CẤU TỔ CHỨC ANSLIFE</p>
    <p class="ai-op-subtitle">Vận hành theo hệ sinh thái sản xuất được kiểm soát tập trung.</p>

    <div class="ai-op-grid">
      <article class="ai-op-card">
        <h3>1. Mô hình tổ chức</h3>
        <p>ANSLIFE không vận hành theo mô hình nhà máy truyền thống.</p>
        <p>Chúng tôi vận hành theo mô hình hệ sinh thái sản xuất được kiểm soát tập trung.</p>
        <p>Cấu trúc tổ chức được chia thành 3 lớp chính:</p>
        <ul>
          <li>Lớp điều hành hệ thống</li>
          <li>Lớp kiểm soát & dữ liệu</li>
          <li>Lớp thực thi sản xuất</li>
        </ul>
        <p class="ai-op-emphasis">Mỗi lớp có vai trò rõ ràng, kết nối với nhau thông qua hệ thống dữ liệu.</p>
      </article>

      <article class="ai-op-card">
        <h3>2. Lớp điều hành hệ thống</h3>
        <p>Đây là trung tâm kiểm soát toàn bộ hoạt động của ANSLIFE.</p>
        <p>Bao gồm:</p>
        <ul>
          <li>Ban điều hành</li>
          <li>Bộ phận chiến lược & vận hành</li>
          <li>Bộ phận thương mại (Sales / Trading)</li>
        </ul>
        <p>Vai trò:</p>
        <ul>
          <li>Định hướng sản xuất</li>
          <li>Tiếp nhận và phân bổ đơn hàng</li>
          <li>Quản lý khách hàng</li>
          <li>Điều phối hệ sinh thái nhà máy</li>
        </ul>
      </article>

      <article class="ai-op-card">
        <h3>3. Lớp kiểm soát & dữ liệu</h3>
        <p>Đây là lõi vận hành của hệ thống ANSLIFE.</p>
        <p>Bao gồm:</p>
        <ul>
          <li>Hệ thống QC (tổ trưởng QC, QC nhân sự)</li>
          <li>Data Controller / Data Admin</li>
          <li>Bộ phận thu thập dữ liệu nhà máy</li>
        </ul>
        <p>Vai trò:</p>
        <ul>
          <li>Kiểm soát chất lượng theo từng công đoạn</li>
          <li>Ghi nhận và xử lý dữ liệu sản xuất</li>
          <li>Chuẩn hóa và phân phối dữ liệu</li>
          <li>Đảm bảo dữ liệu cung cấp cho sale và khách hàng là dữ liệu đã được kiểm soát</li>
        </ul>
        <p class="ai-op-note-mini">Hệ thống này giúp loại bỏ sai lệch thông tin, giảm rủi ro vận hành và đảm bảo tính minh bạch.</p>
      </article>

      <article class="ai-op-card">
        <h3>4. Lớp thực thi sản xuất</h3>
        <p>Bao gồm:</p>
        <ul>
          <li>Nhà máy ANSLIFE</li>
          <li>Các nhà máy đối tác (vệ tinh)</li>
        </ul>
        <p>Vai trò:</p>
        <ul>
          <li>Thực hiện sản xuất theo tiêu chuẩn ANSLIFE</li>
          <li>Tuân thủ quy trình và hệ thống QC</li>
          <li>Cập nhật dữ liệu sản xuất theo thời gian thực</li>
        </ul>
        <p class="ai-op-note-mini">Mỗi nhà máy là một phần của hệ sinh thái, không hoạt động độc lập mà được kiểm soát trong cùng một hệ thống.</p>
      </article>

      <article class="ai-op-card">
        <h3>5. Khách hàng & đối tác trong hệ thống</h3>
        <p>ANSLIFE mở rộng hệ thống để khách hàng và đối tác cùng tham gia.</p>
        <p>Bao gồm:</p>
        <ul>
          <li>Khách hàng (Buyer)</li>
          <li>Nhà máy / đối tác sản xuất</li>
          <li>Đối tác thương mại</li>
        </ul>
        <p>Vai trò:</p>
        <ul>
          <li>Truy cập dữ liệu theo phạm vi được cấp quyền</li>
          <li>Theo dõi tiến độ đơn hàng</li>
          <li>Tương tác trực tiếp trên hệ thống</li>
        </ul>
      </article>

      <article class="ai-op-card">
        <h3>6. Kết nối hệ thống</h3>
        <p>Toàn bộ cơ cấu tổ chức được kết nối thông qua nền tảng dữ liệu chung.</p>
        <p>Mỗi vai trò trong hệ thống đều:</p>
        <ul>
          <li>Có tài khoản riêng</li>
          <li>Có phạm vi dữ liệu riêng</li>
          <li>Có quyền thao tác riêng</li>
        </ul>
        <p>Dữ liệu được luân chuyển theo nguyên tắc:</p>
        <div class="ai-op-formula">
          <p>→ tạo tại hiện trường</p>
          <p>→ kiểm soát tại hệ thống</p>
          <p>→ phân phối theo cấp quyền</p>
        </div>
      </article>

      <article class="ai-op-card">
        <h3>7. Định hướng phát triển</h3>
        <p>Cơ cấu tổ chức của ANSLIFE được thiết kế để:</p>
        <ul>
          <li>Dễ mở rộng quy mô</li>
          <li>Tích hợp nhiều nhà máy</li>
          <li>Phục vụ nhiều thị trường khác nhau</li>
        </ul>
        <p>Mô hình này cho phép ANSLIFE:</p>
        <ul>
          <li>Không phụ thuộc vào một nhà máy</li>
          <li>Tăng trưởng mà vẫn giữ được kiểm soát</li>
          <li>Duy trì chất lượng ổn định trên toàn hệ thống</li>
        </ul>
      </article>
    </div>

    <p class="ai-op-signoff">
      <strong>ANSLIFE</strong>
      <span>Tăng trưởng có kiểm soát trên nền tảng dữ liệu thống nhất.</span>
    </p>
  </section>

  <section id="team" class="ai-section ai-company-intro ai-team-company-intro">
    <div class="ai-company-hero">
      <div class="ai-company-copy">
        <h1 class="ai-company-title">Đội ngũ</h1>
        <p class="ai-company-lead">
          ANSLIFE xây dựng đội ngũ vận hành xoay quanh hệ sinh thái sản xuất, không chỉ là nhân sự nội bộ mà bao gồm
          toàn bộ lực lượng tham gia vào chuỗi giá trị.
        </p>
        <div class="ai-company-keyline">
          <strong>Chúng tôi không tách rời con người khỏi hệ thống.</strong>
        </div>
        <p>Mỗi cá nhân là một phần trong hệ vận hành chung.</p>
      </div>
    </div>

    <div class="ai-company-panels">
      <article class="ai-company-panel">
        <h3>1. Đội ngũ vận hành trong hệ sinh thái sản xuất</h3>
        <p>Đội ngũ ANSLIFE bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Bộ phận điều hành và thương mại</li>
          <li>Hệ thống kiểm soát chất lượng (QC)</li>
          <li>Bộ phận dữ liệu và vận hành hệ thống</li>
          <li>Bộ phận R&amp;D phát triển sản phẩm</li>
          <li>Bộ phận pháp chế</li>
          <li>Nhân sự tại các nhà máy trong hệ sinh thái</li>
        </ul>
      </article>

      <article class="ai-company-panel">
        <h3>2. Đội ngũ QC - Trung tâm của hệ thống</h3>
        <p>Hệ thống QC là lực lượng quan trọng nhất trong vận hành của ANSLIFE.</p>
        <p>Đội ngũ QC bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Tổ trưởng QC</li>
          <li>Nhân sự QC tại các nhà máy</li>
          <li>Nhân sự kiểm tra theo từng công đoạn</li>
        </ul>
        <p class="ai-company-divider-note">Vai trò:</p>
        <ul class="ai-company-plain-list">
          <li>Kiểm tra chất lượng theo tiêu chuẩn</li>
          <li>Ghi nhận dữ liệu sản xuất thực tế</li>
          <li>Phát hiện và kiểm soát lỗi từ sớm</li>
          <li>Đảm bảo sản phẩm đạt yêu cầu trước khi xuất hàng</li>
        </ul>
        <p class="ai-company-divider-note">
          ANSLIFE không phụ thuộc vào kinh nghiệm cá nhân. Chúng tôi xây dựng QC dựa trên hệ thống.
        </p>
      </article>
      <article class="ai-company-panel">
        <h3>3. Đội ngũ dữ liệu và kiểm soát</h3>
        <p>Bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Data Controller</li>
          <li>Data Admin</li>
          <li>Bộ phận thu thập dữ liệu nhà máy</li>
        </ul>
        <p class="ai-company-divider-note">Vai trò:</p>
        <ul class="ai-company-plain-list">
          <li>Tiếp nhận dữ liệu từ hiện trường</li>
          <li>Kiểm tra và chuẩn hóa dữ liệu</li>
          <li>Phân loại, gắn nhãn và lưu trữ dữ liệu</li>
          <li>Cung cấp dữ liệu sạch cho sale và khách hàng</li>
        </ul>
        <p class="ai-company-divider-note">Bộ phận này đảm bảo dữ liệu chính xác, thông tin minh bạch và vận hành không phụ thuộc cảm tính.</p>
      </article>

      <article class="ai-company-panel">
        <h3>4. Đội ngũ R&amp;D - Hỗ trợ phát triển sản phẩm</h3>
        <p>ANSLIFE sở hữu đội ngũ R&amp;D hoạt động theo hướng support sản xuất thực tế, không phải thiết kế thuần ý tưởng.</p>
        <p class="ai-company-divider-note">Vai trò:</p>
        <ul class="ai-company-plain-list">
          <li>Hỗ trợ khách hàng phát triển sản phẩm</li>
          <li>Làm việc từ bản vẽ, hình ảnh hoặc mẫu thực tế</li>
          <li>Đề xuất điều chỉnh về kết cấu, vật liệu, màu sơn và khả năng sản xuất</li>
        </ul>
        <p class="ai-company-divider-note">R&amp;D giúp rút ngắn thời gian phát triển mẫu, tăng tính khả thi khi sản xuất và tối ưu chi phí mà vẫn giữ chất lượng.</p>
      </article>

      <article class="ai-company-panel">
        <h3>5. Đội ngũ Sale / Trading</h3>
        <p>Đội ngũ thương mại của ANSLIFE vận hành dựa trên dữ liệu thực tế.</p>
        <p class="ai-company-divider-note">Vai trò:</p>
        <ul class="ai-company-plain-list">
          <li>Làm việc trực tiếp với khách hàng quốc tế</li>
          <li>Tiếp nhận yêu cầu sản xuất</li>
          <li>Theo dõi tiến độ đơn hàng qua hệ thống</li>
          <li>Cung cấp thông tin đã được kiểm soát</li>
        </ul>
        <p class="ai-company-divider-note">Sale không sử dụng dữ liệu cảm tính. Mọi thông tin đều dựa trên dữ liệu đã được xác nhận.</p>
      </article>

      <article class="ai-company-panel">
        <h3>6. Đội ngũ pháp chế</h3>
        <p>ANSLIFE xây dựng bộ phận pháp chế nhằm đảm bảo sự an toàn và minh bạch trong toàn bộ hoạt động thương mại.</p>
        <p class="ai-company-divider-note">Vai trò:</p>
        <ul class="ai-company-plain-list">
          <li>Kiểm soát hợp đồng thương mại</li>
          <li>Đảm bảo quyền lợi của các bên tham gia</li>
          <li>Tuân thủ quy định pháp lý tại từng thị trường</li>
          <li>Hỗ trợ xử lý các vấn đề phát sinh trong giao dịch quốc tế</li>
        </ul>
        <p class="ai-company-divider-note">Bộ phận pháp chế giúp giảm thiểu rủi ro pháp lý, tăng độ tin cậy với đối tác quốc tế và đảm bảo hoạt động xuất khẩu ổn định.</p>
      </article>

      <article class="ai-company-panel">
        <h3>7. Đội ngũ nhà máy trong hệ sinh thái</h3>
        <p>ANSLIFE vận hành 01 nhà máy chính và hệ thống các nhà máy vệ tinh.</p>
        <p>Tổng lực lượng sản xuất lên đến hàng nghìn nhân sự.</p>
        <p class="ai-company-divider-note">Các nhà máy:</p>
        <ul class="ai-company-plain-list">
          <li>Sản xuất theo tiêu chuẩn ANSLIFE</li>
          <li>Tuân thủ hệ thống QC</li>
          <li>Cập nhật dữ liệu sản xuất theo thời gian thực</li>
        </ul>
      </article>

      <article class="ai-company-panel">
        <h3>8. Phát triển đội ngũ</h3>
        <p>ANSLIFE xây dựng đội ngũ thông qua:</p>
        <ul class="ai-company-plain-list">
          <li>Đào tạo thực tế trong sản xuất</li>
          <li>Tiêu chuẩn hóa quy trình</li>
          <li>Tích lũy dữ liệu vận hành</li>
        </ul>
        <p class="ai-company-divider-note">Chúng tôi hướng tới đội ngũ:</p>
        <ul class="ai-company-plain-list">
          <li>Hiểu hệ thống</li>
          <li>Làm việc theo tiêu chuẩn</li>
          <li>Vận hành ổn định trong dài hạn</li>
        </ul>
      </article>

      <article class="ai-company-panel">
        <h3>9. Cách ANSLIFE nhìn nhận con người</h3>
        <p>Tại ANSLIFE, con người không vận hành độc lập. Con người vận hành trong hệ thống.</p>
        <p class="ai-company-divider-note">Giá trị của đội ngũ nằm ở khả năng:</p>
        <ul class="ai-company-plain-list">
          <li>Phối hợp</li>
          <li>Tuân thủ tiêu chuẩn</li>
          <li>Vận hành theo dữ liệu</li>
        </ul>
      </article>
    </div>
  </section>

  <section id="anslife-ecosystem" class="ai-section ai-company-intro ai-team-company-intro">
    <div class="ai-company-hero">
      <div class="ai-company-copy">
        <h1 class="ai-company-title">Hệ sinh thái ANSLIFE</h1>
        <p class="ai-company-lead">
          ANSLIFE không vận hành như một nhà máy đơn lẻ. Chúng tôi xây dựng một hệ sinh thái sản xuất được kiểm soát
          tập trung.
        </p>
        <div class="ai-company-keyline">
          <strong>Tất cả được vận hành trên cùng một nền tảng.</strong>
        </div>
      </div>
    </div>

    <div class="ai-company-panels">
      <article class="ai-company-panel">
        <h3>1. Khái niệm hệ sinh thái</h3>
        <p>Hệ sinh thái ANSLIFE là sự kết nối giữa:</p>
        <ul class="ai-company-plain-list">
          <li>Hệ thống nhà máy</li>
          <li>Hệ thống kiểm soát chất lượng</li>
          <li>Hệ thống dữ liệu</li>
          <li>Hệ thống thương mại toàn cầu</li>
        </ul>
      </article>

      <article class="ai-company-panel">
        <h3>2. Hệ thống sản xuất</h3>
        <p>ANSLIFE vận hành:</p>
        <ul class="ai-company-plain-list">
          <li>01 nhà máy chính</li>
          <li>Hệ thống các nhà máy vệ tinh</li>
        </ul>
        <p class="ai-company-divider-note">Các nhà máy trong hệ sinh thái:</p>
        <ul class="ai-company-plain-list">
          <li>Được lựa chọn theo tiêu chuẩn</li>
          <li>Được đánh giá và kiểm soát định kỳ</li>
          <li>Sản xuất theo quy trình thống nhất</li>
        </ul>
        <p class="ai-company-divider-note">Mô hình này cho phép mở rộng công suất linh hoạt, giảm phụ thuộc vào một đơn vị sản xuất và tối ưu chi phí, tiến độ.</p>
      </article>

      <article class="ai-company-panel">
        <h3>3. Hệ thống kiểm soát chất lượng</h3>
        <p>QC là lõi của hệ sinh thái ANSLIFE.</p>
        <p>Hệ thống QC bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Kiểm tra nguyên liệu đầu vào</li>
          <li>Kiểm tra trong quá trình sản xuất</li>
          <li>Kiểm tra trước khi xuất hàng</li>
        </ul>
        <p class="ai-company-divider-note">Dữ liệu QC được ghi nhận trực tiếp tại hiện trường, lưu trữ trên hệ thống và kiểm soát nhiều lớp trước khi sử dụng.</p>
        <p class="ai-company-divider-note">Chất lượng không được đảm bảo bằng lời nói. Chất lượng được đảm bảo bằng hệ thống kiểm soát.</p>
      </article>

      <article class="ai-company-panel">
        <h3>4. Hệ thống dữ liệu</h3>
        <p>ANSLIFE xây dựng nền tảng dữ liệu để kết nối toàn bộ hệ sinh thái.</p>
        <p>Dữ liệu bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Tiến độ sản xuất</li>
          <li>Hình ảnh công đoạn</li>
          <li>Báo cáo QC</li>
          <li>Tài liệu kỹ thuật</li>
          <li>Lịch giao hàng</li>
        </ul>
        <p class="ai-company-divider-note">Dữ liệu được cập nhật theo thời gian thực, kiểm soát trước khi chia sẻ và phân quyền theo từng tài khoản.</p>
        <p class="ai-company-divider-note">Hệ thống dữ liệu giúp giảm phụ thuộc vào con người, tăng tính minh bạch và hỗ trợ ra quyết định nhanh.</p>
      </article>

      <article class="ai-company-panel">
        <h3>5. Hệ thống thương mại toàn cầu</h3>
        <p>ANSLIFE kết nối hệ sinh thái sản xuất với thị trường quốc tế.</p>
        <p>Các thị trường chính:</p>
        <ul class="ai-company-plain-list">
          <li>Hoa Kỳ</li>
          <li>Nhật Bản</li>
          <li>Hàn Quốc</li>
          <li>Châu Âu</li>
        </ul>
        <p class="ai-company-divider-note">Chúng tôi không chỉ bán sản phẩm, mà cung cấp giải pháp sản xuất phù hợp với từng thị trường.</p>
      </article>

      <article class="ai-company-panel">
        <h3>6. Hệ thống R&amp;D</h3>
        <p>ANSLIFE phát triển sản phẩm dựa trên khả năng sản xuất thực tế.</p>
        <p>Hệ thống R&amp;D:</p>
        <ul class="ai-company-plain-list">
          <li>Hỗ trợ khách hàng từ bản vẽ, hình ảnh hoặc mẫu</li>
          <li>Điều chỉnh thiết kế để phù hợp sản xuất</li>
          <li>Tối ưu kết cấu, vật liệu và chi phí</li>
        </ul>
        <p class="ai-company-divider-note">R&amp;D không tách rời sản xuất. R&amp;D là một phần của hệ sinh thái sản xuất.</p>
      </article>

      <article class="ai-company-panel">
        <h3>7. Hệ thống pháp chế &amp; kiểm soát rủi ro</h3>
        <p>ANSLIFE xây dựng hệ thống pháp chế để đảm bảo hoạt động toàn cầu ổn định.</p>
        <p>Bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Kiểm soát hợp đồng</li>
          <li>Tuân thủ quy định từng thị trường</li>
          <li>Bảo vệ quyền lợi các bên tham gia</li>
        </ul>
        <p class="ai-company-divider-note">Hệ thống này giúp giảm rủi ro pháp lý, tăng độ tin cậy với đối tác và đảm bảo hoạt động dài hạn.</p>
      </article>

      <article class="ai-company-panel">
        <h3>8. Hệ thống đối tác</h3>
        <p>Hệ sinh thái ANSLIFE không chỉ bao gồm khách hàng, mà còn bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Nhà máy</li>
          <li>Nhà cung cấp nguyên vật liệu</li>
          <li>Đối tác logistics</li>
          <li>Đối tác thương mại</li>
        </ul>
        <p class="ai-company-divider-note">Tất cả đối tác được đánh giá, được kiểm soát và được tích hợp vào hệ thống.</p>
      </article>

      <article class="ai-company-panel">
        <h3>9. Nền tảng công nghệ</h3>
        <p>ANSLIFE sử dụng nền tảng website làm trung tâm vận hành.</p>
        <p>Hệ thống cho phép:</p>
        <ul class="ai-company-plain-list">
          <li>QC upload dữ liệu trực tiếp</li>
          <li>Nhà máy cập nhật tiến độ</li>
          <li>Sale theo dõi đơn hàng</li>
          <li>Khách hàng truy cập thông tin</li>
        </ul>
        <p class="ai-company-divider-note">Mỗi tài khoản có quyền truy cập riêng, có phạm vi dữ liệu riêng và làm việc trên cùng một hệ thống.</p>
      </article>
    </div>

    <div class="ai-company-two-col">
      <article class="ai-company-block">
        <h3>10. Khả năng mở rộng</h3>
        <p>Hệ sinh thái ANSLIFE được thiết kế để:</p>
        <ul>
          <li>Mở rộng thêm nhà máy</li>
          <li>Mở rộng thị trường</li>
          <li>Tăng công suất sản xuất</li>
        </ul>
        <p class="ai-company-divider-note">Mà vẫn:</p>
        <ul>
          <li>Giữ được kiểm soát</li>
          <li>Giữ được chất lượng</li>
          <li>Giữ được tính minh bạch</li>
        </ul>
      </article>

      <article class="ai-company-block">
        <h3>Kết luận</h3>
        <p>ANSLIFE không xây dựng một nhà máy lớn.</p>
        <p>Chúng tôi xây dựng một hệ sinh thái sản xuất có thể mở rộng.</p>
        <p>ANSLIFE kết nối sản xuất, dữ liệu và thương mại thành một hệ thống thống nhất.</p>
        <p class="ai-company-divider-note">
          <strong>ANSLIFE không phải là nhà cung cấp.</strong>
          <strong>ANSLIFE là nền tảng điều phối và kiểm soát sản xuất.</strong>
        </p>
      </article>
    </div>
  </section>

  <section id="development-history" class="ai-section ai-company-intro ai-team-company-intro">
    <div class="ai-company-hero">
      <div class="ai-company-copy">
        <h1 class="ai-company-title">Lịch sử phát triển</h1>
        <p class="ai-company-lead">
          Từ một đơn vị thiết kế, ANSLIFE đã phát triển thành một hệ sinh thái sản xuất và xuất khẩu.
        </p>
        <div class="ai-company-keyline">
          <strong>ANSLIFE phát triển theo hệ thống, không theo quy mô đơn lẻ.</strong>
        </div>
      </div>
    </div>

    <div class="ai-company-panels">
      <article class="ai-company-panel">
        <h3>1. Giai đoạn khởi nguồn (2012 - 2017)</h3>
        <p>ANSLIFE bắt đầu từ một văn phòng thiết kế kiến trúc và nội thất vào năm 2012.</p>
        <p>Hoạt động chính trong giai đoạn này:</p>
        <ul class="ai-company-plain-list">
          <li>Thiết kế kiến trúc và nội thất</li>
          <li>Quản lý các dự án dân dụng và thương mại</li>
          <li>Triển khai các công trình như nhà ở, khách sạn, cửa hàng</li>
        </ul>
        <p class="ai-company-divider-note">Giai đoạn này giúp ANSLIFE hiểu sâu về sản phẩm nội thất từ góc độ sử dụng thực tế, tích lũy kinh nghiệm triển khai dự án và xây dựng nền tảng về thiết kế, vật liệu.</p>
      </article>

      <article class="ai-company-panel">
        <h3>2. Bước chuyển sang sản xuất &amp; xuất khẩu (từ 2018)</h3>
        <p>Năm 2018, ANSLIFE bắt đầu tham gia vào lĩnh vực sản xuất và xuất khẩu nội thất.</p>
        <p>Đây là bước chuyển quan trọng:</p>
        <ul class="ai-company-plain-list">
          <li>Từ thiết kế sang sản xuất</li>
          <li>Từ thị trường nội địa sang thị trường quốc tế</li>
        </ul>
        <p class="ai-company-divider-note">ANSLIFE bắt đầu tiếp cận các tiêu chuẩn quốc tế, làm việc với khách hàng nước ngoài và xây dựng hệ thống sản xuất phục vụ xuất khẩu.</p>
      </article>

      <article class="ai-company-panel">
        <h3>3. Xây dựng hệ thống sản xuất</h3>
        <p>Trong quá trình phát triển, ANSLIFE không lựa chọn xây dựng một nhà máy đơn lẻ.</p>
        <p>Thay vào đó, chúng tôi phát triển:</p>
        <ul class="ai-company-plain-list">
          <li>Hệ thống nhà máy chính</li>
          <li>Hệ thống nhà máy vệ tinh</li>
        </ul>
        <p class="ai-company-divider-note">Đi kèm với đó là hệ thống kiểm soát chất lượng, hệ thống dữ liệu sản xuất và quy trình vận hành tiêu chuẩn.</p>
        <p class="ai-company-divider-note">Mục tiêu: mở rộng năng lực sản xuất, giữ kiểm soát chất lượng, đảm bảo tính linh hoạt.</p>
      </article>

      <article class="ai-company-panel">
        <h3>4. Phát triển hệ sinh thái</h3>
        <p>ANSLIFE dần mở rộng từ một đơn vị sản xuất thành một hệ sinh thái.</p>
        <p>Hệ sinh thái bao gồm:</p>
        <ul class="ai-company-plain-list">
          <li>Sản xuất</li>
          <li>Kiểm soát chất lượng</li>
          <li>Dữ liệu vận hành</li>
          <li>Thương mại quốc tế</li>
        </ul>
        <p class="ai-company-divider-note">Chúng tôi không chỉ sản xuất sản phẩm, mà xây dựng hệ thống để kết nối các nhà máy, kiểm soát chất lượng và phục vụ khách hàng toàn cầu.</p>
      </article>

      <article class="ai-company-panel">
        <h3>5. Giai đoạn hiện tại</h3>
        <p>Hiện tại, ANSLIFE vận hành:</p>
        <ul class="ai-company-plain-list">
          <li>Hệ thống sản xuất với nhiều nhà máy</li>
          <li>Đội ngũ QC và kiểm soát dữ liệu</li>
          <li>Mạng lưới khách hàng quốc tế</li>
        </ul>
        <p class="ai-company-divider-note">Các thị trường chính: Hoa Kỳ, Nhật Bản, Hàn Quốc, Châu Âu.</p>
        <p class="ai-company-divider-note">ANSLIFE tập trung vào ổn định chất lượng, mở rộng hệ sinh thái và nâng cao năng lực vận hành.</p>
      </article>

      <article class="ai-company-panel">
        <h3>6. Định hướng tương lai</h3>
        <p>ANSLIFE hướng tới:</p>
        <ul class="ai-company-plain-list">
          <li>Mở rộng hệ sinh thái sản xuất ra nhiều quốc gia</li>
          <li>Xây dựng hệ thống sản xuất toàn cầu</li>
          <li>Phát triển nền tảng dữ liệu kết nối sản xuất và thương mại</li>
        </ul>
        <p class="ai-company-divider-note">Mục tiêu không chỉ là tăng trưởng, mà là kiểm soát tốt hơn, vận hành hiệu quả hơn và phát triển bền vững hơn.</p>
      </article>
    </div>

    <div class="ai-company-two-col">
      <article class="ai-company-block">
        <h3>Kết luận</h3>
        <p>Từ một đơn vị thiết kế, ANSLIFE đã phát triển thành một hệ sinh thái sản xuất và xuất khẩu.</p>
        <p>Mỗi giai đoạn phát triển đều hướng tới một mục tiêu chung:</p>
        <ul>
          <li>Xây dựng một hệ thống vận hành ổn định</li>
          <li>Có thể mở rộng</li>
          <li>Kiểm soát được</li>
        </ul>
        <p class="ai-company-divider-note">
          <strong>ANSLIFE không phát triển theo quy mô đơn lẻ.</strong>
          <strong>ANSLIFE phát triển theo hệ thống.</strong>
        </p>
      </article>

      <article class="ai-company-block">
        <h3>Thông điệp cốt lõi</h3>
        <p>
          <strong>ANSLIFE phát triển từ nền tảng thiết kế, trưởng thành trong sản xuất và đang mở rộng như một hệ sinh
          thái sản xuất toàn cầu.</strong>
        </p>
      </article>
    </div>
  </section>
</div>
`.trim(),

  'manufacturing-ecosystem': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/about/organization-hero-real.jpg" alt="Hệ sinh thái sản xuất ANSLIFE vận hành theo mô hình điều phối tập trung" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    ANSLIFE xây dựng một hệ sinh thái sản xuất linh hoạt, kết hợp giữa trung tâm sản xuất chủ lực và mạng lưới sản xuất liên kết,
    nhằm đảm bảo năng lực sản xuất ổn định, kiểm soát chất lượng chặt chẽ và khả năng đáp ứng các đơn hàng quốc tế.
  </p>
  <p class="ai-intro">
    Trong mô hình này, ANSLIFE giữ vai trò điều phối sản xuất, thiết lập tiêu chuẩn kỹ thuật, kiểm soát quy trình vận hành
    và sở hữu hệ thống kiểm định chất lượng; các nhà máy đối tác tham gia thực hiện các công đoạn theo chuẩn đã thống nhất.
    Toàn hệ sinh thái được tổ chức để duy trì tính minh bạch chuỗi cung ứng, độ ổn định chất lượng và khả năng phục vụ các thị trường
    như Nhật Bản, Hoa Kỳ, châu Âu và Hàn Quốc.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>Điều phối tập trung</strong>
      <p>ANSLIFE quản trị kỹ thuật, chất lượng và tiến độ trên toàn hệ sinh thái.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Năng lực linh hoạt</strong>
      <p>Mở rộng công suất theo quy mô đơn hàng và nhu cầu từng thị trường.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Chuỗi cung ứng minh bạch</strong>
      <p>Kiểm soát đầu vào, truy xuất lô nguyên liệu và theo dõi chất lượng xuyên suốt.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Phục vụ đa thị trường</strong>
      <p>Đáp ứng tiêu chuẩn sản xuất và yêu cầu giao hàng của nhiều khu vực quốc tế.</p>
    </article>
  </div>

  <div class="ai-eco-image-strip">
    <figure>
      <img
        src="/assets/about/ecosystem-hero-real.jpg"
        alt="Không gian vận hành sản xuất nội thất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Nhóm kỹ thuật và vận hành phối hợp tại nhà máy"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="https://images.pexels.com/photos/236698/pexels-photo-236698.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Dây chuyền và kho vận trong hệ thống sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <section id="production-system" class="ai-section ai-production-system">
    <div class="ai-ps-hero">
      <img
        src="/assets/about/company-intro-hero-real.jpg"
        alt="Hệ thống sản xuất nội thất ANSLIFE"
        loading="lazy"
        decoding="async"
      />
      <div class="ai-ps-hero-overlay">
        <p class="ai-ps-kicker">ANSLIFE FACTORY NETWORK</p>
        <h2>Hệ thống sản xuất</h2>
        <p>ANSLIFE vận hành hệ thống sản xuất không chỉ là một nhà máy, mà là một mạng lưới sản xuất được kiểm soát.</p>
        <ul class="ai-ps-hero-bullets">
          <li>Điều phối tập trung</li>
          <li>Sản xuất phân tán</li>
          <li>Kiểm soát thống nhất</li>
        </ul>
      </div>
    </div>

    <div class="ai-ps-card-grid">
      <article class="ai-ps-card">
        <img
          class="ai-ps-card-icon"
          src="/assets/production-system/card-anslife-factory.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <h3>Nhà máy ANSLIFE</h3>
        <p>Trung tâm kỹ thuật và kiểm soát vận hành theo tiêu chuẩn đồng bộ.</p>
        <a href="./anslife-factory" class="ai-ps-link">Xem chi tiết</a>
      </article>

      <article class="ai-ps-card">
        <img
          class="ai-ps-card-icon"
          src="/assets/production-system/card-satellite-factory.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <h3>Nhà máy vệ tinh</h3>
        <p>Mở rộng sản xuất theo năng lực ngành hàng và kế hoạch giao hàng.</p>
        <a href="./satellite-factories" class="ai-ps-link">Xem chi tiết</a>
      </article>

      <article class="ai-ps-card">
        <img
          class="ai-ps-card-icon"
          src="/assets/production-system/card-operating-model.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <h3>Mô hình vận hành</h3>
        <p>Điều phối QC - Data - tiến độ dưới một hệ thống kiểm soát thống nhất.</p>
        <a href="./ecosystem-operating-model" class="ai-ps-link">Xem chi tiết</a>
      </article>
    </div>

    <div class="ai-ps-flow" role="list" aria-label="Quy trình vận hành hệ thống sản xuất">
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-customer.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>Khách hàng</span>
      </div>
      <span class="ai-ps-flow-arrow" aria-hidden="true">→</span>
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-anslife.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>ANSLIFE</span>
      </div>
      <span class="ai-ps-flow-arrow" aria-hidden="true">→</span>
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-factory-network.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>Factory Network</span>
      </div>
      <span class="ai-ps-flow-arrow" aria-hidden="true">→</span>
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-qc.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>QC</span>
      </div>
      <span class="ai-ps-flow-arrow" aria-hidden="true">→</span>
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-data.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>Data</span>
      </div>
      <span class="ai-ps-flow-arrow" aria-hidden="true">→</span>
      <div class="ai-ps-flow-item" role="listitem">
        <img
          class="ai-ps-flow-icon"
          src="/assets/production-system/flow-export.svg"
          alt=""
          loading="lazy"
          decoding="async"
        />
        <span>Xuất khẩu</span>
      </div>
    </div>

    <div class="ai-ps-quote">
      <p><strong>ANSLIFE</strong> không mở rộng bằng cách xây nhà máy lớn hơn.</p>
      <p><strong>ANSLIFE</strong> mở rộng bằng cách xây dựng một <strong>hệ thống kiểm soát</strong>.</p>
    </div>
  </section>

  <section id="anslife-factory" class="ai-section">
  <h2>Nhà máy ANSLIFE</h2>
  <p>
    Nhà máy ANSLIFE là trung tâm sản xuất chủ lực, đóng vai trò "control tower" cho toàn bộ hệ sinh thái.
    Đây là nơi tiếp nhận yêu cầu kỹ thuật từ khách hàng, chuyển hóa thành tiêu chuẩn sản xuất thực thi và
    kiểm soát chất lượng trước khi nhân rộng sang mạng lưới nhà máy liên kết.
  </p>
  <p>
    Khác với mô hình chỉ gia công đơn thuần, ANSLIFE tổ chức vận hành theo chuỗi tích hợp: kỹ thuật, kế hoạch,
    QC và dữ liệu cùng làm việc trên một framework chung để đảm bảo sản phẩm giao đúng chuẩn, đúng tiến độ,
    đúng hồ sơ truy xuất.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/core-values-data-real.jpg"
        alt="Trung tâm điều phối vận hành tại nhà máy ANSLIFE"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/ecosystem-production-real.jpg"
        alt="Khu vực sản xuất và triển khai công đoạn tại nhà máy"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Engineering Hub</strong>
      <p>Phân tích bản vẽ, chuẩn hóa BOM và chốt quy chuẩn kỹ thuật trước sản xuất.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Quality Hub</strong>
      <p>Thiết lập checkpoint bắt buộc theo công đoạn để giảm lỗi lặp và lỗi truyền line.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Planning Hub</strong>
      <p>Điều phối năng lực line theo lịch xuất hàng và mức ưu tiên từng đơn hàng.</p>
    </article>
  </div>

  <h3>Chu trình vận hành tại nhà máy trung tâm</h3>
  <ol>
    <li>Review kỹ thuật và xác nhận mức khả thi sản xuất.</li>
    <li>Lập kế hoạch vật tư, công đoạn và QC gate theo timeline đơn hàng.</li>
    <li>Giám sát thực thi theo dữ liệu hiện trường và điều chỉnh sớm khi có lệch chuẩn.</li>
    <li>Nghiệm thu trước xuất theo checklist chất lượng, đóng gói và chứng từ.</li>
  </ol>

  <p>
    Nhờ cấu trúc này, nhà máy ANSLIFE vừa là nơi sản xuất, vừa là nơi chuẩn hóa hệ thống cho toàn mạng lưới.
  </p>
</section>

  <section id="satellite-factories" class="ai-section">
  <h2>Nhà máy vệ tinh</h2>
  <p>
    Mạng lưới nhà máy vệ tinh giúp ANSLIFE mở rộng công suất theo mùa vụ và theo nhóm ngành hàng,
    mà không đánh đổi độ ổn định chất lượng. Mỗi nhà máy liên kết tham gia theo năng lực đã thẩm định,
    vận hành dưới cùng một bộ tiêu chuẩn kỹ thuật và cơ chế kiểm soát dữ liệu.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/company-ecosystem-partner-real.jpg"
        alt="Nhà máy vệ tinh tham gia vào hệ sinh thái sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/ecosystem-global-real.jpg"
        alt="Mạng lưới sản xuất liên kết với năng lực giao hàng quốc tế"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Nguyên tắc tích hợp nhà máy vệ tinh</h3>
  <ul>
    <li>Phân vai theo thế mạnh công đoạn: gia công, lắp ráp, hoàn thiện hoặc đóng gói.</li>
    <li>Chỉ triển khai sau khi vượt đánh giá hiện trường và thử nghiệm lô pilot.</li>
    <li>Áp dụng cùng checklist QC và chế độ báo cáo tiến độ theo checkpoint.</li>
    <li>Duy trì cơ chế CAPA chung để xử lý lỗi gốc và ngăn lỗi tái diễn.</li>
  </ul>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Linh hoạt công suất</strong>
      <p>Mở rộng nhanh khi đơn hàng tăng đột biến hoặc theo đợt cao điểm thị trường.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Giảm rủi ro tập trung</strong>
      <p>Hạn chế phụ thuộc một điểm sản xuất duy nhất cho các đơn hàng xuất khẩu lớn.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Đồng bộ tiêu chuẩn</strong>
      <p>Giữ cùng chất lượng đầu ra nhờ điều phối kỹ thuật và QC tập trung.</p>
    </article>
  </div>
</section>

  <section id="ecosystem-operating-model" class="ai-section">
  <h2>Mô hình vận hành hệ sinh thái</h2>
  <p>
    ANSLIFE vận hành theo mô hình "Centralized Control - Distributed Execution":
    trung tâm điều phối chịu trách nhiệm chuẩn kỹ thuật, kế hoạch và chất lượng;
    các nhà máy trong hệ sinh thái thực thi theo phạm vi năng lực đã phân bổ.
  </p>
  <p>
    Cách tiếp cận này học từ các hệ thống sản xuất xuất khẩu quy mô lớn: mở rộng công suất bằng mạng lưới,
    nhưng giữ tính nhất quán bằng tiêu chuẩn, dữ liệu và cơ chế kiểm soát tập trung.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/core-values-operations-real.jpg"
        alt="Đội vận hành phối hợp theo chuẩn hệ thống trong mô hình sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/vision-system-pillars-real.jpg"
        alt="Hệ thống dữ liệu và kiểm soát điều phối sản xuất theo thời gian thực"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>4 trụ cột vận hành</h3>
  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Plan Governance</strong>
      <p>Xác nhận yêu cầu kỹ thuật, timeline và target chất lượng trước khi mở lệnh sản xuất.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Capacity Allocation</strong>
      <p>Phân bổ đơn hàng theo năng lực thật của từng nhà máy để tối ưu OTIF và rủi ro.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Quality Gate</strong>
      <p>Kiểm soát đa lớp theo công đoạn, không đợi đến khâu final mới kiểm lỗi.</p>
    </article>
  </div>

  <h3>Chu kỳ điều hành theo tuần</h3>
  <ol>
    <li>Kick-off đơn hàng: chốt thông số kỹ thuật, BOM và mốc giao hàng.</li>
    <li>Load plan: phân bổ line và năng lực vệ tinh theo mức ưu tiên.</li>
    <li>Execution review: cập nhật sản lượng, tỷ lệ lỗi, độ lệch tiến độ theo ngày.</li>
    <li>Quality review: đóng CAPA cho lỗi trọng yếu và khóa hành động phòng ngừa.</li>
    <li>Shipment readiness: chốt đóng gói, chứng từ và kế hoạch giao nhận.</li>
  </ol>

  <h3>Nhóm KPI kiểm soát</h3>
  <ul>
    <li>OTIF (On-time In-full) theo từng đơn hàng và từng line sản xuất.</li>
    <li>First Pass Yield và tỷ lệ rework theo công đoạn trọng yếu.</li>
    <li>Lead time thực tế so với lead time kế hoạch.</li>
    <li>Tỷ lệ đóng CAPA đúng hạn và tỷ lệ lỗi tái diễn theo tháng.</li>
  </ul>

  <p>
    Nhờ mô hình này, ANSLIFE có thể mở rộng theo chiều rộng mạng lưới nhà máy, nhưng vẫn giữ một chuẩn quản trị chung
    tương đương một hệ thống sản xuất thống nhất.
  </p>
</section>

  <section id="manufacturing-partner-registration" class="ai-section">
  <h2>Đăng ký đối tác sản xuất</h2>
  <p>
    Chương trình đối tác sản xuất được xây dựng để phát triển mạng lưới theo hướng có kiểm soát,
    bảo đảm đối tác mới có thể tham gia đơn hàng xuất khẩu mà vẫn đáp ứng chuẩn hệ thống ngay từ đầu.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/organization-partner-access-real.jpg"
        alt="Đối tác sản xuất làm việc và trao đổi dữ liệu cùng hệ thống ANSLIFE"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/ecosystem-legal-real.jpg"
        alt="Đánh giá tuân thủ và hồ sơ pháp lý cho nhà máy đối tác"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Điều kiện tham gia chương trình</h3>
  <ul>
    <li>Năng lực máy móc, line và nhân sự phù hợp nhóm sản phẩm mục tiêu.</li>
    <li>Khả năng vận hành theo quy trình chất lượng và cơ chế dữ liệu bắt buộc.</li>
    <li>Cam kết tuân thủ tiêu chuẩn kỹ thuật, pháp lý và quy tắc hợp tác dài hạn.</li>
  </ul>

  <h3>Quy trình đánh giá và onboarding</h3>
  <ol>
    <li>Sơ tuyển hồ sơ và xếp hạng mức phù hợp theo ngành hàng.</li>
    <li>Khảo sát thực địa, đối chiếu năng lực vận hành thực tế.</li>
    <li>Chạy thử lô pilot để kiểm chứng chất lượng và lead time.</li>
    <li>Đánh giá CAPA sau pilot và phê duyệt vào danh sách triển khai.</li>
  </ol>

  <p>
    Đối tác đạt chuẩn sẽ được hướng dẫn tài liệu kỹ thuật, checklist QC và cơ chế báo cáo dữ liệu để vận hành đồng bộ với hệ sinh thái.
  </p>
</section>

  <section id="raw-material-zone" class="ai-section">
    <h2>Vùng nguyên liệu</h2>
    <p>
      Nguồn nguyên liệu đóng vai trò quyết định tới độ ổn định chất lượng sản phẩm.
      ANSLIFE hợp tác với các nhà cung cấp phù hợp để đảm bảo nguồn gỗ ổn định và đáp ứng yêu cầu kỹ thuật sản xuất.
    </p>
    <p>
      Trước khi đưa vào sản xuất, nguyên liệu được kiểm tra theo bộ tiêu chí kỹ thuật nhằm đảm bảo phù hợp với tiêu chuẩn hệ thống.
      Chuỗi cung ứng được tổ chức để giữ nhịp sản xuất liên tục, hạn chế thiếu hụt vật tư và giảm rủi ro sai lệch đầu vào.
    </p>

    <div class="ai-eco-image-row">
      <figure>
        <img
          src="https://images.pexels.com/photos/172289/pexels-photo-172289.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Nguồn gỗ nguyên liệu được phân loại trước sản xuất"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure>
        <img
          src="https://images.pexels.com/photos/129731/pexels-photo-129731.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Kho nguyên liệu được tổ chức theo lô và tiêu chuẩn kỹ thuật"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <div class="ai-stat-grid ai-eco-mini-grid">
      <article class="ai-stat-card">
        <strong>Nguồn cung ổn định</strong>
        <p>Phối hợp nhà cung cấp theo kế hoạch sản xuất và lịch giao hàng cụ thể.</p>
      </article>
      <article class="ai-stat-card">
        <strong>Kiểm soát đầu vào</strong>
        <p>Đánh giá độ ẩm, quy cách, bề mặt và các tiêu chí kỹ thuật theo checklist.</p>
      </article>
      <article class="ai-stat-card">
        <strong>Bảo đảm tiến độ</strong>
        <p>Đồng bộ vật tư theo từng đơn hàng để hạn chế gián đoạn công đoạn sản xuất.</p>
      </article>
    </div>

    <ul>
      <li>Kiểm tra lô nguyên liệu trước khi cấp phát cho từng line.</li>
      <li>Lưu mẫu và hồ sơ truy xuất để phục vụ kiểm định khi cần thiết.</li>
      <li>Đánh giá định kỳ nhà cung ứng theo chất lượng, tiến độ và mức độ hợp tác kỹ thuật.</li>
    </ul>
    <p>
      Nhờ cơ chế kiểm soát này, hệ thống có thể đồng bộ chất lượng giữa các nhà máy,
      đồng thời đảm bảo kế hoạch giao hàng không bị ảnh hưởng bởi biến động nguồn cung.
    </p>
  </section>

  <section id="wood-supply" class="ai-section">
  <h2>Nguồn cung gỗ</h2>
  <p>
    Nguồn cung gỗ được quản trị theo triết lý "ổn định trước, giá sau".
    ANSLIFE ưu tiên nhà cung ứng có năng lực giao hàng đều, chất lượng lô hàng nhất quán và dữ liệu truy xuất minh bạch.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/core-values-partnership-real.jpg"
        alt="Nguồn gỗ nguyên liệu được phân loại trước khi cấp phát sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/company-ecosystem-main-real.jpg"
        alt="Hệ thống kho và luân chuyển nguyên liệu trong hệ sinh thái"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Tiêu chí lựa chọn nhà cung ứng</h3>
  <ul>
    <li>Đáp ứng yêu cầu kỹ thuật về quy cách, độ ẩm và tính ổn định vật liệu.</li>
    <li>Có khả năng cung cấp hồ sơ truy xuất theo yêu cầu thị trường xuất khẩu.</li>
    <li>Hiệu suất giao hàng đúng lịch và mức độ phản hồi khi phát sinh vấn đề.</li>
  </ul>

  <p>
    Mỗi lô nguyên liệu đều được đối chiếu tiêu chuẩn trước khi nhập kho để giảm rủi ro lỗi ngay từ nguồn đầu vào.
  </p>
</section>

  <section id="supply-system" class="ai-section">
  <h2>Hệ thống cung ứng</h2>
  <p>
    Hệ thống cung ứng được thiết kế theo mô hình 3 lớp: lập kế hoạch nhu cầu,
    điều phối vật tư theo line và kiểm soát mức dự phòng cho nhóm vật tư rủi ro cao.
    Mục tiêu là giữ nhịp sản xuất ổn định và tối ưu chi phí tồn kho.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/history-foundation-real.jpg"
        alt="Chuỗi cung ứng gắn với tiến độ xuất khẩu"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/organization-control-data-v2-real.jpg"
        alt="Điều phối cung ứng dựa trên dữ liệu vận hành thực tế"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Demand Planning</strong>
      <p>Dự báo nhu cầu vật tư theo forecast và PO đã xác nhận.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Material Allocation</strong>
      <p>Phân bổ theo mã hàng, ưu tiên các line có mốc giao hàng gần.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Risk Buffer</strong>
      <p>Thiết lập mức dự phòng cho vật tư có lead time dài hoặc biến động cao.</p>
    </article>
  </div>

  <ol>
    <li>Lập MRP theo đơn hàng và lịch sản xuất cập nhật hằng tuần.</li>
    <li>Theo dõi inbound, cảnh báo sớm điểm nghẽn và phương án thay thế.</li>
    <li>Điều chỉnh cấp phát theo thay đổi sản lượng, chất lượng và ưu tiên đơn hàng.</li>
  </ol>
</section>

  <section id="material-control" class="ai-section">
  <h2>Kiểm soát nguyên liệu</h2>
  <p>
    Kiểm soát nguyên liệu là lớp phòng ngừa đầu tiên của hệ thống chất lượng.
    ANSLIFE triển khai kiểm tra đầu vào theo tiêu chí kỹ thuật bắt buộc trước khi vật tư được cấp vào line.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/ecosystem-qc-real.jpg"
        alt="Kiểm tra nguyên liệu đầu vào theo checklist kỹ thuật"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/ecosystem-data-real.jpg"
        alt="Dữ liệu kiểm soát nguyên liệu được lưu trữ để truy xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Checklist kiểm soát đầu vào</h3>
  <ul>
    <li>Đo độ ẩm, quy cách và dung sai theo tiêu chuẩn từng mã hàng.</li>
    <li>Đánh giá bề mặt, cấu trúc và trạng thái vật liệu trước khi nhập kho.</li>
    <li>Gắn mã lô và lưu hồ sơ để phục vụ truy xuất khi có sự cố chất lượng.</li>
    <li>Cách ly và xử lý lô không phù hợp theo quy trình CAPA nội bộ.</li>
  </ul>

  <p>
    Dữ liệu đầu vào được dùng như chỉ báo sớm để tối ưu nhà cung ứng và giảm tỷ lệ lỗi truyền sang công đoạn sau.
  </p>
</section>

  <section id="manufacturing-process" class="ai-section">
    <h2>Quy trình sản xuất</h2>
    <p>
      Quy trình sản xuất của ANSLIFE được tổ chức theo các bước tiêu chuẩn nhằm đảm bảo chất lượng sản phẩm
      và tính ổn định trong toàn bộ quá trình sản xuất.
    </p>

    <div class="ai-eco-process-grid">
      <article class="ai-eco-process-item">
        <strong>01. Phát triển mẫu</strong>
        <p>Sản phẩm được phát triển dựa trên bản vẽ kỹ thuật và yêu cầu cụ thể của khách hàng.</p>
      </article>
      <article class="ai-eco-process-item">
        <strong>02. Gia công</strong>
        <p>Các chi tiết được gia công theo tiêu chuẩn kỹ thuật đã xác định và kiểm soát sai số công đoạn.</p>
      </article>
      <article class="ai-eco-process-item">
        <strong>03. Lắp ráp</strong>
        <p>Các bộ phận được lắp thành cấu trúc hoàn chỉnh và kiểm tra độ ổn định kết cấu.</p>
      </article>
      <article class="ai-eco-process-item">
        <strong>04. Sơn hoàn thiện</strong>
        <p>Bề mặt được xử lý theo tiêu chuẩn thẩm mỹ, độ phủ và độ bền theo mẫu duyệt.</p>
      </article>
      <article class="ai-eco-process-item">
        <strong>05. Đóng gói</strong>
        <p>Sản phẩm được đóng gói theo tiêu chuẩn xuất khẩu để bảo đảm an toàn vận chuyển quốc tế.</p>
      </article>
    </div>

    <div class="ai-eco-image-row">
      <figure>
        <img
          src="https://images.pexels.com/photos/5710747/pexels-photo-5710747.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Thợ mộc gia công chi tiết gỗ trong xưởng"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure>
        <img
          src="https://images.pexels.com/photos/5974249/pexels-photo-5974249.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Công đoạn hoàn thiện bề mặt sản phẩm gỗ"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <p>
      Việc chuẩn hóa quy trình giúp thông tin giữa kỹ thuật, sản xuất và QC được truyền đạt nhất quán,
      đồng thời hỗ trợ kiểm soát tiến độ hiệu quả cho cả đơn hàng nhỏ lẫn đơn hàng quy mô lớn.
    </p>
  </section>

  <section id="equipment-technology" class="ai-section">
  <h2>Thiết bị & công nghệ</h2>
  <p>
    Nền tảng thiết bị của ANSLIFE được đầu tư theo hướng phục vụ độ chính xác và tính lặp lại trong sản xuất xuất khẩu.
    Công nghệ không chỉ để tăng tốc, mà để giảm biến động chất lượng giữa các ca và giữa các nhà máy.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/production-philosophy-operations-real.jpg"
        alt="Thiết bị sản xuất vận hành trong nhà máy nội thất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1400&q=80"
        alt="Kỹ sư phân tích giải pháp công nghệ cho công đoạn sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Machine Capability</strong>
      <p>Chọn cấu hình máy theo dung sai kỹ thuật và năng lực sản lượng.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Process Consistency</strong>
      <p>Chuẩn hóa tham số vận hành để giữ đầu ra ổn định theo lô.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Scalable Deployment</strong>
      <p>Dễ nhân rộng setup giữa các line và nhà máy cùng nhóm công đoạn.</p>
    </article>
  </div>

  <p>
    Việc đầu tư thiết bị luôn đi kèm tài liệu công nghệ và cơ chế kiểm soát để chuyển từ năng lực máy móc thành năng lực giao hàng thực tế.
  </p>
</section>

  <section id="production-machinery" class="ai-section">
  <h2>Máy móc sản xuất</h2>
  <p>
    Hệ thống máy móc được phân thành các cụm công đoạn rõ ràng nhằm giảm thời gian chờ,
    hạn chế thao tác trung gian và cải thiện độ ổn định giữa các công đoạn liên tiếp.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/history-global-real.jpg"
        alt="Không gian máy móc trong dây chuyền sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/vision-factory-operations-real.jpg"
        alt="Vận hành dây chuyền theo kế hoạch công suất và tiến độ"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Nhóm máy móc trọng yếu</h3>
  <ul>
    <li>Cụm gia công chính xác cho chi tiết yêu cầu dung sai chặt.</li>
    <li>Cụm lắp ráp hỗ trợ kiểm soát độ vững và độ khít kết cấu.</li>
    <li>Cụm hoàn thiện giúp ổn định ngoại quan và bề mặt sản phẩm.</li>
    <li>Cụm kiểm tra và hiệu chuẩn định kỳ để duy trì độ tin cậy thiết bị.</li>
  </ul>
</section>

  <section id="processing-technology" class="ai-section">
  <h2>Công nghệ gia công</h2>
  <p>
    Công nghệ gia công được chuẩn hóa để giảm sai lệch giữa mẫu duyệt và sản phẩm hàng loạt.
    Trọng tâm là kiểm soát tham số công đoạn, đồ gá và phương pháp kiểm tra ngay tại line.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/production-philosophy-qc-v2-real.jpg"
        alt="Kiểm tra thông số kỹ thuật trong công đoạn gia công"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/history-hero-real.jpg"
        alt="Đội kỹ thuật cải tiến công nghệ gia công theo dữ liệu"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Fixture & Jig</strong>
      <p>Tăng độ lặp lại vị trí và giảm lỗi sai lệch thao tác thủ công.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Parameter Control</strong>
      <p>Khóa tham số quan trọng theo từng mã hàng và vật liệu.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Inline Verification</strong>
      <p>Kiểm tra nhanh tại nguồn để ngăn lỗi truyền qua công đoạn kế tiếp.</p>
    </article>
  </div>
</section>

  <section id="sample-development" class="ai-section">
  <h2>Phát triển mẫu</h2>
  <p>
    Phát triển mẫu là giai đoạn chuyển đổi từ ý tưởng sang tiêu chuẩn sản xuất thực thi.
    Mỗi mẫu đều được đánh giá theo ba trục: kỹ thuật, khả năng sản xuất và hiệu quả chi phí.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="https://images.pexels.com/photos/5710746/pexels-photo-5710746.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Đội ngũ kỹ thuật triển khai mẫu thử tại khu vực phát triển sản phẩm"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/history-platform-real.jpg"
        alt="Kỹ sư rà soát mẫu và phương án sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Stage-gate phát triển mẫu</h3>
  <ol>
    <li>Thiết lập brief kỹ thuật và mục tiêu thị trường.</li>
    <li>Chế thử mẫu, kiểm chứng vật liệu và kết cấu.</li>
    <li>Pilot công đoạn để xác nhận khả năng sản xuất hàng loạt.</li>
    <li>Chốt spec, BOM và tài liệu bàn giao line.</li>
  </ol>

  <p>
    Cách làm này giúp rút ngắn vòng lặp thử-sửa và tăng tỷ lệ triển khai mẫu thành công ở quy mô thương mại.
  </p>
</section>

  <section id="processing" class="ai-section">
  <h2>Gia công</h2>
  <p>
    Công đoạn gia công được kiểm soát theo bản vẽ kỹ thuật và dung sai mục tiêu ngay tại hiện trường,
    đảm bảo chi tiết đầu ra đạt chuẩn trước khi chuyển sang lắp ráp.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/history-scale-real.jpg"
        alt="Thực thi công đoạn gia công tại nhà máy"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/team-data-real.jpg"
        alt="Giám sát chất lượng trong quá trình gia công"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <ul>
    <li>Chuẩn hóa setup máy theo từng mã hàng và từng vật liệu.</li>
    <li>Thực hiện first-piece check đầu ca trước khi chạy sản lượng.</li>
    <li>Kiểm tra kích thước theo tần suất định nghĩa để kiểm soát drift.</li>
    <li>Ghi nhận lỗi công đoạn để tối ưu thao tác và chu kỳ sản xuất.</li>
  </ul>
</section>

  <section id="assembly" class="ai-section">
  <h2>Lắp ráp</h2>
  <p>
    Lắp ráp là công đoạn quyết định độ vững kết cấu và trải nghiệm sử dụng.
    ANSLIFE áp dụng hướng dẫn thao tác chuẩn (SOP) cùng các điểm kiểm soát bắt buộc trước khi chuyển line.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/organization-execution-real.jpg"
        alt="Công đoạn lắp ráp theo tiêu chuẩn thao tác"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/production-philosophy-partnership-real.jpg"
        alt="Phối hợp tổ đội trong giai đoạn lắp ráp"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Structure Check</strong>
      <p>Kiểm tra độ khít, độ cân bằng và độ vững theo checklist kỹ thuật.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Fastener Control</strong>
      <p>Quản lý loại liên kết, lực siết và vị trí lắp theo tiêu chuẩn.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Transfer Gate</strong>
      <p>Chỉ bàn giao sang hoàn thiện khi đạt toàn bộ điều kiện lắp ráp.</p>
    </article>
  </div>
</section>

  <section id="finishing" class="ai-section">
  <h2>Sơn hoàn thiện</h2>
  <p>
    Công đoạn hoàn thiện bề mặt được quản trị theo tiêu chí ngoại quan, độ phủ và độ bền.
    Mục tiêu là giữ tính đồng nhất giữa mẫu duyệt và thành phẩm giao hàng ở quy mô lớn.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/team-hero-real.jpg"
        alt="Kiểm tra ngoại quan và bề mặt trong công đoạn hoàn thiện"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/team-qc-real.jpg"
        alt="Nhân sự QC xác nhận tiêu chí bề mặt trước khi đóng gói"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <ul>
    <li>Đối chiếu mẫu màu master trước khi chạy theo lô sản xuất.</li>
    <li>Kiểm tra độ mịn, độ phủ và lỗi ngoại quan theo mức phân loại.</li>
    <li>Kiểm soát điều kiện công đoạn để giảm lỗi bề mặt tái diễn.</li>
    <li>Nghiệm thu trước chuyển tiếp sang đóng gói xuất khẩu.</li>
  </ul>
</section>

  <section id="packaging" class="ai-section">
  <h2>Đóng gói</h2>
  <p>
    Đóng gói là lớp kiểm soát cuối cùng trước giao hàng, quyết định mức an toàn của sản phẩm trong toàn hành trình logistics.
    ANSLIFE xây dựng phương án đóng gói theo đặc thù sản phẩm, điều kiện container và yêu cầu thị trường đích.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="/assets/about/vision-global-network-real.jpg"
        alt="Chuẩn bị đóng gói phục vụ vận chuyển quốc tế"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="/assets/about/company-ecosystem-system-real.jpg"
        alt="Đối chiếu checklist đóng gói và bàn giao logistics"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <ul>
    <li>Thiết kế bao bì theo mức rủi ro va đập và đặc thù tuyến vận chuyển.</li>
    <li>Kiểm tra nhãn, mã hàng, phụ kiện và tài liệu kèm theo từng kiện.</li>
    <li>Đối chiếu số lượng, tình trạng kiện và sơ đồ xếp container trước xuất.</li>
    <li>Ghi nhận biên bản bàn giao để phục vụ truy xuất sau giao hàng.</li>
  </ul>
</section>

  <section id="standards-certificates" class="ai-section">
    <h2>Tiêu chuẩn & chứng chỉ</h2>
    <p>
      ANSLIFE chú trọng xây dựng hệ thống sản xuất tuân thủ các tiêu chuẩn kỹ thuật và yêu cầu chất lượng của thị trường quốc tế.
      Thông qua hệ thống kiểm định chất lượng cùng sự hợp tác trong toàn chuỗi cung ứng, hệ sinh thái có khả năng đáp ứng
      các tiêu chuẩn từ nhiều thị trường khác nhau.
    </p>

    <div class="ai-eco-image-row">
      <figure>
        <img
          src="https://images.pexels.com/photos/3637786/pexels-photo-3637786.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Đội ngũ kỹ thuật kiểm soát tiêu chuẩn chất lượng"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure>
        <img
          src="https://images.pexels.com/photos/7480448/pexels-photo-7480448.jpeg?auto=compress&cs=tinysrgb&w=1400"
          alt="Kiểm định thông số tấm gỗ trong dây chuyền sản xuất"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <ul>
      <li>Tiêu chuẩn đầu vào áp dụng xuyên suốt cho nguyên liệu và vật tư phụ trợ.</li>
      <li>Tiêu chuẩn công đoạn trong gia công, lắp ráp, hoàn thiện và đóng gói.</li>
      <li>Tiêu chuẩn kiểm tra trước xuất khẩu để bảo đảm tính nhất quán chất lượng.</li>
      <li>Tiêu chí hồ sơ truy xuất và minh bạch dữ liệu chất lượng theo từng lô hàng.</li>
    </ul>

    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Đồng bộ tiêu chuẩn</strong>
        <p>Cùng một bộ tiêu chí kỹ thuật cho trung tâm sản xuất chủ lực và nhà máy liên kết.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Kiểm định đa lớp</strong>
        <p>Kiểm tra chất lượng từ đầu vào đến trước xuất hàng để giảm lỗi lặp lại.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Phục vụ đa thị trường</strong>
        <p>Linh hoạt đáp ứng yêu cầu kỹ thuật của Nhật Bản, Hoa Kỳ, châu Âu và Hàn Quốc.</p>
      </article>
    </div>
    <p>
      Hệ tiêu chuẩn được rà soát định kỳ để phù hợp với yêu cầu cập nhật từ khách hàng và quy định kỹ thuật từng khu vực,
      giúp ANSLIFE duy trì độ tin cậy khi mở rộng dự án trên nhiều thị trường.
    </p>
  </section>

  <section id="production-standards" class="ai-section">
  <h2>Tiêu chuẩn sản xuất</h2>
  <p>
    Bộ tiêu chuẩn sản xuất của ANSLIFE được xây dựng theo cấu trúc nhiều lớp,
    đảm bảo toàn hệ sinh thái có cùng cách hiểu và cùng phương pháp thực thi từ đầu vào đến xuất hàng.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="https://images.pexels.com/photos/4483609/pexels-photo-4483609.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Hệ thống tài liệu tiêu chuẩn và tuân thủ vận hành"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="https://images.pexels.com/photos/3846517/pexels-photo-3846517.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Áp dụng tiêu chuẩn sản xuất trong kiểm soát công đoạn"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <h3>Cấu trúc tiêu chuẩn</h3>
  <ul>
    <li>Tiêu chuẩn nguyên liệu và vật tư đầu vào.</li>
    <li>Tiêu chuẩn thao tác theo từng công đoạn sản xuất.</li>
    <li>Tiêu chuẩn chất lượng theo checkpoint và tiêu chí nghiệm thu.</li>
    <li>Tiêu chuẩn dữ liệu, truy xuất và lưu hồ sơ vận hành.</li>
  </ul>

  <p>
    Hệ tiêu chuẩn được cập nhật định kỳ theo phản hồi khách hàng, dữ liệu lỗi và thay đổi yêu cầu thị trường.
  </p>
</section>

  <section id="ecosystem-certifications" class="ai-section">
  <h2>Chứng chỉ trong hệ sinh thái</h2>
  <p>
    ANSLIFE phối hợp cùng các đối tác sản xuất để duy trì năng lực đáp ứng yêu cầu chứng chỉ,
    hồ sơ tuân thủ và tài liệu kỹ thuật theo từng thị trường xuất khẩu.
  </p>

  <div class="ai-eco-image-row">
    <figure>
      <img
        src="https://images.pexels.com/photos/3862132/pexels-photo-3862132.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Rà soát chứng từ và tuân thủ trong hệ sinh thái sản xuất"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <figure>
      <img
        src="https://images.pexels.com/photos/6169660/pexels-photo-6169660.jpeg?auto=compress&cs=tinysrgb&w=1400"
        alt="Phối hợp với đối tác để chuẩn bị hồ sơ chứng chỉ"
        loading="lazy"
        decoding="async"
      />
    </figure>
  </div>

  <div class="ai-highlight-grid">
    <article class="ai-highlight-card">
      <strong>Compliance Readiness</strong>
      <p>Chuẩn bị tài liệu phù hợp yêu cầu pháp lý và tiêu chí kỹ thuật thị trường đích.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Traceable Documentation</strong>
      <p>Liên kết chứng từ với lô sản xuất để dễ kiểm tra và đối chiếu khi audit.</p>
    </article>
    <article class="ai-highlight-card">
      <strong>Audit Coordination</strong>
      <p>Phối hợp nội bộ và đối tác để xử lý nhanh yêu cầu đánh giá từ khách hàng.</p>
    </article>
  </div>

  <p>
    Cách tổ chức hồ sơ theo chuẩn hệ sinh thái giúp doanh nghiệp phản hồi nhanh hơn với yêu cầu chứng từ,
    đồng thời giảm rủi ro gián đoạn khi triển khai đơn hàng tại thị trường mới.
  </p>
</section>

  <section id="production-ecosystem-scale" class="ai-section">
    <h2>Quy mô hệ sinh thái sản xuất</h2>
    <p>
      Năng lực của ANSLIFE được tổ chức theo mô hình trung tâm sản xuất chủ lực và mạng lưới sản xuất liên kết.
      Cách tổ chức này giúp mở rộng quy mô theo từng nhóm sản phẩm mà vẫn giữ chuẩn kỹ thuật đồng bộ.
    </p>
    <ul>
      <li>Điều phối tập trung theo kế hoạch công suất và lịch giao hàng.</li>
      <li>Phân bổ line theo từng nhóm sản phẩm để tối ưu năng suất.</li>
      <li>Giữ tính linh hoạt khi tăng/giảm sản lượng theo mùa vụ.</li>
    </ul>
  </section>

  <section id="production-capacity" class="ai-section">
    <h2>Công suất sản xuất</h2>
    <p>
      Công suất được quản trị theo từng line và từng cụm công đoạn, từ gia công, lắp ráp, sơn hoàn thiện đến đóng gói.
      Dữ liệu công suất được cập nhật định kỳ để đảm bảo kế hoạch sản xuất sát với nhu cầu thực tế của đơn hàng.
    </p>
  </section>

  <section id="product-development-capability" class="ai-section">
    <h2>Năng lực phát triển sản phẩm</h2>
    <p>
      ANSLIFE tổ chức phát triển sản phẩm theo mô hình stage-gate để rút ngắn thời gian làm mẫu,
      đồng thời bảo đảm mẫu duyệt có thể chuyển sang sản xuất hàng loạt với mức rủi ro thấp.
      Năng lực này bao gồm tiếp nhận ý tưởng, phân tích bản vẽ, dựng mẫu, chạy pilot và chuẩn hóa hồ sơ kỹ thuật.
    </p>

    <div class="ai-eco-image-row">
      <figure>
        <img
          src="/assets/about/team-rnd-real.jpg"
          alt="Đội R&D phối hợp phát triển mẫu sản phẩm theo brief kỹ thuật"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure>
        <img
          src="/assets/about/ecosystem-rnd-real.jpg"
          alt="Kỹ sư rà soát mẫu thử trước khi chuyển sang giai đoạn pilot"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <h3>Khung phát triển sản phẩm theo stage-gate</h3>
    <ol>
      <li>Concept Intake: tiếp nhận brief, mục tiêu thị trường và yêu cầu kỹ thuật.</li>
      <li>Engineering Review: đánh giá kết cấu, vật liệu, dung sai và tính khả thi sản xuất.</li>
      <li>Prototype Build: dựng mẫu thử, kiểm tra ngoại quan và chức năng sử dụng.</li>
      <li>Pilot Validation: chạy thử công đoạn để xác nhận lead time và mức ổn định chất lượng.</li>
      <li>Release for Production: chốt thông số, BOM và tài liệu bàn giao line sản xuất.</li>
    </ol>

    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>DFM / DFE Review</strong>
        <p>Tối ưu thiết kế để dễ sản xuất, giảm phát sinh rework và lãng phí vật tư.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Prototype Loop</strong>
        <p>Rút ngắn vòng lặp sửa mẫu nhờ phối hợp đồng thời giữa R&D, kỹ thuật và QC.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Production Readiness</strong>
        <p>Xác nhận mẫu đạt điều kiện triển khai thương mại trước khi mở lệnh sản xuất hàng loạt.</p>
      </article>
    </div>

    <h3>Đầu ra bàn giao cho sản xuất</h3>
    <ul>
      <li>Tech pack hoàn chỉnh: bản vẽ, BOM, hướng dẫn công đoạn và tiêu chí QC.</li>
      <li>Mẫu chuẩn đã phê duyệt kèm ngưỡng dung sai cho các điểm kỹ thuật quan trọng.</li>
      <li>Kế hoạch pilot và bài học CAPA để ngăn lỗi tái diễn khi scale sản lượng.</li>
      <li>Checklist đóng gói, nhãn mác và yêu cầu hồ sơ theo thị trường xuất khẩu.</li>
    </ul>

    <h3>KPI vận hành phát triển mẫu</h3>
    <ul>
      <li>Sample Lead Time: thời gian từ nhận brief đến mẫu duyệt.</li>
      <li>First Sample Pass Rate: tỷ lệ mẫu đạt ngay vòng đầu.</li>
      <li>Pilot-to-Production Success: tỷ lệ pilot chuyển thành sản xuất ổn định.</li>
      <li>Engineering Change Cycle: thời gian đóng vòng thay đổi kỹ thuật.</li>
    </ul>

    <p>
      Cấu trúc vận hành này giúp ANSLIFE giảm chênh lệch giữa mẫu và sản xuất thực tế,
      từ đó tăng tốc độ triển khai dự án mới cho khách hàng quốc tế.
    </p>
  </section>

  <section id="order-handling-capability" class="ai-section">
    <h2>Khả năng xử lý đơn hàng</h2>
    <p>
      Hệ thống xử lý đơn hàng được chuẩn hóa theo mốc: xác nhận kỹ thuật, lập kế hoạch vật tư, điều phối sản xuất,
      kiểm tra chất lượng và bàn giao logistics. Mỗi mốc đều có checkpoint để kiểm soát tiến độ và chất lượng.
    </p>
  </section>

  <section id="custom-production-oem-odm" class="ai-section">
    <h2>Sản xuất theo yêu cầu (OEM / ODM)</h2>
    <p>
      Doanh nghiệp có thể triển khai linh hoạt cả OEM và ODM, từ sản phẩm theo thiết kế khách hàng
      đến phương án đồng phát triển để phù hợp thị hiếu từng thị trường xuất khẩu.
    </p>
  </section>

  <section id="export-markets" class="ai-section">
    <h2>Thị trường xuất khẩu</h2>
    <p>
      Năng lực vận hành hiện tại hướng tới các thị trường quốc tế như Nhật Bản, Hoa Kỳ, Hàn Quốc và châu Âu,
      với trọng tâm là tuân thủ chuẩn kỹ thuật, yêu cầu chất lượng và hồ sơ giao hàng theo từng khu vực.
    </p>
  </section>
</div>
`.trim(),

  'quality-control': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/ai/quality-control.svg" alt="Kiểm soát chất lượng" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    Hệ thống QC của ANSLIFE vận hành theo nguyên tắc phòng ngừa trước, phát hiện sớm và khắc phục ngay,
    giúp giảm tỷ lệ lỗi lặp lại và tăng độ ổn định chất lượng cho đơn hàng xuất khẩu.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>Input QC</strong>
      <p>Kiểm soát nguyên liệu trước khi vào sản xuất để chặn lỗi từ gốc.</p>
    </article>
    <article class="ai-stat-card">
      <strong>In-line QC</strong>
      <p>Giám sát điểm chạm trọng yếu trong từng công đoạn.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Pre-shipment</strong>
      <p>Đánh giá tổng thể theo tiêu chí nghiệm thu trước xuất hàng.</p>
    </article>
    <article class="ai-stat-card">
      <strong>CAPA</strong>
      <p>Phân tích nguyên nhân gốc và hành động khắc phục phòng ngừa.</p>
    </article>
  </div>

  <section id="qc-philosophy" class="ai-section">
    <h2>Triết lý QC</h2>
    <p>
      Chất lượng không được xem là nhiệm vụ của một bộ phận riêng lẻ,
      mà là trách nhiệm xuyên suốt từ thiết kế, nguyên liệu, sản xuất đến đóng gói.
    </p>
    <p>
      ANSLIFE ưu tiên hệ thống kiểm soát theo quá trình để giảm lỗi ngay từ đầu,
      thay vì phụ thuộc vào khâu kiểm cuối cùng.
    </p>
    <ul>
      <li>Kiểm soát phòng ngừa trước khi lỗi xảy ra.</li>
      <li>Phản hồi nhanh theo dữ liệu tại hiện trường.</li>
      <li>Chuẩn hóa bài học để tránh lỗi lặp lại.</li>
    </ul>
  </section>

  <section id="qc-system" class="ai-section">
    <h2>Hệ thống QC</h2>
    <p>
      Hệ thống QC được thiết kế với các checkpoint rõ ràng theo từng công đoạn,
      kèm biểu mẫu ghi nhận tiêu chí, sai lệch và phương án xử lý.
    </p>
    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Tiêu chí kiểm</strong>
        <p>Xây dựng theo bản vẽ kỹ thuật, mẫu duyệt và yêu cầu thị trường.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Báo cáo lỗi</strong>
        <p>Ghi nhận mã lỗi và nguyên nhân để xử lý tận gốc.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Phản hồi liên phòng ban</strong>
        <p>QC, kỹ thuật và sản xuất phối hợp đóng lỗi trong cùng chu kỳ vận hành.</p>
      </article>
    </div>
    <p>
      Khi dữ liệu lỗi được chuẩn hóa, doanh nghiệp có thể đánh giá xu hướng và ưu tiên đúng điểm cải tiến.
    </p>
  </section>

  <section id="input-inspection" class="ai-section">
    <h2>Kiểm tra nguyên liệu</h2>
    <p>
      Ở bước đầu vào, QC tập trung kiểm tra độ phù hợp của nguyên liệu với tiêu chí kỹ thuật,
      đặc biệt ở các yếu tố ảnh hưởng trực tiếp đến độ bền và bề mặt hoàn thiện.
    </p>
    <ul>
      <li>Kiểm tra độ ẩm, vân gỗ, màu sắc và sai số kích thước.</li>
      <li>Đối chiếu chứng từ lô hàng và thông tin truy xuất.</li>
      <li>Phân loại theo mức độ phù hợp trước khi cấp phát line.</li>
    </ul>
    <p>
      Bước này giúp giảm đáng kể nguy cơ lỗi truyền qua các công đoạn gia công và sơn hoàn thiện.
    </p>
  </section>

  <section id="in-process-inspection" class="ai-section">
    <h2>Kiểm tra trong sản xuất</h2>
    <p>
      QC in-line được thực hiện tại các điểm chạm quan trọng để phát hiện sớm sai lệch,
      tránh việc phải xử lý hàng loạt ở giai đoạn sau.
    </p>
    <ul>
      <li>Kiểm tra kích thước, độ vuông góc, độ khớp kết cấu ở công đoạn gia công và lắp ráp.</li>
      <li>Kiểm tra bề mặt, màu sắc, độ phủ sau công đoạn sơn.</li>
      <li>Theo dõi tỷ lệ lỗi theo line để điều chỉnh ngay trong ca sản xuất.</li>
    </ul>
  </section>

  <section id="pre-shipment-inspection" class="ai-section">
    <h2>Kiểm tra trước xuất hàng</h2>
    <p>
      Trước khi bàn giao logistics, lô hàng được kiểm tổng thể theo tiêu chí nghiệm thu đã thống nhất với khách hàng,
      gồm chất lượng sản phẩm, số lượng, bao gói và thông tin nhãn mác.
    </p>
    <ul>
      <li>Đánh giá ngoại quan, kết cấu, chức năng sử dụng.</li>
      <li>Đối chiếu carton, nhãn, manual và packing list.</li>
      <li>Áp dụng phương pháp lấy mẫu theo mức AQL phù hợp.</li>
    </ul>
    <p>
      Kết quả kiểm trước xuất hàng là căn cứ quan trọng để đảm bảo độ tin cậy khi giao hàng quốc tế.
    </p>
  </section>

  <section id="quality-improvement-cases" class="ai-section">
    <h2>Case cải tiến chất lượng</h2>
    <p>
      ANSLIFE lưu trữ và chuẩn hóa các case cải tiến chất lượng nhằm rút ngắn thời gian xử lý,
      đồng thời chuyển bài học vận hành thành quy trình phòng ngừa có thể tái sử dụng.
    </p>
    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Case 01</strong>
        <p>Tối ưu trình tự lắp ráp giúp giảm tỷ lệ lệch khớp ở sản phẩm dạng module.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Case 02</strong>
        <p>Điều chỉnh thông số sơn để tăng độ ổn định màu giữa các lô sản xuất.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Case 03</strong>
        <p>Chuẩn hóa kết cấu bao gói để giảm tỷ lệ hư hại trong vận chuyển xa.</p>
      </article>
    </div>
  </section>
</div>
`.trim(),

  'commercial-process': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/about/ecosystem-global-real.jpg" alt="Quy trình thương mại và vận chuyển nội thất xuất khẩu" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    Quy trình thương mại được thiết kế rõ ràng theo từng mốc để khách hàng theo dõi tiến độ,
    chủ động kế hoạch nhập hàng và kiểm soát rủi ro trong suốt vòng đời đơn hàng.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>RFQ rõ ràng</strong>
      <p>Làm rõ yêu cầu kỹ thuật và phạm vi cung ứng trước khi báo giá.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Điều khoản minh bạch</strong>
      <p>Thống nhất trách nhiệm và thời điểm bàn giao theo Incoterms.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Tiến độ theo mốc</strong>
      <p>Cập nhật trạng thái từ mẫu, sản xuất, QC đến xuất hàng.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Hỗ trợ sau giao</strong>
      <p>Duy trì phối hợp chứng từ và phản hồi kỹ thuật khi cần thiết.</p>
    </article>
  </div>

  <section id="order-flow" class="ai-section">
    <h2>Quy trình đặt hàng</h2>
    <p>
      Quy trình đặt hàng được chuẩn hóa theo mô hình stage-by-stage để giảm sai lệch thông tin
      giữa đội mua hàng, kỹ thuật và vận hành sản xuất. Mỗi giai đoạn đều có đầu vào rõ ràng,
      điều kiện xác nhận và người chịu trách nhiệm, giúp đơn hàng đi nhanh nhưng vẫn kiểm soát được rủi ro.
    </p>

    <div class="ai-eco-image-row">
      <figure>
        <img
          src="/assets/about/ecosystem-production-real.jpg"
          alt="Khu vực sản xuất nội thất phục vụ đơn hàng xuất khẩu"
          loading="lazy"
          decoding="async"
        />
      </figure>
      <figure>
        <img
          src="/assets/about/ecosystem-global-real.jpg"
          alt="Hệ thống container phục vụ giao nhận nội thất xuất khẩu"
          loading="lazy"
          decoding="async"
        />
      </figure>
    </div>

    <h3>Flow triển khai đơn hàng</h3>
    <ol>
      <li>RFQ Intake: tiếp nhận yêu cầu, bản vẽ, target giá và target giao hàng.</li>
      <li>Technical Clarification: làm rõ cấu trúc, vật liệu, finish, packing spec.</li>
      <li>Costing & Quotation: phân tích chi phí, gửi báo giá và phương án thương mại.</li>
      <li>Sample / Spec Alignment: đối chiếu mẫu, chốt dung sai và tiêu chí nghiệm thu.</li>
      <li>PO Confirmation: xác nhận đơn hàng, điều khoản thanh toán, Incoterms và timeline.</li>
      <li>Production Planning: phân bổ line, chuẩn bị vật tư, khóa mốc kiểm soát chất lượng.</li>
      <li>Execution Tracking: cập nhật tiến độ theo checkpoint từ sản xuất đến đóng gói.</li>
      <li>Pre-shipment & Handover: kiểm trước xuất, hoàn thiện chứng từ và bàn giao logistics.</li>
    </ol>

    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Checkpoint kỹ thuật</strong>
        <p>Chốt thông số bắt buộc trước PO để hạn chế thay đổi phát sinh giữa kỳ.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Checkpoint thương mại</strong>
        <p>Minh bạch giá, điều khoản thanh toán, trách nhiệm giao nhận ngay từ đầu.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Checkpoint giao hàng</strong>
        <p>Kiểm soát tiến độ, QC và chứng từ để bảo đảm xuất hàng đúng mốc cam kết.</p>
      </article>
    </div>

    <h3>Thông tin cần chuẩn bị để chốt đơn nhanh</h3>
    <ul>
      <li>Mã sản phẩm hoặc bản vẽ kỹ thuật kèm ảnh tham chiếu.</li>
      <li>Yêu cầu vật liệu, màu hoàn thiện, tiêu chí QC ưu tiên.</li>
      <li>Số lượng theo từng mã và lịch giao mong muốn.</li>
      <li>Điều kiện giao hàng dự kiến (EXW/FOB/CIF...) và cảng đích.</li>
      <li>Yêu cầu chứng từ đặc thù của thị trường nhập khẩu.</li>
    </ul>

    <p>
      Cấu trúc này giúp hai bên quản trị kỳ vọng theo dữ liệu và mốc rõ ràng, giảm đáng kể vòng lặp chỉnh sửa
      khi đơn hàng đã đi vào giai đoạn thực thi.
    </p>
  </section>

  <section id="incoterms" class="ai-section">
    <h2>Điều kiện giao hàng (Incoterms)</h2>
    <p>
      ANSLIFE hỗ trợ linh hoạt các điều kiện giao hàng phổ biến như EXW, FOB, CIF,
      tùy theo năng lực logistics và chiến lược mua hàng của đối tác.
    </p>
    <ul>
      <li>Thống nhất điểm chuyển giao trách nhiệm và rủi ro ngay từ đầu.</li>
      <li>Đồng bộ yêu cầu chứng từ theo điều kiện giao nhận đã chọn.</li>
      <li>Rà soát lịch vận chuyển để phù hợp thời gian sản xuất thực tế.</li>
    </ul>
  </section>

  <section id="payment" class="ai-section">
    <h2>Phương thức thanh toán</h2>
    <p>
      Điều khoản thanh toán được xây dựng theo mức độ rủi ro dự án, quy mô đơn hàng và lịch giao,
      đảm bảo minh bạch cho cả hai bên trong suốt quá trình thực hiện.
    </p>
    <ul>
      <li>Xác định mốc thanh toán theo tiến độ triển khai.</li>
      <li>Đảm bảo hồ sơ đối soát rõ ràng theo từng lô xuất.</li>
      <li>Phối hợp nhanh khi cần điều chỉnh phương án tài chính.</li>
    </ul>
  </section>

  <section id="lead-time" class="ai-section">
    <h2>Thời gian sản xuất</h2>
    <p>
      Lead time được tính toán dựa trên quy mô đơn hàng, độ phức tạp thiết kế,
      năng lực line hiện tại và lịch cung ứng nguyên vật liệu.
    </p>
    <p>
      Trong quá trình sản xuất, khách hàng được cập nhật theo từng mốc chính,
      từ chuẩn bị vật tư, chạy line, QC đến hoàn thiện đóng gói.
    </p>
    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Mốc 1</strong>
        <p>Chuẩn bị vật tư và xác nhận năng lực line.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Mốc 2</strong>
        <p>Triển khai sản xuất, kiểm soát in-line và xử lý sai lệch.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Mốc 3</strong>
        <p>Kiểm trước xuất, đóng gói và bàn giao logistics.</p>
      </article>
    </div>
  </section>

  <section id="logistics" class="ai-section">
    <h2>Logistics</h2>
    <p>
      Đội ngũ thương mại và logistics phối hợp chặt để kiểm soát lịch tàu,
      chứng từ xuất khẩu và phương án bao gói phù hợp từng tuyến vận chuyển.
    </p>
    <ul>
      <li>Chuẩn hóa đóng gói theo loại sản phẩm và thời gian hành trình.</li>
      <li>Đảm bảo chứng từ đầy đủ, giảm rủi ro chậm thông quan.</li>
      <li>Cập nhật minh bạch trạng thái giao nhận cho đối tác.</li>
    </ul>
  </section>
</div>
`.trim(),

  'global-network': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/ai/global-network.svg" alt="Hệ thống toàn cầu" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    Hệ thống toàn cầu ANSLIFE kết nối trung tâm sản xuất tại Việt Nam với mạng lưới thị trường,
    giúp luồng thông tin giữa khách hàng, đội ngũ thương mại và vận hành luôn xuyên suốt.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>Việt Nam</strong>
      <p>Trung tâm điều phối sản xuất, kỹ thuật và QC.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Singapore</strong>
      <p>Điểm kết nối thương mại khu vực ASEAN.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Nhật Bản</strong>
      <p>Hỗ trợ thị trường yêu cầu chất lượng khắt khe.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Hoa Kỳ</strong>
      <p>Phối hợp dự án và phản hồi nhanh theo múi giờ địa phương.</p>
    </article>
  </div>

  <section id="vietnam-hq" class="ai-section">
    <h2>Việt Nam - Trụ sở</h2>
    <p>
      Trụ sở Việt Nam là điểm điều phối trung tâm cho các hoạt động sale, kỹ thuật,
      sản xuất, QC và logistics của toàn hệ thống.
    </p>
    <p>
      Tại đây, các quyết định về năng lực công suất, chuẩn kỹ thuật và tiến độ dự án
      được thống nhất để đảm bảo mức độ đồng bộ cao khi triển khai đơn hàng quốc tế.
    </p>
    <ul>
      <li>Điều phối kế hoạch sản xuất và nguồn lực liên phòng ban.</li>
      <li>Quản trị dữ liệu dự án và tiêu chí chất lượng chuẩn.</li>
      <li>Hỗ trợ khách hàng trong toàn bộ vòng đời đơn hàng.</li>
    </ul>
  </section>

  <section id="singapore-office" class="ai-section">
    <h2>Singapore - Văn phòng đại diện</h2>
    <p>
      Văn phòng Singapore đóng vai trò cầu nối thương mại khu vực,
      hỗ trợ liên lạc với đối tác ASEAN và tăng tốc xử lý nhu cầu dự án xuyên quốc gia.
    </p>
    <p>
      Nhờ vị trí thuận lợi về logistics và tài chính,
      điểm kết nối này giúp doanh nghiệp nâng tính linh hoạt trong điều phối giao thương.
    </p>
  </section>

  <section id="japan-office" class="ai-section">
    <h2>Nhật Bản - Văn phòng đại diện</h2>
    <p>
      Văn phòng Nhật Bản tập trung hỗ trợ thị trường có tiêu chuẩn cao về chi tiết kỹ thuật,
      độ hoàn thiện và tính ổn định chất lượng giữa các lô hàng.
    </p>
    <ul>
      <li>Hỗ trợ truyền đạt yêu cầu kỹ thuật đặc thù của thị trường Nhật.</li>
      <li>Rút ngắn thời gian phản hồi nhờ kênh làm việc trực tiếp.</li>
      <li>Đồng hành cùng khách hàng trong các giai đoạn nghiệm thu.</li>
    </ul>
  </section>

  <section id="us-office" class="ai-section">
    <h2>Hoa Kỳ - Văn phòng đại diện</h2>
    <p>
      Kênh đại diện tại Hoa Kỳ giúp ANSLIFE tăng tốc phản hồi cho đối tác Bắc Mỹ,
      đặc biệt ở các dự án cần cập nhật thường xuyên theo múi giờ địa phương.
    </p>
    <p>
      Đây cũng là điểm kết nối hỗ trợ thông tin hậu cần, tài liệu dự án
      và điều phối trao đổi sau giao hàng khi cần.
    </p>
  </section>

  <section id="international-partners" class="ai-section">
    <h2>Đối tác quốc tế</h2>
    <p>
      Hệ đối tác quốc tế của ANSLIFE được phát triển theo nguyên tắc dài hạn:
      minh bạch, tin cậy và đồng cải tiến năng lực triển khai dự án.
    </p>
    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Đối tác thương mại</strong>
        <p>Hợp tác mở rộng thị trường và chuẩn hóa quy trình làm việc.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Đối tác sản xuất</strong>
        <p>Bổ sung công suất theo chuẩn kỹ thuật đã được đồng bộ.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Đối tác logistics</strong>
        <p>Tối ưu tuyến vận chuyển và độ tin cậy thời gian giao nhận.</p>
      </article>
    </div>
  </section>
</div>
`.trim(),

  'scholarship-community': `
<div class="ai-content">
  <figure class="ai-banner">
    <img src="/assets/ai/scholarship-community.svg" alt="Quỹ học bổng và cộng đồng" loading="lazy" decoding="async" />
  </figure>

  <p class="ai-intro">
    Bên cạnh hoạt động sản xuất, ANSLIFE xây dựng quỹ học bổng và chương trình cộng đồng
    như một phần cam kết phát triển bền vững cùng địa phương và thế hệ trẻ.
  </p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>Giáo dục</strong>
      <p>Ưu tiên hỗ trợ học sinh, sinh viên có tinh thần vượt khó.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Cộng đồng</strong>
      <p>Đồng hành cùng chương trình xã hội thiết thực tại địa phương.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Minh bạch</strong>
      <p>Vận hành quỹ theo mục tiêu, tiêu chí và báo cáo rõ ràng.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Kết nối dài hạn</strong>
      <p>Tạo mạng lưới đồng hành giữa doanh nghiệp, tổ chức và cá nhân.</p>
    </article>
  </div>

  <section id="fund-overview" class="ai-section">
    <h2>Giới thiệu quỹ</h2>
    <p>
      Quỹ học bổng ANSLIFE hướng đến việc mở rộng cơ hội học tập cho học sinh, sinh viên,
      đặc biệt là các trường hợp có nỗ lực vươn lên trong điều kiện khó khăn.
    </p>
    <p>
      Quỹ được vận hành theo nguyên tắc tập trung đúng đối tượng,
      triển khai đều đặn theo chu kỳ và đánh giá hiệu quả dựa trên kết quả thực tế.
    </p>
    <ul>
      <li>Ưu tiên hỗ trợ đúng nhu cầu thiết thực của người học.</li>
      <li>Kết hợp học bổng tài chính với hoạt động định hướng nghề nghiệp.</li>
      <li>Tăng tính bền vững thông qua mạng lưới đồng hành xã hội.</li>
    </ul>
  </section>

  <section id="scholarship-program" class="ai-section">
    <h2>Chương trình học bổng</h2>
    <p>
      Chương trình học bổng được xây dựng theo từng giai đoạn,
      trong đó mỗi kỳ sẽ có mục tiêu rõ ràng về số lượng, phạm vi và tiêu chí xét chọn.
    </p>
    <ul>
      <li><strong>Mục tiêu:</strong> khuyến khích nỗ lực học tập và phát triển kỹ năng dài hạn.</li>
      <li><strong>Điều kiện:</strong> xét theo hoàn cảnh, thành tích và thái độ học tập.</li>
      <li><strong>Đồng hành:</strong> kết nối mentor, doanh nghiệp và người nhận học bổng.</li>
      <li><strong>Câu chuyện học bổng:</strong> ghi nhận hành trình vượt khó để lan tỏa cảm hứng tích cực.</li>
    </ul>
  </section>

  <section id="community-activities" class="ai-section">
    <h2>Hoạt động cộng đồng</h2>
    <p>
      Các hoạt động cộng đồng tập trung vào nhóm chương trình mang lại giá trị trực tiếp,
      như hỗ trợ giáo dục, cải thiện điều kiện học tập và các hoạt động xã hội tại địa phương.
    </p>
    <div class="ai-highlight-grid">
      <article class="ai-highlight-card">
        <strong>Dự án giáo dục</strong>
        <p>Hỗ trợ học cụ, thư viện nhỏ và các không gian học tập cơ bản.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Hoạt động xã hội</strong>
        <p>Phối hợp các chương trình thiện nguyện theo từng giai đoạn.</p>
      </article>
      <article class="ai-highlight-card">
        <strong>Phát triển địa phương</strong>
        <p>Khuyến khích nhân sự nội bộ tham gia đóng góp cộng đồng.</p>
      </article>
    </div>
  </section>

  <section id="join-anslife" class="ai-section">
    <h2>Tham gia cùng ANSLIFE</h2>
    <p>
      Doanh nghiệp, tổ chức và cá nhân có thể đồng hành cùng ANSLIFE thông qua nhiều hình thức,
      từ tài trợ nguồn lực, phối hợp chương trình đến chia sẻ chuyên môn.
    </p>
    <ol>
      <li>Đăng ký mối quan tâm và phạm vi hỗ trợ.</li>
      <li>Thống nhất chương trình phù hợp với năng lực đóng góp.</li>
      <li>Triển khai và theo dõi kết quả theo từng giai đoạn.</li>
      <li>Tổng kết, đánh giá và mở rộng các chương trình hiệu quả.</li>
    </ol>
    <p>
      Cách làm này giúp mỗi hoạt động cộng đồng đi vào thực chất,
      tạo tác động rõ ràng thay vì chỉ dừng ở các chiến dịch ngắn hạn.
    </p>
  </section>
</div>
`.trim(),

  contact: `
<div class="ai-content ai-contact-content">
  <p class="ai-intro">Đội ngũ ANSLIFE sẵn sàng tiếp nhận yêu cầu báo giá, hỗ trợ kỹ thuật sản phẩm, đặt lịch làm việc và trao đổi kế hoạch hợp tác theo từng thị trường.</p>

  <div class="ai-stat-grid">
    <article class="ai-stat-card">
      <strong>Phản hồi nhanh</strong>
      <p>Ưu tiên phản hồi thông tin trong khung thời gian làm việc gần nhất.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Hỗ trợ kỹ thuật</strong>
      <p>Tư vấn theo mã hàng, vật liệu, cấu trúc và tiêu chuẩn hoàn thiện.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Hỗ trợ thương mại</strong>
      <p>Đồng bộ báo giá, điều kiện giao hàng và quy trình đơn hàng.</p>
    </article>
    <article class="ai-stat-card">
      <strong>Làm việc đa kênh</strong>
      <p>Hỗ trợ email, điện thoại và lịch hẹn trực tiếp.</p>
    </article>
  </div>

  <div class="ai-contact-grid">
    <article class="ai-highlight-card">
      <h3>Trụ sở chính</h3>
      <p>Tầng 5, Tòa nhà Zen Tower, Số 12 đường Khuất Duy Tiến, Phường Thanh Xuân Trung, Quận Thanh Xuân, Thành phố Hà Nội.</p>
      <p>Email: sales@anslife.net</p>
      <p>Hotline: (+84) 983 150 336</p>
      <p>Giờ làm việc: Thứ 2 - Thứ 7, 08:00 - 17:30</p>
    </article>

    <article class="ai-highlight-card">
      <h3>Văn phòng TP.HCM</h3>
      <p>Số 15, Đường D2, Khu dân cư Hiệp Phát, Phường Phú Lợi, Thành phố Hồ Chí Minh</p>
      <p>Hỗ trợ gặp trực tiếp theo lịch hẹn.</p>
      <p>Phù hợp cho trao đổi dự án và xác nhận mẫu.</p>
    </article>

    <article class="ai-highlight-card">
      <h3>Nhà máy</h3>
      <p>Số 609, Tổ 3, Khu phố 1, Phường Long Bình, Tỉnh Đồng Nai, Việt Nam.</p>
      <p>Đón tiếp tham quan nhà máy theo đăng ký trước.</p>
      <p>Hỗ trợ khảo sát năng lực sản xuất theo từng nhóm sản phẩm.</p>
    </article>
  </div>

  <section class="ai-section">
    <h2>Hướng dẫn gửi yêu cầu nhanh</h2>
    <p>Để nhận phản hồi chính xác và nhanh hơn, bạn nên cung cấp rõ nhóm sản phẩm, thị trường mục tiêu, số lượng dự kiến và yêu cầu chất lượng ưu tiên.</p>
    <ul>
      <li>Đính kèm bản vẽ hoặc ảnh tham chiếu nếu đã có.</li>
      <li>Nêu rõ thời gian mong muốn nhận báo giá / triển khai.</li>
      <li>Cho biết điều kiện giao hàng dự kiến để tư vấn phù hợp.</li>
    </ul>
  </section>
</div>
`.trim(),
};

const AI_ABOUT_SECTION_CONTENT_EN: Record<string, string> = {
  'company-intro': ABOUT_COMPANY_INTRO_SECTION_EN,
  'company-info': ABOUT_COMPANY_INFO_SECTION_EN,
  'working-standards': ABOUT_WORKING_STANDARDS_SECTION_EN,
  'vision-mission': `
  <section id="vision-mission" class="ai-section ai-vision-mission">
    <div class="ai-vision-shell">
      <header class="ai-vision-header">
        <h2>Vision, Mission</h2>
        <span class="ai-vision-header-line" aria-hidden="true"></span>
      </header>

      <article class="ai-vision-panel">
        <div class="ai-vision-side">
          <h3>Vision</h3>
          <span class="ai-vision-side-line" aria-hidden="true"></span>
        </div>

        <div class="ai-vision-content ai-vision-content-grid">
          <div class="ai-vision-copy">
            <p>
              ANSLIFE aims to become a controllable manufacturing system at global scale, connecting international
              customers with production networks across multiple countries.
            </p>
            <p>
              We not only build production capability in Vietnam, but also expand the ecosystem into other regions where
              factories are organized and operated under the same standards, control system, and data management method.
            </p>
          </div>

          <div class="ai-vision-copy">
            <p>ANSLIFE is oriented to become a cross-border manufacturing platform where:</p>
            <ul class="ai-vision-bullet-list">
              <li>Quality is controlled by systems, independent of geographic location</li>
              <li>Production data is centrally managed</li>
              <li>Factories in different countries can operate under one shared standard</li>
            </ul>
            <p class="ai-vision-copy-note">
              In the long term, ANSLIFE aims to build a global manufacturing network with high stability, flexible
              capacity, and full operational transparency.
            </p>
          </div>
        </div>
      </article>

      <article class="ai-vision-panel ai-vision-panel-mission">
        <div class="ai-vision-side">
          <h3>Mission</h3>
          <span class="ai-vision-side-line" aria-hidden="true"></span>
        </div>

        <div class="ai-vision-content">
          <p class="ai-vision-mission-lead">
            ANSLIFE's mission is to build a transparent, controllable, and globally scalable manufacturing system that
            efficiently connects international customers with the production network.
          </p>

          <div class="ai-vision-benefit-grid">
            <article class="ai-vision-benefit">
              <h4>
                For Customers
              </h4>
              <ul>
                <li>Access manufacturing systems in multiple countries through one unified platform</li>
                <li>Reduce risk in cross-border manufacturing</li>
                <li>Ensure quality and schedule at scale</li>
              </ul>
            </article>

            <article class="ai-vision-benefit">
              <h4>
                For Factories
              </h4>
              <ul>
                <li>Join the global manufacturing network</li>
                <li>Operate under international standards</li>
                <li>Improve manufacturing and management capabilities</li>
              </ul>
            </article>

            <article class="ai-vision-benefit">
              <h4>
                For the Ecosystem
              </h4>
              <ul>
                <li>Connect manufacturing resources across multiple countries</li>
                <li>Standardize processes and quality control systems</li>
                <li>Create a production platform that can scale flexibly with market demand</li>
              </ul>
            </article>
          </div>
        </div>
      </article>
    </div>
  </section>
  `.trim(),
  'core-values': `
  <section id="core-values" class="ai-section ai-core-values">
    <div class="ai-core-shell">
      <header class="ai-core-header">
        <h2>Core Values</h2>
        <span class="ai-core-header-accent" aria-hidden="true"></span>
        <div class="ai-core-header-meta">
          <p class="ai-core-kicker">CORE VALUES</p>
          <span class="ai-core-header-rule" aria-hidden="true"></span>
        </div>
      </header>

      <div class="ai-core-grid">
        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">01</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M52 16l18 7v18c0 14-9 22-18 27-9-5-18-13-18-27V23z" />
                <path d="M44 41l6 6 10-12" />
                <path d="M12 48h24v30H12z" />
                <path d="M19 48v-6h10v6" />
                <path d="M18 58h12M18 64h9M18 70h10" />
                <circle cx="74" cy="66" r="10" />
                <path d="M74 52v4M74 76v4M60 66h4M84 66h4M64 56l3 3M81 73l3 3M64 76l3-3M81 59l3-3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>CONTROL</h3>
            <p>ANSLIFE operates on the principle of control, not on intuition or individual dependency.</p>
            <p>Every production activity is:</p>
            <ul>
              <li>Defined with clear processes</li>
              <li>Inspected by each stage</li>
              <li>Recorded with actual data</li>
            </ul>
            <p class="ai-core-card-note">
              Quality is not ensured by words. It is ensured by a consistent control system.
            </p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">02</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <ellipse cx="24" cy="26" rx="12" ry="6" />
                <path d="M12 26v24c0 3 5 6 12 6s12-3 12-6V26" />
                <path d="M12 38c0 3 5 6 12 6s12-3 12-6M12 50c0 3 5 6 12 6s12-3 12-6" />
                <path d="M46 40h8v10h-8zM58 30h8v20h-8z" />
                <path d="M48 68l8-8 8 7 10-10" />
                <circle cx="48" cy="68" r="2.3" />
                <circle cx="56" cy="60" r="2.3" />
                <circle cx="64" cy="67" r="2.3" />
                <circle cx="74" cy="57" r="2.3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>DATA-DRIVEN</h3>
            <p>All information in the system is recorded, stored, and used for operations.</p>
            <div class="ai-core-split-list">
              <div class="ai-core-split-col">
                <p>ANSLIFE's data system includes:</p>
                <ul>
                  <li>Production data</li>
                  <li>QC data</li>
                  <li>Progress data</li>
                  <li>Defect data</li>
                </ul>
              </div>
              <div class="ai-core-split-col">
                <p>Data is not only for storage, but also to:</p>
                <ul>
                  <li>Analyze</li>
                  <li>Improve</li>
                  <li>Make decisions</li>
                </ul>
              </div>
            </div>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">03</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M24 16h30l14 14v46H24z" />
                <path d="M54 16v14h14M34 38h24M34 48h24M34 58h20" />
                <circle cx="62" cy="66" r="10" />
                <path d="M62 54v4M62 74v4M50 66h4M70 66h4M54 58l3 3M67 71l3 3M54 74l3-3M67 61l3-3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>STANDARDIZATION</h3>
            <p>ANSLIFE standardizes all processes to ensure consistency across the system.</p>
            <p>Regardless of factory location, all operations must follow:</p>
            <ul>
              <li>Technical standards</li>
              <li>Quality standards</li>
              <li>Operating procedures</li>
            </ul>
            <p class="ai-core-card-note">Standards are the foundation for system scalability.</p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">04</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="24" cy="46" r="6" />
                <circle cx="48" cy="40" r="8" />
                <circle cx="72" cy="46" r="6" />
                <path d="M16 72v-8c0-5 4-9 8-9s8 4 8 9v8" />
                <path d="M38 72v-10c0-6 5-11 10-11s10 5 10 11v10" />
                <path d="M64 72v-8c0-5 4-9 8-9s8 4 8 9v8" />
                <path d="M16 34c8-12 24-18 40-16 8 1 14 4 20 8" stroke-dasharray="4 4" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>TRANSPARENCY</h3>
            <p>ANSLIFE builds a transparent working environment among:</p>
            <div class="ai-core-split-list">
              <div class="ai-core-split-col">
                <ul>
                  <li>Customers</li>
                  <li>Factories</li>
                  <li>The operating system</li>
                </ul>
                <p>Information is:</p>
              </div>
              <div class="ai-core-split-col">
                <ul>
                  <li>Clearly recorded</li>
                  <li>Continuously updated</li>
                  <li>Shared within proper scope</li>
                </ul>
              </div>
            </div>
            <p class="ai-core-card-note">Transparency reduces risk and increases trust in collaboration.</p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">05</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M32 64V42l8 6 8-12v10h16v18H32z" />
                <path d="M38 58h6M48 58h6" />
                <circle cx="48" cy="52" r="28" />
                <path d="M44 22h10l-2-6M25 44l-4 10-4-3M71 58l4-10 4 3" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>FLEXIBILITY</h3>
            <p>ANSLIFE operates a multi-factory ecosystem that enables:</p>
            <ul>
              <li>Capacity adjustment</li>
              <li>Production allocation</li>
              <li>Adaptation to different market requirements</li>
            </ul>
            <p class="ai-core-card-note">
              Flexibility is built on a system foundation, not on random case-by-case handling.
            </p>
          </div>
        </article>

        <article class="ai-core-card">
          <div class="ai-core-card-side">
            <span class="ai-core-card-number">06</span>
            <span class="ai-core-card-icon" aria-hidden="true">
              <svg viewBox="0 0 96 96" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 42l10-18 16 8-10 18zM78 42l-10-18-16 8 10 18z" />
                <path d="M35 50l8-7c3-2 7-2 10 0l8 7" />
                <path d="M30 54l10 10c2 2 5 2 7 0l6-6" />
                <path d="M66 54L56 64c-2 2-5 2-7 0" />
                <path d="M24 52l12 12M72 52L60 64" />
              </svg>
            </span>
          </div>
          <div class="ai-core-card-content">
            <h3>PARTNERSHIP</h3>
            <p>
              ANSLIFE does not treat factories and customers as transactional parties, but as partners in one system.
            </p>
            <p>We aim for:</p>
            <ul>
              <li>Long-term collaboration</li>
              <li>Co-development</li>
              <li>Higher shared standards</li>
            </ul>
          </div>
        </article>
      </div>

      <div class="ai-core-footer-notes">
        <article class="ai-core-note-card">
          <span class="ai-core-note-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 24l22-10 22 10" />
              <path d="M14 24h36M18 24v18M28 24v18M38 24v18M48 24v18M12 46h40" />
            </svg>
          </span>
          <p>ANSLIFE operates as a system, where every value is built on control, data, and standards.</p>
        </article>
        <article class="ai-core-note-card is-trailing">
          <span class="ai-core-note-icon" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="21" cy="25" r="5" />
              <circle cx="32" cy="21" r="6" />
              <circle cx="43" cy="25" r="5" />
              <path d="M13 44v-3c0-4 3-7 7-7h2c4 0 7 3 7 7v3" />
              <path d="M24 44v-4c0-4.5 3.5-8 8-8s8 3.5 8 8v4" />
              <path d="M35 14l2 3 3-2" />
            </svg>
          </span>
          <p>The ecosystem is sustainable only when all parties grow together.</p>
        </article>
      </div>
    </div>
  </section>
  `.trim(),
};

interface StructuredPanelContent {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
}

interface StructuredBlockContent {
  title: string;
  paragraphs: string[];
  bullets?: string[];
  note?: string;
}

interface StructuredSectionContent {
  title: string;
  kicker: string;
  lead: string;
  keyline: string;
  panels: StructuredPanelContent[];
  blocks?: StructuredBlockContent[];
}

function renderStructuredPanel(panel: StructuredPanelContent): string {
  const paragraphs = panel.paragraphs.map((paragraph) => `        <p>${paragraph}</p>`).join('\n');
  const bullets = panel.bullets
    ? `
        <ul class="ai-company-plain-list">
${panel.bullets.map((item) => `          <li>${item}</li>`).join('\n')}
        </ul>`
    : '';
  const note = panel.note ? `\n        <p class="ai-company-divider-note">${panel.note}</p>` : '';

  return `
      <article class="ai-company-panel">
        <h3>${panel.title}</h3>
${paragraphs}${bullets}${note}
      </article>
`.trim();
}

function renderStructuredBlock(block: StructuredBlockContent): string {
  const paragraphs = block.paragraphs.map((paragraph) => `        <p>${paragraph}</p>`).join('\n');
  const bullets = block.bullets
    ? `
        <ul>
${block.bullets.map((item) => `          <li>${item}</li>`).join('\n')}
        </ul>`
    : '';
  const note = block.note ? `\n        <p class="ai-company-divider-note">${block.note}</p>` : '';

  return `
      <article class="ai-company-block">
        <h3>${block.title}</h3>
${paragraphs}${bullets}${note}
      </article>
`.trim();
}

function buildStructuredCompanySectionHtml(
  sectionId: string,
  section: StructuredSectionContent,
  sectionClassName = 'ai-manufacturing-company-intro',
): string {
  const panelsHtml = section.panels.map((panel) => renderStructuredPanel(panel)).join('\n');
  const blocksHtml = section.blocks
    ? `
    <div class="ai-company-two-col">
${section.blocks.map((block) => renderStructuredBlock(block)).join('\n')}
    </div>
`
    : '';

  return `
  <section id="${sectionId}" class="ai-section ai-company-intro ${sectionClassName}">
    <div class="ai-company-hero">
      <div class="ai-company-copy">
        <h1 class="ai-company-title">${section.title}</h1>
        <p class="ai-company-lead">${section.lead}</p>
        <div class="ai-company-keyline">
          <strong>${section.keyline}</strong>
        </div>
      </div>
    </div>

    <div class="ai-company-panels">
${panelsHtml}
    </div>${blocksHtml}
  </section>
`.trim();
}

const MANUFACTURING_SECTION_TEMPLATES: Record<string, StructuredSectionContent> = {
  'production-system': {
    title: 'Hệ thống sản xuất',
    kicker: 'MANUFACTURING SYSTEM',
    lead:
      'ANSLIFE vận hành hệ thống sản xuất theo mô hình điều phối tập trung, thực thi phân tán và kiểm soát chất lượng đồng bộ.',
    keyline: 'Mở rộng năng lực bằng hệ thống, không đánh đổi độ ổn định.',
    panels: [
      {
        title: 'Cấu trúc vận hành',
        paragraphs: ['Hệ thống được tổ chức theo ba lớp điều phối chính:'],
        bullets: [
          'Trung tâm kỹ thuật và kế hoạch sản xuất',
          'Mạng lưới nhà máy thực thi theo năng lực',
          'Lớp QC và dữ liệu kiểm soát xuyên suốt',
        ],
        note: 'Mỗi lớp có KPI riêng nhưng dùng cùng một chuẩn dữ liệu và checklist vận hành.',
      },
      {
        title: 'Mục tiêu quản trị',
        paragraphs: ['Hệ thống sản xuất được thiết kế để đáp ứng đồng thời các mục tiêu:'],
        bullets: [
          'Ổn định chất lượng theo lô và theo mùa vụ',
          'Tăng khả năng giao hàng đúng hạn (OTIF)',
          'Giảm rủi ro phụ thuộc vào một điểm sản xuất',
        ],
        note: 'Khách hàng nhận được năng lực sản xuất linh hoạt nhưng vẫn kiểm soát được tiêu chuẩn đầu ra.',
      },
    ],
  },
  'raw-material-zone': {
    title: 'Vùng nguyên liệu',
    kicker: 'RAW MATERIAL ZONE',
    lead:
      'ANSLIFE xây vùng nguyên liệu theo hướng ổn định nguồn cung, truy xuất rõ ràng và phù hợp chuẩn kỹ thuật của từng nhóm sản phẩm.',
    keyline: 'Nguyên liệu tốt là nền tảng của chất lượng ổn định.',
    panels: [
      {
        title: 'Nguyên tắc phát triển vùng nguyên liệu',
        paragraphs: ['Mỗi vùng nguyên liệu được lựa chọn dựa trên:'],
        bullets: [
          'Độ phù hợp về chủng loại và chất lượng gỗ',
          'Khả năng cung ứng ổn định theo kế hoạch sản xuất',
          'Mức độ đáp ứng yêu cầu truy xuất và tuân thủ',
        ],
      },
      {
        title: 'Cơ chế kiểm soát đầu vào',
        paragraphs: ['Trước khi đưa vào sản xuất, nguyên liệu được kiểm theo bộ tiêu chí chuẩn.'],
        bullets: [
          'Độ ẩm, quy cách, dung sai',
          'Bề mặt, kết cấu, mức độ đồng đều',
          'Mã lô và hồ sơ truy xuất nhà cung ứng',
        ],
        note: 'Kiểm soát đầu vào tốt giúp giảm đáng kể lỗi phát sinh ở các công đoạn sau.',
      },
    ],
  },
  'manufacturing-process': {
    title: 'Quy trình sản xuất',
    kicker: 'MANUFACTURING PROCESS',
    lead:
      'Quy trình sản xuất của ANSLIFE được chuẩn hóa theo stage-gate để kiểm soát kỹ thuật, tiến độ và chất lượng theo từng công đoạn.',
    keyline: 'Chuẩn hóa quy trình để tăng tính lặp lại và giảm biến động.',
    panels: [
      {
        title: '5 công đoạn chuẩn',
        paragraphs: ['Mỗi đơn hàng được triển khai theo trình tự thống nhất:'],
        bullets: [
          'Phát triển mẫu và chốt thông số kỹ thuật',
          'Gia công chi tiết theo dung sai mục tiêu',
          'Lắp ráp và kiểm tra kết cấu',
          'Sơn hoàn thiện theo mẫu duyệt',
          'Đóng gói theo tiêu chuẩn xuất khẩu',
        ],
      },
      {
        title: 'Điểm kiểm soát then chốt',
        paragraphs: ['Mỗi công đoạn đều có checkpoint bắt buộc để ngăn lỗi truyền line.'],
        bullets: [
          'First-piece check đầu ca',
          'In-line inspection theo tần suất định nghĩa',
          'Final check trước đóng gói và bàn giao',
        ],
        note: 'Quy trình này giúp duy trì độ ổn định cho cả đơn hàng nhỏ và đơn hàng quy mô lớn.',
      },
    ],
  },
  'standards-certificates': {
    title: 'Tiêu chuẩn & chứng chỉ',
    kicker: 'STANDARDS AND CERTIFICATIONS',
    lead:
      'ANSLIFE quản trị tiêu chuẩn và chứng chỉ như một phần của hệ thống vận hành, không phải tài liệu hình thức.',
    keyline: 'Tuân thủ được chuẩn hóa ngay trong quy trình sản xuất.',
    panels: [
      {
        title: 'Khung tiêu chuẩn vận hành',
        paragraphs: ['Tiêu chuẩn được xây theo ba lớp kiểm soát:'],
        bullets: [
          'Tiêu chuẩn kỹ thuật theo nhóm sản phẩm',
          'Tiêu chuẩn chất lượng theo công đoạn',
          'Tiêu chuẩn hồ sơ và truy xuất dữ liệu',
        ],
      },
      {
        title: 'Quản trị chứng chỉ hệ sinh thái',
        paragraphs: ['Hồ sơ chứng chỉ được liên kết với lô sản xuất để dễ audit và đối chiếu.'],
        bullets: [
          'Lưu trữ và cập nhật theo thị trường đích',
          'Kiểm tra hiệu lực theo chu kỳ',
          'Phối hợp đối tác để duy trì tuân thủ liên tục',
        ],
      },
    ],
  },
  'anslife-factory': {
    title: 'Nhà máy ANSLIFE',
    kicker: 'ANSLIFE FACTORY',
    lead:
      'Nhà máy ANSLIFE đóng vai trò trung tâm kỹ thuật và điều phối chất lượng cho toàn bộ hệ sinh thái sản xuất.',
    keyline: 'Trung tâm sản xuất chủ lực và trung tâm chuẩn hóa vận hành.',
    panels: [
      {
        title: 'Vai trò nhà máy trung tâm',
        paragraphs: ['Không chỉ sản xuất, nhà máy trung tâm còn chịu trách nhiệm:'],
        bullets: [
          'Chuẩn hóa bản vẽ, BOM và hướng dẫn công đoạn',
          'Thiết lập checkpoint QC cho toàn hệ thống',
          'Đào tạo và chuyển giao chuẩn cho nhà máy liên kết',
        ],
      },
      {
        title: 'Năng lực triển khai',
        paragraphs: ['Nhà máy trung tâm tập trung các đơn hàng cần kiểm soát kỹ thuật chặt chẽ.'],
        bullets: [
          'Sản phẩm có cấu trúc phức tạp',
          'Đơn hàng yêu cầu lead time tối ưu',
          'Dự án cần pilot trước khi scale mạng lưới',
        ],
        note: 'Đây là nền tảng để ANSLIFE mở rộng công suất nhưng vẫn giữ chuẩn đầu ra nhất quán.',
      },
    ],
  },
  'satellite-factories': {
    title: 'Nhà máy vệ tinh',
    kicker: 'SATELLITE FACTORY NETWORK',
    lead:
      'Mạng lưới nhà máy vệ tinh giúp ANSLIFE mở rộng công suất linh hoạt theo mùa vụ và theo nhóm ngành hàng.',
    keyline: 'Phân tán sản xuất, tập trung kiểm soát.',
    panels: [
      {
        title: 'Nguyên tắc tích hợp nhà máy vệ tinh',
        paragraphs: ['Mỗi nhà máy tham gia hệ sinh thái phải vượt qua quy trình thẩm định năng lực.'],
        bullets: [
          'Đánh giá hiện trường theo checklist chuẩn',
          'Pilot lô thử trước khi nhận đơn chính thức',
          'Tuân thủ cùng quy trình QC và dữ liệu vận hành',
        ],
      },
      {
        title: 'Giá trị đối với khách hàng',
        paragraphs: ['Mô hình vệ tinh tạo lợi thế rõ ràng trong vận hành đơn hàng xuất khẩu:'],
        bullets: [
          'Tăng năng lực đáp ứng khi sản lượng cao',
          'Giảm rủi ro gián đoạn tại một điểm sản xuất',
          'Giữ tiến độ giao hàng ổn định ở nhiều thị trường',
        ],
      },
    ],
  },
  'ecosystem-operating-model': {
    title: 'Mô hình vận hành hệ sinh thái',
    kicker: 'ECOSYSTEM OPERATING MODEL',
    lead:
      'ANSLIFE vận hành theo mô hình Centralized Control - Distributed Execution để mở rộng công suất mà vẫn giữ cùng chuẩn chất lượng.',
    keyline: 'Một hệ thống, nhiều điểm thực thi, một chuẩn kiểm soát.',
    panels: [
      {
        title: 'Bốn trụ cột điều hành',
        paragraphs: ['Mô hình được xây trên bốn trụ cột vận hành thống nhất:'],
        bullets: [
          'Plan Governance: quản trị kế hoạch và ưu tiên đơn hàng',
          'Capacity Allocation: phân bổ công suất theo năng lực thực',
          'Quality Gate: kiểm soát chất lượng đa lớp',
          'Data Visibility: theo dõi tiến độ theo thời gian thực',
        ],
      },
      {
        title: 'Chu kỳ điều phối',
        paragraphs: ['Mỗi chu kỳ vận hành đều có cơ chế review và chốt hành động.'],
        bullets: [
          'Review kỹ thuật trước khi mở lệnh',
          'Theo dõi tiến độ - lỗi - năng suất theo ngày',
          'Đóng CAPA và khóa hành động phòng ngừa',
        ],
      },
    ],
  },
  'manufacturing-partner-registration': {
    title: 'Đăng ký đối tác sản xuất',
    kicker: 'MANUFACTURING PARTNER REGISTRATION',
    lead:
      'ANSLIFE phát triển đối tác sản xuất theo quy trình có kiểm soát để đảm bảo năng lực thật và khả năng tuân thủ chuẩn hệ thống.',
    keyline: 'Gia nhập hệ sinh thái bằng năng lực đã được xác thực.',
    panels: [
      {
        title: 'Điều kiện tham gia',
        paragraphs: ['Đối tác cần đáp ứng đồng thời yêu cầu năng lực và tuân thủ:'],
        bullets: [
          'Năng lực máy móc và nhân sự theo ngành hàng mục tiêu',
          'Khả năng vận hành theo SOP và QC gate',
          'Cam kết chuẩn dữ liệu và minh bạch báo cáo',
        ],
      },
      {
        title: 'Quy trình onboarding',
        paragraphs: ['Quy trình triển khai gồm bốn bước chính:'],
        bullets: [
          'Sơ tuyển hồ sơ và xếp hạng mức phù hợp',
          'Khảo sát hiện trường và đánh giá năng lực thực',
          'Chạy pilot để kiểm chứng chất lượng và lead time',
          'Phê duyệt tích hợp và triển khai đơn hàng',
        ],
      },
    ],
  },
  'wood-supply': {
    title: 'Nguồn cung gỗ',
    kicker: 'WOOD SUPPLY',
    lead:
      'Nguồn cung gỗ được quản trị theo tiêu chí ổn định, đồng nhất và truy xuất được để bảo đảm đầu vào cho sản xuất xuất khẩu.',
    keyline: 'Nguồn cung ổn định tạo nên năng lực giao hàng bền vững.',
    panels: [
      {
        title: 'Chiến lược nguồn cung',
        paragraphs: ['ANSLIFE duy trì cơ cấu nhà cung cấp theo nhiều lớp để giảm rủi ro thiếu hụt.'],
        bullets: [
          'Nhà cung cấp chiến lược theo nhóm vật liệu',
          'Nhà cung cấp dự phòng theo mùa vụ',
          'Kế hoạch mua theo forecast đơn hàng',
        ],
      },
      {
        title: 'Kiểm soát chất lượng nguồn gỗ',
        paragraphs: ['Mỗi lô gỗ đều được đánh giá trước khi nhập kho sản xuất.'],
        bullets: [
          'Độ ẩm, độ ổn định và dung sai quy cách',
          'Đặc tính bề mặt theo yêu cầu thành phẩm',
          'Mã hóa lô để phục vụ truy xuất khi cần',
        ],
      },
    ],
  },
  'supply-system': {
    title: 'Hệ thống cung ứng',
    kicker: 'SUPPLY SYSTEM',
    lead:
      'Hệ thống cung ứng của ANSLIFE kết nối kế hoạch mua hàng, tồn kho và tiến độ sản xuất để đảm bảo dòng vật tư thông suốt.',
    keyline: 'Đúng vật tư, đúng thời điểm, đúng tiêu chuẩn.',
    panels: [
      {
        title: 'Cấu trúc điều phối vật tư',
        paragraphs: ['Vật tư được điều phối theo cấu trúc rolling plan để bám sát tiến độ đơn hàng.'],
        bullets: [
          'Dự báo nhu cầu theo tuần và theo mã hàng',
          'Kiểm soát mức tồn kho an toàn',
          'Ưu tiên cấp phát theo kế hoạch giao hàng',
        ],
      },
      {
        title: 'Hiệu quả vận hành',
        paragraphs: ['Hệ thống cung ứng tốt giúp giảm chi phí ẩn trong sản xuất.'],
        bullets: [
          'Giảm thiếu hụt vật tư tại line',
          'Giảm thời gian chờ giữa công đoạn',
          'Tăng độ ổn định lead time toàn chuỗi',
        ],
      },
    ],
  },
  'material-control': {
    title: 'Kiểm soát nguyên liệu',
    kicker: 'MATERIAL CONTROL',
    lead:
      'Kiểm soát nguyên liệu được tổ chức như lớp phòng ngừa lỗi đầu tiên, bảo vệ toàn bộ chuỗi sản xuất phía sau.',
    keyline: 'Chặn lỗi từ gốc để giảm rework và rủi ro giao hàng.',
    panels: [
      {
        title: 'Bộ tiêu chí kiểm soát',
        paragraphs: ['Nguyên liệu đầu vào được kiểm theo bộ tiêu chí chuẩn hóa của hệ thống.'],
        bullets: [
          'Quy cách, độ ẩm và dung sai',
          'Đặc tính vật lý và mức độ phù hợp công đoạn',
          'Trạng thái bề mặt và mức độ ổn định',
        ],
      },
      {
        title: 'Quản trị dữ liệu nguyên liệu',
        paragraphs: ['Mỗi lô được gắn mã và lưu hồ sơ để phục vụ truy xuất toàn vòng đời.'],
        bullets: [
          'Phân loại đạt / chưa đạt theo checklist',
          'Cách ly lô không phù hợp',
          'Ghi nhận CAPA cho nguồn lỗi lặp lại',
        ],
      },
    ],
  },
  'equipment-technology': {
    title: 'Thiết bị & công nghệ',
    kicker: 'EQUIPMENT AND TECHNOLOGY',
    lead:
      'ANSLIFE đầu tư thiết bị và công nghệ theo định hướng tăng độ chính xác, độ lặp lại và năng lực mở rộng sản xuất.',
    keyline: 'Công nghệ phục vụ độ tin cậy giao hàng, không chỉ phục vụ tốc độ.',
    panels: [
      {
        title: 'Nguyên tắc đầu tư công nghệ',
        paragraphs: ['Mỗi quyết định đầu tư đều bám theo yêu cầu kỹ thuật và năng lực thương mại.'],
        bullets: [
          'Đáp ứng dung sai và yêu cầu hoàn thiện',
          'Ổn định thông số giữa các ca sản xuất',
          'Dễ chuẩn hóa và nhân rộng giữa các line',
        ],
      },
      {
        title: 'Vận hành công nghệ theo dữ liệu',
        paragraphs: ['Thiết bị chỉ tạo giá trị khi gắn với cơ chế theo dõi và cải tiến liên tục.'],
        bullets: [
          'Theo dõi hiệu suất máy theo ca',
          'Phân tích downtime và nguyên nhân chính',
          'Tối ưu tham số để giảm biến động chất lượng',
        ],
      },
    ],
  },
  'production-machinery': {
    title: 'Máy móc sản xuất',
    kicker: 'PRODUCTION MACHINERY',
    lead:
      'Hệ thống máy móc được bố trí theo cụm công đoạn để tối ưu dòng chảy sản xuất và giảm thao tác trung gian.',
    keyline: 'Tổ chức máy theo luồng công đoạn để tăng năng suất thực.',
    panels: [
      {
        title: 'Phân cụm máy móc',
        paragraphs: ['Máy móc được quản trị theo vai trò trong chuỗi sản xuất.'],
        bullets: [
          'Cụm gia công chính xác',
          'Cụm lắp ráp và kiểm kết cấu',
          'Cụm hoàn thiện và đóng gói',
        ],
      },
      {
        title: 'Bảo trì và độ sẵn sàng',
        paragraphs: ['Độ tin cậy máy móc được kiểm soát bằng chương trình bảo trì định kỳ.'],
        bullets: [
          'Bảo trì phòng ngừa theo lịch',
          'Theo dõi chỉ số downtime và MTBF',
          'Hiệu chuẩn định kỳ cho máy trọng yếu',
        ],
      },
    ],
  },
  'processing-technology': {
    title: 'Công nghệ gia công',
    kicker: 'PROCESSING TECHNOLOGY',
    lead:
      'Công nghệ gia công của ANSLIFE tập trung vào kiểm soát sai số, tính đồng nhất và khả năng tái lập ở quy mô lớn.',
    keyline: 'Gia công chính xác để giảm lỗi truyền công đoạn.',
    panels: [
      {
        title: 'Công nghệ kiểm soát sai số',
        paragraphs: ['Sai số công đoạn được giảm bằng kết hợp công nghệ và quy trình.'],
        bullets: [
          'Chuẩn hóa setup theo mã hàng',
          'Khóa tham số trọng yếu theo vật liệu',
          'Kiểm tra first-piece đầu ca',
        ],
      },
      {
        title: 'Tối ưu hiệu quả line',
        paragraphs: ['Đội kỹ thuật theo dõi dữ liệu công đoạn để cải tiến chu kỳ sản xuất.'],
        bullets: [
          'Giảm thời gian đổi mã',
          'Giảm tỷ lệ rework ở công đoạn sau',
          'Tăng năng suất ổn định theo ca',
        ],
      },
    ],
  },
  'sample-development': {
    title: 'Phát triển mẫu',
    kicker: 'SAMPLE DEVELOPMENT',
    lead:
      'Phát triển mẫu được quản trị theo stage-gate để rút ngắn vòng lặp thử - sửa và tăng tỷ lệ chuyển sang sản xuất hàng loạt.',
    keyline: 'Mẫu tốt là mẫu có thể sản xuất ổn định ở quy mô thương mại.',
    panels: [
      {
        title: 'Khung triển khai mẫu',
        paragraphs: ['Mỗi dự án mẫu đi qua chuỗi bước xác thực kỹ thuật rõ ràng.'],
        bullets: [
          'Tiếp nhận brief và mục tiêu thị trường',
          'Đánh giá thiết kế theo DFM',
          'Dựng mẫu và kiểm thử chức năng',
          'Pilot công đoạn trước khi release',
        ],
      },
      {
        title: 'Đầu ra bàn giao sản xuất',
        paragraphs: ['Sau khi chốt mẫu, bộ tài liệu được chuẩn hóa để bàn giao line.'],
        bullets: [
          'Bản vẽ kỹ thuật và BOM đã xác nhận',
          'Checklist QC theo điểm kiểm trọng yếu',
          'Tiêu chuẩn đóng gói theo thị trường',
        ],
      },
    ],
  },
  processing: {
    title: 'Gia công',
    kicker: 'PROCESSING',
    lead:
      'Công đoạn gia công được tổ chức theo chuẩn dung sai và quy trình kiểm soát tại nguồn để bảo đảm độ chính xác đầu ra.',
    keyline: 'Kiểm soát ngay tại line để ngăn lỗi lan rộng.',
    panels: [
      {
        title: 'Chuẩn vận hành công đoạn',
        paragraphs: ['Đội vận hành thực thi theo SOP và tham số đã chuẩn hóa.'],
        bullets: [
          'Setup máy theo từng mã hàng',
          'Kiểm first-piece trước khi chạy sản lượng',
          'Theo dõi độ ổn định theo tần suất định nghĩa',
        ],
      },
      {
        title: 'Kiểm soát chất lượng gia công',
        paragraphs: ['QC phối hợp trực tiếp tại hiện trường để xử lý sai lệch sớm.'],
        bullets: [
          'Đo kích thước tại các điểm quan trọng',
          'Ghi nhận lỗi theo mã nguyên nhân',
          'Đóng hành động phòng ngừa trong cùng chu kỳ',
        ],
      },
    ],
  },
  assembly: {
    title: 'Lắp ráp',
    kicker: 'ASSEMBLY',
    lead:
      'Lắp ráp là công đoạn quyết định độ vững kết cấu và trải nghiệm sử dụng của sản phẩm trước khi chuyển sang hoàn thiện.',
    keyline: 'Lắp đúng chuẩn để khóa chất lượng kết cấu từ sớm.',
    panels: [
      {
        title: 'Tiêu chuẩn lắp ráp',
        paragraphs: ['Mọi thao tác lắp ráp được kiểm theo chuẩn kỹ thuật đã duyệt.'],
        bullets: [
          'Độ khít và độ vuông góc kết cấu',
          'Lực siết và vị trí liên kết',
          'Độ ổn định khi thử tải sử dụng',
        ],
      },
      {
        title: 'Cơ chế chuyển giao công đoạn',
        paragraphs: ['Chỉ sản phẩm đạt điều kiện lắp ráp mới được chuyển sang hoàn thiện.'],
        bullets: [
          'Checklist bắt buộc trước transfer',
          'Ghi nhận lỗi để cập nhật SOP',
          'Truy xuất theo mã lô công đoạn',
        ],
      },
    ],
  },
  finishing: {
    title: 'Sơn hoàn thiện',
    kicker: 'FINISHING',
    lead:
      'Công đoạn hoàn thiện bề mặt được kiểm soát theo chuẩn màu, độ phủ và độ bền để đảm bảo tính đồng nhất giữa các lô.',
    keyline: 'Ngoại quan ổn định là kết quả của quy trình, không phải may mắn.',
    panels: [
      {
        title: 'Kiểm soát quy trình sơn',
        paragraphs: ['Các thông số sơn được quản trị theo từng mã hàng và từng lớp phủ.'],
        bullets: [
          'Chuẩn bị bề mặt và xử lý nền',
          'Quản trị độ dày lớp phủ',
          'Ổn định màu theo mẫu duyệt',
        ],
      },
      {
        title: 'Nghiệm thu hoàn thiện',
        paragraphs: ['Sản phẩm được kiểm ngoại quan trước khi chuyển đóng gói.'],
        bullets: [
          'Độ đồng đều bề mặt',
          'Khả năng chống trầy ở mức yêu cầu',
          'Màu sắc đúng theo mẫu chốt',
        ],
      },
    ],
  },
  packaging: {
    title: 'Đóng gói',
    kicker: 'PACKAGING',
    lead:
      'Đóng gói được thiết kế theo tiêu chuẩn vận chuyển quốc tế nhằm giảm hư hại và đảm bảo trải nghiệm nhận hàng của khách.',
    keyline: 'Đóng gói là một phần của chất lượng giao hàng.',
    panels: [
      {
        title: 'Tiêu chuẩn đóng gói xuất khẩu',
        paragraphs: ['Mỗi nhóm sản phẩm có cấu trúc đóng gói riêng theo đặc tính vận chuyển.'],
        bullets: [
          'Vật liệu bảo vệ theo mức độ rủi ro va đập',
          'Nhãn carton, mã kiện và hướng dẫn xử lý',
          'Kiểm đếm và đối chiếu packing list',
        ],
      },
      {
        title: 'Kiểm soát trước bàn giao logistics',
        paragraphs: ['Trước khi xuất kho, kiện hàng được kiểm tra theo checklist cuối.'],
        bullets: [
          'Tình trạng kiện và niêm phong',
          'Đủ bộ chứng từ theo đơn hàng',
          'Khớp số lượng giữa hệ thống và thực tế',
        ],
      },
    ],
  },
  'production-standards': {
    title: 'Tiêu chuẩn sản xuất',
    kicker: 'PRODUCTION STANDARDS',
    lead:
      'Bộ tiêu chuẩn sản xuất được áp dụng xuyên suốt từ nguyên liệu, công đoạn, nghiệm thu đến đóng gói và giao hàng.',
    keyline: 'Một chuẩn chung cho toàn hệ thống sản xuất.',
    panels: [
      {
        title: 'Cấu trúc tiêu chuẩn',
        paragraphs: ['Tiêu chuẩn được phân lớp để dễ triển khai và dễ kiểm soát.'],
        bullets: [
          'Tiêu chuẩn vật tư và đầu vào',
          'Tiêu chuẩn thao tác theo công đoạn',
          'Tiêu chuẩn nghiệm thu và hồ sơ',
        ],
      },
      {
        title: 'Cơ chế cập nhật',
        paragraphs: ['Bộ tiêu chuẩn được cập nhật định kỳ dựa trên dữ liệu vận hành thực tế.'],
        bullets: [
          'Phản hồi từ QC và khách hàng',
          'Dữ liệu lỗi và CAPA theo tháng',
          'Yêu cầu mới từ thị trường xuất khẩu',
        ],
      },
    ],
  },
  'ecosystem-certifications': {
    title: 'Chứng chỉ trong hệ sinh thái',
    kicker: 'ECOSYSTEM CERTIFICATIONS',
    lead:
      'ANSLIFE quản trị chứng chỉ theo hướng chủ động, đảm bảo hồ sơ tuân thủ luôn sẵn sàng khi triển khai đơn hàng quốc tế.',
    keyline: 'Tuân thủ rõ ràng để mở rộng thị trường bền vững.',
    panels: [
      {
        title: 'Quản trị hồ sơ chứng chỉ',
        paragraphs: ['Hồ sơ được liên kết với mã lô và mã đơn hàng để dễ truy xuất khi audit.'],
        bullets: [
          'Phân loại theo thị trường và yêu cầu khách hàng',
          'Theo dõi hiệu lực và lịch gia hạn',
          'Kiểm tra chéo trước khi phát hành',
        ],
      },
      {
        title: 'Phối hợp trong hệ sinh thái',
        paragraphs: ['Trung tâm điều phối làm việc cùng nhà máy và nhà cung ứng để duy trì chuẩn tuân thủ.'],
        bullets: [
          'Đồng bộ tài liệu giữa các bên',
          'Rà soát định kỳ theo kế hoạch nội bộ',
          'Đóng hành động khắc phục khi có điểm chưa phù hợp',
        ],
      },
    ],
  },
  'production-ecosystem-scale': {
    title: 'Quy mô hệ sinh thái sản xuất',
    kicker: 'ECOSYSTEM SCALE',
    lead:
      'Quy mô hệ sinh thái được xây để tăng năng lực phục vụ đa thị trường mà vẫn giữ cùng hệ chuẩn kỹ thuật và chất lượng.',
    keyline: 'Quy mô lớn chỉ có ý nghĩa khi vẫn kiểm soát được.',
    panels: [
      {
        title: 'Mô hình mở rộng quy mô',
        paragraphs: ['ANSLIFE mở rộng theo mô hình hub-and-network.'],
        bullets: [
          'Hub trung tâm kiểm soát kỹ thuật và QC',
          'Network thực thi theo năng lực ngành hàng',
          'Data layer kết nối tiến độ toàn hệ thống',
        ],
      },
      {
        title: 'Năng lực đáp ứng thị trường',
        paragraphs: ['Quy mô hệ sinh thái hỗ trợ triển khai đơn hàng theo nhiều cấp độ công suất.'],
        bullets: [
          'Đơn hàng lặp lại với lead time ổn định',
          'Đơn hàng mới cần pilot nhanh',
          'Đơn hàng cao điểm theo mùa vụ',
        ],
      },
    ],
  },
  'production-capacity': {
    title: 'Công suất sản xuất',
    kicker: 'PRODUCTION CAPACITY',
    lead:
      'Công suất được quản trị theo line, theo công đoạn và theo mức độ ưu tiên đơn hàng để tối ưu tiến độ giao hàng.',
    keyline: 'Công suất thực phải đi cùng khả năng giao hàng thực.',
    panels: [
      {
        title: 'Quản trị công suất theo dữ liệu',
        paragraphs: ['Năng lực sản xuất được cập nhật theo chu kỳ để đảm bảo kế hoạch sát thực tế.'],
        bullets: [
          'Theo dõi sản lượng theo ca',
          'Đo tải line và điểm nghẽn',
          'Điều chỉnh phân bổ theo mức ưu tiên',
        ],
      },
      {
        title: 'Cam kết năng lực',
        paragraphs: ['ANSLIFE duy trì cơ chế dự phòng để ổn định tiến độ đơn hàng.'],
        bullets: [
          'Bổ sung công suất qua mạng lưới vệ tinh',
          'Kế hoạch tăng ca có kiểm soát',
          'Rà soát weekly capacity versus demand',
        ],
      },
    ],
  },
  'product-development-capability': {
    title: 'Năng lực phát triển sản phẩm',
    kicker: 'PRODUCT DEVELOPMENT CAPABILITY',
    lead:
      'Năng lực phát triển sản phẩm của ANSLIFE kết nối chặt giữa R&D, kỹ thuật, QC và sản xuất để giảm rủi ro khi scale.',
    keyline: 'Phát triển sản phẩm theo tư duy triển khai thương mại thực tế.',
    panels: [
      {
        title: 'Năng lực từ ý tưởng đến mẫu',
        paragraphs: ['Đội ngũ phát triển xử lý linh hoạt nhiều dạng đầu vào từ khách hàng.'],
        bullets: [
          'Brief ý tưởng, bản vẽ, hoặc mẫu tham chiếu',
          'Đánh giá DFM/feasibility theo line sản xuất',
          'Đề xuất tối ưu kết cấu và vật liệu',
        ],
      },
      {
        title: 'Năng lực chuyển mẫu sang sản xuất',
        paragraphs: ['Mục tiêu là rút ngắn khoảng cách giữa mẫu duyệt và sản xuất đại trà.'],
        bullets: [
          'Pilot validation theo công đoạn',
          'Chuẩn hóa tech pack trước release',
          'Đo tỷ lệ pass ngay vòng đầu để cải tiến',
        ],
      },
    ],
  },
  'order-handling-capability': {
    title: 'Khả năng xử lý đơn hàng',
    kicker: 'ORDER HANDLING CAPABILITY',
    lead:
      'ANSLIFE chuẩn hóa quy trình xử lý đơn hàng theo từng cột mốc để khách hàng theo dõi minh bạch từ đầu đến cuối.',
    keyline: 'Đơn hàng được quản trị như một chuỗi dữ liệu có kiểm soát.',
    panels: [
      {
        title: 'Luồng xử lý chuẩn',
        paragraphs: ['Mỗi đơn hàng đi qua chuỗi xử lý cố định trước khi giao hàng.'],
        bullets: [
          'Xác nhận kỹ thuật và BOM',
          'Lập kế hoạch vật tư và năng lực',
          'Theo dõi tiến độ, QC và shipment readiness',
        ],
      },
      {
        title: 'Năng lực quản trị rủi ro',
        paragraphs: ['Đội điều phối theo dõi các điểm rủi ro chính để can thiệp sớm.'],
        bullets: [
          'Rủi ro vật tư và công suất',
          'Rủi ro chất lượng theo công đoạn',
          'Rủi ro tiến độ theo mốc giao hàng',
        ],
      },
    ],
  },
  'custom-production-oem-odm': {
    title: 'Sản xuất theo yêu cầu (OEM / ODM)',
    kicker: 'CUSTOM PRODUCTION',
    lead:
      'ANSLIFE triển khai song song OEM và ODM, phù hợp cả khách hàng có thiết kế sẵn lẫn khách hàng cần đồng phát triển sản phẩm.',
    keyline: 'Linh hoạt mô hình hợp tác nhưng giữ chuẩn vận hành thống nhất.',
    panels: [
      {
        title: 'Mô hình OEM',
        paragraphs: ['Với OEM, ANSLIFE triển khai theo bản vẽ và tiêu chuẩn khách hàng đã chốt.'],
        bullets: [
          'Bảo mật thiết kế và thông số kỹ thuật',
          'Kiểm soát chất lượng theo spec khách hàng',
          'Tối ưu sản xuất để giữ lead time ổn định',
        ],
      },
      {
        title: 'Mô hình ODM',
        paragraphs: ['Với ODM, đội ngũ ANSLIFE cùng khách hàng đồng phát triển giải pháp sản phẩm.'],
        bullets: [
          'Phát triển concept theo phân khúc thị trường',
          'Tối ưu thiết kế theo khả năng sản xuất',
          'Đồng bộ chi phí, chất lượng và tính thương mại',
        ],
      },
    ],
  },
  'export-markets': {
    title: 'Thị trường xuất khẩu',
    kicker: 'EXPORT MARKETS',
    lead:
      'ANSLIFE phục vụ đa thị trường xuất khẩu với hệ tiêu chuẩn vận hành được điều chỉnh theo yêu cầu từng khu vực.',
    keyline: 'Một hệ thống sản xuất, nhiều chuẩn thị trường.',
    panels: [
      {
        title: 'Năng lực phục vụ thị trường',
        paragraphs: ['Hệ thống hiện tại tập trung vào các thị trường xuất khẩu trọng điểm.'],
        bullets: ['Hoa Kỳ', 'Nhật Bản', 'Hàn Quốc', 'Châu Âu'],
      },
      {
        title: 'Cơ chế đáp ứng yêu cầu thị trường',
        paragraphs: ['Mỗi thị trường được quản trị bằng bộ yêu cầu kỹ thuật và hồ sơ riêng.'],
        bullets: [
          'Chuẩn chất lượng và ngoại quan theo phân khúc',
          'Chuẩn đóng gói, nhãn và chứng từ giao hàng',
          'Chuẩn vận hành thương mại và logistics',
        ],
        note: 'Đội vận hành cập nhật định kỳ để bảo đảm khả năng đáp ứng bền vững khi thị trường thay đổi.',
      },
    ],
  },
};

type ManufacturingSectionCategory = 'system' | 'supply' | 'process' | 'market';

function getManufacturingSectionCategory(sectionId: string): ManufacturingSectionCategory {
  const supplyIds = new Set(['raw-material-zone', 'wood-supply', 'supply-system', 'material-control']);
  const processIds = new Set([
    'manufacturing-process',
    'equipment-technology',
    'production-machinery',
    'processing-technology',
    'sample-development',
    'processing',
    'assembly',
    'finishing',
    'packaging',
  ]);
  const marketIds = new Set([
    'standards-certificates',
    'production-standards',
    'ecosystem-certifications',
    'product-development-capability',
    'order-handling-capability',
    'custom-production-oem-odm',
    'export-markets',
  ]);

  if (supplyIds.has(sectionId)) {
    return 'supply';
  }
  if (processIds.has(sectionId)) {
    return 'process';
  }
  if (marketIds.has(sectionId)) {
    return 'market';
  }

  return 'system';
}

function getManufacturingDeepPanels(
  sectionId: string,
  sectionTitle: string,
): StructuredPanelContent[] {
  const category = getManufacturingSectionCategory(sectionId);

  if (category === 'supply') {
    return [
      {
        title: 'Chu trình vận hành chuỗi cung ứng',
        paragraphs: ['Chuỗi cung ứng cho mục "' + sectionTitle + '" được vận hành theo chu kỳ kiểm soát khép kín.'],
        bullets: [
          'Forecast nhu cầu vật tư theo rolling plan 4-12 tuần',
          'Đối chiếu năng lực cung ứng với kế hoạch đơn hàng',
          'Theo dõi độ lệch cung ứng và kích hoạt phương án dự phòng',
          'Đóng báo cáo tuần để tối ưu tồn kho và lead time',
        ],
        note: 'Vận hành theo chu kỳ giúp giảm thiếu hụt đầu vào và hạn chế gián đoạn line sản xuất.',
      },
      {
        title: 'KPI trọng yếu cần đạt',
        paragraphs: ['ANSLIFE theo dõi nhóm chỉ số định lượng để duy trì ổn định chuỗi cung ứng.'],
        bullets: [
          'Supplier OTD (On-time Delivery) theo nhà cung cấp',
          'Material Pass Rate tại bước kiểm tra đầu vào',
          'Inventory Health theo từng nhóm vật tư chiến lược',
          'Stock-out Frequency tại các công đoạn trọng yếu',
        ],
      },
    ];
  }

  if (category === 'process') {
    return [
      {
        title: 'Khung thực thi tại hiện trường',
        paragraphs: ['Mỗi công đoạn trong "' + sectionTitle + '" đều được triển khai theo khung thực thi chuẩn.'],
        bullets: [
          'Brief đầu ca: mục tiêu sản lượng, chất lượng, điểm rủi ro',
          'First-piece validation trước khi chạy sản lượng',
          'In-line control theo tần suất đã định nghĩa',
          'End-of-shift review để khóa hành động cải tiến',
        ],
        note: 'Cách vận hành này giúp giảm sai lệch giữa các ca và giữa các line.',
      },
      {
        title: 'Nhóm chỉ số điều hành công đoạn',
        paragraphs: ['Hiệu quả công đoạn được theo dõi bằng nhóm KPI thống nhất toàn hệ thống.'],
        bullets: [
          'First Pass Yield theo line và theo mã hàng',
          'Rework Rate theo từng công đoạn',
          'Cycle Time so với chuẩn kế hoạch',
          'Downtime và nguyên nhân gốc theo ca',
        ],
      },
    ];
  }

  if (category === 'market') {
    return [
      {
        title: 'Chuẩn triển khai theo thị trường',
        paragraphs: ['Nội dung "' + sectionTitle + '" được gắn với yêu cầu thương mại và kỹ thuật của từng khu vực.'],
        bullets: [
          'Chốt tiêu chuẩn kỹ thuật theo market profile',
          'Đồng bộ hồ sơ vận hành - chứng từ - truy xuất',
          'Kiểm tra readiness trước mốc giao hàng quốc tế',
          'Cập nhật định kỳ theo yêu cầu khách hàng chiến lược',
        ],
      },
      {
        title: 'Giá trị mang lại cho khách hàng quốc tế',
        paragraphs: ['Cách triển khai theo hệ thống tạo lợi thế rõ ràng trong hợp tác dài hạn.'],
        bullets: [
          'Giảm rủi ro sai lệch tiêu chuẩn giữa các lô',
          'Tăng tính minh bạch dữ liệu đơn hàng',
          'Rút ngắn vòng phản hồi khi có phát sinh',
          'Giữ độ ổn định khi mở rộng sản lượng theo mùa vụ',
        ],
      },
    ];
  }

  return [
    {
      title: 'Cơ chế điều phối vận hành',
      paragraphs: ['Phần "' + sectionTitle + '" được vận hành theo cơ chế điều phối đa lớp của ANSLIFE.'],
      bullets: [
        'Kỹ thuật chốt chuẩn trước khi thực thi',
        'Kế hoạch phân bổ năng lực theo ưu tiên đơn hàng',
        'QC và data kiểm soát xuyên suốt theo checkpoint',
        'Review tuần để đóng CAPA và tối ưu hệ thống',
      ],
    },
    {
      title: 'KPI hệ thống theo dõi',
      paragraphs: ['Đội điều hành bám sát KPI theo chu kỳ để bảo đảm hiệu quả triển khai thực tế.'],
      bullets: [
        'OTIF theo đơn hàng và theo thị trường',
        'Tỷ lệ lỗi trọng yếu theo công đoạn',
        'Lead time thực tế so với kế hoạch cam kết',
        'Tỷ lệ đóng hành động cải tiến đúng hạn',
      ],
    },
  ];
}

function getManufacturingDeepBlocks(
  sectionId: string,
  sectionTitle: string,
): StructuredBlockContent[] {
  const category = getManufacturingSectionCategory(sectionId);

  if (category === 'supply') {
    return [
      {
        title: 'Giá trị vận hành',
        paragraphs: ['Với "' + sectionTitle + '", ANSLIFE tập trung tạo lợi thế bằng độ ổn định đầu vào thay vì phản ứng thụ động.'],
        bullets: [
          'Tăng độ chắc chắn của kế hoạch sản xuất',
          'Giảm chi phí phát sinh do thiếu hụt vật tư',
          'Giữ chất lượng đầu vào đồng đều theo lô',
        ],
      },
      {
        title: 'Cam kết hệ sinh thái',
        paragraphs: ['ANSLIFE duy trì cơ chế phối hợp liên phòng ban để bảo vệ tính liên tục của chuỗi cung ứng.'],
        bullets: [
          'Mua hàng, kho, QC và sản xuất dùng cùng một nguồn dữ liệu',
          'Rà soát rủi ro nhà cung cấp theo chu kỳ',
          'Kích hoạt phương án dự phòng trước khi ảnh hưởng giao hàng',
        ],
      },
    ];
  }

  if (category === 'process') {
    return [
      {
        title: 'Giá trị cho khách hàng',
        paragraphs: ['Chuẩn hóa "' + sectionTitle + '" giúp khách hàng nhận được chất lượng ổn định ở quy mô thương mại.'],
        bullets: [
          'Giảm biến động giữa mẫu duyệt và sản phẩm giao',
          'Rút ngắn thời gian xử lý lỗi tái diễn',
          'Tăng độ tin cậy của tiến độ bàn giao',
        ],
      },
      {
        title: 'Định hướng cải tiến liên tục',
        paragraphs: ['ANSLIFE xem mỗi công đoạn là một hệ thống có thể đo lường và cải tiến.'],
        bullets: [
          'Cập nhật SOP dựa trên dữ liệu thực thi',
          'Đóng vòng CAPA theo nguyên nhân gốc',
          'Nâng chuẩn vận hành theo từng quý',
        ],
      },
    ];
  }

  if (category === 'market') {
    return [
      {
        title: 'Giá trị thương mại',
        paragraphs: ['Nội dung "' + sectionTitle + '" giúp ANSLIFE đồng bộ sản xuất với yêu cầu thương mại quốc tế.'],
        bullets: [
          'Rõ tiêu chuẩn, rõ chứng từ, rõ trách nhiệm',
          'Giảm tranh chấp dữ liệu trong quá trình giao dịch',
          'Tăng năng lực phục vụ khách hàng dài hạn',
        ],
      },
      {
        title: 'Năng lực mở rộng',
        paragraphs: ['Cơ chế vận hành theo chuẩn giúp mở rộng thị trường mà không đánh đổi chất lượng thực thi.'],
        bullets: [
          'Nhân rộng nhanh qua mạng lưới nhà máy',
          'Đồng bộ chuẩn tuân thủ giữa các bên',
          'Duy trì minh bạch dữ liệu khi tăng sản lượng',
        ],
      },
    ];
  }

  return [
    {
      title: 'Giá trị hệ thống',
      paragraphs: ['Phần "' + sectionTitle + '" được thiết kế để phục vụ mục tiêu tăng trưởng có kiểm soát của ANSLIFE.'],
      bullets: [
        'Mở rộng năng lực thực thi theo kế hoạch',
        'Giữ chuẩn chất lượng trên toàn hệ sinh thái',
        'Tăng mức minh bạch trong toàn bộ chuỗi vận hành',
      ],
    },
    {
      title: 'Cam kết triển khai',
      paragraphs: ['ANSLIFE cam kết duy trì cơ chế quản trị dựa trên dữ liệu thực tế, không dựa vào cảm tính.'],
      bullets: [
        'Đo lường định kỳ theo KPI trọng yếu',
        'Can thiệp sớm khi phát hiện rủi ro',
        'Duy trì cải tiến liên tục theo chu kỳ',
      ],
    },
  ];
}

const AI_ABOUT_SECTION_CONTENT_JP: Record<string, string> = {
  'company-info': ABOUT_COMPANY_INFO_SECTION_JP,
};

const AI_ABOUT_SECTION_CONTENT_KR: Record<string, string> = {
  'company-info': ABOUT_COMPANY_INFO_SECTION_KR,
};

function enrichManufacturingSectionContent(
  sectionId: string,
  section: StructuredSectionContent,
): StructuredSectionContent {
  const enrichedPanels = [...section.panels, ...getManufacturingDeepPanels(sectionId, section.title)];
  const enrichedBlocks = [...(section.blocks ?? []), ...getManufacturingDeepBlocks(sectionId, section.title)];

  return {
    ...section,
    panels: enrichedPanels,
    blocks: enrichedBlocks,
  };
}

const AI_MANUFACTURING_SECTION_CONTENT: Record<string, string> = Object.fromEntries(
  Object.entries(MANUFACTURING_SECTION_TEMPLATES).map(([sectionId, section]) => {
    const enrichedSection = enrichManufacturingSectionContent(sectionId, section);
    return [sectionId, buildStructuredCompanySectionHtml(sectionId, enrichedSection)];
  }),
) as Record<string, string>;

const QUALITY_SECTION_TEMPLATES: Record<string, StructuredSectionContent> = {
  'qc-philosophy': {
    title: 'Triết lý QC',
    kicker: 'QUALITY PHILOSOPHY',
    lead:
      'ANSLIFE vận hành QC theo triết lý phòng ngừa trước, phát hiện sớm và cải tiến liên tục để giữ chất lượng ổn định ở quy mô xuất khẩu.',
    keyline: 'Chất lượng được tạo ra bởi hệ thống kiểm soát, không phải kiểm tra cuối kỳ.',
    panels: [
      {
        title: 'Nguyên tắc cốt lõi',
        paragraphs: ['QC tại ANSLIFE được xây trên ba nguyên tắc vận hành xuyên suốt.'],
        bullets: [
          'Ngăn lỗi từ gốc thay vì sửa lỗi ở cuối',
          'Đo lường theo dữ liệu hiện trường theo thời gian thực',
          'Chuẩn hóa bài học để ngăn lỗi tái diễn',
        ],
      },
      {
        title: 'Định nghĩa chất lượng tại ANSLIFE',
        paragraphs: ['Chất lượng không chỉ là ngoại quan thành phẩm mà là độ ổn định của toàn bộ quá trình.'],
        bullets: [
          'Đúng chuẩn kỹ thuật đã cam kết',
          'Đúng tiến độ giao hàng đã xác nhận',
          'Đúng hồ sơ truy xuất và chứng từ liên quan',
        ],
      },
      {
        title: 'Trách nhiệm liên phòng ban',
        paragraphs: ['QC không tách rời sản xuất, kỹ thuật và kế hoạch; mọi bộ phận cùng chịu trách nhiệm chất lượng.'],
        bullets: [
          'Kỹ thuật chốt chuẩn trước thực thi',
          'Sản xuất tuân thủ SOP theo checkpoint',
          'QC xác minh và phản hồi theo dữ liệu',
        ],
      },
      {
        title: 'Giá trị mang lại cho khách hàng',
        paragraphs: ['Triết lý QC giúp khách hàng giảm rủi ro vận hành trong suốt vòng đời đơn hàng.'],
        bullets: [
          'Giảm lỗi lặp giữa các lô',
          'Tăng độ tin cậy giao hàng',
          'Minh bạch nguyên nhân và hành động khắc phục',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI định hướng chất lượng',
        paragraphs: ['ANSLIFE theo dõi KPI chất lượng theo tuần và theo tháng để cải tiến có mục tiêu.'],
        bullets: [
          'First Pass Yield theo công đoạn',
          'Rework Rate theo line sản xuất',
          'Repeat Defect Rate theo mã lỗi',
        ],
      },
      {
        title: 'Cam kết QC',
        paragraphs: ['Chúng tôi ưu tiên chất lượng nhất quán và khả năng kiểm soát rủi ro dài hạn cho khách hàng quốc tế.'],
      },
    ],
  },
  'qc-system': {
    title: 'Hệ thống QC',
    kicker: 'QUALITY CONTROL SYSTEM',
    lead:
      'Hệ thống QC của ANSLIFE được thiết kế đa lớp theo từng công đoạn, kết nối kiểm tra hiện trường với dữ liệu điều hành tập trung.',
    keyline: 'Một hệ thống QC đồng bộ cho toàn bộ chuỗi sản xuất.',
    panels: [
      {
        title: 'Cấu trúc tổ chức QC',
        paragraphs: ['Tổ chức QC gồm nhiều vai trò phối hợp để tăng độ phủ kiểm soát.'],
        bullets: [
          'QC line tại nhà máy',
          'QC leader theo cụm công đoạn',
          'Data controller tổng hợp và phân tích lỗi',
        ],
      },
      {
        title: 'Checkpoint theo công đoạn',
        paragraphs: ['Mỗi công đoạn đều có điểm kiểm bắt buộc trước khi chuyển tiếp.'],
        bullets: [
          'Input check trước khi cấp phát vật tư',
          'In-line check trong quá trình gia công/lắp ráp',
          'Final check trước đóng gói và xuất hàng',
        ],
      },
      {
        title: 'Dữ liệu QC và truy xuất',
        paragraphs: ['Mọi kết quả kiểm tra được gắn theo mã lô, mã đơn và công đoạn để truy xuất nhanh.'],
        bullets: [
          'Ghi nhận lỗi theo mã nguyên nhân',
          'Lưu lịch sử kiểm tra theo ca',
          'Đối chiếu dữ liệu khi phát sinh khiếu nại',
        ],
      },
      {
        title: 'Cơ chế CAPA',
        paragraphs: ['Khi phát hiện lỗi trọng yếu, hệ thống kích hoạt CAPA và theo dõi tới khi đóng hoàn toàn.'],
        bullets: [
          'Xác định nguyên nhân gốc',
          'Triển khai khắc phục và phòng ngừa',
          'Xác minh hiệu lực sau cải tiến',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI hệ thống QC',
        paragraphs: ['Đội QC theo dõi KPI để đánh giá cả chất lượng lẫn tốc độ phản hồi.'],
        bullets: [
          'Defect Rate theo công đoạn',
          'CAPA Closure On-time',
          'Line Hold Frequency',
        ],
      },
      {
        title: 'Hiệu quả vận hành',
        paragraphs: ['Hệ thống QC tốt giúp giảm rework, giảm trễ tiến độ và tăng độ ổn định khi scale sản lượng.'],
      },
    ],
  },
  'input-inspection': {
    title: 'Kiểm tra nguyên liệu',
    kicker: 'INPUT INSPECTION',
    lead:
      'Kiểm tra đầu vào là lớp bảo vệ đầu tiên của hệ thống chất lượng, giúp chặn lỗi ngay trước khi vật tư vào line sản xuất.',
    keyline: 'Kiểm chặt đầu vào để giảm lỗi truyền công đoạn.',
    panels: [
      {
        title: 'Phạm vi kiểm tra',
        paragraphs: ['Input inspection áp dụng cho cả gỗ chính và vật tư phụ trợ.'],
        bullets: [
          'Độ ẩm, quy cách và dung sai kích thước',
          'Chất lượng bề mặt, cấu trúc và tính đồng đều',
          'Mức phù hợp với tiêu chuẩn mã hàng',
        ],
      },
      {
        title: 'Quy trình kiểm đầu vào',
        paragraphs: ['Quy trình được chuẩn hóa để bảo đảm tính nhất quán giữa các lô.'],
        bullets: [
          'Lấy mẫu theo tỷ lệ định nghĩa',
          'Đo kiểm và đối chiếu tiêu chí kỹ thuật',
          'Phân loại đạt/chưa đạt theo checklist',
        ],
      },
      {
        title: 'Xử lý lô không phù hợp',
        paragraphs: ['Lô không đạt được cách ly và xử lý theo cơ chế CAPA nội bộ.'],
        bullets: [
          'Tạm ngừng cấp phát vào sản xuất',
          'Thông báo nhà cung cấp và yêu cầu hành động',
          'Theo dõi tái diễn theo mã lỗi',
        ],
      },
      {
        title: 'Phối hợp với nhà cung cấp',
        paragraphs: ['Dữ liệu đầu vào được dùng để đánh giá và nâng cấp năng lực nhà cung ứng.'],
        bullets: [
          'Xếp hạng chất lượng theo chu kỳ',
          'Rà soát kế hoạch cải tiến định kỳ',
          'Tối ưu nguồn cung theo hiệu suất thực',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI đầu vào',
        paragraphs: ['Chỉ số đầu vào là cơ sở dự báo sớm rủi ro chất lượng cho toàn đơn hàng.'],
        bullets: [
          'Incoming Pass Rate',
          'Supplier Defect PPM',
          'Lot Rejection Frequency',
        ],
      },
      {
        title: 'Giá trị kiểm soát',
        paragraphs: ['Input inspection giúp giảm chi phí ẩn do lỗi gốc và tăng độ ổn định của công đoạn gia công phía sau.'],
      },
    ],
  },
  'in-process-inspection': {
    title: 'Kiểm tra trong sản xuất',
    kicker: 'IN-PROCESS INSPECTION',
    lead:
      'In-process inspection được triển khai trực tiếp tại line để phát hiện sai lệch sớm và xử lý ngay trong cùng ca sản xuất.',
    keyline: 'Phát hiện sớm để giảm lỗi hàng loạt.',
    panels: [
      {
        title: 'Điểm kiểm trong công đoạn',
        paragraphs: ['QC in-line tập trung tại các điểm có rủi ro chất lượng cao.'],
        bullets: [
          'Gia công: kích thước, dung sai, độ vuông góc',
          'Lắp ráp: độ khít, độ vững, lực siết',
          'Sơn: độ phủ, màu sắc, ngoại quan',
        ],
      },
      {
        title: 'Cơ chế phản hồi nhanh',
        paragraphs: ['Khi phát hiện sai lệch, QC phối hợp kỹ thuật và sản xuất để điều chỉnh ngay tại line.'],
        bullets: [
          'Khoanh vùng lỗi theo ca và mã hàng',
          'Can thiệp tham số/ thao tác tức thời',
          'Xác nhận lại trước khi tiếp tục sản lượng',
        ],
      },
      {
        title: 'Chuẩn hóa dữ liệu lỗi',
        paragraphs: ['Mọi lỗi in-line được mã hóa để phân tích xu hướng cải tiến dài hạn.'],
        bullets: [
          'Mã lỗi theo nhóm nguyên nhân',
          'Tần suất lỗi theo line',
          'Tác động lỗi tới tiến độ và rework',
        ],
      },
      {
        title: 'Đóng vòng cải tiến',
        paragraphs: ['Dữ liệu in-line được tổng hợp cuối ca và đưa vào hành động cải tiến liên tục.'],
        bullets: [
          'Cập nhật SOP khi có lỗi tái diễn',
          'Đào tạo lại thao tác trọng yếu',
          'Theo dõi hiệu quả cải tiến theo tuần',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI in-line',
        paragraphs: ['Mục tiêu của in-line inspection là vừa giảm lỗi vừa bảo vệ nhịp sản xuất.'],
        bullets: [
          'In-line Defect Rate',
          'Rework Rate theo công đoạn',
          'Reaction Time từ phát hiện đến xử lý',
        ],
      },
      {
        title: 'Hiệu quả thực thi',
        paragraphs: ['Kiểm trong sản xuất giúp giảm gánh nặng kiểm cuối và tăng xác suất giao hàng đúng kế hoạch.'],
      },
    ],
  },
  'pre-shipment-inspection': {
    title: 'Kiểm tra trước xuất hàng',
    kicker: 'PRE-SHIPMENT INSPECTION',
    lead:
      'Pre-shipment inspection là cổng kiểm cuối cùng trước logistics, bảo đảm lô hàng đạt chuẩn kỹ thuật, đóng gói và chứng từ.',
    keyline: 'Chỉ xuất hàng khi đạt đủ điều kiện giao quốc tế.',
    panels: [
      {
        title: 'Phạm vi kiểm tra PSI',
        paragraphs: ['PSI đánh giá toàn diện lô hàng trước bàn giao logistics.'],
        bullets: [
          'Ngoại quan và chức năng sản phẩm',
          'Số lượng và cấu hình đóng gói',
          'Nhãn mác, manual, packing list',
        ],
      },
      {
        title: 'Phương pháp lấy mẫu',
        paragraphs: ['Lấy mẫu được thực hiện theo mức AQL phù hợp với yêu cầu đơn hàng.'],
        bullets: [
          'Định mức sample size theo quy định',
          'Đánh giá mức lỗi critical/major/minor',
          'Quy tắc pass/fail minh bạch',
        ],
      },
      {
        title: 'Kiểm soát chứng từ',
        paragraphs: ['Bộ chứng từ được kiểm tra chéo với dữ liệu thực tế trước khi phát hành.'],
        bullets: [
          'Khớp số liệu kiện và số lượng',
          'Đúng thông tin model/spec',
          'Sẵn sàng cho mốc booking/shipment',
        ],
      },
      {
        title: 'Shipment readiness gate',
        paragraphs: ['Lô hàng chỉ được release khi toàn bộ điều kiện PSI đều đạt.'],
        bullets: [
          'Đạt chất lượng theo tiêu chí chốt',
          'Đạt tiêu chuẩn đóng gói xuất khẩu',
          'Đủ bộ hồ sơ bàn giao',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI trước xuất hàng',
        paragraphs: ['Đội QC theo dõi KPI PSI để nâng độ tin cậy giao hàng theo từng thị trường.'],
        bullets: [
          'PSI Pass Rate',
          'Shipment Hold Rate',
          'Claim Rate sau giao hàng',
        ],
      },
      {
        title: 'Cam kết giao hàng',
        paragraphs: ['Mục tiêu là khách hàng nhận đúng chất lượng, đúng số lượng, đúng thời gian và đúng hồ sơ đã thống nhất.'],
      },
    ],
  },
  'quality-improvement-cases': {
    title: 'Case cải tiến chất lượng',
    kicker: 'QUALITY IMPROVEMENT CASES',
    lead:
      'ANSLIFE chuẩn hóa các case cải tiến thành tài sản hệ thống để rút ngắn thời gian xử lý và tăng tốc độ nâng chuẩn chất lượng.',
    keyline: 'Mỗi lỗi được đóng thành bài học có thể nhân rộng.',
    panels: [
      {
        title: 'Framework cải tiến',
        paragraphs: ['Mỗi case đều đi qua chu trình phân tích và xác minh hiệu lực rõ ràng.'],
        bullets: [
          'Define vấn đề theo dữ liệu thực tế',
          'Analyze nguyên nhân gốc đa chiều',
          'Implement hành động khắc phục/phòng ngừa',
          'Verify hiệu quả trước khi đóng case',
        ],
      },
      {
        title: 'Case kết cấu & lắp ráp',
        paragraphs: ['Nhóm case này tập trung giảm lỗi sai khớp và tăng ổn định kết cấu.'],
        bullets: [
          'Chuẩn hóa trình tự lắp ráp',
          'Tối ưu điểm kiểm lực siết',
          'Giảm lỗi lệch khớp ở sản phẩm module',
        ],
      },
      {
        title: 'Case bề mặt & hoàn thiện',
        paragraphs: ['Nhóm case hoàn thiện giúp tăng độ đồng đều ngoại quan giữa các lô.'],
        bullets: [
          'Ổn định tham số sơn theo điều kiện line',
          'Giảm sai lệch màu theo batch',
          'Tăng độ bền bề mặt sau vận chuyển',
        ],
      },
      {
        title: 'Case đóng gói & logistics',
        paragraphs: ['Nhóm case này tập trung giảm hư hại trong chuỗi vận chuyển quốc tế.'],
        bullets: [
          'Tối ưu cấu trúc carton và vật liệu đệm',
          'Chuẩn hóa vị trí kiện hóa theo model',
          'Giảm tỷ lệ damage claim sau giao hàng',
        ],
      },
    ],
    blocks: [
      {
        title: 'Cơ chế nhân rộng bài học',
        paragraphs: ['Case đã đóng được chuyển thành chuẩn vận hành để áp dụng cho dự án tương tự.'],
        bullets: [
          'Cập nhật SOP và checklist QC',
          'Huấn luyện lại đội vận hành liên quan',
          'Theo dõi chỉ số sau cải tiến',
        ],
      },
      {
        title: 'Thông điệp cải tiến',
        paragraphs: ['ANSLIFE không chỉ sửa lỗi đã xảy ra, mà xây hệ thống để lỗi khó lặp lại trong tương lai.'],
      },
    ],
  },
};

const AI_QUALITY_SECTION_CONTENT: Record<string, string> = Object.fromEntries(
  Object.entries(QUALITY_SECTION_TEMPLATES).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-quality-company-intro',
    ),
  ]),
) as Record<string, string>;

const COMMERCIAL_SECTION_TEMPLATES: Record<string, StructuredSectionContent> = {
  'order-flow': {
    title: 'Quy trình đặt hàng',
    kicker: 'ORDER FLOW',
    lead:
      'ANSLIFE vận hành quy trình đặt hàng theo chuỗi dữ liệu minh bạch từ RFQ đến bàn giao, giúp khách hàng quốc tế kiểm soát rõ chất lượng, tiến độ và rủi ro thương mại.',
    keyline: 'Mỗi đơn hàng đi qua các mốc kiểm soát rõ ràng, có dữ liệu xác nhận.',
    panels: [
      {
        title: 'Bước 1 - Tiếp nhận yêu cầu',
        paragraphs: ['Đội ngũ thương mại tiếp nhận RFQ và chuẩn hóa thông tin đầu vào trước khi báo giá.'],
        bullets: [
          'Xác định quy cách kỹ thuật và tiêu chuẩn chất lượng',
          'Đối chiếu điều kiện giao hàng mục tiêu',
          'Lập danh mục dữ liệu cần xác minh với nhà máy',
        ],
      },
      {
        title: 'Bước 2 - Chốt giải pháp & báo giá',
        paragraphs: ['ANSLIFE phối hợp kỹ thuật, sản xuất và QC để xây dựng phương án khả thi trước khi xác nhận giá.'],
        bullets: [
          'Phân tích BOM, công đoạn và rủi ro kỹ thuật',
          'Ước tính lead time theo năng lực thực tế',
          'Chốt phạm vi trách nhiệm thương mại và chứng từ',
        ],
      },
      {
        title: 'Bước 3 - Xác nhận đơn hàng',
        paragraphs: ['Đơn hàng chỉ được mở khi điều kiện kỹ thuật và thương mại được chốt đầy đủ.'],
        bullets: [
          'PO/PI được đối chiếu và khóa thông số',
          'Xác nhận milestone thanh toán và sản xuất',
          'Phân bổ nhà máy theo năng lực phù hợp',
        ],
      },
      {
        title: 'Bước 4 - Theo dõi thực thi',
        paragraphs: ['Trong suốt quá trình sản xuất, khách hàng nhận cập nhật dựa trên dữ liệu đã kiểm soát.'],
        bullets: [
          'Theo dõi tiến độ theo từng mốc',
          'Ghi nhận QC theo công đoạn trọng yếu',
          'Phát hành cập nhật định kỳ theo chuẩn báo cáo',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI đơn hàng',
        paragraphs: ['Quy trình đặt hàng được đo bằng chỉ số hiệu quả thực thi để duy trì độ ổn định dài hạn.'],
        bullets: [
          'Order Confirmation Lead Time',
          'On-time Milestone Completion',
          'Order Change Frequency',
        ],
      },
      {
        title: 'Giá trị cho khách hàng',
        paragraphs: ['Order flow chuẩn giúp giảm trao đổi lặp, giảm hiểu sai yêu cầu và tăng tính dự báo của toàn bộ dự án.'],
      },
    ],
  },
  incoterms: {
    title: 'Điều kiện giao hàng (Incoterms)',
    kicker: 'INCOTERMS EXECUTION',
    lead:
      'ANSLIFE tư vấn và vận hành điều kiện giao hàng dựa trên đặc thù từng thị trường, giúp khách hàng kiểm soát tối ưu chi phí, rủi ro và quyền chủ động logistics.',
    keyline: 'Chọn đúng Incoterms để kiểm soát đúng trách nhiệm.',
    panels: [
      {
        title: 'Nguyên tắc lựa chọn Incoterms',
        paragraphs: ['Incoterms được lựa chọn theo năng lực logistics, cấu trúc mua hàng và mức độ kiểm soát mong muốn của khách hàng.'],
        bullets: [
          'Đánh giá điểm giao nhận phù hợp',
          'Phân tích trách nhiệm chi phí - rủi ro',
          'Đồng bộ với phương thức vận chuyển',
        ],
      },
      {
        title: 'Các điều kiện vận hành phổ biến',
        paragraphs: ['ANSLIFE triển khai linh hoạt các điều kiện giao hàng theo bối cảnh đơn hàng.'],
        bullets: [
          'FOB: phù hợp khi khách hàng chủ động hãng tàu',
          'CIF/CFR: phù hợp khi cần tối ưu quy trình mua hàng',
          'EXW: áp dụng khi khách hàng tự quản trị toàn tuyến',
        ],
      },
      {
        title: 'Kiểm soát rủi ro theo điều kiện giao',
        paragraphs: ['Mỗi điều kiện giao hàng đi kèm checklist thực thi để hạn chế tranh chấp.'],
        bullets: [
          'Khóa trách nhiệm tại từng mốc bàn giao',
          'Xác nhận bộ chứng từ tương ứng',
          'Rà soát điểm chuyển giao rủi ro hàng hóa',
        ],
      },
      {
        title: 'Đồng bộ hợp đồng và vận hành',
        paragraphs: ['Điều kiện Incoterms được tích hợp từ hợp đồng đến lịch vận chuyển thực tế.'],
        bullets: [
          'Liên kết điều khoản với PO/PI',
          'Khớp điều kiện booking và chứng từ',
          'Theo dõi tuân thủ trong suốt chu kỳ shipment',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI giao nhận',
        paragraphs: ['ANSLIFE theo dõi chỉ số giao nhận để đo hiệu quả lựa chọn và vận hành Incoterms.'],
        bullets: [
          'On-time Shipment',
          'Document Accuracy Rate',
          'Logistics Exception Rate',
        ],
      },
      {
        title: 'Cam kết thương mại',
        paragraphs: ['Mục tiêu là giao dịch rõ trách nhiệm, giảm chi phí ẩn và giữ trải nghiệm hợp tác ổn định qua nhiều đơn hàng.'],
      },
    ],
  },
  payment: {
    title: 'Phương thức thanh toán',
    kicker: 'PAYMENT TERMS',
    lead:
      'Chính sách thanh toán của ANSLIFE được thiết kế để cân bằng an toàn dòng tiền, tính minh bạch chứng từ và tốc độ triển khai đơn hàng quốc tế.',
    keyline: 'Thanh toán minh bạch để vận hành bền vững.',
    panels: [
      {
        title: 'Các hình thức áp dụng',
        paragraphs: ['ANSLIFE triển khai các phương thức thanh toán phù hợp hồ sơ rủi ro và mức độ hợp tác.'],
        bullets: [
          'T/T theo mốc đặt cọc - trước giao hàng',
          'L/C theo điều kiện chứng từ đã thống nhất',
          'Điều khoản linh hoạt cho đối tác chiến lược',
        ],
      },
      {
        title: 'Mốc thanh toán theo tiến độ',
        paragraphs: ['Milestone thanh toán được gắn chặt với trạng thái thực thi đơn hàng.'],
        bullets: [
          'Kích hoạt sản xuất sau khi xác nhận đặt cọc',
          'Đối chiếu tiến độ sản xuất theo mốc',
          'Giải ngân cuối kỳ theo điều kiện giao hàng',
        ],
      },
      {
        title: 'Kiểm soát chứng từ tài chính',
        paragraphs: ['Bộ chứng từ tài chính được kiểm tra đa lớp trước khi phát hành.'],
        bullets: [
          'Khớp dữ liệu hóa đơn với PO/PI',
          'Kiểm tra điều khoản thanh toán theo hợp đồng',
          'Theo dõi tình trạng công nợ theo khách hàng',
        ],
      },
      {
        title: 'Quản trị rủi ro thanh toán',
        paragraphs: ['Rủi ro thanh toán được quản lý theo nguyên tắc phòng ngừa từ đầu giao dịch.'],
        bullets: [
          'Đánh giá tín nhiệm đối tác định kỳ',
          'Thiết lập ngưỡng cảnh báo công nợ',
          'Kích hoạt quy trình xử lý khi quá hạn',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI tài chính thương mại',
        paragraphs: ['Đội ngũ theo dõi KPI để bảo đảm dòng tiền và độ an toàn giao dịch.'],
        bullets: [
          'Collection On-time Rate',
          'Overdue Ratio',
          'Dispute Resolution Lead Time',
        ],
      },
      {
        title: 'Giá trị hợp tác',
        paragraphs: ['Khung thanh toán rõ ràng giúp hai bên giảm tranh chấp, tăng độ tin cậy và nâng hiệu suất vận hành đơn hàng dài hạn.'],
      },
    ],
  },
  'lead-time': {
    title: 'Thời gian sản xuất',
    kicker: 'LEAD TIME MANAGEMENT',
    lead:
      'ANSLIFE quản trị lead time theo từng nhóm sản phẩm, năng lực nhà máy và mức độ phức tạp kỹ thuật để cam kết tiến độ có cơ sở.',
    keyline: 'Lead time được lập theo dữ liệu năng lực thực, không ước lượng cảm tính.',
    panels: [
      {
        title: 'Cấu trúc lead time',
        paragraphs: ['Lead time được chia thành các pha để kiểm soát chi tiết thay vì quản trị tổng quát.'],
        bullets: [
          'Kỹ thuật & xác nhận mẫu',
          'Mua vật tư và chuẩn bị line',
          'Sản xuất, QC, đóng gói và sẵn sàng xuất',
        ],
      },
      {
        title: 'Yếu tố ảnh hưởng tiến độ',
        paragraphs: ['ANSLIFE đánh giá sớm các yếu tố có thể gây chậm để chủ động phương án dự phòng.'],
        bullets: [
          'Mức độ mới của sản phẩm',
          'Tình trạng nguồn cung nguyên liệu',
          'Mùa cao điểm logistics và lịch tàu',
        ],
      },
      {
        title: 'Cơ chế điều phối tiến độ',
        paragraphs: ['Tiến độ được điều phối tập trung để giữ nhịp thực thi ổn định giữa các nhà máy.'],
        bullets: [
          'Phân bổ công suất theo năng lực',
          'Theo dõi daily output theo line',
          'Can thiệp sớm khi có tín hiệu trễ',
        ],
      },
      {
        title: 'Cập nhật cho khách hàng',
        paragraphs: ['Thông tin tiến độ được chia sẻ theo mốc thống nhất và có dữ liệu đối chiếu.'],
        bullets: [
          'Báo cáo milestone theo tuần',
          'Cảnh báo sớm khi phát sinh rủi ro',
          'Đề xuất phương án phục hồi tiến độ',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI tiến độ',
        paragraphs: ['Mục tiêu lead time là đúng hạn nhưng vẫn bảo toàn chuẩn chất lượng đầu ra.'],
        bullets: [
          'OTD - On-time Delivery',
          'Schedule Adherence',
          'Recovery Time từ sự cố tiến độ',
        ],
      },
      {
        title: 'Cam kết tiến độ',
        paragraphs: ['ANSLIFE ưu tiên tiến độ có kiểm soát, tránh đẩy nhanh bằng cách đánh đổi chất lượng hoặc tính minh bạch dữ liệu.'],
      },
    ],
  },
  logistics: {
    title: 'Hậu cần',
    kicker: 'LOGISTICS EXECUTION',
    lead:
      'ANSLIFE điều phối hậu cần từ đóng gói xuất khẩu, booking đến bàn giao chứng từ để đảm bảo lô hàng đi đúng tuyến, đúng lịch và đúng tiêu chuẩn.',
    keyline: 'Logistics là phần mở rộng của hệ thống kiểm soát chất lượng.',
    panels: [
      {
        title: 'Chuẩn đóng gói xuất khẩu',
        paragraphs: ['Đóng gói được thiết kế theo đặc tính sản phẩm và yêu cầu thị trường đích.'],
        bullets: [
          'Tối ưu cấu trúc carton và vật liệu đệm',
          'Kiểm soát nhãn mác và mã truy xuất',
          'Đáp ứng yêu cầu bảo vệ hàng hóa tuyến dài',
        ],
      },
      {
        title: 'Điều phối vận chuyển',
        paragraphs: ['Đội logistics phối hợp với thương mại để chốt booking phù hợp lịch giao đã cam kết.'],
        bullets: [
          'Lựa chọn tuyến vận chuyển tối ưu',
          'Theo dõi cut-off và lịch tàu',
          'Giám sát cột mốc bàn giao container',
        ],
      },
      {
        title: 'Quản lý chứng từ giao hàng',
        paragraphs: ['Bộ chứng từ được kiểm tra chéo trước phát hành để giảm lỗi thủ tục quốc tế.'],
        bullets: [
          'Commercial Invoice và Packing List',
          'Bill of Lading và chứng từ liên quan',
          'Đối chiếu số liệu kiện hóa và mã hàng',
        ],
      },
      {
        title: 'Xử lý ngoại lệ logistics',
        paragraphs: ['Khi phát sinh sự cố, hệ thống kích hoạt quy trình phản ứng nhanh liên phòng ban.'],
        bullets: [
          'Khoanh vùng nguyên nhân theo mốc sự cố',
          'Cập nhật khách hàng theo thời gian thực',
          'Triển khai hành động khắc phục và phòng ngừa',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI hậu cần',
        paragraphs: ['Hiệu quả logistics được đo đồng thời trên tốc độ, độ chính xác và mức rủi ro sau giao hàng.'],
        bullets: [
          'On-time Shipment Rate',
          'Documentation Accuracy',
          'Damage/Claim Rate',
        ],
      },
      {
        title: 'Thông điệp vận hành',
        paragraphs: ['ANSLIFE không chỉ giao hàng đúng hạn mà còn duy trì trải nghiệm giao nhận ổn định, minh bạch và có thể dự báo.'],
      },
    ],
  },
};

const AI_COMMERCIAL_SECTION_CONTENT: Record<string, string> = Object.fromEntries(
  Object.entries(COMMERCIAL_SECTION_TEMPLATES).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-commercial-company-intro',
    ),
  ]),
) as Record<string, string>;

const GLOBAL_NETWORK_SECTION_TEMPLATES: Record<string, StructuredSectionContent> = {
  'vietnam-hq': {
    title: 'Việt Nam - Trụ sở',
    kicker: 'VIETNAM HEADQUARTERS',
    lead:
      'Trụ sở Việt Nam là trung tâm điều phối vận hành của ANSLIFE, nơi kết nối sản xuất, QC, dữ liệu và thương mại quốc tế trên cùng một hệ thống quản trị.',
    keyline: 'Một đầu mối điều phối để toàn mạng lưới vận hành đồng bộ.',
    panels: [
      {
        title: 'Vai trò điều phối trung tâm',
        paragraphs: ['Trụ sở chịu trách nhiệm điều phối các hoạt động xuyên suốt hệ sinh thái sản xuất.'],
        bullets: [
          'Hoạch định năng lực và kế hoạch đơn hàng',
          'Điều phối phối hợp giữa nhà máy - QC - thương mại',
          'Kiểm soát chuẩn dữ liệu và báo cáo vận hành',
        ],
      },
      {
        title: 'Chuẩn hóa hệ thống',
        paragraphs: ['Mọi chuẩn kỹ thuật và tiêu chí kiểm soát được xây dựng và cập nhật từ trụ sở.'],
        bullets: [
          'Chuẩn bản vẽ, BOM và quy trình công đoạn',
          'Chuẩn checklist QC theo nhóm sản phẩm',
          'Chuẩn báo cáo theo mốc tiến độ và rủi ro',
        ],
      },
      {
        title: 'Quản trị rủi ro chuỗi cung ứng',
        paragraphs: ['Trụ sở theo dõi tín hiệu rủi ro để can thiệp sớm trước khi ảnh hưởng giao hàng.'],
        bullets: [
          'Cảnh báo sớm về vật tư và công suất',
          'Phân bổ lại sản lượng giữa các nhà máy',
          'Kích hoạt phương án dự phòng logistics',
        ],
      },
      {
        title: 'Hỗ trợ khách hàng quốc tế',
        paragraphs: ['Trụ sở là đầu mối giao tiếp kỹ thuật và vận hành cho các thị trường xuất khẩu chính.'],
        bullets: [
          'Đồng bộ thông tin dự án theo thời gian thực',
          'Phản hồi thay đổi kỹ thuật có kiểm soát',
          'Theo dõi cam kết chất lượng và tiến độ dài hạn',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI vận hành trụ sở',
        paragraphs: ['Hiệu quả điều phối của trụ sở được đo bằng chỉ số xuyên chuỗi.'],
        bullets: [
          'OTD - On-time Delivery',
          'Cross-site Defect Consistency',
          'Issue Resolution Lead Time',
        ],
      },
      {
        title: 'Thông điệp trung tâm',
        paragraphs: ['Trụ sở không chỉ quản lý giao dịch mà quản trị toàn bộ hệ thống để khách hàng nhận được năng lực sản xuất ổn định ở quy mô quốc tế.'],
      },
    ],
  },
  'singapore-office': {
    title: 'Singapore - Văn phòng đại diện',
    kicker: 'SINGAPORE REPRESENTATIVE OFFICE',
    lead:
      'Văn phòng Singapore là điểm kết nối thương mại khu vực, hỗ trợ ANSLIFE mở rộng hợp tác với đối tác quốc tế thông qua cơ chế làm việc linh hoạt và minh bạch.',
    keyline: 'Cầu nối khu vực giữa thị trường và năng lực sản xuất.',
    panels: [
      {
        title: 'Vai trò thị trường khu vực',
        paragraphs: ['Singapore office tập trung kết nối nhu cầu thị trường với khả năng thực thi của hệ sinh thái ANSLIFE.'],
        bullets: [
          'Tiếp cận đối tác tại ASEAN và châu Á - Thái Bình Dương',
          'Thu thập yêu cầu sản phẩm theo xu hướng tiêu dùng',
          'Định hướng ưu tiên danh mục hàng xuất khẩu',
        ],
      },
      {
        title: 'Hỗ trợ phát triển khách hàng',
        paragraphs: ['Văn phòng hỗ trợ giai đoạn pre-sales và triển khai dự án ban đầu cho khách hàng mới.'],
        bullets: [
          'Chuẩn hóa yêu cầu RFQ và tiêu chí kỹ thuật',
          'Điều phối mẫu thử và timeline xác nhận',
          'Đồng bộ thông tin hợp đồng với trụ sở',
        ],
      },
      {
        title: 'Điều phối thương mại',
        paragraphs: ['Singapore office hỗ trợ chuẩn hóa nghiệp vụ thương mại theo thông lệ quốc tế.'],
        bullets: [
          'Rà soát điều kiện giao hàng và thanh toán',
          'Hỗ trợ đối chiếu chứng từ thương mại',
          'Giảm sai lệch thông tin giữa các bên',
        ],
      },
      {
        title: 'Tăng tốc phản hồi thị trường',
        paragraphs: ['Dữ liệu từ thị trường được truyền ngược về trụ sở để cải thiện sản phẩm và dịch vụ.'],
        bullets: [
          'Tổng hợp phản hồi khách hàng theo ngành hàng',
          'Đề xuất điều chỉnh chiến lược sản phẩm',
          'Ưu tiên hành động theo cơ hội thị trường',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI phát triển thị trường',
        paragraphs: ['Văn phòng Singapore được đánh giá theo chỉ số tăng trưởng và chất lượng triển khai cơ hội mới.'],
        bullets: [
          'New Qualified Accounts',
          'RFQ-to-PO Conversion',
          'Regional Response Time',
        ],
      },
      {
        title: 'Giá trị chiến lược',
        paragraphs: ['Singapore office giúp ANSLIFE rút ngắn khoảng cách giữa thị trường khu vực và hệ thống sản xuất tại Việt Nam.'],
      },
    ],
  },
  'japan-office': {
    title: 'Nhật Bản - Văn phòng đại diện',
    kicker: 'JAPAN REPRESENTATIVE OFFICE',
    lead:
      'Văn phòng Nhật Bản hỗ trợ ANSLIFE đáp ứng chuẩn chất lượng và chuẩn vận hành khắt khe của thị trường Nhật, đồng thời tăng độ tin cậy hợp tác dài hạn với khách hàng bản địa.',
    keyline: 'Hiểu chuẩn Nhật để thực thi đúng ngay từ đầu.',
    panels: [
      {
        title: 'Kết nối tiêu chuẩn thị trường Nhật',
        paragraphs: ['Japan office làm rõ yêu cầu tiêu chuẩn trước khi đưa vào sản xuất.'],
        bullets: [
          'Diễn giải yêu cầu kỹ thuật chi tiết',
          'Chuẩn hóa kỳ vọng chất lượng và hoàn thiện',
          'Đồng bộ yêu cầu nhãn mác, chứng từ đặc thù',
        ],
      },
      {
        title: 'Hỗ trợ phát triển sản phẩm',
        paragraphs: ['Văn phòng phối hợp R&D để tăng tính khả thi sản xuất cho nhóm sản phẩm theo thị trường Nhật.'],
        bullets: [
          'Phản biện thiết kế theo điều kiện thực thi',
          'Đề xuất tối ưu cấu trúc và vật liệu',
          'Kiểm soát rủi ro trước khi chạy đơn hàng',
        ],
      },
      {
        title: 'Quản trị giao tiếp dự án',
        paragraphs: ['Japan office giúp tăng chất lượng giao tiếp xuyên biên giới trong các dự án nhiều mốc kiểm soát.'],
        bullets: [
          'Chuẩn hóa thông tin theo format khách hàng',
          'Theo dõi tiến độ milestone định kỳ',
          'Rà soát khác biệt trước khi phát sinh tranh chấp',
        ],
      },
      {
        title: 'Củng cố độ tin cậy',
        paragraphs: ['Văn phòng tập trung xây quan hệ dài hạn dựa trên tính ổn định và minh bạch.'],
        bullets: [
          'Duy trì tần suất cập nhật đều đặn',
          'Theo dõi mức hài lòng theo từng dự án',
          'Đóng vòng phản hồi để cải tiến liên tục',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI thị trường Nhật',
        paragraphs: ['Thành công tại thị trường Nhật được đo bằng chất lượng thực thi và độ ổn định qua nhiều lô hàng.'],
        bullets: [
          'First Pass Acceptance',
          'Repeat Order Ratio',
          'Customer Claim Closure Time',
        ],
      },
      {
        title: 'Cam kết thị trường',
        paragraphs: ['ANSLIFE vận hành theo tinh thần chính xác, nhất quán và tôn trọng tiêu chuẩn cao của khách hàng Nhật Bản.'],
      },
    ],
  },
  'us-office': {
    title: 'Hoa Kỳ - Văn phòng đại diện',
    kicker: 'UNITED STATES REPRESENTATIVE OFFICE',
    lead:
      'Văn phòng Hoa Kỳ là điểm tiếp cận thị trường chủ lực của ANSLIFE, tập trung vào tốc độ phản hồi, khả năng scale sản lượng và tính ổn định của chuỗi cung ứng cho khách hàng Bắc Mỹ.',
    keyline: 'Kết nối nhu cầu quy mô lớn với năng lực sản xuất có kiểm soát.',
    panels: [
      {
        title: 'Điều phối cơ hội thị trường',
        paragraphs: ['US office hỗ trợ đánh giá cơ hội theo nhóm khách hàng và nhóm sản phẩm có tiềm năng tăng trưởng.'],
        bullets: [
          'Phân tích nhu cầu theo mùa vụ và kênh bán',
          'Ưu tiên dự án phù hợp năng lực hệ sinh thái',
          'Định hướng chiến lược giá theo mục tiêu dài hạn',
        ],
      },
      {
        title: 'Hỗ trợ dự án quy mô lớn',
        paragraphs: ['Văn phòng Hoa Kỳ phối hợp chặt với trụ sở để triển khai các đơn hàng có sản lượng cao.'],
        bullets: [
          'Khóa yêu cầu kỹ thuật từ giai đoạn sớm',
          'Theo dõi năng lực cung ứng theo quý',
          'Điều phối timeline triển khai nhiều đợt hàng',
        ],
      },
      {
        title: 'Quản trị tuân thủ thương mại',
        paragraphs: ['US office hỗ trợ rà soát yêu cầu tuân thủ và chứng từ phù hợp thị trường nhập khẩu.'],
        bullets: [
          'Đồng bộ yêu cầu chứng từ theo lô',
          'Theo dõi cập nhật quy định thị trường',
          'Giảm rủi ro phát sinh tại khâu thông quan',
        ],
      },
      {
        title: 'Nâng chất lượng dịch vụ khách hàng',
        paragraphs: ['Văn phòng tập trung cải thiện trải nghiệm khách hàng qua phản hồi nhanh và dữ liệu minh bạch.'],
        bullets: [
          'Rút ngắn thời gian phản hồi yêu cầu',
          'Chuẩn hóa cách cập nhật tình trạng đơn hàng',
          'Theo dõi chỉ số hài lòng theo tài khoản',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI thị trường Hoa Kỳ',
        paragraphs: ['US office được đánh giá theo tăng trưởng bền vững và hiệu quả triển khai dự án quy mô lớn.'],
        bullets: [
          'Account Growth Rate',
          'On-time Program Delivery',
          'Escalation Frequency',
        ],
      },
      {
        title: 'Định hướng vận hành',
        paragraphs: ['ANSLIFE ưu tiên xây năng lực phục vụ dài hạn tại Hoa Kỳ bằng hệ thống ổn định thay vì tăng trưởng ngắn hạn thiếu kiểm soát.'],
      },
    ],
  },
  'international-partners': {
    title: 'Đối tác quốc tế',
    kicker: 'INTERNATIONAL PARTNER NETWORK',
    lead:
      'Mạng lưới đối tác quốc tế của ANSLIFE bao gồm khách hàng, nhà cung ứng, đơn vị logistics và đối tác thương mại, cùng vận hành trên nguyên tắc minh bạch và tiêu chuẩn hóa.',
    keyline: 'Mở rộng toàn cầu bằng mạng lưới đối tác được kiểm soát.',
    panels: [
      {
        title: 'Cấu trúc mạng lưới đối tác',
        paragraphs: ['ANSLIFE xây mạng lưới đa lớp để tối ưu hiệu quả từ đầu vào đến đầu ra.'],
        bullets: [
          'Đối tác khách hàng theo từng thị trường',
          'Đối tác nguyên vật liệu theo nhóm ngành hàng',
          'Đối tác vận chuyển và dịch vụ logistics',
        ],
      },
      {
        title: 'Tiêu chí lựa chọn đối tác',
        paragraphs: ['Đối tác được đánh giá theo năng lực thực thi và mức độ phù hợp hệ thống.'],
        bullets: [
          'Năng lực ổn định và khả năng mở rộng',
          'Tuân thủ chuẩn chất lượng và dữ liệu',
          'Mức độ minh bạch trong phối hợp',
        ],
      },
      {
        title: 'Cơ chế hợp tác dài hạn',
        paragraphs: ['ANSLIFE định hướng hợp tác theo mô hình đồng phát triển thay vì giao dịch ngắn hạn.'],
        bullets: [
          'Đồng bộ kế hoạch sản lượng theo chu kỳ',
          'Chia sẻ bài học cải tiến xuyên đối tác',
          'Xây dựng chuẩn phối hợp thống nhất',
        ],
      },
      {
        title: 'Quản trị hiệu suất đối tác',
        paragraphs: ['Mỗi nhóm đối tác đều có KPI và cơ chế review định kỳ để duy trì hiệu quả lâu dài.'],
        bullets: [
          'Đánh giá OTIF và chất lượng định kỳ',
          'Theo dõi rủi ro chuỗi cung ứng',
          'Triển khai kế hoạch nâng chuẩn theo dữ liệu',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI mạng lưới đối tác',
        paragraphs: ['Hiệu quả mạng lưới được đo bằng năng lực phục vụ khách hàng toàn cầu theo chuẩn thống nhất.'],
        bullets: [
          'Partner Onboarding Lead Time',
          'Cross-partner Quality Consistency',
          'Supply Continuity Index',
        ],
      },
      {
        title: 'Thông điệp hợp tác',
        paragraphs: ['ANSLIFE xem đối tác là một phần của hệ sinh thái và cùng xây chuẩn vận hành để phát triển bền vững trên thị trường quốc tế.'],
      },
    ],
  },
};

const AI_GLOBAL_NETWORK_SECTION_CONTENT: Record<string, string> = Object.fromEntries(
  Object.entries(GLOBAL_NETWORK_SECTION_TEMPLATES).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-global-company-intro',
    ),
  ]),
) as Record<string, string>;

const SCHOLARSHIP_SECTION_TEMPLATES: Record<string, StructuredSectionContent> = {
  'fund-overview': {
    title: 'Giới thiệu quỹ',
    kicker: '',
    lead:
      'Quỹ học bổng và cộng đồng ANSLIFE được xây dựng như một chương trình phát triển bền vững, tập trung hỗ trợ giáo dục và tạo tác động tích cực lâu dài cho địa phương.',
    keyline: 'Đầu tư cho con người là nền tảng của phát triển dài hạn.',
    panels: [
      {
        title: 'Mục tiêu của quỹ',
        paragraphs: ['Quỹ được thiết kế với mục tiêu rõ ràng, đo lường được và có tính liên tục qua từng năm.'],
        bullets: [
          'Hỗ trợ học sinh, sinh viên có hoàn cảnh khó khăn',
          'Khuyến khích nỗ lực học tập và phát triển năng lực',
          'Tạo nền tảng để người học theo đuổi mục tiêu dài hạn',
        ],
      },
      {
        title: 'Nguyên tắc vận hành',
        paragraphs: ['ANSLIFE vận hành quỹ theo nguyên tắc minh bạch và trách nhiệm xã hội thực chất.'],
        bullets: [
          'Công khai tiêu chí và phạm vi hỗ trợ',
          'Phân bổ nguồn lực theo kế hoạch rõ ràng',
          'Theo dõi kết quả sau hỗ trợ theo từng giai đoạn',
        ],
      },
      {
        title: 'Phạm vi tác động',
        paragraphs: ['Quỹ không chỉ hỗ trợ tài chính mà còn thúc đẩy cơ hội học tập bền vững.'],
        bullets: [
          'Học bổng định kỳ theo năm học',
          'Hỗ trợ dụng cụ, tài liệu và điều kiện học tập',
          'Kết nối nguồn lực cộng đồng cùng tham gia',
        ],
      },
      {
        title: 'Định hướng phát triển',
        paragraphs: ['Quỹ được xây theo lộ trình dài hạn, gắn với chiến lược phát triển cộng đồng của ANSLIFE.'],
        bullets: [
          'Mở rộng số lượng chương trình hỗ trợ',
          'Nâng chuẩn đánh giá hiệu quả tác động',
          'Tăng mức độ đồng hành với địa phương',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI của quỹ',
        paragraphs: ['Hiệu quả quỹ được theo dõi bằng các chỉ số tác động xã hội cụ thể.'],
        bullets: [
          'Số lượng suất hỗ trợ theo năm',
          'Tỷ lệ duy trì học tập của học viên nhận hỗ trợ',
          'Mức độ tham gia của đối tác cộng đồng',
        ],
      },
      {
        title: 'Thông điệp quỹ',
        paragraphs: ['ANSLIFE tin rằng hỗ trợ đúng người, đúng thời điểm sẽ tạo ra thay đổi bền vững cho nhiều thế hệ.'],
      },
    ],
  },
  'scholarship-program': {
    title: 'Chương trình học bổng',
    kicker: '',
    lead:
      'Chương trình học bổng ANSLIFE tập trung hỗ trợ học sinh, sinh viên có nỗ lực học tập tốt, ưu tiên nhóm có hoàn cảnh khó khăn và tiềm năng phát triển lâu dài.',
    keyline: 'Không chỉ trao học bổng, chúng tôi đồng hành cùng hành trình học tập.',
    panels: [
      {
        title: 'Đối tượng ưu tiên',
        paragraphs: ['Chương trình ưu tiên nhóm học viên cần hỗ trợ để duy trì và phát triển việc học.'],
        bullets: [
          'Học sinh, sinh viên có hoàn cảnh khó khăn',
          'Học viên có ý chí và kết quả học tập tích cực',
          'Nhóm đối tượng tại khu vực ưu tiên cộng đồng',
        ],
      },
      {
        title: 'Cơ cấu hỗ trợ',
        paragraphs: ['Học bổng được thiết kế theo nhiều mức để phù hợp nhu cầu thực tế.'],
        bullets: [
          'Hỗ trợ học phí hoặc chi phí học tập',
          'Hỗ trợ tài liệu, dụng cụ phục vụ học tập',
          'Hỗ trợ theo kỳ hoặc theo năm học',
        ],
      },
      {
        title: 'Quy trình xét chọn',
        paragraphs: ['Quy trình xét chọn được chuẩn hóa để bảo đảm công bằng và minh bạch.'],
        bullets: [
          'Tiếp nhận hồ sơ và xác minh thông tin',
          'Đánh giá theo bộ tiêu chí đã công bố',
          'Phê duyệt và công bố kết quả theo đợt',
        ],
      },
      {
        title: 'Theo dõi sau hỗ trợ',
        paragraphs: ['ANSLIFE theo dõi hiệu quả học bổng để tăng chất lượng chương trình qua từng năm.'],
        bullets: [
          'Cập nhật kết quả học tập định kỳ',
          'Ghi nhận nhu cầu hỗ trợ tiếp theo',
          'Cải tiến tiêu chí dựa trên dữ liệu thực tế',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI chương trình',
        paragraphs: ['Chương trình học bổng được đánh giá bằng chỉ số đầu ra và mức độ bền vững của tác động.'],
        bullets: [
          'Scholarship Retention Rate',
          'Academic Progress Tracking',
          'Program Coverage by Region',
        ],
      },
      {
        title: 'Giá trị đồng hành',
        paragraphs: ['Chương trình hướng tới trao cơ hội học tập bền vững thay vì hỗ trợ ngắn hạn một lần.'],
      },
    ],
  },
  'community-activities': {
    title: 'Hoạt động cộng đồng',
    kicker: '',
    lead:
      'ANSLIFE triển khai hoạt động cộng đồng theo mô hình chương trình nhiều năm, lấy nhu cầu địa phương làm trung tâm và theo dõi hiệu quả bằng dữ liệu thực tế.',
    keyline: 'Không làm theo chiến dịch ngắn hạn, mà xây chương trình có vòng đời rõ ràng.',
    panels: [
      {
        title: 'Danh mục chương trình cộng đồng',
        paragraphs: ['Mỗi năm ANSLIFE triển khai danh mục hoạt động theo ba nhóm tác động chính.'],
        bullets: [
          'Hỗ trợ giáo dục và điều kiện học tập tại địa phương',
          'Hỗ trợ sinh kế cơ bản cho hộ gia đình khó khăn',
          'Cải thiện môi trường sống và không gian học tập cộng đồng',
        ],
      },
      {
        title: 'Quy trình triển khai chương trình',
        paragraphs: ['Mọi hoạt động đều đi qua quy trình chuẩn để bảo đảm hiệu quả nguồn lực.'],
        bullets: [
          'Khảo sát nhu cầu thực địa và xác định nhóm thụ hưởng',
          'Thiết kế mục tiêu, ngân sách và mốc thực hiện',
          'Nghiệm thu kết quả và tổng hợp báo cáo tác động',
        ],
      },
      {
        title: 'Mạng lưới phối hợp địa phương',
        paragraphs: ['ANSLIFE phối hợp cùng trường học, tổ chức địa phương và đối tác xã hội để tăng hiệu lực thực thi.'],
        bullets: [
          'Thiết lập đầu mối địa phương theo từng chương trình',
          'Phân vai trách nhiệm triển khai và giám sát',
          'Duy trì kênh phản hồi trực tiếp từ cộng đồng thụ hưởng',
        ],
      },
      {
        title: 'Chu kỳ đánh giá và cải tiến',
        paragraphs: ['Kết quả chương trình được đánh giá theo chu kỳ quý và năm để liên tục nâng chất lượng hoạt động.'],
        bullets: [
          'Đánh giá đầu ra theo chỉ số đã cam kết',
          'Phân tích điểm nghẽn trong triển khai thực tế',
          'Điều chỉnh kế hoạch năm tiếp theo dựa trên dữ liệu',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI hoạt động cộng đồng',
        paragraphs: ['Hiệu quả cộng đồng được đo bằng mức độ tác động thực tế và khả năng duy trì kết quả.'],
        bullets: [
          'Beneficiary Reach theo từng địa phương',
          'Program Completion Quality Score',
          '12-Month Impact Retention',
        ],
      },
      {
        title: 'Cam kết cộng đồng',
        paragraphs: ['ANSLIFE theo đuổi mô hình phụng sự cộng đồng có hệ thống, có theo dõi và có trách nhiệm đến cùng với kết quả đã công bố.'],
      },
    ],
  },
  'workforce-development': {
    title: 'Phát triển nguồn nhân lực',
    kicker: '',
    lead:
      'ANSLIFE xây chương trình phát triển nguồn nhân lực tập trung vào kỹ năng nghề, tư duy hệ thống và khả năng làm việc theo tiêu chuẩn quốc tế cho thế hệ lao động trẻ.',
    keyline: 'Đầu tư vào con người để tạo năng lực vận hành bền vững cho cộng đồng và doanh nghiệp.',
    panels: [
      {
        title: 'Định hướng phát triển nhân lực',
        paragraphs: ['Chương trình được thiết kế để hình thành lực lượng lao động có kỹ năng và kỷ luật vận hành.'],
        bullets: [
          'Nâng kỹ năng thực hành phù hợp nhu cầu sản xuất thực tế',
          'Tăng năng lực làm việc theo quy trình và tiêu chuẩn',
          'Mở rộng cơ hội nghề nghiệp dài hạn cho người lao động',
        ],
      },
      {
        title: 'Nhóm chương trình đào tạo',
        paragraphs: ['ANSLIFE triển khai đào tạo theo ba nhóm trọng tâm để bảo đảm tính ứng dụng cao.'],
        bullets: [
          'Đào tạo kỹ năng nghề và an toàn làm việc',
          'Đào tạo kỹ năng số và quản trị dữ liệu cơ bản',
          'Đào tạo kỹ năng mềm và tác phong nghề nghiệp',
        ],
      },
      {
        title: 'Mô hình phối hợp đào tạo',
        paragraphs: ['Chương trình được triển khai cùng trường nghề, đối tác chuyên môn và đội ngũ vận hành nội bộ.'],
        bullets: [
          'Thiết kế giáo trình theo năng lực đầu ra',
          'Kết hợp học lý thuyết với thực hành tại hiện trường',
          'Đánh giá năng lực theo tiêu chí thống nhất',
        ],
      },
      {
        title: 'Lộ trình sau đào tạo',
        paragraphs: ['ANSLIFE duy trì cơ chế theo dõi sau đào tạo để tăng tỷ lệ chuyển đổi nghề nghiệp thực chất.'],
        bullets: [
          'Kết nối học viên với cơ hội việc làm phù hợp',
          'Theo dõi tiến bộ năng lực trong 6-12 tháng',
          'Cập nhật nội dung đào tạo theo phản hồi doanh nghiệp',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI phát triển nguồn nhân lực',
        paragraphs: ['Hiệu quả chương trình được đánh giá bằng khả năng ứng dụng nghề và tính bền vững của việc làm.'],
        bullets: [
          'Training Completion Rate',
          'Job Placement Conversion',
          'Workforce Retention After 12 Months',
        ],
      },
      {
        title: 'Thông điệp phát triển con người',
        paragraphs: ['ANSLIFE không chỉ đào tạo kỹ năng, mà xây nền tảng nghề nghiệp để người lao động phát triển bền vững trong hệ sinh thái sản xuất hiện đại.'],
      },
    ],
  },
  'join-anslife': {
    title: 'Tham gia cùng ANSLIFE',
    kicker: '',
    lead:
      'ANSLIFE mở rộng cơ hội đồng hành cho cá nhân, tổ chức và đối tác mong muốn cùng xây dựng các chương trình học bổng và hoạt động cộng đồng có tác động bền vững.',
    keyline: 'Cùng hành động có hệ thống để tạo tác động dài hạn.',
    panels: [
      {
        title: 'Đối tượng có thể tham gia',
        paragraphs: ['Chương trình chào đón nhiều nhóm đối tác với vai trò phù hợp năng lực đóng góp.'],
        bullets: [
          'Cá nhân muốn đồng hành các hoạt động cộng đồng',
          'Doanh nghiệp muốn tài trợ chương trình giáo dục',
          'Tổ chức xã hội muốn phối hợp triển khai',
        ],
      },
      {
        title: 'Hình thức đồng hành',
        paragraphs: ['ANSLIFE triển khai nhiều hình thức để đối tác lựa chọn linh hoạt.'],
        bullets: [
          'Đóng góp nguồn lực tài chính cho quỹ',
          'Đồng tổ chức chương trình tại địa phương',
          'Hỗ trợ chuyên môn, đào tạo hoặc kết nối mạng lưới',
        ],
      },
      {
        title: 'Quy trình tham gia',
        paragraphs: ['Quy trình được thiết kế ngắn gọn nhưng có kiểm soát để bảo đảm tính minh bạch.'],
        bullets: [
          'Tiếp nhận đề xuất đồng hành',
          'Xác định phạm vi hợp tác và mục tiêu',
          'Ký kết triển khai và theo dõi kết quả',
        ],
      },
      {
        title: 'Cơ chế minh bạch',
        paragraphs: ['Mọi đóng góp đều được theo dõi và báo cáo theo từng chương trình.'],
        bullets: [
          'Cập nhật tiến độ thực hiện định kỳ',
          'Báo cáo kết quả sử dụng nguồn lực',
          'Đánh giá tác động sau chương trình',
        ],
      },
    ],
    blocks: [
      {
        title: 'KPI hợp tác',
        paragraphs: ['Hiệu quả đồng hành được đánh giá bằng độ bền vững của chương trình và kết quả thực tế.'],
        bullets: [
          'Partner Participation Growth',
          'Program Continuity Rate',
          'Co-created Impact Projects',
        ],
      },
      {
        title: 'Thông điệp đồng hành',
        paragraphs: ['ANSLIFE mong muốn xây cộng đồng đối tác cùng chia sẻ trách nhiệm xã hội bằng hành động cụ thể và có thể đo lường.'],
      },
    ],
  },
};

const AI_SCHOLARSHIP_SECTION_CONTENT: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOLARSHIP_SECTION_TEMPLATES).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-scholarship-company-intro',
    ),
  ]),
) as Record<string, string>;

const SCHOLARSHIP_SECTION_TEMPLATES_EN: Record<string, StructuredSectionContent> = {
  'fund-overview': {
    title: 'Fund Overview',
    kicker: '',
    lead:
      'The ANSLIFE Scholarship and Community Fund is designed as a long-term impact program focused on education support and sustainable local development.',
    keyline: 'Investing in people is the foundation of sustainable growth.',
    panels: [
      {
        title: 'Fund objectives',
        paragraphs: ['The fund is operated with clear, measurable, and continuous annual goals.'],
        bullets: [
          'Support students with financial hardship',
          'Encourage consistent academic effort',
          'Build long-term learning opportunities',
        ],
      },
      {
        title: 'Operating principles',
        paragraphs: ['ANSLIFE operates the fund with transparency and real social accountability.'],
        bullets: [
          'Public criteria and scope of support',
          'Planned and controlled resource allocation',
          'Post-support impact tracking',
        ],
      },
      {
        title: 'Impact scope',
        paragraphs: ['Beyond financial aid, the fund supports practical learning conditions.'],
        bullets: [
          'Periodic scholarships by academic cycle',
          'Learning materials and school tool support',
          'Community resource mobilization',
        ],
      },
      {
        title: 'Growth direction',
        paragraphs: ['The fund follows a long-term roadmap aligned with ANSLIFE community strategy.'],
        bullets: [
          'Expand the number of support programs',
          'Improve impact assessment standards',
          'Increase local partnership depth',
        ],
      },
    ],
    blocks: [
      {
        title: 'Fund KPIs',
        paragraphs: ['Fund performance is tracked through concrete social impact metrics.'],
        bullets: [
          'Annual number of supported students',
          'Study retention rate after support',
          'Level of community partner participation',
        ],
      },
      {
        title: 'Fund message',
        paragraphs: ['ANSLIFE believes timely support for the right learners creates long-term intergenerational impact.'],
      },
    ],
  },
  'scholarship-program': {
    title: 'Scholarship Program',
    kicker: '',
    lead:
      'The ANSLIFE Scholarship Program prioritizes students with strong learning commitment, especially those facing financial barriers but showing long-term potential.',
    keyline: 'We do not only grant scholarships. We support the learning journey.',
    panels: [
      {
        title: 'Priority beneficiaries',
        paragraphs: ['The program focuses on learners who need support to continue education sustainably.'],
        bullets: [
          'Students from financially challenged backgrounds',
          'Learners with positive academic progress',
          'Priority groups in local communities',
        ],
      },
      {
        title: 'Support structure',
        paragraphs: ['Multiple support tiers are designed to match practical needs.'],
        bullets: [
          'Tuition or study-cost support',
          'Learning tools and materials support',
          'Semester-based or annual support',
        ],
      },
      {
        title: 'Selection process',
        paragraphs: ['Selection is standardized to ensure fairness and transparency.'],
        bullets: [
          'Application intake and verification',
          'Assessment against published criteria',
          'Approval and cohort-based announcement',
        ],
      },
      {
        title: 'Post-support follow-up',
        paragraphs: ['ANSLIFE tracks outcomes to improve program quality each year.'],
        bullets: [
          'Periodic learning-result follow-up',
          'Updated support needs collection',
          'Criteria improvement based on data',
        ],
      },
    ],
    blocks: [
      {
        title: 'Program KPIs',
        paragraphs: ['The scholarship program is measured by outcome quality and sustainability of impact.'],
        bullets: [
          'Scholarship Retention Rate',
          'Academic Progress Tracking',
          'Program Coverage by Region',
        ],
      },
      {
        title: 'Program value',
        paragraphs: ['The program aims at sustainable educational opportunity, not one-time short-term aid.'],
      },
    ],
  },
  'community-activities': {
    title: 'Community Activities',
    kicker: '',
    lead:
      'ANSLIFE runs community programs through a multi-year model, with local needs at the center and data-based impact tracking.',
    keyline: 'Not short campaigns, but programs with a clear lifecycle.',
    panels: [
      {
        title: 'Community program portfolio',
        paragraphs: ['Each year, ANSLIFE deploys programs across three major impact groups.'],
        bullets: [
          'Educational support in local communities',
          'Basic livelihood support for vulnerable households',
          'Learning-space and living-condition improvements',
        ],
      },
      {
        title: 'Execution process',
        paragraphs: ['Every activity follows a standardized process to maximize resource efficiency.'],
        bullets: [
          'Needs assessment and beneficiary identification',
          'Target, budget, and timeline design',
          'Result acceptance and impact reporting',
        ],
      },
      {
        title: 'Local coordination network',
        paragraphs: ['ANSLIFE works with schools, local organizations, and social partners to increase effectiveness.'],
        bullets: [
          'Local focal points by program',
          'Clear execution and supervision roles',
          'Direct feedback channels from beneficiaries',
        ],
      },
      {
        title: 'Review and improvement cycle',
        paragraphs: ['Program results are reviewed quarterly and annually for continuous improvement.'],
        bullets: [
          'Output review by committed KPIs',
          'Bottleneck analysis from field execution',
          'Data-based planning updates for next cycle',
        ],
      },
    ],
    blocks: [
      {
        title: 'Community KPIs',
        paragraphs: ['Community performance is measured by practical impact and result continuity.'],
        bullets: [
          'Beneficiary Reach by Area',
          'Program Completion Quality Score',
          '12-Month Impact Retention',
        ],
      },
      {
        title: 'Community commitment',
        paragraphs: ['ANSLIFE follows a systematic community model with accountability for published outcomes.'],
      },
    ],
  },
  'workforce-development': {
    title: 'Workforce Development',
    kicker: '',
    lead:
      'ANSLIFE develops workforce capability through practical skills, systems thinking, and standard-based working methods for the next generation of industry talent.',
    keyline: 'Investing in people builds sustainable operational capability.',
    panels: [
      {
        title: 'Workforce development direction',
        paragraphs: ['The program builds a disciplined, skilled workforce with strong practical application.'],
        bullets: [
          'Upgrade job skills for real production needs',
          'Improve process and standards compliance',
          'Expand long-term career opportunities',
        ],
      },
      {
        title: 'Training program groups',
        paragraphs: ['Training is delivered through three core groups to ensure high applicability.'],
        bullets: [
          'Vocational and workplace safety training',
          'Digital literacy and basic data operation',
          'Soft skills and professional work attitude',
        ],
      },
      {
        title: 'Training collaboration model',
        paragraphs: ['Programs are delivered with vocational schools, expert partners, and ANSLIFE operations teams.'],
        bullets: [
          'Outcome-based curriculum design',
          'Blended theory and field practice',
          'Unified competency assessment criteria',
        ],
      },
      {
        title: 'Post-training pathway',
        paragraphs: ['ANSLIFE maintains post-training follow-up to improve practical career conversion.'],
        bullets: [
          'Connection to suitable job opportunities',
          '6-12 month competency progress tracking',
          'Course updates from employer feedback',
        ],
      },
    ],
    blocks: [
      {
        title: 'Workforce KPIs',
        paragraphs: ['Program effectiveness is measured by employability and job sustainability.'],
        bullets: [
          'Training Completion Rate',
          'Job Placement Conversion',
          'Workforce Retention After 12 Months',
        ],
      },
      {
        title: 'People development message',
        paragraphs: ['ANSLIFE builds long-term professional foundations, not only short-term skill transfer.'],
      },
    ],
  },
  'join-anslife': {
    title: 'Join ANSLIFE',
    kicker: '',
    lead:
      'ANSLIFE welcomes individuals, organizations, and partners who want to co-create scholarship and community programs with measurable, long-term impact.',
    keyline: 'Build long-term impact together through structured action.',
    panels: [
      {
        title: 'Who can join',
        paragraphs: ['The program welcomes multiple partner groups with flexible participation roles.'],
        bullets: [
          'Individuals contributing to community programs',
          'Businesses sponsoring education initiatives',
          'Social organizations co-implementing projects',
        ],
      },
      {
        title: 'Ways to collaborate',
        paragraphs: ['ANSLIFE provides several collaboration formats for practical participation.'],
        bullets: [
          'Financial contribution to the fund',
          'Co-organization of local programs',
          'Expert support, training, or network connection',
        ],
      },
      {
        title: 'Participation process',
        paragraphs: ['The process is simple but controlled to ensure transparency.'],
        bullets: [
          'Submit collaboration proposal',
          'Define scope and shared goals',
          'Execute agreement and track outcomes',
        ],
      },
      {
        title: 'Transparency mechanism',
        paragraphs: ['All contributions are tracked and reported by program.'],
        bullets: [
          'Periodic implementation updates',
          'Resource usage reporting',
          'Post-program impact evaluation',
        ],
      },
    ],
    blocks: [
      {
        title: 'Partnership KPIs',
        paragraphs: ['Collaboration effectiveness is measured by program sustainability and practical impact.'],
        bullets: [
          'Partner Participation Growth',
          'Program Continuity Rate',
          'Co-created Impact Projects',
        ],
      },
      {
        title: 'Collaboration message',
        paragraphs: ['ANSLIFE aims to build a partner community that shares social responsibility through measurable action.'],
      },
    ],
  },
};

const SCHOLARSHIP_SECTION_TEMPLATES_JP: Record<string, StructuredSectionContent> = {
  'fund-overview': {
    title: '基金概要',
    kicker: '',
    lead:
      'ANSLIFEの奨学金・地域支援基金は、教育支援と地域の持続的な発展を目的とした長期的な社会貢献プログラムです。',
    keyline: '人への投資は、持続可能な成長の土台です。',
    panels: [
      {
        title: '基金の目的',
        paragraphs: ['基金は、明確で測定可能な年間目標に基づいて運営されます。'],
        bullets: [
          '経済的に困難な学生への支援',
          '学習継続と努力の促進',
          '長期的な学習機会の拡大',
        ],
      },
      {
        title: '運営原則',
        paragraphs: ['ANSLIFEは透明性と実効性のある社会的責任のもとで基金を運営します。'],
        bullets: [
          '公開された選定基準と支援範囲',
          '計画的な資源配分',
          '支援後の効果追跡',
        ],
      },
      {
        title: '支援範囲',
        paragraphs: ['資金支援だけでなく、学習環境の実質的な改善も支援します。'],
        bullets: [
          '学期・年度単位の奨学金',
          '教材・学習用品の支援',
          '地域連携による支援拡大',
        ],
      },
      {
        title: '今後の方向性',
        paragraphs: ['基金はANSLIFEの地域戦略に沿った長期ロードマップで拡大します。'],
        bullets: [
          '支援プログラム数の拡大',
          '効果評価基準の高度化',
          '地域パートナー連携の強化',
        ],
      },
    ],
    blocks: [
      {
        title: '基金KPI',
        paragraphs: ['基金の成果は、具体的な社会的インパクト指標で管理されます。'],
        bullets: [
          '年間支援対象者数',
          '支援後の学業継続率',
          '地域パートナー参加度',
        ],
      },
      {
        title: '基金メッセージ',
        paragraphs: ['適切なタイミングで適切な学習者を支援することが、世代を超えた持続的な価値につながるとANSLIFEは考えています。'],
      },
    ],
  },
  'scholarship-program': {
    title: '奨学金プログラム',
    kicker: '',
    lead:
      'ANSLIFE奨学金プログラムは、学習意欲が高く、経済的課題を抱えながらも成長可能性の高い学生を優先的に支援します。',
    keyline: '奨学金の給付だけでなく、学びの継続を伴走します。',
    panels: [
      {
        title: '優先支援対象',
        paragraphs: ['継続的な学習のために支援が必要な学生を中心に選定します。'],
        bullets: [
          '経済的に厳しい環境の学生',
          '学習成果が安定して向上している学生',
          '地域の優先支援対象グループ',
        ],
      },
      {
        title: '支援構成',
        paragraphs: ['実際のニーズに合わせた複数の支援レベルを設計しています。'],
        bullets: [
          '学費または学習費用の支援',
          '教材・学習用品の支援',
          '学期または年度単位の支援',
        ],
      },
      {
        title: '選考プロセス',
        paragraphs: ['公平性と透明性を確保するため、選考プロセスを標準化しています。'],
        bullets: [
          '申請受付と情報確認',
          '公開基準に基づく審査',
          '採択と期別結果公開',
        ],
      },
      {
        title: '支援後フォロー',
        paragraphs: ['毎年の質向上のため、支援後の成果を継続的に追跡します。'],
        bullets: [
          '学習成果の定期確認',
          '追加支援ニーズの把握',
          'データに基づく基準改善',
        ],
      },
    ],
    blocks: [
      {
        title: 'プログラムKPI',
        paragraphs: ['成果の質と持続性を中心にプログラムを評価します。'],
        bullets: [
          'Scholarship Retention Rate',
          'Academic Progress Tracking',
          'Program Coverage by Region',
        ],
      },
      {
        title: 'プログラム価値',
        paragraphs: ['単発支援ではなく、持続的な教育機会の創出を目指します。'],
      },
    ],
  },
  'community-activities': {
    title: '地域活動',
    kicker: '',
    lead:
      'ANSLIFEは、地域ニーズを中心に据えた複数年モデルで地域活動を実施し、効果をデータで追跡します。',
    keyline: '短期キャンペーンではなく、ライフサイクルを持つプログラムを運営します。',
    panels: [
      {
        title: '活動ポートフォリオ',
        paragraphs: ['毎年、3つの主要インパクト領域で活動を実施します。'],
        bullets: [
          '地域教育の支援',
          '生活基盤が弱い世帯への支援',
          '学習・生活環境の改善',
        ],
      },
      {
        title: '実行プロセス',
        paragraphs: ['資源効率を高めるため、全活動を標準プロセスで実行します。'],
        bullets: [
          'ニーズ調査と対象者設定',
          '目標・予算・スケジュール設計',
          '結果確認と効果報告',
        ],
      },
      {
        title: '地域連携ネットワーク',
        paragraphs: ['学校・地域団体・社会パートナーと連携して実効性を高めます。'],
        bullets: [
          'プログラム別地域窓口の設定',
          '実行と監督の役割明確化',
          '受益者からの直接フィードバック',
        ],
      },
      {
        title: '評価と改善サイクル',
        paragraphs: ['四半期・年次レビューで継続的に改善します。'],
        bullets: [
          '合意KPIによる成果評価',
          '現場ボトルネックの分析',
          '次期計画への反映',
        ],
      },
    ],
    blocks: [
      {
        title: '地域活動KPI',
        paragraphs: ['実効性と成果継続性を中心に評価します。'],
        bullets: [
          'Beneficiary Reach by Area',
          'Program Completion Quality Score',
          '12-Month Impact Retention',
        ],
      },
      {
        title: '地域への約束',
        paragraphs: ['ANSLIFEは、公開した成果に対して責任を持つ体系的な地域支援を継続します。'],
      },
    ],
  },
  'workforce-development': {
    title: '人材育成',
    kicker: '',
    lead:
      'ANSLIFEは、実務スキル・システム思考・標準運用力を軸に、次世代人材の育成プログラムを展開しています。',
    keyline: '人への投資が、持続可能な運用能力を生み出します。',
    panels: [
      {
        title: '育成の方向性',
        paragraphs: ['実務適用力の高い人材を育てることを目的に設計されています。'],
        bullets: [
          '現場ニーズに合った職能強化',
          'プロセス遵守と標準運用力の向上',
          '長期的なキャリア機会の拡大',
        ],
      },
      {
        title: '研修プログラム群',
        paragraphs: ['実効性を高めるため、3つの主要分野で研修を提供します。'],
        bullets: [
          '職能・安全研修',
          'デジタル基礎とデータ運用研修',
          'ソフトスキルと職業意識研修',
        ],
      },
      {
        title: '連携型育成モデル',
        paragraphs: ['職業学校・専門パートナー・ANSLIFE運営チームと協働して実施します。'],
        bullets: [
          '成果基準に基づくカリキュラム設計',
          '座学と現場実習の融合',
          '統一基準による能力評価',
        ],
      },
      {
        title: '研修後の成長導線',
        paragraphs: ['実際の就業転換を高めるため、研修後フォローを継続します。'],
        bullets: [
          '適切な就業機会との接続',
          '6-12か月の能力進捗追跡',
          '企業フィードバックに基づく内容改善',
        ],
      },
    ],
    blocks: [
      {
        title: '人材育成KPI',
        paragraphs: ['就業可能性と就業継続性を中心に効果を評価します。'],
        bullets: [
          'Training Completion Rate',
          'Job Placement Conversion',
          'Workforce Retention After 12 Months',
        ],
      },
      {
        title: '人材育成メッセージ',
        paragraphs: ['ANSLIFEは短期的な技能移転ではなく、長期的な職業基盤づくりを重視します。'],
      },
    ],
  },
  'join-anslife': {
    title: 'ANSLIFEに参加する',
    kicker: '',
    lead:
      'ANSLIFEは、奨学金・地域支援を共に創り、測定可能で長期的な社会的価値を生み出したい個人・団体・企業を歓迎します。',
    keyline: '構造化された協働で、長期インパクトを共創します。',
    panels: [
      {
        title: '参加できる対象',
        paragraphs: ['多様なパートナーが、それぞれの強みを活かして参加できます。'],
        bullets: [
          '地域活動に参加したい個人',
          '教育支援を行う企業',
          '共同実施を行う社会団体',
        ],
      },
      {
        title: '協働の形',
        paragraphs: ['実行しやすい複数の協働形態を用意しています。'],
        bullets: [
          '基金への資金支援',
          '地域プログラムの共同実施',
          '専門支援・研修・ネットワーク連携',
        ],
      },
      {
        title: '参加プロセス',
        paragraphs: ['透明性を確保しつつ、簡潔なプロセスで進めます。'],
        bullets: [
          '協働提案の提出',
          '範囲と目標の合意',
          '実行と成果追跡',
        ],
      },
      {
        title: '透明性の仕組み',
        paragraphs: ['すべての拠出はプログラム単位で追跡・報告されます。'],
        bullets: [
          '定期的な進捗共有',
          '資源利用の報告',
          '終了後の効果評価',
        ],
      },
    ],
    blocks: [
      {
        title: '協働KPI',
        paragraphs: ['協働の成果は、持続性と実効性で評価します。'],
        bullets: [
          'Partner Participation Growth',
          'Program Continuity Rate',
          'Co-created Impact Projects',
        ],
      },
      {
        title: '協働メッセージ',
        paragraphs: ['ANSLIFEは、測定可能な行動を通じて社会的責任を共に担うパートナーコミュニティを育てます。'],
      },
    ],
  },
};

const SCHOLARSHIP_SECTION_TEMPLATES_KR: Record<string, StructuredSectionContent> = {
  'fund-overview': {
    title: '기금 소개',
    kicker: '',
    lead:
      'ANSLIFE 장학 및 커뮤니티 기금은 교육 지원과 지역의 지속 가능한 발전을 목표로 하는 장기 사회공헌 프로그램입니다.',
    keyline: '사람에 대한 투자가 지속 가능한 성장의 기반입니다.',
    panels: [
      {
        title: '기금 목표',
        paragraphs: ['기금은 명확하고 측정 가능한 연간 목표에 따라 운영됩니다.'],
        bullets: [
          '경제적 어려움이 있는 학생 지원',
          '학습 지속과 성취 동기 강화',
          '장기 학습 기회 확대',
        ],
      },
      {
        title: '운영 원칙',
        paragraphs: ['ANSLIFE는 투명성과 실질적 사회책임 원칙으로 기금을 운영합니다.'],
        bullets: [
          '공개된 선정 기준과 지원 범위',
          '계획 기반 자원 배분',
          '지원 이후 효과 추적',
        ],
      },
      {
        title: '지원 범위',
        paragraphs: ['재정 지원을 넘어 실제 학습 환경 개선까지 포함합니다.'],
        bullets: [
          '학기/연 단위 장학 지원',
          '학습 자료 및 교육 도구 지원',
          '지역 파트너와의 연계 확대',
        ],
      },
      {
        title: '성장 방향',
        paragraphs: ['기금은 ANSLIFE 지역 전략과 연계된 장기 로드맵으로 확장됩니다.'],
        bullets: [
          '지원 프로그램 수 확대',
          '성과 평가 기준 고도화',
          '지역 협력 파트너십 강화',
        ],
      },
    ],
    blocks: [
      {
        title: '기금 KPI',
        paragraphs: ['기금 성과는 구체적인 사회적 임팩트 지표로 관리됩니다.'],
        bullets: [
          '연간 지원 대상자 수',
          '지원 후 학업 지속률',
          '지역 파트너 참여 수준',
        ],
      },
      {
        title: '기금 메시지',
        paragraphs: ['ANSLIFE는 적절한 시점의 올바른 지원이 세대를 잇는 지속 가능한 변화를 만든다고 믿습니다.'],
      },
    ],
  },
  'scholarship-program': {
    title: '장학 프로그램',
    kicker: '',
    lead:
      'ANSLIFE 장학 프로그램은 학습 의지가 높고 성장 잠재력이 큰 학생, 특히 경제적 제약이 있는 학생을 우선 지원합니다.',
    keyline: '장학금 지급에 그치지 않고 학습 여정을 함께합니다.',
    panels: [
      {
        title: '우선 지원 대상',
        paragraphs: ['지속적인 학습을 위해 지원이 필요한 학생을 우선 선정합니다.'],
        bullets: [
          '경제적으로 어려운 환경의 학생',
          '학업 성과가 꾸준히 향상되는 학생',
          '지역 우선 지원 대상 그룹',
        ],
      },
      {
        title: '지원 구조',
        paragraphs: ['실제 필요에 맞춘 다층 지원 구조를 운영합니다.'],
        bullets: [
          '학비 또는 학습비 지원',
          '교재 및 학습 도구 지원',
          '학기 또는 연 단위 지원',
        ],
      },
      {
        title: '선발 절차',
        paragraphs: ['공정성과 투명성을 위해 선발 절차를 표준화했습니다.'],
        bullets: [
          '신청 접수 및 정보 검증',
          '공개 기준에 따른 심사',
          '기수별 승인 및 결과 공지',
        ],
      },
      {
        title: '사후 추적',
        paragraphs: ['프로그램 품질 향상을 위해 지원 이후 성과를 지속 추적합니다.'],
        bullets: [
          '정기 학업 성과 확인',
          '추가 지원 수요 파악',
          '데이터 기반 기준 개선',
        ],
      },
    ],
    blocks: [
      {
        title: '프로그램 KPI',
        paragraphs: ['성과의 질과 지속 가능성을 중심으로 평가합니다.'],
        bullets: [
          'Scholarship Retention Rate',
          'Academic Progress Tracking',
          'Program Coverage by Region',
        ],
      },
      {
        title: '프로그램 가치',
        paragraphs: ['단기 일회성 지원이 아닌 지속 가능한 교육 기회 창출을 지향합니다.'],
      },
    ],
  },
  'community-activities': {
    title: '커뮤니티 활동',
    kicker: '',
    lead:
      'ANSLIFE는 지역 수요 중심의 다년 프로그램 모델로 커뮤니티 활동을 운영하며, 성과를 데이터로 추적합니다.',
    keyline: '단기 캠페인이 아니라 생애주기가 있는 프로그램을 운영합니다.',
    panels: [
      {
        title: '활동 포트폴리오',
        paragraphs: ['매년 3개 핵심 임팩트 영역에서 프로그램을 실행합니다.'],
        bullets: [
          '지역 교육 지원',
          '취약 가구의 기본 생활 지원',
          '학습 및 생활 환경 개선',
        ],
      },
      {
        title: '실행 프로세스',
        paragraphs: ['자원 효율을 높이기 위해 모든 활동을 표준 프로세스로 운영합니다.'],
        bullets: [
          '수요 조사 및 대상자 선정',
          '목표·예산·일정 설계',
          '결과 검수 및 임팩트 보고',
        ],
      },
      {
        title: '지역 협력 네트워크',
        paragraphs: ['학교·지역 단체·사회 파트너와 협력해 실행력을 높입니다.'],
        bullets: [
          '프로그램별 지역 담당 창구 운영',
          '실행·모니터링 역할 명확화',
          '수혜자 직접 피드백 채널 운영',
        ],
      },
      {
        title: '평가·개선 사이클',
        paragraphs: ['분기 및 연 단위 리뷰로 지속 개선합니다.'],
        bullets: [
          '합의 KPI 기반 성과 점검',
          '현장 병목 분석',
          '다음 주기 계획 반영',
        ],
      },
    ],
    blocks: [
      {
        title: '커뮤니티 KPI',
        paragraphs: ['실질 임팩트와 성과 지속성을 중심으로 평가합니다.'],
        bullets: [
          'Beneficiary Reach by Area',
          'Program Completion Quality Score',
          '12-Month Impact Retention',
        ],
      },
      {
        title: '커뮤니티 약속',
        paragraphs: ['ANSLIFE는 공개한 성과에 책임을 지는 체계적 커뮤니티 모델을 지속합니다.'],
      },
    ],
  },
  'workforce-development': {
    title: '인재 개발',
    kicker: '',
    lead:
      'ANSLIFE는 실무 역량, 시스템 사고, 표준 기반 업무 능력을 중심으로 차세대 산업 인재 육성 프로그램을 운영합니다.',
    keyline: '사람에 대한 투자가 지속 가능한 운영 역량을 만듭니다.',
    panels: [
      {
        title: '인재 육성 방향',
        paragraphs: ['현장 적용력이 높은 인재를 양성하도록 설계되었습니다.'],
        bullets: [
          '실제 생산 수요에 맞춘 직무 역량 강화',
          '프로세스 준수 및 표준 운영 역량 향상',
          '장기 경력 기회 확대',
        ],
      },
      {
        title: '교육 프로그램 구성',
        paragraphs: ['실효성을 위해 3개 핵심 영역으로 교육을 운영합니다.'],
        bullets: [
          '직무 및 작업 안전 교육',
          '디지털 기초·데이터 운영 교육',
          '소프트 스킬·직업 태도 교육',
        ],
      },
      {
        title: '협력형 교육 모델',
        paragraphs: ['직업학교·전문 파트너·ANSLIFE 운영팀과 협업해 실행합니다.'],
        bullets: [
          '성과 기준 기반 커리큘럼 설계',
          '이론과 현장 실습 결합',
          '통합 기준 역량 평가',
        ],
      },
      {
        title: '교육 이후 경로',
        paragraphs: ['실질 취업 전환을 높이기 위해 교육 후 추적을 지속합니다.'],
        bullets: [
          '적합한 일자리 연계',
          '6-12개월 역량 향상 추적',
          '기업 피드백 기반 과정 개선',
        ],
      },
    ],
    blocks: [
      {
        title: '인재 개발 KPI',
        paragraphs: ['취업 가능성과 고용 지속성을 중심으로 효과를 평가합니다.'],
        bullets: [
          'Training Completion Rate',
          'Job Placement Conversion',
          'Workforce Retention After 12 Months',
        ],
      },
      {
        title: '인재 개발 메시지',
        paragraphs: ['ANSLIFE는 단기 기술 이전이 아니라 장기 직업 기반 형성을 지향합니다.'],
      },
    ],
  },
  'join-anslife': {
    title: 'ANSLIFE와 함께하기',
    kicker: '',
    lead:
      'ANSLIFE는 장학 및 커뮤니티 프로그램을 함께 만들고, 측정 가능한 장기 임팩트를 추구하는 개인·기관·파트너를 환영합니다.',
    keyline: '체계적인 협업으로 장기 임팩트를 함께 만듭니다.',
    panels: [
      {
        title: '참여 대상',
        paragraphs: ['다양한 파트너가 각자의 강점에 맞는 역할로 참여할 수 있습니다.'],
        bullets: [
          '커뮤니티 활동에 동참하고 싶은 개인',
          '교육 프로그램을 후원하는 기업',
          '공동 실행을 원하는 사회단체',
        ],
      },
      {
        title: '협력 방식',
        paragraphs: ['실행 가능한 다양한 협력 방식을 제공합니다.'],
        bullets: [
          '기금 재정 후원',
          '지역 프로그램 공동 운영',
          '전문 지원·교육·네트워크 연계',
        ],
      },
      {
        title: '참여 절차',
        paragraphs: ['투명성을 유지하면서도 간결한 절차로 진행합니다.'],
        bullets: [
          '협력 제안 접수',
          '범위와 공동 목표 정의',
          '실행 및 성과 추적',
        ],
      },
      {
        title: '투명성 체계',
        paragraphs: ['모든 기여는 프로그램 단위로 추적·보고됩니다.'],
        bullets: [
          '정기 진행 현황 공유',
          '자원 사용 보고',
          '종료 후 임팩트 평가',
        ],
      },
    ],
    blocks: [
      {
        title: '협력 KPI',
        paragraphs: ['협력 성과는 지속성과 실효성으로 평가합니다.'],
        bullets: [
          'Partner Participation Growth',
          'Program Continuity Rate',
          'Co-created Impact Projects',
        ],
      },
      {
        title: '협력 메시지',
        paragraphs: ['ANSLIFE는 측정 가능한 실행을 통해 사회적 책임을 함께하는 파트너 커뮤니티를 지향합니다.'],
      },
    ],
  },
};

const AI_SCHOLARSHIP_SECTION_CONTENT_EN: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOLARSHIP_SECTION_TEMPLATES_EN).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-scholarship-company-intro',
    ),
  ]),
) as Record<string, string>;

const AI_SCHOLARSHIP_SECTION_CONTENT_JP: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOLARSHIP_SECTION_TEMPLATES_JP).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-scholarship-company-intro',
    ),
  ]),
) as Record<string, string>;

const AI_SCHOLARSHIP_SECTION_CONTENT_KR: Record<string, string> = Object.fromEntries(
  Object.entries(SCHOLARSHIP_SECTION_TEMPLATES_KR).map(([sectionId, section]) => [
    sectionId,
    buildStructuredCompanySectionHtml(
      sectionId,
      {
        ...section,
      },
      'ai-scholarship-company-intro',
    ),
  ]),
) as Record<string, string>;

function translateAiHtml(language: LanguageCode, html: string): string {
  if (language === 'vn') {
    return html;
  }

  const localizedTextNodes = html.replace(/>([^<>]+)</g, (fullMatch, textNode: string) => {
    const leadingWhitespace = textNode.match(/^\s*/)?.[0] ?? '';
    const trailingWhitespace = textNode.match(/\s*$/)?.[0] ?? '';
    const coreText = textNode.trim();

    if (!coreText) {
      return fullMatch;
    }

    const translated = translateText(language, coreText);
    return `>${leadingWhitespace}${translated}${trailingWhitespace}<`;
  });

  return localizedTextNodes.replace(
    /(alt|title|aria-label|placeholder)="([^"]+)"/g,
    (_fullMatch, attr: string, value: string) => `${attr}="${translateText(language, value)}"`,
  );
}

export function getAIFallbackPageHtml(slug: string, language: LanguageCode = 'vn'): string | null {
  const pageHtml = AI_PAGE_CONTENT[slug];
  if (!pageHtml) {
    return null;
  }

  return translateAiHtml(language, pageHtml);
}

function escapeRegExp(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function getAIFallbackSectionHtml(
  pageSlug: string,
  sectionId: string,
  language: LanguageCode = 'vn',
): string | null {
  const pageHtml = AI_PAGE_CONTENT[pageSlug];
  if (!pageHtml) {
    return null;
  }

  const bannerMatch = pageHtml.match(
    /<figure class="ai-banner">[\s\S]*?<\/figure>/i,
  );
  const introMatch = pageHtml.match(
    /<p class="ai-intro">[\s\S]*?<\/p>/i,
  );
  const shouldRenderPageBannerAndIntro =
    pageSlug !== 'manufacturing-ecosystem' &&
    pageSlug !== 'quality-control' &&
    pageSlug !== 'commercial-process' &&
    pageSlug !== 'global-network' &&
    pageSlug !== 'scholarship-community' &&
    !(
      pageSlug === 'about-anslife' &&
      (sectionId === 'company-intro' ||
        sectionId === 'company-info' ||
        sectionId === 'vision-mission' ||
        sectionId === 'core-values' ||
        sectionId === 'working-standards' ||
        sectionId === 'production-philosophy' ||
        sectionId === 'organization' ||
        sectionId === 'team' ||
        sectionId === 'anslife-ecosystem' ||
        sectionId === 'development-history')
    );

  const translatedSectionOverride =
    pageSlug === 'about-anslife'
      ? language === 'en'
        ? AI_ABOUT_SECTION_CONTENT_EN[sectionId] ?? null
        : language === 'jp'
          ? AI_ABOUT_SECTION_CONTENT_JP[sectionId] ?? null
          : language === 'kr'
            ? AI_ABOUT_SECTION_CONTENT_KR[sectionId] ?? null
            : null
      : null;
  if (translatedSectionOverride) {
    const composedTranslatedHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${translatedSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedTranslatedHtml);
  }

  const scholarshipTranslatedSectionOverride =
    pageSlug === 'scholarship-community'
      ? language === 'en'
        ? AI_SCHOLARSHIP_SECTION_CONTENT_EN[sectionId] ?? null
        : language === 'jp'
          ? AI_SCHOLARSHIP_SECTION_CONTENT_JP[sectionId] ?? null
          : language === 'kr'
            ? AI_SCHOLARSHIP_SECTION_CONTENT_KR[sectionId] ?? null
            : null
      : null;
  if (scholarshipTranslatedSectionOverride) {
    const composedScholarshipTranslatedHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${scholarshipTranslatedSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedScholarshipTranslatedHtml);
  }

  const manufacturingSectionOverride =
    pageSlug === 'manufacturing-ecosystem'
      ? AI_MANUFACTURING_SECTION_CONTENT[sectionId] ?? null
      : null;
  if (manufacturingSectionOverride) {
    const composedManufacturingHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${manufacturingSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedManufacturingHtml);
  }

  const qualitySectionOverride =
    pageSlug === 'quality-control' ? AI_QUALITY_SECTION_CONTENT[sectionId] ?? null : null;
  if (qualitySectionOverride) {
    const composedQualityHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${qualitySectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedQualityHtml);
  }

  const commercialSectionOverride =
    pageSlug === 'commercial-process' ? AI_COMMERCIAL_SECTION_CONTENT[sectionId] ?? null : null;
  if (commercialSectionOverride) {
    const composedCommercialHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${commercialSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedCommercialHtml);
  }

  const globalNetworkSectionOverride =
    pageSlug === 'global-network' ? AI_GLOBAL_NETWORK_SECTION_CONTENT[sectionId] ?? null : null;
  if (globalNetworkSectionOverride) {
    const composedGlobalNetworkHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${globalNetworkSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedGlobalNetworkHtml);
  }

  const scholarshipSectionOverride =
    pageSlug === 'scholarship-community' ? AI_SCHOLARSHIP_SECTION_CONTENT[sectionId] ?? null : null;
  if (scholarshipSectionOverride) {
    const composedScholarshipHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${scholarshipSectionOverride}
</div>
`.trim();

    return translateAiHtml(language, composedScholarshipHtml);
  }

  const escapedSectionId = escapeRegExp(sectionId);
  const sectionPattern = new RegExp(
    `<section\\s+id="${escapedSectionId}"[^>]*>[\\s\\S]*?<\\/section>`,
    'i',
  );
  const sectionMatch = pageHtml.match(sectionPattern);
  if (!sectionMatch) {
    return null;
  }

  const composedHtml = `
<div class="ai-content">
  ${shouldRenderPageBannerAndIntro ? bannerMatch?.[0] ?? '' : ''}
  ${shouldRenderPageBannerAndIntro ? introMatch?.[0] ?? '' : ''}
  ${sectionMatch[0]}
</div>
`.trim();

  return translateAiHtml(language, composedHtml);
}
