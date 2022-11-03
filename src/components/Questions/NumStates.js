import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import { StyledButton, StyledTextField } from "../../StyledElements";

class NumStates extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numStates: "",
        };
    }

    validateResponse = () => {
        /* Check if the textbox is empty */

        if (parseInt(this.state.numStates) >= 0) {
            return true;
        } else {
            alert("The textbox is empty. Please enter a numeric response.");
            return false;
        }
    };

    continue = (e) => {
        /* Continue to next question only if there is a response */

        e.preventDefault();
        if (this.validateResponse()) {
            this.props.updatePostTrialQState("numStates", this.state.numStates);
            this.props.nextQuestion();
        }
    };

    render() {
        return (
            <div>
                <Typography
                    style={{
                        fontWeight: "bold",
                        color: "rgb(33,37,40)",
                        paddingBottom: "3%",
                        lineHeight: "1.5",
                    }}
                    component="h2"
                    variant="h4"
                    align="center"
                >
                    <br />
                    Based on your observations, how many different mental states
                    <br />
                    do you think the alien tends to experience?
                    <br />
                    <br />
                    Please enter your response in the textbox. <br />
                </Typography>
                <Grid container justifyContent="center">
                    <StyledTextField
                        label="Total Mental States"
                        variant="standard"
                        placeholder="Enter a number"
                        inputProps={{ style: { fontSize: 20 } }}
                        onChange={(e) =>
                            this.setState({ numStates: e.target.value })
                        }
                        type="number"
                        InputLabelProps={{ style: { fontSize: 18, paddingBottom:"4px" } }}
                        InputProps={{ style: { fontSize: 19 }, minLength: 2 }}
                    />
                </Grid>
                <StyledButton nextPage={this.continue} text="Next" />
            </div>
        );
    }
}

export default NumStates;
