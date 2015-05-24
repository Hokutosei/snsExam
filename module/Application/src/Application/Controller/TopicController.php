<?php

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractRestfulController;
use Zend\View\Model\JsonModel;

class TopicController extends AbstractRestfulController
{
    protected $collectionOptions = array('GET', 'POST');
    protected $resourceOptions = array('GET', 'PUT', 'DELETE');

    protected function _getOptions()
    {
        if($this->params->fromRoute('id', false)) {
            return $this->resourceOptions;
        }

        return $this->collectionOptions;
    }

    public function options()
    {
        $response = $this->getResponse();

        $response->getHeaders()
                ->addHeaderLine('Allow', implode(',', $this->_getOptions()));

        return $response;
    }

    // public function setEventManager(EventManagerInterface $events)
    // {
    //     $this->events = $events;
    //
    //     $events->attach('dispatch', array($this, 'checkOptions'), 10);
    // }

    public function checkOptions($e)
    {
        if(in_array($e->getRequest()->getMethod(), $this->_getOptions())) {
            return;
        }

        $response = $this->getResponse();
        $response->setStatusCode(405);
        return $response;
    }


    public function topicList()
    {
        error_log("called!", 0);
        $topicAPIService = $this->getServiceLocator()->get('userAPIService');

        //$result = $userAPIService
        $response = $this-getResponse();
        $response->setStatusCode(201);
        $res = array('test' => "res");

        return new JsonMOdel($res);
    }

}
