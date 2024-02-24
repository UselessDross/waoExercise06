import { Schema } from "mongoose";
import { schema as address } from "./address";
export const schema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: address,
});
//# sourceMappingURL=delivery.js.map