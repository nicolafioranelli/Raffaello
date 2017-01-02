<?php

class Application_Form_DatiProfilo extends Zend_Form
{

    public function init()
    {
        $path = APPLICATION_PATH;
        $path .= "/../public/image/profilo/";

        $this->setMethod("post");
        $this->setName("datiutente");

        $this->addElement('text', 'nome', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Nome:',
            'placeholder' => 'Inserisci il tuo nome',
            'autofocus' => 'true',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('text', 'cognome', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Cognome:',
            'placeholder' => 'Inserisci il cognome',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('text', 'nascita', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(0, 10)),
                array('date', true, array('dd/MM/yyyy'))
            ),
            'required' => true,
            'label' => 'Nascita:',
            'placeholder' => 'Inserisci la data',
            'class' => 'form-control form-register',
        ));

        $this->addElement('text', 'email', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Email:',
            'placeholder' => 'Inserisci una e-mail',
            'class' => 'form-control form-register',
            'validators' => array(Zend_Validate_EmailAddress::INVALID => 'EmailAddress',),
        ));

        $this->addElement('text', 'username', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Username:',
            'placeholder' => 'Inserisci una username',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('password', 'password', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(2, 64))
            ),
            'required' => false,
            'class' => 'form-control form-register',
            'placeholder' => 'Compila questo campo se vuoi modificare la password.',
            'label' => 'Password:',
            'label_attributes' => array(
                'class' => 'required'
            )
        ));

        $this->addElement('text', 'telefono', array(
            'filters' => array('StringTrim'),
            'validators' => array(array('Digits')
            ),
            'required' => true,
            'label' => 'Telefono:',
            'placeholder' => 'Inserisci il numero di telefono',
            'class' => 'form-control form-register',
        ));

        $this->addElement('text', 'descrizione', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Descrizione:',
            'placeholder' => 'Parlaci di te...',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 200))
            ),
        ));

        $this->addElement('file', 'image', array(
            'label' => 'Inserisci la tua immagine del profilo',
            'destination' => $path,
            'validators' => array(
                array('Count', false, 1),
                array('Size', false, 2048000),
                array('Extension', false, array('jpg', 'png', 'gif'))),
            'class' => 'form-control form-register'));

        $this->addElement('submit', 'modifica', array(
            'class' => 'btn btn-lg btn-primary btn-block btn-signin button-green-nic',
        ));
        $this->setDecorators(array(
            'FormElements',
            array('HtmlTag', array('tag' => 'a', 'class' => 'zend_form')),
            array('Description', array('placement' => 'prepend', 'class' => 'formerror')),
            'Form',
        ));
        include('Lingua.php');
    }


}

