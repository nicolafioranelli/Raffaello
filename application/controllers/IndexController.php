<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        $this->_helper->redirector("index","public");
    }

    public function indexAction()
    {
        // action body
    }


}





