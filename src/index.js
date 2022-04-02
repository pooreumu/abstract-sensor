class Sensor {
    constructor(deviceId) {
        this.deviceId = deviceId;
        this.powerStatus = 'off';
        this.reportingInterval = 10000;
        this.sensingDistanceInterval = 500;
        this.reportinDataInterval = 1000;
    }

    turn(OnOff) {
        if (this.powerStatus === OnOff) {
            throw new Error();
        }
        this.powerStatus = OnOff;
        if (OnOff === 'on') {
            this.status = 'idle';
            setTimeout(() => {
                this.status = 'sensingDistance';
                setTimeout(() => {
                    this.status = 'reportingData';
                    setTimeout(() => {
                        this.status = 'idle';
                    }, this.reportinDataInterval);
                }, this.sensingDistanceInterval);
            }, this.reportingInterval);
        }
    }
}

class IotServer {
    constructor() {
        this.sensors = [];
    }

    start(sensor) {
        for (const i of sensor) {
            if (i.powerStatus === 'on') {
                this.sensors.push(i);
            }
        }
    }

    publish({ deviceId, actionId, payload }) {
        for (const i of this.sensors) {
            if (i.deviceId === deviceId && actionId === 'CHANGE_REPORTING_INTERVAL') {
                i.reportingInterval = payload;
            }
        }
    }
}

module.exports = {
    Sensor,
    IotServer,
};
