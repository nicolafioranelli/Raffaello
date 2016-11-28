<?php

class UserController extends Zend_Controller_Action
{

    protected $_authService = null;

    protected $utenteCorrente = null;

    protected $nuovoblogForm = null;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo", $this->utenteCorrente->current()->ruolo);
        $this->view->assign("nome", $this->utenteCorrente->current()->nome);
        $this->view->assign('nuovoblogForm', $this->inserimentoprimoblogAction());

    }

    public function indexAction()
    {
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $blogModel = new Application_Model_Blog();

        if ($blogModel->esistenzaBlog($idUtente)) {
            $datiblog = $blogModel->elencoBlogByUtente($idUtente);
            $this->view->assign("blogSet", $datiblog);
            $postModel = new  Application_Model_Post();
            $commentoModel = new Application_Model_Commento();
            if ($postModel->esistenzaPost($idUtente)) {
                $datipost = $postModel->elencoPostById($idUtente);
                $this->view->assign('postSet', $datipost);
                $numcommenti = $commentoModel->numeroCommentiByIdUtente($idUtente);
                $this->view->assign('numcom', $numcommenti);
            } else {
                $post = true;
                $this->view->assign('valPost', $post);
            }
        } else {
            $this->_helper->redirector('inserimentoprimoblog', 'user');
        }

    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index", "public");
    }

    public function inserimentoprimoblogAction()
    {
        $this->nuovoblogForm = new Application_Form_NuovoBlog();

        $this->nuovoblogForm->setAction($this->_helper->url->url(array(
            'controller' => 'user',
            'action' => 'inserimentoprimoblogpost'),
            null, true
        ));
        return $this->nuovoblogForm;
    }

    public function inserimentoprimoblogpostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('inserimentonuovoblog');
        }
        $form = $this->nuovoblogForm;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('inserimentonuovoblog');
        }
        $datiform = $this->nuovoblogForm->getValues();
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $datiform['id_utente'] = $idUtente;
        $blogmodel = new Application_Model_Blog();

        $blogmodel->inserisciBlog($datiform);
        $this->_helper->redirector("index", "user");
    }


}







