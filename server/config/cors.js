var whitelist = [
    "http://localhost:3000",
    "https://holocron.siddhantkumarsingh.me",
];

export const corsOptions = {
    origin: whitelist,
    credentials: true,
    exposedHeaders: ["set-cookie"],
};
