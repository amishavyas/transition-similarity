import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import '@atlaskit/css-reset';

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-right: auto;
  margin-left:auto;
  margin-bottom:8px;
   
  background-color: ${props => (props.isDragging ? 'rgb(153,151,136,40%)' : 'white')};
  justify-content: center;
  align-items: center;
  display: flex;
  font-size:22px;
`;

export default class DraggableStim extends React.Component {

  getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    return {
      ...style,

      /* Cannot be 0, but make it super small. This makes the drop faster. 
      If user starts to drag another word while drop is incomplete,
      the program starts to glitch. Stimuli options change, disappear, and future trials may be affected.
      Reducing the transition duration prevents multiple drags from happening. */ 
      transitionDuration: `0.07s`,
    };
  }
  
  render() {
    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            style={this.getStyle(provided.draggableProps.style, snapshot)}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    );
  }
}
