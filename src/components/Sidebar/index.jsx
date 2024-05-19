import React, { useContext } from "react";
import { Wrap, Logo } from "./style";
import logo from "../../assets/images/logo.jpg";
import { data } from "../../utilits/navbar";
import { NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/Auth";
export default function Sidebar() {
  const [{ token }, dispatch] = useContext(AuthContext);

  return (
    <Wrap>
      <Wrap.Links>
        <Wrap.Link className="logo">
          <Logo>Mazzavot</Logo>
          {!token ? (
            <NavLink to="/login">LOGIN</NavLink>
          ) : (
            <NavLink to="/" onClick={() => dispatch({ type: "logout" })}>
              LOGOUT
            </NavLink>
          )}
        </Wrap.Link>
        {data.map(({ id, title, path }) => (
          <NavLink key={id} to={path}>
            <Wrap.Link>{title}</Wrap.Link>
          </NavLink>
        ))}
      </Wrap.Links>
      <Wrap.Outlet>
        <Outlet />
      </Wrap.Outlet>
    </Wrap>
  );
}
