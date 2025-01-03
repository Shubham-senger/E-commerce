import jwt from 'jsonwebtoken'


const authUser = async(req, res, next)=>{
    const { token }  = req.headers;

    if(!token ){
        return res.json({success: false, message: "Not Authorized Login Again"})

    }
    try{
        const token_decode = jwt.verify(token , process.env.JWT_SECRET)
        req.body.userId = token_decode.id
        next()
    }
    catch(error)
    {
        console.log(error)
        res.json({success:'false', message:error.message})
    }
}

export default authUser



// import jwt from 'jsonwebtoken';

// const authUser = async (req, res, next) => {
//     // Get token from Authorization header (Bearer <token>)
//     const token = req.headers['authorization']?.split(' ')[1];  // The token is usually sent as "Bearer <token>"

//     // If no token is provided, return unauthorized
//     if (!token) {
//         return res.status(401).json({ success: false, message: "Not Authorized. Please log in again." });
//     }

//     try {
//         // Verify the token using the secret key
//         const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

//         // Attach user information to request body for further use
//         req.body.userId = decodedToken.user.id;

//         // Continue to the next middleware/route handler
//         next();
//     } catch (error) {
//         console.log(error);

//         // Handle token expiration specifically
//         if (error.name === 'TokenExpiredError') {
//             return res.status(401).json({ success: false, message: 'Token has expired. Please log in again.' });
//         }

//         // For other errors, respond with a generic message
//         return res.status(400).json({ success: false, message: error.message });
//     }
// };

// export default authUser;
