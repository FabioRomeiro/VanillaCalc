const app = require('./config/custom-express');

let PORT = 3000;

app.listen(PORT, function() {
  console.log(`Server running at ${PORT}`)
});
