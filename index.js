const express = require("express")
const app = express()
const path = require("path")

// requiring fetch (node-fetch)
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args))

app.set("view engine", "ejs") // set ejs as view engine
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))

const urls = [
  "https://api.cryptonator.com/api/ticker/btc-usd",
  "https://api.cryptonator.com/api/ticker/eth-usd",
  "https://api.cryptonator.com/api/ticker/ada-usd",
]

var btcUsdObj
var ethUsdObj
var adaUsdObj

Promise.all(
  urls.map((url) => {
    return fetch(url).then((resp) => resp.json())
  })
)
  .then((results) => {
    btcUsdObj = results[0]
    ethUsdObj = results[1]
    adaUsdObj = results[2]
  })
  .then(() => console.log(btcUsdObj, ethUsdObj, adaUsdObj))
  .catch(() => console.log("Errrrror!"))

// home --> /cryptocards
app.get("/cryptocards", (req, res) => {
  res.render("home.ejs", { btcUsdObj, ethUsdObj, adaUsdObj })
})

app.listen(3000, (req, res) => {
  console.log("Crypto Cards - 3000: LISTENING...")
})
