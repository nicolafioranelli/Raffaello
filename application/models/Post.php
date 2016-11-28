<?php

class Application_Model_Post
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Post();
    }

    public function inserisciPost($dati){
        $this->tabella->insert($dati);
    }

    public function aggiornaPost($dati, $id){
        $this->tabella->update($dati, "id_post = '$id'");
    }

    public function eliminaPost($id){
        $this->tabella->delete("id_post = '$id'");
    }

    public function elencoPost(){
        $this->tabella->fetchAll();
    }

    public function elencoPostById($id){
        $sql = $this->tabella->select()->where("id_utente = ?", $id);
        return $this->tabella->fetchAll($sql);
    }

    public function esistenzaPost($id){
        $sql = $this->tabella->select()->where("id_utente = ?", $id);
        $risultato = $this->tabella->fetchAll($sql);
        $rowCount = count($risultato);
        if ($rowCount > 0) {
            $controllo = true;
        } else {
            $controllo = false;
        }
        return $controllo;
    }

}

