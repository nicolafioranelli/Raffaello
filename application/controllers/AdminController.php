<?php

class AdminController extends Zend_Controller_Action
{

    protected $_authService = null;

    protected $utenteCorrente = null;

    protected $formFaq = null;

    protected $formUtente = null;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo", $this->utenteCorrente->current()->ruolo);
        //FAQ
        $this->view->assign("formFaq", $this->inseriscifaqAction());
        if ($this->hasParam("faq"))
            $this->view->assign("formFaq", $this->modificafaqAction());
        //UTENTI
        if ($this->hasParam("utente"))
            $this->view->assign("formUtente", $this->modificautenteAction());

    }

    public function indexAction()
    {
    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index", "public");
    }

    public function visualizzafaqAction()
    {
        $faqModel = new Application_Model_Faq();
        $this->view->assign("faqSet", $faqModel->elencoFaq());
    }

    public function modificafaqAction()
    {
        if ($this->hasParam("faq")) {
            $faqModel = new Application_Model_Faq();
            $idFaq = $this->getParam("faq");
            $datiFaq = $faqModel->elencoFaqById($idFaq)->current()->toArray();
            $this->formFaq = new Application_Form_DatiFaq();
            $this->formFaq->setAction($this->_helper->url->url(array(
                'controller' => 'admin',
                'action' => 'modificafaqpost',
                'faq' => $idFaq),
                null, true
            ));
            $this->formFaq->populate($datiFaq);
            return $this->formFaq;
        }
    }

    public function modificafaqpostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('modificafaq');
        }
        $form = $this->formFaq;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('modificafaq');
        }
        $datiform = $this->formFaq->getValues();
        $faqmodel = new Application_Model_Faq();
        $id = $this->getParam("faq"); //prendo la faq inserito nella form

        $faqmodel->aggiornaFaq($datiform, $id);
        $this->_helper->redirector("visualizzafaq", "admin");
    }

    public function eliminafaqAction()
    {
        if ($this->hasParam("faq")) {
            $faqModel = new Application_Model_Faq();
            $idFaq = $this->getParam("faq");
            $faqModel->eliminaFaq($idFaq);
            $this->_helper->redirector("visualizzafaq", "admin");
        }
    }

    public function inseriscifaqAction()
    {
        $this->formFaq = new Application_Form_DatiFaq();
        $this->formFaq->setAction($this->_helper->url->url(array(
            'controller' => 'admin',
            'action' => 'inseriscifaqpost'),
            null, true
        ));
        return $this->formFaq;
    }

    public function inseriscifaqpostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('inseriscifaq');
        }
        $form = $this->formFaq;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('inseriscifaq');
        }
        $datiform = $this->formFaq->getValues();
        $faqmodel = new Application_Model_Faq();

        $faqmodel->inserisciFaq($datiform);
        $this->_helper->redirector("visualizzafaq", "admin");
    }

    public function visualizzautentiAction()
    {
        $utentiModel = new Application_Model_Utente();
        $this->view->assign("utentiSet", $utentiModel->elencoUtente());
    }

    public function modificautenteAction()
    {
        if ($this->hasParam("utente")) {
            $utentiModel = new Application_Model_Utente();
            $idUtente = $this->getParam("utente");
            $datiUtente = $utentiModel->elencoUtenteById($idUtente)->current()->toArray();
            $this->view->assign('utentiSet', $datiUtente);
            $this->formUtente = new Application_Form_DatiUtente();
            $this->formUtente->setAction($this->_helper->url->url(array(
                'controller' => 'admin',
                'action' => 'modificautentepost',
                'utente' => $idUtente),
                null, true
            ));
            $datiUtente['nascita']= substr($datiUtente['nascita'],8,2) ."/" .substr($datiUtente['nascita'],5,2)."/". substr($datiUtente['nascita'],0,4);
            $this->formUtente->populate($datiUtente);
            return $this->formUtente;
        }
    }

    public function modificautentepostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('modificautente');
        }
        $form = $this->formUtente;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('modificautente');
        }
        $datiform = $this->formUtente->getValues();
        if ($datiform['password'] == ""){
            unset($datiform['password']);
        }
        $datiform['Nome']=strtolower($datiform['Nome']);
        $datiform['Cognome']=strtolower($datiform['Cognome']);
        $datiform['nascita']= substr($datiform['nascita'],6,4) ."-" .substr($datiform['nascita'],3,2)."-". substr($datiform['nascita'],0,2);
        $utentemodel = new Application_Model_Utente();
        $id = $this->getParam("utente"); //prendo la faq inserito nella form

        $utentemodel->aggiornaUtente($datiform, $id);
        $this->_helper->redirector("visualizzautenti", "admin");
    }

    public function eliminautenteAction()
    {
        if ($this->hasParam("utente")) {
            $utenteModel = new Application_Model_Utente();
            $idUtente = $this->getParam("utente");
            $utenteModel->eliminaUtente($idUtente);
            $this->_helper->redirector("visualizzautenti", "admin");
        }
    }


}





