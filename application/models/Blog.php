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

    public function elencoBlogByUtente($id){
        $sql = $this->tabella->select()->where("id_utente = ?", $id);
        return $this->tabella->fetchAll($sql);
    }

    public function esistenzaBlog($id){
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

    public function checkBlog($id){
        if(count($this->elencoBlogById($id))==0)
            return false;
        return true;
    }

    public function elencoBlog(){
        return $this->tabella->fetchAll();
    }

}

