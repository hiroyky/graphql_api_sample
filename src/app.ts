import bodyParser from "body-parser";
import express from "express";
import http from "http";
import MysqlDriver from "./drivers/mysql-driver";
import graphql from "./graphql";

const port = process.env.PORT || 3000;
const app = express();
const mysqlDriver = new MysqlDriver();

app.on("ready", () => {
    app.listen(port, () => {
        console.log("ready");
    });
});

process.on("SIGTERM", beforeExit);
process.on("SIGINT", beforeExit);

async function beforeExit() {
    if (!mysqlDriver.isConnected) {
        return;
    }

    await mysqlDriver.close();
}

http.createServer(app);
init().then(() => app.emit("ready"));

async function init() {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use("/graphql", (req, res) => graphql(mysqlDriver)(req, res));

    console.log(process.env);

    await mysqlDriver.open({
        host: process.env.DB_HOSTNAME,
        user: process.env.DB_USERNAME,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: parseInt(process.env.DB_PORT as string),
    });
}
