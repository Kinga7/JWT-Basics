const jwt = require(`jsonwebtoken`)
const CustomAPIError = require(`../errors/custom-error`)
const login = async (req, res) => {
    const {username,password} = req.body
    // Mongo 
    // Joi
    // Check in the controller

    if(!username || !password){
        throw new CustomAPIError(`please provide email and password`, 400)
    }

    // Just for demo, normally provided by DB!!!
    const id = new Date().getDate()

    // Try to keep payload small, better experience for user
    const token = jwt.sign({id, username},process.env.JWT_SECRET,{expiresIn:`30d`})

    res.status(200).json({msg:`user created`, token})
}

const dashboard = async (req, res) => {
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith(`Bearer `))
    throw new CustomAPIError(`No token provided`,401)

    const token = authHeader.split(` `)[1]

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
    } catch (error) {
        throw new CustomAPIError(`Not authorized to access this route`,401)
    }


    const luckyNumber = Math.floor(Math.random()*100)
    res.status(200).json({msg:`Hello, John Doe`, secret:`Here is your authorized data, your lucky number is ${luckyNumber}`})
}

module.exports = {
    login, dashboard
}