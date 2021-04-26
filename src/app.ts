import cors from 'cors';
import express from 'express';
import { Logger } from 'tslog';

export const LOG = new Logger({
  maskValuesOfKeys: ['authorization', 'password'],
  colorizePrettyLogs: false
});

const config = {
  port: process.env.SERVER_PORT ?? 2222,
  message: process.env.MESSAGE ?? "Hello!"
};

const app = express();
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());
app.use(cors());

app.get("/", function (req: express.Request, res: express.Response) {
  LOG.info("Request received");
  res.send({
    message: config.message
  });
});

app.post("/", function (req: express.Request, res: express.Response) {
  res.send({
    message: config.message,
    body: req.body
  });
});

app.listen(config.port, () => {
  console.log(`Up on port ${config.port}!`);
})