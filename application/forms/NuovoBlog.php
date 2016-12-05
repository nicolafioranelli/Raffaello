<?php

class Application_Form_NuovoBlog extends Zend_Form
{

    public function init()
    {
        $this->setMethod("post");
        $this->setName("nuovoblog");

        $this->addElement('text', 'titolo', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Titolo:',
            'placeholder' => 'Inserisci il titolo',
            'autofocus' => 'true',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('textarea', 'descrizione', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Descrizione:',
            'placeholder' => 'Di cosa parla il tuo blog...',
            'class' => 'form-control form-register',
            'style' => 'height:200px',
            'validators' => array(
                array('StringLength', true, array(3, 200))
            ),
        ));

        $this->addElement('text', 'tema', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Tema:',
            'placeholder' => 'Inserisci un tema',
            'class' => 'form-control form-register',
            'validators' => array(
                array('StringLength', true, array(3, 64))
            ),
        ));

        $this->addElement('submit', 'inserisci', array(
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

