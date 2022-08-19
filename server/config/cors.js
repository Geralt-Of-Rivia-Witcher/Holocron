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
