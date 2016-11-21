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
            //$username=$this->controllaParam('username'); //prendo l'username inserito nella form
            //if($utentemodel->existUsername($username)) //controllo se l'username inserito esiste già nel db
            //{
            //    $form->setDescription('Attenzione: l\'username che hai scelto non è disponibile.');
            //    return $this->render('registrautente');
            //}
            //else{
                $utentemodel->inserisciUtente($datiform);
                $this->_helper->redirector('index');
            //}
        }
    }

    public function controllaParam($parametro){
        
    }

}

















