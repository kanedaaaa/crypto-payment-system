import axios from "axios";
import { print } from "graphql";
import * as dotenv from 'dotenv';

dotenv.config();

export async function dbQuery(query: any, variables = {}): Promise<any> {
  try {
    const response = await axios.post(
      process.env.hasuraUrl!,
      {
        query: print(query),
        variables: variables,
      },
      {
        headers: {
          "x-hasura-admin-secret": process.env.hasuraPrivKey!,
        },
      }
    );

    if (response.data.errors) {
      console.error(response.data.errors);
      throw new Error(
        `Error making database call: ${JSON.stringify(response.data.errors)}`
      );
    }

    return response.data.data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error making db query: ${JSON.stringify(error)}`);
  }
}