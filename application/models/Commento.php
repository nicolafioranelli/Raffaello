<?php

class Application_Model_Commento
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Commento();
    }

    public function inserisciCommento($dati){
        return $this->tabella->insert($dati);
    }

    public function aggiornaCommento($dati, $id){
        return $this->tabella->update($dati, "id_commento = '$id'");
    }

    public function eliminaCommento($id){
        return $this->tabella->delete("id_commento = '$id'");
    }

    public function elencoCommento(){
        return $this->tabella->fetchAll();
    }

    public function elencoCommentoById($id){
        return $this->tabella->find($id);
    }

    public function numeroCommentiByIdUtente($id){
        $sql = $this->tabella->select()->where("id_post = ?", $id);
        $risultato = $this->tabella->fetchAll($sql);
        return count($risultato);
    }

}

