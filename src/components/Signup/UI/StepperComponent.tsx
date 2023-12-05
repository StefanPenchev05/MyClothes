import {useEffect, useState} from 'react'
import {Stepper, Step, StepLabel, Badge, Box, useMediaQuery, useTheme as useMuiTheme} from "@mui/material"
import { useTheme } from "../ThemeContext"

function StepperComponent() {
  const {activeStep, steps} = useTheme();
  const theme = useMuiTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const currentHour = new Date().getHours();
    setDarkMode(currentHour >= 20  || currentHour <= 6);
  }, []);

  return (
    <Stepper activeStep={activeStep} orientation={matches ? "vertical" : "horizontal"} alternativeLabel>
        {
          // @ts-ignore
          steps.map((step, index) => (
          <Step key={step.label} className={`mr-4 mb-8 ${darkMode ? 'dark:text-white' : ''}`}>
            {step.badgeContent ? (
              <Badge badgeContent={step.badgeContent} color={step.badgeSuccess ? 'success' : 'error'}>
                <StepLabel StepIconComponent={() => step.icon }>
                  <Box width={matches ? "100%" : 70}>
                    {step.label}
                  </Box>
                </StepLabel>
              </Badge>
            
            ) : (
              <StepLabel StepIconComponent={() => step.icon }>{step.label}</StepLabel>
            )}
          </Step>
        ))}
    </Stepper>
  )
}

export default StepperComponent