import React, { useState, useContext } from "react";
import DefaultLayout from "../templates/DefaultLayout";
import { UserDataContext, useUserDataContext } from "../components/context/UserDataContext";

export default function Test () {
  const data = useContext(UserDataContext);
  console.log(data);
  return (
    <DefaultLayout>
    This is {data}.
    </DefaultLayout>
  )
}