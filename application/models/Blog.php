<?php

class Application_Model_Blog
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Blog();
    }

    public function inserisciBlog($dati){
        return $this->tabella->insert($dati);
    }

    public function aggiornaBlog($dati, $id){
        return $this->tabella->update($dati, "id_blog = '$id'");
    }

    public function eliminaBlog($id){
        return $this->tabella->delete("id_blog = '$id'");
    }

    public function elencoBlogById($id){
        return $this->tabella->find($id);
    }

}

