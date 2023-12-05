import { Grid } from "@mui/material";
import MultiForm from "./UI/MultiForm";
import ThemeProvider from "./ThemeContext";

function SignUpForm() {
  return (
    <ThemeProvider>
      <Grid container>
        <Grid item xs={12}>
          <MultiForm />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default SignUpForm;