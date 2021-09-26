export default function shouldGetNewData() {
  const date = new Date().getTime();
  return globalThis?.date && globalThis.date > date - 1000 * 60 * 60 * 24;
}
