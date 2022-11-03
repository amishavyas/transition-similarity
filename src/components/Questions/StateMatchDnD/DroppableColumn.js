import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import DraggableStim from './DraggableStim';

const Container = styled.div`
  text-align: center;
  display: flex;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
   
  flex-direction: column;
  font-size: 20px;
  font-color: black;
  min-width: 290px;
  min-height: 300px;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? 'rgb(201,193,182, 20%)' : 'white')};
  flex-grow: 1;
  min-height: 100px;
`;

export default class DroppableColumn extends React.Component {
  render() {
    return (
      <Container>
        <Title style={{color:"#165806"}}>{this.props.column.title}</Title>
        <Droppable droppableId={this.props.column.id}>
          {(provided, snapshot) => (
            <TaskList
              ref={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
            >
              {this.props.tasks.map((task, index) => (
                <DraggableStim key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </TaskList>
          )}
        </Droppable>
      </Container>
    );
  }
}
