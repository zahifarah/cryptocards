const express = require("express")
const app = express()
const path = require("path")

// requiring fetch (node-fetch)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args))

app.set("view engine", "ejs") // set ejs as view engine
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

// const urls = [
//   "https://api.cryptonator.com/api/ticker/btc-usd",
//   "https://api.cryptonator.com/api/ticker/eth-usd",
//   "https://api.cryptonator.com/api/ticker/ada-usd",
// ];

const btcUrl = "https://api.cryptonator.com/api/ticker/btc-usd"
const ethUrl = "https://api.cryptonator.com/api/ticker/eth-usd"
const adaUrl = "https://api.cryptonator.com/api/ticker/ada-usd"

var btcUsdObj
var ethUsdObj
var adaUsdObj

fetch(btcUrl)
  .then((response) => response.json())
  .then((data) => (btcUsdObj = data.ticker))
  .then(() => console.log(btcUsdObj)) // for terminal feedback

fetch(ethUrl)
  .then((response) => response.json())
  .then((data) => (ethUsdObj = data.ticker))
  .then(() => console.log(ethUsdObj)) // for terminal feedback

fetch(adaUrl)
  .then((response) => response.json())
  .then((data) => (adaUsdObj = data.ticker))
  .then(() => console.log(adaUsdObj)) // for terminal feedback

// home --> /cryptocards
app.get("/cryptocards", (req, res) => {
  res.render("home.ejs", { btcUsdObj, ethUsdObj, adaUsdObj })
})

app.listen(3000, (req, res) => {
  console.log("Crypto Cards - 3000: LISTENING...")
})
