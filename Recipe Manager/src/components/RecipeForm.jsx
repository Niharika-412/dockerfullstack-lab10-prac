import React, { useEffect, useState } from 'react'

export default function RecipeForm({ onCreate, editing, onUpdate, onCancel }){
  const [form, setForm] = useState({
    title:'', ingredients:'', instructions:'', servings:1, cookTimeMinutes:0
  })

  useEffect(()=> {
    if(editing) setForm(editing)
    else setForm({ title:'', ingredients:'', instructions:'', servings:1, cookTimeMinutes:0 })
  }, [editing])

  function change(e){
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'servings' || name === 'cookTimeMinutes' ? parseInt(value || 0, 10) : value }))
  }

  function submit(e){
    e.preventDefault()
    if(editing) onUpdate(editing.id, form)
    else onCreate(form)
    setForm({ title:'', ingredients:'', instructions:'', servings:1, cookTimeMinutes:0 })
  }

  return (
    <form onSubmit={submit} style={{ display:'flex', flexDirection:'column', gap:8, maxWidth:720 }}>
      <input name="title" placeholder="Title" value={form.title} onChange={change} required />
      <textarea name="ingredients" placeholder="Ingredients (comma or newline separated)" value={form.ingredients} onChange={change} />
      <textarea name="instructions" placeholder="Instructions" value={form.instructions} onChange={change} />
      <div>
        <input name="servings" type="number" min="1" value={form.servings} onChange={change} style={{width:120}} />
        <input name="cookTimeMinutes" type="number" min="0" value={form.cookTimeMinutes} onChange={change} style={{width:160, marginLeft:8}} />
      </div>
      <div>
        <button type="submit">{editing ? 'Update Recipe' : 'Create Recipe'}</button>
        {editing && <button type="button" onClick={onCancel} style={{marginLeft:8}}>Cancel</button>}
      </div>
    </form>
  )
}
