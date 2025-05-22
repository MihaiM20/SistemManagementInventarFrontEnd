import React from 'react';
import APIHandler from '../utilitati/APIHandler';

class ComponentaCerereClient extends React.Component {
  constructor(props) {
    super(props);
    this.formSubmit = this.formSubmit.bind(this);
    this.fetchDateCerereClient = this.fetchDateCerereClient.bind(this);
    this.handleDelete = this.handleDelete.bind(this);         // <<< adăugat
    this.formRef = React.createRef();
  }

  state = {
    errorRes: false,
    errorMessage: "",
    btnMessage: 0,
    sendData: false,
    dateCerereClientList: [],
    dataLoaded: false,
    completeLoading: false,
    deleteLoading: false
  }

  // legăm corect this și prindem erorile
async formSubmit(event) {
  event.preventDefault();
  this.setState({ btnMessage: 1 });

  try {
    const response = await APIHandler.saveDateCerereClient(
      event.target.nume_client.value,
      event.target.telefon.value,
      event.target.detalii_produs.value
    );
    console.log(response);

    this.setState({
      btnMessage: 0,
      errorRes: response.data.error,
      errorMessage: response.data.message,
      sendData: true
    }, async () => {
      // 1) Reîncarcă lista de cereri imediat după succes
      await this.fetchDateCerereClient();
      // 2) Golește formularul pentru următoarea introducere
      this.formRef.current.reset();
    });
  } catch (err) {
    console.error("Eroare la salvare:", err);
    this.setState({
      btnMessage: 0,
      errorRes: true,
      errorMessage: err.response?.data?.message || "A apărut o eroare",
      sendData: true
    });
  }
}


  componentDidMount(){
    this.fetchDateCerereClient();
  }

  async fetchDateCerereClient(){
    // APIHandler e instanță, fără new
    const dateCerereClient = await APIHandler.fetchAllCereriClient();
    console.log(dateCerereClient);
    this.setState({dateCerereClientList: dateCerereClient.data.data});
    this.setState({dataLoaded: true});
  }

  completeazaDetaliiCerereClient = (id_client) => {
    // setează flag și redirecționează
    this.setState({ completeLoading: true }, () => {
      window.location = `/generareFactura?cerereId=${id_client}`;
    });
  }

    async handleDelete(id_client) {
    const ok = window.confirm('Sigur vrei să ștergi această cerere?');
    if (!ok) return;

    this.setState({ deleteLoading: true });
    try {
      await APIHandler.deleteCerereClient(id_client);
      await this.fetchDateCerereClient();   // reîncarcă lista după ștergere
    } catch (err) {
      alert('Eroare la ștergere: ' + (err.response?.data?.message || err.message));
    } finally {
      this.setState({ deleteLoading: false });
    }
  }

  render() {
    const { btnMessage, errorRes, sendData, errorMessage } = this.state;

    return (
      <section className="content">
        <div className="container-fluid">
          <div className="block-header">
            <h2>Gestionează cerere client</h2>
          </div>

          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  <h2>Detalii cerere</h2>
                </div>
                <div className="body">
                  <form onSubmit={this.formSubmit} ref={this.formRef}>
                    <label htmlFor="nume">Nume Client</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="nume_client"
                          name="nume_client"
                          className="form-control"
                          placeholder="Introdu numele clientului"
                        />
                      </div>
                    </div>

                    <label htmlFor="telefon">Telefon</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="telefon"
                          name="telefon"
                          className="form-control"
                          placeholder="Introdu numarul de telefon"
                        />
                      </div>
                    </div>

                    <label htmlFor="detalii_produs">Detalii Produs</label>
                    <div className="form-group">
                      <div className="form-line">
                        <input
                          type="text"
                          id="detalii_produs"
                          name="detalii_produs"
                          className="form-control"
                          placeholder="Introdu detaliile produsului"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="col-lg-6 btn btn-block btn-primary wave-effect"
                      disabled={btnMessage !== 0}
                    >
                      {btnMessage === 0
                        ? "Adaugă Cerere Client"
                        : "Cererea se adaugă, te rog așteaptă..."}
                    </button>
                    <br />

                    {sendData && !errorRes && (
                      <div className="alert alert-success">
                        <strong>Succes!</strong> {errorMessage}
                      </div>
                    )}
                    {sendData && errorRes && (
                      <div className="alert alert-danger">
                        <strong>Eroare!</strong> {errorMessage}
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row clearfix">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <div className="card">
                <div className="header">
                  {this.state.dataLoaded === false?(
                <div className="text-center">
                <div className="preloader pl-size-xl">
                                    <div className="spinner-layer">
                                        <div className="circle-clipper left">
                                            <div className="circle"></div>
                                        </div>
                                        <div className="circle-clipper right">
                                            <div className="circle"></div>
                                        </div>
                                    </div>
                                </div>
                                </div>
                                ):""}
                  <h2>
                    Toate comenzile clientilor
                  </h2>
                </div>
                <div className="body table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>#ID</th>
                        <th>Nume client</th>
                        <th>Telefon</th>
                        <th>Detalii Produs</th>
                        <th>Status</th>
                        <th>Data adaugare</th>
                        <th>Acțiuni</th>
                      </tr>
                    </thead>
                    <tbody>
                    {this.state.dateCerereClientList.map((cerereClient) => (
                       <tr key={cerereClient.id}>
                        <td>{cerereClient.id}</td>
                        <td>{cerereClient.nume_client}</td>
                        <td>{cerereClient.telefon}</td>
                        <td>{cerereClient.detalii_produs}</td>
                        <td>{cerereClient.status==0?'In Asteptare':'Completata'}</td>
                        <td>{new Date(cerereClient.data_cerere).toLocaleString('ro-RO')}</td>
                        <td>
                        {cerereClient.status === 0 ? (
                          <>
                            <button
                              className="btn btn-block btn-warning"
                              onClick={() => this.completeazaDetaliiCerereClient(cerereClient.id)}
                              disabled={this.state.completeLoading}
                            >
                              {this.state.completeLoading ? "Redirecționare..." : "Completează"}
                            </button>

                            <button
                              type="button"
                              className="btn btn-block btn-danger m-t-5"
                              onClick={() => this.handleDelete(cerereClient.id)}
                              disabled={this.state.deleteLoading}
                            >
                              {this.state.deleteLoading ? "Se șterge..." : "Șterge cererea"}
                            </button>
                          </>
                        ) : (
                          <button className="btn btn-block btn-success">Completată</button>
                        )}                          
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ComponentaCerereClient;