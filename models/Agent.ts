import mongoose, { Schema, models, model } from "mongoose";

const AgentSchema = new Schema(
    {
        name: String,
        type: String,
        trustScore: Number,
        stake: Number,
        executions: Number,
    },
    { timestamps: true }
);

export default models.Agent || model("Agent", AgentSchema);