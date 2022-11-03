import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import { CustomSlider, StyledButton, StyledValueLabel } from "../../StyledElements";

class ValenceRating extends Component {
    state = {
        mentalStates: [
            "mentalState1",
            "mentalState2",
            "mentalState3",
            "mentalState4",
        ],
        trial: 0,
        currState: "mentalState1",
        sliderMoved: false,
        currSliderValue: 0,
        ratings: {},
    };

    nextTrial = () => {
        const { trial } = this.state;
        this.recordSliderValue();

        /* If the participant has not touched the slider, they will not be able to continue to the next trial */
        if (this.validateSlider()) {
            this.setState({ trial: trial + 1 }, () =>
                this.setMentalStateLabel()
            );
            this.resetSlider();
        }
    };

    setMentalStateLabel = () => {
        const { trial, mentalStates } = this.state;
        this.setState({ currState: mentalStates[trial] });
    };

    resetSlider = () => {
        this.setState({ currSliderValue: 0, sliderMoved: false });
    };

    recordSliderValue = () => {
        const { currState, currSliderValue, trial } = this.state;
        const { colorSliderResponses } = this.props;

        const newRatings = {
            ...this.state.ratings,
            [trial]: {
                label: colorSliderResponses[currState].label,
                state: currState,
                rating: currSliderValue,
            },
        };
        this.setState({ ratings: newRatings });
        return newRatings;
    };

    validateSlider = () => {
        if (!this.state.sliderMoved) {
            alert(
                "You have not moved the slider for this question. \n \nYou must move each slider from its default position to continue, even if your response is 50."
            );
            return false;
        } else {
            return true;
        }
    };

    componentDidMount() {
        this.setMentalStateLabel();
    }

    continue = (e) => {
        e.preventDefault();
        if (this.state.trial === this.state.mentalStates.length - 1) {
            this.props.updatePostTrialQState(
                "valenceRatings",
                this.recordSliderValue()
            );
            this.props.nextQuestion();
        } else {
            this.nextTrial();
        }
    };

    render() {
        const { colorSliderResponses } = this.props;
        const { currState } = this.state; 

        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item md={9}>
                        <Typography
                            style={{ fontSize: "33px", color: "rgb(33,37,40)" }}
                            align="center"
                        >
                            <br /> In this part of the report, your goal is to
                            share how positive or negative you think the alien
                            mental states are.
                        </Typography>
                        <Typography
                            style={{
                                fontWeight: "bold",
                                color: "rgb(33,37,40)",
                                paddingTop: "3%",
                                paddingBottom: "3%",
                                lineHeight: "1.5",
                            }}
                            component="h2"
                            variant="h4"
                            align="center"
                        >
                            Using the slider below, please indicate how positive
                            or negative you think{" "}
                            <Typography
                                display="inline"
                                style={{
                                    fontWeight: "bold",
                                    color: colorSliderResponses[currState].colorCode,
                                }}
                                component="h2"
                                variant="h4"
                            >
                                {colorSliderResponses[currState].label}{" "}
                            </Typography> 
                            is.
                        </Typography>
                        <Typography
                            style={{
                                fontSize: "30px",
                                fontWeight: "regular",
                                color: "rgb(33,37,40)",
                            }}
                            align="center"
                        >
                            You can move the slider anywhere along the scale
                            that you feel best reflects how positive or negative
                            the mental state is. To continue to the next
                            question, you will have to move your slider from its
                            default position.
                            <br />
                            <br />
                        </Typography>
                    </Grid>

                    <Grid item md={8}>
                        <CustomSlider
                            value={this.state.currSliderValue}
                            valueLabelDisplay="auto"
                            ValueLabelComponent={StyledValueLabel}
                            onChange={(_, value) =>
                                this.setState({
                                    currSliderValue: value,
                                    sliderMoved: true,
                                })
                            }
                            min={-50}
                            max={50}
                        />
                        <Typography
                            style={{
                                color: "rgb(33,37,40)",
                                textAlign: "left",
                                fontSize: "30px",
                                paddingTop: "1%",
                            }}
                            component="h4"
                            variant="h5"
                        >
                            <strong>
                                <span style={{ float: "left" }}>
                                    Very negative
                                </span>
                                <span style={{ float: "right" }}>
                                    Very positive
                                </span>
                            </strong>
                        </Typography>
                    </Grid>
                </Grid>
                <StyledButton nextPage={this.continue} text="Next" />
            </div>
        );
    }
}

export default ValenceRating;
