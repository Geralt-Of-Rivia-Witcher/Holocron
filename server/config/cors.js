const allowCors = (fn) => async (req, res) => {
    // res.setHeader("Access-Control-Allow-Credentials", true);
    // res.setHeader(
    //     "Access-Control-Allow-Origin",
    //     "https://holocron.siddhantkumarsingh.me"
    // );
    // res.setHeader("Access-Control-Allow-Methods", "GET,PATCH,DELETE,POST");
    // res.setHeader(
    //     "Access-Control-Allow-Headers",
    //     "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    // );
    console.log(req.method);
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }
    return await fn(req, res);
};

var whitelist = [
    "http://localhost:3000",
    "https://holocron.siddhantkumarsingh.me",
];

export const corsOptions = {
    origin: (origin, callback) => {
        console.log(origin);
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
};

export default allowCors;
