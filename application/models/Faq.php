<?php

class Application_Model_Faq
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Faq();
    }

    public function inserisciFaq($dati){
        return $this->tabella->insert($dati);
    }

    public function aggiornaFaq($dati, $id){
        return $this->tabella->update($dati, "id_faq = '$id'");
    }

    public function eliminaFaq($id){
        return $this->tabella->delete("id_faq = '$id'");
    }

    public function elencoFaq(){
        return $this->tabella->fetchAll();
    }

    public function elencoFaqById($id){
        return $this->tabella->find($id);
    }

}

