<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap
{

    /*protected function _initSetupBaseUrl() {
        $this->bootstrap('frontcontroller');
        $controller = Zend_Controller_Front::getInstance();
        $controller->setBaseUrl('myweb/public');
    }*/

    // Aggiunge un'istanza di Zend_Controller_Request_Http nel Front_Controller
    // che permette di utilizzare l'helper baseUrl() nel Bootstrap.php
    // Necessario solo se la Document-root di Apache non è la cartella public/
    //necessaria per far girare più di un progetto su una macchina server

    protected function _initRequest()
    {
        $this->bootstrap('FrontController');
        $front = $this->getResource('FrontController');
        $request = new Zend_Controller_Request_Http();
        $front->setRequest($request);
    }
    //loader
    protected function _initDefaultModuleAutoloader()
    {
        $loader = Zend_Loader_Autoloader::getInstance();
        $loader->registerNamespace('App_');
        $this->getResourceLoader()
            ->addResourceType('modelResource','models/resources','Resource');
    }
    /*protected function _initFrontControllerPlugin()
    {
        $front = Zend_Controller_Front::getInstance();
        $front->registerPlugin(new App_Controller_Plugin_Acl());
    }*/
    protected function _initViewSettings()
    {
        $view = new Zend_View();
        $view->headTitle('Raffaello');

    }

    //impostazioni db adapter
    protected function _initDbAdapter()
    {
        $dbAdapter = Zend_Db::factory('PDO_mysql', array(
            'host' => 'localhost',
            'username' => 'root',
            'password' => '',
            'dbname' => 'cicero',
            'charset' => 'utf8'
        ));
        Zend_Db_Table::setDefaultAdapter($dbAdapter);
    }

    /**
     * utilizziamo l'ACL su base model, ogni volta che si fa il bootstrap si deve dire dove trovare i plugin dell'acl
     * instanzia ogni volta il plugin per l'acl
     */
    protected function _initFrontControllerPlugin()
    {
        $front = Zend_Controller_Front::getInstance();
        $front->registerPlugin(new App_Controller_Plugin_Acl());
    }


}

