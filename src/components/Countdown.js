import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Line } from "rc-progress";
import ms from "pretty-ms";

const styles = {
  line: {
    transform: "rotate(270deg)"
  },
  lineGrid: {
    width: "215px",
    height: "225px"
  },
  timeText: {
    textAlign: "center"
  }
};

/**
 * Timer in dashboard for observation tools
 * @class Countdown
 */
class Countdown extends React.Component {
  /**
   * @param {Props} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      time: this.props.timerTime,
      tenPercent: 0.1 * this.props.timerTime,
      color: ""
    };
  }

  tick = () => {
    if (this.state.time <= 0) {
      this.setState({ time: this.props.timerTime });
    } else {
      if (this.state.time - 1000 < 0) {
        this.setState({ time: 0 });
      } else {
        this.setState({ time: this.state.time - 1000 });
      }
    }
  };

  /** lifecycle method invoked after component mounts */
  componentDidMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  /** lifecycle method invoked just before component is unmounted */
  componentWillUnmount() {
    clearInterval(this.timer);
  }

  /**
   * render function
   * @return {ReactElement}
   */
  render() {
    const { classes } = this.props;
    return (
      <Grid
        container
        direction="column"
        justify="flex-end"
        alignItems="center"
        height="28vh"
      >
        <Grid item className={classes.lineGrid}>
          <div style={{ marginTop: "47%" }} />
          <Line
            className={classes.line}
            percent={`${100 * (this.state.time / this.props.timerTime)}`}
            strokeWidth="10"
            strokeColor={
              this.state.time > this.state.tenPercent
                ? this.props.color
                : "#E55529"
            }
            trailWidth="10"
          />
        </Grid>
        <Grid item className={classes.timeText}>
          {ms(this.state.time)}
        </Grid>
      </Grid>
    );
  }
}

Countdown.propTypes = {
  timerTime: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  color: PropTypes.string.isRequired
};

export default withStyles(styles)(Countdown);
