import Image from "next/image";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { brand } from "@/data/images";

// Trang 404 (song ngữ gọn — not-found không nhận params nên hiển thị cả hai ngôn ngữ)
export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center pt-36 pb-24 text-center">
      <Image src={brand.mark} alt="" width={64} height={64} className="h-14 w-auto opacity-80" />
      <p className="text-forest/15 mt-6 font-serif text-8xl">404</p>
      <h1 className="h-display mt-2 text-3xl sm:text-4xl">Không tìm thấy trang</h1>
      <p className="text-ink-muted mt-2 text-sm">Page not found</p>
      <Button href="/" arrow className="mt-8">
        Về trang chủ · Home
      </Button>
    </Container>
  );
}
