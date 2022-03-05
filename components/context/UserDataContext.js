import React, { useState, useEffect, useMemo, createContext, useContext } from "react";
import { createUser, getSingleUser, updateUser } from '../../utils/API';
import Auth from "../../utils/auth";

export const UserDataContext = createContext();
const UpdateUserData = createContext();

export function useUserDataContext() {
  return useContext(UserDataContext);
}

export const UserDataProvider = props => {

  const [userData, setUserData] = useState({
    email: 'test@test.com',
    password: '',
    seedHex: '',
    first_name: '',
    last_name: '',
    phone: '',
    addressOne: '',
    addressTwo: '',
    city: '',
    state: '',
    zip: '',
    walletAddress: '',
    walletBalance: null,
    completeRegistration: undefined,
    blockie: '',
    colorScheme: []
  });

  // the value that will be given to the context
  const [user, setUser] = useState(null);

  // fetch a user from a fake backend API
  useEffect(() => {
    const fetchUser = () => {
      // this would usually be your own backend, or localStorage
      // for example
      fetch('https://randomuser.me/api/')
        .then((response) => response.json())
        .then((result) => setUser(result.results[0]))
        .catch((error) => console.log('An error occurred'))
    };

    fetchUser();
    console.log(user)
  }, []);

  // const providerValue = useMemo(() => {(userData, setUserData)}, [userData, setUserData]);

  useEffect(() => {
    Auth.loggedIn ? console.log('logged in') : console.log('not logged in');
    console.log(userData);
  })

  return (
    <UserDataContext.Provider value={user}>
      {props.children}
    </UserDataContext.Provider>
  );
}