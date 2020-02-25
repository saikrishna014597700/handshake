/*   {redirectVar}
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand">Handshake</a>
            </div>
            <ul class="nav navbar-nav">
              <li>
                <div class="active-cyan-3 active-cyan-4 mb-4">
                  <input
                    class="form-control"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                </div>
              </li>
              <li class="li-class">
                <Link to="/home">Jobs</Link>
              </li>
              <li>
                <Link to="/events">Events</Link>
              </li>
              <li>
                <Link to="/QA">Q-A</Link>
              </li>
              <li>
                <Link to="/student">Students</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
                <Link to="/carriercenter">Carrier Center</Link>
              </li>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
            {navLogin}
          </div>
        </nav>
        {<button
          onClick={this.renderLoginAsStudent.bind(this)}
          class="btn-primaryLanding"
        >
          Login as Student
        </button>
        <br />
        <button
          onClick={this.renderLoginAsCompany.bind(this)}
          class="btn-primaryLanding2"
        > 
          Login as an organization
        </button>}*/
