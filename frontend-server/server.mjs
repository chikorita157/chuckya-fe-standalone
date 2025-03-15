import express from "express";

const app = express();
const port = 3132;

app.use(express.static("../public"));
app.use('*', express.static("../public"));

app.listen(port, () => {
  console.log(`frontend server listening on port ${port}`);
});
