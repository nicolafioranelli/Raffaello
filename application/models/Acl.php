<?php

class Application_Model_Acl extends Zend_Acl
{

    /**
     * Usiamo la tecnica della whitelist
     * setta i permessi ad ogni tipo di utente.
     * Application_Model_Acl constructor.
     */
    public function __construct()
    {

        // ACL per il livello 0
        $this->addRole(new Zend_Acl_Role('public')) //ruoli dell'utente
        ->add(new Zend_Acl_Resource('public')) //per risorsa si intente il controller
        ->add(new Zend_Acl_Resource('index')) //per risorsa si intente il controller
        ->add(new Zend_Acl_Resource('error'))
            ->allow('public', array('index','error','public'));


        // ACL per il livello1
        $this->addRole(new Zend_Acl_Role('user'), 'public')
            ->add(new Zend_Acl_Resource('user'))
            ->allow('user','user');



        // ACL per il livello 2
        $this->addRole(new Zend_Acl_Role('staff'), 'public')
            ->add(new Zend_Acl_Resource('staff'))
            ->allow('staff','staff');

        // ACL per il livello 3
        $this->addRole(new Zend_Acl_Role('admin'), 'staff')
            ->add(new Zend_Acl_Resource('admin'))
            ->allow('admin','admin');


    }
}

