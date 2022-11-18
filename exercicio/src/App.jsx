import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import './styles.css'

const TarefaList = styled.ul`
  padding: 0;
  width: 200px;
`

const Tarefa = styled.li`
  text-align: left;
  text-decoration: ${({ completa }) => (completa ? 'line-through' : 'none')};
`

const InputsContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 10px;
`

function App() {
  const [tarefas, setTarefa] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [filtro, setFiltro] = useState("")

  const onChangeInput = (event) => {
    setInputValue(event.target.value)
  }

  const criaTarefa = () => {
    const novaTarefa = {
      id: Date.now(), 
      texto: inputValue,
      completa: false 
    }
    
    // setTarefa([novaTarefa, ...tarefas])

    const copiaDoEstado = [...tarefas]
    copiaDoEstado.push(novaTarefa)
    setTarefa(copiaDoEstado)
    setInputValue("")
  }
  
  const selectTarefa = (id) => {
    const copiaTarefas = [...tarefas]

    //Com FILTER --> retorna um array com o elemento
    // const tarefa = copiaTarefas.filter((tarefa) => tarefa.id === id)
    // tarefa[0].completa = !tarefa[0].completa

    //Com FIND --> retorna o elemento do array
    const tarefaEncontrada = copiaTarefas.find((tarefa) => tarefa.id === id)
    tarefaEncontrada.completa = !tarefaEncontrada.completa
    setTarefa(copiaTarefas)
  }

  const onChangeFilter = (event) => {
    setFiltro(event.target.value)
  }


  const listaFiltrada = tarefas.filter(tarefa => {
    switch (filtro) {
      case 'pendentes':
        return !tarefa.completa
      case 'completas':
        return tarefa.completa
      default:
        return true
    }
  });

  useEffect(() => {
    let stringificado = JSON.stringify(tarefas);
    if(tarefas.length > 0) {
      localStorage.setItem("tarefas", stringificado);
    }
  }, [tarefas]);

  useEffect(() => {
    let paseado = JSON.parse(localStorage.getItem("tarefas"));
    // console.log("paseado", paseado);
    if(paseado !== null || paseado !== undefined){
      setTarefa(paseado);
    }
  }, []);

  // http://127.0.0.1:3000/

  return (
    <div className="App">
      <h1>Lista de tarefas</h1>
      <InputsContainer>
        <input value={inputValue} onChange={onChangeInput} />
        <button onClick={criaTarefa}>Adicionar</button>
      </InputsContainer>
      <br />

      <InputsContainer>
        <label>Filtro</label>
        <select value={filtro} onChange={onChangeFilter}>
          <option value="">Nenhum</option>
          <option value="pendentes">Pendentes</option>
          <option value="completas">Completas</option>
        </select>
      </InputsContainer>
      <TarefaList>
        {listaFiltrada
        .map(tarefa => {
          return (
            <Tarefa
              key={tarefa.id}
              completa={tarefa.completa}
              onClick={() => selectTarefa(tarefa.id)}
            >
              {tarefa.texto}
            </Tarefa>
          )
        })}
      </TarefaList>
    </div>
  )
}


export default App
