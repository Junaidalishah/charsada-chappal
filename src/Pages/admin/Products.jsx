import { useEffect, useState } from "react";
import axios from "axios";

import { useAuth } from "../../context/AuthContext";

import API_URL from "../../config/api";

import DashboardLayout from "../../components/layout/DashboardLayout";

const Products = () => {
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editingProduct, setEditingProduct] = useState(null);

  const [uploading, setUploading] = useState(false);
  const { userInfo } = useAuth();

  const initialFormState = {
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    details: [],
    sizes: [],
    disabledSizes: [],
    colors: [
      {
        name: "",
        images: [],
      },
    ],
    featured: false, // Added featured field
  };

  const [formData, setFormData] = useState(initialFormState);

  // ================= FETCH PRODUCTS =================
  // ================= FETCH PRODUCTS =================
  const fetchProducts = async () => {
    try {
      // STOP if not admin
      if (!userInfo || !userInfo.isAdmin) {
        setLoading(false);
        return;
      }

      const { data } = await axios.get(`${API_URL}/products`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      setProducts(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo?.token && userInfo?.isAdmin) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, [userInfo]);
  // ================= IMAGE UPLOAD =================
  const uploadImage = async (file) => {
    const data = new FormData();

    data.append("file", file);

    data.append("upload_preset", "charsadda_products");

    try {
      setUploading(true);

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/drujzy5lq/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const uploadedImage = await res.json();

      setUploading(false);

      return uploadedImage.secure_url;
    } catch (error) {
      console.log(error);

      setUploading(false);
    }
  };

  // ================= ADD / UPDATE PRODUCT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const finalData = {
        ...formData,
        image: formData.colors?.[0]?.images?.[0] || "",
        sizes: formData.sizes.filter((size) => size.trim() !== ""),
        disabledSizes: formData.disabledSizes.filter(
          (size) => size.trim() !== "",
        ),
        details: formData.details.filter((detail) => detail.trim() !== ""),
        featured: formData.featured, // Ensure featured is included
      };

      if (editingProduct) {
        await axios.put(
          `${API_URL}/products/${editingProduct._id}`,
          finalData,
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          },
        );
      } else {
        await axios.post(`${API_URL}/products`, finalData, {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
      }

      setShowModal(false);

      setEditingProduct(null);

      setFormData(initialFormState);

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  // ================= DELETE PRODUCT =================
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/products/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* TOP */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#061b0e]">Products</h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your product inventory
            </p>
          </div>

          <button
            onClick={() => {
              setEditingProduct(null);

              setFormData(initialFormState);

              setShowModal(true);
            }}
            className="rounded-2xl bg-[#061b0e] px-5 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Add Product
          </button>
        </div>

        {/* TABLE */}
        <div className="rounded-3xl border border-black/5 bg-white p-6 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-black/5 text-left text-sm text-gray-500">
                  <th className="pb-4">Image</th>

                  <th className="pb-4">Product</th>

                  <th className="pb-4">Category</th>

                  <th className="pb-4">Stock</th>

                  <th className="pb-4">Price</th>

                  <th className="pb-4">Status</th>

                  <th className="pb-4 text-right">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="7">
                      Loading...
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td className="py-10 text-center" colSpan="7">
                      No Products Found
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product._id} className="border-b border-black/5">
                      {/* IMAGE */}
                      <td className="py-5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-16 w-16 rounded-2xl object-cover"
                        />
                      </td>

                      {/* NAME */}
                      <td className="font-medium text-[#061b0e]">
                        {product.name}
                      </td>

                      {/* CATEGORY */}
                      <td>{product.category}</td>

                      {/* STOCK */}
                      <td>{product.stock}</td>

                      {/* PRICE */}
                      <td>PKR {product.price}</td>

                      {/* STATUS */}
                      <td>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            product.stock > 0
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </td>

                      {/* ACTIONS */}
                      <td className="space-x-2 text-right">
                        <button
                          onClick={() => {
                            setEditingProduct(product);

                            setFormData({
                              name: product.name || "",

                              price: product.price || "",

                              stock: product.stock || "",

                              category: product.category || "",

                              description: product.description || "",

                              details: product.details || [],

                              sizes: product.sizes || [],

                              disabledSizes: product.disabledSizes || [],

                              colors: product.colors || [
                                {
                                  name: "",
                                  images: [],
                                },
                              ],
                              featured: product.featured || false, // Set featured on edit
                            });

                            setShowModal(true);
                          }}
                          className="rounded-xl bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => deleteProduct(product._id)}
                          className="rounded-xl bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold text-[#061b0e]">
                  {editingProduct ? "Edit Product" : "Add Product"}
                </h2>

                <button
                  onClick={() => {
                    setShowModal(false);

                    setEditingProduct(null);
                  }}
                  className="text-2xl"
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                {/* NAME */}
                <input
                  type="text"
                  placeholder="Product Name"
                  className="rounded-2xl border border-black/10 p-4 outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  required
                />

                {/* PRICE */}
                <input
                  type="number"
                  placeholder="Price"
                  className="rounded-2xl border border-black/10 p-4 outline-none"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                  required
                />

                {/* STOCK */}
                <input
                  type="number"
                  placeholder="Stock"
                  className="rounded-2xl border border-black/10 p-4 outline-none"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    })
                  }
                  required
                />

                {/* CATEGORY */}
                <input
                  type="text"
                  placeholder="Category"
                  className="rounded-2xl border border-black/10 p-4 outline-none"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value,
                    })
                  }
                />

                {/* DESCRIPTION */}
                <textarea
                  placeholder="Description"
                  rows="4"
                  className="rounded-2xl border border-black/10 p-4 outline-none"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                />

                {/* FEATURED PRODUCT CHECKBOX */}
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.featured}
                    onChange={(e) =>
                      setFormData({ ...formData, featured: e.target.checked })
                    }
                  />
                  Featured Product
                </label>

                {/* SIZES */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sizes</label>

                  <input
                    type="text"
                    placeholder="Example: 39,40,41,42"
                    value={formData.sizes.join(",")}
                    className="w-full rounded-2xl border border-black/10 p-4 outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        sizes: e.target.value.split(","),
                      })
                    }
                  />
                </div>

                {/* DISABLED SIZES */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Disabled Sizes</label>

                  <input
                    type="text"
                    placeholder="Example: 39,42"
                    value={formData.disabledSizes.join(",")}
                    className="w-full rounded-2xl border border-black/10 p-4 outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        disabledSizes: e.target.value.split(","),
                      })
                    }
                  />
                </div>

                {/* PRODUCT DETAILS */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Product Details</label>

                  <textarea
                    rows="4"
                    placeholder="Each line becomes detail"
                    value={formData.details.join("\n")}
                    className="w-full rounded-2xl border border-black/10 p-4 outline-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        details: e.target.value.split("\n"),
                      })
                    }
                  />
                </div>

                {/* COLORS */}
                <div className="space-y-6 rounded-3xl border border-black/10 p-5">
                  <h3 className="text-lg font-semibold">Product Colors</h3>

                  {formData.colors.map((color, index) => (
                    <div
                      key={index}
                      className="space-y-4 rounded-2xl border border-black/10 p-4"
                    >
                      {/* COLOR NAME */}
                      <input
                        type="text"
                        placeholder="Color Name"
                        className="w-full rounded-2xl border border-black/10 p-4 outline-none"
                        value={color.name}
                        onChange={(e) => {
                          const updatedColors = [...formData.colors];

                          updatedColors[index].name = e.target.value;

                          setFormData({
                            ...formData,
                            colors: updatedColors,
                          });
                        }}
                      />

                      {/* IMAGE UPLOAD */}
                      <input
                        type="file"
                        multiple
                        className="w-full rounded-2xl border border-black/10 p-4"
                        onChange={async (e) => {
                          const files = Array.from(e.target.files);

                          const uploadedImages = [];

                          for (const file of files) {
                            const imageUrl = await uploadImage(file);

                            uploadedImages.push(imageUrl);
                          }

                          const updatedColors = [...formData.colors];

                          updatedColors[index].images = [
                            ...updatedColors[index].images,
                            ...uploadedImages,
                          ];

                          setFormData({
                            ...formData,
                            colors: updatedColors,
                          });
                        }}
                      />

                      {/* PREVIEW */}
                      <div className="flex flex-wrap gap-3">
                        {color.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt=""
                            className="h-20 w-20 rounded-xl object-cover"
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                  {/* ADD COLOR */}
                  <button
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        colors: [
                          ...formData.colors,
                          {
                            name: "",
                            images: [],
                          },
                        ],
                      })
                    }
                    className="rounded-2xl bg-black px-5 py-3 text-sm text-white"
                  >
                    Add Another Color
                  </button>
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="mt-2 rounded-2xl bg-[#061b0e] py-4 font-medium text-white"
                >
                  {editingProduct ? "Update Product" : "Create Product"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Products;
