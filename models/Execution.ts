import mongoose, { Schema, models, model } from "mongoose";

const ExecutionSchema = new Schema(
    {
        executionId: String,
        agent: String,
        trust: Number,
        status: String,
        hash: String,
    },
    { timestamps: true }
);

export default models.Execution || model("Execution", ExecutionSchema);