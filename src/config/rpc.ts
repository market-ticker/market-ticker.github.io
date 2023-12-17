export function getRpcUrl() {
  // This should run in the browser only. Without this check, the build fails.
  if (typeof window === "undefined") {
    return "";
  }

  return `https://eth-sepolia.g.alchemy.com/v2/3MF2Iod6gYid-fVYPJFc_YF1d9_pUVgr`;
}
