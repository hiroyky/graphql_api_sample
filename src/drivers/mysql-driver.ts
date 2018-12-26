import mysql from "mysql2";

export default class MySqlDriver {
    public connection: mysql.Connection | null = null;

    get isConnected(): boolean {
        return this.connection !== null;
    }

    public async open(
        args: mysql.ConnectionOptions,
        currentRetry = 0,
        retry = 5,
        retryIntervalMsec = 1000,
    ) {

        try {
            await this.connect(args);
        } catch (err) {
            if (currentRetry < retry) {
                console.warn("failed to connect mysql. retry.. " + currentRetry);
                setTimeout(() => this.open(
                    args,
                    currentRetry + 1,
                    retry,
                    retryIntervalMsec,
                ), retryIntervalMsec);
                return;
            } else {
                throw err;
            }
        }
    }

    public close() {
        return new Promise((resolve, reject) => {
            if (this.connection === null) {
                reject("Mysql connection dose not still open.");
                return;
            }
            this.connection.end();
            this.connection = null;
        });
    }

    public query(sql: string): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.connection === null) {
                reject("Mysql connection dose not still open.");
                return;
            }

            this.connection.query(sql, (err, results) => {
                if (err) {
                    console.error(err);
                    reject(err);
                    return;
                }

                resolve(results as any[]);
            });
        });
    }

    public beginTransaction() {
        return new Promise((resolve, reject) => {
            if (this.connection === null) {
                reject("Mysql connection dose not still open.");
                return;
            }
            this.connection.beginTransaction((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    public commit() {
        return new Promise((resolve, reject) => {
            if (this.connection === null) {
                reject("Mysql connection dose not still open.");
                return;
            }
            this.connection.commit((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }

    protected connect(args: mysql.ConnectionOptions) {
        return new Promise((resolve, reject) => {
            this.connection = mysql.createConnection(args);
            this.connection.connect((err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
}
