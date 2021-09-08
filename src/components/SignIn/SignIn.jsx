import { Button, Grid } from "@material-ui/core";
import { useState } from "react";
import { useHistory } from "react-router";
import logo from "../../logo.png";
import { makeStyles } from "@material-ui/core/styles";
import { OutLinedInput } from "../Common/TextInputs";
import BarLoader from "react-spinners/BarLoader";
import ErrorIcon from "@material-ui/icons/Error";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { checkMail, login } from "../../apis/userService";
import { useLogin } from "../../context";
import { Snackbar, SnackbarView } from "../Common/Snackbar";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "Center",
    margin: "100px",
  },
  containerCss: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "450px",
    [theme.breakpoints.down("sm")]: {
      border: "none",
    },
    border: `1px solid #dadce0`, //${theme.palette.outline}`,
    borderRadius: "8px",
  },
  content: {
    paddingTop: "40px",
  },

  errorMsgCss: {
    marginLeft: "-14px",
    color: "#D93025",
    display: "flex",
    alignItems: "center",
  },
  usernamePillCss: {
    border: "1px solid #dadce0",
    borderRadius: "16px",
    // padding: "0 15px",
    paddingLeft: "5px",
    paddingRight: "7px",
    display: "flex",
    // alignItems: "center",
  },
  actionAreaCss: {
    display: "flex",
    justifyContent: "space-around",

    alignItems: "center",
    marginTop: "26px",
    paddingBottom: "20px",
  },
}));

export function SignIn() {
  const classes = useStyles();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [passwordLayout, setPasswordLayout] = useState(false);

  const { userDispatch } = useLogin();

  const [username, setUsername] = useState({
    value: "",
    error: false,
    errorMsg: "",
    label: "Email",
    placeHolder: "Email",
  });
  const [password, setPassword] = useState({
    value: "",
    error: false,
    errorMsg: "",
    label: "Enter your password",
    placeHolder: "Enter your password",
  });

  const submitUsername = () => {
    setLoading(true);

    checkMail({ email: username.value })
      .then(res => {
        setLoading(false);
        setPasswordLayout(true);
      })
      .catch(err => {
        if (err?.response?.status === 400) {
          setUsername(prevState => ({
            ...prevState,
            error: true,
            errorMsg: (
              <span className={classes.errorMsgCss}>
                <ErrorIcon />
                Couldn't find you KeepIt account
              </span>
            ),
          }));
        }
        // else {
        //   <SnackbarView open={true} />;
        // }

        setLoading(false);
      });
  };
  const submitPassword = () => {
    setLoading(true);
    login({ email: username.value, password: password.value })
      .then(res => {
        setLoading(false);

        userDispatch({ type: "LOGIN", payload: res.data.data });

        history.push("/");
        if (res?.data?.data?.token) {
          localStorage.setItem("hint", JSON.stringify(res.data.data));
        }
      })
      .catch(err => {
        setPassword(prevState => ({
          ...prevState,
          error: true,
          errorMsg: (
            <span className={classes.errorMsgCss}>
              <ErrorIcon />
              Wrong password. Try again or click Forgot password to reset it.
            </span>
          ),
        }));
        setLoading(false);
      });
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.containerCss}>
        <BarLoader
          color="#1a73e8"
          loading={loading}
          width={440} //"auto"
        />
        <Grid item className={classes.content}>
          <img src={logo} alt="app-logo" height="40px" width="40px" />
        </Grid>
        {!passwordLayout ? (
          <>
            <Grid
              item
              style={{ paddingTop: "16px", fontSize: "24px", fontWeight: 600 }}
            >
              <span>Sign In</span>
            </Grid>
            <Grid item style={{ paddingTop: "8px" }}>
              <span>Use your KeepIt Account</span>
            </Grid>

            <Grid item style={{ padding: "14px 0px" }}>
              <OutLinedInput
                label={username.label}
                placeHolder={username.placeHolder}
                value={username.value}
                error={username.error}
                errorMsg={username.errorMsg}
                showLabel={username.errorMsg ? username.errorMsg : false}
                handleChange={e => {
                  setUsername(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                handleKeyPress={e => {
                  if (e.key === "Enter") {
                    submitUsername();
                  }
                }}
              />

              {/* <span>Forgot email?</span> */}
            </Grid>
            <Grid container item className={classes.actionAreaCss}>
              <Grid item>
                <span
                  style={{ color: "#1a73e8", cursor: "pointer" }}
                  onClick={() => history.push("/signup")}
                >
                  Create Account
                </span>
              </Grid>
              <Grid item>
                <Button
                  onClick={submitUsername}
                  variant="contained"
                  style={{
                    backgroundColor: "#1a73e8",
                    color: "#ffffff",
                    textTransform: "capitalize",
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        ) : (
          <>
            <Grid
              item
              style={{ paddingTop: "16px", fontSize: "24px", fontWeight: 600 }}
            >
              <span>Welcome</span>
            </Grid>
            <Grid item style={{ paddingTop: "8px" }}>
              <span className={classes.usernamePillCss}>
                <AccountCircleIcon />
                {username.value}
              </span>
            </Grid>
            <Grid item style={{ padding: "14px 0px" }}>
              <OutLinedInput
                label={password.label}
                placeHolder={password.placeHolder}
                value={password.value}
                error={password.error}
                errorMsg={password.errorMsg}
                showLabel={password.errorMsg ? password.errorMsg : false}
                handleChange={e => {
                  setPassword(prevState => ({
                    ...prevState,
                    value: e.target.value,
                  }));
                }}
                handleKeyPress={e => {
                  if (e.key === "Enter") {
                    submitPassword();
                  }
                }}
              />

              {/* <span>Forgot email?</span> */}
            </Grid>
            <Grid container item className={classes.actionAreaCss}>
              <Grid item>
                <span style={{ color: "#1a73e8", cursor: "pointer" }}>
                  Create Account
                </span>
              </Grid>
              <Grid item>
                <Button
                  onClick={submitUsername}
                  variant="contained"
                  style={{
                    backgroundColor: "#1a73e8",
                    color: "#ffffff",
                    textTransform: "capitalize",
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </div>
  );
}
