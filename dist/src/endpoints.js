import { schema } from "./model/order";
import mongoose from "mongoose";
const connection = mongoose.createConnection('mongodb://localhost:27017/');
export const model = connection.model('Orders', schema);
const endpointlist = async (req, res) => {
    const { f, t, m } = req.query;
    console.log(f, t, m);
    let filter = {};
    if (m) {
        filter = { material: m };
    }
    if (f && t) {
        filter = Object.assign(Object.assign({}, filter), { timestamp: { $gt: f, $lt: t } });
    }
    else {
        if (f) {
            filter = Object.assign(Object.assign({}, filter), { timestamp: { $gt: f } });
        }
        if (t) {
            filter = Object.assign(Object.assign({}, filter), { timestamp: { $lt: t } });
        }
    }
    res.json(await model.find(filter).lean());
};
const endpointPost = async (req, res) => {
    const { order } = req.body;
    res.json(await model.create(order));
};
const endpointGetID = async (req, res) => {
    const { uid } = req.params;
    res.json(await model.findById(uid).lean());
};
const endpointPutID = async (req, res) => {
    const { uid } = req.params;
    const { order } = req.body;
    console.log(req.body);
    res.json(await model.findOneAndReplace({ _id: uid }, order).lean());
};
const endpointPatch = async (req, res) => {
    const { uid } = req.params;
    const { order } = req.body;
    res.send(await model.findByIdAndUpdate(uid, order));
};
const endpointDelete = async (req, res) => {
    const { uid } = req.params;
    res.json(await model.findByIdAndDelete(uid));
};
export { endpointPost, endpointGetID, endpointPutID, endpointPatch, endpointDelete, endpointlist, };
//# sourceMappingURL=endpoints.js.map