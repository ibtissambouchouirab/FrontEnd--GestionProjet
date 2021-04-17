import { connect } from "react-redux";
import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import {Navbar,
  Nav,
  NavItem,
  NavLink,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Input,
  Dropdown,
  Collapse,
  DropdownToggle,
  Form,
  FormGroup,
} from "reactstrap";

import { logoutUser } from "../../actions/user";
import { openSidebar, closeSidebar, changeSidebarPosition,changeSidebarVisibility,} from "../../actions/navigation";
import user from "../../images/people/c1.jpg";

import s from "./Header.module.scss";
import "animate.css";

class Header extends React.Component {
  static propTypes = { dispatch: PropTypes.func.isRequired, sidebarPosition: PropTypes.string.isRequired,};

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
    this.onDismiss = this.onDismiss.bind(this);
    this.toggleSupportDropdown = this.toggleSupportDropdown.bind(this);
    this.toggleSettingsDropdown = this.toggleSettingsDropdown.bind(this);
    this.toggleAccountDropdown = this.toggleAccountDropdown.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.toggleSearchOpen = this.toggleSearchOpen.bind(this);

    this.state = {
      visible: true,
      supportOpen: false,
      settingsOpen: false,
      searchFocused: false,
      searchOpen: false,
    };
  }

  onDismiss() {
    this.setState({ visible: false });
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }


  toggleSupportDropdown() {
    this.setState({
      supportOpen: !this.state.supportOpen,
    });
  }

  toggleSettingsDropdown() {
    this.setState({
      settingsOpen: !this.state.settingsOpen,
    });
  }

  toggleAccountDropdown() {
    this.setState({
      accountOpen: !this.state.accountOpen,
    });
  }

  toggleSearchOpen() {
    this.setState({
      searchOpen: !this.state.searchOpen,
    });
  }

  toggleSidebar() {
    this.props.isSidebarOpened
      ? this.props.dispatch(closeSidebar())
      : this.props.dispatch(openSidebar());
  }

  moveSidebar(position) {
    this.props.dispatch(changeSidebarPosition(position));
  }

  toggleVisibilitySidebar(visibility) {
    this.props.dispatch(changeSidebarVisibility(visibility));
  }

  render() {
    return (
      <Navbar className={`d-print-none main-navbar ${s.root}`}>
        <Collapse className={`${s.searchCollapse} ml-lg-0 mr-md-3`} isOpen={this.state.searchOpen} >
          <InputGroup className={`${s.navbarForm} ${this.state.searchFocused ? s.navbarFormFocused : ""}`}>
            <InputGroupAddon addonType="prepend" className={s.inputAddon}>
              <InputGroupText>
                <i className="fa fa-search" />
              </InputGroupText>
            </InputGroupAddon>
            <Input id="search-input-2" placeholder="Search..." className="input-transparent" onFocus={() => this.setState({ searchFocused: true })} onBlur={() => this.setState({ searchFocused: false })}/>
          </InputGroup>
        </Collapse>
        <Form className="d-md-down-none mr-3 ml-3" inline>
          <FormGroup>
            <InputGroup className="input-group-no-border">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="fa fa-search text-white" />
                </InputGroupText>
              </InputGroupAddon>
              <Input id="search-input" className="input-transparent"placeholder="Search"/>
            </InputGroup>
          </FormGroup>
        </Form>
        <Nav className="ml-md-0 d-flex nav-responsive">
          <Dropdown nav  toggle={this.toggleNotifications} id="basic-nav-dropdown" className={`${s.notificationsMenu}`}style={{ marginRight: "auto" }}>
            <DropdownToggle nav caret style={{ color: "#f4f4f5", padding: 2 }}>
              <span className={`${s.avatar} rounded-circle thumb-sm float-left mr-2`}>
                <img src={user} alt="..." />
              </span>
              <span className={`small ${s.accountCheck}`}>User name </span>
            </DropdownToggle>
          </Dropdown>
          <NavItem className="d-lg-none d-md-block d-sm-none">
            <NavLink onClick={this.toggleSearchOpen} className={s.navItem} href="#">
              <i className="glyphicon glyphicon-search" />
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink onClick={this.doLogout} className={`${s.navItem} text-white`} href="#">
              <i className="glyphicon glyphicon-off" />
            </NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

function mapStateToProps(store) {
  return {
    isSidebarOpened: store.navigation.sidebarOpened,
    sidebarVisibility: store.navigation.sidebarVisibility,
    sidebarPosition: store.navigation.sidebarPosition,
  };
}

export default withRouter(connect(mapStateToProps)(Header));
