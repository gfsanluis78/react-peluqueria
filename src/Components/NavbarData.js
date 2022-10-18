import React from 'react'
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as FiIcons from "react-icons/fi";

export const SidebarData = [{

    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome/>,
    cName: "nav-text"
},
{

    title: "Empleados",
    path: "/Empleados",
    icon: <FaIcons.FaUsers/>,
    cName: "nav-text"
},
{

    title: "Trabajos",
    path: "/Trabajos",
    icon: <FaIcons.FaShoppingCart/>,
    cName: "nav-text"
},
{

    title: "Tipos de trabajos",
    path: "/TipoDeTrabajos",
    icon: <FiIcons.FiScissors/>,
    cName: "nav-text"
},
{

    title: "Turnos",
    path: "/Turnos",
    icon: <FaIcons.FaClipboardList/>,
    cName: "nav-text",
},
{title: "Logout",
path: "/Logout",
icon: <FiIcons.FiLogOut/>,
cName: "nav-text"}
]