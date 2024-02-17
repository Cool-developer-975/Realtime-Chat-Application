const {Pool} = require("pg");

const pool = new Pool({
    user:"postgres",
    host:"localhost",
    password:"Ameya",
    database:"Real Time Chat Application",
    port:5432
});


async function addUser(obj){
    let client;
    try {
        client = await pool.connect();

        await client.query(`insert into users (username,email,password) values ($1, $2, $3)`,[obj.userName, obj.email, obj.password]);

        return "Added user successfully"
    } catch (err) {
        if(err.code === "23505"){
            return "username or email already exists";
        }
        else if(err.code === "23502"){
            return "Record not provided";
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
        client = await pool.connect();
        const res = await client.query(`select * from users where username = $1 and password = $2;`,[obj.userName, obj.password]);
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

async function test(){
    const res = await userLogin({userName: "Ameya kawade",password:"Ameya"});
    const res1 = await userLogin({userName: "Ameyakawade",password:"Ameya"});
    console.log(res,res1);
}

// test();

module.exports = {addUser, userLogin};