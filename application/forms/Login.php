<?php

class Application_Form_Login extends Zend_Form
{

    public function init()
    {
        $this->setMethod("post");
        $this->setName("login");

        $this->addElement('text', 'username', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Username:',
            'placeholder' => 'Inserisci una username',
            'autofocus' => 'true',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('password', 'password', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(4, 64))
            ),
            'required' => true,
            'class' => 'form-control form-login',
            'placeholder' => 'Inserisci la password',
            'label' => 'Password:',
            'label_attributes' => array(
                'class' => 'none'
            )
        ));

        $this->addElement('submit', 'accedi', array(
            'class' => 'btn btn-lg btn-primary btn-block btn-signin button-green-nic',
        ));
        $this->setDecorators(array(
            'FormElements',
            array('HtmlTag', array('tag' => 'a', 'class' => 'zend_form')),
            array('Description', array('placement' => 'prepend', 'class' => 'formerror')),
            'Form'
        ));

        include('Lingua.php');
    }


}

