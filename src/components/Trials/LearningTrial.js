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
    componentDidMount() {
        this.props.updateTrialsState("day", this.props.day + 1);
        this.props.updateTrialsState("buttonDisabled", true);
    }

    render() {
        const { buttonDisabled, day, currentStim, updateTrialsState } = this.props;

        return (
            <div>
                <Typography
                    style={{ fontWeight: "bold", color: "black" }}
                    component="h1"
                    variant="h4"
                    align="center"
                >
                    Watch the colors of the alien eyes closely to learn about
                    the mental states they express!
                </Typography>

                <Typography
                    style={{ marginTop: "1%", fontSize: "30px", color: "black" }}
                    align="center"
                >
                    Day {day}
                </Typography>
                <br />
                <Video
                    autoPlay
                    oncontextmenu="false"
                    muted
                    playsinline
                    style={{
                        marginTop: "-2%",
                        marginBottom:"-3%",
                        opacity:
                            (!buttonDisabled && "50%") ||
                            (buttonDisabled && "100%"),
                    }}
                    onEnded={() => updateTrialsState("buttonDisabled", false)}
                >
                    <source src={"./video/" + currentStim} type="video/mp4" />
                </Video>
            </div>
        );
    }
}

export default LearningTrial;
