<?php

class Application_Form_DelblogForm extends Zend_Form
{

    public function init()
    {
        $this->setMethod("post");
        $this->setName("delblog");

        $this->addElement('text', 'motivazione', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Motivazione:',
            'placeholder' => 'Inserisci una motivazione',
            'autofocus' => 'true',
            'class' => 'form-control form-register',
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
        include('Lingua.php');
    }


}

