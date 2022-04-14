var fs = require('firebase-admin')

var serviceAccount = require('./firebase-cred.json')

let dbConfig
if (!fs.apps.length) {
  fs.initializeApp({
    credential: fs.credential.cert(serviceAccount),
  })
  dbConfig = fs.firestore()
  console.log(dbConfig, "---config")
} else {
  dbConfig = fs.firestore()
}

const nextConfig = {
  reactStrictMode: true,
  db: dbConfig,
}

module.exports = nextConfig

