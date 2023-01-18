const con = require('./DBConfig')

const TBL_NAME = 'tbl_chat';

const DBOperations = {

    getTableName: () => { return `${process.env.SQL_DATABASE}.${TBL_NAME}` },

    insert: async (data) => {

        console.log(data);
        let sql = `INSERT INTO ${TBL_NAME} (sender,message) VALUES (?)  `
        let values = [[data.name , data.message]]
        let result = await con().query(sql,values)
        return result
    },
}
module.exports = DBOperations
