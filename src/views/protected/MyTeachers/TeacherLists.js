import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import FirebaseContext from "../../../components/Firebase/context";
import AppBar from "../../../components/AppBar";
import TransitionTimeSvg from '../../../assets/icons/TransitionTime.svg';
import StudentEngagementSvg from '../../../assets/icons/StudentEngagement.svg';
import SequentialActivitiesSvg from '../../../assets/icons/SequentialActivities.svg';
import ListeningToChildrenSvg from '../../../assets/icons/ListeningtoChildren.svg';
import MathInstructionSvg from '../../../assets/icons/MathInstruction.svg';
import LevelOfInstructionSvg from '../../../assets/icons/LevelofInstruction.svg';
import ClassroomClimateSvg from '../../../assets/icons/ClassroomClimate.svg';
import AssocCoopInteractionsSvg from '../../../assets/icons/AssocCoopInteractions.svg';
import ObserveIcon from "../../../assets/icons/observeIcon.png";
import ConferencePlan from "../../../assets/icons/ConferencePlan.png";
import ActionPlan from "../../../assets/icons/ActionPlan.png";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

// Other teacher's IDs to populate List and test mechanics


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    minHeight: '768px',
    //border: '1px solid #000000',
    margin: 0,
    padding: 0
  },
  container: {
    //border: '1px solid #FFD800',
    display: 'flex',
    flexDirection: 'column',
    margin: '2% 5% 2% 5%'
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    },
    cursor: 'pointer'
  },
  title: {
    alignSelf: 'center',
    fontSize: '2.2em'
  },
  table: {
    maxWidth: '100%',
    width: '100%',
    //border: '1px solid #00FFF6',
    overflow: 'auto',
    //overflowY: 'hidden',
    maxHeight: '16em',
    fontSize: '1.5em',
    boxShadow: '0px 1px 1px 1px #888888'
  },
  actionContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '1em'
  },
  actionButton: {
    marginLeft: '2em',
    backgroundColor: '#2196F3',
  },
  search: {
    lineHeight: '1em',
    fontSize: '1.5em',
    maxWidth: '30%',
  },
  nameCellHeader: {
    color: '#000000',
    fontSize: '0.8em',
    padding: '0.5em',
    maxWidth: '12em',
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF'
  },
  emailCellHeader: {
    color: '#000000',
    fontSize: '0.8em',
    padding: '0.5em',
    maxWidth: '12em',
    position: 'sticky',
    top: 0,
    backgroundColor: '#FFFFFF'
  },
  magicEightIcon: {
    height: '55px',
    width: '55px',
    borderRadius: 2
  },
  magicEightCell: {
    textAlign: 'center',
    padding: '0.5em',
    minWidth: '55px',
    maxWidth: '1.8em'
  },
  nameField: {
    textAlign: 'left',
    padding: '0.5em',
    overflow: 'hidden',
    //border: '1px solid #4C00FF'
    maxWidth: '7em'
  },
  emailField: {
    textAlign: 'left',
    padding: '0.5em',
    overflow: 'hidden',
    maxWidth: '18em'
  },
  unlockedIcon: {
    height: '40px',
    width: '40px',
    display: 'block',
    borderRadius: 4
  },
  legendContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '1em',
    //border: '1px solid #FF56FF',
    margin:'1.5em 0 0 0',
    justifySelf: 'center',
    overflow: 'scroll'
  },
  legendItem: {
    display: 'flex',
    alignItems:'center',
    fontSize: '1.3em',
    //border: '1px solid #97FF00'
  },
  legendIcon: {
    height: '40px',
    width: '40px',
    marginRight: '0.2em'
  },

  //Minor Breakpoint -> Shrinking desktop window
  '@media only screen and (max-width:1120px)': {
    emailField: {
      maxWidth: '10em'
    }
  },

  // iPad Pro 12.9" Portrait
  '@media only screen and (max-width:1024px) and (orientation:portrait)': {
    table: {
      maxHeight: '38em'
    }
  },

  // iPad Pro 10.5" Portrait
  '@media only screen and (max-width:834px) and (orientation: portrait)': {
    magicEightCell: {
      display: 'none'
    },
    table: {
      maxHeight: '30em'
    }
  },

  //iPad-Mini Portrait
  '@media only screen and (max-width:768px) and (orientation:portrait)': {
    legendContainer: {
      padding: '1em 0 1em 0'
    },
    actionContainer: {
      justifyContent: 'space-between'
    },
    actionButton: {
      marginRight: '3em'
    },
    magicEightCell: {
      display: 'none'
    },
    table: {
      maxHeight: '25em'
    }
  },

  // iPad-Mini Landscape
  '@media only screen and (max-width:1024px) and (orientation:landscape)': {
    nameField: {
      maxWidth: '7.5em'
    },
    emailField: {
      maxWidth: '9em'
    },
  }
});

const sortedSvg = [TransitionTimeSvg, ClassroomClimateSvg, ListeningToChildrenSvg, LevelOfInstructionSvg,
  MathInstructionSvg, StudentEngagementSvg, SequentialActivitiesSvg, AssocCoopInteractionsSvg];

const sortedAltText = ["Transition Time", "Classroom Climate", "Listening To Children", "Level Of Instruction",
  "Math Instruction ", "Student Engagement", "Sequential Activities", "Assoc Coop Interactions"];


class TeacherLists extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teachers: [],
      searched: [],
      isAdding: false,
      inputFirstName: "",
      inputLastName: "",
      inputSchool: "",
      inputEmail: "",
      inputNotes: "",
      addAlert: false,
      alertText: ""
    };

    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    let firebase = this.context;
    firebase.getTeacherList()
      .then( teachers => {
        teachers.forEach( teacher => {
          teacher.then( data => {
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(data),
                searched: prevState.teachers.concat(data)
              }
            })
          });
        });
      })
      .catch(e => {
        console.log("Error occurred fetching teacher list: ", e)
      })
  };

  onChangeText = e => {
    const text = e.target.value.toLowerCase();
    if (text === "") {
      this.setState(prevState => {
        return { searched: prevState.teachers } // original teacher list
      })
    } else {
      this.setState(prevState => {
        return {
          searched: prevState.teachers.filter(item =>
            item.lastName.toLowerCase().indexOf(text) !== -1 ||
            item.firstName.toLowerCase().indexOf(text) !== -1 ||
            item.email.toLowerCase().indexOf(text) !== -1
          )}
      })
    }
  };

  selectTeacher = teacherInfo => {
    this.props.history.push({
      pathname: `/MyTeachers/${teacherInfo.id}`,
      state: {teacher: teacherInfo, type: this.props.type }
    });
  };

  handleAddText = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleAddConfirm = () => {
    const {inputFirstName, inputLastName, inputSchool, inputEmail, inputNotes} = this.state;
    console.log(inputFirstName, inputLastName, inputSchool);
    let firebase = this.context;
    firebase.addTeacher({
      firstName: inputFirstName,
      lastName: inputLastName,
      school: inputSchool,
      email: inputEmail,
      notes: inputNotes
    })
      .then(id => {
        console.log(typeof(id));
        console.log(id);
        firebase.getTeacherInfo(id)
          .then(teacherInfo => {
            this.setState(prevState => {
              return {
                teachers: prevState.teachers.concat(teacherInfo),
                searched: prevState.teachers.concat(teacherInfo)
              }
            }, () => {
              this.handleCloseModal();
              this.handleAddAlert(true);
            })
          })
          .catch(e => {
            console.log("Error occurred fetching new teacher's info: ", e);
            this.handleCloseModal();
            this.handleAddAlert(false);
          })
      })
      .catch(e => {
        console.log("Error occurred adding teacher to dB: ", e);
        this.handleCloseModal();
        this.handleAddAlert(false);
      });
  };

  handleAddAlert = successful => {
    if (successful) {
      this.setState({
        addAlert: true,
        alertText: "Teacher successfully added!"
      }, () => setTimeout(
        () => this.setState({ addAlert: false, alertText: ""}), 1500))
    } else {
      this.setState({
        addAlert: true,
        alertText: "Something went wrong... try refreshing your page or logging out and back in."
      }, () => setTimeout(
        () => this.setState( { addAlert: false, alertText: "" }), 3000))
    }
  };

  handleCloseModal = () => {
    this.setState({
      inputFirstName: "",
      inputLastName: "",
      inputSchool: "",
      inputEmail: "",
      inputNotes: "",
      isAdding: false,
      alertText: ""
    });
  };

  render() {
    const { classes } = this.props;
    const { isAdding, addAlert, alertText } = this.state;

    return (
      <div className={classes.root}>
        <FirebaseContext.Consumer>
          {firebase => <AppBar firebase={firebase}/>}
        </FirebaseContext.Consumer>
        <div className={classes.container}>
          <h2 className={classes.title}>
            My Teachers
          </h2>
          <div className={classes.actionContainer} >
            <TextField
              id="teacher-search"
              label="Search"
              type="search"
              className={classes.search}
              variant="outlined"
              onChange={this.onChangeText}
            />
            <Fab aria-label="Add Teacher" onClick={() => this.setState({isAdding: true})}
                 className={classes.actionButton} size='small'>
              <AddIcon style={{color: '#FFFFFF'}} />
            </Fab>
          </div>
          <div className={classes.table}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.nameCellHeader} >
                    Last<br/>Name
                  </TableCell>
                  <TableCell className={classes.nameCellHeader} >
                    First<br/>Name
                  </TableCell>
                  <TableCell className={classes.emailCellHeader} >
                    Email
                  </TableCell>
                  {sortedSvg.map((item, key) =>
                    <TableCell className={classes.magicEightCell}
                               style={{position:'sticky', top:0, backgroundColor:'#FFFFFF'}}>
                      <img src={item} alt={sortedAltText[key]}
                           className={classes.magicEightIcon}/>
                    </TableCell>
                  )}
                  <TableCell className={classes.nameCellHeader} >
                    Goals<br/>Met
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.searched.map((teacher, index) => (
                <TableRow className={classes.row} key={index}
                          onClick={() => this.selectTeacher(teacher)}>
                  <TableCell className={classes.nameField}>{teacher.lastName}</TableCell>
                  <TableCell className={classes.nameField}>{teacher.firstName}</TableCell>
                  <TableCell className={classes.emailField}>{teacher.email}</TableCell>
                  {[...Array(8).keys()].map( key =>
                    <TableCell className={classes.magicEightCell}>
                      {
                        teacher.unlocked !== undefined &&
                        teacher.unlocked.indexOf(key+1) !== -1 &&
                        <img src={ObserveIcon} className={classes.unlockedIcon} alt="Observed" />
                      }
                    </TableCell>
                  )}
                  <TableCell className={classes.nameField}>{teacher.goals !== undefined && teacher.goals}</TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className={classes.legendContainer} >
            <div className={classes.legendItem} >
              <img alt="Observed" src={ObserveIcon} className={classes.legendIcon} />
              = Observed
            </div>
            <div className={classes.legendItem} >
              <img alt="Conference Prep" src={ConferencePlan} className={classes.legendIcon} />
              = Conference Prep
            </div>
            <div className={classes.legendItem} >
              <img alt="Co-created Action Plan" src={ActionPlan} className={classes.legendIcon} />
              = Co-created Action plan
            </div>
          </div>
          <Dialog open={isAdding} onClose={this.handleCloseModal} aria-labelledby="edit-teacher-title">
            <DialogTitle id="edit-teacher-title">Add a New Teacher</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Make edits to the form below and confirm to add a teacher to your My Teachers list.
              </DialogContentText>
              <TextField
                autoFocus
                required
                onChange={this.handleAddText}
                margin="dense"
                id="first-name"
                name="inputFirstName"
                label="First Name"
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="last-name"
                name="inputLastName"
                label="Last Name"
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="school"
                name="inputSchool"
                label="School"
                type="text"
                fullWidth
              />
              <TextField
                required
                onChange={this.handleAddText}
                margin="dense"
                id="email"
                name="inputEmail"
                label="Email"
                type="email"
                fullWidth
              />
              <TextField
                onChange={this.handleAddText}
                margin="dense"
                id="notes"
                name="inputNotes"
                label="Notes"
                multiline
                rows={10}
                rowsMax={10}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleCloseModal} style={{color:'#F1231C'}}>
                Cancel
              </Button>
              <Button onClick={this.handleAddConfirm} style={{color:'#09A1B3'}}>
                Add New Teacher
              </Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={addAlert}
            onClose={() => this.setState({ addAlert:false, alertText:"" })}
            aria-labelledby="edit-alert-label"
            aria-describedby="edit-alert-description"
          >
            <DialogTitle id="edit-alert-title">{alertText}</DialogTitle>
          </Dialog>
        </div>
      </div>
    );
  }
}

TeacherLists.propTypes = {
  classes: PropTypes.object.isRequired
};

TeacherLists.contextType = FirebaseContext;
export default withStyles(styles)(withRouter(TeacherLists));
