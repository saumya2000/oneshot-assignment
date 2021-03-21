import React, { Component } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import SchoolIcon from "@material-ui/icons/School";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const styles = (theme) => ({
  list: {
    "& .MuiList-padding": {
      paddingTop: "0px",
      paddingBotton: "0px",
    },
  },
});

class ChartsByState extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount = async () => {
    await axios
      .get("/countCollege_byState")
      .then((res) => {
        this.setState({
          labels: res.data["colleges"],
          series: res.data["count"],
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
  };

  getCollegesByState = (data) => {
    axios
      .get(`/college_byState?state=${data}`)
      .then((res) => {
        this.setState({
          colleges_byState: res.data,
          collegesDetails: null,
          similarColleges: null,
          students: null,
          studentDetails: null,
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
  };

  collegeDetails = (id, state, courses, number_of_students) => {
    this.setState({ collegeId: id });
    axios
      .get(`/college_details?id=${id}`)
      .then((res) => {
        this.setState({
          collegesDetails: res.data,
          studentDetails: null,
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
    axios
      .get(
        `/similarColleges?state=${state}&courses=${courses}&number_of_students=${number_of_students}`
      )
      .then((res) => {
        this.setState({
          similarColleges: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
    axios
      .get(`/student_byCollegeID?college_id=${id}`)
      .then((res) => {
        this.setState({
          students: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
  };
  getStudentDetails = (id) => {
    console.log(id);
    axios
      .get(`/student_details?id=${id}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          studentDetails: res.data,
        });
      })
      .catch((err) => {
        console.log(err, "Error in loading data");
      });
  };

  render() {
    const {
      colleges_byState,
      collegesDetails,
      similarColleges,
      students,
      studentDetails,
    } = this.state;
    const { classes } = this.props;
    const data = {
      series: this.state.series,
      options: {
        labels: this.state.labels,
        title: {
          text: "Chart by State",
          align: "left",

          style: {
            fontSize: "20px",
            fontWeight: "bold",
            color: "#263238",
          },
        },

        responsive: [
          {
            breakpoint: 1400,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 863,
            options: {
              chart: {
                width: 450,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 550,
            options: {
              chart: {
                width: 400,
              },
              legend: {
                position: "bottom",
              },
            },
          },
          {
            breakpoint: 450,
            options: {
              chart: {
                width: 300,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],

        chart: {
          events: {
            dataPointSelection: (event, chartContext, config) => {
              this.getCollegesByState(
                config.w.config.labels[config.dataPointIndex]
              );
            },
          },
        },
      },
    };

    return (
      <div className={classes.list}>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6}>
            {this.state.labels && this.state.series && (
              <div className="donut">
                <Chart
                  options={data["options"]}
                  series={data["series"]}
                  type="donut"
                  width="600"
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            {colleges_byState && (
              <div
                style={{
                  backgroundColor: "#f2f3f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <h1
                  style={{
                    textAlign: "center",
                    textDecoration: "underline",
                  }}
                >
                  List of Colleges
                </h1>
                {colleges_byState.map((college, index) => (
                  <List>
                    <ListItem
                      button
                      onClick={() =>
                        this.collegeDetails(
                          college.Id,
                          college.State,
                          college.Courses,
                          college.Number_of_students
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <SchoolIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={college.Name} />
                    </ListItem>
                  </List>
                ))}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6}>
            {collegesDetails && (
              <div
                style={{
                  backgroundColor: "#f2f3f4",
                  borderRadius: "10px",
                  padding: "20px",
                  width: "100%",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ textDecoration: "underline" }}>
                    College Details
                  </h1>
                  <h3>COLLEGE ID:- {collegesDetails.Id}</h3>
                  <h3>COLLEGE NAME:- {collegesDetails.Name}</h3>
                  <h3>YEAR FOUNDED:- {collegesDetails.Year_founded}</h3>
                  <h3>CITY:- {collegesDetails.City}</h3>
                  <h3>STATE:- {collegesDetails.State}</h3>
                  <h3>COUNTRY:- {collegesDetails.Country}</h3>
                  <h3>
                    NUMBER OF STUDENTS:- {collegesDetails.Number_of_students}
                  </h3>
                  <h3>COURSES:- {collegesDetails.Courses.join(", ")}</h3>
                </div>
              </div>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            {similarColleges && (
              <div
                style={{
                  backgroundColor: "#f2f3f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <h1
                  style={{ textAlign: "center", textDecoration: "underline" }}
                >
                  Similar Colleges
                </h1>
                {similarColleges.length > 1 ? (
                  <div>
                    {similarColleges.map((college, index) => (
                      <List>
                        {college.Id !== this.state.collegeId && (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <SchoolIcon />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={college.Name} />
                          </ListItem>
                        )}
                      </List>
                    ))}
                  </div>
                ) : (
                  <h3 style={{ textAlign: "center" }}>No similar colleges</h3>
                )}
              </div>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={6}>
            {students && (
              <div
                style={{
                  backgroundColor: "#f2f3f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <h1
                  style={{ textAlign: "center", textDecoration: "underline" }}
                >
                  List of Students
                </h1>
                {students.length > 0 ? (
                  <div>
                    {students.map((student, index) => (
                      <List>
                        <ListItem
                          button
                          onClick={() => {
                            this.getStudentDetails(student.Id);
                          }}
                        >
                          <ListItemAvatar>
                            <Avatar>
                              <EmojiPeopleIcon />
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={student.Name} />
                        </ListItem>
                      </List>
                    ))}
                  </div>
                ) : (
                  <h3 style={{ textAlign: "center" }}>No student found</h3>
                )}
              </div>
            )}
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            {studentDetails && (
              <div
                style={{
                  backgroundColor: "#f2f3f4",
                  borderRadius: "10px",
                  padding: "20px",
                }}
              >
                <div style={{ textAlign: "center" }}>
                  <h1 style={{ textDecoration: "underline" }}>
                    Student Details
                  </h1>
                  <h3>STUDENT ID:- {studentDetails.Id}</h3>
                  <h3>NAME:- {studentDetails.Name}</h3>
                  <h3>YEAR OF BATCH:- {studentDetails.Year_of_batch}</h3>
                  <h3>COLLEGE ID:- {studentDetails.College_id}</h3>
                  <h3>SKILLS:- {studentDetails.Skills.join(", ")}</h3>
                </div>
              </div>
            )}
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(ChartsByState);
