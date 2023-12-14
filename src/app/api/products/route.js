
import { Product } from "@/models/Product";
import mongoose from "mongoose";

export async function GET() {
    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Product.find()
    );
}

export async function POST(req) {
    const data  = await req.json();
    const {id} = data;
    mongoose.connect(process.env.MONGO_URL);

    return Response.json(
        await Product.find({_id:id})
    );
}



