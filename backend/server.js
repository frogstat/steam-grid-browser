import express from 'express';
import cors from 'cors';
import routes from './routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "OK"
    });
});

app.use("/api", routes);

const port = 3001;

const server = app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});

server.on("error", (err) => {
    console.error("SERVER ERROR:", err);
});

process.on("exit", (code) => {
    console.log("PROCESS EXIT:", code);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});
