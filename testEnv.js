import { account } from "./appwrite.config";

const result = await account.get();

console.log(result);
