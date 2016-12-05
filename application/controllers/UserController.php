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
        $this->view->assign("username", $this->utenteCorrente->current()->username);
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
            $amiciModel = new Application_Model_Amici();
            $utentiModel = new Application_Model_Utente();
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $rowset = $amiciModel->elencoAmiciById($idUtente);
            $amicidata = array();
            $i = 0;
            foreach ($rowset as $data) {
                $amicidata[$i]['id_utente'] = $data->richiedente;
                $temp = $utentiModel->elencoUtenteById($data->richiedente);
                $amicidata[$i]['richiedente'] = ucwords($temp->current()->nome . " " . $temp->current()->cognome);
                $amicidata[$i]['id_amici'] = $data->id_amici;
                $i++;
            }
            $this->view->assign("amiciSet", $amicidata);
        } else {
            $this->_helper->redirector('inserimentoprimoblog', 'user');
        }

        $notificaModel = new Application_Model_Notifica();
        $datiModel = $notificaModel->elencoNotifica($idUtente);
        $notificadati = array();
        $i = 0;
        foreach ($datiModel as $data) {
            if ($data->visibilita == 0):
                /* CASO NOTIFICA POST */
                if ($data->tipo == 0) {
                    $utenteModel = new Application_Model_Utente();
                    $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                    $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
                    $blogModel = new Application_Model_Blog();
                    $notificadati[$i]['blog'] = $blogModel->elencoBlogByUtente($data->id_blog)->current()->titolo;
                    $postModel = new Application_Model_Post();
                    $tempdata = $postModel->elencoPostByIdPost($data->id_post)->current()->data;
                    $notificadati[$i]['data'] = substr($tempdata, 8, 2) . '-' . substr($tempdata, 5, 2) . '-' . substr($tempdata, 0, 4) . ' alle ' . substr($tempdata, 11, 5);
                    $notificadati[$i]['idblog'] = $data->id_blog;
                    $notificadati[$i]['tipo'] = $data->tipo;
                    $notificadati[$i]['idnotifica'] = $data->id_notifica;
                } /* CASO ELIMINAZIONE AMICO */
                elseif ($data->tipo == 1) {
                    $utenteModel = new Application_Model_Utente();
                    $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                    $notificadati[$i]['tipo'] = $data->tipo;
                    $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
                    $notificadati[$i]['idblog'] = $data->id_blog;
                    $notificadati[$i]['idnotifica'] = $data->id_notifica;
                } /* CASO ELIMINAZIONE POST (STAFF) */
                elseif ($data->tipo == 2) {
                    $blogModel = new Application_Model_Blog();
                    $notificadati[$i]['nome'] = $data->nome;
                    $postModel = new Application_Model_Post();
                    $notificadati[$i]['motivazione'] = $data->motivazione;
                    $notificadati[$i]['tipo'] = $data->tipo;
                    $notificadati[$i]['idnotifica'] = $data->id_notifica;
                } /* CASO ELIMINAZIONE BLOG (STAFF) */
                elseif ($data->tipo == 3) {
                    $blogModel = new Application_Model_Blog();
                    $notificadati[$i]['nome'] = $data->nome;
                    $notificadati[$i]['motivazione'] = $data->motivazione;
                    $notificadati[$i]['tipo'] = $data->tipo;
                    $notificadati[$i]['idnotifica'] = $data->id_notifica;
                } /* ALTRI CASI */
                else {
                    //
                }
                $i++;
            endif;
        }
        $this->view->assign('notificaSet', $notificadati);
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
        $idblog = $blogmodel->inserisciBlog($datiform);
        $amiciModel = new Application_Model_Amici();
        $rowset = $amiciModel->elencoAmici($this->utenteCorrente->current()->id_utente);
        $privacyModel = new Application_Model_Privacy();
        $dati = array();
        foreach ($rowset as $amici):
            $dati['id_blog'] = $idblog;
            if ($this->utenteCorrente->current()->id_utente == $amici->richiedente):
                $dati['id_amico'] = $amici->ricevente;
            else:
                $dati['id_amico'] = $amici->richiedente;
            endif;
            $dati['stato'] = 0;
            $privacyModel->inserisciPrivacy($dati);
        endforeach;
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
            'action' => 'nuovopostverifica',
            'user' => $this->utenteCorrente->current()->id_utente
        )));
        return $this->nuovopostForm;
    }

    public function nuovopostverificaAction()
    {
        if ($this->hasParam('blog') && $this->hasParam('user')) {
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
            $idUtente = $this->getParam('user');
            $datiform['data'] = date('Y-m-d H:i:s');
            $datiform['id_utente'] = $idUtente;
            $datiform['id_blog'] = $this->getParam('blog');
            $postmodel = new Application_Model_Post();
            $id = $postmodel->inserisciPost($datiform);

            $amiciModel = new Application_Model_Amici();
            $amicidata = $amiciModel->elencoAmiciNotifica($idUtente);
            foreach ($amicidata as $amici) {
                if ($amici->richiedente == $idUtente) {
                    $dati = array();
                    $dati['id_utente'] = $idUtente;
                    $dati['id_blog'] = $this->getParam('blog');
                    $dati['id_post'] = $id;
                    $dati['id_amico'] = $amici->ricevente;
                    $dati['tipo'] = 0;
                    $notificaModel = new Application_Model_Notifica();
                    $notificaModel->inserisciNotifica($dati);
                } else {
                    $dati = array();
                    $dati['id_utente'] = $idUtente;
                    $dati['id_blog'] = $this->getParam('blog');
                    $dati['id_post'] = $id;
                    $dati['id_amico'] = $amici->richiedente;
                    $dati['tipo'] = 0;
                    $notificaModel = new Application_Model_Notifica();
                    $notificaModel->inserisciNotifica($dati);
                }
            }
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
            $i = 0;
            foreach ($rowpost as $post) {
                $newdatapost[$i]['id_post'] = $post->id_post;
                $newdatapost[$i]['titolo'] = $post->titolo;
                $newdatapost[$i]['contenuto'] = $post->contenuto;
                $newdatapost[$i]['data'] = $post->data;
                $temp = $utenteModel->elencoUtenteById($post->id_utente);
                $newdatapost[$i]['nome_utente'] = ucwords($temp->current()->nome);
                $newdatapost[$i]['id_utente'] = $post->id_utente;
                $newdatapost[$i]['username'] = $temp->current()->username;
                $i++;
            }
            $paginator = new Zend_Paginator(new Zend_Paginator_Adapter_Array($newdatapost));
            $paginator->setItemCountPerPage(5);
            $paginator->setCurrentPageNumber($this->getParam('pagina', 1));

            $this->view->assign('postSet', $paginator);
            if (false === $postModel->esistenzaPostByBlog($idblog)) {
                $this->view->assign('valPost', 0);
            } else {
                $this->view->assign('valPost', 1);
            }
            $amiciModel = new Application_Model_Amici();
            $utentiModel = new Application_Model_Utente();
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $rowset = $amiciModel->elencoAmiciById($idUtente);
            $amicidata = array();
            $i = 0;
            foreach ($rowset as $data) {
                $amicidata[$i]['id_utente'] = $data->richiedente;
                $temp = $utentiModel->elencoUtenteById($data->richiedente);
                $amicidata[$i]['richiedente'] = ucwords($temp->current()->nome . " " . $temp->current()->cognome);
                $amicidata[$i]['id_amici'] = $data->id_amici;
                $i++;
            }
            $this->view->assign("amiciSet", $amicidata);
            $blogModel = new Application_Model_Blog();
            $datiblog = $blogModel->elencoBlogById($idblog)->current()->toArray();
            $this->view->assign('blogSet', $datiblog);
            $this->view->assign('utenteCorrente', $idUtente);

            $notificaModel = new Application_Model_Notifica();
            $datiModel = $notificaModel->elencoNotifica($idUtente);
            $notificadati = array();
            $i = 0;
            foreach ($datiModel as $data) {
                if ($data->visibilita == 0):
                    /* CASO NOTIFICA POST */
                    if ($data->tipo == 0) {
                        $utenteModel = new Application_Model_Utente();
                        $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                        $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
                        $blogModel = new Application_Model_Blog();
                        $notificadati[$i]['blog'] = $blogModel->elencoBlogByUtente($data->id_blog)->current()->titolo;
                        $postModel = new Application_Model_Post();
                        $tempdata = $postModel->elencoPostByIdPost($data->id_post)->current()->data;
                        $notificadati[$i]['data'] = substr($tempdata, 8, 2) . '-' . substr($tempdata, 5, 2) . '-' . substr($tempdata, 0, 4) . ' alle ' . substr($tempdata, 11, 5);
                        $notificadati[$i]['idblog'] = $data->id_blog;
                        $notificadati[$i]['tipo'] = $data->tipo;
                        $notificadati[$i]['idnotifica'] = $data->id_notifica;
                    } /* CASO ELIMINAZIONE AMICO */
                    elseif ($data->tipo == 1) {
                        $utenteModel = new Application_Model_Utente();
                        $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                        $notificadati[$i]['tipo'] = $data->tipo;
                        $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
                        $notificadati[$i]['idblog'] = $data->id_blog;
                        $notificadati[$i]['idnotifica'] = $data->id_notifica;
                    } /* CASO ELIMINAZIONE POST (STAFF) */
                    elseif ($data->tipo == 2) {
                        $blogModel = new Application_Model_Blog();
                        $notificadati[$i]['nome'] = $data->nome;
                        $postModel = new Application_Model_Post();
                        $notificadati[$i]['motivazione'] = $data->motivazione;
                        $notificadati[$i]['tipo'] = $data->tipo;
                        $notificadati[$i]['idnotifica'] = $data->id_notifica;
                    } /* CASO ELIMINAZIONE BLOG (STAFF) */
                    elseif ($data->tipo == 3) {
                        $blogModel = new Application_Model_Blog();
                        $notificadati[$i]['blog'] = $data->nome;
                        $notificadati[$i]['motivazione'] = $data->motivazione;
                        $notificadati[$i]['tipo'] = $data->tipo;
                        $notificadati[$i]['idnotifica'] = $data->id_notifica;
                    } /* ALTRI CASI */
                    else {
                        //
                    }
                    $i++;
                endif;
            }
            $this->view->assign('notificaSet', $notificadati);
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
        if ($datiform['password'] == "") {
            unset($datiform['password']);
        }
        $datiform['nascita'] = substr($datiform['nascita'], 6, 4) . "-" . substr($datiform['nascita'], 3, 2) . "-" . substr($datiform['nascita'], 0, 2);
        $datiform['nome'] = strtolower($datiform['nome']);
        $datiform['cognome'] = strtolower($datiform['cognome']);
        if ($datiform['image'] == "") {
            unset($datiform['image']);
        }
        $utentemodel = new Application_Model_Utente();
        $id = $this->getParam("utente"); //prendo la faq inserito nella form
        $utentemodel->aggiornaUtente($datiform, $id);
        $this->_helper->redirector("index", "user");
    }

    public function amicipostAction()
    {
        if ($this->hasParam('idamici') && $this->hasParam('azione')) {
            $action = $this->getParam('azione');
            $id_amici = $this->getParam('idamici');
            if ($action == 'accepted') {
                $amiciModel = new Application_Model_Amici();
                $dati = array();
                $dati['stato'] = $action;
                $amiciModel->aggiornaAmici($dati, $id_amici);
                $amici = $amiciModel->elencoByIdAmici($id_amici);
                $privacy = array();
                $id_ricevente = $amici->current()->ricevente;
                $id_richiedente = $amici->current()->richiedente;
                $blogModel = new Application_Model_Blog();
                $row_ricevente = $blogModel->elencoBlogByUtente($id_ricevente);
                $row_richiedente = $blogModel->elencoBlogByUtente($id_richiedente);
                $privacyModel = new Application_Model_Privacy();

                foreach ($row_ricevente as $blog_ricevente):
                    $privacy['id_blog'] = $blog_ricevente->id_blog;
                    $privacy['id_amico'] = $amici->current()->richiedente;
                    $privacy['stato'] = 0;
                    $privacyModel->inserisciPrivacy($privacy);
                endforeach;
                foreach ($row_richiedente as $blog_richiedente):
                    $privacy['id_blog'] = $blog_richiedente->id_blog;
                    $privacy['id_amico'] = $amici->current()->ricevente;
                    $privacy['stato'] = 0;
                    $privacyModel->inserisciPrivacy($privacy);
                endforeach;
            }
            if ($action == 'refused') {
                $amiciModel = new Application_Model_Amici();
                $dati = array();
                $dati['stato'] = $action;
                $amiciModel->aggiornaAmici($dati, $id_amici);
            }
            $this->_helper->redirector("index", "user");
        }
    }

    public function amiciAction()
    {
        $amiciModel = new Application_Model_Amici();
        $utentiModel = new Application_Model_Utente();
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $rowset = $amiciModel->elencoAmici($idUtente);
        $amicidata = array();
        $i = 0;
        foreach ($rowset as $data) {
            if ($idUtente == $data->ricevente):
                $temp = $utentiModel->elencoUtenteById($data->richiedente);
            else:
                $temp = $utentiModel->elencoUtenteById($data->ricevente);
            endif;
            $amicidata[$i]['amico'] = $temp->current()->nome . " " . $temp->current()->cognome;
            $amicidata[$i]['username'] = $temp->current()->username;
            $amicidata[$i]['idamico'] = $temp->current()->id_utente;
            $i++;
        }
        $this->view->assign("amiciSet", $amicidata);
    }

    public function profiloAction()
    {
        if ($this->hasParam('user')) {
            $privacy = 0;
            $utenteModel = new Application_Model_Utente();
            $username = $this->getParam('user');
            $dati = $utenteModel->cercaUtenteByUser($username);
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $blogModel = new Application_Model_Blog();
            $datiBlog = $blogModel->elencoBlogByUtente($dati->current()->id_utente);

            /* PROFILO PERSONALE */
            if ($idUtente == $dati->current()->id_utente) {
                $this->view->assign('datiSet', $dati);
                $temp = "modifica";
                $this->view->assign('varBottone', $temp);
                $this->view->assign('azione', $temp . 'profilo');
                $this->view->assign('blogSet', $datiBlog);
                $this->view->assign('blog', "tuoi");
                $this->view->assign('privacy', $privacy);
            }

            /* ALTRO PROFILO */
            if ($idUtente != $dati->current()->id_utente) {
                $this->view->assign('datiSet', $dati);
                $amiciModel = new Application_Model_Amici();
                //Vengono gestite sia amicizie da A a B, sia da B a A
                $amicizieRichieste = $amiciModel->elencoRichiestaPresente($dati->current()->id_utente, $idUtente);
                $amicizieRicevute = $amiciModel->elencoRichiestaPresente($idUtente, $dati->current()->id_utente);

                //Variabili di default
                $nomeBottone = "Aggiungi agli amici";
                $azione = "aggiungiprofilo";
                $idAmico = 0;
                $this->view->assign('idRicevente', $dati->current()->id_utente);
                $privacy = $this->getParam('privacy');

                //Controllo casi di amicizie
                if (count($amicizieRichieste) > 0) {
                    if ($amicizieRichieste->current()->stato == "standby") {
                        $nomeBottone = "Richiesta inviata";
                        $azione = "#";
                    } elseif ($amicizieRichieste->current()->stato == "accepted") {
                        $nomeBottone = "Elimina amicizia";
                        $azione = "eliminaprofilo";
                        $privacy = 0;
                    }
                }
                if (count($amicizieRicevute) > 0) {
                    if ($amicizieRicevute->current()->stato == "standby") {
                        $nomeBottone = "Conferma amicizia";
                        $azione = "amicipost";
                        $idAmico = $amicizieRicevute->current()->richiedente;
                    } elseif ($amicizieRicevute->current()->stato == 'accepted') {
                        $nomeBottone = "Elimina";
                        $azione = "eliminaprofilo";
                        $privacy = 0;
                    }
                }
                //Assegnamento variabili dinamiche alla view
                $this->view->assign('varBottone', $nomeBottone);
                $this->view->assign('azione', $azione);
                $this->view->assign('idamico', $idAmico);
                $this->view->assign('blogSet', $datiBlog);
                $this->view->assign('blog', "suoi");
                $this->view->assign('privacy', $privacy);
            }
        }
    }

    public function aggiungiprofiloAction()
    {
        if ($this->hasParam('idricevente')) {
            $dati = array();
            $dati['richiedente'] = $this->utenteCorrente->current()->id_utente;
            $dati['ricevente'] = $this->getParam('idricevente');
            $dati['stato'] = 'standby';
            $dati['data'] = date('Y-m-d H:i:s');
            $amiciModel = new Application_Model_Amici();
            $amiciModel->inserisciAmici($dati);
            $this->_helper->redirector("index", "user");
        }
    }

    public function eliminaprofiloAction()
    {
        if ($this->hasParam('user')) {
            $id = $this->getParam('user');
            $amiciModel = new Application_Model_Amici();
            $dati = array();
            $dati['id_utente'] = $this->utenteCorrente->current()->id_utente;
            $dati['id_amico'] = $id;
            $dati['tipo'] = 1;
            $notificaModel = new Application_Model_Notifica();
            $notificaModel->inserisciNotifica($dati);
            $amiciModel->eliminaAmici($id, $this->utenteCorrente->current()->id_utente);
            $this->_helper->redirector("amici", "user");
        }
    }

    public function cercaAction()
    {
        if ($this->hasParam('search')) {
            $ricerca = str_replace('*', '%', $this->getParam('search'));;
            $cercaModel = new Application_Model_Elencoutenti();
            $this->view->assign('amiciSet', $cercaModel->ricercaUtente($ricerca));
        }
    }

    public function modificaprivacyAction()
    {
        $utenteModel = new Application_Model_Utente();
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $this->view->assign('privacy', $utenteModel->elencoUtenteById($idUtente)->current()->privacy);
    }

    public function modificaprivacypostAction()
    {
        if ($this->hasParam('privacy')) {
            $utenteModel = new Application_Model_Utente();
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $dati['privacy'] = $this->getParam('privacy');
            $utenteModel->aggiornaUtente($dati, $idUtente);
            $this->_helper->redirector("index", "user");
        }
    }

    public function visualizzanotificheAction()
    {
        $idUtente = $this->utenteCorrente->current()->id_utente;
        $notificaModel = new Application_Model_Notifica();
        $datiModel = $notificaModel->elencoNotifica($idUtente);
        $notificadati = array();
        $i = 0;
        foreach ($datiModel as $data) {
            /* CASO NOTIFICA POST */
            if ($data->tipo == 0) {
                $utenteModel = new Application_Model_Utente();
                $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                $blogModel = new Application_Model_Blog();
                $notificadati[$i]['blog'] = $blogModel->elencoBlogByUtente($data->id_blog)->current()->titolo;
                $postModel = new Application_Model_Post();
                $tempdata = $postModel->elencoPostByIdPost($data->id_post)->current()->data;
                $notificadati[$i]['data'] = substr($tempdata, 8, 2) . '-' . substr($tempdata, 5, 2) . '-' . substr($tempdata, 0, 4) . ' alle ' . substr($tempdata, 11, 5);
                $notificadati[$i]['idblog'] = $data->id_blog;
                $notificadati[$i]['tipo'] = $data->tipo;
                $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
            } /* CASO ELIMINAZIONE AMICO */
            elseif ($data->tipo == 1) {
                $utenteModel = new Application_Model_Utente();
                $notificadati[$i]['mittente'] = ucwords($utenteModel->elencoUtenteById($data->id_utente)->current()->nome . ' ' . $utenteModel->elencoUtenteById($data->id_utente)->current()->cognome);
                $notificadati[$i]['tipo'] = $data->tipo;
                $notificadati[$i]['user'] = $utenteModel->elencoUtenteById($data->id_utente)->current()->username;
                $notificadati[$i]['idblog'] = $data->id_blog;
            } /* CASO ELIMINAZIONE POST (STAFF) */
            elseif ($data->tipo == 2) {
                $blogModel = new Application_Model_Blog();
                $notificadati[$i]['nome'] = $data->nome;
                $postModel = new Application_Model_Post();
                $notificadati[$i]['motivazione'] = $data->motivazione;
                $notificadati[$i]['tipo'] = $data->tipo;
            } /* CASO ELIMINAZIONE BLOG (STAFF) */
            elseif ($data->tipo == 3) {
                $blogModel = new Application_Model_Blog();
                $notificadati[$i]['nome'] = $data->nome;
                $notificadati[$i]['motivazione'] = $data->motivazione;
                $notificadati[$i]['tipo'] = $data->tipo;
            } /* ALTRI CASI */
            else {
                //
            }
            $i++;
        }
        $this->view->assign('notificaSet', $notificadati);
    }

    public function nascondinotificaAction()
    {
        if ($this->hasParam('idnot')) {
            $id = $this->getParam('idnot');
            $notificaModel = new Application_Model_Notifica();
            $dati['visibilita'] = 1;
            $notificaModel->aggiornaNotifica($dati, $id);
            $this->_helper->redirector("index", "user");
        }
    }

    public function sceltaprivacyAction()
    {
        if ($this->hasParam('blog')) {
            $blog = $this->getParam('blog');
            $amiciModel = new Application_Model_Amici();
            $utentiModel = new Application_Model_Utente();
            $idUtente = $this->utenteCorrente->current()->id_utente;
            $rowset = $amiciModel->elencoAmici($idUtente);
            $amicidata = array();
            $i = 0;
            foreach ($rowset as $data) {
                if ($idUtente == $data->ricevente):
                    $temp = $utentiModel->elencoUtenteById($data->richiedente);
                else:
                    $temp = $utentiModel->elencoUtenteById($data->ricevente);
                endif;
                $amicidata[$i]['amico'] = $temp->current()->nome . " " . $temp->current()->cognome;
                $amicidata[$i]['idamico'] = $temp->current()->id_utente;
                $privacyModel = new Application_Model_Privacy();
                $privacydata = $privacyModel->elencoPrivacyUtente($temp->current()->id_utente);
                $amicidata[$i]['stato'] = $privacydata->current()->stato;
                $i++;
            }
            $this->view->assign("amiciSet", $amicidata);
            $this->view->assign("blog", $blog);
        }
    }

    public function sceltaprivacypostAction()
    {
        if ($this->hasParam('stato') && $this->hasParam('user')) {
            $user = $this->getParam('user');
            $stato = $this->getParam('stato');
            $params = array(
                'blog' => $this->getParam('blog')
            );
            if ($stato == 1) {
                $dati['stato'] = 0;
                $privacyModel = new Application_Model_Privacy();
                $privacyModel->modificaPrivacy($dati, $user);
            } else {
                $dati['stato'] = 1;
                $privacyModel = new Application_Model_Privacy();
                $privacyModel->modificaPrivacy($dati, $user);
            }
            $this->_helper->redirector("sceltaprivacy", "user", 0, $params);
        }
    }
}