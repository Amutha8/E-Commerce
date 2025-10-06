import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  category: string;
  description: string;
  ratings: number;
}
export default function Products() {
  const { categoryId } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = "http://localhost:3000/products";
        if (categoryId) {
          url += `?category=${categoryId}`;
        }
        const res = await axios.get(url);
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]);

  const addToCart = async (productId: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) return alert("Please login first!");

      await axios.post(`http://localhost:3000/cart`, {
        userId,
        items: [{ productId, quantity: 1 }],
      });

      alert("Added to cart!");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">
        Products
      </h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products found!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-4 shadow-md rounded-lg hover:shadow-lg flex flex-col"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md mb-4"
              />
              <h3 className="font-semibold text-lg">{product.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{product.category}</p>
              <p className="font-bold text-indigo-600 mb-2">${product.price}</p>
              <button
                onClick={() => addToCart(product._id)}
                className="mt-auto bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
