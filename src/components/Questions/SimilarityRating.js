import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import {
    CustomSlider,
    StyledButton,
    StyledValueLabel,
} from "../../StyledElements";

class SimilarityRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentalStates: [
                "mentalState1",
                "mentalState2",
                "mentalState3",
                "mentalState4",
            ],
            combos: [],
            trial: 0,
            currCombo: ["mentalState1", "mentalState2"],
            currSliderValue: 0,
            sliderMoved: false,
            ratings: [], // { [1,2]: 50, [2,1]: 20...}
        };
    }

    combinations = (inputArr) => {
        var result = inputArr.flatMap((v, i) =>
            inputArr.slice(i + 1).map((w) => [v, w])
        );
        return result;
    };

    permutator = (inputArr) => {
        let result = [];

        const permute = (arr, m = []) => {
            if (arr.length === 0) {
                result.push(m);
            } else {
                for (let i = 0; i < arr.length; i++) {
                    let curr = arr.slice();
                    let next = curr.splice(i, 1);
                    permute(curr.slice(), m.concat(next));
                }
            }
        };
        permute(inputArr);
        return result;
    };

    continue = (e) => {
        e.preventDefault();
        this.recordSliderValue();

        if (this.state.trial === this.state.combos.length - 1) {
            this.props.updatePostTrialQState(
                "similarityRatings",
                this.recordSliderValue()
            );
            this.props.nextQuestion();
        } else {
            this.nextTrial();
        }
    };

    resetSlider = () => {
        this.setState({ currSliderValue: 0, sliderMoved: false });
    };

    recordSliderValue = () => {
        const { currCombo, currSliderValue, trial, trialStart } = this.state;
        const { colorSliderResponses } = this.props;
        const newRatings = {
            ...this.state.ratings,
            [trial]: {
                combos: currCombo,
                labels: [
                    colorSliderResponses[currCombo[0]].label,
                    colorSliderResponses[currCombo[1]].label,
                ],
                rating: currSliderValue,
                RT: Date.now() - trialStart,
            },
        };
        this.setState({ ratings: newRatings }, () => this.resetSlider());
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

    nextTrial = () => {
        const { trial } = this.state;
        if (this.validateSlider()) {
            this.setState({ trial: trial + 1 }, () => this.setTrial());
        }
    };

    setTrial = () => {
        this.setState({
            trialStart: Date.now(),
            currCombo: this.state.combos[this.state.trial],
        });
    };

    setCombinations = () => {
        const combinations = this.combinations(this.state.mentalStates);
        const combos = [];
        for (const combination of combinations) {
            const permutation = this.permutator(combination);
            combos.push(permutation);
        }
        const comboArray = combos.flatMap((num) => num);
        comboArray.sort(() => Math.random() - 0.5);
        this.setState({ combos: comboArray }, () => {
            this.setTrial();
        });
    };

    componentDidMount() {
        this.setCombinations();
        this.setState({ trialStart: Date.now() });
    }

    render() {
        const { currCombo, currSliderValue } = this.state;
        const { colorSliderResponses } = this.props;

        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item md={9}>
                        <Typography
                            style={{ fontSize: "33px", color: "rgb(33,37,40)" }}
                            align="center"
                        >
                            <br /> In this part of the report, your goal is to
                            share how similar you think the alien mental states
                            are to each other.
                        </Typography>

                        <Typography
                            style={{
                                fontWeight: "bold",
                                color: "rgb(33,37,40)",
                                paddingTop: "3%",
                                paddingBottom: "3%",
                                lineHeight: "1.5",
                            }}
                            align="center"
                            component="h2"
                            variant="h4"
                        >
                            Using the slider below, please indicate how similar
                            you think{" "}
                            <Typography
                                display="inline"
                                style={{
                                    fontWeight: "bold",
                                    color: colorSliderResponses[currCombo[0]]
                                        .colorCode,
                                }}
                                component="h2"
                                variant="h4"
                            >
                                {colorSliderResponses[currCombo[0]].label}{" "}
                            </Typography>
                            is to{" "}
                            <Typography
                                display="inline"
                                style={{
                                    fontWeight: "bold",
                                    color: colorSliderResponses[currCombo[1]]
                                        .colorCode,
                                }}
                                component="h2"
                                variant="h4"
                            >
                                {colorSliderResponses[currCombo[1]].label}
                            </Typography>
                            .<br />
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
                            that you feel best reflects the similarity between
                            the two mental states. To continue to the next
                            question, you will have to move your slider from its
                            default position.
                            <br />
                            <br />
                        </Typography>
                    </Grid>

                    <Grid item md={8}>
                        <CustomSlider
                            value={currSliderValue}
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
                                    Very different
                                </span>
                                <span style={{ float: "right" }}>
                                    Very similar
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

export default SimilarityRating;
