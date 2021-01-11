import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import TodoModal from './TodoModal';

const TODOS_API_URL = 'https://localhost:5001/api/todo';

class TodoTable extends Component {
  deleteTodo = id => {
    if (this.deleteTodo) {
      fetch(`${TODOS_API_URL}/${id}`, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          this.props.deleteTodoFromState(id);
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const todos = this.props.todos;
    return <Table striped>
       <thead className="thead-dark">
        <tr>
          <th>Items</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!todos || todos.length <= 0 ?
          <tr>
            <td colSpan="6" align="center"><b>No Todos yet</b></td>
          </tr>
          : todos.map(item => (
            <tr key={item.id}>
              <td>
                {item.name}
              </td>
              <td align="center">
                <div>
                  <TodoModal
                    isNew={false}
                    user={item}
                    updateTodoIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="primary" onClick={() => this.deleteTodo(item.id)}>Delete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default TodoTable;
