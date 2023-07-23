

const mysql = require('mysql2');

const dotenv = require('dotenv');

dotenv.config();

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'My_taskminder',
    password: '1234',
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
  }).promise();

  // For pool initialization, see above
// pool.getConnection(function(err, conn) {
//     // Do something with the connection
//     console.log("balsal",err);
//     // Don't forget to release the connection when finished!
//     pool.releaseConnection(conn);
//   })


// const createTaskTable = async () => {
//     let sql = `
//     CREATE TABLE tasks(
//         taskId VARCHAR(200) PRIMARY KEY,
//         taskName VARCHAR(200)
//     );
//     `

//     return await pool.query(sql);
// }


// createTaskTable().then((val) => {
//     console.log(val);
// })

const showTasks = async (email) => {
    let sql = `
        SELECT * FROM tasks
        WHERE email = ?
        ORDER BY timestamp_column ASC;
    `;
    return await pool.query(sql, [email]);
}

// showTasks().then((val) => {
//     const [row] = val;
//     console.log(row);
// })

const addTask = async (taskId, taskName, email) => {
    let sql = `
        INSERT INTO tasks(taskId, taskName, email)
        VALUES (?, ?, ?)
    `;

    const something =  await pool.query(sql, [taskId, taskName, email]);
    console.log("something",something);
    return something;
}

// addTask('radme2430', 'This is my 2nd Task').then((val) => {
//     console.log(val);
// })

// addTask('sadme2340', 'this is my 1st Task').then((val) => {
//     console.log(val);
// })

const deleteTask = async (taskId) => {
    let sql = `
        DELETE FROM tasks
        WHERE taskId = ?
    `;

    return await pool.query(sql, taskId);
}


// deleteTask('radme2430').then((val) => {
//     console.log(val);
// })

const editTask = async (taskId, taskName) => {
    console.log(taskId,taskName);
    let sql = `
        UPDATE tasks
        SET taskName = ?
        WHERE taskId = ?
    `;

    return await pool.query(sql, [taskName, taskId]);
}

// editTask('radme2430', 'This is my edited 2nd task').then((val) => {
//     console.log(val);
// })

const getTaskName = async (id) => {
    let sql = `
        SELECT taskName 
        FROM tasks 
        WHERE taskId = ?
    `
    return await pool.query(sql, id);
}

// getTaskName('radme2430').then((val) => {
//     console.log(val[0][0]);
// })

const addUser = async (username, email, hashedPassword) => {
    let sql = `
        INSERT INTO users
        VALUES("${username}", "${email}", "${hashedPassword}")
    `;

    return await pool.query(sql);
}


const getUser = async (email) => {
    console.log('check');
    let sql = `
        SELECT * FROM users
        WHERE email = "${email}"` ;
    const something = await pool.query(sql);
    console.log(something);
    
    return something;
}



module.exports = { showTasks, addTask, editTask, deleteTask, getTaskName, addUser, getUser }

