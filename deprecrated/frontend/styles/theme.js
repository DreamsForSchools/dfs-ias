import { createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
    palette: {
        primary:{
            main: "#0099FF",
            light: "#7FC9FF",
        },
        secondary:{
            main: "#49479D",
            light: "#A4A3CE",
        },
    },
    typography: {
        fontFamily: "'Rubik', sans-serif",
    },
});

export default theme;