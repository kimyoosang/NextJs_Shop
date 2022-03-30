import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface AddToCartWidgetProps {
  productId: number;
}
const AddToCartWidget: React.FC<AddToCartWidgetProps> = ({ productId }) => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="py-2">
      <input
        type="number"
        min={1}
        className="border rounded px-3 py-1 mr-2 w-16 text-right"
        value={quantity.toString()}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
    </div>
  );
};
export default AddToCartWidget;
