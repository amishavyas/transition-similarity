import React, { Component } from "react";
import Consent from "./Consent";
import Instructions from "./Instructions";
import Trials from "./Trials/Trials";
import DemoSurvey from "./DemoSurvey";
import PostTrialInstructions from "./PostTrialInstructions";
import PostTrialQuestions from "./PostTrialQuestions";
import Debrief from "./Debrief";
import { stim, videos } from "./selectedStim";
import { v4 as uuidv4 } from "uuid";

class Experiment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            subID: uuidv4(),
            step: 1,
            videos: videos,
            stimOrder: stim,
            nextStateResponses: [],
        };
    }

    updateParentState = (stateToUpdate, newState) => {
        this.setState({
            [stateToUpdate]: newState,
        });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
        window.scrollTo(0, 0);
    };

    async preloader() {
        /* Create new Video object for each video. Forces the browser to load all videos. */
        videos.forEach((media) => {
            var video = document.createElement("video");
            video.setAttribute(
                "src",
                "http://scraplab.org/Experiment/video/" + media
            );
        });
    }

    componentDidMount() {
        this.preloader();
    }

    render() {
        const { step, stimOrder, nextStateResponses, videos } = this.state;

        switch (step) {
            case 1:
                return <Consent nextStep={this.nextStep} />;
            case 2:
                return (
                    <Instructions
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                    />
                );
            case 3:
                return (
                    <Trials
                        nextStep={this.nextStep}
                        stimOrder={stimOrder}
                        videos={videos}
                        updateParentState={this.updateParentState}
                        nextStateResponses={nextStateResponses}
                    />
                );
            case 4:
                return <PostTrialInstructions nextStep={this.nextStep} />;
            case 5:
                return (
                    <PostTrialQuestions
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                    />
                );
            case 6:
                return (
                    <DemoSurvey
                        nextStep={this.nextStep}
                        updateParentState={this.updateParentState}
                    />
                );
            case 7:
                return (
                    <Debrief
                        nextStep={this.nextStep}
                    />
                );
            default:
        }
    }
}

export default Experiment;
