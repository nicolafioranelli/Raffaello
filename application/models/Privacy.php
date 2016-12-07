<?php

class Application_Model_Privacy
{

    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Privacy();
    }

    public function inserisciPrivacy($dati)
    {
        return $this->tabella->insert($dati);
    }

    public function modificaPrivacy($dati, $id)
    {
        return $this->tabella->update($dati, "id_amico = '$id'");
    }

    public function eliminaPrivacy($id)
    {
        $this->tabella->delete("id_privacy = '$id'");
    }

    public function elencoPrivacyCorrente($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("id_blog = ?", $id));
    }

    public function elencoPrivacyUtente($id)
    {
        return $this->tabella->fetchAll($this->tabella->select()->where("id_amico = ?", $id));
    }

    public function elencoPrivacyProfilo($blog, $amico){
        return $this->tabella->fetchAll($this->tabella->select()->where("id_blog = $blog")->where("id_amico = $amico"));
    }

}

