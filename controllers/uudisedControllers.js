const mysql = require("mysql2/promise");
const dbInfo = require("../../../vp2025config");

const dbConf = {
    host: dbInfo.configData.host,
    user: dbInfo.configData.user,
    password: dbInfo.configData.passWord,
    database: dbInfo.configData.dataBase
};


const uudisedAddPage = (req, res) => {
    res.render("uudised_lisa");
};


const uudisAddPost = async (req, res) => {
    let conn;

    try {
        conn = await mysql.createConnection(dbConf);

        const sqlReq = `
            INSERT INTO uudised (title, content, expire, userid)
            VALUES (?, ?, ?, ?)
        `;

        const userId = 1; 

        await conn.execute(sqlReq, [
            req.body.title,
            req.body.content,
            req.body.expire,
            userId
        ]);

        res.redirect("/uudised");
    }
    catch (err) {
        console.log(err);
        res.render("uudised_lisa", { error: "Uudise salvestamine ebaõnnestus" });
    }
    finally {
        if (conn) await conn.end();
    }
};


const uudisedList = async (req, res) => {
    let conn;

    try {
        conn = await mysql.createConnection(dbConf);

        const sqlReq = `
            SELECT * FROM uudised
            WHERE expire > ?
            ORDER BY id DESC
        `;

        const [rows] = await conn.execute(sqlReq, [new Date()]);

        res.render("uudised_list", { uudised: rows });
    }
    catch (err) {
        console.log(err);
        res.send("Viga uudiste laadimisel!");
    }
    finally {
        if (conn) await conn.end();
    }
};

module.exports = {
    uudisedAddPage,
    uudisAddPost,
    uudisedList
};
