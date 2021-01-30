const React = require('react')
const ReactDOM = require('react-dom')
const { MemoryRouter } = require('react-router-dom')
const Home = require('./Home')
const TodoTable = require('./TodoTable')
const TodoModal = require('./TodoModal')
const {shallow} = require('enzyme')

describe('Home page component', () => {
    describe('lifecycle methods', () => {
        it('should render TodoTable and TodoModal', () => {
            const wrapper = shallow( <Home /> )
            expect(wrapper.find(TodoTable)).toHaveLength(1)
            expect(wrapper.find(TodoModal)).toHaveLength(1)
        })
    })
})
