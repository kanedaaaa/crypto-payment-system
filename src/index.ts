import express, { Request, Response } from "express";
import main from "./main";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send({"health" : "ok"});
});

app.get("/payday", async (req: Request, res: Response) => {
    try {
        await main()
        res.status(200).send({"status" : "done"});
    } catch(err) {
        res.send({"status" : err});
    }
})

app.listen(8080, () => {
    console.log(`Server listening on port ${8080}`);
});