import React from 'react';
import { Tab, Tabs, Box } from '@mui/material';

export default function UserSettings() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box className='flex justify-start items-center h-screen'>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                sx={{height: '100%'}}
                value={value}
                onChange={handleChange}
            >
                <Tab label="General" />
                <Tab label="Security" />
                <Tab label="Notifications" />
                <Tab label="Privacy" />
            </Tabs>
            {value === 0 && <Box p={3}>General Settings</Box>}
            {value === 1 && <Box p={3}>Security Settings</Box>}
            {value === 2 && <Box p={3}>Notification Settings</Box>}
            {value === 3 && <Box p={3}>Privacy Settings</Box>}
        </Box>
    );
}