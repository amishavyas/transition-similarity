import React, { Component } from "react";
import { Container, Typography } from "@material-ui/core";
import { StyledButton, Title } from "../StyledElements";
import styled from "styled-components";

import greenAlien from "../images/GG.png";
import blueAlien from "../images/BB.png";
import purpleAlien from "../images/PP.png";
import orangeAlien from "../images/OO.png";

const Img = styled.img`
    height: 250px;
    width: 120px;
    margin-left: 30px;
    margin-right: 30px;
`;

class Instructions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: 4,
        };
    }

    continue = (e) => {
        e.preventDefault();
        const { currentPage, totalPages } = this.state;
        if (currentPage === totalPages) {
            this.props.nextStep();
        } else {
            this.nextPage();
        }
    };

    nextPage = () => {
        const { currentPage } = this.state;
        this.setState({ currentPage: currentPage + 1 });
        window.scrollTo(0, 0);
    };

    displayPage = () => {
        const { currentPage } = this.state;
        switch (currentPage) {
            case 1:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black" }}
                        component="h2"
                        variant="h6"
                        align="center"
                    >
                        <br />
                        Welcome to the experiment!
                        <br />
                        <br />
                        In this experiment, you will play the role of an
                        interpid alien psychologist. Err... that's a
                        psychologist <strong>of</strong> aliens, not a
                        psychologist who happens to be one. You get it, right?
                        Great!
                        <br />
                        <br />
                        As an alien psychologist, you are part of a team of
                        explorers and scientists that are being sent to survey a
                        new planet. A small advance team was sent ahead of you
                        to lay the groundwork for the main expedition. They
                        reported that the planet that you will soon be arriving
                        at is populated by a curious species of alien animal.
                        <br />
                        <br />
                        They included a few pictures of one of the creatures
                        below:
                        <br />
                        <br />
                        <Img src={"./images/alien1.png"} alt="alien1" />
                        <Img
                            src={"./images/alien_1_state6.png"}
                            alt="alien2"
                        />
                        <Img
                            src={"./images/alien_1_state4.png"}
                            alt="alien3"
                        />
                        <Img src={"./images/alien1_7.png"} alt="alien4" />
                        <br />
                        <br />
                        <strong>
                            Your goal as an alien psychologist is to understand
                            how this creature's mind works.
                        </strong>
                        <br />
                        <br />
                        Understanding what the creature is thinking and feeling
                        will help keep the expedition members safe as they
                        explore the rest of the planet. Your research may also
                        help you avoid inadvertently harming the aliens as you
                        and the others continue to explore. Who knows - you may
                        even be able to make friends with them.
                    </Typography>
                );
            case 2:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black" }}
                        component="h2"
                        variant="h6"
                        align="center"
                    >
                        <br />
                        You know from your alien psychology training that the
                        best way to understand a new species of aliens is to
                        carefully observe them. With careful observation of
                        their mental states - their thoughts and emotions - you
                        can learn to predict what they will do in the future.
                        <br /> <br />
                        <strong>
                            Your first task will consist of reviewing how the
                            mental states of these aliens change over time.
                        </strong>
                        <br />
                        <br />
                        The advance team has reported that the aliens seem to
                        experience different mental states - perhaps thoughts
                        and emotions similar to those experienced by humans.
                        They think that these alien mental states might be
                        related to the ever-changing color of the creature's
                        eyes, as shown in the examples below:
                        <br /> <br />
                        <Img src={greenAlien} alt="green alien" />
                        <Img src={blueAlien} alt="blue alien" />
                        <Img src={orangeAlien} alt="orange alien" />
                        <Img src={purpleAlien} alt="purple alien" />
                    </Typography>
                );
            case 3:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black" }}
                        component="h2"
                        variant="h6"
                        align="center"
                    >
                        <br />
                        However, the advance team isn't sure exactly how the
                        alien's mental states are related to its eye colors.
                        <br />
                        <br />
                        How many mental states does the alien have? Is there
                        just one eye color for each state, or is each state
                        expressed through a mix of different colors? Answering
                        these questions is why the expedition leaders called in
                        an expert: you!
                        <br />
                        <br />
                        <strong>
                            In the task that follows, you will observe ONE alien
                            across different days. Pay careful attention to
                            its eye color, which will change over time.
                        </strong>
                        <br />
                        <br />
                        To advance to the next time point, you will press the
                        <strong> NEXT </strong>button. Occassionally, you will
                        be asked to use what you have learned so far to predict
                        the alien's next eye color.
                        <br />
                        <br />
                        <strong>
                            Your goal in this task is to understand the mental
                            states that the alien expresses through its eyes.
                        </strong>
                    </Typography>
                );
            case 4:
                return (
                    <Typography
                        style={{ fontSize: "23px", color: "black" }}
                        component="h2"
                        variant="h6"
                        align="center"
                    >
                        <br />
                        After you have completed the observation period, you
                        will make a report to the expedition leaders in which
                        you will share your findings on how many different
                        mental states the alien has, which eye colors those
                        states are associated with, how positive or negative the
                        states are, how similar the states are to each other and
                        to various human mental states.
                        <br />
                        <br /> You will receive further intructions for the
                        report after you complete the observation period. After
                        completing the observation period and sharing your
                        findings, you will complete a short demographic survey,
                        be debriefed, and receive your completion code.
                        <br />
                        <br /> You can track your progress during the experiment
                        with a progress bar located on the top of your screen.
                        <br />
                        <br /> 
                        <strong>
                            PLEASE DO NOT REFRESH YOUR BROWSER OR CLICK THE BACK
                            BUTTON DURING THE EXPERIMENT 
                        </strong>
                    </Typography>
                );
            default:
        }
    };

    render() {
        return (
            <div>
                <Container component="main" maxWidth="md">
                    <Title text="INSTRUCTIONS" />

                    {this.displayPage()}

                    <StyledButton nextPage={this.continue} text="Continue" />
                </Container>
            </div>
        );
    }
}

export default Instructions;
