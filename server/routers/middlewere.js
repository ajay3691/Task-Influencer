import jwt from 'jsonwebtoken';

// Middleware for admin role
function middleware(req, resp, next) {
    try {
        const token = req.header('x-token');
        if (!token) {
            return resp.status(400).send('Token Not found');
        }

        // Verify and decode the JWT token with the 'AJR' secret key
        const decode = jwt.verify(token, 'AJR');

        // Attach the user data from the payload to req.userA
        req.userA = decode.userA;

        if (req.userA.role === 'admin') {
            // If the user is an admin, continue to the next middleware
            next();
        } else {
            
            return resp.status(401).send('Access Denied: Not an admin');
        }
    } catch (err) {
        console.log(err);
        return resp.status(400).send('Invalid token for admin');
    }
}

// Middleware for user role
function middlewareU(req, resp, next) {
    try {
        const token1 = req.header('y-token');
        if (!token1) {
            return resp.status(400).send('Token Not found');
        }

        // Verify and decode the JWT token with the 'AJI' secret key
        const decode = jwt.verify(token1, 'AJI');

        // Attach the user data from the payload to req.userS
        req.userS = decode.userS;

        if (req.userS.role === 'teacher') {
            // If the user is a regular user, continue to the next middleware
            next();
        } else {
            // Handle other roles as needed
            return resp.status(401).send('Access Denied: Not a user');
        }
    } catch (err) {
        console.log(err);
        return resp.status(400).send('Invalid token for user');
    }
}

export { middleware, middlewareU };
