import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import TodoModal from './TodoModal';
import TodoTable from './TodoTable';

const TODOS_API_URL = 'https://localhost:5001/api/todo';

export class Home extends Component {
  state = {
    todos: []
  }
  componentDidMount() {
    this.getItens();
  }
  getItens = () => {
    fetch(TODOS_API_URL)
      .then(res => res.json())
      .then(res => this.setState({ todos: res }))
      .catch(err => console.log(err));
  }
  addTodoToState = todo => {
    this.setState(previous => ({
      todos: [...previous.todos, todo]
    }));
  }
  updateState = (id) => {
    this.getItens();
  }
  deleteTodoFromState = id => {
    const updated = this.state.todos.filter(todo => todo.id !== id);
    this.setState({ todos: updated })
  }
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <h3>Todo:</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoTable
            todos={this.state.todos}
            updateState={this.updateState}
            deleteTodoFromState={this.deleteTodoFromState} />
        </Col>
      </Row>
      <Row>
        <Col>
          <TodoModal isNew={true} addTodoToState={this.addTodoToState} />
        </Col>
      </Row>
    </Container>;
  }
}
