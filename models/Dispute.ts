import mongoose, { Schema, models, model } from "mongoose";

const DisputeSchema = new Schema(
    {
        executionId: String,
        reason: String,
        status: String,
    },
    { timestamps: true }
);

export default models.Dispute || model("Dispute", DisputeSchema);