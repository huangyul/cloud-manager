export function init() {
  if (import.meta.env.MODE == "development") {
    console.log(import.meta.env.VITE_APPID);
  }
}
