const express = require("express")
const app = express()
const path = require("path")
const { cryptoPairs } = require("./seed/cryptoPairs")

// requiring fetch (node-fetch) instead of using import
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args))

app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

const cryptoData = {}

function fetchPrices() {
  for (let cryptoPair of cryptoPairs) {
    fetch(`https://api.cryptonator.com/api/ticker/${cryptoPair}`)
      .then((res) => res.json())
      .then((data) => (cryptoData[cryptoPair] = data.ticker))
      .then(() => console.log(cryptoData))
      .catch((error) => console.log(error))
  }
}

fetchPrices()

app.get("/cryptocards", (req, res) => {
  res.render("home.ejs", { cryptoData })
})

// server
app.listen(3000, (req, res) => {
  console.log("Crypto Cards - 3000: LISTENING...")
})
