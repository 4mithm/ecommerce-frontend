import {cartProductPrice} from "@/components/AppContext";
import Trash from "@/components/icons/Trash";
import Image from "next/image";

export default function OrderedProduct({index, product,onRemove}) {
  return (
    <div className="flex items-center gap-4 border-b py-4">
      <div className="w-24">
        {/* <Image width={240} height={240} src={product.images[0]} alt={''} /> */}
      </div>
      <div className="grow">
        <h3 className="font-semibold">
          {product.species}
        </h3>
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
            Cut: <span>{product.dimensions.join('/')}</span>
          </div>
        )}       
      </div>
      <div className="text-lg font-semibold">
      {'\u20B9'}{product.price}
      </div>
               <div>
                
               </div>

    </div>
  );
}
