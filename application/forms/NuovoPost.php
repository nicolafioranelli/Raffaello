<?php

class Application_Form_NuovoPost extends Zend_Form
{

    public function init()
    {
        $path = APPLICATION_PATH;
        $path .= "/../public/image/post/";

        $this->setMethod("post");
        $this->setAttrib('enctype', 'multipart/form-data');
        $this->setName("nuovopost");

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

        $this->addElement('textarea', 'contenuto', array(
            'filters' => array('StringTrim'),
            'required' => true,
            'label' => 'Descrizione:',
            'placeholder' => 'A cosa stai pensando...',
            'class' => 'form-control form-register',
            'style' => 'height:200px'
        ));

        $this->addElement('file', 'image', array(
            'label' => 'Inserisci una immagine',
            'destination' => $path,
            'validators' => array(
                array('Count', false, 1),
                array('Size', false, 2048000),
                array('Extension', false, array('jpg', 'png', 'gif'))),
            'class' => 'form-control form-register'));

        $this->addElement('submit', 'inserisci', array(
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

