import React, { Component } from 'react';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const TODOS_API_URL = 'https://localhost:5001/api/todo';

class TodoForm extends Component {
    state = {
        id: 0,
        name: ''
    }
    componentDidMount() {
        if (this.props.todo) {
            const { id, name } = this.props.todo
            this.setState({ id, name });
        }
    }
    onChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }
    submitNew = e => {
        console.log('this is event', e)
        e.preventDefault();
        fetch(`${TODOS_API_URL}`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(res => res.json())
            .then(todo => {
                this.props.addTodoToState(todo);
                this.props.toggle();
            })
            .catch(err => console.log(err));
    }
    submitEdit = e => {
        e.preventDefault();
        fetch(`${TODOS_API_URL}/${this.state.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name
            })
        })
            .then(() => {
                this.props.toggle();
                this.props.updateTodoIntoState(this.state.id);
            })
            .catch(err => console.log(err));
    }
    render() {
        return <Form onSubmit={this.props.todo ? this.submitEdit : this.submitNew}>
            <FormGroup>
                <Label for="name">Item:</Label>
                <Input type="text" name="name" onChange={this.onChange} value={this.state.name === '' ? '' : this.state.name} />
            </FormGroup>
            <Button>Send</Button>
        </Form>;
    }
}

export default TodoForm;
