import app from "./src/app";

const port = process.env.PORT || 5000;
const host = process.env.HOST || "localhost";

app.listen(port, () => {
  if (process.send) {
    console.log(`⚡️[app]: Server is running at http://${host}:${port}`);
  } else {
    console.error("Not working att all");
  }
});
