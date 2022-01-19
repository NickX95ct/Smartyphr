const mongoose = require("mongoose");

const PazienteSchema = mongoose.Schema({
  cognome: String,
  nome: String,
  sesso: String,
  luogoNascita: String,
  dataNascita: Date,
  indirizzoResidenza: String,
  comuneResidenza: String,
  provinciaResidenza: String,
  statoCivile: String,
  figli: Number,
  scolarita: String,
  situazioneLavorativa: String,
  personeRiferimento: String,
  telefono: String,
  dataIngresso: Date,
  indirizzoNascita: String,
  comuneNascita: String,
  provinciaNascita: String,
  cancellato: Boolean,
  dataCancellazione: Date,
  codiceFiscale: String,

  // dimissione: {
  //   typeDimissione: String,
  //   data: Date,
  // },

  // SCHEDA INFERMERISTICA

  schedaInfermeristica: {
    diagnosi: String,
    intolleranzeAlimentari: String,
    allergie: String,
    infezioni: String,
    terapiaAtto: String,
    catetereVescicale: Boolean,
    dataInserimentoCatetereVescicale: Date,
    calibroCatetereVescicale: String,
    diurisiCatetereVescicale: String,
    mezziContenzione: Boolean,
    dimissione: Date,

    schedaBAI: {
      apparatoRespiratorio: String,
      apparatoCircolatorio: String,
      statoCoscienza: String,
      statoDanimo: String,
      mobilita: String,
      apparatoUrinario: String,
      apparatoIntestinale: String,
      apparatoSessuale: String,
      statoCureMucose: String,
      igienePersonale: String,
      supportoParzialeIginePersonale: String,
      vestizione: String,
      supportoParzialeVestizione: String,
      alimentazione: String,
      riposo: String,
    },

    schedaLesioni: {
      stadio1: Boolean,
      stadio2: Boolean,
      stadio3: Boolean,
      stadio4: Boolean,
      varianti1: Boolean,
      varianti2: Boolean,
      varianti3: Boolean,
      varianti4: Boolean,
      varianti5: Boolean,
      varianti6: Boolean,
      varianti7: Boolean,
      varianti8: Boolean,
      occipite: String,
      sterno: String,
      prominenzeVertebrali: String,
      sacro: String,
      pube: String,
      orecchioDx: Boolean,
      orecchioSx: Boolean,
      orecchioVariante: String,
      zigomiDx: Boolean,
      zigomiSx: Boolean,
      zigomiVariante: String,
      clavicoleDx: Boolean,
      clavicoleSx: Boolean,
      clavicoleVarianti: String,
      spallaDx: Boolean,
      spallaSx: Boolean,
      spallaVarianti: String,
      scapoleDx: Boolean,
      scapoleSx: Boolean,
      scapoleVarianti: String,
      costatoDx: Boolean,
      costatoSx: Boolean,
      costatoVarianti: String,
      cresteIliacheDx: Boolean,
      cresteIliacheSx: Boolean,
      cresteIliacheVarianti: String,
      troncatieriDx: Boolean,
      troncatieriSx: Boolean,
      troncatieriVarianti: String,
      prominenzeIschiatricheDx: Boolean,
      prominenzeIschiatricheSx: Boolean,
      prominenzeIschiatricheVarianti: String,
      ginocchioDx: Boolean,
      ginocchioSx: Boolean,
      ginocchioVarianti: String,
      malleoliTribialiMedialiDx: Boolean,
      malleoliTribialiMedialiSx: Boolean,
      malleoliTribialiMedialiVarianti: String,
      malleoliTribialiLateraliDx: Boolean,
      malleoliTribialiLateraliSx: Boolean,
      malleoliTribialiLateraliVarianti: String,
      dorsoPiedeDx: Boolean,
      dorsoPiedeSx: Boolean,
      dorsoPiedeVarianti: String,
      talloniDx: Boolean,
      talloniSx: Boolean,
      talloniVarianti: String,
      descrizione: String,
    },
    schedaLesioniDecubito: {
      protocolloFisiologicaRigerLattato: String,
      protocolloFlittene: String,
      escara: String,
      emorragica: String,
      essudativaNecroticaFibbrinosa: String,
      cavitaria: String,
      granuleggiante: String,
      infetta: String,
    },
    schedaMnar: {
      peso: String,
      statura: String,
      punteggioA: String,
      punteggioB: String,
      punteggioC: String,
      punteggioD: String,
      punteggioE: String,
      punteggioF1: String,
      punteggioF2: String,
      punteggioScreening: String,
    },
    schedaUlcere: {
      indiceNorton: String,
      totale: String,
    },
    schedaVas: {
      punteggio: String,
    },
    schedaUlcereDiabete: {
      descrizione: String,
      valutazione: String,
      conclusione: String,
    },
    schedaDiario: {
      diario: [{ data: Date, valore: String, firma: String }],
    },
    schedaInterventi: [
      {
        data: Date,
        diagnosi: String,
        obiettivi: String,
        intervento: String,
        firma: String,
      },
    ],
  },

  // CARTELLA CLINICA

  schedaClinica: {
    schedaAnamnesiFamigliare: {
      ipertensione: Boolean,
      diabete: Boolean,
      malatCardiovascolari: Boolean,
      malatCerebrovascolari: Boolean,
      demenza: Boolean,
      neoplasie: Boolean,
      altro: Boolean,
      testoAltro: String,
      antitetanica: Boolean,
      antiepatiteB: Boolean,
      antinfluenzale: Boolean,
      altre: Boolean,
      testoAltre: String,
      attLavorative: String,
      scolarita: String,
      servizioMilitare: String,
      menarca: String,
      menopausa: String,
      attFisica: String,
      alimentazione: String,
      alvo: String,
      diurisi: String,
      alcolici: String,
      fumo: String,
      sonno: String,
    },

    schedaAnamnesiPatologica: {
      anamnesiRemota: String,
      anamnesiProssima: String,
      terapiaDomicilio: String,
      reazioneAFarmaci: String,
    },

    schedaEsameGenerale: {
      tipocostituzionale: String,
      condizionigenerali: String,
      nutrizione: String,
      cute: String,
      sistemalinfo: String,
      capocollo: String,
      protesi: String,
      apparatourogenitale: String,
      apparatomuscholoscheletrico: String,
      apparatocardio: String,
      frequenza: String,
      pressionearteriosa: String,
      polsiarteriosi: String,
      apparatorespiratorio: String,
      addome: String,
      fegato: String,
      milza: String,
    },

    schedaEsameNeurologia: {
      facies: String,
      stato_coscienza: String,
      stato_emotivo: String,
      comportamento: String,
      linguaggio: String,
      concentrazione: String,
      disturbi_pensiero: String,
      orientamentopersonale: String,
      orientamentotemporale: String,
      orientamentospaziale: String,
      stazioneeretta: String,
      seduto: String,
      altreanomalie: String,
      romberg: String,
      olfatto: String,
      pupille: String,
      visus: String,
      campovisivo: String,
      fondooculare: String,
      movimentioculari: String,
      masticazione: String,
      motilitafacciale: String,
      funzioneuditiva: String,
      funzionevestibolare: String,
      motilitafaringea: String,
      trofismo: String,
      articolazioneparola: String,
      annotazioni: String,
      tono: String,
      forza: String,
      coordinazione: String,
      riflessiosteotendinei: String,
      sensibilitasuper: String,
      sensibilitaprofonda: String,
      funzionicerebellari: String,
      funzioniextrapirabidali: String,
      segnimeningei: String,
      sfinteri: String,
      annotazioniriflessi: String,
    },
    schedaValutazioneTecniche: {
      valsociale: String,
      valeducativa: String,
      valpsicologica: String,
      valmotoria: String,
    },
    schedaMezziContenzione: {
      usomezzi: String,
      spondine: Boolean,
      pozizionespondine: String,
      pelvica: Boolean,
      pettorina: Boolean,
      cinturaaddominale: Boolean,
      cinturaletto: Boolean,
      fermabraccio: Boolean,
      posizionefermabraccio: String,
      tavolinocarrozzina: Boolean,
      posizionepresenzaconsenso: String,
      datainizioingresso: Boolean,
      datainizio: String,
      motivo: String,
      tempi: String,
      durata: String,
      interruzione: String,
      motivointerruzione: String,
    },

    schedaDecessoOspite: {
      relazionedecesso: String,
    },

    schedaDimissioneOspite: {
      relazionedimissione: String,
      terapiainatto: String,
    },
  },

  
      

      // CARTELLA ASS SOCIALE

      schedaAssSociale: {
        valutazioneSociale: {
          valutazione: String,
        },

        indiceSocializzazione: {
          adattamentoSociale: String,
          relAmicizia: String,
          integrazioneGruppo: String,
          gradoDisp: String,
          rapportoFamiglia: String,
          attivitaSociale: String,
          attivitaRSA: String,
          data: Date,
          totale: Number,
        },
      },

<<<<<<< HEAD

  // CARTELLA ASS SOCIALE 

  schedaAssSociale: {
    
    valutazioneSociale: {
      valutazione: String,
    },

    indiceSocializzazione: {
      adattamentoSociale: String,
      relAmicizia: String,
      integrazioneGruppo: String,
      gradoDisp: String,
      rapportoFamiglia: String,
      attivitaSociale: String,
      attivitaRSA: String,
      data: Date,
      totale: Number
    },  
  },



  // CARTELLA EDUCATIVA 

  schedaEducativa: {
    
    valutazioneEducativa: {
      valutazione: String,
    },

    schedaSocializzazione: {
      compagnia: String,
      interesse: String,
      iniziativa: String,

      hobbyScrittura: Boolean,
      hobbyBallo: Boolean,
      hobbyBricolage: Boolean,
      hobbyLettura: Boolean,
      hobbyPittura: Boolean,
      hobbyDisegno: Boolean,
      hobbyAttMotoria: Boolean,
      hobbyGiochi: Boolean,
      hobbyTV: Boolean,
      hobbyCucina: Boolean,

      hobbyAltro: String
    },  


    ADL: {
      A: String,
      B: String,
      C: String,
      D: String,
      E: String,
      F: String,
      totale: Number
    },  

    IADL: {
      A: String,
      B: String,
      C: String,
      D: String,
      E: String,
      F: String,
      G: String,
      H: String,
      totale: Number
    },  




  },




// SCHEDA PSICOLOGICA

schedaPisico: {
  esame: {
    statoEmotivo: [String],
    personalita: [String],
    linguaggio: [String],
    memoria: [String],
    orientamento: [String],
    abilitaPercettivo: [String],
    abilitaEsecutive: [String],
    ideazione: [String],
    umore: [String],



=======
      // CARTELLA EDUCATIVA

      schedaEducativa: {
        valutazioneEducativa: {
          valutazione: String,
        },

        schedaSocializzazione: {
          compagnia: String,
          interesse: String,
          iniziativa: String,

          hobbyScrittura: Boolean,
          hobbyBallo: Boolean,
          hobbyBricolage: Boolean,
          hobbyLettura: Boolean,
          hobbyPittura: Boolean,
          hobbyDisegno: Boolean,
          hobbyAttMotoria: Boolean,
          hobbyGiochi: Boolean,
          hobbyTV: Boolean,
          hobbyCucina: Boolean,

          hobbyAltro: String,
        },

        ADL: {
          A: String,
          B: String,
          C: String,
          D: String,
          E: String,
          F: String,
          totale: Number,
        },

        IADL: {
          A: String,
          B: String,
          C: String,
          D: String,
          E: String,
          F: String,
          G: String,
          H: String,
          totale: Number,
        },
      },
>>>>>>> a56dde9c16fa31cef2c484dace30ad088b0c9a51
      partecipazioni: String,
      ansia: String,
      testEsecutivi: String,
    },
    valutazione: String,
    diario: [{ data: Date, valore: String, firma: String }],
  },

  // VALUTAZIONE MOTORIA
  valutazioneMotoria: {
    valutazione: String,
    dimissione: String,
    dimissioneDate: Date,
  },

  
});

module.exports = mongoose.model("Pazienti", PazienteSchema, "pazienti");
