<?php

class Application_Form_Registrati extends Zend_Form
{

    public function init()
    {
        $path = APPLICATION_PATH;
        $path .= "/../public/image/profilo/";

        $this->setMethod("post");
        $this->setAttrib('enctype', 'multipart/form-data');
        $this->setName("registrati");

        $this->addElement('text', 'Nome', array(
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

        $this->addElement('text', 'Cognome', array(
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
                array('StringLength', true, array(10)),
                array('date', true, array('dd/MM/yyyy'))
            ),
            'required' => true,
            'label' => 'Nascita:',
            'placeholder' => 'Inserisci la data GG/MM/AAAA',
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
                array('StringLength', true, array(4, 64))
            ),
            'required' => true,
            'class' => 'form-control form-register',
            'placeholder' => 'Inserisci la password',
            'label' => 'Password:',
            'label_attributes' => array(
                'class' => 'none'
            )
        ));

        $this->addElement('password', 'password_confirm', array(
            'filters' => array('StringTrim'),
            'validators' => array(
                array('StringLength', true, array(4, 64)),
                array('Identical', true, 'password')
            ),
            'required' => true,
            'class' => 'form-control form-register',
            'placeholder' => 'Inserisci la password',
            'label' => 'Conferma password:',
            'label_attributes' => array(
                'class' => 'none'
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

        $this->addElement('text', 'Descrizione', array(
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

        $this->addElement('submit', 'invia', array(
            'class' => 'btn btn-lg btn-primary btn-block btn-signin button-green-nic',
        ));

        $this->setDecorators(array(
            'FormElements',
            array('HtmlTag', array('tag' => 'a', 'class' => 'zend_form')),
            array('Description', array('placement' => 'prepend', 'class' => 'formerror')),
            'Form',
        ));

        include_once('Lingua.php');

    }

}
