const {Pool} = require("pg");

const pool = new Pool({
    user:process.env.POSTGRES_USER,
    host:process.env.POSTGRES_HOST,
    password:process.env.POSTGRES_PASSWORD,
    database:process.env.POSTGRES_DATABASE,
    port:process.env.POSTGRES_PORT
});


async function addUser(obj){
    let client;
    try {
        client = await pool.connect();

        await client.query(`insert into users (username,email,password) values ($1, $2, $3)`,[obj.userName, obj.email, obj.password]);

        return "Added user successfully"
    } catch (err) {
        console.log(err);
        if(err.code === "23505"){
            return "username or email already exists";
        }
        else if(err.code === "23502"){
            return "username or email not provided";
        }
        else{
            return "Failed to add user";
        }
    }
    finally{
        client.release();
    }
}

async function userLogin(obj){
    let client;
    try {
        const {userName, password} = obj;
        client = await pool.connect();
        const res = await client.query(`select * from users where username = $1 and password = $2;`,[userName, password]);
        if(res.rowCount > 0){
            return true;
        }
        else{
            return false;
        }
    } catch (error) {
        console.log(error);
        return error;
    }
    finally{
        client.release();
    }
}


async function createGroup(obj){
    let client = null;

    try {
        client = await pool.connect();
        
        const{groupName, password} = obj;

        const result = await client.query(`insert into groups values($1 , $2)`,[ groupName, password]);

        if(result.rowCount > 0){
            return "group created successfully";
        }
        console.log("failed to create new group");
        return "failed to create new group";

    } catch (error) {
        console.log(error);
        if(error.code === "23505"){
            return "Group already exists";
        }
        else if(error.code === "23502"){
            return "Group name or password not provided";
        }
        else{
            return "failed to create new group";
        }
    }
    finally{
        client.release();
    }
}

async function joinGroup(obj){
    let client = null;

    try {
        
        client = await pool.connect();
        
        const {groupName, password} = obj;

        const result = await client.query(`select group_name, password from groups where group_name = $1 and password = $2`,[groupName, password]);

        if(result.rowCount === 1){
            return "success";
        }
        else{
            return "Group_name or password is incorrect";
        }
    } catch (error) {
        console.log(error);
        return "Error";
    }
    finally{
        client.release();
    }
}

async function test(){
    const res = await joinGroup( {groupName : "OR 1=1; --", password : "OR '1'='1'; --"} );
    const res1 = await joinGroup( {groupName : "PCP2", password : "ppcp2"} );
    console.log(res);
    console.log(res1);
}

async function display(tableName){
    let client  = await pool.connect();
    let result = await client.query(`select * from ${tableName}`);
    console.log(result.rows);
    client.release();
}

// test();

// display("users");
// display("groups");

module.exports = {addUser, userLogin, createGroup, joinGroup};