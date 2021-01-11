import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap';
import TodoForm from './TodoForm';

class TodoModal extends Component {
    state = {
        modal: false
    }
    toggle = () => {
        this.setState(previous => ({
            modal: !previous.modal
        }));
    }
    render() {
        const isNew = this.props.isNew;
        let title = 'Edit Todo';
        let button = '';
        if (isNew) {
            title = 'Add Todo';
            button = <Button
                color="success"
                onClick={this.toggle}
                style={{ minWidth: "200px" }}>Add</Button>;
        } else {
            button = <Button
                color="warning"
                onClick={this.toggle}>Edit</Button>;
        }
        return <Fragment>
            {button}
            <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    <TodoForm
                        addTodoToState={this.props.addTodoToState}
                        updateTodoIntoState={this.props.updateTodoIntoState}
                        toggle={this.toggle}
                        todo={this.props.todo} />
                </ModalBody>
            </Modal>
        </Fragment>;
    }
}

export default TodoModal;
