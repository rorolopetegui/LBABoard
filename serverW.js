const express = require('express');
var _ = require('lodash');
class Gpio {
    constructor(gpio, output) {
        this.gpio = gpio;
        this.output = output;
        this.state = 0;
    }
    readSync() {
        return this.state;
    }
    writeSync(state) {
        this.state = state;
    }
}
const app = express();

var gpioList = [26, 19, 13, 06, 12, 16, 20, 21];
var sensors = [];

for (var i = 0; i < gpioList.length; i++) {
    sensors.push(new Gpio(gpioList[i], 'out')); //use GPIO pin 4, and specify that it is output
}



app.get('/api/turnOnRelay', (req, res) => {
    let ret = false;
    var gpio = req.query.gpio;
    console.log("Gpio: ", gpio);
    if (gpio) {
        var sensor = sensors[_.findIndex(sensors, ['gpio', parseInt(gpio)])];
        console.log("sensor", sensor.readSync());
        if (sensor.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            sensor.writeSync(1); //set pin state to 1 (turn LED on)
            ret = true;
        } else {
            sensor.writeSync(0); //set pin state to 0 (turn LED off)
        }
        console.log(sensors);
    }
    res.json(ret);
})

const port = 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


