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
        $this->tabella->find($id);
    }

}

