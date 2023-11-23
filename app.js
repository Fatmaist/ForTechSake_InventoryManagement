const express = require('express')
const port = process.env.PORT || 3003
const app = express()
const router = require('./routes/datapetugas')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api', router)

if (process.env.NODE_ENV != "test") {
    app.listen(port, () => {
      console.log(`App listening on http://localhost:${port}`);
    });
  }
  
module.exports = app;