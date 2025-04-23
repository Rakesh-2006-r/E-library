const exp = require("express")
const userApp = exp.Router()
const { getUsersCollection } = require("./db") 

userApp.get('/', (req, res) => {
    res.send("Users API")
})

userApp.post('/register', async (req, res) => {
    try{
        const { name, email, password } = req.body
        const usersCollection = getUsersCollection()
        // Check if user already exists
        const existingUser = await usersCollection.findOne({ email })
        if (existingUser) {
            return res.status(201).json({ success:false, message: "User already exists" })
        }
        // Create new user
        const newUser = { name, email, password } // Hash password in production
        await usersCollection.insertOne(newUser)
        res.status(201).json({success:true, message: "User registered successfully", email:email })
    } catch (error) {
        console.error("Error registering user:", error)
        res.status(500).json({ success:false, message: "Internal server error" })
    }
})

userApp.post('/login', async (req, res) => {
         try {
             const { email, password } = req.body
             const usersCollection = getUsersCollection()
    
             // Check if user exists
             const user = await usersCollection.findOne({ email })
             if (!user) {
                 return res.status(201).json({ success: false, message: "User not found" })
             }
    
            // Check password (in production, use bcrypt)
            if (user.password !== password) {
              return res.status(201).json({ success: false, message: "Incorrect password" })
            }
    
          // Login successful
         return res.status(200).json({ success: true, message: "Login successful", email: user.email })
    
         } catch (error) {
     console.error("Error during login:", error)
           res.status(500).json({ success: false, message: "Internal server error" })
         }
    })
    

module.exports = {userApp}