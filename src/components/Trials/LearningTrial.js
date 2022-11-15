import React, { Component } from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

const Video = styled.video`
    height: 500px;
    width: 500px;
    display: block;
    margin: auto;
    padding-top: 30px;
`;

/* Disable right click so participants cannot access controls */
window.oncontextmenu = function (event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};  

class LearningTrial extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trialStart: "",
            keyPress: [],
        };
    }

    componentDidMount() {
        const { updateTrialsState, day } = this.props;
        updateTrialsState("buttonDisabled", true);
        updateTrialsState("day", day + 1);

        if (day >= 1) {
            document.addEventListener("keydown", this.handleKeyPress);
        }
    }

    componentWillUnmount() {
        this.sendLearningData();
    }

    sendLearningData = () => {
        const { updateTrialsState, day, currentStim, learningTrialResponses } =
            this.props;
        const responses = {
            ...learningTrialResponses,
            [day - 1]: { stim: currentStim, keyResponses: this.state.keyPress },
        };
        if (day >= 1) {
            updateTrialsState("learningTrialResponses", responses);
        }
        return responses;
    };

    updateTrialStartTime = () => {
        const { trialStart } = this.state;
        if (trialStart === "") {
            this.setState({ trialStart: Date.now() });
        }
    };

    handleKeyPress = (e) => {
        const { keyPress, trialStart } = this.state;
        if (e.key === "1") {
            const allTimestamps = [...keyPress, Date.now() - trialStart];
            this.setState({ keyPress: allTimestamps });

            /* Put a border around the video to give visual feedback on keypress */ 
            const video = document.getElementById("videoStim");
            video.style.border = "2px solid rgb(66,37,1,.35)";

            /* Remove the border after 500 ms */ 
            setTimeout(function () {
                video.style.border = "2px solid rgb(66,37,1,0)";
            }, 500);
        }
    };

    handleVideoEnd = () => {
        const { updateTrialsState, day } = this.props;

        updateTrialsState("buttonDisabled", false);
        if (day >= 1) {
            document.removeEventListener("keydown", this.handleKeyPress);
        }
    };

    render() {
        const { buttonDisabled, day, currentStim } = this.props;
        let prompt;
        if (day === 1) {
            prompt = (
                <Typography
                    style={{ fontWeight: "bold", color: "black" }}
                    component="h1"
                    variant="h4"
                    align="center"
                >
                    Watch the colors of the alien eyes closely to learn about
                    the mental states they express!
                </Typography>
            );
        }
        if (day > 1) {
            prompt = (
                <Typography
                    style={{
                        fontSize: "29px",
                        fontWeight: "bold",
                        color: "black",
                    }}
                    align="center"
                >
                    Watch the colors of the alien eyes closely to learn about
                    the mental states they express!
                    <br />
                    Press the '1' key every time the alien's mental state
                    changes.
                </Typography>
            );
        }
        return (
            <div>
                {prompt}
                <Typography
                    style={{
                        marginTop: "5px",
                        fontSize: "28px",
                        color: "black",
                    }}
                    align="center"
                >
                    Day {day}
                </Typography>
                <br />
                <Video
                    autoPlay
                    muted
                    playsinline
                    id="videoStim"
                    style={{
                        marginTop: "10px",
                        marginBottom: "-3.75%",
                        border: "2px solid rgb(66,37,1,0)",
                        padding: "0px -15px",
                        paddingTop: "4px", 
                        paddingBottom: "4px", 
                        borderRadius: "40px", 
                        opacity:
                            (!buttonDisabled && "50%") ||
                            (buttonDisabled && "100%"),
                    }}
                    onPlay={this.updateTrialStartTime}
                    onEnded={this.handleVideoEnd}
                >
                    <source
                        src={
                            "http://scraplab.org/Experiment/video/" +
                            currentStim
                        }
                        type="video/mp4"
                    />
                </Video>
            </div>
        );
    }
}

export default LearningTrial;
