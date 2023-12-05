import React, { Suspense, lazy } from 'react';
import { Grid, Typography, Button, CircularProgress, colors} from '@mui/material';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import { validUsername, validateEmail, validatePassword, validateField, validateFirstName, validateLastName, validateDateOfBirth } from '../../../utils/validators';

import { useTheme } from '../ThemeContext';
import { useThemeColor } from '../ThemeColorProvider';
import { sendData } from '../../../service/api';
import { updateStep } from '../../../utils/stepHendlers';



import AccountFile from './StepperContext/AccountFile';
import { useTranslation } from 'react-i18next';
const PersonalDetails = lazy(() => import('./StepperContext/PersonalDetails'))
const ImageUpload = lazy(() => import('./StepperContext/ImageUpload'))

const ERROR_COLOR = '#ff0000';
const SUCCESS_COLOR = '#4caf50';

function StepperContent() {
  //include from useTheme all fucntions
  const { setUsername, setSteps, setActiveStep,setPassword, setConfirmPassword } = useTheme();
  const { setEmail, setSelectedDate, setFirstName, setLastName, setGender} = useTheme();
  const {email, password, username, firstName, lastName, selectedDate, confirmPassword} = useTheme();
  const {gender, country, city, address, phone, images, activeStep, steps} = useTheme();
  const { t } = useTranslation();
  const {darkMode} = useThemeColor();
  const navigate = useNavigate();

    const handleNext = () => {
            setActiveStep((prevActiveStep) => {
                return prevActiveStep + 1;
        });
    };
    const handleBack = () => {
        setActiveStep((prevActiveStep) => {
        return prevActiveStep - 1;
        });
    };
    const handleReset = () => {
        setActiveStep(0);
    };

    const onSkip =() => {
        updateStep(setSteps, activeStep, SUCCESS_COLOR, '✓', true);
        handleNext();
    }

    const onNext = () => {
        let isValid = false;
  
        switch (activeStep) {
          case 0: // Account Setup
            const validEmail = validateField(email, setEmail, validateEmail, t('registration.Email is required'), t('registration.Invalid email address'));
            const validUser = validateField(username, setUsername, validUsername, t('registration.Username is required'), t('registration.Username must be and between 4 and 15 characters long'));
            const validPassword = validateField(password, setPassword, validatePassword, t('registration.Password is required'), t('registration.Password must be at least 8 characters long'));
            console.log(validPassword);
            
            const validConfirmPassword = validateField(confirmPassword, setConfirmPassword, (confirmPassword:string) => password.value === confirmPassword, t('registration.Confirm Password is required'), t('registration.Passwords do not match'));
            isValid = validEmail && validUser && validPassword && validConfirmPassword;
            break;
            case 1: // Personal Details
            const validFirstName = validateField(firstName, setFirstName, validateFirstName, t('registration.First name is required'), t('registration.Invalid First name'));
            const validLastName = validateField(lastName, setLastName, validateLastName, t('registration.Last name is required'), t('registration.Invalid Last name'));
            const validGender = validateField(gender, setGender, (value: string) => value !== '' , t('registration.Gender is required'), '' );
            //@ts-ignore
            const validDateOfBirth = validateDateOfBirth(selectedDate.value, setSelectedDate);
            isValid = validFirstName && validLastName && validGender && validDateOfBirth;
            break;
          case 2: 
            isValid = true;
            break;
          default:
            break;
        }
  
        if (isValid) {
          updateStep(setSteps, activeStep, SUCCESS_COLOR, '✓', true);
          handleNext();
          return true;
        }
  
        updateStep(setSteps, activeStep, ERROR_COLOR, '!', false);
        return false;
      };
  

    const onBack = () => {
      setSteps((prevSteps) => {
        const newSteps = [...prevSteps];
        newSteps[activeStep - 1].icon = React.cloneElement(newSteps[activeStep - 1].icon, { style: { color: darkMode ? "white" : "black" } });
        newSteps[activeStep - 1].badgeContent = '';
        newSteps[activeStep - 1].badgeSuccess = false;
        return newSteps;
      });
      handleBack();
    };

    const onFinish = async() => {
        const data = {
          email: email.value,
          password: password.value,
          username: username.value,
          firstName: firstName.value,
          lastName: lastName.value,
          selectedDate: selectedDate.value,
          gender: gender.value,
          country: country.value.label,
          city: city.value.name,
          address: address.value,
          phone: phone.value,
          picOne: images.picOne,
          picTwo: images.picTwo,
          picThree: images.picThree,
          picFour: images.picFour,
        };
  
        const completedData = Object.keys(data).reduce((acc, key) => {
          const keyOfData = key as keyof typeof data;
          if(data[keyOfData] === '' || data[keyOfData] === null){
            return acc;
          }
          if(keyOfData === 'phone'){
            return {...acc, [key]: `+${country.value.phone}${data[keyOfData]}`}
          }
          return {...acc, [key]: data[keyOfData]}
        },{})
        const response = await sendData('/user/registration', {data: completedData});
  
        if(response.status < 500){
          const data = response.data;
          if(data.success === false){
            if(data.type === "UserAlreadyExists"){
              setUsername({value: username.value, error: true, msg: data.msg});
              steps.map((step, index) => {
                  if(index === 0){
                    updateStep(setSteps, index, ERROR_COLOR, '!', false);
                  }
                  updateStep(setSteps, index, "#000000", '', false);
                }
              )
              setActiveStep(0);
              return false;
            }
          }
          navigate("/home");
        }
      }

    function getStepContent(activeStep:number){
      switch (activeStep) {
        case 0:
          return <AccountFile/>;
        case 1:
          return <PersonalDetails/>;
        case 2:
          return <ImageUpload/>;
        default:
          return;
      }
    }

    return (
        <Grid container direction="column" justifyContent="center" alignItems="stretch">
            {activeStep === steps.length ? (
                <Grid container direction="column" justifyContent="center" alignItems="center">
                    <Typography className="text-2xl font-bold">All steps completed</Typography>
                    <Typography className="text-2xl font-bold">You&apos;re finished</Typography>
                    <button
                        style={{color: colors.common.white, backgroundColor: '#696cff'}}
                        className='font-medium rounded-lg h-12 text-base w-1/2'
                        onClick={handleReset}
                    >
                        Reset
                    </button>
                </Grid>
            ) : (
                <Grid container direction="column" justifyContent="center" alignItems="stretch">
                    {
                        <Suspense fallback={
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <CircularProgress style={{color: '#696cff'}}/>
                            </Grid>
                        }>
                            {getStepContent(activeStep)}
                        </Suspense>
                    }
                    <Grid container 
                        direction="row" 
                        justifyContent="space-between" 
                        alignItems="stretch" 
                        flexWrap={'nowrap'}
                        className="space-x-4 mt-8"
                    >
                        <Button
                            type='button'
                            variant='contained'
                            style={{color: colors.common.white, backgroundColor: activeStep > 0 ? '#696cff' : '#c4c4c4'}}
                            className='font-medium rounded-lg h-12 text-base w-1/2' 
                            onClick={onBack} 
                            disabled={activeStep === 0}
                        >
                            {t('Back')}
                        </Button>
                        {activeStep === steps.length - 2 ? (
                            <Button
                                type='submit'
                                variant='contained'
                                style={{color: colors.common.white, backgroundColor: '#696cff'}}
                                className='font-medium rounded-lg h-12 text-base w-1/2' 
                                onClick={onSkip}
                            >
                                {t('Skip')}
                            </Button>
                        ) : null}
                        {activeStep === steps.length - 1 ? (
                            <Button 
                                type='submit'
                                variant='contained'
                                placeholder={t('registration.Finish')}
                                style={{color: colors.common.white, backgroundColor: '#696cff'}}
                                className='font-medium rounded-lg h-12 text-base w-1/2' 
                                onClick={onFinish}
                            >
                              {t('Finish')}
                            </Button>

                        ): (
                            <Button 
                                type='submit'
                                variant='contained'
                                style={{color: colors.common.white, backgroundColor: '#696cff'}}
                                className='font-medium rounded-lg h-12 text-base w-1/2' 
                                onClick={onNext}
                            >
                              {t('Next')}
                            </Button>
                        )}
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
}

export default StepperContent;