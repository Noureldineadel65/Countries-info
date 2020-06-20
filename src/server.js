import sirv from "sirv";
import express from "express";
import compression from "compression";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

express() // You can also use Express
	.use(
		compression({ threshold: 0 }),
		sirv("static", { dev }),
		sapper.middleware({
			session: (req) => ({
				token: req.session && req.session.token,
			}),
		})
	)
	.listen(PORT, (err) => {
		if (err) console.log("error", err);
	});
