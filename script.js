class Stopwatch extends React.Component {
    constructor() {
        super();
        this.state = {
            running: false,
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(
            Math.floor(times.miliseconds)
        )}`;
    }
    reset() {
        this.setState({
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            }
        });
    }
    start() {
        if (!this.state.running) {
            this.state.running = true;
            this.watch = setInterval(() => this.step(), 10);
        }
    }

    step() {
        if (!this.state.running) return;
        this.calculate();
    }

    calculate() {
        let miliseconds = this.state.miliseconds + 1,
            seconds = this.state.seconds,
            minutes = this.state.minutes;
        if (miliseconds >= 100) {
            seconds += 1;
            miliseconds = 0;
        }
        if (seconds == 60) {
            minutes += 1;
            seconds = 0;
            miliseconds = 0;
        }
        this.setState({
            minutes,
            seconds,
            miliseconds
        });
    }

    stop() {
        this.setState({
            running: false
        });
        clearInterval(this.watch);
    }

    render() {
        return (
            <div className={"watch"}>
                <nav className={"controls"}>
                    <a
                        href={"#"}
                        className={"button"}
                        id={"start"}
                        onClick={() => this.start()}
                    >
                        Start
                    </a>
                    <a
                        href={"#"}
                        className={"button"}
                        id={"stop"}
                        onClick={() => {
                            this.stop();
                        }}
                    >
                        Stop
                    </a>
                </nav>
                <div className={"stopwatch"}>
                    {this.format({
                        minutes: this.state.minutes,
                        seconds: this.state.seconds,
                        miliseconds: this.state.miliseconds
                    })}
                </div>
            </div>
        );
    }
}
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = "0" + result;
    }
    return result;
}
ReactDOM.render(<Stopwatch/>, document.getElementById("app"));
