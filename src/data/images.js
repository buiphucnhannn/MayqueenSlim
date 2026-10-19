/**
 * Kho ảnh tập trung — mọi component lấy đường dẫn ảnh từ đây, không viết tay "/images/...".
 * Thư mục public/images:
 *   brand/     logo B.O.T Việt Nam (bản gốc + PNG nền trong suốt: dọc, ngang, trắng, dấu B)
 *   products/  ảnh sản phẩm chất lượng cao (2000px), chia theo sản phẩm
 *   social/    ảnh bài đăng Facebook (206px) — chỉ dùng ở kích thước nhỏ (feed, thumbnail)
 *   backgrounds/ ảnh nền trang trí (Unsplash License — miễn phí, không bắt buộc ghi công; ghi lại để minh bạch)
 */
export const brand = {
  original: "/images/brand/logo-bot-original.jpg",
  stacked: "/images/brand/logo-bot.png",
  stackedWhite: "/images/brand/logo-bot-white.png",
  horizontal: "/images/brand/logo-bot-horizontal.png",
  horizontalWhite: "/images/brand/logo-bot-horizontal-white.png",
  mark: "/images/brand/logo-mark.png",
};

export const backgrounds = {
  // Lá non trên nền nắng trắng (câu triết lý) — Natalie Kinnear, unsplash.com/photos/vQbo_ScHhhI
  airyLeaves: "/images/backgrounds/airy-leaves.jpg",
  // Cành bạch đàn trên nền trắng (banner trang con) — unsplash.com/photos/hX_hf2lPpUU
  eucalyptus: "/images/backgrounds/eucalyptus-white.jpg",
  // Cô gái vươn vai giữa rặng tre (Hành trình 30 ngày) — Kartabya Aryal, unsplash.com/photos/9w6Zu1w_D88
  yogaBamboo: "/images/backgrounds/yoga-bamboo.jpg",
  // Lá xanh trầm (Bảo chứng B.O.T) — Liana S, unsplash.com/photos/lNfsSlGv8vc
  moodyLeaves: "/images/backgrounds/moody-leaves.jpg",
  // Tay cầm ly sinh tố xanh (Đánh giá khách hàng) — unsplash.com/photos/9zsiNYwvYCM
  greenSmoothie: "/images/backgrounds/green-smoothie.jpg",
};

export const productImages = {
  mayqueen: {
    sunlight: "/images/products/mayqueen-slim/box-sunlight.jpg",
    podium: "/images/products/mayqueen-slim/podium.jpg",
    floating: "/images/products/mayqueen-slim/floating.jpg",
  },
  yodetox: {
    garden: "/images/products/yodetox/garden.jpg",
    giftBox: "/images/products/yodetox/gift-box.jpg",
  },
};

export const social = {
  xuongCan: "/images/social/xuong-can-nhanh-giam-mo-dung.jpg",
  cheNguConDoi: "/images/social/che-ngu-con-doi-gia.jpg",
  noiKhongTangCan: "/images/social/noi-khong-tang-can-lai.jpg",
  dangXinhDonTet: "/images/social/dang-xinh-don-tet.jpg",
  gieoQue: "/images/social/gieo-que-dau-nam.jpg",
  duXuan: "/images/social/du-xuan-van-dam.jpg",
  tetDienMao: "/images/social/tet-dien-mao-moi.jpg",
  congThuc30Ngay: "/images/social/cong-thuc-30-ngay.jpg",
  tamBietConDoi: "/images/social/tam-biet-con-doi-ao.jpg",
  nguoiKhoe: "/images/social/nguoi-khoe-dang-xinh.jpg",
  tuiXach: "/images/social/giu-dang-trong-tui-xach.jpg",
  dotCalo: "/images/social/dot-calo-thu-dong.jpg",
  conThemAn: "/images/social/kiem-soat-con-them-an.jpg",
};
