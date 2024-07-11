import './App.css';
import {Container, Row, Col} from 'react-bootstrap';
import UserFilter from './components/UsersFilter';
import CompletedFilter from './components/CompletedFilter';
import TodoList from './components/TodoList';

function App() {
  return (
    <Container>
      <Row>
        <Col md={9}><TodoList/></Col>
        <Col md={3}>
          <Row><UserFilter/></Row>
          <Row><CompletedFilter/></Row>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
