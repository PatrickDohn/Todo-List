import React, { Component } from 'react';
import { Col, Container, Row } from 'reactstrap';
import TodoModal from './TodoModal';
import TodoTable from './TodoTable';

const TODOS_API_URL = 'https://localhost:5001/api/todo';

export class Home extends Component {
  state = {
    items: []
  }
  componentDidMount() {
    this.getItens();
  }
  getItens = () => {
    fetch(TODOS_API_URL)
      .then(res => res.json())
      .then(res => this.setState({ items: res }))
      .catch(err => console.log(err));
  }
  addTodoToState = todo => {
    this.setState(previous => ({
      items: [...previous.items, todo]
    }));
  }
  updateState = (id) => {
    this.getItens();
  }
  deleteTodoFromState = id => {
    const updated = this.state.items.filter(item => item.id !== id);
    this.setState({ items: updated })
  }
  render() {
    return <Container style={{ paddingTop: "100px" }}>
      <Row>
        <Col>
          <TodoTable
            items={this.state.items}
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
