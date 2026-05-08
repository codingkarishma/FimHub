const { createApp } = require('./app');

const PORT = Number(process.env.PORT || 4000);
const app = createApp();

app.listen(PORT, () => {
  console.log(`FimHub API running at http://localhost:${PORT}`);
});
