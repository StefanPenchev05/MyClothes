import { useDispatch } from "react-redux";
import { initReactI18next } from "react-i18next";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Grid, CircularProgress, CssBaseline } from "@mui/material";

import i18next from "i18next";
import bg from "./locals/bg.json";
import en from "./locals/en.json";
import NavBar from "./features/NavBar/NavBar";
import Notification from "./components/Notification/Notification";

const Home = lazy(() => import("./page/Home"));
const ChatMenu = lazy(() => import("./page/ChatMenu"));
const UserLogin = lazy(() => import("./page/UserLogin"));
const UserSignup = lazy(() => import("./page/userSignup"));
const ProfilePage = lazy(() => import("./page/UserProfile"));
const UserSettings = lazy(() => import("./page/UserSettings"));
const CreateProductPage = lazy(() => import("./page/CreateProduct"));

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    bg: { translation: bg },
  },
  lng: document.querySelector("html")?.lang || "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

function App() {
  const location = useLocation();
  const showNavBar =
    location.pathname !== "/" &&
    location.pathname !== "/user/login" &&
    location.pathname !== "/user/registration";

  const dispatch = useDispatch();

  const [selectedChat, setSelectedChat] = useState<string | undefined>();
  dispatch({ type: "socket/connect", payload: { event: "notify" } });
  dispatch({
    type: "socket/connect",
    payload: { event: "notify_deleted_chat" },
  });
  dispatch({ type: "socket/connect", payload: { event: "created_chat" } });

  return (
    <Suspense
      fallback={
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          height={"100vh"}
        >
          <CircularProgress style={{ color: "#696cff" }} />
        </Grid>
      }
    >
      {showNavBar && <NavBar />}
      <CssBaseline />

      <div style={{ paddingTop: showNavBar ? "10px" : "0px" }}>
        <Notification setSelectedChatNotification={setSelectedChat} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/user/login" element={<UserLogin />}></Route>
          <Route path="/user/registration" element={<UserSignup />}></Route>
          <Route path="/user/profile/:token" element={<ProfilePage />}></Route>
          <Route path="/user/settings/" element={<UserSettings />}></Route>
          <Route
            path="/user/messages"
            element={
              <ChatMenu
                selectedChat={selectedChat}
                setSelectedChat={setSelectedChat}
              />
            }
          ></Route>
          <Route path="/product/create" element={<CreateProductPage />}></Route>
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
