// eslint-disable-next-line no-unused-vars
import React from "react";
import accountService from "../../services/account.service";

export const LogOutPage = () => {
  accountService.logout();
  return <div></div>;
};
