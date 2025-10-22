import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';

// Vite env var (must be prefixed with VITE_). Default to empty string if not set.
const API_BASE = import.meta.env.VITE_API_URL || '';

// small helper to avoid double slashes
const recipesEndpoint = (suffix = '') => {
  const base = API_BASE.replace(/\/+$/, ''); // remove trailing slash(es)
  const path = '/api/recipes';
  // suffix may include leading slash
  return `${base}${path}${suffix}`;
};

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(recipesEndpoint());
      setRecipes(res.data || []);
      setError(null);
    } catch (e) {
      console.error('Fetch error:', e);
      setError('Backend not reachable. Check Tomcat/URL and CORS.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  const createRecipe = async (r) => {
    try {
      await axios.post(recipesEndpoint(), r);
      fetchRecipes();
    } catch (e) {
      console.error('Create error:', e);
      setError('Create failed.');
    }
  };

  const updateRecipe = async (id, r) => {
    try {
      await axios.put(recipesEndpoint(`/${id}`), r);
      setEditing(null);
      fetchRecipes();
    } catch (e) {
      console.error('Update error:', e);
      setError('Update failed.');
    }
  };

  const deleteRecipe = async (id) => {
    if (!window.confirm('Delete this recipe?')) return;
    try {
      await axios.delete(recipesEndpoint(`/${id}`));
      fetchRecipes();
    } catch (e) {
      console.error('Delete error:', e);
      setError('Delete failed.');
    }
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif', maxWidth: 900, margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center' }}>Recipe Manager</h1>
      {error && <div style={{ color: 'crimson', marginBottom: 10 }}>{error}</div>}
      <RecipeForm
        onCreate={createRecipe}
        editing={editing}
        onUpdate={updateRecipe}
        onCancel={() => setEditing(null)}
      />
      <hr />
      {loading ? <div>Loading recipes…</div> :
        <RecipeList recipes={recipes} onEdit={setEditing} onDelete={deleteRecipe} />
      }
    </div>
  );
}
