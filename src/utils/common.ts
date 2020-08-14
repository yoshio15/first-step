export const getUniqueId = () => {
  return Math.floor(1000 * Math.random()).toString(16) + Date.now().toString(16)
}