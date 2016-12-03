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
        $this->view->assign("delblogForm", $this->eliminablogAction());
        $this->view->assign("delpostForm", $this->eliminapostAction());
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
        if ($this->hasParam('blog')) {
            $idBlog = $this->getParam('blog');
            $this->delblogForm = new Application_Form_DelblogForm();
            $this->delblogForm->setAction($this->_helper->url->url(array(
                'controller' => 'staff',
                'action' => 'eliminablogverifica',
                'blog' => $idBlog
            )));
            $blogModel = new Application_Model_Blog();
            $this->view->assign('titoloblog', $blogModel->elencoBlogById($idBlog)->current()->titolo);
            return $this->delblogForm;
        }
    }

    public function eliminapostAction()
    {
        if ($this->hasParam('post')) {
            $idPost = $this->getParam('post');
            $this->delpostForm = new Application_Form_DelpostForm();
            $this->delpostForm->setAction($this->_helper->url->url(array(
                'controller' => 'staff',
                'action' => 'eliminapostverifica',
                'post' => $idPost
            )));
            $postModel = new Application_Model_Post();
            $this->view->assign('titolopost', $postModel->elencoPostByIdPost($idPost)->current()->titolo);
            return $this->delpostForm;
        }
    }

    public function eliminapostverificaAction()
    {
        if ($this->hasParam('post')) {
            $request = $this->getRequest();
            if (!$request->isPost()) {
                return $this->_helper->redirector('eliminapost');
            }
            $form = $this->delblogForm;
            if (!$form->isValid($request->getPost())) {
                $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
                return $this->render('eliminapost');
            }

            $idPost = $this->getParam('post');
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
            $dati['motivazione'] = $this->delblogForm->getValues()['motivazione'];

            $notificaModel = new Application_Model_Notifica();
            $notificaModel->inserisciNotifica($dati);

            $postModel->eliminaPost($idPost);

            $this->_helper->redirector("index", "staff");
        }
    }

    public function eliminablogverificaAction()
    {
        if ($this->hasParam('blog')) {
            $request = $this->getRequest();
            if (!$request->isPost()) {
                return $this->_helper->redirector('eliminablog');
            }
            $form = $this->delblogForm;
            if (!$form->isValid($request->getPost())) {
                $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
                return $this->render('eliminablog');
            }

            $idBlog = $this->getParam('blog');
            $blogModel = new Application_Model_Blog();
            $rowset = $blogModel->elencoBlogById($idBlog);
            $dati = array();
            $dati['id_utente'] = $this->utenteCorrente->current()->id_utente;
            $dati['id_blog'] = $idBlog;
            $dati['id_amico'] = $rowset->current()->id_utente;
            $dati['tipo'] = 3;
            $dati['motivazione'] = $this->delblogForm->getValues()['motivazione'];

            $notificaModel = new Application_Model_Notifica();
            $notificaModel->inserisciNotifica($dati);

            $blogModel->eliminaBlog($idBlog);

            $this->_helper->redirector("index", "staff");
        }
    }


}













