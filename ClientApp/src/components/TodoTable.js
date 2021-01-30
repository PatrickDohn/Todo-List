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
          console.log('this is res', this.props.items)
        })
        .catch(err => console.log(err));
    }
  }
  render() {
    const items = this.props.items;
    console.log(items)
    return <Table striped>
       <thead className="thead-dark">
        <tr>
          <th>Items</th>
          <th style={{ textAlign: "center" }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {!items || items.length <= 0 ?
          <tr>
            <td colSpan="6" align="center"><b>No Todos yet</b></td>
          </tr>
          : items.map(item => (
            <tr key={item.id}>
              <td>
                {item.name}
              </td>
              <td align="center">
                <div>
                  <TodoModal
                    isNew={false}
                    todo={item}
                    updateTodoIntoState={this.props.updateState} />
                  &nbsp;&nbsp;&nbsp;
                  <Button color="primary" onClick={() => this.deleteTodo(item.id)}>Complete</Button>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </Table>;
  }
}
export default TodoTable;
