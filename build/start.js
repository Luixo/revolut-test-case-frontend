require('dotenv').config();
const server = require('../server/main');
const port = process.env.PORT || 5000;

console.log('Starting server...');
server.listen(port, () => console.log(`Server is running at http://localhost:${port}`));
