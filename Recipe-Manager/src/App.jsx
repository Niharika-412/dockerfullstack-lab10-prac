import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import config from './config'; // import default export

const API_BASE = config.url; // use config.url as API base

export default function App() {
  const [recipes, setRecipes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/api/recipes`);
      setRecipes(res.data || []);
      setError(null);
    } catch (e) {
      console.error('Fetch error:', e);
      setError('Backend not reachable. Check Tomcat/URL and CORS.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRecipes(); }, []);

  const createRecipe = async (r) => {
    try {
      await axios.post(`${API_BASE}/api/recipes`, r);
      fetchRecipes();
    } catch (e) {
      console.error('Create error:', e);
      setError('Create failed.');
    }
  };

  const updateRecipe = async (id, r) => {
    try {
      await axios.put(`${API_BASE}/api/recipes/${id}`, r);
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
      await axios.delete(`${API_BASE}/api/recipes/${id}`);
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
