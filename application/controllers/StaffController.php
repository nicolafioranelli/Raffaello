<?php

class StaffController extends Zend_Controller_Action
{

    protected $_authService = null;
    protected $utenteCorrente = null;
    protected $delblogForm = null;
    protected $delpostForm = null;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo", $this->utenteCorrente->current()->ruolo);
    }

    public function indexAction()
    {
        $blogModel = new Application_Model_Blog();
        $blogdata = $blogModel->elencoBlog();
        $dati = array();
        $i = 0;
        foreach ($blogdata as $blog):
            $utenteModel = new Application_Model_Utente();
            $dati[$i]['utente'] = ucwords($utenteModel->elencoUtenteById($blog->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($blog->id_utente)->current()->cognome);
            $dati[$i]['titolo'] = $blog->titolo;
            $dati[$i]['tema'] = $blog->tema;
            $dati[$i]['idblog'] = $blog->id_blog;
            $i++;
        endforeach;
        $this->view->assign("blogSet", $dati);
    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index", "public");
    }

    public function contenutoblogAction()
    {
        if ($this->hasParam('blog')) {
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $idBlog = $this->getParam('blog');
            $postModel = new Application_Model_Post();
            $this->view->assign('postSet', $postModel->elencoPostByIdBlog($idBlog));
            $blogModel = new Application_Model_Blog();
            $this->view->assign('titoloblog', $blogModel->elencoBlogById($idBlog)->current()->titolo);
        }
    }

    public function eliminablogAction()
    {
        if ($this->hasParam('blog') || $this->hasParam('motivazione')) {
            $this->_helper->getHelper('layout')->disableLayout();
            $idBlog = $this->getParam('blog');
            $motivazione = $this->getParam('motivazione');

            $blogModel = new Application_Model_Blog();
            $rowset = $blogModel->elencoBlogById($idBlog);

            $dati = array();
            $dati['id_utente'] = $this->utenteCorrente->current()->id_utente;
            $dati['id_blog'] = $idBlog;
            $dati['id_amico'] = $rowset->current()->id_utente;
            $dati['tipo'] = 3;
            $dati['motivazione'] = $motivazione;
            $notificaModel = new Application_Model_Notifica();
            $notificaModel->inserisciNotifica($dati);

            $result = $blogModel->eliminaBlog($idBlog);
            $this->_helper->json($result);
        }
    }

    public function eliminapostAction()
    {
        $this->_helper->getHelper('layout')->disableLayout();
        if ($this->hasParam('post') || $this->hasParam('motivazione')) {
            $idPost = $this->getParam('post');
            $motivazione = $this->getParam('motivazione');
            $postModel = new Application_Model_Post();
            $rowset = $postModel->elencoPostByIdPost($idPost);
            $blogModel = new Application_Model_Blog();
            $row = $blogModel->elencoBlogById($rowset->current()->id_blog);
            $dati = array();
            $dati['id_utente'] = $this->utenteCorrente->current()->id_utente;
            $dati['id_post'] = $idPost;
            $dati['nome'] = $row->current()->titolo;
            $dati['id_amico'] = $rowset->current()->id_utente;
            $dati['tipo'] = 2;
            $dati['motivazione'] = $motivazione;

            $notificaModel = new Application_Model_Notifica();
            $notificaModel->inserisciNotifica($dati);

            $result = $postModel->eliminaPost($idPost);
            $this->_helper->json($result);
        }
    }
}













