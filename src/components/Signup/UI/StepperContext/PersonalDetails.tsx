import { Box, TextField, FormControl, Select, InputLabel, MenuItem, FormHelperText, Autocomplete, Divider, Typography, InputAdornment, useMediaQuery, useTheme as useMuiTheme } from "@mui/material"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from "react-i18next";

import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useTheme } from "../../ThemeContext"
import { sendData ,getData } from "../../../../service/api";

interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

interface CityType{
  country: string,
  name: string
}

function PersonalDetails() {
  const {
    gender, setGender, 
    selectedDate, setSelectedDate,
    firstName, setFirstName,
    lastName, setLastName,
    country, setCountry,
    phone, setPhone,
    address, setAddress,
    city, setCity,
  } = useTheme();

  const { t } = useTranslation();

  // Define initial country and city states
  const initialCountryState: CountryType = { code: "", label: "", phone: "" };
  const initialCityState: CityType = { country: '', name: '' };

  // Use useState to manage countries and cities states
  const [countries, setCountries] = useState<CountryType[]>([initialCountryState]);
  const [cities, setCities] = useState<CityType[]>([initialCityState]);

  // Use MUI theme and media query for responsive design
  const theme = useMuiTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  // Use useState to manage dark mode state
  const [darkMode, setDarkMode] = useState(false);

  // Use useEffect to set dark mode based on current hour
  useEffect(() => {
      const currentHour = new Date().getHours();
      setDarkMode(currentHour >= 20 || currentHour <= 6);
  }, []);

  // Use useEffect to fetch countries data when component mounts
  useEffect(() => {
      const fetchCountries = async () => {
          const result = await getData('/countries');
          setCountries(result);
      }
      fetchCountries();
  }, []);

  // Use useEffect to fetch cities data when country changes
  useEffect(() => {
      const fetchCities = async () => {
          const result = await sendData('/cities', { country: country.value.code });
          if (result && result.ok) {
              setCities([initialCityState]);
          } else {
              if (Array.isArray(result.data)) {
                  setCities(result.data);
              } else {
                  console.error('Error: result.data is not an array');
              }
          }
      }

      if (country.value.label) {
          fetchCities();
      }
  }, [country.value.label]);

  return (
    <Box>
      <Box display={"flex"} flexWrap={matches ? 'wrap' : 'nowrap'} marginBottom={2}>
        <Box marginBottom={2} width={matches ? "100%" : "50%"}>
          <TextField
            id="firstName"
            name="firstName"
            label={t('registration.FirstName')}
            variant="outlined"
            error={!!firstName.error}
            helperText={firstName.msg}
            fullWidth={true}
            value={firstName.value}
            onChange={(e) => setFirstName({value: e.target.value, error: false, msg: '' })}
            required
            InputProps={{
              style: {
                color: theme.palette.text.primary
              },
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.text.primary
                }
            }}
          />
        </Box>
        <Box width={matches ? "100%" : "50%"}>
          <TextField
            id="lastName"
            name="lastName"
            label={t('registration.LastName')}
            variant="outlined"
            error={!!lastName.error}
            helperText={lastName.msg}
            fullWidth={true}
            value={lastName.value}
            onChange={(e) => setLastName({value: e.target.value, error: false, msg: '' })}
            required
            InputProps={{
              style: {
                color: theme.palette.text.primary
              },
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.text.primary
                }
            }}
          />
        </Box>
      </Box>
      <Box display={"flex"} flexWrap={matches ? 'wrap' : 'nowrap'} marginBottom={2}>
        <Box width={matches ? "100%" : "50%"}>
          <FormControl variant="outlined" fullWidth={true} error={gender.error ? true : false} required>
              <InputLabel id="gender-label">
                {t('registration.Gender')}
              </InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender.value}
              onChange={(e) => setGender({value: e.target.value.toString(), error: false, msg: '' })}
              label="Gender"
              className={darkMode ? 'dark:text-white' : ''}
            >
              <MenuItem value={"male"}>{t('registration.Male')}</MenuItem>
              <MenuItem value={"female"}>{t('registration.Female')}</MenuItem>
              <MenuItem value={"Don't want to state"}>{t("registration.Don't want to state")}</MenuItem>
            </Select>
            <FormHelperText>{gender.error ? gender.msg : null}</FormHelperText>
          </FormControl>
        </Box>
        <Box width={matches ? "100%" : "50%"}>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DatePicker
                label={t('registration.Birthday')}
                value={selectedDate.value}
                maxDate={dayjs(Date.now())}
                minDate={dayjs(Date.now()).subtract(70, 'year')}
                slotProps={{
                  textField: {
                    helperText: selectedDate.msg,
                    error: selectedDate.error
                  },
                }}
                onChange={(date) => {
                  if (date) {
                    setSelectedDate({value: date, error: false, msg: '' });
                  }
                }}
            />
          </LocalizationProvider>
        </Box>
      </Box>
      <Divider className="mb-4">
      <Typography
              className='text-p-gray'
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                fontFamily: 'Roboto',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                lineHeight: '1.75em',
                '&::before, &::after': {
                  content: '""',
                  flex: 1,
                  borderBottom: '1px solid rgba(0, 0, 0, 0.38)',
                  margin: 'auto'
                },
                '&::before': {
                  marginRight: '0.25em'
                },
                '&::after': {
                  marginLeft: '0.25em'
                }
              }}
        >
          {t('registration.Optional')}
        </Typography>
      </Divider>
      <Box marginBottom={2} display={"flex"} flexWrap={matches ? 'wrap' : 'nowrap'} flexDirection={"row"}>
        <Autocomplete
            id="country"
            sx={{ width: "80%", marginRight: 2}}
            options={countries}
            autoHighlight
            value={country.value}
            onChange={(e, value) => {
              if (value) {
                setCountry({value: value, error: false, msg: '' });
              }else {
                setCountry({value: {code: '', label: '', phone: ''}, error: false, msg: ''})
              }
            }}
            getOptionLabel={(option) => option.label}
            renderOption={(props, option) => (
              <Box component="li" sx={{'& > img': { mr: 2, flexShrink: 0 },}} 
                {...props}>
                <img
                  loading="lazy"
                  width="20"
                  srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                  src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                  alt=""
                />
                {option.label} ({option.code}) +{option.phone}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t('registration.Choose a country')}
                inputProps={{
                  ...params.inputProps,
                }}
              />
            )}
            isOptionEqualToValue={(option, value) => {
              return option.code === value.code;
            }}
          />
          <Typography 
            width={"20%"}
            display={"flex"} 
            justifyContent={"center"} 
            alignItems={"center"}
            className={`border-2 ${darkMode ? 'dark:border-gray-300 dark:text-white' : ''}`}
          >
            {country.value.code}
          </Typography>
      </Box>
        <Box marginBottom={2}>
          <Autocomplete
              id="city"
              sx={{ width: "100%%"}}
              options={cities}
              autoHighlight
              value={city.value}
              onChange={(e, value) => {
                if (value && isNaN(Number(value))) {
                  setCity({value: value, error: false, msg: '' });
                }else {
                  setCity({value: {country: '', name: ''}, error: false, msg: ''})
                }
              }}
              disabled = {country.value ? false : true}
              getOptionLabel={(option) => option.name}
              renderOption={(props, option) => (
                <Box component="li" sx={{'& > img': { mr: 2, flexShrink: 0 },}} 
                  {...props}>
                  <img
                    loading="lazy"
                    width="20"
                    srcSet={`https://flagcdn.com/w40/${country.value.code.toLowerCase()}.png 2x`}
                    src={`https://flagcdn.com/w20/${country.value.code.toLowerCase()}.png`}
                    alt=""
                    className={darkMode ? 'dark:text-white' : ''}
                  />
                  {option.name}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t('registration.Choose a city')}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
            />
        </Box>
        <Box marginBottom={2}>
          <TextField
            id="address"
            name="adress"
            label={t('registration.HomeAddress')}
            variant="outlined"
            fullWidth={true}
            disabled = {city.value.name ? false : true}
            value={address.value}
            onChange={(e) => setAddress({value: e.target.value, error: false, msg: ''})}
            InputProps={{
              style: {
                color: theme.palette.text.primary
              },
            }}
            InputLabelProps={{
                style: {
                    color: theme.palette.text.primary
                }
            }}
          />
        </Box>
      <Box>
        <TextField
          id="phone"
          name="phone"
          label={t('registration.PhoneNumber')}
          variant="outlined"
          fullWidth={true}
          value={phone.value}
          onChange={(e) => {
            if(!isNaN(Number(e.target.value)))
            setPhone({value: e.target.value, error: false, msg: '' })
          }}
          disabled = {country.value.phone ? false : true}
          inputProps={{
            maxLength: 13,
          }}
          InputProps={{
            style: {
              color: theme.palette.text.primary
            },
            startAdornment: (
              <InputAdornment 
                position="start"
              >
                {country.value.phone ? `+ ${country.value.phone}` : null}
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  )
}

export default PersonalDetails