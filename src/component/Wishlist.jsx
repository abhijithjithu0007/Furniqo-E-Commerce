import React from "react";

const Wishlist = () => {
  const products = [
    {
      id: 1,
      name: "Stylish table lamp",
      price: "$155",
      originalPrice: "$259",
      status: "In Stock",
      image: "path-to-your-lamp-image",
    },
    {
      id: 2,
      name: "White energy bulb",
      price: "$59",
      originalPrice: "$85",
      status: "Stock Out",
      image: "path-to-your-bulb-image",
    },
    {
      id: 3,
      name: "Stylish LED bulb",
      price: "$99",
      originalPrice: "",
      status: "In Stock",
      image: "path-to-your-led-image",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center">Your Favorite Items</h2>
      <p className="text-center text-gray-500 mb-4">
        There are {products.length} products in this list
      </p>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left py-2 px-4">Product Name</th>
            <th className="text-left py-2 px-4">Unit Price</th>
            <th className="text-left py-2 px-4">Stock Status</th>
            <th className="text-left py-2 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-t">
              <td className="flex items-center py-2 px-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-10 w-10 rounded-full mr-4"
                />
                {product.name}
              </td>
              <td className="py-2 px-4">
                <span className="text-gray-500 line-through mr-2">
                  {product.originalPrice}
                </span>
                {product.price}
              </td>
              <td className="py-2 px-4">{product.status}</td>
              <td className="py-2 px-4">
                <button
                  className="bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
                  disabled={product.status === "Stock Out"}
                >
                  Add to Cart
                </button>
                <button className="ml-2 text-gray-500 hover:text-red-600">
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Wishlist;
