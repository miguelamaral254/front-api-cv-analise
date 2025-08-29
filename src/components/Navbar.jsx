import { useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dropdown from "./global/Dropdown";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Divider from "@mui/material/Divider";

import WorkIcon from "@mui/icons-material/Work";
import PeopleIcon from "@mui/icons-material/People";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import InfoIcon from "@mui/icons-material/Info";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

import logo from "../assets/logo.png";



const NavBar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const linkClass = ({ isActive }) =>
    `text-base font-medium transition-colors ${
      isActive ? "text-white font-semibold" : "text-gray-300 hover:text-white"
    }`;

  const menuNavItems = [
    { text: "Vagas", path: "/vagas", icon: <WorkIcon /> },
    { text: "Sobre a Empresa", path: "/sobre", icon: <InfoIcon /> },
    { text: "Talentos", path: "/talentos", icon: <PeopleIcon />, auth: true },
    {
      text: "Criar Vaga",
      path: "/vagas/criar",
      icon: <AddCircleOutlineIcon />,
      auth: true,
      admin: true,
    },
    {
      text: "Criar Usuário",
      path: "/users/criar",
      icon: <PersonAddIcon />,
      auth: true,
      admin: true,
    },
  ];

  const drawerList = (
    <Box
      sx={{ width: 270, height: "100%", bgcolor: "#1e3a8a", color: "white" }}
      role="presentation"
      onClick={() => setIsDrawerOpen(false)}
      onKeyDown={() => setIsDrawerOpen(false)}
    >
      <div className="p-4 flex items-center border-b border-blue-700">
        <img src={logo} alt="Logo Cognvox" className="h-8 w-auto" />
        <span className="ml-3 text-xl font-bold">Cognvox</span>
      </div>
      <List>
        {menuNavItems.map((item) => {
          if (item.auth && !user) return null;
          if (item.admin && user?.role !== "admin") return null;

          return (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={NavLink}
                to={item.path}
                end={item.path === "/vagas"}
              >
                <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          );
        })}

        {user && (
          <>
            <Divider sx={{ my: 1, borderColor: "rgba(255, 255, 255, 0.12)" }} />
            <ListItem key="configuracoes" disablePadding>
              <ListItemButton onClick={() => navigate("/configuracoes")}>
                <ListItemIcon sx={{ color: "white" }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configurações" />
              </ListItemButton>
            </ListItem>
            <ListItem key="sair" disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon sx={{ color: "white" }}>
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <header className="bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div>
              <Link to={user ? "/vagas" : "/"}>
                <img src={logo} alt="Logo Cognvox" className="h-8 w-auto" />
              </Link>
            </div>

            <div className="flex items-center">
              <nav className="hidden md:flex items-center space-x-6">
                <NavLink to="/vagas" end className={linkClass}>
                  Vagas
                </NavLink>
                <NavLink to="/sobre" className={linkClass}>
                  Sobre a Empresa
                </NavLink>

                {user && (
                  <>
                    <NavLink to="/talentos" className={linkClass}>
                      Talentos
                    </NavLink>
                    <NavLink to="/vagas/criar" className={linkClass}>
                      Criar Vaga
                    </NavLink>
                    
                    {user.role === "admin" && (
                      <NavLink to="/users/criar" className={linkClass}>
                        Criar Usuário
                      </NavLink>
                    )}
                  </>
                )}
              </nav>

              <div className="hidden md:block ml-6">
                {user && (
                  <Dropdown
                    buttonText={
                      <div className="p-1 rounded-full text-white hover:text-gray-200 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    }
                    content={
                      <div className="w-48">
                        <div className="px-3 py-2 text-sm text-gray-500 border-b">
                          Olá, {user.nome}
                        </div>
                        <Dropdown.Item
                          onClick={() => navigate("/configuracoes")}
                        >
                          Configurações
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleLogout}>
                          Sair
                        </Dropdown.Item>
                      </div>
                    }
                  />
                )}
              </div>

              <div className="flex md:hidden ml-4">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="inline-flex items-center justify-center rounded-md p-2 text-gray-200 hover:bg-blue-700 focus:outline-none"
                >
                  <MenuIcon />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        {drawerList}
      </Drawer>
    </>
  );
};

export default NavBar;
