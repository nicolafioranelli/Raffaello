<?php

class Application_Model_Utente
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Utente();
    }

    public function inserisciUtente($dati){
        return $this->tabella->insert($dati);
    }

    public function aggiornaUtente($dati, $id){
        return $this->tabella->update($dati,"id_utente = '$id'");
    }

    public function eliminaUtente($id){
        return $this->tabella->delete("id_utente = '$id'");
    }

    public function elencoUtente(){
        return $this->tabella->fetchAll();
    }

    public function elencoUtenteById($id){
        return $this->tabella->find($id);
    }

}

