import mysql from 'mysql'


export const mysqlConnection = () => {
    return new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection({
            host: "localhost",
            port: 3306,
            user: "root",
            password: "password",
            database: "revou"
        })

        connection.connect((err) => {
            if (err) {
                reject(err)
                return
            }

            resolve(connection)
        })
    })
}

