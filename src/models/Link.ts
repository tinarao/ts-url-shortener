import mongoose from "mongoose";

const getMongoLink = () => {
    const link = process.env.DB_LINK_URL
    if (!link) {
        throw new Error("Link is not provided")
    }

    return link
}

const linkConnection = mongoose.createConnection(getMongoLink());

const linkSchema = new mongoose.Schema({
    link: String,
    alias: { type: String, unique: true },
    authorID: String,
}, { timestamps: true }
)

export default linkConnection.models['Link'] || linkConnection.model("Link", linkSchema)