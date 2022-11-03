import React, { Component } from "react";
import { Grid, Typography } from "@material-ui/core";
import styled from "styled-components";
import Arrow from "@elsdoerfer/react-arrow";
import "./NextStateStyle.css";

import greenAlien from "../../images/GG.png";
import blueAlien from "../../images/BB.png";
import purpleAlien from "../../images/PP.png";
import orangeAlien from "../../images/OO.png";

const Choice = styled.img`
    height: 290px;
    width: 140px;
    padding: 17px;
`;

const Question = styled.img`
    height: 450px;
    width: 220px;
    margin-right: 2%;
`;

const Label = styled.label`
    padding: 2%;
    margin-top: auto;
    margin-bottom: auto;
`;

class NextStateQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: { greenAlien },
            alienMentalStates: [
                { greenAlien },
                { blueAlien },
                { purpleAlien },
                { orangeAlien },
            ],
            currResponse: "",
            trialStart: "",
        };
    }

    setQuestion = () => {
        const stateArray = Array.from(this.state.alienMentalStates);
        stateArray.sort(() => Math.random() - 0.5);
        const index = Math.floor(Math.random() * stateArray.length);
        const questionState = stateArray[index];
        stateArray.splice(index, 1);
        this.setState({
            alienMentalStates: stateArray,
            question: questionState,
        });
    };

    handleRadio = () => {
        const response = document.querySelector(
            'input[name="nextState"]:checked'
        ).value;
        this.setState({ currResponse: response });
        this.props.updateTrialsState("buttonDisabled", false);
    };

    sendDataToTrials = () => {
        const { question, currResponse, trialStart } = this.state;
        const responseData = [
            ...this.props.nextStateResponses,
            {
                question: Object.keys(question)[0],
                response: currResponse,
                RT: Date.now() - trialStart,
            },
        ];
        return responseData;
    };

    componentDidMount() {
        this.setQuestion();
        this.setState({ trialStart: Date.now() });
    }

    componentWillUnmount() {
        this.props.updateParentState(
            "nextStateResponses",
            this.sendDataToTrials()
        );
    }

    render() {
        const { question, alienMentalStates } = this.state;

        return (
            <div>
                <Typography
                    style={{
                        fontWeight: "bold",
                        color: "rgb(33,37,40)",
                        padding: "2%",
                        position: "relative",
                        bottom: "25px",
                        lineHeight: "1.5",
                    }}
                    component="h1"
                    variant="h4"
                    align="center"
                >
                    If the alien's eyes are currently the color shown on the
                    left, <br />
                    which of the options on the right are most likely to come
                    next?
                    <br />
                </Typography>
                <Grid
                    container
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        style={{ marginTop: "-2%" }}
                    >
                        <Question
                            src={Object.values(question)}
                            value={Object.keys(question)}
                            alt="green alien"
                        />
                        <Arrow
                            angle={90}
                            length={100}
                            color="black"
                            style={{
                                width: "180px",
                            }}
                        />

                        <Label>
                            <input
                                type="radio"
                                class="alienRadio"
                                name="nextState"
                                value={Object.keys(alienMentalStates[0])}
                                onChange={this.handleRadio}
                            />
                            <Choice
                                src={Object.values(alienMentalStates[0])}
                                alt="img"
                            />
                        </Label>

                        <Label>
                            <input
                                type="radio"
                                class="alienRadio"
                                name="nextState"
                                value={Object.keys(alienMentalStates[1])}
                                onChange={this.handleRadio}
                            />
                            <Choice
                                src={Object.values(alienMentalStates[1])}
                                alt="img"
                            />
                        </Label>

                        <Label>
                            <input
                                type="radio"
                                class="alienRadio"
                                name="nextState"
                                value={Object.keys(alienMentalStates[2])}
                                onChange={this.handleRadio}
                            />
                            <Choice
                                src={Object.values(alienMentalStates[2])}
                                alt="img"
                            />
                        </Label>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default NextStateQuestion;
