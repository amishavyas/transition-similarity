import React, { Component } from "react";
import { Box, Button, Grid } from "@material-ui/core";
import NextStateQuestion from "./NextStateQuestion";
import LearningTrial from "./LearningTrial";
import { StyledLinearProgress } from "../../StyledElements";
import KeypressInstructions from "./KeypressInstructions";

// Change instructions and show keypress instructions after trial 1

class Trials extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentStim: "",
            trial: 0,
            buttonDisabled: true,
            day: 0,
            learningTrialResponses: {},
            // nextStateResponses directly sent to Experiment -- [...{question: , response: , RT: }]
        };
    }

    componentDidMount() {
        this.setCurrentStim();
    }

    componentWillUnmount() {
        this.props.updateParentState("learningTrialResponses", this.state.learningTrialResponses); 
    }

    setCurrentStim = () => {
        const { trial } = this.state;
        this.setState({
            currentStim: this.props.stimOrder[trial],
        });
    };

    nextTrial = () => {
        const { trial } = this.state;
        if (trial === this.props.stimOrder.length - 1) {
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
        const {
            buttonDisabled,
            currentStim,
            day,
            learningTrialResponses,
            trial,
        } = this.state;
        const { stimOrder } = this.props;
        let content;

        if (typeof currentStim === "boolean") {
            content = (
                <NextStateQuestion
                    updateParentState={this.props.updateParentState}
                    updateTrialsState={this.updateTrialsState}
                    nextStateResponses={this.props.nextStateResponses}
                />
            );
        } else {
            if (currentStim.includes("instructions")) {
                content = (
                    <KeypressInstructions
                        updateTrialsState={this.updateTrialsState}
                    />
                );
            } else {
                content = (
                    <LearningTrial
                        updateTrialsState={this.updateTrialsState}
                        day={day}
                        currentStim={currentStim}
                        learningTrialResponses={learningTrialResponses}
                        buttonDisabled={buttonDisabled}
                    />
                );
            }
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
                            opacity:
                                (buttonDisabled && "50%") ||
                                (!buttonDisabled && "100%"),
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
