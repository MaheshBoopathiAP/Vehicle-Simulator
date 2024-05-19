import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-list">
      <NavLink exact="true" to="/" activeclassname="active">Home</NavLink>
      <NavLink to="/Scenario/add" activeclassname="active">Add Scenario</NavLink>
      <NavLink to="/scenarios" activeclassname="active">All Scenarios</NavLink>
      <NavLink to="/Vehicle/add" activeclassname="active">Add Vehicle</NavLink>
    </div>
  </div>
);

export default Sidebar;
