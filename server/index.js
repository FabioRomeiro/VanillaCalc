const app = require('./config/custom-express');

let PORT = 9003;

app.listen(PORT, function() {
  console.log(`Server running at ${PORT}`)
});
