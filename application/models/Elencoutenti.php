<?php

class Application_Model_Elencoutenti
{
    protected $tabella;

    public function __construct()
    {
        $this->tabella = new Application_Model_DbTable_Elencoutenti();
    }

    public function ricercaUtente($stringa){
        $sql = $this->tabella->select()
                             ->where("nomecompleto LIKE '$stringa' OR nome LIKE '$stringa' OR cognome LIKE '$stringa'")
                             ->order("nomecompleto ASC");
        return $this->tabella->fetchAll($sql);
    }

    public function getTabella()
    {
        return $this->tabella;
    }

}

