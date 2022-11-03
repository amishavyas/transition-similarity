export function selectedStim(numTrials) {
    /* Participants see videos with the same combination #, but different sequence #s on each trial */

    /* 1 - Randomly select a number from 1 - 24 (combination #) */
    const combination = Math.ceil(Math.random() * 24);

    /* 2 - Randomly select sequence #s from 1 - 40 of length numTrials without repetition */
    const sequences = Array.from({ length: 40 }, (_, i) => i + 1); // [1...40]
    const stim = [];
    const chosenSequences = [];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function randomNoRepeats(array) {
        array = shuffle(array);
        var copy = array.slice(0);
        return function () {
            if (copy.length < 1) {
                copy = array.slice(0);
            }
            var index = Math.floor(Math.random() * copy.length);
            var item = copy[index];
            copy.splice(index, 1);
            return item;
        };
    }

    /* Array of 10 sequence numbers */
    for (var i = 0; i < numTrials; i++) {
        var chooser = randomNoRepeats(sequences);
        let seq = chooser();
        while (chosenSequences.includes(seq)) {
            seq = chooser();
        }
        chosenSequences.push(seq);
    }

    /* 3 - Create stim array with the chosen sequence #s and combination # */
    for (var seq = 0; seq < chosenSequences.length; seq++) {
        stim.push(
            "seq" + chosenSequences[seq] + "_comb" + combination + ".mp4"
        );
        stim.push(true);
    }
    return stim;
}
