import React, { FC, PropsWithChildren } from "react";
import { Header } from "./";

interface Props {
  children: any;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default Layout;
