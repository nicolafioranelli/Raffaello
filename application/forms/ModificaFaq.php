<?php

class Application_Form_Modificafaq extends Zend_Form
{

    public function init()
    {
        $this->setMethod("post");
        $this->setName("modificafaq");


        $this->addElement('text', 'domanda', array(
            'filters'    => array('StringTrim'),
            'required'   => true,
            'label'=> 'Nome:',
            'placeholder' => 'Inserisci il tuo nome',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('text', 'risposta', array(
            'filters'    => array('StringTrim'),
            'required'   => true,
            'label'=> 'Cognome:',
            'placeholder' => 'Inserisci il cognome',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('submit', 'invia', array(
            'class' => 'btn btn-lg btn-primary btn-block btn-signin button-green-nic',
        ));
        $this->setDecorators(array(
            'FormElements',
            array('HtmlTag', array('tag' => 'a', 'class' => 'zend_form')),
            array('Description', array('placement' => 'prepend', 'class' => 'formerror')),
            'Form',
        ));

        include_once ('Lingua.php');
    }


}

