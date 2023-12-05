import React, { ReactNode, useContext, useState } from 'react';
import { VpnKey, Person, ContactEmergency ,CheckCircle } from '@mui/icons-material';
import dayjs, { Dayjs } from 'dayjs';
import { ThemeColorProvider } from './ThemeColorProvider';
import { useTranslation } from 'react-i18next';

interface Step {
  label: string;
  icon: JSX.Element;
  badgeContent: string;
  badgeSuccess: boolean;
}

interface Image{
  picOne: string | null,
  picTwo: string | null,
  picThree: string | null,
  picFour: string | null,
}

interface Field {
  value: string;
  error: boolean;
  msg: string;
}

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

interface ThemeContextValue {
  //account setup
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: Step[];
  setSteps: React.Dispatch<React.SetStateAction<Step[]>>;
  username: Field;
  setUsername: React.Dispatch<React.SetStateAction<Field>>;
  email: Field;
  setEmail: React.Dispatch<React.SetStateAction<Field>>;
  password: Field;
  setPassword: React.Dispatch<React.SetStateAction<Field>>;
  confirmPassword: Field;
  setConfirmPassword: React.Dispatch<React.SetStateAction<Field>>;
  //personal details
  selectedDate: {
    value: Dayjs | null;
    error: boolean;
    msg: string;
  }
  setSelectedDate: React.Dispatch<React.SetStateAction<{
    value: Dayjs;
    error: boolean;
    msg: string;
  }>>;
  gender: Field;
  setGender: React.Dispatch<React.SetStateAction<Field>>;
  firstName: Field;
  setFirstName: React.Dispatch<React.SetStateAction<Field>>;
  lastName: Field;
  setLastName: React.Dispatch<React.SetStateAction<Field>>;
  country: {
    value: CountryType;
    error: boolean;
    msg: string;
  };
  setCountry: React.Dispatch<React.SetStateAction<{
    value: CountryType;
    error: boolean;
    msg: string;
  }>>;
  phone: Field;
  setPhone: React.Dispatch<React.SetStateAction<Field>>;
  address: Field;
  setAddress: React.Dispatch<React.SetStateAction<Field>>;
  city: {
    value: CityType,
    error: boolean,
    msg: string
  };
  setCity: React.Dispatch<React.SetStateAction<{
    value: CityType,
    error: boolean,
    msg: string
  }>>;
  //AvatarUpload
  images: Image;
  setImages: React.Dispatch<React.SetStateAction<Image>>;
}

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

function ThemeProvider({children}: ThemeProviderProps) {
    const [activeStep, setActiveStep] = useState(0)
    const { t } = useTranslation();
    const [steps, setSteps] = useState([
        { label: t('registration.Account Setup'), icon: <VpnKey />, badgeContent: '', badgeSuccess: false },
        { label: t('registration.Personal Details'), icon: <Person />, badgeContent: '', badgeSuccess: false },
        { label: t('registration.Images Upload'), icon: <ContactEmergency/> , badgeContent: '', badgeSuccess: false},
        { label: t('registration.Confirmation'), icon: <CheckCircle />, badgeContent: '', badgeSuccess: false },
    ]);

    //accout setup
    const [username, setUsername] = useState({ value: '', error: false, msg: '' });
    const [email, setEmail] = useState({ value: '', error: false, msg: '' });
    const [password, setPassword] = useState({ value: '', error: false, msg: '' });
    const [confirmPassword, setConfirmPassword] = useState({ value: '', error: false, msg: '' });

    //personal details
    const [selectedDate, setSelectedDate] = useState({value: dayjs(), error: false, msg: ''});
    const [gender, setGender] = useState({value: '', error: false, msg: ''});
    const [firstName, setFirstName] = useState({value: '', error: false, msg: ''});
    const [lastName, setLastName] = useState({value: '', error: false, msg: ''});
    const [country, setCountry] = useState({value:{code: '', label: '', phone: ''}, error: false, msg: ''});
    const [phone, setPhone] = useState({value: '', error: false, msg: ''});
    const [address, setAddress] = useState({value: '', error: false, msg: ''});
    const [city, setCity] = useState({value: {country: '', name: ''}, error: false, msg: ''});

    //AvatarUpload
    const [images, setImages] = useState<Image>({
      picOne: null,
      picTwo: null,
      picThree: null,
      picFour: null,
    });

    const contextValue: ThemeContextValue = {
      activeStep, setActiveStep,
      steps, setSteps,
      username, setUsername,
      email, setEmail,
      password, setPassword,
      confirmPassword, setConfirmPassword,
      selectedDate, setSelectedDate,
      gender, setGender,
      firstName, setFirstName,
      lastName, setLastName,
      country, setCountry,
      phone, setPhone,
      address, setAddress,
      city, setCity,
      images, setImages
    };
  
  return (
    <ThemeColorProvider>
      <ThemeContext.Provider value={contextValue}>
        {children}          
      </ThemeContext.Provider>
    </ThemeColorProvider>
  )
}

export default ThemeProvider