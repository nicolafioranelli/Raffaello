<?php

class AdminController extends Zend_Controller_Action
{
    //VARIABILI GLOBALI
    protected $_authService = null;
    protected $utenteCorrente = null;
    protected $formFaq = null;
    protected $formUtente = null;
    protected $registratiForm = null;
    protected $delblogForm = null;
    protected $delpostForm = null;

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
        //INSERIMENTO STAFF
        $this->view->assign('registratiForm', $this->inseriscistaffAction());
        //GESTIONE BLOG E POST
        $this->view->assign('delblogForm', $this->eliminablogAction());
        $this->view->assign('delpostForm', $this->eliminapostAction());
    }

    public function indexAction()
    {
        $utenteModel = new Application_Model_Utente();
        $blogModel = new Application_Model_Blog();
        $this->view->assign('numutenti', count($utenteModel->elencoUtente()->toArray()));
        $this->view->assign('blogutenti', count($blogModel->elencoBlog()->toArray()));
    }

    public function logoutAction()
    {
        Zend_Auth::getInstance()->clearIdentity();
        $this->_helper->redirector("index", "public");
    }

    /* GESTIONE FAQ */
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
    /* FINE GESTIONE FAQ */

    /* GESTIONE UTENTI */
    public function visualizzautentiAction()
    {
        $utentiModel = new Application_Model_Utente();
        $this->view->assign("utentiSet", $utentiModel->elencoUtenteAdmin());
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
            $datiUtente['nascita'] = substr($datiUtente['nascita'], 8, 2) . "/" . substr($datiUtente['nascita'], 5, 2) . "/" . substr($datiUtente['nascita'], 0, 4);
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
        if ($datiform['password'] == "") {
            unset($datiform['password']);
        }
        $datiform['Nome'] = strtolower($datiform['Nome']);
        $datiform['Cognome'] = strtolower($datiform['Cognome']);
        $datiform['nascita'] = substr($datiform['nascita'], 6, 4) . "-" . substr($datiform['nascita'], 3, 2) . "-" . substr($datiform['nascita'], 0, 2);
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
            if ($this->getParam('ruolo') == 'user'):
                $this->_helper->redirector("visualizzautenti", "admin");
            else:
                $this->_helper->redirector("visualizzastaff", "admin");
            endif;
        }
    }

    public function visualizzastaffAction()
    {
        $utenteModel = new Application_Model_Utente();
        $this->view->assign('utentiSet', $utenteModel->elencoStaffAdmin());
    }

    public function inseriscistaffAction()
    {
        $this->registratiForm = new Application_Form_Registrati();
        $this->registratiForm->setAction($this->_helper->url->url(array(
            'controller' => "admin",
            'action' => 'inseriscistaffpost',
            'default', null
        )));
        return $this->registratiForm;
    }

    public function inseriscistaffpostAction()
    {
        $request = $this->getRequest();
        if (!$request->isPost()) {
            return $this->_helper->redirector('inseriscistaff', 'admin');
        }
        $form = $this->registratiForm;
        if (!$form->isValid($request->getPost())) {
            $form->setDescription('Attenzione: alcuni dati inseriti sono errati.');
            return $this->render('inseriscistaff');
        } else {
            $datiform = $this->registratiForm->getValues();
            $datiform['Nome'] = strtolower($datiform['Nome']);
            $datiform['Cognome'] = strtolower($datiform['Cognome']);
            $datiform['ruolo'] = "staff";
            $utentemodel = new Application_Model_Utente();
            $username = $datiform['username']; //prendo l'username inserito nella form
            if ($utentemodel->esistenzaUsername($username)) //controllo se l'username inserito esiste già nel db
            {
                $form->setDescription('Attenzione: l\'username che hai scelto non è disponibile.');
                return $this->_helper->redirector('inseriscistaff', 'admin');
            } else {
                $utentemodel->inserisciUtente($datiform);
                $this->_helper->redirector('visualizzastaff', 'admin');
            }
        }
    }

    public function profiloAction()
    {
        if ($this->hasParam('user') && $this->hasParam('id')) {
            /* ANAGRAFICA */
            $utenteModel = new Application_Model_Utente();
            $username = $this->getParam('user');
            $dati = $utenteModel->cercaUtenteByUser($username);
            $blogModel = new Application_Model_Blog();
            $datiBlog = $blogModel->elencoBlogByUtente($this->getParam('id'));
            $this->view->assign('datiSet', $dati);
            $this->view->assign('blogSet', $datiBlog);
            /* AMICIZIE */
            $amiciModel = new Application_Model_Amici();
            $rowset = $amiciModel->elencoAmici($this->getParam('id'));
            $amicidata = array();
            $i = 0;
            foreach ($rowset as $data) {
                if ($this->getParam('id') == $data->ricevente):
                    $temp = $utenteModel->elencoUtenteById($data->richiedente);
                else:
                    $temp = $utenteModel->elencoUtenteById($data->ricevente);
                endif;
                $amicidata[$i]['amico'] = $temp->current()->nome . " " . $temp->current()->cognome;
                $amicidata[$i]['username'] = $temp->current()->username;
                $amicidata[$i]['idamico'] = $temp->current()->id_utente;
                $i++;
            }
            $this->view->assign("amiciSet", $amicidata);
            /* RICHIESTE */
            $amicizie = $amiciModel->elencoAdmin($this->getParam('id'))->toArray();
            $this->view->assign('amicizie', count($amicizie));
        }
    }

    /* FINE GESTIONE UTENTI */

    /* GESTIONE BLOG */
    public function gestioneblogAction()
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
                'controller' => 'admin',
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

    public function eliminablogverificaAction()
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

            $this->_helper->redirector("gestioneblog", "admin");
        }
    }

    public function eliminapostverificaAction()
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
    /* FINE GESTIONE BLOG */
}



























