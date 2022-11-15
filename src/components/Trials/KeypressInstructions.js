import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import { Title } from "../../StyledElements";

class KeypressInstructions extends Component {
    componentDidMount() {
        this.props.updateTrialsState("buttonDisabled", false);
    }

    render() {
        return (
            <div>
                <Container component="main" maxWidth="md">
                    <Title text="OBSERVATION PERIOD - Day 1 Completed" />
                    <Typography
                        style={{
                            fontSize: "23px",
                            color: "black",
                            marginBottom: "-3%",
                        }}
                        align="center"
                    >
                        <br />
                        You have completed Day 1 of observing the alien's
                        changing mental states.
                        <br />
                        To learn more about the aliens, your expedition leaders
                        need information on when exactly the alien's mental
                        states change during the day.
                        <br />
                        <br />
                        For the remaining days, please continue to carefully
                        observe the alien's mental states through its changing
                        eye colors.
                        <br />
                        <br />
                        <strong>
                            Every time you detect a change in the alien's mental
                            state, press the '1' key on your keyboard.
                        </strong>
                        <br />
                        A box will appear around the alien to inform you that
                        your response has been recorded.
                        <br />
                        <br />
                        Please click the button below to continue.
                    </Typography>
                </Container>
            </div>
        );
    }
}

export default KeypressInstructions;
