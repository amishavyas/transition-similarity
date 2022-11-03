import React, { Component } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import DroppableColumn from "./DroppableColumn";
import { Box, Button, Typography, Grid } from "@material-ui/core";

const Column = styled.div`
    display: flex;
`;

class HumanStateMatching extends Component {
    state = {
        tasks: {
            "task-1": { id: "task-1", content: "Rage" },
            "task-2": { id: "task-2", content: "Panic" },
            "task-3": { id: "task-3", content: "Relaxed" },
            "task-4": { id: "task-4", content: "Content" },
        },
        columns: {
            response: {
                id: "response",
                title: "Response",
                taskIds: [],
            },
            states: {
                id: "states",
                title: "Options",
                taskIds: ["task-1", "task-2", "task-3", "task-4"],
            },
        },
        columnOrder: ["response", "states"],
    };

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        /* Moving from one list to another (Stim -> Response OR Response -> Stim) */
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };

        this.setState(newState);
    };

    validateResponses = () => {
        if (
            this.state.columns.response.taskIds.length !==
            Object.keys(this.props.colorSliderResponses).length
        ) {
            alert(
                "You have not matched all the alien mental states with the given options. Please match each alien mental state with one of the options."
            );
            return false;
        } else {
            return true;
        }
    };

    getLabelFromTaskId = (responsesWithId) => {
        const { tasks } = this.state;
        const responsesWithLabels = responsesWithId.map(
            (taskId) => tasks[taskId].content
        );
        return responsesWithLabels;
    };

    sendResponsesToParent = () => {
        const { colorSliderResponses } = this.props;
        const responses = this.getLabelFromTaskId(
            this.state.columns.response.taskIds
        );
        let responseArray = {};

        for (var i = 0; i < Object.entries(this.state.tasks).length; i++) {
            var currMentalState = Object.keys(colorSliderResponses)[i];
            var alienStateLabel = colorSliderResponses[currMentalState].label;
            responseArray[alienStateLabel] = responses[i];
        }
        this.props.updateParentState("humanStateMatching", responseArray);
    };

    continue = (e) => {
        e.preventDefault();
        if (this.validateResponses()) {
            this.sendResponsesToParent();
            this.props.nextStep();
        }
    };

    render() {
        const { colorSliderResponses } = this.props;
        return (
            <Grid container justifyContent="center">
                <Typography
                    style={{
                        fontWeight: "bold",
                        color: "rgb(33,37,40)",
                        paddingTop: "2.5%",
                        paddingBottom: "2.5%",
                        fontSize: "30px",
                    }}
                    align="center"
                >
                    Lastly, your expedition leaders are trying to figure out how
                    similar <br /> the alien mental states are to human mental
                    states.
                    <br />
                    <br />
                    For the final part of your report, your goal is to match
                    each of <br />
                    the alien mental states with one of the options. For each
                    alien mental <br /> state, drag and drop the option of your
                    choice into the Response box.
                    <br />
                    <br />
                    When you are done, click the NEXT button.
                </Typography>

                <Grid container justifyContent="center">
                    <Grid style={{ marginTop: "65px" }}>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                lineHeight: "2.3",
                                color: colorSliderResponses.mentalState1
                                    .colorCode,
                                position: "relative",
                            }}
                            component="h2"
                            variant="h5"
                        >
                            {" "}
                            {colorSliderResponses.mentalState1.label}{" "}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                lineHeight: "2.3",
                                color: colorSliderResponses.mentalState2
                                    .colorCode,
                            }}
                            component="h2"
                            variant="h5"
                        >
                            {" "}
                            {colorSliderResponses.mentalState2.label}{" "}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                lineHeight: "2.4",
                                color: colorSliderResponses.mentalState3
                                    .colorCode,
                            }}
                            component="h2"
                            variant="h5"
                        >
                            {" "}
                            {colorSliderResponses.mentalState3.label}{" "}
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                lineHeight: "2.3",
                                color: colorSliderResponses.mentalState4
                                    .colorCode,
                            }}
                            component="h2"
                            variant="h5"
                        >
                            {" "}
                            {colorSliderResponses.mentalState4.label}{" "}
                        </Typography>
                    </Grid>

                    <DragDropContext onDragEnd={this.onDragEnd}>
                        <Column>
                            {this.state.columnOrder.map((columnId) => {
                                const column = this.state.columns[columnId];
                                const tasks = column.taskIds.map(
                                    (taskId) => this.state.tasks[taskId]
                                );

                                return (
                                    <DroppableColumn
                                        key={column.id}
                                        column={column}
                                        tasks={tasks}
                                    />
                                );
                            })}
                        </Column>
                    </DragDropContext>
                </Grid>

                <Box
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: "3%",
                        paddingBottom: "3%",
                    }}
                >
                    <Button
                        onClick={this.continue}
                        type="submit"
                        variant="contained"
                        style={{
                            fontSize: "15px",
                            marginTop: "30px",
                            marginBottom: "10%",
                            backgroundColor: "#e4d09e",
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Grid>
        );
    }
}

export default HumanStateMatching;
