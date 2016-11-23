<?php

class Application_Form_DatiFaq extends Zend_Form
{

    public function init()
    {

        $this->setMethod("post");
        $this->setName("datifaq");

        $this->addElement('text', 'domanda', array(
            'filters'    => array('StringTrim'),
            'required'         => true,
            'label'      => 'Domanda:',
            'placeholder' => 'Inserisci una domanda',
            'class' =>'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));
        $this->addElement('text', 'risposta', array(
            'filters'    => array('StringTrim'),
            'required'         => true,
            'label'      => 'risposta:',
            'placeholder' => 'Inserisci una risposta',
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
    }


}

