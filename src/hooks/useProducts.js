import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_BACKEND_TOKEN;

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchProducts() {
      try {
        setLoading(true);
        const res = await fetch(API_URL, {
          headers: { Authorization: TOKEN },
        });
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        if (cancelled) return;

        setProducts(data);

        // Extract unique categories
        const uniqueCategories = [];
        const seen = new Set();
        for (const product of data) {
          if (product.category && !seen.has(product.category.id)) {
            seen.add(product.category.id);
            uniqueCategories.push(product.category);
          }
        }
        setCategories(uniqueCategories);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  return { products, categories, loading, error };
}
