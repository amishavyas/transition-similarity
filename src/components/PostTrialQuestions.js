import React, { Component } from "react";
import ColorSlider from "./Questions/ColorSlider";
import NumStates from "./Questions/NumStates";
import SimilarityRating from "./Questions/SimilarityRating";
import HumanStateMatching from "./Questions/StateMatchDnD/HumanStateMatching";
import ValenceRating from "./Questions/ValenceRating";

class PostTrialQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            questionNumber: 1,
        };
    }

    updatePostTrialQState = (stateToUpdate, newState) => {
        this.setState({
            [stateToUpdate]: newState,
        });
    };

    nextQuestion = () => {
        const { questionNumber } = this.state;
        this.setState({ questionNumber: questionNumber + 1 });
        window.scrollTo(0, 0);
    };

    componentWillUnmount() {
        for (const response of Object.entries(this.state)) {
            if (response[0] === "questionNumber") {
                continue;
            } else {
                this.props.updateParentState(response[0], response[1]);
            }
        }
    }

    render() {
        const { questionNumber } = this.state;
        const { mentalState1, mentalState2, mentalState3, mentalState4 } =
            this.state;
        const colorSliderResponses = {
            mentalState1,
            mentalState2,
            mentalState3,
            mentalState4,
        };

        switch (questionNumber) {
            case 1:
                return (
                    <NumStates
                        nextQuestion={this.nextQuestion}
                        updatePostTrialQState={this.updatePostTrialQState}
                    />
                );
            case 2:
                return (
                    <ColorSlider
                        nextQuestion={this.nextQuestion}
                        updatePostTrialQState={this.updatePostTrialQState}
                    />
                );
            case 3:
                return (
                    <SimilarityRating
                        colorSliderResponses={colorSliderResponses}
                        nextQuestion={this.nextQuestion}
                        updatePostTrialQState={this.updatePostTrialQState}
                    />
                );
            case 4:
                return (
                    <ValenceRating
                        colorSliderResponses={colorSliderResponses}
                        nextQuestion={this.nextQuestion}
                        updatePostTrialQState={this.updatePostTrialQState}
                    />
                );
            case 5:
                return (
                    <HumanStateMatching
                        colorSliderResponses={colorSliderResponses}
                        nextStep={this.props.nextStep}
                        updatePostTrialQState={this.updatePostTrialQState}
                        updateParentState={this.props.updateParentState}
                    />
                );
            default:
        }
    }
}

export default PostTrialQuestions;
