<?php

class UserController extends Zend_Controller_Action
{

    protected $_authService = null;

    protected $utenteCorrente = null;

    protected $nuovoblogForm = null;

    protected $nuovopostForm = null;

    protected $formUtente = null;

    public function init()
    {
        $this->_authService = new Application_Service_Auth();
        $this->utenteCorrente = $this->_authService->getIdentity();
        $this->view->assign("ruolo", $this->utenteCorrente->current()->ruolo);
        $this->view->assign("nome", $this->utenteCorrente->current()->nome);
        $this->view->assign('nuovoblogForm', $this->inserimentoprimoblogAction());
        $this->view->assign('nuovopostForm', $this->nuovopostAction());
        $this->view->assign("formUtente", $this->modificaprofiloAction());
    }

    public function indexAction()
    {
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $blogModel = new Application_Model_Blog();
        if ($blogModel->esistenzaBlog($idUtente)) {
            $datiblog = $blogModel->elencoBlogByUtente($idUtente);
            $this->view->assign("blogSet", $datiblog);
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
        if ($this->hasParam("verifica")) {
            $param = $this->getParam("verifica");
            $this->view->assign('verifica', $param);
        }
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

    public function gestioneblogAction()
    {
        $blogModel = new Application_Model_Blog();
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $this->view->assign("blogSet", $blogModel->elencoBlogByUtente($idUtente));
    }

    public function eliminablogAction()
    {
        if ($this->hasParam('titolo')) {
            $titoloblog = $this->getParam('titolo');
            $this->view->assign('titolo', $titoloblog);
        }
    }

    public function eliminablogpostAction()
    {
        if ($this->hasParam('blog')) {
            $idblog = $this->getParam('blog');
            $blogModel = new Application_Model_Blog();
            $blogModel->eliminaBlog($idblog);
            $this->_helper->redirector("gestioneblog", "user");
        }
    }

    public function nuovopostAction()
    {
        $this->nuovopostForm = new Application_Form_NuovoPost();
        $this->nuovopostForm->setAction($this->_helper->url->url(array(
            'controller' => 'user',
            'action' => 'nuovopostverifica'
        )));
        return $this->nuovopostForm;
    }

    public function nuovopostverificaAction()
    {
        if ($this->hasParam('blog')) {
            $request = $this->getRequest();
            if (!$request->isPost()) {
                return $this->_helper->redirector('nuovopost');
            }
            $form = $this->nuovopostForm;
            if (!$form->isValid($request->getPost())) {
                $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
                return $this->render('nuovopost');
            }
            $datiform = $this->nuovopostForm->getValues();
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $datiform['data'] = date('Y-m-d H:i:s');
            $datiform['id_utente'] = $idUtente;
            $datiform['id_blog'] = $this->getParam('blog');
            $postmodel = new Application_Model_Post();

            $postmodel->inserisciPost($datiform);
            $this->_helper->redirector("index", "user");
        } else {
            $this->_helper->redirector("gestioneblog", "user");
        }
    }

    public function visualizzablogAction()
    {
        if ($this->hasParam('blog')) {
            $postModel = new Application_Model_Post();
            $idblog = $this->getParam('blog');
            $utenteModel = new Application_Model_Utente();
            $rowpost = $postModel->elencoPostByIdBlog($idblog);
            $newdatapost = array();
            $i=0;
            foreach ($rowpost as $post) {

                $newdatapost[$i]['id_post'] = $post->id_post;
                $newdatapost[$i]['titolo'] = $post->titolo;
                $newdatapost[$i]['contenuto'] = $post->contenuto;
                $newdatapost[$i]['data'] = $post->data;
                $temp = $utenteModel->elencoUtenteById($post->id_utente);
                $newdatapost[$i]['nome_utente'] = $temp->current()->nome;
                $newdatapost[$i]['id_utente'] = $post->id_utente;
                $i++;
            }
            $this->view->assign('postSet', $newdatapost);
            if (false === $postModel->esistenzaPostByBlog($idblog)) {
                $this->view->assign('valPost', 0);
            } else {
                $this->view->assign('valPost', 1);
            }
        }
    }

    public function modificaprofiloAction()
    {
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $utentiModel = new Application_Model_Utente();
        $datiUtente = $utentiModel->elencoUtenteById($idUtente)->current()->toArray();
        $this->view->assign('utentiSet', $datiUtente);
        $this->formUtente = new Application_Form_DatiProfilo();
        $this->formUtente->setAction($this->_helper->url->url(array(
            'controller' => 'user',
            'action' => 'modificaprofilopost',
            'utente' => $idUtente),
            null, true
        ));
        $datiUtente['nascita'] = substr($datiUtente['nascita'], 8, 2) . "/" . substr($datiUtente['nascita'], 5, 2) . "/" . substr($datiUtente['nascita'], 0, 4);
        $this->formUtente->populate($datiUtente);
        return $this->formUtente;
    }

    public function modificaprofilopostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('modificaprofilo');
        }
        $form = $this->formUtente;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('modificaprofilo');
        }
        $datiform = $this->formUtente->getValues();
        if ($datiform['password'] == ""){
            unset($datiform['password']);
        }
        $datiform['nascita']= substr($datiform['nascita'],6,4) ."-" .substr($datiform['nascita'],3,2)."-". substr($datiform['nascita'],0,2);
        $utentemodel = new Application_Model_Utente();
        $id = $this->getParam("utente"); //prendo la faq inserito nella form

        $utentemodel->aggiornaUtente($datiform, $id);
        $this->_helper->redirector("index", "user");
    }


}

























