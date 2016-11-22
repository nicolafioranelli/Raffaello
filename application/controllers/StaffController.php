<?php

class StaffController extends Zend_Controller_Action
{

    protected $_authService;
    protected $utenteCorrente;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo",$this->utenteCorrente->current()->ruolo);
    }

    public function indexAction()
    {

    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index","public");
    }


}



