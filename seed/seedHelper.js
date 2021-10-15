const cryptoPairs = {
  btc: "usd",
  eth: "usd",
  ada: "usd",
}

module.exports.joinCryptoPairs = Object.entries(cryptoPairs).map((cryptoPair) =>
  cryptoPair.join("-")
)
