import { cartProductPrice } from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";
import MinusCircle from "@/components/icons/MinusCircle";
import PlusCircle from "@/components/icons/PlusCircle";

export default function CartProduct({ index, product, onRemove,onAddQuantity,onRemoveQuantity }) {
	return (
		<div className="flex items-center gap-4 border-b py-4">
			<div className="w-24">
				<Image width={240} height={240} src={product.images[0]} alt={""} />
			</div>
			<div className="grow">
				<h3 className="font-semibold">{product.species}</h3>
				{product.type && (
					<div className="text-sm">
						Type: <span>{product.type}</span>
					</div>
				)}
				{product.cut && (
					<div className="text-sm">
						Cut: <span>{product.cut}</span>
					</div>
				)}
				{product.dimensions && (
					<div className="text-sm">
						Cut: <span>{product.dimensions.join("/")}</span>
					</div>
				)}
			</div>
			<div className="font-bold">
				{"\u20B9"}
				{cartProductPrice(product)* product.quantity}
			</div>
			{/* ----------------------------------------------------------------------------------------------- */}
			<div className="flex flex-col">
				<button className="w-8 w-fit p-0 border-0 rounded-full"
						onClick={() => onRemoveQuantity(parseInt(index))}
						>
					<MinusCircle />
				</button>
						<span className="text-sm font-bold">{product.quantity}</span>
				<button className="w-8 w-fit p-0 border-0 rounded-full"
						onClick={() => onAddQuantity(parseInt(index))}
						>
					<PlusCircle />
				</button>
			</div>
			{/* ------------------------------------------------------------------------------------------- */}
			{!!onRemove && (
				<div className="ml-2">
					<button
						type="button"
						onClick={() => onRemove(parseInt(index))}
						className="p-0 border-0"
					>
						<Trash />
					</button>
				</div>
			)}
		</div>
	);
}
