
import { ServerCache } from "../../../services";
import { paginateServer } from "../../../utils"
// import  mssql from "mssql";

const information = async request => {
    // const config = {
    //     user: 'sa',
    //     password: 'sqlpp2020N',
    //     server: '106.55.62.27', // You can use 'localhost\\instance' to connect to named instance
    //     database: 'csart',
    //     port:1433,
    //     "pool": {
    //         "max": 10,
    //         "min": 0,
    //         "idleTimeoutMillis": 30000
    //     },
    //     options: {
    //         "encrypt": false,
    //         "enableArithAbort": true
    //     }
    // };
    // let connectionPool = new mssql.ConnectionPool(config).connect();
    // let uid = 2;
    //   connectionPool.then(pool => {
    //       // Query
    //       return pool.query`select * from ow_member where uid = ${uid}`
    //   }).then(result => {
    //       console.log(result.recordset);
    //   }).catch(err => {
    //       console.log(err)
    //       // ... error checks
    //   });
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select * from cs_background limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from cs_background');
    return { data, sum}
};

const search = async request => {
    const pool = request.mysql.pool;
    let {limit, page} = request.query;
    let [data] = await pool.query(`select * from w_information limit ${(page-1)*limit},${limit};`);
    let [[ sum ]] = await pool.query('select count(*) as count from w_information');
    return { data, sum}
}

export const registerMethods = server => {
    ServerCache.make(server)
        .method("information", information, 6, request => ({
            ...paginateServer(request)
        })).method("search", search, 6, request => ({
        ...paginateServer(request)
    }));
};
