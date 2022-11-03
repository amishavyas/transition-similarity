import React from "react";
import { Box, Container, Grid, Typography } from "@material-ui/core";
import { StyledButton, Title } from "../StyledElements";

const PostTrialInstructions = ({ nextStep }) => {
    const Continue = (e) => {
        e.preventDefault();
        nextStep();
    };

    return (
        <Container component="main" maxWidth="md">
            <Title text="YOU HAVE COMPLETED THE OBSERVATION PERIOD" />
            <Typography
                style={{ fontSize: "23px" }}
                component="h2"
                variant="h6"
                align="center"
            >
                <br />
                In this next part of the task, your expedition leaders want to
                figure out
                <Box style={{ display: "flex", justifyContent: "center" }}>
                    <Grid item md={8}>
                        <Typography
                            style={{ fontSize: "23px" }}
                            component="h2"
                            variant="h6"
                            align="left"
                        >
                            <br />
                            <li> the number of mental states the alien has </li>
                            <li> the eye colors they are associated with </li>
                            <li>
                                {" "}
                                how similar the alien mental states are to each
                                other{" "}
                            </li>
                            <li> how positive or negative these states are </li>
                            <li>
                                {" "}
                                how similar they are to various human mental
                                states{" "}
                            </li>
                            <br />
                        </Typography>
                    </Grid>
                </Box>
                To help your fellow alien psychologists with this task, you will
                be making a report to share your findings about the alien mental
                states. Your answers in this part of the task should be based on
                your observations in the previous part.
                <br />
                <br />
                Please click the button below to continue.
            </Typography>
            <StyledButton nextPage={Continue} text="Continue" />
        </Container>
    );
};

export default PostTrialInstructions;
