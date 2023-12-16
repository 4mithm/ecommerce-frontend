import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Species } from "@/models/Species";
import { Uses } from "@/models/Uses";
import { Product } from "@/models/Product";
import mongoose from "mongoose";


export async function POST(req) {
	mongoose.connect(process.env.MONGO_URL);
	const data = await req.json();
	console.log(data);
	const filter = {};
	if (data.species.length > 0) {
	  filter.species = { $in: data.species }; 
	}
	if (data.uses.length > 0) {
	  filter.uses = { $in: data.uses }; 
	}
    
	return Response.json(await Product.find(filter));
}

export async function GET() {
	mongoose.connect(process.env.MONGO_URL);
	const speciesData = await Species.find({},{ _id: 0, name: 1 })
	const usesData = await Uses.find({},{ _id: 0, name: 1 })

	return Response.json({ species: speciesData, uses: usesData });
}
