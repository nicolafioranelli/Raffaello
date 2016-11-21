<?php

class Application_Form_Login extends Zend_Form
{

    public function init()
    {
        $this->setMethod("post");
        $this->setName("login");

        $this->addElement('text', 'email', array(
            'filters'    => array('StringTrim'),
            'required'         => true,
            'label'      => 'Email:',
            'placeholder' => 'Inserisci una e-mail',
            'class' =>'form-control form-login',
            'validators' => array(Zend_Validate_EmailAddress::INVALID => 'EmailAddress',),
        ));

        $this->addElement('password', 'password', array(
            'filters'    => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(2, 64))
            ),
            'required'         => true,
            'class' =>'form-control form-login',
            'placeholder' => 'Inserisci la password',
            'label'      => 'Password:',
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

        include_once ('Lingua.php');
    }


}

