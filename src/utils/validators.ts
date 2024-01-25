import dayjs from 'dayjs';

export function validateEmail (email: string)  {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
};

export function validUsername(username: string): boolean {
    const usernameRegex = /^[a-zA-Z0-9_]{4,15}$/;
    return usernameRegex.test(username);
}

export function validatePassword(password: string): boolean {
    const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    console.log(password)
    console.log(re.test(password));
    return re.test(password);
}

interface FieldRef {
    value: string,
    error: boolean,
    msg: string,
}

export const validateField = (
        fieldRef: FieldRef, 
        setField: React.Dispatch<React.SetStateAction<{
            value: string;
            error: boolean;
            msg: string;
        }>>, 
        validator : (value: string) => boolean, 
        emptyMsg:string, 
        invalidMsg:string 
    ):boolean => {
    if (!fieldRef.value) {
        setField({ ...fieldRef, error: true, msg: emptyMsg });
        return false;
    } else if (!validator(fieldRef.value)) {
        setField({ ...fieldRef, error: true, msg: invalidMsg });
        return false;
    }
    return true;
};

export function validateFirstName(firstName:string): boolean {
    const regex = /^[a-zA-Z]{2,}$/;
    return regex.test(firstName);
}
  
export function validateLastName(lastName: string): boolean {
    const regex = /^[a-zA-Z]{2,}$/;
    return regex.test(lastName);
}

export function validateDateOfBirth(selectedDate: dayjs.Dayjs, setSelectedDate:React.Dispatch<React.SetStateAction<{value: dayjs.Dayjs; error: boolean; msg: string;}>>): boolean {
    if (selectedDate.format() === 'Invalid Date') {
        setSelectedDate({value: selectedDate, error: true, msg: 'Date of birth is required'});
        return false;
    } else if (selectedDate.isAfter(dayjs().subtract(16, 'year'))) {
        setSelectedDate({value: selectedDate, error: true, msg: 'You must be at least 16 years old'});
        return false;
    }
    setSelectedDate({value: selectedDate, error: false, msg: ''});
    return true;
}
export function validateProductName(name:string){
    const re = /^[a-zA-Z0-9_]{3,}$/;
    return re.test(name)
}

export function validateCategory(category:string){
    const Categories =['Men', 'Women','Kids']
    return (category&& category in Categories) ? true : false
}