import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import RootLayout from "./RootLayout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import BeforeRegister from "./auth/BeforeRegister";
import {
  AllContestants,
  CreatePost,
  Explore,
  Home,
  OtpVerification,
  Profile,
  SendVerification,
  SubscriptionCard,
} from "./pages";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/registerchoice" element={<BeforeRegister />} />
      <Route path="/verify" element={<SendVerification />} />
      <Route path="/verify/otp" element={<OtpVerification />} />
      <Route path="/payment" element={<SubscriptionCard />} />

      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="explore" element={<Explore />} />
        <Route path="all-contestants" element={<AllContestants />} />
        <Route path="create-post" element={<CreatePost />} />
        <Route path=":username" element={<Profile />} />
      </Route>
    </>
  )
);

// Create a client
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
