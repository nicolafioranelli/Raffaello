<?php

class AdminController extends Zend_Controller_Action
{

    protected $_authService = null;

    protected $utenteCorrente = null;

    protected $formFaq;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo",$this->utenteCorrente->current()->ruolo);
        if($this->hasParam("faq"))
            $this->view->assign("formFaq",$this->modificafaqAction());
    }

    public function indexAction()
    {
    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index","public");
    }

    public function visualizzafaqAction()
    {
        $faqModel = new Application_Model_Faq();
        $this->view->assign("faqSet", $faqModel->elencoFaq());
    }

    public function modificafaqAction()
    {
        if($this->hasParam("faq")) {
            $faqModel = new Application_Model_Faq();
            $idFaq = $this->getParam("faq");
            $datiFaq = $faqModel->elencoFaqById($idFaq)->current()->toArray();
            $this->formFaq = new Application_Form_DatiFaq();
            $this->formFaq->setAction($this->_helper->url->url(array(
                'controller' => "admin",
                'action' => 'modificafaqpost',
                 null, true
            )));
            $this->formFaq->populate($datiFaq);
            return $this->formFaq;
        }

    }

    public function modificafaqpostAction()
    {
        //echo "arrivato"; phpinfo(); die;

        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('modificafaq');
        }
        $form = $this->formFaq;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('modificafaq');
        }
        else
        {
            $datiform=$this->formFaq->getValues();
            $faqmodel=new Application_Model_Faq();
            $id=$datiform['faq']; //prendo la faq inserito nella form

                $faqmodel->aggiornaFaq($datiform, $id);
                $this->render('index');

        }

    }


}





















