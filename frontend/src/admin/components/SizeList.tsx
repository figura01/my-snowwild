import { useState } from "react";
import SizeItem from "./SizeItem";
import { SizeType } from "@/types";

const SizeList = ({ sizes, onFormSelectedSize } : { sizes: SizeType[], onFormSelectedSize: (size: string | null) => void}) => {

  const [selectedSize, setSelectedSize] = useState<SizeType | null | any>(null);
  const handleSelectSize = (item: any) => {
    console.log("handleSelectSize", item)
    let currentSize = sizes.filter((s: any) => s?.label === item.label );
    setSelectedSize({
      ...item,
      isActive: !item.isActive
    });
    onFormSelectedSize(item?.label)
  }
  
  return sizes && (
    <ul className="flex gap-4">
      {sizes && sizes.map((size: any) => (
        <SizeItem 
          key={`size_${size.label}`}
          item={size} 
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize as any}
          onHandleSelectSize={handleSelectSize}
        />
      ))}
    </ul>
  )
}

export default SizeList;