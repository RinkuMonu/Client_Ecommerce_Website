// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { removeItemFromCart, updateQuantity } from "../reduxslice/CartSlice"
// import { Link } from "react-router-dom";


// const ShoppingCart: React.FC = ({cartItems}) => {
//   const dispatch = useDispatch()
//   const [quantity, setQuantity] = useState(2); // Default quantity
//   const [subtotal, setSubtotal] = useState(14999 * 2); // Default subtotal
//   const [coupon, setCoupon] = useState("");
//   const [discount, setDiscount] = useState(0); // Default discount value
//   // const [total, setTotal] = useState(subtotal); // Total after discount
  

//   const originalPrice = 31000; // Original price for one product
//   const pricePerItem = 14999; // Discounted price per item

//     const total = cartItems.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );
  
//     const handleIncrement = (id: string) => {
//       const item = cartItems.find((i) => i.id === id);
//       if (item) {
//         dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
//       }
//     };
  
//     const handleDecrement = (id: string) => {
//       const item = cartItems.find((i) => i.id === id);
//       if (item && item.quantity > 1) {
//         dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
//       }
//     };
  
//     const handleDelete = (id: string) => {
//       dispatch(removeItemFromCart(id));
//     };

//   // Function to handle quantity increment
//   const incrementQuantity = () => {
//     const newQuantity = quantity + 1;
//     setQuantity(newQuantity);
//     updateSubtotal(newQuantity);
//   };

//   // Function to handle quantity decrement
//   const decrementQuantity = () => {
//     if (quantity > 1) {
//       const newQuantity = quantity - 1;
//       setQuantity(newQuantity);
//       updateSubtotal(newQuantity);
//     }
//   };

//   // Function to update subtotal and total
//   const updateSubtotal = (newQuantity: number) => {
//     const newSubtotal = newQuantity * pricePerItem;
//     setSubtotal(newSubtotal);
//     setTotal(newSubtotal - discount); // Recalculate total after discount
//   };

//   // Function to apply coupon code
//   const applyCoupon = () => {
//     if (coupon.toLowerCase() === "save10") {
//       const newDiscount = subtotal * 0.1; // 10% discount
//       setDiscount(newDiscount);
//       setTotal(subtotal - newDiscount);
//       alert("Coupon applied successfully! 10% discount added.");
//     } else {
//       alert("Invalid coupon code.");
//     }
//   };

//   return (
//     <div className="container px-16 py-8 my-4 product-table">
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {/* Product Table */}
//         <div className="col-span-2">
//           <div className="overflow-x-autol">
//             <table className="table-auto w-full ">
//               <thead className="border-b">
//                 <tr className="text-gray-500 text-sm">
//                   <th className="text-left p-3">Product</th>
//                   <th className="text-left p-3">Price</th>
//                   <th className="text-left p-3">Quantity</th>
//                   <th className="text-right p-3">Total</th>
//                   <th className="text-center p-3"></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {cartItems.map((item) => {
//                   return (
//                     <>
//                       <tr className="border-b">
//                   <td className="p-3">
//                     <div className="flex items-center space-x-4">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover rounded"
//                       />
//                       <div>
//                         <h4 className="font-semibold text-gray-800">
//                         {item.name}
//                         </h4>
//                         <p className="text-green-600 text-sm">In stock</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="text-gray-700">
//                       ₹{item.price}
//                       <span className="line-through text-sm text-gray-500">
//                         ₹{originalPrice.toLocaleString()}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-3">
//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => handleDecrement(item.id)}
//                         className="px-3 py-1 bg-gray-200 rounded"
//                       >
//                         -
//                       </button>
//                       <span>{item.quantity}</span>
//                       <button
//                         onClick={() => handleIncrement(item.id)}
//                         className="px-3 py-1 bg-gray-200 rounded"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </td>
//                   <td className="p-3 text-right text-gray-700">
//                     ₹{item.price * item.quantity}
//                   </td>
//                   <td className="p-3 text-center">
//                     <button className="text-gray-500 hover:text-red-600">
//                       <i className="bi bi-trash3"></i>
//                     </button>
//                   </td>
//                 </tr>
//                     </>
//                   );
//                 })}

               
//               </tbody>
//             </table>

//             <div className="mt-4">
//               <label htmlFor="coupon" className="block mb-2 text-sm">
//                 Coupon Code:
//               </label>
//               <div className="flex">
//                 <input
//                   type="text"
//                   id="coupon"
//                   placeholder="Enter Coupon Code"
//                   value={coupon}
//                   onChange={(e) => setCoupon(e.target.value)}
//                   className="flex-1 border border-gray-300 rounded-l px-3 py-2"
//                 />
//                 <button
//                   onClick={applyCoupon}
//                   className="px-4 bg-gray-800 text-white rounded-r"
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Summary Section */}
//         <div>
//           <div className="p-4 sticky top-16 shadow-lg rounded-lg">
//             <h3 className="font-semibold text-lg mb-4">Summary</h3>
//             <div className="shadow-md rounded-lg bg-white">
//               <div className="border-b pb-2 mb-4">
//                 <div className="flex justify-between text-gray-700">
//                   <span>Subtotal</span>
//                   <span>₹{total}</span>
//                 </div>
//                 <div className="flex justify-between text-gray-700">
//                   <span>Tax</span>
//                   <span>₹0.00</span>
//                 </div>
//               </div>
//               <div className="flex justify-between font-bold text-gray-900 mb-4">
//                 <span>Total</span>
//                 <span>₹{total.toLocaleString()}</span>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">
//                 (Shipping fees not included)
//               </p>
//               <Link to={"/address"}>
              
              
//               <button  className="w-full py-2 bg-gray-800 text-white rounded mb-2">
//                 Proceed to Checkout
//               </button>
//               </Link>
              
//               <button className="w-full py-2 text-gray-700 border border-gray-300 rounded">
//                 Continue Shopping
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ShoppingCart;






import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateQuantity } from "../reduxslice/CartSlice";
import { Link } from "react-router-dom";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const ShoppingCart: React.FC<{ cartItems: CartItem[] }> = ({ cartItems }) => {
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalAfterDiscount = Math.max(0, total - discount);
  
  const handleIncrement = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) {
      dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
    }
  };

  const handleDecrement = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 1) {
      dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
    }
  };

  const handleDelete = (id: string) => {
    dispatch(removeItemFromCart(id));
  };

  const applyCoupon = () => {
    if (coupon.toLowerCase() === "save10") {
      const newDiscount = total * 0.1;
      setDiscount(newDiscount);
      alert("Coupon applied successfully! 10% discount added.");
    } else {
      alert("Invalid coupon code.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="hidden md:grid grid-cols-6 bg-gray-50 px-6 py-4 text-sm font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-2">Product</div>
              <div>Price</div>
              <div>Quantity</div>
              <div className="text-right">Total</div>
              <div className="text-center">Action</div>
            </div>
            
            <div className="divide-y"> 
              {cartItems.map((item) => (
                <div key={item.id} className="grid grid-cols-1 md:grid-cols-6 gap-4 p-6">
                  <div className="md:col-span-2 flex items-center">
                    <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                      <img
                          src={`http://api.jajamblockprints.com/${item?.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-green-600">In stock</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex flex-col">
                      <span className="text-gray-900 font-medium">₹{item.price.toLocaleString()}</span>
                      <span className="text-gray-500 text-sm line-through">₹{(item.price * 2.1).toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleDecrement(item.id)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        -
                      </button>
                      <span className="px-3 py-1 text-gray-900">{item.quantity}</span>
                      <button
                        onClick={() => handleIncrement(item.id)}
                        className="px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-end md:justify-start">
                    <span className="text-gray-900 font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                />
                <button
                  onClick={applyCoupon}
                  className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                >
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">₹{total.toLocaleString()}</span>
              </div>
              
              {discount > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Discount</span>
                  <span className="text-green-600 font-medium">-₹{discount.toLocaleString()}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹0.00</span>
              </div>
              
              <div className="border-t pt-4 flex justify-between text-lg">
                <span className="font-medium">Total</span>
                <span className="font-bold text-gray-900">₹{totalAfterDiscount.toLocaleString()}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mb-6 italic">
              Shipping fees not included
            </p>
            
            <div className="space-y-3">
              <Link to={"/address"}>
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  Proceed to Checkout
                </button>
              </Link>
              
              <button className="w-full py-3 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;