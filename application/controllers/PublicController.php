<?php

class PublicController extends Zend_Controller_Action
{

    protected $registratiForm = null;

    protected $loginForm = null;

    public function init()
    {
        $this->view->assign("registratiForm",$this->registerAction());
        $this->view->assign("loginForm",$this->loginAction());
    }

    public function indexAction()
    {
    }

    public function faqAction()
    {
        $faqModel = new Application_Model_Faq();
        $this->view->assign("faqSet",$faqModel->elencoFaq());
    }

    public function termsAction()
    {
    }

    public function contactsAction()
    {
    }

    public function loginAction()
    {
        $this->loginForm = new Application_Form_Login();
        $this->loginForm->setAction($this->_helper->url->url(array(
            'controller' => "public",
            'action' => 'autenticazione',
            'default'
        )));
        return $this->loginForm;
    }

    public function registerAction()
    {
        $this->registratiForm = new Application_Form_Registrati();
        $this->registratiForm->setAction($this->_helper->url->url(array(
            'controller' => "public",
            'action' => 'verifica',
            'default'
        )));
        return $this->registratiForm;
    }

    public function verificaAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('register');
        }
        $form = $this->registratiForm;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('register');
        }
        else
        {
            $datiform=$this->registratiForm->getValues();
            $datiform['ruolo']="utente";
            $utentemodel=new Application_Model_Utente();
            $username=$this->controllaParam('username'); //prendo l'username inserito nella form
            if($utentemodel->esistenzaUsername($username)) //controllo se l'username inserito esiste già nel db
            {
                $form->setDescription('Attenzione: l\'username che hai scelto non è disponibile.');
                return $this->render('register');
            }
            else{
                $utentemodel->inserisciUtente($datiform);
                $this->render('index');
            }
        }
    }

    /*public function autenticazioneAction()
    {
        $request = $this->getRequest();

        if (!$request->isPost()) {
            return $this->_helper->redirector('login');
        }
        $form = $this->loginForm;
        if(!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('login');
        }
        if (false === $this->_authService->authenticate($form->getValues())) {
            $form->setDescription('Autenticazione fallita. Riprova');
            return $this->render('loginutente');
        }
        return $this->_helper->redirector('index','livello'.$this->_authService->getIdentity()->current()->livello);
    }*/

    public function controllaParam($param)
    {
        $parametro=0;
        if($this->hasParam("$param"))
            $parametro=$this->getParam("$param");
        return $parametro;
    }

}



















