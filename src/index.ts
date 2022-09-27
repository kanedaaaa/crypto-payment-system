import { ethers } from "ethers";
import abi from "./abi/ERC20.json";
import config from "./config";
import fs from "fs";
import { dbQuery } from "./hasura/dbQuery";
import { getAllEmployees } from "./hasura/dbQueries";
import * as dotenv from 'dotenv';

dotenv.config();

let provider: any;
let contract: any;

if (config.testing) {
    provider = new ethers.providers.JsonRpcProvider(process.env.infuraTest);
    contract = new ethers.Contract(config.usdcTestnet, abi, provider);
} else {
    provider = new ethers.providers.JsonRpcProvider(process.env.infura);
    contract = new ethers.Contract(config.usdc, abi, provider);
}

const signer = new ethers.Wallet(process.env.privKey!, provider);

const main = async () => {
    console.log("Starting...");
    const { employees } = await dbQuery(getAllEmployees);

    for (const emp of employees) {
        try {
            await contract.connect(signer).transfer(emp.walletAddress, ethers.utils.parseUnits(emp.salaryAmount.toString(), 18));
            console.log(`Sent ${emp.salaryAmount} USDC to ${emp.walletAddress}`);

        } catch (error) {
            console.log("Error occured, saving details errors/failedtosend.txt");
            console.log(error);

            fs.appendFileSync("src/errors/failedtosend.txt", `${emp.walletAddress} - ${emp.salaryAmount} USDC \n`);
        }
    }
}

main();