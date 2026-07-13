import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Seo from '../components/seo/Seo';
import useSiteI18n from '../hooks/useSiteI18n';
import { submitContactForm } from '../lib/wp';

type RecruitmentStatus = 'open' | 'receiving' | 'paused' | 'closed';

interface RecruitmentJob {
  title: string;
  status: RecruitmentStatus;
  summary: string;
}

interface RecruitmentMarket {
  market: string;
  status: RecruitmentStatus;
  jobs: RecruitmentJob[];
}

interface RecruitmentGroup {
  code: string;
  title: string;
  body: string;
  positions: string;
  cards: Array<{
    title: string;
    body: string;
  }>;
  markets: RecruitmentMarket[];
}

const statusLabels: Record<RecruitmentStatus, string> = {
  open: 'Đang tuyển',
  receiving: 'Đang tiếp nhận hồ sơ',
  paused: 'Tạm dừng tuyển dụng',
  closed: 'Đã đóng tuyển dụng',
};

const recruitmentFormId = Number(process.env.NEXT_PUBLIC_CF7_QUOTE_FORM_ID ?? 1);

const defaultMarkets: RecruitmentMarket[] = [
  {
    market: 'Nhật Bản',
    status: 'open',
    jobs: [
      {
        title: 'Nhân viên phát triển khách hàng Nhật Bản',
        status: 'open',
        summary: 'Tìm kiếm buyer, phát triển quan hệ B2B và phối hợp đội dự án để theo sát cơ hội kinh doanh.',
      },
      {
        title: 'Nhân viên quản lý khách hàng Nhật Bản',
        status: 'paused',
        summary: 'Quản lý thông tin khách hàng, theo dõi yêu cầu và phối hợp phản hồi giữa buyer và đội nội bộ.',
      },
      {
        title: 'Trưởng nhóm kinh doanh Nhật Bản',
        status: 'paused',
        summary: 'Điều phối nhóm thị trường, đặt mục tiêu phát triển khách hàng và quản lý hiệu quả triển khai.',
      },
      {
        title: 'Quản lý thị trường Nhật Bản',
        status: 'paused',
        summary: 'Xây dựng chiến lược thị trường, đánh giá cơ hội và phát triển mạng lưới buyer Nhật Bản.',
      },
    ],
  },
  {
    market: 'Hàn Quốc',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển khách hàng Hàn Quốc',
        status: 'paused',
        summary: 'Theo dõi thị trường, tiếp cận buyer và hỗ trợ trao đổi yêu cầu sản phẩm nội thất.',
      },
      {
        title: 'Nhân viên quản lý khách hàng Hàn Quốc',
        status: 'paused',
        summary: 'Quản lý lịch sử làm việc, yêu cầu mẫu và thông tin dự án từ buyer Hàn Quốc.',
      },
    ],
  },
  {
    market: 'Bắc Mỹ (Hoa Kỳ & Canada)',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển khách hàng Bắc Mỹ',
        status: 'paused',
        summary: 'Phát triển tệp buyer, theo dõi tiêu chuẩn thị trường và phối hợp đề xuất năng lực phù hợp.',
      },
      {
        title: 'Điều phối dự án khách hàng Bắc Mỹ',
        status: 'paused',
        summary: 'Kết nối yêu cầu buyer với sản xuất, QC, đóng gói và xuất hàng theo từng dự án.',
      },
    ],
  },
  {
    market: 'Châu Âu',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển khách hàng Châu Âu',
        status: 'paused',
        summary: 'Tìm kiếm cơ hội tại các thị trường EU và phối hợp chuẩn hóa thông tin sản phẩm.',
      },
      {
        title: 'Chuyên viên tiêu chuẩn thị trường Châu Âu',
        status: 'paused',
        summary: 'Theo dõi tiêu chuẩn buyer, tài liệu kỹ thuật và yêu cầu tuân thủ liên quan.',
      },
    ],
  },
  {
    market: 'Vương quốc Anh & Ireland',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Anh & Ireland',
        status: 'paused',
        summary: 'Khai thác khách hàng B2B và duy trì thông tin cơ hội theo nhóm sản phẩm.',
      },
    ],
  },
  {
    market: 'Australia & New Zealand',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Australia & New Zealand',
        status: 'paused',
        summary: 'Phát triển kênh buyer, cập nhật nhu cầu sản phẩm và hỗ trợ đội vận hành dự án.',
      },
    ],
  },
  {
    market: 'Đông Nam Á',
    status: 'receiving',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Đông Nam Á',
        status: 'receiving',
        summary: 'Tiếp nhận hồ sơ ứng viên có kinh nghiệm thị trường ASEAN và khách hàng B2B.',
      },
    ],
  },
  {
    market: 'Hồng Kông, Đài Loan & Trung Quốc',
    status: 'receiving',
    jobs: [
      {
        title: 'Nhân viên phát triển khách hàng Hoa ngữ',
        status: 'receiving',
        summary: 'Tiếp nhận hồ sơ ứng viên có khả năng giao tiếp tiếng Trung và hiểu chuỗi cung ứng nội thất.',
      },
    ],
  },
  {
    market: 'Trung Đông',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Trung Đông',
        status: 'paused',
        summary: 'Theo dõi buyer, yêu cầu sản phẩm và tiêu chuẩn giao hàng tại khu vực Trung Đông.',
      },
    ],
  },
  {
    market: 'Ấn Độ & Nam Á',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Nam Á',
        status: 'paused',
        summary: 'Hỗ trợ tìm kiếm cơ hội và duy trì dữ liệu khách hàng tại các thị trường Nam Á.',
      },
    ],
  },
  {
    market: 'Châu Phi',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Châu Phi',
        status: 'paused',
        summary: 'Theo dõi nhu cầu nhập khẩu, kênh buyer và cơ hội hợp tác tại Châu Phi.',
      },
    ],
  },
  {
    market: 'Mỹ Latinh',
    status: 'paused',
    jobs: [
      {
        title: 'Nhân viên phát triển thị trường Mỹ Latinh',
        status: 'paused',
        summary: 'Xây dựng dữ liệu buyer và hỗ trợ trao đổi yêu cầu sản phẩm tại thị trường Mỹ Latinh.',
      },
    ],
  },
];

function buildRecruitmentGroup(input: {
  code: string;
  title: string;
  body: string;
  positions: string;
  goal: string;
  team: string;
  scope: string;
  mission: string;
  markets?: RecruitmentMarket[];
}): RecruitmentGroup {
  return {
    code: input.code,
    title: input.title,
    body: input.body,
    positions: input.positions,
    cards: [
      { title: 'Mục tiêu', body: input.goal },
      { title: 'Đội ngũ', body: input.team },
      { title: 'Phạm vi', body: input.scope },
      { title: 'Sứ mệnh', body: input.mission },
    ],
    markets: input.markets ?? defaultMarkets,
  };
}

const careerGroups = [
  buildRecruitmentGroup({
    code: 'INT',
    title: 'Kinh doanh quốc tế & phát triển thị trường',
    body: 'Phát triển thị trường, tìm kiếm và chăm sóc khách hàng B2B toàn cầu.',
    positions: '44 vị trí',
    goal: 'Mở rộng thị trường, phát triển khách hàng B2B và tăng trưởng doanh thu xuất khẩu.',
    team: 'Đa quốc gia, chuyên nghiệp, hiểu thị trường và định hướng kết quả.',
    scope: 'Thị trường toàn cầu với các cụm thị trường chiến lược.',
    mission: 'Kết nối ANSLIFE với buyer toàn cầu, xây dựng hợp tác bền vững.',
  }),
  buildRecruitmentGroup({
    code: 'OEM',
    title: 'Phát triển sản phẩm OEM / ODM',
    body: 'Thiết kế, phát triển sản phẩm và quản lý dự án theo yêu cầu khách hàng.',
    positions: '20 vị trí',
    goal: 'Chuyển yêu cầu buyer thành mẫu, bản vẽ, thông số và phương án sản xuất khả thi.',
    team: 'Kết nối thiết kế, kỹ thuật, vật liệu, mẫu và đội vận hành dự án.',
    scope: 'Sản phẩm nội thất hoàn thiện, cấu kiện, vật liệu và giải pháp hoàn thiện.',
    mission: 'Giúp sản phẩm được phát triển đúng ý tưởng, đúng tiêu chuẩn và sẵn sàng sản xuất.',
    markets: [
      {
        market: 'Nhóm phát triển mẫu',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên phát triển mẫu OEM / ODM',
            status: 'open',
            summary: 'Tiếp nhận yêu cầu, theo dõi mẫu và phối hợp kỹ thuật để hoàn thiện phương án phát triển.',
          },
          {
            title: 'Điều phối dự án phát triển sản phẩm',
            status: 'receiving',
            summary: 'Quản lý tiến độ mẫu, thông tin buyer và các đầu việc giữa thiết kế, kỹ thuật, sản xuất.',
          },
        ],
      },
      {
        market: 'Nhóm kỹ thuật sản phẩm',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên kỹ thuật bản vẽ nội thất',
            status: 'receiving',
            summary: 'Rà soát bản vẽ, thông số, kết cấu và yêu cầu kỹ thuật trước khi chuyển sản xuất.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'OPS',
    title: 'Vận hành sản xuất & điều phối nhà máy',
    body: 'Quản lý sản xuất, kế hoạch, điều độ và năng suất nhà máy.',
    positions: '29 vị trí',
    goal: 'Đảm bảo sản xuất đúng tiến độ, đúng tiêu chuẩn và phối hợp nhịp nhàng giữa các công đoạn.',
    team: 'Kế hoạch, quản lý xưởng, điều phối đơn hàng, tổ trưởng và quản lý năng suất.',
    scope: 'Nhà máy trực tiếp và các nhà máy đối tác trong hệ thống sản xuất.',
    mission: 'Biến kế hoạch đơn hàng thành hoạt động sản xuất ổn định, minh bạch và có kiểm soát.',
    markets: [
      {
        market: 'Kế hoạch & điều phối sản xuất',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên kế hoạch sản xuất',
            status: 'open',
            summary: 'Theo dõi kế hoạch, năng lực chuyền, tiến độ sản xuất và cập nhật dữ liệu vận hành.',
          },
          {
            title: 'Điều phối đơn hàng sản xuất',
            status: 'receiving',
            summary: 'Kết nối thông tin giữa buyer, nhà máy, QC, đóng gói và xuất hàng.',
          },
        ],
      },
      {
        market: 'Quản lý xưởng',
        status: 'paused',
        jobs: [
          {
            title: 'Tổ trưởng sản xuất nội thất',
            status: 'paused',
            summary: 'Quản lý đội sản xuất, kiểm soát tiến độ và hỗ trợ xử lý vấn đề tại công đoạn.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'QC',
    title: 'Chất lượng & kiểm định',
    body: 'Kiểm soát chất lượng, thử nghiệm và đảm bảo tiêu chuẩn sản phẩm.',
    positions: '16 vị trí',
    goal: 'Kiểm soát chất lượng từ vật liệu, sản xuất, hoàn thiện đến đóng gói và xuất hàng.',
    team: 'QC nguyên liệu, QC trong sản xuất, kiểm cuối, báo cáo và tiêu chuẩn buyer.',
    scope: 'Từng công đoạn sản xuất, từng dự án và từng nhóm tiêu chuẩn chất lượng.',
    mission: 'Đảm bảo sản phẩm đáp ứng mẫu duyệt, tiêu chuẩn buyer và yêu cầu thị trường.',
    markets: [
      {
        market: 'QC sản xuất',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên QC trong sản xuất',
            status: 'open',
            summary: 'Kiểm tra công đoạn, ghi nhận lỗi, theo dõi khắc phục và cập nhật báo cáo chất lượng.',
          },
          {
            title: 'Nhân viên kiểm tra cuối',
            status: 'receiving',
            summary: 'Kiểm tra thành phẩm trước đóng gói, đối chiếu tiêu chuẩn và lập báo cáo kiểm tra.',
          },
        ],
      },
      {
        market: 'Tiêu chuẩn & báo cáo QC',
        status: 'paused',
        jobs: [
          {
            title: 'Chuyên viên báo cáo QC',
            status: 'paused',
            summary: 'Tổng hợp hình ảnh, lỗi, kết quả kiểm tra và đề xuất hành động khắc phục.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'SC',
    title: 'Chuỗi cung ứng & vật liệu',
    body: 'Quản lý vật liệu, nhà cung cấp và tối ưu chuỗi cung ứng.',
    positions: '18 vị trí',
    goal: 'Đảm bảo vật liệu đúng tiêu chuẩn, đúng tiến độ và phù hợp từng dự án sản xuất.',
    team: 'Mua hàng, vật liệu, nhà cung cấp, kho nguyên liệu và quản lý truy xuất.',
    scope: 'Gỗ, plywood, MDF, veneer, foam, vải, da, phụ kiện, sơn và vật liệu đóng gói.',
    mission: 'Xây dựng chuỗi cung ứng vật liệu ổn định, có trách nhiệm và hỗ trợ sản xuất hiệu quả.',
    markets: [
      {
        market: 'Mua hàng & nhà cung cấp',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên mua hàng vật liệu nội thất',
            status: 'receiving',
            summary: 'Tìm kiếm nhà cung cấp, theo dõi báo giá, mẫu vật liệu và tiến độ cung ứng.',
          },
        ],
      },
      {
        market: 'Quản lý vật liệu',
        status: 'paused',
        jobs: [
          {
            title: 'Nhân viên quản lý vật liệu đầu vào',
            status: 'paused',
            summary: 'Kiểm tra thông tin, phân loại, lưu kho và truy xuất vật liệu theo dự án.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'FIN',
    title: 'Sơn & hoàn thiện bề mặt',
    body: 'Pha màu, sơn, xử lý bề mặt và kiểm soát chất lượng hoàn thiện.',
    positions: '14 vị trí',
    goal: 'Phát triển và kiểm soát màu sắc, bề mặt, độ bóng, độ mờ và cảm giác hoàn thiện.',
    team: 'Pha màu, kỹ thuật sơn, mẫu hoàn thiện, kiểm soát bề mặt và phối hợp sản xuất.',
    scope: 'Stain, lacquer, oil, painted, matte và các hệ hoàn thiện theo mẫu buyer.',
    mission: 'Đảm bảo hoàn thiện bề mặt ổn định giữa mẫu duyệt và sản xuất hàng loạt.',
    markets: [
      {
        market: 'Kỹ thuật hoàn thiện',
        status: 'open',
        jobs: [
          {
            title: 'Kỹ thuật viên sơn hoàn thiện',
            status: 'open',
            summary: 'Thực hiện mẫu màu, kiểm soát bề mặt và hỗ trợ chuẩn hóa quy trình hoàn thiện.',
          },
          {
            title: 'Nhân viên pha màu',
            status: 'receiving',
            summary: 'Pha màu theo mẫu duyệt, ghi nhận công thức và hỗ trợ duy trì độ ổn định màu.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'HUB',
    title: 'Supply Hub, kho vận & xuất nhập khẩu',
    body: 'Quản lý kho, logistics, chứng từ và xuất nhập khẩu.',
    positions: '17 vị trí',
    goal: 'Kết nối lưu kho, gom hàng, chứng từ, logistics và điều phối xuất khẩu tại Việt Nam.',
    team: 'Kho vận, chứng từ, logistics, điều phối container, quản lý mẫu và vật liệu.',
    scope: 'Supply Hub, kho đệm, gom hàng LCL/FCL, chứng từ xuất khẩu và điều phối giao hàng.',
    mission: 'Giúp buyer vận hành đơn hàng xuất khẩu ổn định, minh bạch và đúng cam kết.',
    markets: [
      {
        market: 'Kho vận & gom hàng',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên điều phối kho Supply Hub',
            status: 'open',
            summary: 'Theo dõi nhập xuất, lưu kho, gom hàng và phối hợp kế hoạch xuất hàng định kỳ.',
          },
        ],
      },
      {
        market: 'Chứng từ & logistics',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên chứng từ xuất khẩu',
            status: 'receiving',
            summary: 'Chuẩn hóa hồ sơ xuất khẩu, phối hợp logistics và theo dõi chứng từ giao hàng.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'IT',
    title: 'Công nghệ, dữ liệu & hệ thống nội bộ',
    body: 'Phát triển hệ thống, quản trị dữ liệu và chuyển đổi số.',
    positions: '15 vị trí',
    goal: 'Xây dựng hệ thống dữ liệu hỗ trợ quản lý sản xuất, QC, supply hub và vận hành dự án.',
    team: 'Phát triển phần mềm, dữ liệu, tự động hóa, dashboard và hỗ trợ người dùng nội bộ.',
    scope: 'Hệ thống nội bộ, dữ liệu sản xuất, dữ liệu đơn hàng và báo cáo vận hành.',
    mission: 'Biến dữ liệu vận hành thành công cụ quản lý minh bạch và hiệu quả.',
    markets: [
      {
        market: 'Phát triển hệ thống',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên phát triển hệ thống nội bộ',
            status: 'receiving',
            summary: 'Phát triển tính năng, xử lý dữ liệu và hỗ trợ số hóa quy trình vận hành.',
          },
        ],
      },
      {
        market: 'Dữ liệu & báo cáo',
        status: 'paused',
        jobs: [
          {
            title: 'Nhân viên dữ liệu vận hành',
            status: 'paused',
            summary: 'Chuẩn hóa dữ liệu, xây dashboard và hỗ trợ phân tích hiệu quả vận hành.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'MKT',
    title: 'Marketing & truyền thông',
    body: 'Xây dựng thương hiệu, truyền thông và phát triển nội dung.',
    positions: '12 vị trí',
    goal: 'Xây dựng hình ảnh ANSLIFE rõ ràng, chuyên nghiệp và nhất quán trên các kênh truyền thông.',
    team: 'Nội dung, thiết kế, website, truyền thông thương hiệu và tài liệu bán hàng.',
    scope: 'Thương hiệu, sản phẩm, năng lực sản xuất, tài liệu buyer và nội dung đa ngôn ngữ.',
    mission: 'Giúp khách hàng quốc tế hiểu đúng năng lực và giá trị của ANSLIFE.',
    markets: [
      {
        market: 'Nội dung & thương hiệu',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên nội dung thương hiệu',
            status: 'open',
            summary: 'Xây dựng nội dung website, hồ sơ năng lực, bài viết và tài liệu truyền thông.',
          },
        ],
      },
      {
        market: 'Thiết kế & hình ảnh',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên thiết kế truyền thông',
            status: 'receiving',
            summary: 'Thiết kế tài liệu thương hiệu, visual sản phẩm và nội dung phục vụ buyer quốc tế.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'FINA',
    title: 'Tài chính, kế toán & pháp lý',
    body: 'Quản lý tài chính, kế toán, pháp lý và tuân thủ.',
    positions: '11 vị trí',
    goal: 'Đảm bảo tài chính, kế toán, hợp đồng và tuân thủ được quản lý minh bạch.',
    team: 'Kế toán, tài chính, pháp lý, hợp đồng, chứng từ và kiểm soát nội bộ.',
    scope: 'Hoạt động doanh nghiệp, đơn hàng, đối tác, hồ sơ pháp lý và giao dịch thương mại.',
    mission: 'Tạo nền tảng quản trị vững chắc cho hoạt động sản xuất và xuất khẩu.',
    markets: [
      {
        market: 'Tài chính & kế toán',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên kế toán tổng hợp',
            status: 'receiving',
            summary: 'Theo dõi nghiệp vụ kế toán, chứng từ, báo cáo và phối hợp dữ liệu vận hành.',
          },
        ],
      },
      {
        market: 'Pháp lý & tuân thủ',
        status: 'paused',
        jobs: [
          {
            title: 'Nhân viên pháp lý hợp đồng',
            status: 'paused',
            summary: 'Hỗ trợ rà soát hợp đồng, hồ sơ đối tác và các yêu cầu tuân thủ liên quan.',
          },
        ],
      },
    ],
  }),
  buildRecruitmentGroup({
    code: 'HR',
    title: 'Hành chính, nhân sự & hỗ trợ điều hành',
    body: 'Quản trị nhân sự, hành chính và hỗ trợ điều hành.',
    positions: '12 vị trí',
    goal: 'Xây dựng môi trường làm việc ổn định, hỗ trợ đội ngũ và nâng cao hiệu quả điều hành.',
    team: 'Nhân sự, hành chính, tuyển dụng, đào tạo, văn phòng và hỗ trợ vận hành.',
    scope: 'Tuyển dụng, hồ sơ nhân sự, chính sách nội bộ, hành chính và điều phối hỗ trợ.',
    mission: 'Giúp tổ chức vận hành trơn tru và tạo trải nghiệm làm việc chuyên nghiệp cho đội ngũ.',
    markets: [
      {
        market: 'Nhân sự & tuyển dụng',
        status: 'open',
        jobs: [
          {
            title: 'Nhân viên tuyển dụng',
            status: 'open',
            summary: 'Tìm kiếm ứng viên, sàng lọc hồ sơ và phối hợp tổ chức phỏng vấn theo nhu cầu đội nhóm.',
          },
        ],
      },
      {
        market: 'Hành chính & hỗ trợ điều hành',
        status: 'receiving',
        jobs: [
          {
            title: 'Nhân viên hành chính văn phòng',
            status: 'receiving',
            summary: 'Quản lý công việc hành chính, hồ sơ văn phòng và hỗ trợ điều phối hoạt động nội bộ.',
          },
        ],
      },
    ],
  }),
];

export default function RecruitmentPage() {
  const { t, toLocalizedPath } = useSiteI18n();
  const [selectedGroupIndex, setSelectedGroupIndex] = useState(0);
  const [expandedMarketIndex, setExpandedMarketIndex] = useState(0);
  const [selectedJobKey, setSelectedJobKey] = useState('0-0');
  const [isApplicationPopupOpen, setIsApplicationPopupOpen] = useState(false);
  const [applicationState, setApplicationState] = useState<{
    status: 'idle' | 'loading' | 'success' | 'error';
    message: string;
  }>({ status: 'idle', message: '' });
  const selectedGroup = careerGroups[selectedGroupIndex];
  const [selectedMarketIndexValue] = selectedJobKey.split('-').map(Number);
  const selectedMarket =
    selectedGroup.markets[selectedMarketIndexValue] ?? selectedGroup.markets[0];
  const selectedJob = useMemo(() => {
    const [marketIndexValue, jobIndexValue] = selectedJobKey.split('-').map(Number);
    return selectedGroup.markets[marketIndexValue]?.jobs[jobIndexValue] ?? selectedGroup.markets[0]?.jobs[0];
  }, [selectedGroup, selectedJobKey]);

  function handleGroupSelect(index: number) {
    setSelectedGroupIndex(index);
    setExpandedMarketIndex(0);
    setSelectedJobKey('0-0');
  }

  function handleMarketToggle(index: number) {
    setExpandedMarketIndex(index);
    const nextMarket = selectedGroup.markets[index];
    if (nextMarket?.jobs[0]) {
      setSelectedJobKey(`${index}-0`);
    }
  }

  useEffect(() => {
    if (!isApplicationPopupOpen) {
      return undefined;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsApplicationPopupOpen(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isApplicationPopupOpen]);

  async function handleApplicationSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(
      Array.from(formData.entries()).map(([key, value]) => [key, String(value)]),
    );

    setApplicationState({ status: 'loading', message: t('Đang gửi dữ liệu...') });

    try {
      const data = await submitContactForm(recruitmentFormId, payload);

      if (data?.status !== 'mail_sent') {
        throw new Error(data?.message ?? t('Không gửi được form. Vui lòng thử lại.'));
      }

      form.reset();
      setApplicationState({
        status: 'success',
        message: t('Hồ sơ ứng tuyển đã được gửi. ANSLIFE sẽ liên hệ lại sau khi xem xét.'),
      });
    } catch (error) {
      setApplicationState({
        status: 'error',
        message: error instanceof Error ? error.message : t('Không gửi được form. Vui lòng thử lại.'),
      });
    }
  }

  return (
    <>
      <Seo title={t('Tuyển dụng')} description={t('Tuyển dụng')} />
      <section className="recruitment-page" aria-labelledby="recruitment-title">
        <figure className="recruitment-banner">
          <img
            src="/assets/recruitment/banner.webp"
            alt={t('Tuyển dụng')}
            decoding="async"
            fetchPriority="high"
          />
          <figcaption className="recruitment-banner-copy">
            <h1 id="recruitment-title">{t('Cơ hội nghề nghiệp tại ANSLIFE')}</h1>
            <p>{t('Cùng chúng tôi kiến tạo giá trị bền vững cho ngành nội thất toàn cấu')}</p>
            <p>
              {t(
                'ANSLIFE đang tim kiếm những con người tài nàng, đam mê và đồng hành cùng chúng tôi trên hành trinh trở thành đối tác sản xuất nội thất tin cậy hàng đâu cho thị trường quốc tế.',
              )}
            </p>
          </figcaption>
        </figure>

        <section className="recruitment-opportunity" aria-labelledby="recruitment-opportunity-title">
          <h2 id="recruitment-opportunity-title">{t('Bản đồ cơ hội nghề nghiệp')}</h2>
          <div className="recruitment-opportunity-layout">
            <div className="recruitment-career-list" aria-label={t('Nhóm cơ hội nghề nghiệp')}>
              {careerGroups.map((group, index) => (
                <button
                  type="button"
                  className={`recruitment-career-card ${
                    selectedGroupIndex === index ? 'is-active' : ''
                  }`}
                  key={group.title}
                  onClick={() => handleGroupSelect(index)}
                  aria-pressed={selectedGroupIndex === index}
                >
                  <span className="recruitment-career-icon" aria-hidden="true">
                    {group.code}
                  </span>
                  <span className="recruitment-career-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="recruitment-career-copy">
                    <h3>{t(group.title)}</h3>
                    <p>{t(group.body)}</p>
                  </span>
                  <span className="recruitment-career-count">{t(group.positions)}</span>
                  <span className="recruitment-career-chevron" aria-hidden="true">
                    {selectedGroupIndex === index ? '⌃' : '⌄'}
                  </span>
                </button>
              ))}
            </div>

            <div className="recruitment-market-panel">
              <div className="recruitment-market-heading">
                <div>
                  <h3>{t(selectedGroup.title)}</h3>
                  <p>{t(selectedGroup.body)}</p>
                </div>
                <span className="recruitment-market-watermark" aria-hidden="true" />
              </div>

              <div className="recruitment-opportunity-cards">
                {selectedGroup.cards.map((card) => (
                  <article key={card.title}>
                    <span aria-hidden="true" />
                    <h4>{t(card.title)}</h4>
                    <p>{t(card.body)}</p>
                  </article>
                ))}
              </div>

              <div className="recruitment-market-list-heading">
                <h3>{t('Các cụm thị trường & vị trí tuyển dụng')}</h3>
                <div className="recruitment-status-legend" aria-label={t('Trạng thái tuyển dụng')}>
                  <span><i className="is-open" />{t('Đang tuyển')}</span>
                  <span><i className="is-receiving" />{t('Đang tiếp nhận hồ sơ')}</span>
                  <span><i className="is-paused" />{t('Tạm dừng tuyển dụng')}</span>
                  <span><i className="is-closed" />{t('Đã đóng tuyển dụng')}</span>
                </div>
              </div>

              <div className="recruitment-market-list">
                {selectedGroup.markets.map((row, index) => {
                  const isExpanded = expandedMarketIndex === index;
                  return (
                  <article className={`recruitment-market-row ${isExpanded ? 'is-expanded' : ''}`} key={row.market}>
                    <button
                      type="button"
                      className="recruitment-market-row-header"
                      onClick={() => handleMarketToggle(index)}
                      aria-expanded={isExpanded}
                    >
                      <span className={`recruitment-market-dot is-${row.status}`} aria-hidden="true" />
                      <h4>{t(row.market)}</h4>
                      <span className="recruitment-market-count">{t(`${row.jobs.length} vị trí`)}</span>
                      <span className={`recruitment-market-status is-${row.status}`}>{t(statusLabels[row.status])}</span>
                      <span aria-hidden="true">{isExpanded ? '⌃' : '›'}</span>
                    </button>
                    {isExpanded && (
                      <div className="recruitment-job-list">
                        {row.jobs.map((job, jobIndex) => {
                          const jobKey = `${index}-${jobIndex}`;
                          return (
                          <button
                            type="button"
                            className={`recruitment-job-row ${selectedJobKey === jobKey ? 'is-selected' : ''}`}
                            key={job.title}
                            onClick={() => setSelectedJobKey(jobKey)}
                          >
                            <span>{t(job.title)}</span>
                            <b className={`is-${job.status}`}>{t(statusLabels[job.status])}</b>
                            <span aria-hidden="true">›</span>
                          </button>
                        )})}
                      </div>
                    )}
                  </article>
                )})}
              </div>

              {selectedJob && selectedMarket && (
                <section className="recruitment-job-detail" aria-labelledby="recruitment-job-detail-title">
                  <div>
                    <span className={`recruitment-market-status is-${selectedJob.status}`}>
                      {t(statusLabels[selectedJob.status])}
                    </span>
                    <h3 id="recruitment-job-detail-title">{t(selectedJob.title)}</h3>
                    <p>{t(selectedJob.summary)}</p>
                    <dl>
                      <div>
                        <dt>{t('Nhóm nghề')}</dt>
                        <dd>{t(selectedGroup.title)}</dd>
                      </div>
                      <div>
                        <dt>{t('Khu vực / bộ phận')}</dt>
                        <dd>{t(selectedMarket.market)}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="recruitment-job-detail-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setApplicationState({ status: 'idle', message: '' });
                        setIsApplicationPopupOpen(true);
                      }}
                    >
                      {t('Ứng tuyển / gửi hồ sơ')}
                    </button>
                    <Link to={toLocalizedPath('/about-anslife/company-info')}>{t('Liên hệ ANSLIFE')}</Link>
                  </div>
                </section>
              )}
            </div>
          </div>
        </section>

        {isApplicationPopupOpen && selectedJob && selectedMarket && (
          <div
            className="recruitment-application-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recruitment-application-title"
          >
            <button
              type="button"
              className="recruitment-application-backdrop"
              aria-label={t('Đóng')}
              onClick={() => setIsApplicationPopupOpen(false)}
            />
            <form className="recruitment-application-modal" onSubmit={handleApplicationSubmit}>
              <div className="recruitment-application-header">
                <div>
                  <span>{t('Ứng tuyển')}</span>
                  <h2 id="recruitment-application-title">{t(selectedJob.title)}</h2>
                  <p>
                    {t(selectedGroup.title)} · {t(selectedMarket.market)}
                  </p>
                </div>
                <button
                  type="button"
                  className="recruitment-application-close"
                  aria-label={t('Đóng')}
                  onClick={() => setIsApplicationPopupOpen(false)}
                >
                  ×
                </button>
              </div>

              <input type="hidden" name="request-category" value="recruitment_application" />
              <input type="hidden" name="inquiry-type" value="Ứng tuyển tuyển dụng" />
              <input type="hidden" name="career-group" value={selectedGroup.title} />
              <input type="hidden" name="career-market" value={selectedMarket.market} />
              <input type="hidden" name="career-position" value={selectedJob.title} />
              <input type="hidden" name="career-status" value={statusLabels[selectedJob.status]} />

              <div className="recruitment-application-grid">
                <label>
                  <span>{t('Họ và tên')} *</span>
                  <input name="your-name" required placeholder={t('Nhập họ và tên')} />
                </label>
                <label>
                  <span>{t('Email')} *</span>
                  <input name="your-email" type="email" required placeholder={t('Nhập email của bạn')} />
                </label>
                <label>
                  <span>{t('Số điện thoại')} *</span>
                  <input name="your-phone" required placeholder={t('Nhập số điện thoại')} />
                </label>
                <label>
                  <span>{t('Quốc gia / Vùng lãnh thổ')}</span>
                  <input name="country-region" placeholder={t('Bạn đang ở đâu?')} />
                </label>
                <label>
                  <span>{t('Link CV / Portfolio')}</span>
                  <input name="cv-link" type="url" placeholder="https://" />
                </label>
                <label>
                  <span>{t('Kinh nghiệm gần nhất')}</span>
                  <input name="latest-experience" placeholder={t('Vị trí / công ty / lĩnh vực gần nhất')} />
                </label>
                <label className="recruitment-application-field-wide">
                  <span>{t('Nội dung giới thiệu')} *</span>
                  <textarea
                    name="your-message"
                    required
                    rows={5}
                    placeholder={t('Giới thiệu ngắn về kinh nghiệm, năng lực và lý do bạn quan tâm đến vị trí này.')}
                  />
                </label>
                <label className="recruitment-application-consent recruitment-application-field-wide">
                  <input name="privacy-consent" type="checkbox" required />
                  <span>{t('Tôi đồng ý để ANSLIFE xử lý thông tin ứng tuyển của tôi.')}</span>
                </label>
              </div>

              {applicationState.message && (
                <p className={`recruitment-application-message is-${applicationState.status}`}>
                  {applicationState.message}
                </p>
              )}

              <div className="recruitment-application-actions">
                <button
                  type="button"
                  className="recruitment-application-secondary"
                  onClick={() => setIsApplicationPopupOpen(false)}
                >
                  {t('Đóng')}
                </button>
                <button
                  type="submit"
                  className="recruitment-application-primary"
                  disabled={applicationState.status === 'loading'}
                >
                  {applicationState.status === 'loading' ? t('Đang gửi...') : t('Gửi hồ sơ')}
                </button>
              </div>
            </form>
          </div>
        )}
      </section>
    </>
  );
}
