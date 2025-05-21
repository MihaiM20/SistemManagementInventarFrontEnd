import AuthHandler from './AuthHandler';

class Config {
  // URL pentru endpoint-ul de login (obține perechea access + refresh token)
  static loginUrl = "https://sistemmanagementinventarbackend.onrender.com/api/login/";

  // URL pentru endpoint-ul de reîmprospătare a access token-ului
  static refreshApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/refresh_token/";

  // URL de bază pentru operații CRUD pe furnizori
  static furnizorApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/furnizor/";

  // URL pentru datele de tip „dashboard” (pagina de acasă a API-ului)
  static acasaApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/api_acasa/";

  // URL pentru operații CRUD pe cererile clienților
  static cerereClientApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/cerere_client/";

  // URL pentru căutarea produsului după nume
  static numeProdusApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/produsbynume/";

  // URL pentru operații CRUD pe conturile furnizorilor (tranzacții)
  static contfurnizorApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/contfurnizor/";

  // URL pentru operații CRUD pe conturile bancare ale furnizorilor
  static furnizorBancaApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/bancafurnizor/";

  // URL pentru un endpoint care returnează doar datele de bază ale furnizorilor
  static furnizorOnly = "https://sistemmanagementinventarbackend.onrender.com/api/furnizoronly/";

  // URL de bază pentru operații CRUD pe produse
  static produsApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/produs/";

  // URL pentru a obține toți angajații
  static angajatApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/angajat/";

  // URL pentru a prelua salariile unui angajat după ID
  static angajatsalariuByIDApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/angajat_salariuby_id/";

  // URL pentru a prelua conturile bancare ale unui angajat după ID
  static angajatBancaByIDApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/angajat_bancaby_id/";

  // URL pentru endpoint-ul de adăugare salariu (toti_angajati_salariu)
  static angajatSalariuApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/toti_angajati_salariu/";

  // URL pentru endpoint-ul de adăugare cont bancar angajați (toti_angajati_banci)
  static angajatBancaApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/toti_angajati_banci/";

  // URL pentru generarea facturilor prin API
  static generareFacturaApiUrl = "https://sistemmanagementinventarbackend.onrender.com/api/api_generare_factura/";

  // Rute locale pentru navigare în aplicația React
  static acasaUrl = "/acasa";
  static logoutPageUrl = "/logout";

  /**
   * Configurația barei de navigare: se afișează toate tab-urile,
   * exceptând "Gestioneaza Angajat" (index "5") pentru utilizatorii non-admin.
   */
  static get baranavigareObiect() {
    const role = AuthHandler.getUserRole(); // 'admin' sau 'angajat'
    const items = [
      { index: "0", titlu: "Acasa",                  url: "/acasa",                 icons: "home"        },
      { index: "1", titlu: "Furnizori",              url: "/furnizor",              icons: "assessment"  },
      { index: "2", titlu: "Adauga Produse",         url: "/adaugareProdus",        icons: "assessment"  },
      { index: "3", titlu: "Gestioneaza Produse",    url: "/gestionareProdus",      icons: "assessment"  },
      { index: "4", titlu: "Gestioneaza Cont Furnizor", url: "/gestionareContFurnizor", icons: "assessment" },
      { index: "5", titlu: "Gestioneaza Angajat",    url: "/gestionareAngajat",     icons: "assessment"  },
      { index: "6", titlu: "Cerere Client",          url: "/cerereClient",          icons: "assessment"  },
      { index: "7", titlu: "Genereaza Factura",      url: "/generareFactura",       icons: "assessment"  }
    ];
    return items.filter(item => {
      // dacă e tab-ul de gestionare angajați (index 5), afișăm doar pentru admin
      if (item.index === "5") {
        return role === "admin";
      }
      return true;
    });
  }
}

export default Config;
