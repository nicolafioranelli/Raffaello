<?php

class Application_Model_Post
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Post();
    }

    public function inserisciPost($dati){
        return $this->tabella->insert($dati);
    }

    public function aggiornaPost($dati, $id){
        return $this->tabella->update($dati, "id_post = '$id'");
    }

    public function eliminaPost($id){
        return $this->tabella->delete("id_post = '$id'");
    }

    public function elencoPost(){
        return $this->tabella->fetchAll();
    }

    public function elencoPostById($id){
        $sql = $this->tabella->select()->where("id_utente = ?", $id);
        return $this->tabella->fetchAll($sql);
    }

    public function elencoPostByIdBlog($id){
        $sql = $this->tabella->select()->where("id_blog = ?", $id)->order("data DESC");
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

    public function esistenzaPostByBlog($id){
        $sql = $this->tabella->select()->where("id_blog = ?", $id);
        $risultato = $this->tabella->fetchAll($sql);
        $rowCount = count($risultato);
        if ($rowCount > 0)
            return true;
         else
            return false;
    }

    public function elencoPostByIdPost($id){
        $sql = $this->tabella->select()->where("id_post = ?", $id);
        return $this->tabella->fetchAll($sql);
    }

}

