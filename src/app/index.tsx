import { Redirect } from "expo-router";

// TEMP: go straight to the tabs until the login screen is built, then redirect to /login
export default function Index() {
  return <Redirect href="/chats" />;
}
