import { useState } from 'react'
import { Container, Title, List } from './styles/styledComponents'

const App = () => {
  const [ todos, updateTodos ] = useState([])
  const [ currentText, updateText]  = useState("")
  const [ todoId, updateId ] = useState(0)

  const handleClickAdd = () => {
    const newTodo = {
      content: currentText, id: todoId, didIt: false
    }
    updateTodos([
      ...todos, newTodo
    ])
    updateId(todoId + 1)
    updateText("")
  }

  const handleClickUpdate = toggleId => {
    const result = todos.map(todo => {
      return todo.id !== toggleId ? todo : {...todo, didIt: !todo.didIt}
    })
    updateTodos(result)
  }
  
  const handleClickRemove = removeId => {
    const result = todos.filter(todo =>{
      return todo.id !== removeId
    })
    updateTodos(result)
  }
  
  const didItStyle = { color: "lightgray", textDecoration: "line-through", cursor:"pointer" }
  const notYetStyle = { color: "black", textDecoration: "none", cursor:"pointer" }

  return <Container>
    <Title><h1>TO DO LIST</h1></Title>
    <input type="text" placeholder="What To Do?"
    onChange={e => updateText(e.target.value)}
    value={currentText} />
    <button onClick={handleClickAdd}>ADD</button>
    <List>
      <ul>
        {todos.map((todo, idx) => {
          return <li key={idx}>
            <span style={todo.didIt ? didItStyle : notYetStyle}
            onClick={() => handleClickUpdate(todo.id)}>{todo.content}</span>
            <span style={{color:"red" ,cursor:"pointer"}} 
            onClick={() => handleClickRemove(todo.id)}>X</span>
          </li>
        })}
      </ul>
    </List>
  </Container>

}

export default App