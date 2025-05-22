import { Link, Navigate } from 'react-router-dom';
import React from 'react';
import GoogleFontLoader from 'react-google-font-loader';
import 'adminbsb-materialdesign/plugins/bootstrap/css/bootstrap.css';
import 'adminbsb-materialdesign/plugins/node-waves/waves.css';
import 'adminbsb-materialdesign/plugins/animate-css/animate.css';
import 'adminbsb-materialdesign/css/style.css';
import AuthHandler from '../utilitati/AuthHandler';
import Config from "../utilitati/Config";

class Login extends React.Component {
  state = {
    username: '',
    password: '',
    showPassword: false,       // nou: toggle password visibility
    btnDisabled: true,
    rememberMe: false,
    loginStatus: 0,
  };

  saveInputs = (event) => {
    const key = event.target.name;
    this.setState({ [key]: event.target.value }, () => {
      if (this.state.username.length > 0 && this.state.password.length > 0) {
        this.setState({ btnDisabled: false });
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  };

  handleInputChange = (event) => {
    const { name, checked } = event.target;
    this.setState({ [name]: checked });
  };

  toggleShowPassword = () => {
    this.setState((prev) => ({ showPassword: !prev.showPassword }));
  };

  formSubmit = (event) => {
    event.preventDefault();
    this.setState({ loginStatus: 1 });
    AuthHandler.login(this.state.username, this.state.password, this.handleAjaxResponse);
  };

  handleAjaxResponse = (data) => {
    console.log(data);
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = Config.acasaUrl;
    }
  };

  getMessages = () => {
    const { loginStatus } = this.state;
    switch (loginStatus) {
      case 1:
        return (
          <div className="alert alert-warning">
            <strong>Conectare!</strong> Te rugăm să aștepți.
          </div>
        );
      case 3:
        return (
          <div className="alert alert-success">
            <strong>Conectat cu succes!</strong>
          </div>
        );
      case 4:
        return (
          <div className="alert alert-danger">
            <strong>Date de conectare invalide!</strong>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    document.body.className = 'login-page';
    const { btnDisabled, showPassword } = this.state;

    return (
      <>
        <GoogleFontLoader
          fonts={[
            { font: 'Roboto', weights: [400, '400i'] },
            { font: 'Roboto Mono', weights: [400, 700] },
          ]}
          subsets={['latin']}
        />
        <GoogleFontLoader
          fonts={[{ font: 'Material+Icons' }]}
        />
        <div className="login-box">
          <div className="logo">
            <a href="#">Sistem<b>Inventar</b></a>
            <small>Sistem Management Inventar</small>
          </div>
          <div className="card">
            <div className="body">
              <form id="sign_in" method="POST" onSubmit={this.formSubmit}>
                <div className="msg">Autentifică-te pentru a începe sesiunea</div>

                {/* Username */}
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">person</i>
                  </span>
                  <div className="form-line">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="Nume utilizator"
                      required
                      autoFocus
                      onChange={this.saveInputs}
                    />
                  </div>
                </div>

                {/* Password with toggle */}
                <div className="input-group">
                  <span className="input-group-addon">
                    <i className="material-icons">lock</i>
                  </span>
                  <div className="form-line" style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="form-control"
                      name="password"
                      placeholder="Parolă"
                      required
                      onChange={this.saveInputs}
                    />
                    <i
                      className="material-icons"
                      onClick={this.toggleShowPassword}
                      style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        cursor: 'pointer',
                        fontSize: '20px',
                        color: '#888'
                      }}
                    >
                      {showPassword ? 'visibility_off' : 'visibility'}
                    </i>
                  </div>
                </div>

                {/* Submit */}
                <div className="row">
                  <div className="col-xs-4 col-xs-offset-4">
                    <button
                      className="btn btn-block bg-pink waves-effect animated-button"
                      type="submit"
                      disabled={btnDisabled}
                    >
                      Conectare
                    </button>
                  </div>
                </div>

                {this.getMessages()}
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Login;
