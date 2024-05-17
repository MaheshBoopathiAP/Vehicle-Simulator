import { NavLink } from 'react-router-dom';

const Sidebar = () => (
  <div className="sidebar">
    <div className="sidebar-list">
      <NavLink exact to="/" activeClassName="active">Home</NavLink>
      <NavLink to="/Scenario/add" activeClassName="active">Add Scenario</NavLink>
      <NavLink to="/scenarios" activeClassName="active">All Scenarios  </NavLink>
      <NavLink to="/Vehicle/add" activeClassName="active">Add Vehicle</NavLink>
    </div>
  </div>
);

export default Sidebar;
