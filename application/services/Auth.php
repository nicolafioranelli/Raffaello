<?php
/**
 * Developer:   Andrea Civita
 * Web-site:    http://www.andreacivita.it
 * GitHub:      https://github.com/andreacivita/
 */
class Application_Service_Auth
{
    protected $_utenteModel;
    protected $_auth;
    public function __construct()
    {
        $this->_utenteModel = new Application_Model_Utente();
    }

    public function authenticate($dati)
    {
       
        $adapter = $this->getAuthAdapter($dati);
        $auth    = $this->getAuth();
        $result  = $auth->authenticate($adapter);
        if (!$result->isValid()) {
            return false;
        }
        $user = $this->_utenteModel->getUtenteByUsernamePassword($dati['username'],$dati['password']);
        $auth->getStorage()->write($user);
        return true;
    }

    public function getAuth()
    {
        
        if (null === $this->_auth) {
            $this->_auth = Zend_Auth::getInstance();
        }
        return $this->_auth;
    }

    public function getIdentity()
    {
        $auth = $this->getAuth();
        if ($auth->hasIdentity()) {
            return $auth->getIdentity();
        }
        return false;
    }

    public function clear()
    {
        $this->getAuth()->clearIdentity();
    }

    public function getAuthAdapter($values)
    {
        
        $authAdapter = new Zend_Auth_Adapter_DbTable(
            Zend_Db_Table_Abstract::getDefaultAdapter(),
            'utente',
            'username',
            'password'
        );
        $authAdapter->setIdentity($values['username']);
        $authAdapter->setCredential($values['password']);
        return $authAdapter;
    }
}