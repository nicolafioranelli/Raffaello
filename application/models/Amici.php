<?php

class Application_Model_Amici
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Amici();
    }

    public function inserisciAmici()
    {

    }

    public function aggiornaAmici($dati, $id)
    {
        return $this->tabella->update($dati, "id_amici = '$id'");
    }

    public function eliminaAmici()
    {

    }

    public function elencoAmici()
    {

    }

    public function elencoAmiciById($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("ricevente =  ? ",$id)->where("stato = 'standby'"));
    }

}

