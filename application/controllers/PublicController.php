<?php

class PublicController extends Zend_Controller_Action
{

    protected $registratiForm = null;

    protected $loginForm = null;
    protected $_authService;
    protected $utenteCorrente;


    public function init()
    {
        $this->view->assign("registratiForm", $this->registerAction());
        $this->view->assign("loginForm", $this->loginAction());
        $this->_authService = new Application_Service_Auth();
    }

    public function indexAction()
    {
    }

    public function faqAction()
    {
        $faqModel = new Application_Model_Faq();
        $this->view->assign("faqSet", $faqModel->elencoFaq());
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
            'default', null
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
        } else {
            $datiform = $this->registratiForm->getValues();
            $datiform['Nome'] = strtolower($datiform['Nome']);
            $datiform['Cognome'] = strtolower($datiform['Cognome']);
            $datiform['ruolo'] = "user";
            $generic='01.jpg';
            if ($datiform['image']=='')
                $datiform['image']=$generic;
            $utentemodel = new Application_Model_Utente();
            $username = $datiform['username']; //prendo l'username inserito nella form
            if ($utentemodel->esistenzaUsername($username)) //controllo se l'username inserito esiste già nel db
            {
                $form->setDescription('Attenzione: l\'username che hai scelto non è disponibile.');
                return $this->render('register');
            } else {
                $utentemodel->inserisciUtente($datiform);
                $this->render('index');
            }
        }
    }

    public function autenticazioneAction()
    {
        $request = $this->getRequest();

        if (!$request->isPost()) {
            return $this->_helper->redirector('login');
        }
        $form = $this->loginForm;
        if (!$form->isValid($request->getPost())) {

            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('login');
        }


        if (false === $this->_authService->authenticate($form->getValues())) {
            $form->setDescription('Autenticazione fallita. Riprova');
            return $this->render('login');
        }

        return $this->_helper->redirector('index', $this->_authService->getIdentity()->current()->ruolo);

    }


}



















