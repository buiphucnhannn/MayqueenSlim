/**
 * Kho giỏ hàng lưu trong localStorage, đọc qua useSyncExternalStore:
 * - server & lần render đầu dùng mảng rỗng → không lệch hydration;
 * - đồng bộ giữa các tab qua sự kiện "storage".
 * Mỗi dòng: { slug, optionId, qty }
 */
const KEY = "mayqueen-cart-v1";
const EMPTY = [];
const listeners = new Set();
let items = null;

function read() {
  if (items === null) {
    try {
      const parsed = JSON.parse(localStorage.getItem(KEY));
      items = Array.isArray(parsed) ? parsed : EMPTY;
    } catch {
      items = EMPTY;
    }
  }
  return items;
}

function write(next) {
  items = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    // chế độ ẩn danh / bị chặn lưu trữ: giỏ hàng vẫn chạy trong phiên hiện tại
  }
  listeners.forEach((l) => l());
}

export const cartStore = {
  subscribe(listener) {
    listeners.add(listener);
    const onStorage = (e) => {
      if (e.key !== KEY) return;
      items = null;
      listener();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  },
  getSnapshot: read,
  getServerSnapshot: () => EMPTY,

  add(slug, optionId, qty = 1) {
    const list = read();
    const found = list.find((i) => i.slug === slug && i.optionId === optionId);
    write(
      found
        ? list.map((i) => (i === found ? { ...i, qty: Math.min(99, i.qty + qty) } : i))
        : [...list, { slug, optionId, qty }],
    );
  },
  setQty(slug, optionId, qty) {
    const list = read();
    write(
      qty <= 0
        ? list.filter((i) => !(i.slug === slug && i.optionId === optionId))
        : list.map((i) =>
            i.slug === slug && i.optionId === optionId ? { ...i, qty: Math.min(99, qty) } : i,
          ),
    );
  },
  clear() {
    write([]);
  },
};
