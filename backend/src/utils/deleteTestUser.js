import db from "../models/database.js"

async function deleteTestUser(username){
    try {
        db.query("DELETE FROM users WHERE username =?", [username]);
    } 
    catch (error) {
        console.error("Erroe deleting user");
    }
} 
export default deleteTestUser;