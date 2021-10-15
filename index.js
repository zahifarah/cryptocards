const express = require("express")
const app = express()
const path = require("path")
const { joinCryptoPairs: cryptoPairs } = require("./seed/seedHelper")

// requiring fetch (node-fetch) instead of using import
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

var cryptoObjects = {}

/*
Iterate over every pair from seed file and fetch the prices.
Perhaps there's a way to do this with Promise.all which is faster?
*/
function fetchPairPrices() {
  for (let cryptoPair of cryptoPairs) {
    fetch(`https://api.cryptonator.com/api/ticker/${cryptoPair}`).then(
      (response) => response.json()
    )
  }
}

fetchPairPrices()

// home --> /cryptocards
app.get("/cryptocards", (req, res) => {
  res.render("home.ejs", { cryptoObjects })
})

app.listen(3000, (req, res) => {
  console.log("Crypto Cards - 3000: LISTENING...")
})
