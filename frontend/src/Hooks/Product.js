import CreateProduct from "@/components/Pages/CreateProduct";
import { create } from "zustand";
export const UseProductStore = create((set) => ({
  Products: [],
  setProducts: (Products) => set({ Products }),
  CreateProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "please fill in all fields" };
    }
    const res = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    const data = await res.json();
    set((state) => ({ Products: [...state.Products, data.date] }));
    return { success: true, message: "Product added" };
  },
  GetProduct: async () => {
    const res = await fetch("/api/products");
    if (res === null) {
      return { success: false, message: "Failed to get the data from server" };
    }
    const data = await res.json();
    console.log(data);
    set({ Products: data.date });
  },
  DeleteProduct: async (id) => {
    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res === null) {
      return { success: false, message: "Failed to get the data from server" };
    }
    set((state) => ({
      Products: state.Products.filter((product) => product._id !== id),
    }));
  },
  UpdateProduct: async (id, newProduct) => {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });
    if (res === null) {
      return { success: false, message: "Failed to get the data from server" };
    }
    set((state) => ({
      Products: state.Products.map((product) =>
        product._id === id ? newProduct : product
      ),
    }));
    return { success: true, message: "Product updated" };
  },
}));
