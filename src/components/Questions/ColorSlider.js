import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { CustomSlider, StyledButton, StyledTextField, StyledValueLabel } from "../../StyledElements";

const GreenSlider = withStyles({
    root: {
        color: "#009E73",
    },
})(CustomSlider);

const OrangeSlider = withStyles({
    root: {
        color: "#D55E00",
    },
})(CustomSlider);

const PurpleSlider = withStyles({
    root: {
        color: "#CC79A7",
    },
})(CustomSlider);

const BlueSlider = withStyles({
    root: {
        color: "#56B4E9",
    },
})(CustomSlider);

class ColorSlider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mentalState1: {
                label: "",
                fontColor: "",
                blue: [50, false],
                green: [50, false],
                orange: [50, false],
                purple: [50, false],
            },
            mentalState2: {
                label: "",
                fontColor: "",
                blue: [50, false],
                green: [50, false],
                orange: [50, false],
                purple: [50, false],
            },
            mentalState3: {
                label: "",
                fontColor: "",
                blue: [50, false],
                green: [50, false],
                orange: [50, false],
                purple: [50, false],
            },
            mentalState4: {
                label: "",
                fontColor: "",
                blue: [50, false],
                green: [50, false],
                orange: [50, false],
                purple: [50, false],
            },
        };
    }

    recordSliderValue = (mentalState, color, value) => {
        const newState = { ...this.state[mentalState], [color]: [value, true] };
        this.setState({ [mentalState]: newState }, () =>
            this.setHighestSliderColor()
        );
    };

    updateMentalStateLabel = (mentalState, labelValue) => {
        const newState = { ...this.state[mentalState], label: labelValue };
        this.setState({ [mentalState]: newState });
    };

    sendDataToParent = () => {
        for (const mentalState of Object.entries(this.state)) {
            this.props.updatePostTrialQState(mentalState[0], mentalState[1]);
        }
    };

    setHighestSliderColor = () => {
        /* Highest Slider Value out of the 4 color sliders will be the font color for the labels in the upcoming questions */
        for (const mentalState of Object.entries(this.state)) {
            const values = Object.values(mentalState[1]);
            const sliderValues = [
                values[2][0],
                values[3][0],
                values[4][0],
                values[5][0],
            ];
            const colorCodes = ["#56B4E9", "#009E73", "#D55E00", "#CC79A7"];
            const keys = Array.from(Object.keys(mentalState[1])); //[blue, green, orange, purple]

            keys.splice(0, 2); // removing label and fontColor from keys

            const highestValue = Math.max(...sliderValues);
            const index = sliderValues.indexOf(highestValue);

            const newState = {
                ...this.state[mentalState[0]],
                fontColor: keys[index],
                colorCode: colorCodes[index],
            };
            this.setState({ [mentalState[0]]: newState });
        }
    };

    validateLabels = () => {
        const labelArray = [
            this.state.mentalState1.label,
            this.state.mentalState2.label,
            this.state.mentalState3.label,
            this.state.mentalState4.label,
        ];
        let findDuplicates = (arr) =>
            arr.filter((item, index) => arr.indexOf(item) !== index);
        let findEmptyLabels = (arr) =>
            arr.filter((label) => label === "" || label === " ");

        if (findEmptyLabels(labelArray).length !== 0) {
            alert(
                "You have not entered a name for each state. \n \nPlease check your responses and enter a unique name for each state."
            );
            return false;
        }

        if (findDuplicates(labelArray).length !== 0) {
            alert(
                "You have entered duplicate names. Please enter a unique name for each state."
            );
            return false;
        } else {
            return true;
        }
    };

    validateSliders = () => {
        /* For each mental state label's color sliders (blue: [50, false]), if the second element is false, this means the slider has not been moved from its default position.
           Participants cannot continue if they have not interacted with all the sliders. */
        for (const mentalState of Object.entries(this.state)) {
            for (const slider of Object.entries(mentalState[1])) {
                if (slider[0] === "label" || "fontColor") {
                    continue;
                } else {
                    var change = slider[1][1];
                    if (!change) {
                        alert(
                            "You have not moved the " +
                                slider[0].toUpperCase() +
                                " SLIDER for MENTAL STATE " +
                                mentalState[0].slice(-1) +
                                " (" +
                                mentalState[1].label +
                                "). \n \n You must move each slider from its default position to continue, even if your response is 50."
                        );
                        return false;
                    }
                }
            }
        }
        return true;
    };

    continue = (e) => {
        e.preventDefault();
        /* 
            Before continuing to the next question, we check for empty or duplicate state labels.
            Then, we check if each slider was touched. If not, we send them alerts to fix the specific label / slider. 
        */
        if (this.validateLabels()) {
            if (this.validateSliders()) {
                this.sendDataToParent();
                this.props.nextQuestion();
            }
        }
    };

    render() {
        const { mentalState1, mentalState2, mentalState3, mentalState4 } = this.state; 
        return (
            <div>
                <Grid container justifyContent="center">
                    <Grid item md={8}>
                        <Typography
                            style={{
                                fontWeight: "regular",
                                color: "rgb(33,37,40)",
                                paddingTop: "2.5%",
                                paddingBottom: "2.5%",
                            }}
                            component="h2"
                            variant="h5"
                            align="center"
                        >
                            <br />
                            After discussing and sharing your observations with
                            your fellow alien psychologists, you come to the
                            consensus that the aliens most likely experience
                            four (4) different mental states.
                            <br />
                            <br />
                            <strong>
                                Your next goal for the report is to give them
                                names and describe which eye color(s) tend to
                                occur with each of them.
                            </strong>
                            <br /> <br />
                            <strong>
                                Using the text boxes below, choose names for
                                each of the alien's four states.
                            </strong>
                            <br />
                            You can name these states anything you like, and
                            enter these names in whatever order you like. Each
                            state must have a unique name.
                            <br />
                            <br />
                            <strong>
                                Each time you enter a name, adjust the
                                corresponding set of four color bars next to
                                that text box. Use the sliders to indicate how
                                much you associate each eye color with that
                                state.
                            </strong>
                            <br />
                            <br />
                            You must move the sliders from their default
                            position to continue.
                            <br /> <br />
                            We will refer to the names and colors you enter
                            later on in the experiment, so it may be a good idea
                            to select names you can remember easily.
                        </Typography>
                    </Grid>

                    <Grid
                        container
                        justifyContent="center"
                        style={{ marginTop: "2%" }}
                    >
                        <Grid>
                            <StyledTextField
                                id="mentalState1"
                                label="Mental State 1"
                                variant="standard"
                                onChange={(e) =>
                                    this.updateMentalStateLabel(
                                        "mentalState1",
                                        e.target.value
                                    )
                                }
                                style={{ marginTop: "12%" }}
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 19 } }}
                            />
                        </Grid>

                        <Grid item xs={3} style={{ marginLeft: "2%" }}>
                            <BlueSlider
                                value={mentalState1.blue[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState1",
                                        "blue",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <GreenSlider
                                value={mentalState1.green[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState1",
                                        "green",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <OrangeSlider
                                value={mentalState1.orange[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState1",
                                        "orange",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <PurpleSlider
                                value={mentalState1.purple[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState1",
                                        "purple",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <Typography
                                style={{
                                    color: "rgb(33,37,40)",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    marginTop: "5px",
                                }}
                            >
                                <span style={{ float: "left" }}>Very rare</span>
                                <span style={{ float: "right" }}>
                                    Very frequent
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justifyContent="center"
                        style={{ paddingTop: "3%" }}
                    >
                        <Grid>
                            <StyledTextField
                                id="mentalState2"
                                label="Mental State 2"
                                variant="standard"
                                style={{ marginTop: "12%" }}
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 19 } }}
                                onChange={(e) =>
                                    this.updateMentalStateLabel(
                                        "mentalState2",
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>

                        <Grid item xs={3} style={{ marginLeft: "2%" }}>
                            <BlueSlider
                                value={mentalState2.blue[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState2",
                                        "blue",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <GreenSlider
                                value={mentalState2.green[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState2",
                                        "green",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <OrangeSlider
                                value={mentalState2.orange[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState2",
                                        "orange",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <PurpleSlider
                                value={mentalState2.purple[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState2",
                                        "purple",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <Typography
                                style={{
                                    color: "rgb(33,37,40)",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    marginTop: "5px",
                                }}
                            >
                                <span style={{ float: "left" }}>Very rare</span>
                                <span style={{ float: "right" }}>
                                    Very frequent
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justifyContent="center"
                        style={{ paddingTop: "3%" }}
                    >
                        <Grid>
                            <StyledTextField
                                id="mentalState3"
                                label="Mental State 3"
                                variant="standard"
                                style={{ marginTop: "12%" }}
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 19 } }}
                                onChange={(e) =>
                                    this.updateMentalStateLabel(
                                        "mentalState3",
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>

                        <Grid item xs={3} style={{ marginLeft: "2%" }}>
                            <BlueSlider
                                value={mentalState3.blue[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState3",
                                        "blue",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <GreenSlider
                                width="100"
                                value={mentalState3.green[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState3",
                                        "green",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <OrangeSlider
                                value={mentalState3.orange[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState3",
                                        "orange",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <PurpleSlider
                                value={mentalState3.purple[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState3",
                                        "purple",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <Typography
                                style={{
                                    color: "rgb(33,37,40)",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    marginTop: "5px",
                                }}
                            >
                                <span style={{ float: "left" }}>Very rare</span>
                                <span style={{ float: "right" }}>
                                    Very frequent
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        justifyContent="center"
                        style={{ paddingTop: "3%" }}
                    >
                        <Grid>
                            <StyledTextField
                                id="mentalState4"
                                label="Mental State 4"
                                variant="standard"
                                style={{ marginTop: "12%" }}
                                InputLabelProps={{ style: { fontSize: 18 } }}
                                inputProps={{ style: { fontSize: 19 } }}
                                onChange={(e) =>
                                    this.updateMentalStateLabel(
                                        "mentalState4",
                                        e.target.value
                                    )
                                }
                            />
                        </Grid>

                        <Grid item xs={3} style={{ marginLeft: "2%" }}>
                            <BlueSlider
                                value={mentalState4.blue[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState4",
                                        "blue",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <GreenSlider
                                value={mentalState4.green[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState4",
                                        "green",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <OrangeSlider
                                value={mentalState4.orange[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState4",
                                        "orange",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <PurpleSlider
                                value={mentalState4.purple[0]}
                                valueLabelDisplay="auto"
                                ValueLabelComponent={StyledValueLabel}
                                onChange={(_, value) =>
                                    this.recordSliderValue(
                                        "mentalState4",
                                        "purple",
                                        value
                                    )
                                }
                                style={{ marginTop: "-3px" }}
                            />
                            <Typography
                                style={{
                                    color: "rgb(33,37,40)",
                                    textAlign: "left",
                                    fontSize: "18px",
                                    marginTop: "5px",
                                }}
                            >
                                <span style={{ float: "left" }}>Very rare</span>
                                <span style={{ float: "right" }}>
                                    Very frequent
                                </span>
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <StyledButton nextPage={this.continue} text="Next" />
            </div>
        );
    }
}

export default ColorSlider;
