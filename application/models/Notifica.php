<?php

class Application_Model_Notifica
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Notifica();
    }

    public function inserisciNotifica($dati)
    {
        return $this->tabella->insert($dati);
    }

    public function aggiornaNotifica($dati, $id)
    {
        return $this->tabella->update($dati, "id_notifica = '$id'");
    }

    public function eliminaNotifica($id)
    {
        $this->tabella->delete("id_notifica = '$id''");
    }

    public function elencoNotifica($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("id_amico = ?", $id)->order('id_notifica DESC'));
    }

}

