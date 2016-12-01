<?php

class Application_Model_Amici
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Amici();
    }

    public function inserisciAmici($dati)
    {
        return $this->tabella->insert($dati);
    }

    public function aggiornaAmici($dati, $id)
    {
        return $this->tabella->update($dati, "id_amici = '$id'");
    }

    public function eliminaAmici($id, $id2)
    {
        $this->tabella->delete("richiedente = '$id' AND ricevente = '$id2'");
        $this->tabella->delete("richiedente = '$id2' AND ricevente = '$id'");
    }


    public function elencoAmici($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("ricevente =  '$id' OR richiedente ='$id'")->where("stato = 'accepted'"));
    }

    public function elencoAmiciById($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("ricevente =  ? ", $id)->where("stato = 'standby'"));
    }

    public function elencoRichiestaPresente($idricevente, $idrichiedente)
    {
        return $risultato = $this->tabella->fetchAll($this->tabella->select()->where("ricevente =  ? ", $idricevente)->where("richiedente = ? ", $idrichiedente)->order("data DESC"));

    }

}

