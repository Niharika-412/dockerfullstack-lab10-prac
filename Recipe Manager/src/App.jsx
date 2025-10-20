import React, { useState, useEffect } from 'react'
import axios from 'axios'
import RecipeForm from './components/RecipeForm'
import RecipeList from './components/RecipeList'

const API = 'http://localhost:8085/api'

export default function App(){
  const [recipes, setRecipes] = useState([])
  const [editing, setEditing] = useState(null)

  const fetchRecipes = async () => {
    try {
      const res = await axios.get(`${API}/recipes`)
      setRecipes(res.data)
    } catch(e){ console.error(e) }
  }
  useEffect(()=>{ fetchRecipes() }, [])

  const createRecipe = async (r) => { await axios.post(`${API}/recipes`, r); fetchRecipes() }
  const updateRecipe = async (id, r) => { await axios.put(`${API}/recipes/${id}`, r); setEditing(null); fetchRecipes() }
  const deleteRecipe = async (id) => { await axios.delete(`${API}/recipes/${id}`); fetchRecipes() }

  return (
    <div style={{padding:20, fontFamily:'Arial'}}>
      <h1>Recipe Manager</h1>
      <RecipeForm onCreate={createRecipe} editing={editing} onUpdate={updateRecipe} onCancel={()=>setEditing(null)} />
      <hr />
      <RecipeList recipes={recipes} onEdit={setEditing} onDelete={deleteRecipe} />
    </div>
  )
}
