function ProbMap () {
    this.weightThresholds = [];
    this.events = []; 
    
    this.add = function (event, weight) {
        if (typeof event === 'undefined' || typeof weight !== 'number' || weight <= 0) {
            console.log("[ERROR] ProbMap: invalid add() parameters");
            return;
        }
        var index = this.events.indexOf(event);
        if (index !== -1) {
            var weightVariation;
            var prevTh = index === 0 ? 0.0 : this.weightThresholds[index - 1];
            weightVariation = (this.weightThresholds[index] - prevTh) - weight;
            this.weightThresholds[index] = prevTh + weight;
            for (var i = index + 1; i < this.events.length; ++i) {
                this.weightThresholds[i] -= weightVariation;
            }
        } else {
            var prevTh = this.events.length === 0 ? 0.0 : this.weightThresholds[this.events.length - 1];
            this.weightThresholds.push(prevTh + weight);
            this.events.push(event);
        }
    }

    this.remove = function (event) {
        if (typeof event === 'undefined') {
            console.log("[ERROR] ProbMap: invalid remode() parameters");
            return;
        }
        var index = this.events.indexOf(event);
        if (index === -1) {
            console.log("nothing to remove");
            return;
        }
        var weight;
        var prevTh = index === 0 ? 0.0 : this.weightThresholds[index - 1];
        weight = this.weightThresholds[index] - prevTh;
        for (var i = 0; i < this.weightThresholds.length; ++i) {
            this.weightThresholds[i] -= weight;
        }
        this.weightThresholds.splice(index, 1);
        this.events.splice(index, 1);
    }

this.getRandom = function (randomNumber)  {
        if (typeof randomNumber == 'undefined') {
            randomNumber = Math.random(1.0);
        }
        if (typeof randomNumber != 'number' || randomNumber < 0.0 || randomNumber > 1.0) {
            console.log("[ERROR] ProbMap: invalid getRandom() parameters");
            return;
        }
        if (this.events.length === 0) {
            console.log("[WARNING] No events to choose from");
            return undefined;
        }
        var _randomN = randomNumber * this.weightThresholds[this.events.length - 1];
        var i = 0;
        while (this.weightThresholds[i] < _randomN) {
            ++i;
        }
        return this.events[i];
    }

this.printAll = function () {
        if (this.events.length === 0) return;

        normFactor = this.weightThresholds[this.events.length - 1];
        console.log(this.events[0]);
        console.log("Prob: " + (this.weightThresholds[0] / normFactor));

        for (var i = 1; i < this.events.length; i++) {
            console.log(this.events[i]);
            console.log("Prob: " + (this.weightThresholds[i] - this.weightThresholds[i - 1]) / normFactor);
        }
    }
}
