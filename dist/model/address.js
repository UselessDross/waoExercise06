import { Schema } from "mongoose";
export const schema = new Schema({
    street_name: { type: String, required: true },
    street_number: { type: String, required: true },
    city: { type: String, required: true }
});
//# sourceMappingURL=address.js.map