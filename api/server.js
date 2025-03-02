const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');
const server = jsonServer.create();

// Uncomment to allow write operations
const fs = require('fs')
const path = require('path')
const filePath = path.join('db.json')
const data = fs.readFileSync(filePath, "utf-8");
const db = JSON.parse(data);
const router = jsonServer.router(db)

// const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.db = router.db

server.use(middlewares);

const rules = jsonServerAuth.rewriter({
  // Permission rules
  users: 600,
  notes: 600,
});

server.use(rules);
server.use(jsonServerAuth);
server.use(router);

server.listen(port);

// Export the Server API
module.exports = server;
