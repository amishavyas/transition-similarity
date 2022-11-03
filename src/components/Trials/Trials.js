import React, { Component } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import NextStateQuestion from "./NextStateQuestion";
import LearningTrial from "./LearningTrial";
import { StyledLinearProgress } from "../../StyledElements";
import { selectedStim } from './selectedStim';

class Trials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stimOrder: selectedStim(10),  
            currentStim: "",
            trial: 0,
            buttonDisabled: true,
            day: 0,
            // nextStateResponses directly sent to Experiment -- [...{question: , response: , RT: }]
        };
    }

    componentDidMount() {
        this.setCurrentStim();
    }

    componentWillUnmount() {
        this.props.updateParentState("stimOrder", this.state.stimOrder);
    }

    setCurrentStim = () => {
        const { stimOrder, trial } = this.state;
        this.setState({
            currentStim: stimOrder[trial],
        });
    };

    nextTrial = () => {
        const { trial, stimOrder } = this.state;
        if (trial === stimOrder.length - 1) {
            this.props.nextStep();
        } else {
            this.setState({ buttonDisabled: true });
            this.setState({ trial: trial + 1 }, () => this.setCurrentStim());
        }
    };

    updateTrialsState = (stateToUpdate, newState) => {
        this.setState({
            [stateToUpdate]: newState,
        });
    };

    render() {
        const { currentStim, day, buttonDisabled, trial, stimOrder } = this.state;
        let content;

        if (typeof currentStim !== "boolean") {
            content = (
                <LearningTrial
                    updateTrialsState={this.updateTrialsState}
                    day={day}
                    currentStim={currentStim}
                    buttonDisabled={buttonDisabled}
                />
            );
        } else {
            content = (
                <NextStateQuestion
                    updateParentState={this.props.updateParentState}
                    updateTrialsState={this.updateTrialsState}
                    nextStateResponses={this.props.nextStateResponses}
                />
            );
        }

        return (
            <div>
                <StyledLinearProgress
                    variant="determinate"
                    style={{ height: 10 }}
                    value={(trial / stimOrder.length) * 100}
                />

                <Grid
                    item
                    md={12}
                    style={{ justifyContent: "center", padding: "30px 0" }}
                >
                    {content}
                </Grid>

                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                        onClick={this.nextTrial}
                        variant="contained"
                        disabled={buttonDisabled}
                        style={{
                            fontSize: "15px",
                            marginTop: "3%",
                            marginBottom: "10%",
                            backgroundColor: "#e4d09e",
                            opacity: (buttonDisabled && "50%") || (!buttonDisabled && "100%"),
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </div>
        );
    }
}

export default Trials;
