import http from "node:http";

const PORT = 8000;

const server = http.createServer((req, res) => {
  res.write("Hello From The Server!\n");
  res.write("This is some Date.\n");
  res.write("This is more Date.");
  res.end(() => console.log("A Response Has Been  End."));
});

server.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
