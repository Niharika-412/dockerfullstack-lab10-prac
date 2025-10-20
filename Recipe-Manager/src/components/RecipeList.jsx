import React from 'react'

export default function RecipeList({ recipes, onEdit, onDelete }){
  return (
    <div>
      {recipes.length === 0 ? <p>No recipes yet</p> : (
        <table>
          <thead>
            <tr><th>ID</th><th>Title</th><th>Ingredients</th><th>Instructions</th><th>Servings</th><th>Cook Time</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {recipes.map(r => (
              <tr key={r.id}>
                <td style={{width:48}}>{r.id}</td>
                <td>{r.title}</td>
                <td style={{whiteSpace:'pre-wrap'}}>{r.ingredients}</td>
                <td style={{whiteSpace:'pre-wrap'}}>{r.instructions}</td>
                <td style={{width:80}}>{r.servings}</td>
                <td style={{width:110}}>{r.cookTimeMinutes} min</td>
                <td style={{width:150}}>
                  <button onClick={()=>onEdit(r)}>Edit</button>
                  <button onClick={()=>{ if(window.confirm('Delete recipe?')) onDelete(r.id) }} style={{marginLeft:6}}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
