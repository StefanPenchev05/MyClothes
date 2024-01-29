import React from "react";
import { Tab, Tabs, Box } from "@mui/material";
import { Home, Security, Notifications, PrivacyTip } from "@mui/icons-material";

import GeneralSettings from "../components/UserSettings/GeneralSettings";

export default function UserSettings() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div className="flex justify-start h-screen">
      <Tabs
        orientation="vertical"
        variant="scrollable"
        sx={{
          height: "100%",
          borderRight: 1,
          borderColor: "divider",
          "& .MuiTab-root": {
            marginBottom: "1rem",
          },
        }}
        value={value}
        onChange={handleChange}
      >
        <Tab icon={<Home />} label="General" />
        <Tab icon={<Security />} label="Security" />
        <Tab icon={<Notifications />} label="Notifications" />
        <Tab icon={<PrivacyTip />} label="Privacy" />
      </Tabs>

      {value === 0 && <GeneralSettings />}
      {value === 1 && <Box p={3}>Security Settings</Box>}
      {value === 2 && <Box p={3}>Notification Settings</Box>}
      {value === 3 && <Box p={3}>Privacy Settings</Box>}
    </div>
  );
}
