// import jwt from "jsonwebtoken";

// import User from "../models/User.js";

// const protect = asyncHandler(async (req, res, next) => {
// 	let token;

// 	token = req.cookies.jwt;

// 	if (token) {
// 		try {
// 			const decoded = jwt.verify(token, process.env.JWT_SECRET);

// 			req.user = await User.findById(decoded.userId).select("-password");

// 			next();
// 		} catch (error) {
// 			console.error(error);
// 			res.status(401);
// 			throw new Error("Not authorized, token failed");
// 		}
// 	} else {
// 		res.status(401);
// 		throw new Error("Not authorized, no token");
// 	}
// });

// export { protect };

import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";

const protectSeller = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			const user = await User.findById(decoded.userId).select("-password");
			// console.log("from user", user);

			if (user.userType === "seller") {
				req.user = user;
				next();
			} else {
				res.status(403); // 403 Forbidden
				throw new Error("You are not a seller.");
			}
		} catch (error) {
			console.error(error);
			res.status(401); // 401 Unauthorized
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401); // 401 Unauthorized
		throw new Error("Not authorized, no token");
	}
});

const protectBuyer = asyncHandler(async (req, res, next) => {
	let token;

	token = req.cookies.jwt;

	if (token) {
		try {
			const decoded = jwt.verify(token, process.env.JWT_SECRET);

			req.user = await User.findById(decoded.userId).select("-password");

			next();
		} catch (error) {
			console.error(error);
			res.status(401);
			throw new Error("Not authorized, token failed");
		}
	} else {
		res.status(401);
		throw new Error("Not authorized, no token");
	}
});

export { protectSeller, protectBuyer };
