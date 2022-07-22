var whitelist = [
    "http://localhost:3000",
    "https://holocron.siddhantkumarsingh.me",
];

export const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
