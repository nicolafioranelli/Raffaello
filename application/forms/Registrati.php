<?php

class Application_Form_Registrati extends Zend_Form
{

    public function init()
    {

        $this->setMethod("post");
        $this->setName("registrati");


        $this->addElement('text', 'Nome', array(
            'filters'    => array('StringTrim'),
            'required'   => true,
            'label'=> 'Nome:',
            'placeholder' => 'Inserisci il tuo nome',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('text', 'Cognome', array(
            'filters'    => array('StringTrim'),
            'required'   => true,
            'label'=> 'Cognome:',
            'placeholder' => 'Inserisci il cognome',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('text', 'nascita', array(
            'filters'    => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(0, 10))
            ),
            'required'         => true,
            'label'      => 'Nascita:',
            'placeholder' => 'Inserisci la data',
            'class' =>'form-control form-register',
        ));

        $this->addElement('text', 'email', array(
            'filters'    => array('StringTrim'),
            'required'         => true,
            'label'      => 'Email:',
            'placeholder' => 'Inserisci una e-mail',
            'class' =>'form-control form-register',
            'validators' => array(Zend_Validate_EmailAddress::INVALID => 'EmailAddress',),
        ));

        $this->addElement('text', 'username', array(
            'filters'    => array('StringTrim'),
            'required'         => true,
            'label'      => 'Username:',
            'placeholder' => 'Inserisci una username',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('password', 'password', array(
            'filters'    => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(2, 64))
            ),
            'required'         => true,
            'class' =>'form-control form-register',
            'placeholder' => 'Inserisci la password',
            'label'      => 'Password:',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
            'label_attributes' => array(
                'class' => 'none'
            )

        ));

        $this->addElement('text', 'telefono', array(
            'filters'    => array('StringTrim'),
            'validators' => array(array('Digits'),
                array('StringLength', true, array(10, 10))
            ),
            'required'         => true,
            'label'      => 'Telefono:',
            'placeholder' => 'Inserisci il numero di telefono',
            'class' =>'form-control form-register',
        ));

        $this->addElement('text', 'Descrizione', array(
            'filters'    => array('StringTrim'),
            'required'   => true,
            'label'=> 'Descrizione:',
            'placeholder' => 'Parlaci di te...',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 200))
            ),
        ));

        $this->addElement('submit', 'invia', array(
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
