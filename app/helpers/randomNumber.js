// ===== Random Number
module.exports = () => {
  const letters = '0123456789123456'
  let numbers = ''
  for (let i = 0; i < 6; i++) {
    numbers += letters[Math.floor(Math.random() * 16)]
  }
  return numbers
}
