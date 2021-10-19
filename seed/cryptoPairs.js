const cryptoPairs = {
  btc: "usd",
  eth: "usd",
  ada: "usd",
  quick: "usd",
  dydx: "usd",
}

module.exports.cryptoPairs = Object.entries(cryptoPairs).map((cryptoPair) =>
  cryptoPair.join("-")
)
