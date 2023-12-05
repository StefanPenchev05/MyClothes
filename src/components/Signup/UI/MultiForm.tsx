import { Grid } from '@mui/material';

import StepperComponent from './StepperComponent';
import StepperContent from './StepperContent';
import LoginOptions from "../LoginOptions";

function MultiForm() {

  return (
    <Grid container className="flex flex-col">
      <StepperComponent/>
      <StepperContent />
    </Grid>
  )
}

export default MultiForm